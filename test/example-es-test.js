import globby from "globby";
import path from "node:path";
import url from "node:url";

const __filename__ = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename__);
const sourceDir = path.join(__dirname, "..", "source");

/**
 * ESMのexampleを評価するテスト
 * Note: ESMには対応していない
 **/
describe("example:es", function() {
    const esmFiles = globby.sync([
        `${sourceDir}/use-case/todoapp/**/*-example.js`, // *-example.js
        `${sourceDir}/use-case/todoapp/**/*.example.js`, // *.example.js
        `${sourceDir}/use-case/nodecli/**/example/**/*.js`,
        `!${sourceDir}/**/node_modules{,/**}`,
    ]);
    esmFiles.forEach(filePath => {
        const normalizeFilePath = filePath.replace(sourceDir, "");
        // TODO: doctestはしていないで、読み込んでOKかどうかだけ
        it(`example:es ${normalizeFilePath}`, function() {
            return import(filePath).catch(error => {
                // Stack Trace like
                console.error(`Dynamic Eval is failed
    at doctest (${filePath}:1:1)`);
                return Promise.reject(error);
            });
        });
    });
});
