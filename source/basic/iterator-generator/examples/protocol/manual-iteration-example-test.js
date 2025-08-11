import assert from "assert";
import strictEval from "strict-eval";
import fs from "fs";
import path from "path";
import url from "node:url";
import { describe, it } from "node:test";

const __filename__ = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename__);
const Code = fs.readFileSync(path.join(__dirname, "./manual-iteration.example.js"), "utf-8");

describe("manual-iteration", function() {
    it("手動でIteratorを操作して値を取得できる", function() {
        const actualLogs = [];
        const consoleMock = {
            log(message) {
                actualLogs.push(message);
            }
        };
        strictEval(Code, {
            console: consoleMock
        });
        assert.deepStrictEqual(actualLogs, [1, 2, 3]);
    });
});
