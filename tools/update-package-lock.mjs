/**
 * Usage: node tools/update-package-lock.mjs
 * Description: This script updates the package-lock.json for aligned with npm version
 */
import globby from "globby";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
// iterate directories which has package-lock.json
// and exec `npm install` to update the package-lock.json
const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const files = await globby([
    join("source/use-case", "**", "package-lock.json"),
    // exclude node_modules
    "!node_modules/**",
], {
    gitignore: true,
    cwd: projectRoot,
});
for (const file of files) {
    const dir = dirname(file);
    console.info(`Updating package-lock.json in ${dir}`);
    await execFile("npm", ["install"], {
        cwd: join(projectRoot, dir)
    });
    console.info(`Updated package-lock.json in ${dir}`);
}
