const program = require("commander");
program.option("--bar <text>");
program.parse(process.argv);
const options = program.opts();
console.log(options.bar);
