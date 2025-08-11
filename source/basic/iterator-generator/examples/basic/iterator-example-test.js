import { describe, it } from "node:test";
import assert from "node:assert";
import strictEval from "strict-eval";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const Code = fs.readFileSync(path.join(__dirname, "./iterator.example.js"), "utf-8");

describe("iterator-example", () => {
    it("イテレータから最初の2つの値を取得できる", () => {
        const actualLogs = [];
        const console = {
            log(message) {
                actualLogs.push(message);
            }
        };
        strictEval(Code, {
            console
        });
        assert.deepEqual(actualLogs, [1, 2]);
    });
});
