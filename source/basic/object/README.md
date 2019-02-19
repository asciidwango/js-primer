---
author: azu
description: "JavaScriptのObjectはオブジェクトの基礎となるものです。オブジェクトとプロパティの作成、更新、削除などの基本的な操作について紹介します。"
---

# オブジェクト {#object}

オブジェクトはプロパティの集合です。プロパティとは名前（キー）と値（バリュー）が対になったものです。
プロパティのキーには文字列または`Symbol`が利用でき、値には任意のデータが指定できます。
また、1つのオブジェクトは複数のプロパティを持てるため、1つのオブジェクトで多種多様な値を表現できます。

今までも登場してきた、配列や関数などもオブジェクトの一種です。
この章では、あらゆるオブジェクトのもととなる`Object`というビルトインオブジェクトについて見ていきます。

## オブジェクトを作成する {#create-object}

オブジェクトを作成するには、オブジェクトリテラル（`{}`）を利用します。

```js
// プロパティをもたない空のオブジェクトを作成
const object = {};
```

オブジェクトリテラルでは、初期値としてプロパティをもつオブジェクトを作成できます。
プロパティは、オブジェクトリテラル（`{}`）の中にキーと値を`:`（コロン）で区切り記述します。

```js
// プロパティをもつオブジェクトを定義する
const object = {
    // キー: 値
    "key": "value"
};
```

オブジェクトリテラルのプロパティ名（キー）はクオート（`"`や`'`）を省略できます。
そのため、次のように書いても同じです。

```js
// プロパティ名（キー）はクオートを省略することが可能
const object = {
    // キー: 値
    key: "value"
};
```

オブジェクトリテラルでは複数のプロパティ（キーと値の組み合わせ）をもつオブジェクトも作成できます。
複数のプロパティを定義するには、それぞれのプロパティを`,`（カンマ）で区切ります。

```js
const color = {
    // それぞれのプロパティは`,`で区切る
    red: "red",
    green: "green",
    blue: "blue"
};
```

プロパティの値に変数名を指定すれば、そのキーは指定した変数を参照します。

{{book.console}}
```js
const name = "名前";
// `name`プロパティ
const object = {
    name: name
};
console.log(object); // => { name: "名前" }
```

またES2015からは、プロパティ名と値に指定する変数名が同じ場合は`{ name }`のように省略して書けます。
次のコードは、プロパティ名`name`に変数`name`を値にしたプロパティを設定しています。

{{book.console}}
```js
const name = "名前";
// `name`というプロパティ名で`name`の変数を値に設定
const object = {
    name
};
console.log(object); // => { name: "名前" }
```

この省略記法は、モジュールや分割代入においても共通した表現です。
そのため、`{}`の中でプロパティ名が単独で書かれている場合は、この省略記法を利用していることに注意してください。

### `{}`は`Object`のインスタンスオブジェクト {#object-instance-object}

JavaScriptには`Object`というビルトインオブジェクトがあります。
オブジェクトリテラル（`{}`）は、このビルトインオブジェクトである`Object`を元にして新しいオブジェクトを作成するための構文です。

<!-- textlint-disable no-js-function-paren -->

オブジェクトリテラル以外の方法として、`new`演算子を使うことで、`Object`から新しいオブジェクトを作成できます。
次のコードでは、`new Object()`でオブジェクトを作成していますが、これは空のオブジェクトリテラルと同じ意味です。

{{book.console}}
```js
// プロパティをもたない空のオブジェクトを作成
// = `Object`からインスタンスオブジェクトを作成
const object = new Object();
console.log(object); // => {}
```

オブジェクトリテラルの方が明らかに簡潔で、プロパティの初期値も指定できるため、`new Object()`を使う利点はありません。

`new Object()`でオブジェクトを作成することは、「`Object`のインスタンスオブジェクトを作成する」といいます。
しかしながら、`Object`やインスタンスオブジェクトなどややこしい言葉の使い分けが必要となってしまいます。
そのため、この書籍ではオブジェクトリテラルと`new Object`どちらの方法であっても、単に「オブジェクトを作成する」と呼びます。

