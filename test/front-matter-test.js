// LICENSE : MIT
"use strict";
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const globby = require("globby");
const parseFrontMatter = require('front-matter');
const sourceDir = path.join(__dirname, "..", "source");
const getFilePathListAsync = require("gitbook-summary-to-path").getFilePathListAsync;
describe("front-matter", function() {
    const files = globby.sync([
        `${sourceDir}/**/*.md`,
        `!${sourceDir}/**/node_modules{,/**}`,
        // 目次は除く
        `!${sourceDir}/index.html.md`,
        `!${sourceDir}/README.md`,
        `!${sourceDir}/OUTLINE.md`
    ]);
    context("author", function() {
        files.forEach(filePath => {
            const normalizeFilePath = filePath.replace(sourceDir, "");
            it(`should have author field: ${normalizeFilePath}`, function() {
                const content = fs.readFileSync(filePath, "utf-8");
                const frontMatter = parseFrontMatter(content);
                assert(frontMatter, "front-matterがありません");
                const attributes = frontMatter.attributes;
                assert(typeof attributes["author"] === "string", "authorは必須です");
            })
        });
    })
});
