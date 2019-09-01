// LICENSE : MIT
"use strict";
import { test } from "@power-doctest/tester";
import { parse } from "@power-doctest/javascript";
import { toTestCode } from "./lib/testing-code";

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
        it(`doctest:js ${normalizeFilePath}`, function() {
            const content = fs.readFileSync(filePath, "utf-8");
            const parsedResults = parse({
                content,
                filePath
            });
            const parsedCode = parsedResults[0];
            return test({
                ...parsedCode,
                code: transformModule(toTestCode(parsedCode.code))
            }).catch(error => {
                // Stack Trace like
                console.error(`StrictEvalError: strict eval is failed
    at strictEval (${filePath}:1:1)`);
                return Promise.reject(error);
            });
        });
    });
});
