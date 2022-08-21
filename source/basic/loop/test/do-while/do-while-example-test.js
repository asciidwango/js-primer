import assert from "assert";
import strictEval from "strict-eval";
import fs from "fs";
import url from "node:url";
import path from "node:path";

const __filename__ = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename__);

const Code = fs.readFileSync(path.join(__dirname, "../../src/do-while/do-while-example.js"), "utf-8");
describe("do-while", function() {
    it("最初の条件を関係なく一度実行される", function() {
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
            1000
        ]);
    });
});
