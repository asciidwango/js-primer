// MIT © 2017 azu
"use strict";
const path = require("path");
const ignoreFileList = [
    // 演算子はいいかな
    // "source/basic/operator",
    // 文字列リテラルそのものなので無視
    "source/basic/string",
    // これもリテラルの話なので…
    "source/basic/implicit-coercion"
];
/**
 * lineが問題ある行ならばErrorオブジェクトを返す
 * @param {string} line
 * @param {string} filePath ファイルパスは無視したい対象の指定に使う
 * @returns {Error|undefined}
 */
module.exports = function shouldConsoleWithComment(line, filePath) {
    const isIgnored = ignoreFileList.some(ignoreFilePath => {
        return filePath.includes(path.normalize(ignoreFilePath));
    });
    if (isIgnored) {
        return;
    }
    if (!/\/\/\s*=>\s*/.test(line)) {
        return;
    }
    if (line.includes("console.")) {
        return;
    }
    // エラーの場合は無視
    if (/=>.*Error/.test(line)) {
        return;
    }
    // template literalっぽいのは無視
    if (line.includes("`")) {
        return;
    }
    return new Error(`console.log(式); // => 評価結果 にそろえてください
該当コード: ${line}`);
};
