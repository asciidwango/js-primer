import { describe, it } from "node:test";
import assert from "node:assert";
import strictEval from "strict-eval";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const Code = fs.readFileSync(path.join(__dirname, "./array-vs-iterator.example.js"), "utf-8");

describe("array-vs-iterator", () => {
    it("配列のサイズと最初の5つの要素が正しい", () => {
        const actualLogs = [];
        const consoleMock = {
            log(message) {
                actualLogs.push(message);
            }
        };
        strictEval(Code, {
            console: consoleMock
        });
        assert.strictEqual(actualLogs[0], 5000);
        // 配列のRealmが異なるのでstrictEqualは使えない
        assert.deepEqual(actualLogs[1], [1, 2, 3, 4, 5]);
    });
});
