const IS_LINK_CHECK = !!process.env.LINK_CHECK
module.exports = {
  "filters": {
    "comments": true,
    "whitelist": {
      "allow": [
        "/{#[a-z.-]*?}/g",
        "/{{[a-zA-Z.]*?}}/g",
        "と考えるかもしれません"
      ]
    }
  },
  "rules": {
    "@textlint-ja/no-synonyms": {
      "allows": ["アプリ", "ウェブアプリ"]
    },
    // 使っては行けない変数、関数名
    // 詳細: https://github.com/asciidwango/js-primer/issues/804
    "inline-code-denylist": {
      "denylist": ["string", "number", "object", "boolean", "symbol"]
    },
    "footnote-order": true,
    "@textlint-rule/no-unmatched-pair": true,
    "@textlint-rule/require-header-id": true,
    // 箇条書きには。を付けない
    "period-in-list-item": {
      "periodMark": ""
    },
    "no-js-function-paren": {
      "allow": [
        "Symbol"
      ]
    },
    "preset-ja-technical-writing": {
      "sentence-length": {
        "max": 90
      },
      "no-exclamation-question-mark": {
        "allowFullWidthQuestion": true
      },
      "max-kanji-continuous-len": {
        "max": 6,
        "allow": [
          "浮動小数点数",
          "排他的論理和",
          "文字列演算子",
          "厳密等価演算子",
          "不等価演算子",
          "厳密比較演算子",
          "厳密不等価演算子",
          "論理積演算子",
          "論理和演算子",
          "排他的論理和演算子",
          "文字列結合演算子",
          "符号化文字集合"
        ]
      },
      "no-invalid-control-character": {
        "checkCode": true
      }
    },
    "eslint": {
      "configFile": "./config/markdown.eslintrc.js"
    },
    "prh": {
      "rulePaths": [
        "prh.yml"
      ]
    },
    // npm run textlint-linkでのみ外部URLをチェックする
    "no-dead-link": IS_LINK_CHECK
      ? {
        "concurrency": 8,
        "keepAlive": false,
        "ignore": [
          "https://github.com/asciidwango/js-primer/issues/new?*",
          "https://goo.gl/**",
          "https://forms.gle/**",
          "http://localhost:3000/**",
          // .es が正式なのか不明であるため
          // https://github.com/tc39/ecma262/pull/1576
          "https:/tc39.github.io/**"
        ]
      }
      : false
  }
};
