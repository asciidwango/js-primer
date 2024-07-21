// utilモジュールをutilオブジェクトとしてインポートする
import * as util from "node:util";
// fs/promisesモジュールをfsオブジェクトとしてインポートする
import * as fs from "node:fs/promises";

// コマンドライン引数からファイルパスを取得する
const { positionals } = util.parseArgs({
    allowPositionals: true
});
const filePath = positionals[0];
// ファイルを非同期で読み込む
fs.readFile(filePath).then(file => {
    console.log(file);
});
