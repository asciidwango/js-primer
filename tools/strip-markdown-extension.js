#!/usr/bin/env node
"use strict";
const execFileSync = require("child_process").execFileSync;
const includeCodeBlock = require.resolve(".bin/include-codeblock");
const bookJSON = require("../book.json");

/**
 * contentからjs-primerで使ってるMarkdownの拡張を取り除く
 * @param {string} content
 * @returns {string}
 */
function stripMarkdownExtension(content) {
    // {{book.console}} を取り除く
    content = content.replace(/^{{\s*?book\.console\s*?}}$/gm, "");
    // {{book.変数}} を 置換する
    Object.keys(bookJSON.variables).forEach(key => {
        const pattern = new RegExp(`{{\\s*?book\.${key}\*\?}}`, "gm");
        content = content.replace(pattern, bookJSON.variables[key]);
    });
    // ## タイトル {#id}
    // GitBookのid拡張を取り除く
    content = content.replace(/^(#+.*){#.*}/gm, "$1");
    return content;
}

/**
 * Usage: node strip-markdown-extension.js /path/to/file.md
 * 標準出力にいらないものを削ったMarkdownを出力
 */
if (!module.parent) {
    const path = require("path");
    if (!process.argv[2]) {
        throw new Error("node strip-markdown-extension.js /path/to/file.md");
    }
    const filePath = path.resolve(process.cwd(), process.argv[2]);
    const includedContent = execFileSync("node", [includeCodeBlock, filePath]);
    console.log(stripMarkdownExtension(String(includedContent)));
}
