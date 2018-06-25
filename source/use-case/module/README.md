---
author: laco
---

# モジュール {#module}

JavaScriptにおいて、モジュールはひとつのJavaScriptファイルです。
モジュールは、変数や関数などを外部にエクスポートします。
また、別のモジュールで宣言された変数や関数などをインポートして使うことができます。

モジュールのふるまいは**モジュールシステム**によって決められます。
あるモジュールシステムではモジュールとして使えるファイルが、別のモジュールシステムでは使えないこともあります。
モジュールシステムはJavaScriptの実行環境によって異なるため、それぞれの違いを知っておく必要があります。

この章ではJavaScriptの代表的なモジュールシステムである **ECMAScriptモジュール** と **CommonJSモジュール** について、それぞれの概要を見ていきます。

## ECMAScriptモジュール {#es-modules}

ECMAScriptモジュールは、ECMAScriptの`import`、`export`構文を使って記述されるモジュールの形式です。
[export文][]によって外部にエクスポートされた変数や関数などのシンボルを、[import文][]を使って別のモジュールからインポートできます。

まずは`export`文について見ていきましょう。

### エクスポート {#es-modules-export}

エクスポートの方法は、名前付きとデフォルトの2種類があります。
1つのモジュールにつき、名前付きの場合は複数エクスポートできますが、デフォルトエクスポートは1つしかできません。

#### 名前付きエクスポート

名前付きエクスポートにはいくつかの構文のパターンがあります。
次の例は、すでに宣言されている変数をエクスポートする構文です。
`export`文のあとに続けて`{}`を書き、その中にエクスポートする変数を入れます。
このエクスポート方法では、変数名がそのまま他のモジュールからインポートする際の名前になります。

```js
const foo = "foo";
function bar() {};
export { foo, bar };
```

エクスポートする時に名前を変えるには、次のような構文を使います。`as`のあとに続けてエクスポートしたい名前を記述します。

```js
const _foo = "foo";
function _bar() {};
export { _foo as foo, _bar as bar };
```

次の構文では、変数や関数、クラスなどを宣言するのと同時にエクスポートできます。
この構文では宣言された名前がそのままエクスポートされます。

```js
// 変数の宣言のみ
export let foo; // varも使用可
// 宣言と代入
export const bar = "bar"; // var, letも使用可
// 関数の宣言
export function fn(){...}
// クラスの宣言
export class ClassName {...}
```

#### デフォルトエクスポート

デフォルトエクスポートにも名前付きエクスポートと同じようにいくつかの構文があります。

ひとつめは、すでに宣言されている変数をエクスポートする構文です。
`export default`文のあとに続けてエクスポートする式を記述します。

```js
const foo = "foo";
export default foo;
```

名前付きと同じように宣言と同時にエクスポートできますが、関数とクラスに限られます。
また、このとき関数やクラスは名前を省略できます。


```js
// 関数の宣言
export default function fn(){} // classも使用可
// 名前は省略可能
export default function {} // classも使用可
```

名前付きとデフォルトを同時にエクスポートする際は、次のようにデフォルトエクスポートしたいシンボルに`as default`を付与します。


```js
const foo = "foo";
function bar() {};
// fooは名前付き、barはデフォルトとしてエクスポートする
export { foo, bar as default };
```

#### 再エクスポート 

export ... from ... について


### import文

### export文

### script type module


## Node.jsとCommonJS {#module-system}

## バンドル



[export文]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/export
[import文]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import
