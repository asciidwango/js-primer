const program = require("commander");
const fs = require("fs/promises");
// markedモジュールをmarkedオブジェクトとしてインポートする
const marked = require("marked");

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