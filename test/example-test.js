// LICENSE : MIT
"use strict";
import { runTestCode, toTestCode } from "./lib/testing-code.js";

const globby = require("globby");
const fs = require("fs");
const path = require("path");
const sourceDir = path.join(__dirname, "..", "source");
const { transform } = require("babel-core");

function transformModule(code) {
    // 必要なもの以外(es modulesぐらいがベスト)は変換しないように
    return transform(code, {
        presets: [
            [
                "env", {
                "targets": {
                    "node": "current"
                }
            }
            ]
        ]
    }).code;
}

/**
 * *-example.js または dir/example/*.js を実行しdoctestを行う
 * a // => "aの評価結果"
 * が一致するかのdoctestを行う
 * 詳細は CONTRIBUTING.md を見る
 **/
describe("doctest:js", function() {
    const files = globby.sync([
        `${sourceDir}/**/*-example.js`, // *-example.js
        `${sourceDir}/**/*.example.js`, // *.example.js
        `${sourceDir}/**/example/*.js`, // example/*.js
        `!${sourceDir}/**/node_modules{,/**}`
    ]);
    files.forEach(filePath => {
        const normalizeFilePath = filePath.replace(sourceDir, "");
        it(`can eval ${normalizeFilePath}`, function() {
            const content = fs.readFileSync(filePath, "utf-8");
            try {
                const testCode = toTestCode(content);
                runTestCode(transformModule(testCode), filePath);
            } catch (error) {
                // Stack Trace like
                console.error(`StrictEvalError: strict eval is failed
    at strictEval (${filePath}:1:1)`);
                throw new Error(error.message);
            }
        });
    });
});
