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
 * *-example.js または dir/example/*.js を実行しdoctestを行う
 * a // => "aの評価結果"
 * が一致するかのdoctestを行う
 * 詳細は CONTRIBUTING.md を見る
 **/
describe("doctest:js", function() {
    const files = globby.sync([
        `${sourceDir}/**/*-example.js`, // *-example.js
        `${sourceDir}/**/example/*.js`, // path/example/*.js
        `!${sourceDir}/**/node_modules{,/**}`]);
    files.forEach(filePath => {
        const normalizeFilePath = filePath.replace(sourceDir, "");
        it(`can eval ${normalizeFilePath}`, function(done) {
            const content = fs.readFileSync(filePath, "utf-8");
            try {
                const powerCode = toDoc.convertCode(content, filePath);
                strictEval(powerCode);
                done();
            } catch (error) {
                // Stack Trace like
                console.error(`StrictEvalError: strict eval is failed
    at strictEval (${filePath}:1:1)`);
                done(error);
            }
        });
    });
});