オブジェクトリテラルは、`Object`から新しいインスタンスオブジェクトを作成していることを意識しておくとよいでしょう。

<!-- textlint-enable no-js-function-paren -->

## プロパティへのアクセス {#property-access}

オブジェクトのプロパティにアクセスする方法として、ドット記法（`.`）を使う方法とブラケット記法（`[]`）があります。
それぞれの記法で、オブジェクトの右辺へプロパティ名を指定すると、その名前をもったプロパティの値を参照できます。

{{book.console}}
```js
const object = {
    key: "value"
};
// ドット記法で参照
console.log(object.key); // => "value"
// ブラケット記法で参照
console.log(object["key"]); // => "value"
```

ドット記法（`.`）では、プロパティ名が変数名と同じく識別子の命名規則を満たす必要があります。（詳細は[変数と宣言][]の章を参照）

[import, prop-dot-invalid.js](./src/prop-dot-invalid.js)

一方、ブラケット記法では、`[`と`]`の間に任意の式を書くことができます。
そのため、識別子の命名規則とは関係なく、任意の文字列をプロパティ名として指定できます。

[import, brackets-dot-invalid.js](./src/brackets-dot-invalid.js)

また、ブラケット記法ではプロパティ名に変数も利用できます。
次のコードでは、プロパティ名に`myLang`という変数をブラケット記法で指定しています。

{{book.console}}
```js
const languages = {
    ja: "日本語",
    en: "英語"
};
const myLang = "ja";
console.log(languages[myLang]); // => "日本語"
```

ドット記法ではプロパティ名に変数は利用できないため、プロパティ名に変数を指定した場合はブラケット記法を利用します。
基本的には簡潔なドット記法（`.`）を使い、ドット記法で書けない場合はブラケット記法（`[]`）を使うとよいでしょう。

## オブジェクトと分割代入 {#object-destructuring}

同じオブジェクトのプロパティを何度もアクセスする場合に、何度も`オブジェクト.プロパティ名`と書くと冗長となりやすいです。
そのため、短い名前で利用できように、そのプロパティを変数として定義し直すことがあります。

次のコードでは、`languages`オブジェクトのプロパティをそれぞれ変数`ja`と`en`と定義し直しています。

{{book.console}}
```js
const languages = {
    ja: "日本語",
    en: "英語"
};
const ja = languages.ja;
const en = languages.en;
console.log(ja); // => "日本語"
console.log(en); // => "英語"
```

このようなオブジェクトのプロパティを変数として定義し直すときには、分割代入（Destructuring assignment）が利用できます。

オブジェクトの分割代入では、左辺にオブジェクトリテラルのような構文で変数名を定義します。
右辺のオブジェクトから対応するプロパティ名が、左辺で定義した変数に代入されます。

次のコードでは、先程のコードと同じように`languages`オブジェクトから`ja`と`en`プロパティを取り出して変数として定義しています。
代入演算子のオペランドとして左辺と右辺それぞれに`ja`と`en`と書いていたのが、一度で書くだけで済むため短く書けます。

{{book.console}}
```js
const languages = {
    ja: "日本語",
    en: "英語"
};
const { ja, en } = languages;
console.log(ja); // => "日本語"
console.log(en); // => "英語"
```

## プロパティの追加 {#add-property}

オブジェクトは、一度作成した後もその値自体を変更できるというミュータブル（mutable）の特性を持ちます。
そのため、作成したオブジェクトに対して、後からプロパティを追加できます。

プロパティの追加方法は単純で、作成したいプロパティ名へ値を代入するだけです。
そのとき、オブジェクトに指定したプロパティが存在しないなら、自動的にプロパティが作成されます。

プロパティの追加はドット記法、ブラケット記法どちらでも可能です。

{{book.console}}
```js
// 空のオブジェクト
const object = {};
// `key`プロパティを追加し値を代入
object.key = "value";
console.log(object.key); // => "value"
```

