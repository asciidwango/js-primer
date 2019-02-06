---
author: laco
---

# Map/Set {#map-and-set}

JavaScriptでデータの集まりを扱うコレクションは配列だけではありません。
この章では、マップ型のコレクションである`Map`と、セット型のコレクションである`Set`について学びます。

## Map {#map}

[Map][]はマップ型のコレクションを扱うためのビルトインオブジェクトです。
マップとは、キーと値の組み合わせからなる抽象データ型です。
他のプログラミング言語の文脈では辞書やハッシュマップ、連想配列などと呼ばれることもあります。

### マップの作成と初期化 {#map-new}

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
// 2つのエントリーで初期化されている
console.log(map.size); // => 2
```

### 要素の追加と取り出し {#map-read-and-write}

`Map`には新しい要素を追加したり、追加した要素を取り出したりするためのメソッドがあります。
`set`メソッドは特定のキーと値をもつ要素をマップに追加します。
ただし、同じキーで複数回`set`メソッドを呼び出した際は後から追加された値で上書きされます。

`get`メソッドは特定のキーに紐付いた値を取り出します。
また、特定のキーに紐付いた値をもっているかどうかを確認する`has`メソッドがあります。

{{book.console}}
```js
const map = new Map();
// 新しい要素の追加
map.set("key", "value1");
console.log(map.size); // => 1
console.log(map.get("key")); // => "value1"
// 要素の上書き
map.set("key", "value2");
console.log(map.get("key")); // => "value2"
// キーの存在確認
console.log(map.has("key")); // => true
console.log(map.has("foo")); // => false
```

`delete`メソッドは追加した要素を削除します。
`delete`メソッドに渡されたキーと、そのキーに紐付いた値がマップから削除されます。
また、マップがもつすべての要素を削除するための`clear`メソッドがあります。

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

### マップの反復処理 {#map-iteration}

マップがもつ要素を列挙するメソッドとして、`forEach`、`keys`、`values`、`entries`があります。

`forEach`メソッドはマップがもつすべての要素を、マップへの追加順に反復します。
コールバック関数には引数として値、キー、マップの3つが渡されます。
配列の`forEach`メソッドと似ていますが、インデックスの代わりにキーが渡されます。
配列は順序により要素を特定しますが、マップはキーにより要素を特定するためです。

{{book.console}}
```js
const map = new Map([["key1", "value1"], ["key2", "value2"]]);
const results = [];
map.forEach((value, key) => {
    results.push(`${key}:${value}`);
});
console.log(results); // => ["key1:value1","key2:value2"]
```

`keys`メソッドはマップがもつすべての要素のキーを挿入順に並べた**Iterator**オブジェクトを返します。
同様に、`values`メソッドはマップがもつすべての要素の値を挿入順に並べたIteratorオブジェクトを返します。
これらの戻り値はIteratorオブジェクトであって配列ではありません。
そのため次の例のように、for...of文で反復処理をおこなったり、`Array.from`メソッドに渡して配列に変換して使ったりします。

{{book.console}}
```js
const map = new Map([["key1", "value1"], ["key2", "value2"]]);
const keys = [];
// keysメソッドの戻り値を反復する
for (const key of map.keys()) {
    keys.push(key);
}
console.log(keys); // => ["key1","key2"]
// keysメソッドの戻り値から配列を作る
const keysArray = Array.from(map.keys());
console.log(keysArray); // => ["key1","key2"]
```

`entries`メソッドはマップがもつすべての要素をエントリーとして挿入順に並べたIteratorオブジェクトを返します。
先述のとおりエントリーは`[キー, 値]`のような配列です。
そのため、配列の分割代入を使うとエントリーからキーと値を簡潔に取り出せます。

{{book.console}}
```js
const map = new Map([["key1", "value1"], ["key2", "value2"]]);
const entries = [];
for (const [key, value] of map.entries()) {
    entries.push(`${key}:${value}`);
}
console.log(entries); // => ["key1:value1","key2:value2"]
```

また、マップ自身もiterableなオブジェクトなので、for...of文で反復できます。
マップをfor...of文で反復したときは、すべての要素をエントリーとして挿入順に反復します。
つまり、`entries`メソッドの戻り値を反復するときと同じ結果が得られます。

{{book.console}}
```js
const map = new Map([["key1", "value1"], ["key2", "value2"]]);
const results = [];
for (const [key, value] of map) {
    results.push(`${key}:${value}`);
}
console.log(results); // => ["key1:value1","key2:value2"]
```

### マップとしてのObjectとMap {#object-and-map}

ES2015で`Map`が導入されるまで、JavaScriptにおいてマップ型を実現するために`Object`が利用されてきました。
何かをキーにして値にアクセスするという点で、`Map`と`Object`はよく似ています。
ただし、マップとしての`Object`にはいくつかの問題があります。

- `Object`のプロトタイプから継承されたプロパティによって、意図しないマッピングを生じる危険性があります
- また、プロパティとしてデータをもつため、キーとして使えるのは文字列か`Symbol`に限られます

`Object`にはプロトタイプがあるため、いくつかのプロパティは初期化されたときから存在します。
`Object`をマップとして使うと、そのプロパティと同じ名前のキーを使おうとしたときに問題があります。

たとえば`constructor`という文字列は`Object.prototype.constructor`プロパティと衝突してしまいます。
そのため`constructor`のような文字列をオブジェクトのキーに使うことで意図しないマッピングを生じる危険性があります。
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
- マップがもつ要素を簡単に列挙できる
- オブジェクトをキーにすると参照ごとに違うマッピングができる

たとえばショッピングカートのような仕組みを作るとき、次のように`Map`を使って商品のオブジェクトと注文数をマッピングできます。

{{book.console}}
```js
// ショッピングカートを表現するクラス
class ShoppingCart {
    constructor() {
        // 商品とその数をもつマップ
        this.items = new Map();
    }
    // カートに商品を追加する
    addItem(item) {
        const count = this.items.get(item) || 0;
        this.items.set(item, count + 1);
    }
    // カート内の合計金額を返す
    getTotalPrice() {
        return Array.from(this.items).reduce((total, [item, count]) => {
            return total + item.price * count;
        }, 0);
    }
    // カートの中身を文字列にして返す
    toString() {
        return Array.from(this.items).map(([item, count]) => {
            return `${item.name}:${count}`;
        }).join(",");
    }
}
const shoppingCart = new ShoppingCart();
// 商品一覧
const shopItems = [
    { name: "みかん", price: 100 },
    { name: "りんご", price: 200 },
];

