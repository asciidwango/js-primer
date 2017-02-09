const program = require("commander");
const fs = require("fs");

program.parse(process.argv);
const filePath = program.args[0];
fs.readFile(filePath, (err, file) => {
    if (err) {
        console.error(err);
        process.exit(1);
        return;
    }
    const text = file.toString();
    console.log(text);
});
