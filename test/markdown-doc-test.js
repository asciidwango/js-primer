// LICENSE : MIT
"use strict";
import { test } from "@power-doctest/tester";
import { parse } from "@power-doctest/markdown";
import { toTestCode } from "./lib/testing-code";

const globby = require("globby");
const fs = require("fs");
const path = require("path");
const semver = require("semver");
const sourceDir = path.join(__dirname, "..", "source");


/**
 * 指定したECMAScriptバージョンをmetaにもつコードは実行環境によってはサポートされてないので無視する
 * 最新版のNodeでは無視しない
 * @type {string[]}
 */
const AllowECMAScriptVersions = (() => {
    if (semver.cmp(process.version, ">=", "15.0.0")) {
        return []; // すべて通る前提
    }
    if (semver.cmp(process.version, ">=", "14.0.0")) {
        return ["2021"]; // String#replaceAll をサポートしていない
    }
    return ["2017", "2018", "2019", "2020", "2021"];
})();
/**
 * Markdownファイルの CodeBlock に対してdoctestを行う
 * CodeBlockは必ず実行できるとは限らないので、
 * AssertionError(doctestにおける失敗)以外は成功したことにして無視する
 *
 * `console.log(式); // => 結果` の書式で書かれているをチェックする
 * https://github.com/asciidwango/js-primer/issues/195
 *
 * その他詳細は CONTRIBUTING.md を読む
 **/
describe("doctest:md", function () {
    const files = globby.sync([
        `${sourceDir}/**/*.md`,
        `!${sourceDir}/**/node_modules{,/**}`,
        `!**/OUTLINE.md`
    ]);
    files.forEach(filePath => {
        const normalizeFilePath = filePath.replace(sourceDir, "");
        describe(`${normalizeFilePath}`, function () {
            const content = fs.readFileSync(filePath, "utf-8");
            const parsedCodes = parse({
                filePath,
                content
            });
            // try to eval
            const dirName = path.dirname(filePath).split(path.sep).pop();
            parsedCodes.forEach((parsedCode, index) => {
                const codeValue = parsedCode.code;
                const testCaseName = codeValue.slice(0, 32).replace(/[\r\n]/g, "_");
                it(dirName + ": " + testCaseName, function () {
                    return test({
                        ...parsedCode,
                        code: toTestCode(parsedCode.code)
                    }, {
                        defaultDoctestRunnerOptions: {
                            // Default timeout: 2sec
                            timeout: 1000 * 2
                        }
                    }).catch(error => {
                        if (error.meta && AllowECMAScriptVersions.some(version => version === String(error.meta.ECMAScript))) {
                            console.log(`ECMAScript ${error.meta.ECMAScript}が指定されているコードは実行環境がサポートしてない場合があるのでスキップします`);
                            this.skip();
                            return;
                        }
                        const filePathLineColumn = `${error.fileName}:${error.lineNumber}:${error.columnNumber}`;
                        console.error(`Markdown Doctest is failed
  at ${filePathLineColumn}

----------
${codeValue}
----------
`);
                        return Promise.reject(error);
                    });
                });
            });
        });
    });
});