先ほども紹介したように、ドット記法は変数の識別子として利用可能なプロパティ名しか利用できません。
一方、ブラケット記法は`object[式]`の`式`の評価結果を文字列にしたものをプロパティ名として利用できます。
そのため、次のものをプロパティ名として扱う場合にはブラケット記法を利用します。

- 変数
- 識別子として書けない文字列
- Symbol

{{book.console}}
```js
const key = "key-string";
const object = {};
// `key`の評価結果 "key-string" をプロパティ名に利用
object[key] = "value of key";
// 取り出すときも同じく`key`変数を利用
console.log(object[key]); // => "value of key"
// Symbolは例外的に文字列化されず扱える
const symbolKey = Symbol("シンボルは一意な値");
object[symbolKey] = "value of symbol";
console.log(object[symbolKey]); // => "value of symbol"
```

ブラケット記法を用いたプロパティ定義は、オブジェクトリテラルの中でも利用できます。
オブジェクトリテラル内でのブラケット記法を使ったプロパティ名は**Computed property names**と呼ばれます。
Computed property namesはES2015から導入された記法ですが、`式`の評価結果をプロパティ名に使う点はブラケット記法と同じです。

{{book.console}}
```js
const key = "key-string";
// Computed Propertyでプロパティを定義する
const object = {
    [key]: "value"
};
console.log(object[key]); // => "value"
```

JavaScriptのオブジェクトは、変更不可能と明示しない限り、変更可能なmutableの特性をもつことを紹介しました。
そのため、関数が受け取ったオブジェクトに対して、勝手にプロパティを追加できてしまいます。

{{book.console}}
```js
function doSomething(object) {
    object.key = "value";
    // 色々な処理...
}
const object = {};
doSomething(object); // objectが変更されている
console.log(object.key); // => "value"
```

このように、プロパティを初期化時以外に追加してしまうと、そのオブジェクトがどのようなプロパティを持っているかがわかりにくくなります。
そのため、できる限り作成後に新しいプロパティは追加しないほうがよいでしょう。
つまり、オブジェクトの作成時のオブジェクトリテラルの中でプロパティを定義することを推奨します。

### プロパティの削除 {#remove-property}

オブジェクトのプロパティを削除するには`delete`演算子を利用します。
削除したいプロパティを`delete`演算子の右辺に指定して、プロパティを削除できます。

{{book.console}}
```js
const object = {
    key1: "value1",
    key2: "value2"
};
// key1プロパティを削除
delete object.key1;
// key1プロパティが削除されている
console.log(object); // => { "key2": "value2" }
```

### [コラム] constで定義したオブジェクトは変更可能 {#const-and-object}

先ほどのコード例で、`const`で宣言したオブジェクトのプロパティがエラーなく変更できていることが分かります。
次のコードを実行してみると、値であるオブジェクトのプロパティが変更できていることが分かります。

{{book.console}}
```js
const object = { key: "value" };
object.key = "Hi!"; // constで定義したobjectが変更できる
console.log(object.key); // => "Hi!"
```

これは、JavaScriptの`const`は値を固定するのではなく、変数への再代入を防ぐためのものです。
そのため、次のような`object`変数への再代入は防ぐことができますが、変数に代入された値であるオブジェクトの変更は防ぐことができません。（「[変数と宣言のconstについて][]」を参照）

```js
const object = { key: "value" };
object = {}; // => SyntaxError
```

作成したオブジェクトのプロパティの変更を防止するには`Object.freeze`メソッドを利用する必要があります。
ただし、strict modeでないと例外が発生せず、無言で変更を無視するだけとなります。
そのため、`Object.freeze`メソッドを利用する場合は必ずstrict modeと合わせて使います。

{{book.console}}
[import, freeze-property-invalid.js](./src/freeze-property-invalid.js)

## プロパティの存在を確認する {#confirm-property}

