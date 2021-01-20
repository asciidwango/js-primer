// LICENSE : MIT
"use strict";
const globby = require("globby");
const fs = require("fs");
const path = require("path");
const sourceDir = path.join(__dirname, "..", "source");
const remark = require("remark")();
const select = require("unist-util-select");
const lodash = require("lodash");
const levenshtein = require("js-levenshtein");
/**
 * Usage: node typo-finder.js
 *
 * Find typo using levenshtein algorithm.
 */
const files = globby.sync([
    `${sourceDir}/**/*.md`,
    `!${sourceDir}/**/node_modules{,/**}`,
    `!**/OUTLINE.md`
]);

const strings = [];
files.forEach(filePath => {
    const content = fs.readFileSync(filePath, "utf-8");
    const AST = remark.parse(content);
    const codes = select(AST, `inlineCode`);
    codes.forEach(code => {
        strings.push(code.value);
    });
});

class Typo {
    constructor(strings) {
        this.strings = strings;
        this.groupByKey = lodash.groupBy(strings);
    }

    keys() {
        return Object.keys(this.groupByKey);
    }

    countOfKey(key) {
        if (key in this.groupByKey) {
            return this.groupByKey[key].length;
        }
        return 0;
    }

    getSimilarKey(key, { distance, minKeyLength }) {
        const allKeys = this.keys();
        return allKeys.map(targetKey => {
            const distance = levenshtein(key, targetKey);
            return {
                key: targetKey,
                length: targetKey.length,
                distance
            };
        }).filter(keyInfo => {
            return keyInfo.distance === distance && keyInfo.length >= minKeyLength;
        });
    }

    preferKey(keyA, keyB) {
        return this.countOfKey(keyA) - this.countOfKey(keyB);
    }
}

const typo = new Typo(strings);
typo.keys().forEach(key => {
    const matches = typo.getSimilarKey(key, {
        distance: 1,
        minKeyLength: 3
    });
    if (matches.length === 0) {
        return;
    }
    const preferResults = matches.filter(match => {
        return typo.preferKey(key, match.key) < 0;
    });
    if (preferResults.length === 0) {
        return;
    }
    const print = (results) => {
        return results.map(result => {
            return `${result.key} is used ${typo.countOfKey(result.key)} times. Distance is ${result.distance}`;
        }).join("\n");
    };
    console.log(`
-----------------------
${key} may be typo. It is used at ${typo.countOfKey(key)} times.
Alternatives:
${print(preferResults)}
-----------------------
`);
});
