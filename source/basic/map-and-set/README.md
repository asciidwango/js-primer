---
author: laco
---

# Map/Set

JavaScriptでデータの集まりを扱うコレクションは配列だけではありません。
この章では、マップ型のコレクションである`Map`と、セット型のコレクションである`Set`について学びます。

## Map

[Map][]はマップ型のコレクションを扱うためのビルトインオブジェクトです。
マップとは、キーと値の組み合わせからなる抽象データ型です。
他のプログラミング言語の文脈では辞書やハッシュマップ、連想配列などと呼ばれることもあります。

### マップの作成と初期化

`Map`オブジェクトを`new`することで、新しいマップを作ることができます。
作成されたばかりのマップは何ももっていません。
そのため、マップのサイズを返す`size`プロパティは0を返します。

{{book.console}}
```js
const map = new Map();
console.log(map.size); // => 0
```

`Map`オブジェクトを`new`で初期化するときに、コンストラクタに初期値を渡すことができます。
コンストラクタ引数として渡すことができるのは**エントリー**の配列です。
エントリーとは、ひとつのキーと値の組み合わせを`[キー, 値]`という形式の配列で表現したものです。
そのため、次の例のように配列の配列を渡すことになります。

{{book.console}}
```js
const map = new Map([["key1", "value1"], ["key2", "value2"]]);
// 2個のエントリーで初期化されている
console.log(map.size); // => 2
```

### データの格納と取り出し

作成したマップにはデータを追加して格納できます。
`set`メソッドにキーと値を渡してデータを格納し、`get`メソッドにキーを渡して値を取り出すのが基本的な使い方です。
また、あるキーに紐付いた値が格納されているかどうかを確認する`has`メソッドがあります。

マップに格納されるキーは一意なので、同じキーと複数の値を紐付けることはできません。
同じキーで複数回`set`メソッドを呼び出した場合は、後から追加された値で上書きされます。

{{book.console}}
```js
const map = new Map();
// データの追加
map.set("key", "value1");
console.log(map.get("key")); // => "value1"
console.log(map.size); // => 1
// 値の上書き
map.set("key", "value2");
console.log(map.get("key")); // => "value2"
// キーの存在確認
console.log(map.has("key")); // => true
console.log(map.has("foo")); // => false
```

マップからデータを削除するには、`delete`メソッドを使います。
`delete`メソッドに渡されたキーと、そのキーに紐付いた値がマップから削除されます。
また、マップに格納されているすべてのデータを削除するための`clear`メソッドがあります。

{{book.console}}
```js
const map = new Map();
map.set("key1", "value1");
map.set("key2", "value2");
console.log(map.size); // => 2
map.delete("key1");
console.log(map.size); // => 1
map.clear();
console.log(map.size); // => 0
```

### マップの反復処理

マップの使い道は個別のデータを格納したり、取り出したりするだけではありません。
格納されたすべてのデータを列挙して、反復処理を行うためのメソッドが用意されています。

`forEach`メソッドはマップに格納されたすべてのデータを、マップへの追加順に反復します。
コールバック関数には引数として値、キー、マップの3つが渡されます。

{{book.console}}
```js
const map = new Map();
map.set("key1", "value1");
map.set("key2", "value2");
const results = [];
map.forEach((value, key) => {
    results.push(`${key}:${value}`);
});
console.log(results); // => ["key1:value1","key2:value2"]
```

また、マップはfor...of文で反復することもできます。
マップを反復したときは、エントリーがマップへの追加順に取り出されます。
先述のとおりエントリーは`[キー, 値]`のような配列です。
そのため、配列の分割代入を使うとエントリーからキーと値を簡潔に取り出せます。

{{book.console}}
```js
const map = new Map();
map.set("key1", "value1");
map.set("key2", "value2");
const results = [];
for (const [key, value] of map) {
    results.push(`${key}:${value}`);
}
console.log(results); // => ["key1:value1","key2:value2"]
```

`forEach`メソッドのほかにも、マップを反復するためのメソッドが提供されています。
`keys`メソッドはマップに格納されたすべてのキーを挿入順に並べた**Iterator**オブジェクトを返します。
このIteratorオブジェクトは配列ではないので、`length`プロパティや`forEach`メソッドはもっていません。
基本的にはfor文やfor...of文で反復処理を行うために使われます。
同様に、`values`メソッドはマップに格納されたすべての値を挿入順に並べた**Iterator**オブジェクトを返します。

`entries`メソッドはマップに対してfor...of文を使ったときと同じく、
すべてのエントリーを列挙する**Iterator**オブジェクトを返します。

{{book.console}}
```js
const map = new Map();
map.set("key1", "value1");
map.set("key2", "value2");
const keys = [];
const values = [];
const entries = [];
for (const key of map.keys()) {
    keys.push(key);
}
console.log(keys); // => ["key1","key2"]
for (const value of map.values()) {
    values.push(value);
}
console.log(values); // => ["value1","value2"]
for (const [key, value] of map.entries()) {
    entries.push(`${key}:${value}`);
}
console.log(entries); // => ["key1:value1","key2:value2"]
```

