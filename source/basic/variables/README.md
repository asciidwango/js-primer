---
author: azu
description: "JavaScriptの変数宣言する方法についてを紹介します。変数を宣言する方法にはvar、let、constがあり、これらの動作の違いや使い分けについてを紹介します。"
---

<!-- textlint-disable eslint -->

# 変数と宣言 {#variable-and-declaration}

プログラミング言語には、数値などのデータに名前を付けることで、繰り返し利用できるようにする**変数**という機能があります。

JavaScriptでは、「これは変数です」という宣言をするキーワードとして、
`var`、`let`、`const`の3つがあります。

この章では、変数の宣言方法を見ていきます。

## `var` {#var}

`var`キーワードを使い**変数宣言**ができます。

<!-- 変数名はキャメルケース、日本語はそのまま使える ということを示したい -->

たとえば、次のコードでは、`bookTitle`という変数を宣言しています。
この場合、`bookTitle`は値が代入されていないため、デフォルト値として`undefined`で初期化されます。
（`undefined`は値が未定義ということを表す値です）

```js
var bookTitle;
```

この`bookTitle`という変数には、`=`演算子を使うことで値を代入できます。

```js
var bookTitle;
bookTitle = "JavaScriptの本";
```

変数宣言と同時に初期値の代入もできます。
次のコードでは、`bookTitle`という変数を宣言し、同時に`"JavaScriptの本"`という文字列で初期化しています。

```js
var bookTitle = "JavaScriptの本";
```

また、変数宣言は `,`（カンマ）で区切ることにより、同時に複数の変数を定義できます。
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

### 変数名に利用できる文字種 {#variable-name}

JavaScriptでは変数名として使える識別子には次のルールがあります。

- 先頭の1文字目は `$`、`_`、アルファベット、`\uXXXX` 形式のUnicodeエスケープシーケンスのどれか
    - アルファベットは "A" から "Z"（大文字）と "a" から "z"（小文字）
- 2文字目以降は、上記に加えて、数字、一部Unicode文字、U+200C、U+200Dのどれか

このルールの例外として、予約語として定義されているキーワードは変数名には利用できません。
[JavaScript variable name validator][]でどのような変数が利用可能かをチェックできます。

```js
var $; // OK: $から開始できる
var _title; // OK: _から開始できる
var jquery; // OK: アルファベット
var es2015; // OK: 数字は先頭以外なら利用できる
var valid日本語; // OK: 先頭以外なら一部Unicode文字も利用可能
```

次のような変数は上記のルールに反するため、構文エラー（`SyntaxError`）となります。

<!-- doctest:disable -->
```js
var 2nd; // NG: 数字から始まっている
var var; // NG: `var`は予約語であるため利用できない
```

先ほど紹介したように変数の宣言に利用できるキーワードとして、`var`以外にも`let`と`const`があります。
どちらも変数宣言の一種で、利用できる変数名のルールは同じとなります。

それでは、次は`let`と`const`について見ていきます。

## [ES2015] `let` {#let}

`let`キーワードを使い、現在のスコープに対して変数宣言できます。

`let`の使い方は`var`とほとんど同じです。
次のコードでは、`bookTitle`という変数を宣言し、同時に`"JavaScriptの本"` で初期化しています。

```js
let bookTitle = "JavaScriptの本";
```

`let`と`var`は、スコープの扱いと同じ変数名の再定義の扱いが異なります。
スコープについては「[関数とスコープ][]」の章で扱うため、現時点では「よりよい`var`」ということだけ覚えておくとよいです。

`let`と`const`は、同一スコープ内で同じ変数名を再定義できません。
次のように同じ変数名で再定義しようとする構文エラー（`SyntaxError`）になります。
これにより、間違えて変数を二重に定義してしまうというミスを防ぐことができます。

[import, let-duplicated-define-invalid.js](src/let-duplicated-define-invalid.js)

一方、`var`は同一スコープ内で同じ変数名を再定義できます。
これは意図せずに同じ変数名を定義し、値を上書きしてしまう問題があるため、`var`を避ける理由の１つとなります。