// カートに商品を追加する
shoppingCart.addItem(shopItems[0]);
shoppingCart.addItem(shopItems[0]);
shoppingCart.addItem(shopItems[1]);

// 合計金額を表示する
console.log(shoppingCart.getTotalPrice()); // => 400
// カートの中身を表示する
console.log(shoppingCart.toString()); // => "みかん:2,りんご:1"
```

`Object`をマップとして使うときに起きる多くの問題は、`Map`オブジェクトを使うことで解決しますが、
常に`Map`が`Object`の代わりになるわけではありません。
マップとしての`Object`には次のような利点があります。

- リテラル表現があるため作成しやすい
- 規定のJSON表現があるため、`JSON.stringify`関数を使ってJSONに変換するのが簡単である
- ネイティブAPI・外部ライブラリを問わず、多くの関数がマップとして`Object`を渡される設計になっている

次の例では、ログインフォームのsubmitイベントを受け取ったあと、サーバーにPOSTリクエストを送信しています。
サーバーにJSON文字列を送るために、`JSON.stringify`関数を使います。
そのため、`Object`のマップを作ってフォームの入力内容をもたせています。
このような簡易なマップにおいては、`Object`を使うほうが適切でしょう。

```js
// URLとObjectのマップを受け取ってPOSTリクエストを送る関数
function sendPOSTRequest(url, data) {
    // XMLHttpRequestを使ってPOSTリクエストを送る
    const httpRequest = new XMLHttpRequest();
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(JSON.stringify(data));
    httpRequest.open("POST", url);
}

// formのsubmitイベントを受け取る関数
function onLoginFormSubmit(event) {
    const form = event.target;
    const data = {
        userName: form.elements.userName,
        password: form.elements.password,
    };
    sendPOSTRequest("/api/login", data);
}
```

### WeakMap {#weakmap}

[WeakMap][]は、`Map`と同じくマップを扱うためのビルトインオブジェクトです。
`Map`と違う点は、キーを**弱い参照**（Weak Reference）でもつことです。

[弱い参照][]とは、ガベージコレクタによるオブジェクトの解放を妨げないための特殊な参照です。
あるオブジェクトへの参照がすべて弱い参照のとき、そのオブジェクトはいつでもガベージコレクタによって解放できます。
弱い参照は、不要になったオブジェクトを参照し続けて発生するメモリリークを防ぐために使われます。
`WeakMap`では不要になったキーとそれに紐付いた値が自動的に削除されるため、メモリリークを引き起こす心配がありません。


```js
const map = new WeakMap();
// キーとなるオブジェクト
const obj = {};
// objをキーに値をセットする
map.set(obj, 'value');
// objの参照を破棄する
delete obj;
// mapからobjをキーとする値が削除されている
```

`WeakMap`は`Map`と似ていますがiterableではありません。
そのため、キーを列挙する`keys`メソッドや、データの数を返す`size`プロパティなどは存在しません。
また、キーを弱い参照でもつ特性上、キーとして使えるのは参照型のオブジェクトだけです。

`WeakMap`の主な使い方のひとつは、クラスにプライベートの値を格納することです。
`this` を `WeakMap` のキーにすることで、外部からはアクセスできない値を保持できます。
また、クラスインスタンスが参照されなくなったときには自動的に解放されます。

たとえば次の例では、オブジェクトが発火するイベントのリスナー関数（イベントリスナー）を `WeakMap` で管理しています。
イベントリスナーとは、イベントが発生したときに呼び出される関数のことです。
このマップを`Map`で実装してしまうと、明示的に削除されるまでイベントリスナーはメモリ上に残り続けます。
ここで`WeakMap`を使うと、`addListener` メソッドに渡された`listener`は `EventEmitter` インスタンスが参照されなくなった際、自動的に解放されます。

```js
// イベントリスナーを管理するマップ
const listenersMap = new WeakMap();

