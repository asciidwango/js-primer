const fs = require("fs");
const path = require("path");
const getFilePathListAsync = require("gitbook-summary-to-path").getFilePathListAsync;
const sourceDir = path.join(__dirname, "../source");
const OUTLINE = path.join(sourceDir, "README.md");
const meow = require('meow');
const parseFrontMatter = require('front-matter');
const cli = meow(`
    第一部のサマリを作成するツール

    Usage
      $ node generate-summary-1.js
`, {
        flags: {
        },
        autoVersion: true,
        autoHelp: true
    });

(async function () {
    const summaryList = await getFilePathListAsync(OUTLINE);
    const filePathList = summaryList.filter(filePath => filePath !== OUTLINE);
    filePathList.forEach(filePath => {
        const inputText = fs.readFileSync(filePath, "utf-8");
        const frontMatter = parseFrontMatter(inputText);
        if (frontMatter.attributes.description){
            console.log(`- [${filePath}](${filePath})

${frontMatter.attributes.description}
`)
        }
    });
})();
