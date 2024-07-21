import * as util from "node:util";

// コマンドライン引数をutil.parseArgsメソッドでパースする
const {
    positionals
} = util.parseArgs({
    // フラグ以外の引数を渡すことを許可する
    allowPositionals: true
});
// ファイルパスをpositionals配列から取り出す
const filePath = positionals[0];
console.log(filePath);
