import * as util from "node:util";
import * as fs from "node:fs/promises";
import { marked } from "marked";


const {
    values,
    positionals
} = util.parseArgs({
    allowPositionals: true,
    options: {
        // gfmフラグを定義する
        gfm: {
            // オプションの型をbooleanに指定
            type: "boolean",
            // --gfmフラグがあればtrue、なければデフォルト値としてfalseとする
            default: false,
        }
    }
});
// valuesにはオプションのパース結果がオブジェクトとして格納される
console.log(values.gfm);
const {
    positionals
} = util.parseArgs({
    allowPositionals: true,
});
const filePath = positionals[0];

fs.readFile(filePath, { encoding: "utf8" }).then(file => {
    // gfmオプションを無効にする
    const html = marked.parse(file, {
        gfm: false
    });
    console.log(html);
}).catch(err => {
    console.error(err.message);
    process.exit(1);
});
