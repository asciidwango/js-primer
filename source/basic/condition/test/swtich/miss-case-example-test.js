import assert from "assert";
import strictEval from "strict-eval";
import fs from "fs";
import path from "path";
import url from "node:url";
const __filename__ = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename__);

const Code = fs.readFileSync(path.join(__dirname, "../../src/switch/miss-case-example.js"), "utf-8");
describe("switch-example", function() {
    it("should output \"ECMAScript 2015\"", function() {
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
            "ECMAScript 2015",
            "ECMAScript 2016",
            "しらないバージョンです"
        ]);
    });
});