### マップとしてのObjectとMap

ES2015で`Map`が導入されるまで、JavaScriptにおいてマップ型を実現するために`Object`が利用されてきました。
何かをキーにして値にアクセスするという点で、`Map`と`Object`はよく似ています。
ただし、マップとしての`Object`にはいくつかの問題があります。

- `Object`にはプロトタイプがあるため、継承されたプロパティによる意図しないマッピング
- また、プロパティとしてデータを格納するため、キーとして使えるのは文字列か`Symbol`に限られます

`Object`にはプロトタイプがあるため、いくつかのプロパティは初期化されたときから存在します。
`Object`をマップとして使うと、そのプロパティと同じ名前のキーを使おうとしたときに問題があります。
たとえば`constructor`という文字列は`Object.prototype.constructor`プロパティと衝突してしまうため、
オブジェクトのキーに使うことで意図しないマッピングを生じる危険性があります。
この問題はマップとして使う`Object`のインスタンスを`Object.create(null)`のように初期化して作ることで回避されてきました。

{{book.console}}
```js
const map = {};
// マップがキーをもつことを確認する
function has(key) {
    return typeof map[key] !== "undefined";
}
console.log(has("foo")); // => false
// Objectのプロパティが存在する
console.log(has("constructor")); // => true
```

これらの問題を解決するために`Map`が導入されました。
`Map`はプロパティとは異なる仕組みでデータを格納します。
そのため、`Map`のプロトタイプがもつメソッドやプロパティとキーが衝突することはありません。
また、`Map`はマップのキーとしてあらゆるオブジェクトを使うことができます。

他にも`Map`には次のような利点があります。

- マップのサイズを簡単に知ることができる
- マップが格納するデータを簡単に列挙できる
- オブジェクトをキーにすると参照ごとに違うマッピングができる

たとえばショッピングカートのような仕組みを作るとき、次のように`Map`を使って商品のオブジェクトと注文数をマッピングできます。

{{book.console}}
```js
// ショッピングカートを表現するマップ
const shoppingCart = new Map();

// 商品クラス
class ShopItem {
    constructor(name) {
        this.name = name;
    }

    addToCart() {
        if (!shoppingCart.has(this)) {
            shoppingCart.set(this, 0);
        }
        shoppingCart.set(this, shoppingCart.get(this) + 1);
    }
}
// 商品一覧
const shopItems = [
    new ShopItem("りんご"),
    new ShopItem("みかん"),
];

// カートに商品を追加する
shopItems[0].addToCart();
shopItems[0].addToCart();
shopItems[1].addToCart();

// 注文数を合計する
const totalCount = Array.from(shoppingCart.values()).reduce((total, count) => total + count, 0);
console.log(totalCount); // => 3
// カートの中身を表示
const cartItems = [];
for (const [item, count] of shoppingCart) {
    cartItems.push(`${item.name}:${count}`);
}
console.log(cartItems); // => ["りんご:2","みかん:1"]
```

`Object`をマップとして使うときに起きる多くの問題は、`Map`オブジェクトを使うことで解決しますが、
常に`Map`が`Object`の代わりになるわけではありません。
マップとしての`Object`には次のような利点があります。

- リテラル表現があるため作成しやすい
- 規定のJSON表現があるため、`JSON.stringify`関数を使ってJSONに変換するのが簡単である
- ネイティブAPI・外部ライブラリを問わず、多くの関数がマップとして`Object`を渡される設計になっている

たとえば次のようにバックエンドのサーバーにJSONデータを送るような場合は、`Object`を使った簡易なマップのほうが適切でしょう。

```js
function login(id, password) {
    // JSONに変換されるマップ
    const data = { id, password };
    const body = JSON.stringify(data);

    const httpRequest = new XMLHttpRequest();
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(body);
    httpRequest.open("POST", "/api/login");
}
```

### WeakMap

[WeakMap][]は、`Map`と同じくマップを扱うためのビルトインオブジェクトです。
`Map`と違う点は、キーを**弱い参照**（Weak Reference）でもつことです。

[弱い参照][]とは、参照先のオブジェクトをガベージコレクションの対象外にしないための仕組みです。
あるオブジェクトへの参照がすべて弱い参照のとき、そのオブジェクトはいつでもガベージコレクタによって解放できます。
弱い参照は、不要になったオブジェクトを参照し続けて発生するメモリリークを防ぐために使われます。
`WeakMap`では不要になったキーとそれに紐づく値が自動的に削除されるため、メモリリークを引き起こす心配がありません。

`WeakMap`は`Map`と似ていますがiterableではありません。
そのため、キーを列挙する`keys`メソッドや、データの数を返す`size`プロパティなどは存在しません。
また、キーを弱い参照でもつ特性上、プリミティブな値はキーとして使えないことも大きな違いです。

`WeakMap`の主な使い方のひとつは、あるオブジェクトに依存するデータを格納することです。
たとえば次の例では、オブジェクトが発火するイベントのコールバック関数を管理するために、
そのオブジェクトをキーとして`WeakMap`を使っています。