```js
var x = 1; // "x"を定義する
var x = 2; // 同じ変数名"x"を定義できる
// 変数xは2となる
```

## [ES2015] `const` {#const}

最後に`const`ですが、`let`に対してさらに制約をつけた変数宣言という位置づけになります。
基本的な使い方は`let`と同じですが、`const`は**再代入できない変数**を定義するキーワードです。

`var`や`let`では、変数宣言と代入を別々に行うことができました。

```js
// varやletで宣言した変数には代入できる
let bookTitle; // `undefined`で初期化される
bookTitle = "JavaScriptの本"; // 値を代入している
```

しかし、`const`での宣言と代入を別々にはできないため、次のコードは構文エラー（`SyntaxError`）となります。

[import, const-without-assign-invalid.js](./src/const-without-assign-invalid.js)

`const`は必ず宣言時に値を指定しなければなりません。

```js
const bookTitle = "JavaScriptの本";
```

そして、一度`const`で宣言された変数には再代入できなくなります。
そのため、次のコードでは`bookTitle`を上書きしようとして`TypeError`となります。

[import, const-do-not-assign-invalid.js](src/const-do-not-assign-invalid.js)

一般的に変数への再代入は「変数の値は最初に定義した値と常に同じである」という参照透過性と呼ばれるルールを壊すため、
バグを発生させやすい要因として知られています。

変数に再代入をしたいケースとして、ループなどの反復処理の途中で値を変化させたい場合などがあります。
しかし、多くのケースで代替できる表現があるため、必ずしも`var`や`let`を使わなくても実現できます。
`const`を使うことでバグに気づきやすくなるため、`const`を積極的に利用していくことを推奨しています。

## [コラム] `const`は定数ではない {#const-is-not-constant}

`const`は「再代入できない変数」を定義する変数宣言であり、必ずしも定数を定義するわけではありません。
定数とは、一度定義した名前（変数名）が常に同じ値を示すものです。

JavaScriptでも、`const`宣言によって定数に近い変数を定義できます。
次のように、`const`宣言によって定義した変数を、変更できないプリミティブな値で初期化すれば、それは実質的に定数です。
プリミティブな値とは、数値や文字列などオブジェクト以外のデータです。（詳細は「[データ型とリテラル][]」の章で解説します）

```js
// TEN_NUMBERという変数は常に10という値を示す
const TEN_NUMBER = 10;
```

しかし、JavaScriptではオブジェクトなども`const`宣言できます。
次のコードのように、オブジェクトという値そのものは、初期化したあとでも変更できます。

```js
// `const`でオブジェクトを定義している
const object = {
    key: "値"
};
// オブジェクトそのものは変更できてしまう
object.key = "新しい値";
```

このように、`const`で宣言した変数が常に同じ値と示すとは限らないため、定数とは呼べません。
（詳細は「[オブジェクト][]」の章で解説します）

また`const`には、変数名の命名規則はなく、代入できる値にも制限はありません。
そのため、`const`宣言の特性として「再代入できない変数」を定義すると理解しておくのがよいでしょう。

## まとめ {#variales-summary}

JavaScriptにおける変数宣言として`var`、`let`、`const`があることについて学びました。

`var`はもっとも基礎的な変数宣言方法です。
`let`と`const`は`var`の問題を改善するためにES2015で導入されました。

`var`は殆どのケースで`let`や`const`に置き換えが可能です。
`const`は再代入できない変数を定義するキーワードです。
再代入を禁止することで、ミスから発生するバグを減らすことが期待できます。

そのため`const`で変数を定義できないかを検討してから、できない場合は`let`を使うことを推奨しています。

<!-- textlint-enable eslint -->

[関数とスコープ]: ../function-scope/README.md
[JavaScript variable name validator]: https://mothereff.in/js-variables
[データ型とリテラル]: ../data-type/README.md
[オブジェクト]: ../object/README.md#const-and-object