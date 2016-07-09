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
            const codes = codeBlocks.map(codeBlock => {
                return codeBlock.value;
            }).filter(code => code.length > 0);
            // try to eval
            codes.forEach(code => {
                try {
                    const poweredCode = toDoc.convertCode(code, filePath);
                    strictEval(poweredCode);
                } catch (error) {
                    // AssertionError以外は無視する
                    if (error.name !== "AssertionError") {
                        return;
                    }
                    // Stack Trace like
                    console.info(code);
                    console.error(`StrictEvalError: strict eval is failed
    at strictEval (${filePath}:1:1)`);
                    throw error;
                }
            });
        });
    });
});