```js
const listenersMap = new WeakMap();

function addListener(targetObj, listener) {
    if (!listenersMap.has(targetObj)) {
        listenersMap.set(targetObj, []);
    }
    listenersMap.set(targetObj, listenersMap.get(targetObj).concat(listener));
}
function triggerListeners(targetObj) {
    if (listenersMap.has(targetObj)) {
        listenersMap.get(targetObj)
            .forEach((listener) => listener());
    }
}
```

また、あるオブジェクトから計算した結果をキャッシュする用途でもよく使われます。
次の例ではDOM要素の高さを計算した結果をキャッシュして、2回目以降に同じ計算をしないようにしています。

```js
const cache = new WeakMap();

function getHeight(element) {
    if (cache.has(element)) {
        return cache.get(element);
    }
    const height = element.getBoundingClientRect().height;
    cache.set(element, height);
    return height;
}
```

### [コラム] キーの等価性とNaNオブジェクト

`Map`に値をセットする際のキーにはあらゆるオブジェクトが使えますが、一部のオブジェクトについては扱いに注意が必要です。

与えられたキーがすでに存在するか、つまり挿入と上書きの判定は基本的に`===`演算子と同じ挙動をしますが、`NaN`は常に等価であるとみなされます。
また、`+0`と`-0`は等価であるとみなされます。
この挙動は[Same-value-zero][]アルゴリズムと呼ばれます。

{{book.console}}
```js
const map = new Map();
map.set(NaN, "value");
console.log(map.get(NaN)); // => "value"
```

## Set

[Set][]はセット型のコレクションを扱うためのビルトインオブジェクトです。
セットとは、重複する値がないことを保証したコレクションのことをいいます。
そのため、値が重複しないことを保証する配列のようなものとしてよく使われます。

## マップの作成と初期化

`Set`オブジェクトを`new`することで、新しいセットを作ることができます。
作成されたばかりのセットは何ももっていません。
そのため、セットのサイズを返す`size`プロパティは0を返します。

{{book.console}}
```js
const set = new Set();
console.log(set.size); // => 0
```

`Set`オブジェクトを`new`で初期化するときに、コンストラクタに初期値を渡すことができます。
コンストラクタ引数として渡すことができるのはiterableオブジェクトです。

{{book.console}}
```js
const set = new Set(["value1", "value2", "value2"]);
// "value2"が重複しているので、セットのサイズは2になる
console.log(set.size); // => 2
```

### データの格納と取り出し

作成したセットにデータを追加するには`add`メソッドを使います。
また、ある値が格納されているかどうかを確認する`has`メソッドがあります。

セットに格納される値は一意なので、同じ値を追加することはできません。
同じ値で複数回`add`メソッドを呼び出した場合は無視されます。

{{book.console}}
```js
const set = new Set();
// 値の追加
set.add("a");
console.log(set.size); // => 1
// 重複する値は追加されない
set.add("a");
console.log(set.size); // => 1
// 値の存在確認
console.log(set.has("a")); // => true
console.log(set.has("b")); // => false
```

セットからデータを削除するには、`delete`メソッドを使います。
`delete`メソッドに渡された値がセットから削除されます。
また、セットに格納されているすべてのデータを削除するための`clear`メソッドがあります。

{{book.console}}
```js
const set = new Set();
set.add("a");
set.add("b");
console.log(set.size); // => 2
set.delete("a");
console.log(set.size); // => 1
set.clear();
console.log(set.size); // => 0
```

### セットの反復処理

セットに格納されたすべてのデータを列挙して、反復処理を行うためのメソッドが用意されています。

`forEach`メソッドはセットに格納されたすべての値を、セットへの追加順に反復します。
コールバック関数には引数として値とセットの2つが渡されます。

{{book.console}}
```js
const set = new Set();
set.add("a");
set.add("b");
const results = [];
set.forEach((value) => {
    results.push(value); 
});
console.log(results); // => ["a","b"]
```

また、セットはfor...of文で反復することもできます。
for...of文でセットを反復したときは、セットへの追加順に値が取り出されます。

{{book.console}}
```js
const set = new Set();
set.add("a");
set.add("b");
const results = [];
for (const value of set) {
    results.push(value);
}
console.log(results); // => ["a","b"]
```

### WeakSet

[WeakSet][]は値への参照を弱い参照とするセットです。
`WeakSet`は`Set`と似ていますが、iterableではないので追加した値を反復できません。
つまり、`WeakSet`は値の追加と削除、存在確認以外のことができません。
データの格納ではなく、データの一意性を確認することに特化したセットといえるでしょう。

[Map]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map
[Same-value-zero]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Equality_comparisons_and_when_to_use_them#Same-value-zero_equality
[Set]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Set
[WeakMap]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
[WeakSet]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/WeakSet
[弱い参照]: https://ja.wikipedia.org/wiki/%E5%BC%B1%E3%81%84%E5%8F%82%E7%85%A7