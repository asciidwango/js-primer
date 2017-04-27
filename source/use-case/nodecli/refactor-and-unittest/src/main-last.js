const program = require("commander");
const fs = require("fs");
const marked = require("marked");

program
    .option("--gfm <flag>", "GFMを有効にする")
    .option("-S, --sanitize <flag>", "サニタイズを行う");

program.parse(process.argv);
const filePath = program.args[0];

const markedOptions = Object.assign({}, {
    gfm: true,
    sanitize: false
}, program);

fs.readFile(filePath, "utf8", (err, file) => {
    if (err) {
        console.error(err);
        process.exit(err.code);
        return;
    }
    const html = marked(file, {
        gfm: markedOptions.gfm,
        sanitize: markedOptions.sanitize
    });
    console.log(html);
});
