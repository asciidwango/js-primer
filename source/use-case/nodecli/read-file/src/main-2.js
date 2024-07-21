import * as util from "node:util";
import * as fs from "node:fs/promises";

const { positionals } = util.parseArgs({
    allowPositionals: true
});
const filePath = positionals[0];
// ファイルをUTF-8として非同期で読み込む
fs.readFile(filePath, { encoding: "utf8" }).then(file => {
    console.log(file);
});
