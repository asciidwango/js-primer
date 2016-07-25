// LICENSE : MIT
"use strict";
module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "browser": true,
        "jquery": true,
        "mocha": true
    },
    "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module"
    },
    rules: {
        "indent": [
            "error", 4, {
                "SwitchCase": 1
            }
        ],
        "quotes": ["error", "double"],
        "array-bracket-spacing": [
            "error",
            "never"
        ],
        "brace-style": [
            "error",
            "1tbs"
        ],
        "block-spacing": "error",
        "comma-spacing": "error",
        "computed-property-spacing": "error",
        "no-whitespace-before-property": "error",
        // Object
        "object-curly-newline": ["off", "always"],
        "object-curly-spacing": ["off", "always"],
        "key-spacing": "error",
        "keyword-spacing": "error",
        "linebreak-style": ["error", "unix"],
        "no-multiple-empty-lines": "error",
        "rest-spread-spacing": "error",
        "semi": ["error", "always"],
        "semi-spacing": "error",
        "space-before-blocks": "error",
        "space-before-function-paren": ["error", "never"],
        "space-in-parens": "error",
        "space-infix-ops": "error",
        "space-unary-ops": "error",
        "spaced-comment": [
            "error", "always", {
                "exceptions": ["-", "="],
                "markers": [
                    "eslint",
                    "eslint-env",
                    "eslint-disable",
                    "eslint-enable",
                    "eslint-disable-line",
                    "eslint-disable-next-line",
                    "exported",
                    "globals",
                    "istanbul",
                ],
            }
        ]
    }
};
