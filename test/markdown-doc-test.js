// LICENSE : MIT
"use strict";
import { runCodeBlockNode } from "@power-doctest/markdown";
import { toTestCode } from "./lib/testing-code";

const globby = require("globby");
const fs = require("fs");
const path = require("path");
const remark = require("remark")();
const select = require("unist-util-select");
const attachParents = require("unist-util-parents");
const findAllBetween = require("unist-util-find-all-between");
const sourceDir = path.join(__dirname, "..", "source");


/**
 * 指定した文字列を含んだコードは実行環境によってはサポートされてないので無視する
 * 具体的にはNode.js v6でES2016~のコードが実行できない場合がある
 * .travis.ymlのサポートしているNode.jsバージョンに合わせる
 * @type {string[]}
 */
const AllowECMAScriptVersions = ["2017", "2018", "2019"];
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
describe("doctest:md", function() {
    const files = globby.sync([
        `${sourceDir}/**/*.md`,
        `!${sourceDir}/**/node_modules{,/**}`,
        `!**/OUTLINE.md`
    ]);
    files.forEach(filePath => {
        const normalizeFilePath = filePath.replace(sourceDir, "");
        describe(`${normalizeFilePath}`, function() {
            const content = fs.readFileSync(filePath, "utf-8");
            const markdownAST = attachParents(remark.parse(content));
            const codeBlocks = [].concat(
                select(markdownAST, `code[lang="js"]`),
                select(markdownAST, `code[lang="javascript"]`)
            );
            // try to eval
            const dirName = path.dirname(filePath).split(path.sep).pop();
            codeBlocks.forEach((codeBlock, index) => {
                const codeValue = codeBlock.value;
                const testCaseName = codeValue.slice(0, 32).replace(/[\r\n]/g, "_");
                it(dirName + ": " + testCaseName, function() {
                    return runCodeBlockNode(codeBlock, {
                        filePath: filePath,
                        preTransform: toTestCode,
                        // 非同期サンプルは1000ms以内に終わる想定にしている
                        timeout: 1000 * 2
                    }).catch(error => {
                        if (error.meta && AllowECMAScriptVersions.some(version => version === String(error.meta.ECMAScript))) {
                            console.log(`ECMAScript ${error.meta.ECMAScript}が指定されているコードは実行環境がサポートしてない場合があるのでスキップします`);
                            this.skip();
                            return;
                        }
                        const filePathLineColumn = `${error.fileName}:${error.lineNumber}:${error.columnNumber}`;
                        console.error(`Markdown Doctest is failed
  at ${filePathLineColumn}
`);
                        return Promise.reject(error);
                    });
                });
            });
        });
    });
});
