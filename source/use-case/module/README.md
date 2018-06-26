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

この章ではJavaScriptの代表的なモジュールシステムである **ECMAScriptモジュール（ESモジュール）** と **CommonJSモジュール** について、それぞれの概要を見ていきます。

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

エクスポートする時にエイリアスをつけるには、次のような構文を使います。`as`のあとにエクスポートしたい名前を記述します。

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

再エクスポートとは、別のモジュールからエクスポートされたものを、改めて自分自身からエクスポートしなおすことです。
再エクスポートするは次のように`export`文のあとに`from`を続けて、別のモジュール名を指定します。

```js
// other.jsのすべての名前付きエクスポートを再エクスポートする
export * from "other.js";
// other.jsの名前付きエクスポートを選んで再エクスポートする
export { foo, bar } from "other.js";
// other.jsの名前付きエクスポートにエイリアスをつけて再エクスポートする
export { foo as otherFoo, bar as otherBar } from "other.js";
// other.jsのデフォルトエクスポートをデフォルトエクスポートとして再エクスポートする
export { default } from "other.js";
// other.jsのデフォルトエクスポートを名前付きエクスポートとして再エクスポートする
export { default as otherDefault } from "other.js";
// other.jsの名前付きエクスポートをデフォルトエクスポートとして再エクスポートする
export { foo as default } from "other.js";
```

### import文

`import`文は、別のモジュールからエクスポートされた変数や関数などのシンボルを自身のモジュールにインポートします。
インポートされたシンボルは、そのモジュール内で宣言された変数や関数などと同じように参照できます。

`export`文と同じように、`import`文にも名前付きとデフォルトがあり、それぞれにいくつかの構文があります。

#### 名前付きインポート

名前付きインポートは、指定したモジュールが名前付きでエクスポートしているシンボルを選択してインポートします。
次の例では、`other.js`モジュールから名前付きエクスポートされた`foo`と`bar`をインポートしています。

```js
// 名前付きエクスポートされたfooとbarをインポートする
import { foo, bar } from "other.js";
```

エクスポートするときと同じように、インポートするときにもエイリアスをつけて名前を変えることができます。

```js
// fooとして名前付きエクスポートされたシンボルをotherFooとしてインポートする
import { foo as otherFoo } from "other.js";
```

すべての名前付きエクスポートをまとめてインポートするための、`import * as`という構文もあります。
名前付きエクスポートされたシンボルをすべてプロパティとしてもつオブジェクトとして、モジュールをインポートできます。
このオブジェクトにはデフォルトエクスポートは含まれません。

```js
// すべての名前付きエクスポートをotherオブジェクトとしてまとめてインポートする
import * as other from "other.js";
// fooとして名前付きエクスポートされたシンボルにアクセスする
console.log(other.foo);
```

#### デフォルトインポート

デフォルトエクスポートされたシンボルは専用の構文を使ってインポートします。
`import`のあとに任意の名前をつけてデフォルトエクスポートされたシンボルをインポートします。

```js
// otherDefaultとしてデフォルトエクスポートをインポートする
import otherDefault from "other.js";
```

または、デフォルトエクスポートは`default`という名前の名前付きエクスポートとして扱うこともできます。
次のように、名前付きインポートの構文で`default`を指定し、エイリアスをつけてインポートできます。
ただし、`default`は予約語なので、この方法では必ず`as`構文を使ってエイリアスをつける必要があります。

```js
// otherDefaultとしてデフォルトエクスポートをインポートする
import { default as otherDefault } from "other.js";
```

デフォルトインポートと名前付きインポートは同時に記述できます。
デフォルトインポートの構文と名前付きインポートの構文を組み合わせてもよいですし、
名前付きインポート構文だけで記述しても同じ結果になります。

```js
// otherDefaultとしてデフォルトエクスポートをインポートし、
// 名前付きエクスポートされたfooをインポートする
import otherDefault, { foo } from "other.js";
// 上と同じ結果になる
import { default as otherDefault, foo } from "other.js";
```

#### 付随効果のためのインポート

モジュールの中には、グローバルを実行するだけで何もエクスポートしないものもあります。
そのようなモジュールをインポートするには、付随効果のためのインポート構文を使います。
この構文では、モジュールのグローバルコードを実行するだけで、シンボルを何もインポートしません。

```js
// other.jsのグローバルコードが実行される
import "other.js";
```

### WebブラウザでECMAScriptモジュールを実行する

Webブラウザは、通常のスクリプトとECMAScriptモジュールを区別してJavaScriptファイルを読み込みます。
ECMAScriptモジュールとしてJavaScriptファイルを読み込むためには、`script`タグに`type="module"`という属性を付与します。
`type="module"`属性が付与されない場合はスクリプトとして扱われ、ECMAScriptモジュールの機能は使えません。
スクリプトとして読み込まれたJavaScriptで`import`・`export`文を使用すると、シンタックスエラーが発生します。


```html
<!-- myModule.jsをECMAScriptモジュールとして読み込む -->
<script type="module" src="./myModule.js"></script>
```


## Node.jsとCommonJS {#module-system}

## バンドル



[export文]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/export
[import文]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import
