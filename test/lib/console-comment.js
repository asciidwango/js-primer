// MIT © 2017 azu
"use strict";
const esprima = require("esprima");
const esquery = require("esquery");
const path = require("path");
const ignoreFileList = [
    // 演算子はいいかな
    "source/basic/operator",
    // これもリテラルの話なので…
    "source/basic/implicit-coercion"
];
/**
 * 変数を含んでいるか
 * @param {Object} AST
 * @returns {boolean}
 */
const isIncludeVariableInExpression = (AST) => {
    // 例外
    // call({ x : 1})
    const Identifiers = esquery(AST, "*:not(Property) Identifier");
    if (Identifiers.length > 0) {
        return true;
    }
    return false;
};
/**
 * コードで `評価式; // => 評価値` を利用している箇所で
 * `console.log`を付けるかどうかを判定する
 * https://github.com/asciidwango/js-primer/issues/195
 *
 * - 基本的にはconsole.logを利用する
 * - リテラルや変数が登場しないコードでは`console.log`を省いても良い
 *
 * lineが問題ある行ならばErrorオブジェクトを返す
 * @param {string} line
 * @param {string} filePath ファイルパスは無視したい対象の指定に使う
 * @returns {Error|undefined}
 */
module.exports = function shouldConsoleWithComment(line, filePath) {
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

    const AST = esprima.parse(line);
    // 変数を含まないリテラルのみであるならパスする
    if (!isIncludeVariableInExpression(AST)) {
        return;
    }
    // 無視リストに含まれているなら無視
    const isIgnored = ignoreFileList.some(ignoreFilePath => {
        return filePath.includes(path.normalize(ignoreFilePath));
    });
    if(isIgnored) {
        return;
    }
    return new Error(`console.log(式); // => 評価結果 にそろえてください
該当コード: ${line}`);
};
