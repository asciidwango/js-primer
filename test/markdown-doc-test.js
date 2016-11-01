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

/**
 * Markdownファイルの CodeBlock に対してdoctestを行う
 * CodeBlockは必ず実行できるとは限らないので、
 * AssertionError(doctestにおける失敗)以外は成功したことにして無視する
 * 詳細は CONTRIBUTING.md を読む
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
                try {
                    const poweredCode = toDoc.convertCode(codeBlock.value, filePath);
                    strictEval(poweredCode);
                } catch (error) {
                    // ReferenceErrorはOK
                    if (error.name === "ReferenceError") {
                        return;
                    }
                    // ** はNode.jv 7 >=
                    if (error.message === "Line 1: Unexpected token *") {
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
