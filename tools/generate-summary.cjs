const fs = require("fs");
const path = require("path");
const { getChapterListAsync } = require("gitbook-summary-to-path");
const meow = require("meow");
const parseFrontMatter = require("front-matter");
const addTextToMarkdown = require("add-text-to-markdown");
const sourceDir = path.join(__dirname, "../source");
const micromatch = require("micromatch");
const OUTLINE = path.join(sourceDir, "README.md");
const cli = meow(`
    第一部のサマリを作成するツール

    Option
    --index サマリを書き出すREADME.mdへのパス
    --pattern 子となるファイルパスのパターン
    --section-name 書き出す位置を決めるセクション名(目次 {#summary}がデフォルト)

    Usage
      $ node generate-summary.js
`, {
    flags: {
        index: {
            type: "string"
        },
        pattern: {
            type: "string"
        },
        sectionName: {
            type: "string"
        }
    },
    autoVersion: true,
    autoHelp: true
});

(async function() {
    const indexReadmePath = path.resolve(sourceDir, cli.flags.index);
    const indexReadmeDir = path.dirname(indexReadmePath);
    const summaryDir = path.dirname(OUTLINE);
    const summaryList = await getChapterListAsync(OUTLINE);
    const chapterList = summaryList.filter(chapter => {
        return path.resolve(summaryDir, chapter.path) !== OUTLINE;
    });
    const output = chapterList
        .map(chapter => {
            const filePath = path.resolve(path.dirname(OUTLINE), chapter.path);
            const inputText = fs.readFileSync(filePath, "utf-8");
            const frontMatter = parseFrontMatter(inputText);
            const dirName = path.basename(path.dirname(chapter.path));
            const isTargetFile = micromatch.isMatch(filePath, cli.flags.pattern, {
                dot: true
            });
            if (filePath === indexReadmePath) {
                return;
            }
            if (!isTargetFile) {
                return;
            }
            if (frontMatter.attributes.description) {
                return `### [${chapter.title}](./${path.relative(indexReadmeDir, filePath)}) {#${dirName}}

${frontMatter.attributes.description}
`;
            }
        })
        .filter(text => text !== undefined)
        .join("\n");
    const newBasicChapter = addTextToMarkdown(fs.readFileSync(indexReadmePath, "utf-8"), output, "目次 {#summary}");
    fs.writeFileSync(indexReadmePath, newBasicChapter, "utf-8");
    console.log(`[UPDATE] write to ${indexReadmePath}`);
})();
