const program = require("commander");
const fs = require("fs/promises");

program.parse(process.argv);
const filePath = program.args[0];

// ファイルをUTF-8として非同期で読み込む
fs.readFile(filePath, { encoding: "utf8" }).then(file => {
    console.log(file);
});
