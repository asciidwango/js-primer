---
author: azu
---

# オブジェクト

## オブジェクトとは {#what-is-object}

オブジェクトはプロパティの集合です。プロパティとはキー（名前）と値から構成されるものを言います。
キーには文字列またはSymbolが利用でき、値には任意のデータが利用できます。

オブジェクトを作成するには、オブジェクトリテラル（`{}`）を利用する方法が簡単です。
また、オブジェクトリテラルのプロパティ名はクオート（`"`や`'`）を省略することが可能です。

```js
// プロパティ名はクオートを省略することが可能
var obejct = {
    key: "value"
};
```

## プロパティへのアクセス {#property-access}

オブジェクトのプロパティにアクセスする方法として、ドット記法（`.`）を使う方法とブラケット記法（`[]`）があります。

{{book.console}}
```js
var obejct = {
    key: "value"
};
// ドット記法で参照
console.log(obejct.key); // => "value"
// ブラケット記法で参照
console.log(obejct["key"]); // => "value"
```

ドット記法（`.`）では、プロパティ名が変数名と同じく識別子の命名規則を満たす必要があります。（「[変数と宣言][]」を参照）

[import, prop-dot-invalid.js](./src/prop-dot-invalid.js)

一方、ブラケット記法では、`[`と`]`の間に任意の式を書くことができ、その評価結果の文字列をプロパティ名として利用します。
そのため、ブラケット記法では、プロパティ名に任意の文字列や変数を利用できます。

{{book.console}}
```js
var obejct = {
    "ja": "日本語",
    "en": "英語"
};
var myLang = "ja";
console.log(obejct[myLang]); // => "日本語"
```

基本的にはドット記法（`.`）を使い、ドット記法で書けない場合はブラケット記法（`[]`）を使うとよいでしょう。

## プロパティの作成 {#property-created}

オブジェクトは、一度作成した後もその値自体を変更できるためミュータブル（mutable）の特性を持ちます。
そのため、作成したオブジェクトに対して後からプロパティを追加することが可能です。

プロパティの追加の仕方は単純で、作成したいプロパティ名へ値を代入するだけです。
プロパティ名のアクセスはドット記法、ブラケット記法どちらでも可能です。

{{book.console}}
```js
// 空のオブジェクト
var obejct = {};
// `key`プロパティを追加し値を代入
obejct.key = "value";
console.log(obejct.key); // => "value"
```

先ほども紹介したように、ドット記法は変数の識別子として利用可能なプロパティ名しか利用できません。
一方、ブラケット記法は`object[式]`の`式`の評価結果である文字列をプロパティ名として利用できます。
そのため、変数や識別子として扱えない文字列をプロパティとして扱う場合にはブラケット記法を利用します。

{{book.console}}
```js
var key = "key-string";
var object = {};
// `key`の評価結果 "key-string" をプロパティ名に利用
obejct[key] = "value";
// 取り出すときも同じく`key`変数を利用
console.log(obejct[key]); // => "value"
```

ブラケット記法を用いたプロパティ定義は、オブジェクトリテラルの中でも利用できます。
オブジェクトリテラル内でのブラケット記法を使ったプロパティ名は**Computed property names**と呼ばれます。
Computed property namesはES2015から導入された記法ですが、`式`の評価結果をプロパティ名に使う点はブラケット記法と同じです。

{{book.console}}
```js
var key = "key-string";
// Computed Propertyでプロパティを定義する
var object = {
    [key]: "value"
};
console.log(obejct[key]); // => "value"
```

JavaScriptのオブジェクトは、変更不可能と明示しない限り変更可能なmutableの特性をもつことを紹介しました。
そのため、関数が受け取ったオブジェクトに対して、勝手にプロパティを追加することもできてしまいます。

```js
function doSomething(object) {
    object.key = "value";
    // 色々な処理...
}
const object = {};
doSomething(object); // objectが変更されている
console.log(object.key); // => "value"
```

このように、プロパティを初期化時以外に追加してしまうと、そのオブジェクトがどのようなプロパティをもつのかがわかりにくくなります。
そのため、できる限りプロパティは初期化時、つまりオブジェクトリテラルの中で明示したほうがよいといえるでしょう。

### [コラム] constしたのにオブジェクトが変更可能

先ほどのコード例で、`const`で宣言したオブジェクトのプロパティがエラーなく変更できていることが分かります。
次の例をみると、値であるオブジェクトのプロパティが変更できていることが分かります。

