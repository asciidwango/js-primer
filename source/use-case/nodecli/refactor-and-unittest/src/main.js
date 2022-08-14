const program = require("commander");
const fs = require("fs/promises");
// md2htmlモジュールをインポートする
const md2html = require("./md2html");

program.option("--gfm", "GFMを有効にする");
program.parse(process.argv);
const filePath = program.args[0];

const cliOptions = {
    gfm: false,
    ...program.opts(),
};

fs.readFile(filePath, { encoding: "utf8" }).then(file => {
    // md2htmlモジュールを使ってHTMLに変換する
    const html = md2html(file, cliOptions);
    console.log(html);
}).catch(err => {
    console.error(err.message);
    process.exit(1);
});