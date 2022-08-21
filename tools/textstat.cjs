const path = require("path");
const cli = require("textstat").cli;
const getFilePathListAsync = require("gitbook-summary-to-path").getFilePathListAsync;
const sourceDir = path.join(__dirname, "../source");
const OUTLINE = path.join(sourceDir, "README.md");
getFilePathListAsync(OUTLINE).then(fileList => {
    return cli.run({
        globPatterns: fileList.filter(filePath => filePath !== OUTLINE),
        format: "json",
        locale: "en"
    }).then(output => {
        console.log(output);
    }).catch(error => {
        console.error(error);
        process.exit(1);
    });
});