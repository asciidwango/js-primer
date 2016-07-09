// LICENSE : MIT
"use strict";
const assert = require("power-assert");
const globby = require('globby');
const fs = require("fs");
const path = require("path");
const strictEval = require("strict-eval");
const sourceDir = path.join(__dirname, "..", "source");
const toDoc = require("power-doctest");
/**
 * *-example.js を実行しdoctestを行う
 * a // => "aの評価結果"
 * が一致するかのdoctestを行う
 **/
describe("invalid:js", function() {
    const files = globby.sync([`${sourceDir}/**/*-invalid.js`, `!${sourceDir}/**/node_modules{,/**}`]);
    files.forEach(filePath => {
        const normalizeFilePath = filePath.replace(sourceDir, "");
        it(`Should be invalid ${normalizeFilePath}`, function() {
            const content = fs.readFileSync(filePath, "utf-8");
            try {
                strictEval(content);
                throw new Error("NO_REACH_CODE");
            } catch (error) {
                // evalしようとしたらエラーになっていることが期待値
                // "NO_REACH_CODE"になってるのはおかしい
                assert.notEqual(error.message, "NO_REACH_CODE", `Should be SyntaxError(parse error) or EvalError: ${error.message}
Please check it:
    at NotError (${filePath}:1:1)\n`);
            }
        });
    });
});
