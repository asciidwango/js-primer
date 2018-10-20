// MIT © 2017 azu
"use strict";

const DISABLE_PATTERN = /doctest:\s*?disable/;
const ASYNC_TIME_PATTERN = /doctest:\w*?async:(\d+)/;
const ERROR_TYPE_PATTERN = /doctest:\s*([\w\s]*?Error)/;

/**
 * CodeBlockの手前に該当するHTMLコメントはdoctestの制御コードとして扱える
 *
 * @example
 * 以下のは実行されないのでOKになる
 *
 * <!-- doctest:disable -->
 * ```js
 * 1; // => 2
 * ```
 *
 * @example
 * 次はdoctestの結果のError名を指定できる
 *
 * <!-- doctest: ReferenceError -->
 * ```js
 * NO_DEFINE++;
 * ```
 *
 * @type {String}
 */
class DocTestController {
    /**
     * @param {string[]} comments
     */
    constructor(comments) {
        this.comments = comments;
        this._expectedErrorName = this._getExpectedErrorName(comments);
    }

    /**
     * Return true if `this.comments` include DISABLE_PATTERN
     * @returns {boolean}
     */
    get isDisabled() {
        return this.comments.some(comment => {
            return DISABLE_PATTERN.test(comment);
        });
    }

    /**
     * @returns {string|undefined}
     */
    get expectedErrorName() {
        return this._expectedErrorName;
    }

    /**
     * @returns {boolean}
     */
    get hasExpectedError() {
        return this.expectedErrorName !== undefined;
    }

    /**
     * @returns {boolean}
     */
    get isAsyncTesting() {
        return this.comments.some(comment => {
            return ASYNC_TIME_PATTERN.test(comment);
        });
    }

    get asyncTestTimeoutMillSeconds(){
        const timeoutComment = this.comments.find(comment => {
            return ASYNC_TIME_PATTERN.test(comment);
        });
        if (!timeoutComment) {
            return;
        }
        const match = timeoutComment.match(ASYNC_TIME_PATTERN);
        const timeoutMillSecAsString = Number(match && match[1]);
        if(Number.isNaN(timeoutMillSecAsString)){
            throw new Error(`AsyncDocTest: wrong timout format: ${timeoutComment}`);
        }
        return timeoutMillSecAsString;
    }

    /**
     * Return true, if the `error` is expected error name
     * If not defined expected error, return true.
     * @param {Error} [error]
     * @returns {boolean}
     */
    isExpectedError(error) {
        const expectedErrorType = this.expectedErrorName;
        if (!expectedErrorType) {
            return true; // no expected error
        }
        return error.name === expectedErrorType;
    }


    /**
     * Return expected Error name if expected is defined.
     * @returns {string[]}
     * @returns {string|undefined}
     * @private
     */
    _getExpectedErrorName(comments) {
        const expectedErrorTypeComment = comments.find(comment => {
            return ERROR_TYPE_PATTERN.test(comment);
        });
        if (!expectedErrorTypeComment) {
            return;
        }
        const match = expectedErrorTypeComment.match(ERROR_TYPE_PATTERN);
        return match && match[1];
    }
}

module.exports = DocTestController;
