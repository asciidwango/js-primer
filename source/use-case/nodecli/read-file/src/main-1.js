const program = require("commander");
// fs/promisesモジュールをfsオブジェクトとしてインポートする
const fs = require("fs/promises");

// コマンドライン引数からファイルパスを取得する
program.parse(process.argv);
const filePath = program.args[0];

// ファイルを非同期で読み込む
fs.readFile(filePath).then(file => {
    console.log(file);
});
