import * as assert from "node:assert";
import * as fs from "node:fs";
import { md2html } from "../md2html.js";

it("converts Markdown to HTML (GFM=false)", () => {
    // fs.readFileSyncは同期的にファイルを読み込むメソッド
    const sample = fs.readFileSync("test/fixtures/sample.md", { encoding: "utf8" });
    const expected = fs.readFileSync("test/fixtures/expected.html", { encoding: "utf8" });
    // 末尾の改行の有無の違いを無視するため、変換後のHTMLのスペースをtrimメソッドで削除してから比較しています
    assert.strictEqual(md2html(sample, { gfm: false }).trimEnd(), expected.trimEnd());
});

it("converts Markdown to HTML (GFM=true)", () => {
    const sample = fs.readFileSync("test/fixtures/sample.md", { encoding: "utf8" });
    const expected = fs.readFileSync("test/fixtures/expected-gfm.html", { encoding: "utf8" });
    // 末尾の改行の有無の違いを無視するため、変換後のHTMLのスペースをtrimメソッドで削除してから比較しています
    assert.strictEqual(md2html(sample, { gfm: true }).trimEnd(), expected.trimEnd());
});

