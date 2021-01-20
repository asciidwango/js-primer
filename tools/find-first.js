const fs = require("fs");
const path = require("path");
const getFilePathListAsync = require("gitbook-summary-to-path").getFilePathListAsync;
const sourceDir = path.join(__dirname, "../source");
const OUTLINE = path.join(sourceDir, "README.md");
const meow = require('meow');
const { matchPatterns } = require("@textlint/regexp-string-matcher");
const cli = meow(`
    マッチしたフレーズが使われた章を表示するツール

    Usage
      $ node find-first "phase"

    Options

    Examples
      $ node find-first "/pattern/i"
      $ node find-first "/pattern/i" "/pattern2/i"
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
        const results = matchPatterns(inputText, cli.input);
        const normalizedFilePath = filePath.replace(sourceDir, "");
        if (results.length > 0) {
            console.log(`${normalizedFilePath}: matched ${results.length}`);
            results.forEach((result, index) => {
                console.log(`----------------------------------------------------------`);
                console.log(`${inputText.substring(result.startIndex, result.endIndex)}`)
                if (index !== results.length) {
                    console.log(`----------------------------------------------------------`);
                }
            });
        } else {
            console.log(`${normalizedFilePath}: No matched`);
        }
    });
})();
