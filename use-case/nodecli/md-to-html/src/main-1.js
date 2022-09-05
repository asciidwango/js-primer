import { program } from "commander";
import * as fs from "node:fs/promises";
// markedモジュールからmarkedオブジェクトをインポートする
import { marked } from "marked";

program.parse(process.argv);
const filePath = program.args[0];

fs.readFile(filePath, { encoding: "utf8" }).then(file => {
    // MarkdownファイルをHTML文字列に変換する
    const html = marked.parse(file);
    console.log(html);
}).catch(err => {
    console.error(err.message);
    process.exit(1);
});