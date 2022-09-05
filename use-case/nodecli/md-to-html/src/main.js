import { program } from "commander";
import * as fs from "node:fs/promises";
import { marked } from "marked";

// gfmオプションを定義する
program.option("--gfm", "GFMを有効にする");
program.parse(process.argv);
const filePath = program.args[0];

// コマンドライン引数のオプションを取得する
const options = program.opts();

// コマンドライン引数で指定されなかったオプションにデフォルト値を上書きする
const cliOptions = {
    gfm: options.gfm ?? false,
};

fs.readFile(filePath, { encoding: "utf8" }).then(file => {
    const html = marked.parse(file, {
        // オプションの値を使用する
        gfm: cliOptions.gfm,
    });
    console.log(html);
}).catch(err => {
    console.error(err.message);
    process.exit(1);
});