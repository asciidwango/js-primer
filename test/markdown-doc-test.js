// LICENSE : MIT
"use strict";
const assert = require("power-assert");
const globby = require('globby');
const fs = require("fs");
const path = require("path");
const strictEval = require("strict-eval");
const { NodeVM } = require('vm2');
const sourceDir = path.join(__dirname, "..", "source");
const toDoc = require("power-doctest");
const remark = require("remark")();
const select = require('unist-util-select');
const attachParents = require('unist-util-parents');
const findAllBetween = require('unist-util-find-all-between');
const findBefore = require('unist-util-find-before');
const DocTestController = require("./lib/DocTestController");
const makeConsoleMock = require("consolemock");
const getComments = (parentNode, codeNode) => {
    const nonHtmlNode = findBefore(parentNode, codeNode, (node) => {
        return node.type !== "html";
    });
    const startNode = nonHtmlNode ? nonHtmlNode : parentNode.children[0];
    const htmlNodes = findAllBetween(parentNode, startNode, codeNode, 'html');
    return htmlNodes.map(htmlNode => {
        return htmlNode.value.replace(/^<!--/, "").replace(/-->$/, "")
    })
};
/**
 * 指定した文字列を含んだコードは実行環境によってはサポートされてないので無視する
 * 具体的にはNode.js v6でES2016~のコードが実行できない
 * @type {string[]}
 */
const ESVersions = ["ES2016", "ES2017"];
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
                const isIgnoredCode = ESVersions.some(version => {
                    return codeValue.includes(version);
                });
                const comments = getComments(codeBlock.parent, codeBlock);
                const docTestController = new DocTestController(comments);
                if (docTestController.isDisabled) {
                    return;
                }
                const testCaseName = codeValue.slice(0, 32).replace(/[\r\n]/g, "_");
                it(testCaseName, function () {
                    try {
                        // console.logと// => の書式をチェック
                        // ミスマッチが多いので無効化
                        // shouldConsoleWithComment(codeBlock.value, filePath);
                        const poweredCode = toDoc.convertCode(codeBlock.value, filePath);
                        if (/strict modeではない/.test(codeBlock.value)) {
                            // non-strict modeのコード
                            const vm = new NodeVM({
                                require: {
                                    external: true
                                }
                            });
                            vm.run(poweredCode, filePath);
                        } else {
                            strictEval(poweredCode, {
                                require,
                                console: !!process.env.ENABLE_CONSOLE ? console : makeConsoleMock(),
                                setTimeout
                            });
                        }
                    } catch (error) {
                        const filePathLineColumn = `${filePath}:${codeBlock.position.start.line}:${codeBlock.position.start.column}`;
                        if (docTestController.hasExpectedError) {
                            if (docTestController.isExpectedError(error)) {
                                return;
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
                            return;
                        }
                        // Stack Trace like
                        console.log(`Doctest: Failed`);
                        console.log(`   at ${filePathLineColumn}`);
                        console.log(`Code:
---
${codeBlock.value}
---
`);
                        throw error;
                    }
                });
            });
        });
    });
});
