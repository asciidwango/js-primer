---
author: azu
---

# String

この章ではJavaScriptにおける文字列について学んでいきます。
文字列の表現やその背景にあるユニコードを見ていき、文字列の操作方法について学びます。
そして、文字列を編集して自由な文字列を作れるようになることがこの章の目的です。

## 文字列を作成する {#create}

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

## 文字列を結合する {#concat}

文字列を結合する簡単な方法は文字列結合演算子（`+`）を使う方法です。

{{book.console}}
```js
var string = "a" + "b";
console.log(string); // => "ab"
```

変数と文字列を結合したい場合も文字列結合演算子で行うことができます。

{{book.console}}
```js
var name = "JavaScript";
console.log("Hello " + name + "!");// => "Hello JavaScript!"
```

特定の書式に値を埋め込みために文字列結合を行う場合には、
テンプレートリテラルを使うとより宣言的に書くことができます。

テンプレートリテラルは `` ` ``（バッククオート）で文字列を作成できる点は、`"`（ダブルクオート）や`'`（シングルクオート）と同じです。
加えて、テンプレートリテラルは文字列中に変数を埋め込むことができます。

テンプレートリテラル中に`${変数名}`で書かれた変数は評価時に展開されます。
つまり、先ほどの文字列結合は次のように書くことができます。

{{book.console}}
```js
var name = "JavaScript";
console.log(`Hello ${name}!`);// => "Hello JavaScript!"
```

## 文字とは

- [ ] 文字列と要素（文字）
- [ ] 文字

## 部分文字列の取得 {#slice}
## 文字列の分解と結合 {#split-join}
## 文字列の比較 {#compare}
## 文字列と正規表現 {#string-and-regexp}

Stringのインスタンスメソッドは、引数として文字列だけではなく、正規表現を渡せるものも多いです。

たとえば、`String#search`も引数に正規表現を渡せるメソッドのひとつです。
`search`メソッドは、引数の文字列が含まれているかを検索し、含まれているなら`true`を返します。

```js
var string = "JavaScript is an implementation of ECMAScript.";
var isIncluded = string.search("ECMAScript");
console.log(isIncluded); // => true
```

`String#search`は引数に文字列だけではなく、正規表現オブジェクトを渡すことができ、
引数に文字列を渡すだけではできなかった曖昧な検索を行うことができます。

```js
var string = "JavaScript is an implementation of ES";
// "ES"または"ECMAScript"にマッチする正規表現で検索
var isIncluded = string.search(/(ES|ECMAScript)/);
console.log(isIncluded); // => true
```

一方、RegExpには`RegExp#test`メソッドという`String#search`メソッドと同様のことを行うものが存在します。
レシーバーが正規表現オブジェクトになっている点を除けば、真偽値を返す点も同様です。

```js
// "ES"または"ECMAScript"にマッチする正規表現
var regExp = /(ES|ECMAScript)/;
var string = "JavaScript is an implementation of ES";
console.log(regExp.test(string)); // => true
```

このように、Stringのインスタンスメソッドの引数に正規表現オブジェクトを渡せるものがあり、
逆にRegExpのインスタンスメソッドに文字列を渡せるなど、文字列と正規表現は関連が深いです。

多くの処理は正規表現を利用すれば書くことができますが、Stringにはより明示的なメソッドが存在するケースもあります。
例えば、文字列の先頭が"ECMAScript"から始まるかを判定したい場合、正規表現を使えば次のように書くことができます。

```js
"ECMAScript is specification".search(/^ECMAScript/);
```

これはは`String#ECMAScript`を使って書くこともできます。

```js
"ECMAScript is specification".startWith("ECMAScript");
```

- [ ] もっと正規表現が複雑な例?

## 文字列の検索 {#search}

- その要素のインデックスが欲しい場合（indexOf）
- その要素自体が欲しい場合（match, slice）
- その要素が含まれているかという真偽値が欲しい場合（includes, search, test）

## 文字列の置換/削除 {#replace-delete}
## 文字列の組み立て {#built}