JavaScriptでは、存在しないプロパティに対してアクセスした場合に例外ではなく`undefined`を返します。
次のコードは、`object`には存在しない`notFound`プロパティにアクセスしているため、`undefined`という値が返ってきます。

{{book.console}}
```js
const object = {};
console.log(object.notFound); // => undefined
```

このように、JavaScriptでは存在しないプロパティへアクセスした場合に例外が発生しません。
プロパティ名を間違えた場合に単に`undefined`という値を返すため、気づきにくいという問題があります。

次のようにプロパティ名を間違えていた場合にも、例外が発生しないため気づきにくいという問題が起きやすいです。
さらにプロパティ名をネストしてアクセスした場合に、初めて例外が発生します。

{{book.console}}
```js
const widget = {
    window: {
        title: "ウィジェットのタイトル"
    }
};
// `window`を`windw`と間違えているが、例外は発生しない
console.log(widget.windw); // => undefined
// さらにネストした場合に、例外が発生する
// `undefined.title`と書いたのと同じ意味となるため
console.log(widget.windw.title); // => TypeError: widget.windw is undefined
// 例外が発生した文以降は実行されない
```

`undefined`や`null`はオブジェクトではないため、存在しないプロパティへアクセスする例外が発生してしまいます。
このような場合に、あるオブジェクトがあるプロパティを持っているかを確認する方法として、次の3つの方法があります。

- `undefined`との比較
- `in`演算子
- `hasOwnProperty`メソッド

### プロパティの存在確認: undefinedとの比較 {#compare-to-undefined}

存在しないプロパティへアクセスした場合に、`undefined`を返すため実際にアクセスして比較することでも判定できます。

{{book.console}}
```js
const object = { key: "value" };
// `key`プロパティが`undefined`ではないなら、プロパティが存在する?
if (object.key !== undefined) {
    console.log("`key`プロパティの値は`undefined`");
}
```

しかし、この方法はプロパティの値が`undefined`であった場合に、プロパティがないため`undefined`なのかが区別できないという問題があります。
次のような例は、`key`プロパティは存在していますが、値が`undefined`であるため、存在の判定が上手くできていないことがわかります。

{{book.console}}
```js
const object = { key: undefined };
// `key`プロパティの値が`undefined`
if (object.key !== undefined) {
    // 実行されない文
}
```

このような問題があるため、プロパティがあるかどうかだけを判定するには`in`演算子か`hasOwnProperty`メソッドを利用します。

### プロパティの存在確認: in演算子を使う {#in-operator}

`in`演算子は、指定したオブジェクト上に指定したプロパティがあるかを判定できます。

<!-- doctest:disable -->
```js
"プロパティ名" in オブジェクト; // true or false
```

次のコードでは`object`に`key`プロパティが存在するかを判定しています。
`in`演算子は、プロパティの値は関係なく、プロパティが存在した場合に`true`を返します。

{{book.console}}
```js
const object = { key: undefined };
// `key`プロパティを持っているならtrue
if ("key" in object) {
    console.log("`key`プロパティは存在する");
}
```

### プロパティの存在確認: `hasOwnProperty`メソッド {#hasOwnProperty-method}

オブジェクトの`hasOwnProperty`メソッドは、オブジェクト自身が指定したプロパティを持っているかを判定できます。
この`hasOwnProperty`メソッドの引数には、存在を判定したいプロパティ名を渡します。

<!-- doctest:disable -->
```js
const object = {};
object.hasOwnProperty("プロパティ名"); // true or false
```

次のコードでは`object`に`key`プロパティが存在するかを判定しています。
`hasOwnProperty`メソッドも、プロパティの値は関係なく、オブジェクトが指定したプロパティを持っている場合に`true`を返します。

{{book.console}}
```js
const object = { key: "value" };
// `object`が`key`プロパティを持っているならtrue
if (object.hasOwnProperty("key")) {
    console.log("`object`は`key`プロパティを持っている");
}
```

