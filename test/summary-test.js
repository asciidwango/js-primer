const fs = require("fs");
const path = require("path");
const assert = require("assert");
const getFilePathListAsync = require("gitbook-summary-to-path").getFilePathListAsync;
const sourceDir = path.join(__dirname, "../source");
const OUTLINE = path.join(sourceDir, "README.md");
const { matchPatterns } = require("@textlint/regexp-string-matcher");
describe("SUMMARY", function() {
    it("prototypeメソッドの説明をする前にObject#methodの表記を利用してはいけない", () => {
        return getFilePathListAsync(OUTLINE).then(summaryList => {
            const prototypeChapter = path.join(sourceDir, "basic/prototype-object/README.md");
            const prototypeChapterIndex = summaryList.indexOf(prototypeChapter);
            const beforeFilePathList = summaryList.slice(0, prototypeChapterIndex);
            beforeFilePathList.forEach(filePath => {
                const inputText = fs.readFileSync(filePath, "utf-8");
                const results = matchPatterns(inputText, ["/\\`[a-zA-Z]+#[a-zA-Z]*\\`/"]);
                const normalizedFilePath = filePath.replace(sourceDir, "");
                if (results.length > 0) {
                    throw new Error(`${normalizedFilePath}が使ってる。
${results.map(result => inputText.substring(result.startIndex, result.endIndex)).join("\n")}
`);
                }
            });
        });
    });
});
