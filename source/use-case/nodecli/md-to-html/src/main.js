import * as util from "node:util";
import * as fs from "node:fs/promises";
import { marked } from "marked";

// コマンドライン引数からファイルパスとオプションを受け取る
const {
    values,
    positionals
} = util.parseArgs({
    allowPositionals: true,
    options: {
        // gfmフラグを定義する
        gfm: {
            type: "boolean",
            default: false,
        }
    }
});
const filePath = positionals[0];
fs.readFile(filePath, { encoding: "utf8" }).then(file => {
    const html = marked.parse(file, {
        // オプションの値を使用する
        gfm: values.gfm,
    });
    console.log(html);
}).catch(err => {
    console.error(err.message);
    process.exit(1);
});