`in`演算子と`hasOwnProperty`メソッドは同じ結果を返していますが、厳密には動作が異なるケースもあります。
この動作の違いを知るにはまずプロトタイプオブジェクトという特殊なオブジェクトについて理解する必要があります。
次の章の「[プロトタイプオブジェクト][]」で詳しく解説するため、次の章で`in`演算子と`hasOwnProperty`メソッドの違いを見ていきます。

## `toString`メソッド {#toString-method}

オブジェクトの`toString`メソッドは、オブジェクト自身を文字列化するメソッドです。
`String`コンストラクタ関数を使うことでも文字列化できます。
この2つにはどのような違いがあるのでしょうか？（`String`コンストラクタ関数については「[暗黙的な型変換](../implicit-coercion/README.md#to-string)」を参照）

実は`String`コンストラクタ関数は、引数に渡されたオブジェクトの`toString`メソッドを呼び出しています。
そのため、`String`コンストラクタ関数と`toString`メソッドの結果はどちらも同じになります。

{{book.console}}
```js
const object = { key: "value" };
console.log(object.toString()); // => "[object Object]"
// `String`コンストラクタ関数は`toString`メソッドを呼んでいる
console.log(String(object)); // => "[object Object]"
```

このことは、オブジェクトに`toString`メソッドを再定義してみると分かります。
独自の`toString`メソッドを定義したオブジェクトを`String`コンストラクタ関数で文字列化してみます。
すると、再定義した`toString`メソッドの返り値が、`String`コンストラクタ関数の返り値になることが分かります。

{{book.console}}
```js
// 独自のtoStringメソッドを定義
const customObject = {
    toString() {
        return "custom value";
    }
};
console.log(String(customObject)); // => "custom value"
```

## オブジェクトの静的メソッド {#static-method}

最後にビルトインオブジェクトである`Object`の静的メソッドについて見ていきましょう。
**静的メソッド**（スタティックメソッド）とは、インスタンスの元となるオブジェクトから呼び出せるメソッドのことです。

これまでの`toString`メソッドなどは、`Object`のインスタンスオブジェクトから呼び出すメソッドでした。
これに対して、静的メソッドは`Object`そのものから呼び出せるメソッドです。

ここでは、オブジェクトの処理でよく利用されるいくつかの**静的メソッド**を紹介します。

### オブジェクトの列挙 {#enumeration}

最初に紹介したように、オブジェクトはプロパティの集合です。
そのオブジェクトのプロパティを列挙する方法として、次の3つの静的メソッドがあります。

- `Object.keys`メソッド: オブジェクトのプロパティ名の配列にして返す
- `Object.values`メソッド: オブジェクトの値の配列にして返す
- `Object.entries`メソッド: オブジェクトのプロパティ名と値の配列の配列を返す

それぞれ、オブジェクトのキー、値、キーと値の組み合わせを配列にして返します。

{{book.console}}
```js
const object = {
    "one": 1,
    "two": 2,
    "three": 3
};
// `Object.keys`はキーの列挙した配列を返す
console.log(Object.keys(object)); // => ["one", "two", "three"]
// `Object.values`（ES2017）は値を列挙した配列を返す
console.log(Object.values(object)); // => ["1", "2", "3"]
// `Object.entries`（ES2017）は[キー, 値]の配列を返す
console.log(Object.entries(object)); // => [["one", 1], ["two", 2], ["three", 3]]
```

これらの列挙する静的メソッドと配列の`forEach`メソッドなどを組み合わせれば、プロパティに対して反復処理ができます。
次のコードでは、`Object.keys`メソッドで取得したプロパティ名の一覧をコンソールへ出力しています。

{{book.console}}
```js
const object = {
    "one": 1,
    "two": 2,
    "three": 3
};
const keys = Object.keys(object);
keys.forEach(key => {
    console.log(key);
});
// 次の値が順番に出力される
// "one"
// "two"
// "three"
```

### オブジェクトのマージと複製 {#copy-and-merge}

`Object.assign`メソッドは、あるオブジェクトを別のオブジェクトに代入（assign）できます。
このメソッドを使うことで、オブジェクトの複製やオブジェクト同士のマージができます。

`Object.assign`メソッドは、`target`オブジェクトに対して、1つ以上の`sources`オブジェクトを指定します。
`sources`オブジェクト自身がもつ列挙可能なプロパティを第一引数の`target`オブジェクトに対してコピーします。
`Object.assign`メソッドの返り値は、`target`オブジェクトになります。

<!-- doctest:disable -->
```js
const object = Object.assign(target, ...sources);
```

#### オブジェクトのマージ {#merge}

具体的なオブジェクトのマージの例を見ていきます。

次のコードでは、新しく作った空のオブジェクトを`target`にしています。
この空のオブジェクト（`target`）に`objectA`と`objectB`をマージしたものが、`Object.assign`メソッドの返り値となります。

{{book.console}}
```js
const objectA = { a: "a" };
const objectB = { b: "b" };
const merged = Object.assign({}, objectA, objectB);
console.log(merged); // => { a: "a", b: "b" }
```

第一引数には空のオブジェクトではなく、既存のオブジェクトも指定できます。
第一引数に既存のオブジェクトを指定した場合は、そのオブジェクトのプロパティが変更されます。

次のコードでは、第一引数に指定された`objectA`に対してプロパティが追加されています。

{{book.console}}
```js
const objectA = { a: "a" };
const objectB = { b: "b" };
const merged = Object.assign(objectA, objectB);
console.log(merged); // => { a: "a", b: "b" }
// `objectA`が変更されている
console.log(objectA); // => { a: "a", b: "b" }
console.log(merged === objectA); // => true
```

空のオブジェクトを`target`にすることで、既存のオブジェクトには影響を与えずマージしたオブジェクトを作ることができます。
そのため、`Object.assign`メソッドの第一引数には、空のオブジェクトリテラルを指定するのが典型的な利用方法です。

このとき、プロパティ名が重複した場合は、後ろのオブジェクトのプロパティにより上書きされます。
JavaScriptでは、基本的に処理は先頭から後ろへと順番に行います。
そのため、空のオブジェクトへ`objectA`を代入してから、その結果に`objectB`を代入するという形になります。

{{book.console}}
```js
// `version`のプロパティ名が被っている
const objectA = { version: "a" };
const objectB = { version: "b" };
const merged = Object.assign({}, objectA, objectB);
// 後ろにある`objectB`のプロパティで上書きされる
console.log(merged); // => { version: "b" }
```

#### オブジェクトのspread構文でのマージ {#object-spread-syntax}

ES2018では、オブジェクトのマージを行うオブジェクトの`...`（spread構文）が追加されました。
ES2015で配列の要素を展開する`...`（spread構文）はサポートされていましたが、オブジェクトに対してもES2018でサポートされました。
オブジェクトのspread構文は、オブジェクトリテラルの中に指定したオブジェクトのプロパティを展開できます。

オブジェクトのspread構文は、`Object.assign`とは異なり必ず新しいオブジェクトを作成し返します。
なぜならspread構文はオブジェクトリテラルの中でのみ記述でき、オブジェクトリテラルは新しいオブジェクトを返すためです。

次のコードでは`objectA`と`objectB`をマージした新しいオブジェクトを返します。

{{book.console}}
<!-- TODO: esprimaがES2018に対応していない -->
<!-- doctest:disable -->
```js
const objectA = { a: "a" };
const objectB = { b: "b" };
const merged = { 
    ...objectA,
    ...objectB
};
console.log(merged); // => { a: "a", b: "b" }
```

プロパティ名が被った場合の優先順位は、後ろにあるプロパティほど優先されます。
そのため同じプロパティ名をもつオブジェクトをマージした場合には、後ろにあるオブジェクトによってプロパティが上書きされます。

{{book.console}}
<!-- doctest:disable -->
```js
// `version`のプロパティ名が被っている
const objectA = { version: "a" };
const objectB = { version: "b" };
const merged = { 
    ...objectA,
    ...objectB,
    other: "other"
};
// 後ろにある`objectB`のプロパティで上書きされる
console.log(merged); // => { version: "b", other: "other" }
```

#### オブジェクトの複製 {#copy}

<!-- textlint-disable preset-ja-technical-writing/max-ten -->
<!-- Object.assignの引数と、で並び順を合わせるため例外的に許可 -->

JavaScriptには、オブジェクトを複製する関数は用意されていません。
しかし、新しく空のオブジェクトを作成し、そこへ既存のオブジェクトのプロパティをコピーすれば、それはオブジェクトの複製をしているといえます。
次のように、`Object.assign`メソッドを使うことでオブジェクトを複製できます。

<!-- textlint-enable preset-ja-technical-writing/max-ten -->

{{book.console}}
```js
// `object`を浅く複製したオブジェクトを返す
const shallowClone = (object) => {
    return Object.assign({}, object);
};
const object = { a: "a" };
const cloneObject = shallowClone(object);
console.log(cloneObject); // => { a: "a" }
// オブジェクトを複製しているので、異なるオブジェクトとなる
console.log(object === cloneObject); // => false
```

注意点として、`Object.assign`メソッドは`sources`オブジェクトのプロパティを浅くコピー（shallow copy）する点です。
shallow copyとは、`sources`オブジェクトの直下にあるプロパティだけをコピーするということです。
そのプロパティの値がオブジェクトである場合に、ネストした先のオブジェクトまでも複製するわけではありません。

{{book.console}}
```js
const shallowClone = (object) => {
    return Object.assign({}, object);
};
const object = { 
    level: 1,
    nest: {
        level: 2
    },
};
const cloneObject = shallowClone(object);
// `nest`オブジェクトは複製されていない
console.log(cloneObject.nest === object.nest); // => true
```

逆にプロパティの値までも再帰的に複製してコピーすることを、深いコピー（deep copy）と呼びます。
shallow copyで再帰的にコピー処理することで、deep copyを実現できます。
次のコードでは、`shallowClone`を使い、`deepClone`を実現しています。

{{book.console}}
```js
// `object`を浅く複製したオブジェクトを返す
const shallowClone = (object) => {
    return Object.assign({}, object);
};
// `object`を深く複製したオブジェクトを返す
function deepClone(object) {
    const newObject = shallowClone(object);
    // プロパティがオブジェクト型であるなら、再帰的に複製する
    Object.keys(newObject)
        .filter(k => typeof newObject[k] === "object")
        .forEach(k => newObject[k] = deepClone(newObject[k]));
    return newObject;
}
const object = { 
    level: 1,
    nest: {
        level: 2
    }
};
const cloneObject = deepClone(object);
// `nest`オブジェクトも再帰的に複製されている
console.log(cloneObject.nest === object.nest); // => false
```

このように、JavaScriptのビルトインメソッドは浅い（shallow）実装のみを提供し、深い（deep）実装は提供していないことが多いです。
言語としては最低限の機能を提供し、より複雑な機能はユーザー側で実装するという形式を取るためです。

このようにJavaScriptという言語はコアにある機能が最低限であるため、ユーザーが作成した小さな機能をもつライブラリが数多く公開されています。
それらのライブラリはnpmと呼ばれるJavaScriptのパッケージ管理ツールで公開され、JavaScriptのエコシステムを築いています。
npmについては「[ユースケース: Node.jsでCLIアプリケーション][]」の章で紹介します。

[ループと反復処理]: ../loop/README.md "ループと反復処理"
[変数と宣言]: ../variables/README.md "変数と宣言"
[クラス]: ../class/README.md "クラス"
[プロトタイプオブジェクト]: ../prototype-object/README.md "クラス"
[変数と宣言のconstについて]: ../variables/README.md#const
[ユースケース: Node.jsでCLIアプリケーション]: ../../use-case/nodecli/README.md
