const assert = require("assert");
const fs = require("fs");
const md2html = require("../md2html");

it("default options", () => {
    const sample = fs.readFileSync("test/fixtures/sample.md", "utf8");
    const expected = fs.readFileSync("test/fixtures/expected.html", "utf8");

    assert(md2html(sample) === expected);
});
