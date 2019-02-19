const fs = require("fs");
const path = require("path");
const { getChapterListAsync } = require("gitbook-summary-to-path");
const sourceDir = path.join(__dirname, "../source");
const OUTLINE = path.join(sourceDir, "README.md");
const BasicIndex = path.join(sourceDir, "basic");
const meow = require("meow");
const parseFrontMatter = require("front-matter");
const addTextToMarkdown = require("add-text-to-markdown");
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
    const BasicREADMEPath = path.join(BasicIndex, "README.md");
    const output = chapterList
        .map(chapter => {
            const filePath = path.resolve(path.dirname(OUTLINE), chapter.path);
            const inputText = fs.readFileSync(filePath, "utf-8");
            const frontMatter = parseFrontMatter(inputText);
            const dirName = path.basename(path.dirname(chapter.path));
            const isBasic = filePath.includes("/basic/");
            if (filePath === BasicREADMEPath) {
                return;
            }
            if (!isBasic) {
                return;
            }
            if (frontMatter.attributes.description) {
                return `### [${chapter.title}](${path.relative(BasicIndex, filePath)}) {#${dirName}}

${frontMatter.attributes.description}
`;
            }
        })
        .filter(text => text !== undefined)
        .join("\n");
    const newBasicChapter = addTextToMarkdown(fs.readFileSync(BasicREADMEPath, "utf-8"), output, "目次 {#summary}");
    fs.writeFileSync(BasicREADMEPath, newBasicChapter, "utf-8");
})();
