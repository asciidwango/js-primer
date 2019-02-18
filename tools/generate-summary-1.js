const fs = require("fs");
const path = require("path");
const { getChapterListAsync } = require("gitbook-summary-to-path");
const sourceDir = path.join(__dirname, "../source");
const OUTLINE = path.join(sourceDir, "README.md");
const BasicIndex = path.join(sourceDir, "basic");
const meow = require("meow");
const parseFrontMatter = require("front-matter");
const cli = meow(`
    第一部のサマリを作成するツール

    Usage
      $ node generate-summary-1.js
`, {
    flags: {},
    autoVersion: true,
    autoHelp: true
});

(async function() {
    const summaryDir = path.dirname(OUTLINE);
    const summaryList = await getChapterListAsync(OUTLINE);
    const chapterList = summaryList.filter(chapter => {
        return path.resolve(summaryDir, chapter.path) !== OUTLINE;
    });
    chapterList.forEach(chapter => {
        const filePath = path.resolve(path.dirname(OUTLINE), chapter.path);
        const inputText = fs.readFileSync(filePath, "utf-8");
        const frontMatter = parseFrontMatter(inputText);
        if (!frontMatter.attributes.description) {
            throw new Error(`frontMatter.attributes.description is not found ${chapter.path}`);
        }
        if (frontMatter.attributes.description) {
            console.log(`### [${chapter.title}](${path.relative(BasicIndex, filePath)})

${frontMatter.attributes.description}
`);
        }
    });
})();
