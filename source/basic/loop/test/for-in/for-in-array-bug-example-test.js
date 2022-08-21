import assert from "assert";
import strictEval from "strict-eval";
import fs from "fs";
import url from "node:url";
import path from "node:path";

const __filename__ = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename__);

const Code = fs.readFileSync(path.join(__dirname, "../../src/for-in/for-in-array-bug-example.js"), "utf-8");
describe("for-in-array", function() {
    it("配列の添字が列挙される", function() {
        const actualLogs = [];
        const console = {
            log(message) {
                actualLogs.push(message);
            }
        };
        strictEval(Code, {
            console
        });
        // 文字列であるため
        assert.deepEqual(actualLogs, [
            "001"
        ]);
    });
});
