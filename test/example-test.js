// LICENSE : MIT
"use strict";
import { runTestCode, toTestCode } from "./lib/testing-code.js";

const globby = require("globby");
const fs = require("fs");
const path = require("path");
const sourceDir = path.join(__dirname, "..", "source");
const { transformSync } = require("@babel/core");

function transformModule(code) {
    // 必要なもの以外(es modulesぐらいがベスト)は変換しないように
    return transformSync(code, {
        presets: [
            [
                "@babel/preset-env", {
                    "targets": {
                        "node": "current"
                    }
                }
            ]
        ],
        babelrc: false,
        configFile: false
    }).code;
}

/**
 * *-example.js または dir/example/*.js を実行しdoctestを行う
 * a // => "aの評価結果"
 * が一致するかのdoctestを行う
 * 詳細は CONTRIBUTING.md を見る
 **/
describe("doctest:js", function() {
    require("@babel/register")({
        presets: [
            [
                "@babel/preset-env", {
                    "targets": {
                        "node": "current"
                    }
                }
            ]
        ],
        babelrc: false,
        configFile: false
    });
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
                const transformedCode = transformModule(testCode);
                runTestCode(transformedCode, filePath);
            } catch (error) {
                // Stack Trace like
                console.error(`StrictEvalError: strict eval is failed
    at strictEval (${filePath}:1:1)`);
                throw new Error(error.message);
            }
        });
    });
});
