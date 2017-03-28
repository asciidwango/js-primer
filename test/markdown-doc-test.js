// LICENSE : MIT
"use strict";
const assert = require("power-assert");
const globby = require('globby');
const fs = require("fs");
const path = require("path");
const strictEval = require("strict-eval");
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
    const files = globby.sync([`${sourceDir}/**/*.md`, `!${sourceDir}/**/node_modules{,/**}`]);
    files.forEach(filePath => {
        const normalizeFilePath = filePath.replace(sourceDir, "");
        it(`can eval ${normalizeFilePath}`, function() {
            const content = fs.readFileSync(filePath, "utf-8");
            const markdownAST = remark.parse(content);
            const codeBlocks = [].concat(select(markdownAST, 'code[lang="js"]'), select(markdownAST, 'code[lang="javascript"]'));
            // try to eval
            codeBlocks.forEach((codeBlock, index) => {
                const codeValue = codeBlock.value;
                const isIgnoredCode = ESVersions.some(version => {
                    return codeValue.includes(version);
                });
                try {
                    // console.logと// => の書式をチェック
                    shouldConsoleWithComment(codeBlock.value, filePath);
                    const poweredCode = toDoc.convertCode(codeBlock.value, filePath);
                    strictEval(poweredCode);
                } catch (error) {
                    // ReferenceErrorはOK
                    if (error.name === "ReferenceError") {
                        return;
                    }
                    // Node.jsのバージョンによっては実行できないコードならスルー
                    if (isIgnoredCode) {
                        console.log(`Skip this code in ${process.version}`);
                        return;
                    }
                    // Stack Trace like
                    console.log(`${filePath}:${codeBlock.position.start.line}:${codeBlock.position.start.column}`);
                    console.log(codeBlock.value);
                    console.error(`StrictEvalError: strict eval is failed
    at strictEval (${filePath}:1:1)`);
                    throw error;
                }
            });
        });
    });
});
