#!/usr/bin/env node
"use strict";

/**
 * contentからからjs-primerで使ってるMarkdownの拡張を取り除く
 * @param {string} content
 * @returns {string}
 */
function stripMarkdownExtension(content) {
    // {{book.console}} を取り除く
    content = content.replace(/^{{book\.console}}$/gm, "");
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
    const fs = require("fs");
    const path = require("path");
    if (!process.argv[2]) {
        throw new Error("node strip-markdown-extension.js /path/to/file.md");
    }
    const filePath = path.resolve(process.cwd(), process.argv[2]);
    const content = fs.readFileSync(filePath, "utf-8");
    console.log(stripMarkdownExtension(content));
}
