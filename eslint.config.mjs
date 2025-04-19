export default [{
    ignores: [
        "**/node_modules/",
        "**/build.js",
        "**/build/",
        "**/html-like-comments-example.js",
        "**/*-invalid.js",
        "**/invalid/**/*.js",
    ],
}, {
    languageOptions: {
        ecmaVersion: 2025,
        sourceType: "module",
    },

    rules: {
        // サンプルコードで概念的な関数を使うことがあるため
        "no-undef": "off",
        // サンプルコードで変数を宣言していないことがあるため
        "no-unused-vars": "off",
        // サンプルコードで console を使うことがあるため
        "no-console": "off",
        // 名前の分かりやすさのために制限する
        // 詳細: https://github.com/asciidwango/js-primer/issues/804
        "id-blacklist": ["error", "string", "number", "object", "boolean", "symbol"],

        indent: ["error", 4, {
            SwitchCase: 1,
        }],

        quotes: ["error", "double", {
            allowTemplateLiterals: true,
        }],

        "array-bracket-spacing": ["error", "never"],
        "brace-style": ["error", "1tbs"],
        "block-spacing": "error",
        "comma-spacing": "error",
        "computed-property-spacing": "error",
        "no-whitespace-before-property": "error",
        "object-curly-newline": ["off", "always"],
        "object-curly-spacing": ["error", "always"],
        "key-spacing": "error",
        "keyword-spacing": "error",
        "linebreak-style": ["error", "unix"],
        "no-multiple-empty-lines": "error",
        "rest-spread-spacing": "error",
        semi: ["error", "always"],
        "semi-spacing": "error",
        "space-before-blocks": "error",
        "space-before-function-paren": ["error", "never"],
        "space-in-parens": "error",
        "space-infix-ops": "error",
        "space-unary-ops": "error",

        "spaced-comment": ["error", "always", {
            exceptions: ["-", "=", "!"],

            markers: [
                "eslint",
                "eslint-env",
                "eslint-disable",
                "eslint-enable",
                "eslint-disable-line",
                "eslint-disable-next-line",
                "exported",
                "globals",
                "istanbul",
                "!",
            ],
        }],

        "prefer-const": "error",
        "no-var": "error",
    },
}];
