const assert = require("assert");
const md2html = require("../md2html");

const markdown = `
これはサンプルです。
https://asciidwango.github.io/js-primer/

<p>これはHTMLです</p>
`.trim();

describe("md2html", () => {
    it("default options", () => {
        const expected = `
<p>これはサンプルです。
<a href="https://asciidwango.github.io/js-primer/">https://asciidwango.github.io/js-primer/</a></p>
<p>これはHTMLです</p>
`.trim();

        assert(md2html(markdown) === expected);
    });
});
