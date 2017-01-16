const program = require("commander");
program.option("--foo <text>");
program.parse(process.argv);
console.log(program.foo);