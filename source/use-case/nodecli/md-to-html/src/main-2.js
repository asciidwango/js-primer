import { program } from "commander";
import * as fs from "node:fs/promises";
import { marked } from "marked";

program.parse(process.argv);
const filePath = program.args[0];

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