// MIT © 2019 azu
const { NodeVM } = require("vm2");
const makeConsoleMock = require("consolemock");
/**
 * 次のコメントが実際に実行されないことをテストできるように変換する
 *
 * // この行は実行されません
 *
 * =>
 *
 * throw new Error("この行は実行されません")
 *
 * @param {string} code
 * @returns {string}
 */
export const toUnreachableCode = (code) => {
    return code.replace(/^\s*?\/\/(.*)この行は実行されません$/g, `$1throw new Error("$1この行は実行されません");`);
};


function strictfy(code) {
    const stringLiteralStart = /^["']/;
    if (code.includes("use strict")) {
        return code;
    }
    // Avoid to merge directive prorogue
    if (stringLiteralStart.test(code)) {
        return `"use strict";
; // AVOID DIRECTIVE PROROGUE MERGING
${code}`;

    }
    return `"use strict";
; // AVOID DIRECTIVE PROROGUE MERGING
${code}`;
}

/**
 * "use strict"を付けた形へ変更する
 * ディレクトリプロローグがあると、power-doctestはうまく動かないので、その対応を行う
 * @param {string} code
 * @returns {string}
 */
export const toStrictIfNeeded = (code) => {
    if (/strict modeではない/.test(code)) {
        return code;
    } else {
        return strictfy(code);
    }
};

/**
 * ランダムな非同期処理にかかる時間を減らす
 * dummyFetchのtimeoutなどはテストではtimeoutを短くする
 * @param code
 * @returns {*}
 */
export const fastRandomTimeout = (code) => {
    return code.replace("1000 * Math.random()", "10 * Math.random()");
};
/**
 * テストコード向けにコードを変換する
 * @param {string} code
 * @returns {string}
 */
export const toTestCode = (code) => {
    // 次の順番でコードを変換していく
    const converters = [toStrictIfNeeded, toUnreachableCode, fastRandomTimeout];
    return converters.reduce((computed, convert) => {
        return convert(computed);
    }, code);
};
/**
 * テストコードをVMで実行する
 * @param {string} code
 * @param {string} filePath
 */
export const runTestCode = (code, filePath) => {
    // Run Test Code
    const vm = new NodeVM({
        require: {
            external: true,
            context: {
                console: !!process.env.ENABLE_CONSOLE ? console : makeConsoleMock()
            }
        }
    });
    vm.run(code, filePath);
};
