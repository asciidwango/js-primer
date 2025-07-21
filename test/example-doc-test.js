import { globbySync } from "globby";
import fs from "node:fs";
import path from "node:path";
import { test as powerDoctest } from "@power-doctest/tester";
import { parse } from "@power-doctest/javascript";
import { toTestCode } from "./lib/testing-code.js";
import url from "node:url";
import { describe, it } from "node:test";

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
describe("example:js", function () {
    const files = globbySync([
        `${sourceDir}/**/*-example.js`, // *-example.js
        `${sourceDir}/**/*.example.js`, // *.example.js
        `${sourceDir}/**/example/*.js`, // example/*.js
        `!${sourceDir}/**/node_modules{,/**}`,
        `!${sourceDir}/use-case/todoapp/**/*.js`,
        `!${sourceDir}/use-case/nodecli/**/*.js`
    ]);
    files.forEach(filePath => {
        const normalizeFilePath = filePath.replace(sourceDir, "");
        it(`doctest:js ${normalizeFilePath}`, { timeout: 5000 }, async function () {
            const content = fs.readFileSync(filePath, "utf-8");
            const parsedResults = parse({
                content,
                filePath
            });
            const parsedCode = parsedResults[0];
            try {
                await powerDoctest({
                    ...parsedCode,
                    code: toTestCode(parsedCode.code)
                });
            } catch (error) {
                /*
                export type PowerDocTestError = Error & {
                    // file path of the code
                    fileName?: string;
                    // line number of the code
                    lineNumber?: number;
                    // column number of the code
                    columnNumber?: number;
                    // metadata of the code
                    meta?: {
                        [index: string]: unknown;
                    };
                };*/

                if (error.lineNumber !== undefined && error.columnNumber !== undefined) {
                    const line = content.split("\n")[error.lineNumber - 1];
                    const column = error.columnNumber - 1;
                    const errorLine = line.slice(0, column) + "↑" + line.slice(column);
                    console.error(`Error in ${filePath} at line ${error.lineNumber}, column ${error.columnNumber}:
${errorLine}

${parsedCode.code}
    at strictEval (${filePath}:${error.lineNumber}:${error.columnNumber})

`);
                }
                // Stack Trace like
                console.error(`PowerDoctest Error: ${error.message}
${parsedCode.code}
    at strictEval (${filePath}:1:1)`);
                throw error;
            }
        });
    });
});
