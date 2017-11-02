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
const shouldConsoleWithComment = require('./lib/console-comment');

/**
 * 指定した文字列を含んだコードは実行環境によってはサポートされてないので無視する
 * 具体的にはNode.js v6でES2016~のコードが実行できない
 * @type {string[]}
 */
const ESVersions = ["ES2016", "ES2017"];
/**
 * CodeBlockの手前に該当するHTMLコメントがある場合は無視する
 * @example
 * 以下のは実行されないのでOKになる
 *
 * <!-- disable-doc-test -->
 * ```js
 * 1; // => 2
 * ```
 *
 *
 * @type {String}
 */
const disableComment = "disable-doc-test";
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
    const notPrefix = `*:not(html[value*="${disableComment}"])`;
    files.forEach(filePath => {
        const normalizeFilePath = filePath.replace(sourceDir, "");
        describe(`${normalizeFilePath}`, function() {
            const content = fs.readFileSync(filePath, "utf-8");
            const markdownAST = remark.parse(content);
            const codeBlocks = [].concat(
                select(markdownAST, `${notPrefix} + code[lang="js"]`),
                select(markdownAST, `${notPrefix} + code[lang="javascript"]`)
            );
            // try to eval
            codeBlocks.forEach((codeBlock, index) => {
                const codeValue = codeBlock.value;
                const isIgnoredCode = ESVersions.some(version => {
                    return codeValue.includes(version);
                });
                it(codeValue.slice(0, 20), function() {
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
                                console
                            });
                        }
                    } catch (error) {
                        const filePathLineColumn = `${filePath}:${codeBlock.position.start.line}:${codeBlock.position.start.column}`;
                        // ReferenceErrorはSkipする
                        // 説明で存在しない変数を書くため
                        if (error.name === "ReferenceError") {
                            console.log(filePathLineColumn);
                            console.log("# ReferenceErrorのためSkip");
                            console.log(error.message);
                            this.skip();
                            return;
                        }
                        // Node.jsのバージョンによっては実行できないコードならスルー
                        if (isIgnoredCode) {
                            console.log(filePathLineColumn);
                            console.log(`# Node.jsのバージョンによりSkip: ${process.version}`);
                            this.skip();
                            return;
                        }
                        // Stack Trace like
                        console.log(filePathLineColumn);
                        console.log(codeBlock.value);
                        console.error(`StrictEvalError: strict eval is failed
    at strictEval (${filePathLineColumn})`);
                        throw error;
                    }
                });
            });
        });
    });
});
