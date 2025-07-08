import assert from "assert";
import { spawn } from "child_process";
import path from "path";
import url from "node:url";

const __filename__ = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename__);

describe("array-vs-iterator", function() {
    it("配列のサイズと最初の5つの要素が正しい", function(done) {
        const output = [];
        const child = spawn("node", [path.join(__dirname, "../../examples/basic/array-vs-iterator.example.js")], {
            cwd: path.join(__dirname, "../../")
        });
        
        child.stdout.on("data", (data) => {
            output.push(data.toString());
        });
        
        child.on("close", () => {
            const result = output.join("");
            assert(result.includes("5000"));
            assert(result.includes("[ 1, 2, 3, 4, 5 ]"));
            done();
        });
    });
});