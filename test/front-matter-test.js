// LICENSE : MIT
"use strict";
import fs from "node:fs";
import assert from "node:assert";
import path from "node:path";
import globby from "globby";
import parseFrontMatter from "front-matter";
import url from "node:url";
const __filename__ = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename__);
const sourceDir = path.join(__dirname, "..", "source");
describe("front-matter", function() {
    const files = globby.sync([
        `${sourceDir}/**/*.md`,
        `!${sourceDir}/**/node_modules{,/**}`,
        // 目次は除く
        `!${sourceDir}/index.md`,
        `!${sourceDir}/README.md`,
        `!${sourceDir}/OUTLINE.md`,
        `!${sourceDir}/**/OUTLINE.md`,
        `!${sourceDir}/**/SCREENSHOT.md`,
        // サンプルコードの一部
        `!${sourceDir}/use-case/nodecli/**/src/**/sample*.md`,
    ]);
    context("author", function() {
        files.forEach(filePath => {
            const normalizeFilePath = filePath.replace(sourceDir, "");
            it(`should have author field: ${normalizeFilePath}`, () => {
                const content = fs.readFileSync(filePath, "utf-8");
                const frontMatter = parseFrontMatter(content);
                assert(frontMatter, "front-matterがありません");
                const attributes = frontMatter.attributes;
                assert(typeof attributes["author"] === "string", "authorは必須です");
            });
            it(`should have description field: ${normalizeFilePath}`, () => {
                const content = fs.readFileSync(filePath, "utf-8");
                const frontMatter = parseFrontMatter(content);
                const attributes = frontMatter.attributes;
                assert(typeof attributes["description"] === "string", "descriptionは必須です");
            });
            it(`should have sponsors field: ${normalizeFilePath}`, () => {
                const content = fs.readFileSync(filePath, "utf-8");
                const frontMatter = parseFrontMatter(content);
                const attributes = frontMatter.attributes;
                assert(Array.isArray(attributes["sponsors"]), "sponsorsが未定義です。[] または定義してください");
            });
        });
    });
});
