const fs = require("fs");
const path = require("path");
const getFilePathListAsync = require("gitbook-summary-to-path").getFilePathListAsync;
const sourceDir = path.join(__dirname, "../source");
const OUTLINE = path.join(sourceDir, "README.md");
const { matchPatterns } = require("@textlint/regexp-string-matcher");

function findUsage(actualUseChapter, searchPatterns, allowFilePathList) {
    return getFilePathListAsync(OUTLINE).then(summaryList => {
        const prototypeChapterIndex = summaryList.indexOf(actualUseChapter);
        const beforeFilePathList = summaryList.slice(0, prototypeChapterIndex - 1);
        return beforeFilePathList
            .filter(filePath => !allowFilePathList.includes(filePath))
            .map(filePath => {
                const inputText = fs.readFileSync(filePath, "utf-8");
                const matches = matchPatterns(inputText, searchPatterns);
                return {
                    text: inputText,
                    filePath,
                    matches
                };
            })
            .filter(result => {
                return result.matches.length > 0;
            })
            .map(result => {
                return {
                    text: result.text,
                    matchedTexts: result.matches.map(match => result.text.substring(match.startIndex, match.endIndex)),
                    filePath: result.filePath,
                    normalizedFilePath: result.filePath.replace(sourceDir, ""),
                    matches: result.matches
                };
            });
    });
}

describe("SUMMARY", function() {
    it("prototypeメソッドの説明をする前にObject#methodの表記を利用してはいけない", () => {
        // 許可リスト(読み方の解説など)
        const allowFilePathList = [];
        const searchPatterns = ["/\\`[a-zA-Z]+#[a-zA-Z]*\\`/"];
        const prototypeChapter = path.join(sourceDir, "basic/prototype-object/README.md");
        return findUsage(prototypeChapter, searchPatterns, allowFilePathList).then(results => {
            if (results.length === 0) {
                return;
            }
            const message = results.map(result => {
                return `${result.normalizedFilePath} が利用しているので、確認してください。
${result.matchedTexts.join("\n")}
`;
            });
            throw new Error(`${results.length}件のドキュメントがprototypeメソッドを説明前に利用しています。
${message}`);
        });
    });
    it("インスタンスメソッド", () => {
        // 許可リスト(読み方の解説など)
        const allowFilePathList = [];
        const searchPatterns = ["/インスタンスメソッド/", "/静的メソッド/"];
        const prototypeChapter = path.join(sourceDir, "basic/prototype-object/README.md");
        return findUsage(prototypeChapter, searchPatterns, allowFilePathList).then(results => {
            if (results.length === 0) {
                return;
            }
            const message = results.map(result => {
                return `${result.normalizedFilePath} が利用しているので、確認してください。
${result.matchedTexts.join("\n")}
`;
            });
            throw new Error(`${results.length}件のドキュメントがインスタンスメソッドを説明前に利用しています。
${message}`);
        });
    });
});
