// MIT © 2017 azu
"use strict";
const acorn = require("acorn");
const esquery = require("esquery");
const path = require("path");
const ignoreFileList = [
    // 演算子はいいかな
    "source/basic/operator",
    // これもリテラルの話なので…
    "source/basic/implicit-coercion",
    "source/use-case/nodecli/refactor-and-unittest"
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
 * @param {string} text
 * @param {string} filePath ファイルパスは無視したい対象の指定に使う
 * @returns {Error|undefined}
 */
module.exports = function shouldConsoleWithComment(text, filePath) {
    const lines = text.split("\n");
    // 1行以下なら無視する
    if (lines.length <= 1) {
        return;
    }
    lines.forEach(line => {
        const error = checkLineThatShouldHaveComment(line, filePath);
        if (error instanceof Error) {
            throw error;
        }
    });
};
/**
 * @param {string} text
 * @param {string} filePath
 * @returns {Error|undefined}
 */
function checkLineThatShouldHaveComment(text, filePath) {
    if (!/\/\/\s*=>\s*/.test(text)) {
        return;
    }
    if (text.includes("console.")) {
        return;
    }
    // エラーの場合は無視
    if (/=>.*Error/.test(text)) {
        return;
    }
    // template literalっぽいのは無視
    if (text.includes("`")) {
        return;
    }

    const AST = acorn.parse(text, {
        ecmaVersion: 2020
    });
    // 変数を含まないリテラルのみであるならパスする
    if (!isIncludeVariableInExpression(AST)) {
        return;
    }
    // 無視リストに含まれているなら無視
    const isIgnored = ignoreFileList.some(ignoreFilePath => {
        return filePath.includes(path.normalize(ignoreFilePath));
    });
    if (isIgnored) {
        return;
    }
    return new Error(`console.log(式); // => 評価結果 にそろえてください
該当コード: ${text}`);
}
