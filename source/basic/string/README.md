---
author: azu
---

# String

この章ではJavaScriptにおける文字列について学んでいきます。
文字列の表現やその背景にあるユニコードを見ていき、文字列の操作方法について学びます。
そして、文字列を編集して自由な文字列を作れるようになることがこの章の目的です。

## 文字列を作成する

文字列を作成するには文字列リテラルを利用します。
文字列リテラルには3種類ありますが、まずは`"`（ダブルクオート）と`'`（シングルクオート）について見ていきます。
（[データ型とリテラル](../data-type/README.md#string)を参照）

`"`（ダブルクオート）と`'`（シングルクオート）に意味的な違いはありません。
そのため、どちらを使うかは好みやプロジェクトごとのコーディング規約によって異なります。
この書籍では、`"`（ダブルクオート）を主に文字列リテラルとして利用します。

<!-- textlint-disable eslint -->

{{book.console}}

```js
var double = "文字列";
console.log(double); // => "文字列"
var single = '文字列';
console.log(single); // => '文字列'
// どちらも同じ文字列
console.log(double === single);// => true
```

<!-- textlint-enable eslint -->

文字列リテラルは同じ記号が対となるため、次のように文字列の中に同じ記号が出現した場合は、
`\"`のように`\`を使いエスケープする必要があります。

{{book.console}}

```js
var string = "This book is \"js-primer\"";
console.log(string); // => 'This book is "js-primer"'
```
