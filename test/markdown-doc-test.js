// LICENSE : MIT
"use strict";
import { toTestCode, runTestCode } from "./lib/testing-code.js";

const globby = require("globby");
const fs = require("fs");
const path = require("path");
const sourceDir = path.join(__dirname, "..", "source");
const remark = require("remark")();
const select = require("unist-util-select");
const attachParents = require("unist-util-parents");
const findAllBetween = require("unist-util-find-all-between");
const findBefore = require("unist-util-find-before");
const DocTestController = require("./lib/DocTestController");
const getComments = (parentNode, codeNode) => {
    const nonHtmlNode = findBefore(parentNode, codeNode, (node) => {
        return node.type !== "html";
    });
    const startNode = nonHtmlNode ? nonHtmlNode : parentNode.children[0];
    const htmlNodes = findAllBetween(parentNode, startNode, codeNode, "html");
    return htmlNodes.map(htmlNode => {
        return htmlNode.value.replace(/^<!--/, "").replace(/-->$/, "");
    });
};


/**
 * 指定した文字列を含んだコードは実行環境によってはサポートされてないので無視する
 * 具体的にはNode.js v6でES2016~のコードが実行できない場合がある
 * .travis.ymlのサポートしているNode.jsバージョンに合わせる
 * @type {string[]}
 */
const ESVersions = ["2017", "2018", "2019"];
/**
 * Markdownファイルの CodeBlock に対してdoctestを行う
 * CodeBlockは必ず実行できるとは限らないので、
 * AssertionError(doctestにおける失敗)以外は成功したことにして無視する
 * Node.js v6はES2016-が実行できないのでスルーする
 *
 * `console.log(式); // => 結果` の書式で書かれているをチェックする
 * https://github.com/asciidwango/js-primer/issues/195
 *
 * その他詳細は CONTRIBUTING.md を読む
 **/
describe("doctest:md", function () {
    const files = globby.sync([
        `${sourceDir}/**/*.md`,
        `!${sourceDir}/**/node_modules{,/**}`,
        `!**/OUTLINE.md`
    ]);
    files.forEach(filePath => {
        const normalizeFilePath = filePath.replace(sourceDir, "");
        describe(`${normalizeFilePath}`, function () {
            const content = fs.readFileSync(filePath, "utf-8");
            const markdownAST = attachParents(remark.parse(content));
            const codeBlocks = [].concat(
                select(markdownAST, `code[lang="js"]`),
                select(markdownAST, `code[lang="javascript"]`)
            );
            // try to eval
            codeBlocks.forEach((codeBlock, index) => {
                const codeValue = codeBlock.value;
                const comments = getComments(codeBlock.parent, codeBlock);
                const docTestController = new DocTestController(comments);
                const isIgnoredCode = ESVersions.some(version => {
                    return codeValue.includes(version) || docTestController.ecmascriptVersion === version;
                });
                if (docTestController.isDisabled) {
                    return;
                }
                const testCaseName = codeValue.slice(0, 32).replace(/[\r\n]/g, "_");
                it(testCaseName, function (_done) {
                    let isCalled = false;
                    const done = (error) => {
                        if (isCalled) {
                            return;
                        }
                        isCalled = true;
                        _done(error);
                    };
                    /**
                     * エラーの内容をみて意図してないものならテストを失敗させる。
                     */
                    const reportErrorIfUnexpected = (error) => {
                        const filePathLineColumn = `${filePath}:${codeBlock.position.start.line}:${codeBlock.position.start.column}`;
                        if (docTestController.hasExpectedError) {
                            if (docTestController.isExpectedError(error)) {
                                return done();
                            } else {
                                console.log(`Error type mismatch:
    Expected: ${docTestController.expectedErrorName}
    Actual  : ${error.name}
`);
                            }
                        }
                        // Node.jsのバージョンによっては実行できないコードならスルー
                        if (isIgnoredCode) {
                            console.log(filePathLineColumn);
                            console.log(`# Node.jsのバージョンによりSkip: ${process.version}`);
                            this.skip();
                            return done();
                        }
                        // Stack Trace like
                        console.log(`Doctest: Failed`);
                        console.log(`   at ${filePathLineColumn}`);
                        console.log(`Code:
---
${codeValue}
---
`);
                        done(error);

                    };
                    try {
                        const unhandledRejectionHandler = (reason) => {
                            done(reason);
                        };
                        const uncaughtException = (error) => {
                            reportErrorIfUnexpected(error);
                        };
                        process.once("unhandledRejection", unhandledRejectionHandler);
                        process.once("uncaughtException", uncaughtException);
                        // Run Test Code
                        const testCode = toTestCode(codeValue);
                        runTestCode(testCode, filePath);
                        // Async Handling
                        if (docTestController.isAsyncTesting) {
                            const PADDING_TIME = 16;
                            setTimeout(() => {
                                process.removeListener("unhandledRejection", unhandledRejectionHandler);
                                process.removeListener("uncaughtException", uncaughtException);
                                done();
                            }, docTestController.asyncTestTimeoutMillSeconds + PADDING_TIME);
                        } else {
                            const mayBeAsync = /Promise|async |then\(|setTimeout/;
                            if (mayBeAsync.test(codeValue)) {
                                const filePathLineColumn = `${filePath}:${codeBlock.position.start.line}:${codeBlock.position.start.column}`;
                                console.log(`Doctest: Failed`);
                                console.log(`   at ${filePathLineColumn}`);
                                done(new Error(`doctest:asyncをつけ忘れている可能性が高いです at ${filePathLineColumn}`));
                                return;
                            }
                            process.removeListener("unhandledRejection", unhandledRejectionHandler);
                            process.removeListener("uncaughtException", uncaughtException);
                            done();
                        }
                    } catch (error) {
                        reportErrorIfUnexpected(error);
                    }
                });
            });
        });
    });
});
