import assert from "assert";
import strictEval from "strict-eval";
import fs from "fs";
import path from "path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const Code = fs.readFileSync(path.join(__dirname, "../../examples/basic/iterator.example.js"), "utf-8");

describe("iterator-example", function() {
    it("イテレータから最初の2つの値を取得できる", function() {
        const actualLogs = [];
        const console = {
            log(message) {
                actualLogs.push(message);
            }
        };
        strictEval(Code, {
            console
        });
        assert.deepEqual(actualLogs, ["最初の値: 1", "次の値: 2"]);
    });
});