import globby from "globby";
import fs from "node:fs";
import path from "node:path";
import { test } from "@power-doctest/tester";
import { parse } from "@power-doctest/javascript";
import { toTestCode } from "./lib/testing-code.js";
import url from "node:url";

const __filename__ = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename__);
const sourceDir = path.join(__dirname, "..", "source");

/**
 * *-example.js または dir/example/*.js を実行しdoctestを行う
 * a // => "aの評価結果"
 * が一致するかのdoctestを行う
 * 詳細は CONTRIBUTING.md を見る
 *
 * Note: ESMには対応していない
 **/
describe("example:js", function() {
    const files = globby.sync([
        `${sourceDir}/**/*-example.js`, // *-example.js
        `${sourceDir}/**/*.example.js`, // *.example.js
        `${sourceDir}/**/example/*.js`, // example/*.js
        `!${sourceDir}/**/node_modules{,/**}`,
        `!${sourceDir}/use-case/todoapp/**/*.js`,
        `!${sourceDir}/use-case/nodecli/**/*.js`
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
                code: toTestCode(parsedCode.code)
            }).catch(error => {
                // Stack Trace like
                console.error(`StrictEvalError: strict eval is failed
    at strictEval (${filePath}:1:1)`);
                return Promise.reject(error);
            });
        });
    });
});
