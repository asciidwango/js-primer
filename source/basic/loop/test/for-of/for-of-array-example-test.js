import assert from "assert";
import strictEval from "strict-eval";
import fs from "fs";
import path from "path";
import url from "node:url";

const __filename__ = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename__);
const Code = fs.readFileSync(path.join(__dirname, "../../src/for-of/for-of-array-example.js"), "utf-8");
describe("for-of-array", function() {
    it("配列の値が列挙される", function() {
        const actualLogs = [];
        const console = {
            log(message) {
                actualLogs.push(message);
            }
        };
        strictEval(Code, {
            console
        });
        assert.deepEqual(actualLogs, [
            1,
            2,
            3
        ]);
    });
});
