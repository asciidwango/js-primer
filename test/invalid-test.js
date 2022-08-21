import { runTestCode, toStrictIfNeeded } from "./lib/testing-code.js";

import assert from "node:assert";
import globby from "globby";
import fs from "node:fs";
import url from "node:url";
import path from "node:path";
const __filename__ = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename__);
const sourceDir = path.join(__dirname, "..", "source");
/**
 * `*-invalid.js` が実行 または パースエラーとなることをテストする
 **/
describe("invalid:js", function() {
    const files = globby.sync([
        `${sourceDir}/**/*-invalid.js`,
        `${sourceDir}/**/invalid/**/*.js`,
        `!${sourceDir}/**/node_modules{,/**}`
    ]);
    files.forEach(filePath => {
        const normalizeFilePath = filePath.replace(sourceDir, "");
        it(`Should be invalid ${normalizeFilePath}`, function() {
            const content = fs.readFileSync(filePath, "utf-8");
            try {
                // 例外が前提なので最低限な変換に留める
                const testCode = toStrictIfNeeded(content);
                runTestCode(testCode, filePath);
                throw new Error("NO_REACH_CODE");
            } catch (error) {
                // evalしようとしたらエラーになっていることが期待値
                // "NO_REACH_CODE"になってるのはおかしい

                assert.notStrictEqual(error.message, "NO_REACH_CODE", `Should be SyntaxError(parse error) or EvalError: ${error.message}
次のファイルをチェックしてください
    at InvalidError (${filePath}:1:1)\n

実際に発生したエラー:
${error}`);
            }
        });
    });
});
