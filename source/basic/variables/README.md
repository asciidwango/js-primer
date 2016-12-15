---
author: azu
---

# 変数と宣言

プログラミング言語には、数値などのデータに名前を付けたり繰り返し利用するために、データを保持するための**変数**があります。

JavaScriptでは、「これは変数です」という宣言をするキーワードとして、
`var`、`let`、`const`があります。

この章では、変数の宣言方法を見ていきます。

<!-- TODO(azu): 章なのかどうかは後で -->

- [ ] グローバル変数について書く（use strictの説明が先に欲しい）

## `var` {#var}

`var` というキーワードを使い**変数宣言**をできます。

<!-- 変数名はキャメルケース、日本語はそのまま使える ということを示したい -->

たとえば、次のコードでは、`bookTitle`という変数を宣言しています。
この場合、`bookTitle`は値が代入されていないため、デフォルト値として`undefined`で初期化されます。

```js
var bookTitle;
```

この`bookTitle`という変数には、`=`演算子を使うことで値を代入できます。

```js
var bookTitle;
bookTitle = "JavaScriptの本";
```

変数宣言と同時に初期値を代入することもできます。
次の例では、`bookTitle`という変数を宣言し、`"JavaScriptの本"` という文字列を代入しています。

```js
var bookTitle = "JavaScriptの本";
```

また、変数宣言は `,` で区切ることにより、同時に複数の変数を定義できます。
次のコードでは、`bookTitle`と`bookCategory`の変数を順番に定義しています。

```js
var bookTitle = "JavaScriptの本",
    bookCategory = "プログラミング";
```

これは次のように書いた場合と同じ意味になります。

```js
var bookTitle = "JavaScriptの本";
var bookCategory = "プログラミング";
```

### 変数名に利用できる文字種

JavaScriptでは変数名として使える文字列には次のルールがあります。

- 先頭の1文字目は `$`、`_`、アルファベット、`\uXXXX` 形式のUnicodeエスケープシーケンス
    - アルファベットは "A" から "Z"（大文字）と "a" から "z"（小文字)
- 2文字目以降は、上記に加えて、数字、一部Unicode文字、U+200C、U+200D

このルールの例外として、予約語として定義されているキーワードは変数名には利用できません。
[JavaScript variable name validator][]でどのような変数が利用可能かをチェックできます。

```js
var $; // OK: $から開始できる
var _title; // OK: _から開始できる
var jquery; // OK: アルファベット
var es6; // OK: 数字は先頭以外なら利用できる
var valid日本語; // OK: 先頭以外なら一部Unicode文字も利用可能
// 同じ変数名で再定義も可能
var es6 = "ES2015";
```

次のような変数は上記のルールに反するため、Syntax Errorとなります。

<!-- ESLintのパースエラーを避けるためわざと言語指定をしてない -->

```
var 2nd; // NG: 数字から始まっている
var var; // NG: `var`は予約語であるため利用できない
```


先ほど紹介したように変数の宣言に利用できるキーワードとして、`var`以外にも`let`と`const`があります。
どちらもここで紹介した変数宣言の一種で、構文や利用できる変数名の範囲も同じです。

それでは、次は`let`と`const`について見ていきます。

## [ES2015] `let` {#let}

`let`は、現在のブロックスコープに対して変数宣言するキーワードです。
ブロックスコープについて N章 で扱うため、現時点では「よりよい`var`」ということだけ覚えておくとよいです。

- [ ] N章は仮置き

`let`の使い方は`var`と全く同じです。

```js
let bookTitle = "JavaScriptの本";
```

また、`let`と`const`は同一スコープ内で同じ変数名を再定義できません。
次のように同じ変数名で再定義しようとするSyntaxErrorになります。
そのため、間違えて変数を二重に定義してしまうというミスを防ぐことができます。

[import, let-duplicated-define-invalid.js](src/let-duplicated-define-invalid.js)

## [ES2015] `const` {#const}


最後に`const`ですが、`let`に対してさらに制約をつけた変数宣言という位置づけになります。
名前から変わることがない**値**を宣言するキーワードのように見えます。
実際には、再代入できない**変数**を宣言するキーワードとなっています。

先ほどの`var`や`let`では、変数宣言と代入を別々に行うことができました。

```js
let bookTitle;
bookTitle = "JavaScriptの本"; // varやletは再代入できる
```

しかし、`const`での宣言と代入を別々に行うコードは`SyntaxError`、つまり構文エラーとなります。

[import, const-without-assign-invalid.js](./src/const-without-assign-invalid.js)

`const`は必ず宣言と代入を同時に行う必要があります。

```js
const bookTitle = "JavaScriptの本";
```

そして、一度`const`で宣言された変数には再代入できなくなります。
そのため、次のコードでは`bookTitle`を上書きしようとして`TypeError`となります。

[import, const-do-not-assign-invalid.js](src/const-do-not-assign-invalid.js)

一般に変数への再代入は「変数の値は最初に定義した値と常に同じである」という参照透過性を壊すため、
バグを発生させやすい要因として知られています。
変数を再代入をしたいケースはループ中に値の変化させたい場合などがありますが、
すでにJavaScriptには多くのケースで代替できる表現を持っています。

つまり、多くのケースでは`var`や`let`ではなく`const`で書くことできます。
それにより、早い段階でバグに気づくことができるため、`const`が利用できる際は積極的に利用していくことを推奨しています。

## まとめ

JavaScriptにおける変数宣言として`var`、`let`、`const`があることについて学びました。

`var`は基礎となる変数宣言ですが、殆どのケースで`let`に置き換えが可能です。
`const`は再代入できない変数を宣言するキーワードです。
再代入を禁止することで、ミスから発生するバグを減らすことが期待できます。

一方、JavaScriptには変更できない値を作成する機能も存在します。
そのことについては 第M章 で紹介します。

- [ ] 第M章は後で設定する必要がある

[JavaScript variable name validator]: https://mothereff.in/js-variables  "JavaScript variable name validator"
