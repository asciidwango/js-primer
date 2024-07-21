import * as util from "node:util";
import * as fs from "node:fs/promises";

const { positionals } = util.parseArgs({
    allowPositionals: true
});
const filePath = positionals[0];
// ファイルを非同期で読み込む
fs.readFile(filePath, { encoding: "utf8" }).then(file => {
    console.log(file);
}).catch(err => {
    console.error(err.message);
    // 終了ステータス 1（一般的なエラー）としてプロセスを終了する
    process.exit(1);
});