class EventEmitter {
    addEventListener(listener) {
        // this に紐付いたリスナーの配列を取得する
        const listeners = listenersMap.get(this) || [];
        // this をキーに新しい配列をセットする
        listenersMap.set(this, [...listeners, listener]);
    }
}

// 上記クラスの実行例

let eventEmitter = new EventEmitter();
// イベントリスナーを追加する
eventEmitter.addListener(() => {
    console.log("イベントが発火しました");
});
// eventEmitterへ参照がなくなったことで自動的にイベントリスナーが解放される
eventEmitter = null;
```

また、あるオブジェクトから計算した結果を一時的に保存する用途でもよく使われます。
次の例ではHTML要素の高さを計算した結果を保存して、2回目以降に同じ計算をしないようにしています。

```js
const cache = new WeakMap();

function getHeight(element) {
    if (cache.has(element)) {
        return cache.get(element);
    }
    const height = element.getBoundingClientRect().height;
    // elementオブジェクトに対して高さを紐付けて保存している
    cache.set(element, height);
    return height;
}
```

### [コラム] キーの等価性とNaNオブジェクト {#key-and-nan}

`Map`に値をセットする際のキーにはあらゆるオブジェクトが使えますが、一部のオブジェクトについては扱いに注意が必要です。

マップが特定のキーをすでにもっているか、つまり挿入と上書きの判定は基本的に`===`演算子と同じです。
ただし`NaN`オブジェクトの扱いだけが例外的に違います。`Map`におけるキーの比較では、`NaN`同士は常に等価であるとみなされます。
この挙動は[Same-value-zero][]アルゴリズムと呼ばれます。

{{book.console}}
```js
const map = new Map();
map.set(NaN, "value");
// NaNは===で比較した場合は常にfalse
console.log(NaN === NaN); // => false
// MapはNaN同士を比較できる
console.log(map.get(NaN)); // => "value"
```

## Set {#set}

[Set][]はセット型のコレクションを扱うためのビルトインオブジェクトです。
セットとは、重複する値がないことを保証したコレクションのことをいいます。
`Set`は追加した値を列挙できるので、値が重複しないことを保証する配列のようなものとしてよく使われます。
ただし、配列と違って要素は順序をもたず、インデックスによるアクセスはできません。

## セットの作成と初期化 {#set-new}

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
次の例ではiterableオブジェクトである配列を初期値として渡しています。

{{book.console}}
```js
const set = new Set(["value1", "value2", "value2"]);
// "value2"が重複しているので、セットのサイズは2になる
console.log(set.size); // => 2
```

### 値の追加と取り出し {#set-read-and-write}

作成したセットに値を追加するには`add`メソッドを使います。
先述のとおり、セットは重複する値をもたないことが保証されます。
そのため、すでにセットがもっている値を`add`メソッドに渡した際は無視されます。

また、セットが特定の値をもっているかどうかを確認する`has`メソッドがあります。

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

セットから値を削除するには、`delete`メソッドを使います。
`delete`メソッドに渡された値がセットから削除されます。
また、セットがもつすべての値を削除するための`clear`メソッドがあります。

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

### セットの反復処理 {#set-iteration}

セットがもつすべての値を反復するにはfor...of文を使います。
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

セットがもつ要素を列挙するメソッドとして、`forEach`、`keys`、`values`、`entries`があります。
これらは`Map`との類似性のために存在しますが、セットにはマップにおけるキー相当のものがありません。
そのため、`keys`メソッドは`values`メソッドのエイリアスになっており、セットがもつすべての値を挿入順に列挙するIteratorオブジェクトを返します。
また、`entries`メソッドは`[値, 値]`という形のエントリーを挿入順に列挙するIteratorオブジェクトを返します。
ただし、`Set`自身がiterableであるため、これらのメソッドが必要になることはないでしょう。

### WeakSet {#weakset}

[WeakSet][]は弱い参照で値をもつセットです。
`WeakSet`は`Set`と似ていますが、iterableではないので追加した値を反復できません。
つまり、`WeakSet`は値の追加と削除、存在確認以外のことができません。
データの格納ではなく、データの一意性を確認することに特化したセットといえるでしょう。

また、弱い参照で値をもつ特性上、値として使えるのは参照型のオブジェクトだけです。

[Map]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map
[Same-value-zero]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Equality_comparisons_and_when_to_use_them#Same-value-zero_equality
[Set]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Set
[WeakMap]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
[WeakSet]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/WeakSet
[弱い参照]: https://ja.wikipedia.org/wiki/%E5%BC%B1%E3%81%84%E5%8F%82%E7%85%A7
