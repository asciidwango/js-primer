const program = require("commander");
const fs = require("fs");

program.parse(process.argv);
const filePath = program.args[0];

fs.readFile(filePath, "utf8", (err, file) => {
    if (err) {
        console.error(err);
        // 終了ステータス 1（一般的なエラー）としてプロセスを終了
        process.exit(1);
        return;
    }
    console.log(file);
});

