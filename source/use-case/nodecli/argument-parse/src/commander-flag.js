const program = require("commander");
program.option("--foo");
program.parse(process.argv);
console.log(program.foo);