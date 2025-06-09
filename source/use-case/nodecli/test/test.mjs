import fs from "fs";
import path from "path";
import { describe, it } from "node:test";
import { execa } from "execa";
import assert from "assert";
const nodecliDir = path.join(import.meta.dirname, "../");
const snapshotDir = path.join(import.meta.dirname, "snapshots");
const duplicateGfm = (item) => {
    return [
        item,
        // --gfmを足したバージョンを作成する
        {
            filePath: item.filePath,
            args: ["--gfm", ...item.args],
            outputId: item.filePath + "--gfm"
        }
    ];
};
const flatten = (array, depth) => {
    const flattened = [];
    (function flat(array, depth) {
        for (const el of array) {
            if (Array.isArray(el) && depth > 0) {
                flat(el, depth - 1);
            } else {
                flattened.push(el);
            }
        }
    })(array, Math.floor(depth) || 1);
    return flattened;
};
/**
 * --gfm を実装してるファイルは--gfm版もテスト対象にする
 * 配列の配列になってるので1段flat化
 */
const gfmItems = flatten([
    // これらは--gfmを実装しているので、--gfmをテストする
    {
        filePath: path.join(nodecliDir, "md-to-html/src/main-3.js"),
        args: ["sample.md"]
    },
    {
        filePath: path.join(nodecliDir, "md-to-html/src/main.js"),
        args: ["sample.md"]
    },
    {
        filePath: path.join(nodecliDir, "refactor-and-unittest/src/main.js"),
        args: ["sample.md"]
    },
    {
        filePath: path.join(nodecliDir, "refactor-and-unittest/src/main-last.js"),
        args: ["sample.md"]
    }
].map(item => duplicateGfm(item)));

/**
 * テスト対象とargsを指定する
 * outputIdはオプショナルで、指定した場合はスナップショットのファイル名に使う
 */
const testTargetFileList = [
    {
        filePath: path.join(nodecliDir, "helloworld/src/main.js"),
    },
    // nodeのパスが入るので扱いにくい
    // {
    //     filePath: path.join(nodecliDir, "argument-parse/src/main-1.js"),
    //     args: ["sample.md"]
    // },
    {
        filePath: path.join(nodecliDir, "argument-parse/src/main-2.js"),
        args: ["sample.md"]
    },
    {
        filePath: path.join(nodecliDir, "md-to-html/src/main-1.js"),
        args: ["sample.md"]
    },
    {
        filePath: path.join(nodecliDir, "md-to-html/src/main-2.js"),
        args: ["sample.md"]
    },

    {
        filePath: path.join(nodecliDir, "read-file/src/main-1.js"),
        args: ["sample.md"]
    },
    {
        filePath: path.join(nodecliDir, "read-file/src/main-2.js"),
        args: ["sample.md"]
    },
    {
        filePath: path.join(nodecliDir, "read-file/src/main-3.js"),
        args: ["sample.md"]
    },
].concat(gfmItems);

describe("use-case/nodecli", () => {
    testTargetFileList.forEach(({ filePath, args, outputId }) => {
        const testFileId = outputId ?? filePath;
        const testFileName = path.relative(nodecliDir, testFileId);
        it(`snapshot test ${testFileName}`, async() => {
            const fileArgs = args ?? [];
            const { stdout } = await execa("node", [filePath].concat(fileArgs), {
                cwd: path.dirname(filePath)
            });
            // ユーザーパスは省略する
            // /path/to/nodecli/arguments/src/main.js -> <nodecli>/arguments/src/main.js
            const normalizedStdout = (stdout || "").split(nodecliDir).join("<nodecli>/");
            const fileName = testFileName.split(path.sep).join("_");
            const expectedFilePath = path.join(snapshotDir, fileName + ".txt");
            // Usage: update snapshots
            // UPDATE_SNAPSHOT=1 npm test
            if (!fs.existsSync(expectedFilePath) || !!process.env.UPDATE_SNAPSHOT) {
                fs.writeFileSync(expectedFilePath, normalizedStdout);
                this.skip();
            }
            // compare input and output
            const expectedOutput = fs.readFileSync(expectedFilePath, "utf-8");
            assert.strictEqual(
                normalizedStdout,
                expectedOutput
            );
        });
    });
});