{{book.console}}
```js
const object = { key: "value" };
object.key = "Hi!"; // constで定義したobjectが変更できる
console.log(object.key); // => "Hi!"
```

これは、JavaScriptの`const`は値を固定するのではなく、変数への再代入を防ぐためのものです。
そのため、次のような`object`変数への再代入は防ぐことができますが、変数に代入された値であるオブジェクトの変更は防ぐことができません。（「[変数と宣言][ ../variables/README.md#const]」を参照）

```js
const object = { key: "value" };
object = {}; // => SyntaxError
```

作成したオブジェクトのプロパティの変更を防止するには`Object.freeze`メソッドを利用する必要があります。
ただし、Strict modeでないと例外が発生せず、無言で変更を無視するだけとなります。
そのため、`Object.freeze`メソッドを利用する場合は必ずStrict modeと合わせて使います。

{{book.console}}
[import, freeze-property-invalid.js](./src/freeze-property-invalid.js)

## プロパティの存在を確認する

JavaScriptでは、存在しないプロパティに対してアクセスした場合に例外ではなく`undefined`を返します。
次のコードでは、`object`には存在しない`notFound`プロパティにアクセスしていますが、結果として`undefined`という値が返ってきます。

{{book.console}}
```js
var object = {};
console.log(object.notFound); // => undefined
```

このように、JavaScriptでは存在しないプロパティへアクセスした場合に例外が発生しません。
そのため、プロパティ名を間違えた場合などに気づきにくいという問題があります。
オブジェクトはネストできるため、次のようなプロパティ名を途中で間違えていた場合にも気づきにくいという問題が起きやすいです。

{{book.console}}
```js
var widget = {
    window: {
        title: "ウィジェットのタイトル"
    }
};
// `window`を`windw`と間違えている
console.log(widget.windw); // => undefined
// `undefined.title`と書いたのと同じなので、この時初めて例外が投げられる
// "widget.windw is undefined"などの例外が発生する
console.log(widget.windw.title); // => TypeError
```

このような場合に、あるオブジェクトがあるプロパティを持っているを確認する方法がいくつかあります。

### undefinedとの比較

存在しないプロパティへアクセスした場合に、`undefined`を返すため実際にアクセスして比較することでも判定できます。

{{book.console}}
```js
var object = { key: "value" };
// `key`プロパティが`undefined`でないならtrue
if (object.key !== undefined) {
    console.log("`key`プロパティの値は`undefined`");
}
```

しかし、この方法はプロパティの値が`undefined`であった場合に、プロパティがないから`undefined`なのかが区別できないという問題があります。
次のような例は、`key`プロパティは存在していますが、値が`undefined`であるため、存在の判定が上手くできていないことがわかります。

{{book.console}}
```js
var object = { key: undefined };
// `key`プロパティの値が`undefined`
if (object.key !== undefined) {
    // 実行されない文
}
```

### in演算子を使う

`in`演算子は、指定したオブジェクト上に指定したプロパティがあるかを判定できます。

```js
"プロパティ名" in オブジェクト; // true or false
```

次のように、`object`に`key`プロパティが存在するなら、`true`を返します。

```js
var object = { key: undefined };
// `key`プロパティを持っているならtrue
if ("key" in object) {
    console.log("`key`プロパティは存在する");
}
```

しかし、`in`演算子は、`for...in`文と同じく、対象となるオブジェクトのプロパティを列挙する場合、親オブジェクトまで探索し列挙します。
そのため、`object`自身が持っていなくても、親オブジェクトが持っているならば`true`を返してしまいます。

`object`自身がそのプロパティを持っているかを判定するには、`Object#hasOwnProperty`メソッドを使うのが確実です。

### `Object#hasOwnProperty`メソッド

`Object#hasOwnProperty`メソッドを使うことで、オブジェクト自身が指定したプロパティを持っているかを判定できます。

```js
オブジェクト.hasOwnProperty("プロパティ名"); // true or false
```

`hasOwnProperty`メソッドは引数に存在を判定したいプロパティ名を渡し、該当するプロパティを持っている場合は`true`を返します。

{{book.console}}
```js
var object = { key: "value" };
// `object`が`key`プロパティを持っているならtrue
if (object.hasOwnProperty("key")) {
    console.log("`object`は`key`プロパティを持っている");
}
```

## `Object#toString`メソッド

`Object#toString`メソッドは、オブジェクト自身を文字列化するメソッドです。
`String`コンストラクタ関数を使うことでも文字列にすることできますが、どのような違いがあるのでしょうか？(「[暗黙的な型変換](../implicit-coercion/README.md#to-string)」を参照）

実は`String`コンストラクタ関数は、引数に渡されたオブジェクトの`toString`メソッドを呼び出しています。
そのため、`String`コンストラクタ関数と`toString`メソッドの結果はどちらも同じになります。

```js
var object = { key: "value" };
console.log(object.toString()); // => "[object Object]"
// `String`コンストラクタ関数は`toString`メソッドを呼んでいる
console.log(String(object)); // => "[object Object]"
```

このことは、オブジェクトに`toString`メソッドを再定義してみると分かります。
独自の`toString`メソッドを定義したオブジェクトを`String`コンストラクタ関数で文字列化してみます。
すると、再定義した`toString`メソッドの返り値が、`String`コンストラクタ関数の返り値になることが分かります。

```js
// 独自のtoStringメソッドを定義
var customObject = {
    toString() {
        return "value";
    }
};
console.log(String(object)); // => "value"
```

`Object`以外の`Array`や`Number`などもそれぞれ独自の`toString`メソッドを定義しています。
そのため、それぞれのオブジェクトで`toString`メソッドの結果は異なります。

```js
var number = [1, 2, 3];
// Array#toStringが定義されているため、`Object#toString`とは異なる形式となる
console.log(number.toString()); // => "1,2,3";
```

## Object`はすべての元

ここまでは、`Object`自身の機能について見てきましたが、
`Object`には、他の`Array`や`String`、`Function`といった他のオブジェクトとは異なる特徴があります。

すべてのオブジェクトは`Object`コンストラクタの`prototype`オブジェクトを継承しています。
`prototype`オブジェクトはすべてのオブジェクトに備わっている特別なオブジェクトです。
そのため、`Object`はすべてのオブジェクトが共通して利用できるプロパティやメソッドを提供するベースのオブジェクトともいえます。

![他のオブジェクトは`Object`の`prototype`を継承している](./img/object-prototype.png)

具体的にどういうことかを見てみます。
先ほども登場した、`Object#hasOwnProperty`メソッドは、`Object`の`prototype`に`hasOwnProperty`メソッドの定義があります。

{{book.console}}
```js
// `Object`の`prototype`に`hasOwnProperty`メソッドの定義がある
console.log(typeof Object.prototype.hasOwnProperty); // => "function"
```

この`Object.prototype.hasOwnProperty`メソッドの定義は、
`Object`の`prototype`がデフォルトで持っているため、あまり意識する必要はありません。


{{book.console}}
```js
// このような定義が自動的に行われているイメージ
// `Object`の`prototype`に`hasOwnProperty`メソッドの定義を行う
Object.prototype.hasOwnProperty = (propertyName) => {
    // hasOwnPropertyの処理
};
```

`Object`のインスタンスは、この`prototype`オブジェクトに定義されたメソッドやプロパティをインスタンス化時に継承します。
つまり、オブジェクトリテラルや`new Object`でインスタンス化したオブジェクトは、`Object.prototype`に定義されたものが利用できるということです。

{{book.console}}
```
// var object = new Object(); と同じ
var object = {};
// インスタンスがprototypeオブジェクトに定義されたものを継承する
console.log(object.hasOwnProperty === Object.prototype.hasOwnProperty); // => true
```

そのため、`Object.prototype`に定義されている`toString`メソッドや`hasOwnProperty`メソッドが、
`Object`のインスタンスで利用できます。

> `Object`のインスタンス -> `Object.prototype`

先ほど学んだ`in`演算子と`Object#hasOwnProperty`メソッドの違いからもここから生じています。

{{book.console}}
```js
var object = {};
// `object`のインスタンス自体に`toString`メソッドが定義されているわけではない
console.log(object.hasOwnProperty("toString")); // => false
// `in`演算子は指定されたプロパティ名が見つかるまで親を辿るため、`Object.prototype`まで見に行く
console.log("toString" in object); // => true
```

同様に、`Array`コンストラクタなども`Array.prototype`を持っているため、`Array`のインスタンスは`Array.prototype`を継承します。
さらに、`Array.prototype`は`Object.prototype`を継承しているため、`Array`のインスタンスは`Object.prototype`も継承しているのです。

> `Array`のインスタンス -> `Array.prototype` -> `Object.prototype`

そのため、`Array`のインスタンスも`hasOwnProperty`メソッドを利用できます。

{{book.console}}
```
// var array = new Array(); と同じ
var array = [];
// `Array`のインスタンス -> `Array.prototype` -> `Object.prototype`
console.log(array.hasOwnProperty === Object.prototype.hasOwnProperty); // => true
```

この継承の仕組みは、**prototype継承**と呼ばれるJavaScriptのコアとなる概念です。
詳しくは、第n章の"関数"についてで詳しく解説します。

ここでは、`Object`はすべてのオブジェクトの親となるオブジェクトであることだけを覚えておくだけで問題ありません。
これにより、`Array`や`String`などのインスタンスも`Object.prototype`がもつメソッドを利用できる点を覚えておきましょう。

## [コラム] `Object.prototype`を継承しないオブジェクト

`Object`はすべてのオブジェクトの親となるオブジェクトである言いましたが、例外もあります。
`Object.create`メソッドでは、オブジェクトを作る際に親となるオブジェクトを指定できます。

イディオムに近いのですが、`Object.create(null)`とすることで`Object.prototype`を継承しないオブジェクトを作ることができます。
これにより、プロパティやメソッドをなどを全く持たない本当に**空のオブジェクト**を作ることができます。

{{book.console}}
```js
// 親がnull、つまり親がいないオブジェクトを作る
var object = Object.create(null);
// Object.prototypeを継承しないため、hasOwnPropertyが存在しない
console.log(object.hasOwnProperty); // => undefined
```

逆をいえば、オブジェクトリテラルは、`Object.create(Object.prototype)`のようにオブジェクトを作成しているといえます。

{{book.console}}
```js
// var object = {}; と同じ
var object = Object.create(Object.prototype);
console.log(typeof object.hasOwnProperty); // => "function"
```

<!-- textlint-disable preset-ja-technical-writing/ja-no-weak-phrase -->

`Object.create`メソッドはES5から導入され、`Object.create(null)`というイディオムは一部ライブラリなどで`Map`の代わりとして利用されています。
ES2015からは、本物の`Map`が利用できるため`Object.create(null)`を直接利用するケースは今後少なくなっていくかもしれません。

<!-- textlint-enable preset-ja-technical-writing/ja-no-weak-phrase -->


## オブジェクトの静的メソッド

最後に`Object`の静的メソッドについて見ていきましょう。

### オブジェクトの列挙

オブジェクトはプロパティの集合です。
そのオブジェクトのプロパティを列挙する方法として、`Object.keys`メソッド、`Object.values`メソッド、`Object.entries`メソッドがあります。
これらのメソッドは、そのオブジェクト自身がもつ列挙可能なプロパティだけを扱います。（「[ループと反復処理][]」を参照）

それぞれ、オブジェクトのキー、値、キーと値の組み合わせを配列にして返します。

```js
var object = {
    "one": 1,
    "two": 2,
    "three": 3
};
// `Object.keys`はキーの列挙した配列を返す
console.log(Object.keys(object)); // => ["one", "two", "three"]
// `Object.values`は値を列挙した配列を返す
console.log(Object.values(object)); // => ["1", "2", "3"]
// `Object.entries`は[キー, 値]の配列を消す
console.log(Object.entries(object)); // => [["one", 1], ["two", 2], ["three", 3]]
```

### オブジェクトのコピー/マージ

`Object.assign`を使うことで、あるオブジェクトを別のオブエジェクトに代入（assign）できます。
`Object.assign`メソッドを使うことで、オブジェクトのコピーやオブジェクト同士のマージを行うできます。

```js
Object.assign(target, ...sources);
````

```js
var objectA = { a: "a" };
var objectB = { b: "b" };
var merged = Object.assign({}, objectA, objectB);
console.log(merged); // => { a: "a", b: "b" }
```

このとき、プロパティ名が重複した場合は、後ろのオブジェクトにより上書きされます。
JavaScriptでは、基本的な処理は左から順番に行います、そのため左から順にオブジェクトが代入されていくと考えるとよいです。

```js
// `version`のプロパティ名が被っている
var objectA = { version: "a" };
var objectB = { version: "b" };
var merged = Object.assign({}, objectA, objectB);
// 後ろにある`objectB`のプロパティで上書きされる
console.log(merged); // => { version: "b" }
```

- `Object.assign({})`でコピー
- `Object.keys`、`Object.values`、`Object.entries`
    - こいつらはIterableじゃなくて普通に配列を返す
- `Object.is`
    - `===`では`+0`と`-0`は区別しない、また`NaN`は区別される


[ループと反復処理]: ../loop/README.md "ループと反復処理"
[変数と宣言]: ../variables/README.md "変数と宣言"
