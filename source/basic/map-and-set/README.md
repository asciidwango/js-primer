---
author: laco
---

# Map/Set

## Map

[Map][]はマップ型のデータ構造を提供するビルトインオブジェクトです。
何かをキーにして値にアクセスするコレクションという点で、マップと配列は似ています。
配列がインデックスを使って値にアクセスするのに対して、マップはオブジェクトを使って対応する値にアクセスします。

### マップの作成とアクセス

新しいマップを作成するには、`Map`のコンストラクタを使います。
作成されたばかりのマップには何も保存されていないので、マップのサイズを返す`Map#size`プロパティは0を返します。

{{book.console}}
```js
const map = new Map();
console.log(map.size); // => 0
```

#### データの追加・取得・削除

マップにデータを保存するには、`Map#set`メソッドを使ってキーと値のペアをセットします。
ただし、同一のキーで複数回セットされると、後からセットされた値で上書きされます。
保存された値は`Map#get`メソッドで取り出します。
また、あるキーをもつ値がマップに保存されているかを確かめるには`Map#has`メソッドを使います。

{{book.console}}
```js
const map = new Map();
// 値のセット
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

マップから特定のデータを削除するには、`Map#delete`メソッドを使います。
また、すべてのデータを削除したいときには`Map#clear`メソッドを使います。

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

#### データ全体へのアクセス

`Map`オブジェクトは配列と同じように、データ全体に反復処理を行うためのいくつかのメソッドを提供します。

`Map#forEach`メソッドはマップに保存されたすべてのデータをマップへの挿入順に反復します。
コールバック関数には引数として値、キー、Mapのインスタンスの3つが与えられます。

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

`Map#keys`メソッドと`Map#values`メソッドは、
マップに保存されたすべてのデータのキー・値のそれぞれを挿入順に並べた**Iterator**オブジェクトを返します。
この戻り値は配列ではないので、`length`プロパティや`map`メソッドは持っていません。
基本的にはfor文やfor...of文で反復処理を行うために使います。

{{book.console}}
```js
const map = new Map();
map.set("key1", "value1");
map.set("key2", "value2");
const results = [];
for (const key of map.keys()) {
    results.push(key);
}
console.log(results); // => ["key1","key2"]
```

{{book.console}}
```js
const map = new Map();
map.set("key1", "value1");
map.set("key2", "value2");
const results = [];
for (const value of map.values()) {
    results.push(value);
}
console.log(results); // => ["value1","value2"]
```

`Map#entries`メソッドはキーと値のペアを挿入順に並べた**Iterator**オブジェクトを返します。
この戻り値を反復して取り出されるオブジェクトはキーと値が並んだ長さ2の配列になっており、
この形式のデータは**エントリー**と呼ばれます。
エントリーからキーと値を取り出す際には、配列の分割代入を使うと簡潔に記述できます。

{{book.console}}
```js
const map = new Map();
map.set("key1", "value1");
map.set("key2", "value2");
const results = [];
for (const [key, value] of map.entries()) {
    results.push(`${key}:${value}`);
}
console.log(results); // => ["key1:value1","key2:value2"]
```

また、Mapは`System.iterator`を実装しているiterableオブジェクトなので、for...of文を使用して反復処理を行うこともできます。
for...of文で`Map`のインスタンスを反復したときは`Map#entries`と同じくエントリーが取り出されます。

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

### ObjectとMapの違い

ES2015で`Map`が導入されるまで、JavaScriptにおいてキーと値のマップを実現するのに`Object`が利用されてきました。
マップとしての`Object`と`Map`オブジェクトにはいくつかの違いがあります。

`Object`をマップとして使うとき、`Object`はプロトタイプをもつため既定のキーがマップ中に存在します。
そしてプロパティとしてデータを保持するため、キーに使えるのは`String`か`Symbol`に限られます。

たとえば`constructor`というキーは`Object.prototype.constructor`プロパティと衝突してしまうため、マップのキーとして使えません。
（ただし、この問題はマップとして使う`Object`のインスタンスを`Object.create(null)`のように作成すれば回避できます。）

{{book.console}}
```js
const map = {};
// 既定のキーのプロパティが存在する
console.log(!!map["constructor"]); // => true
```

`Map`オブジェクトはプロパティとは別の空間にデータを保存するため、`Map`のプロトタイプがもつキーと衝突することがない上に、
キーにはあらゆるオブジェクトを使うことができます。

このように、マップとして`Object`を使った際に起きる多くの問題は、`Map`オブジェクトを使うことで解決しますが、
常に`Map`が`Object`の代替になるわけではありません。
コレクションとしての用途ではなく、キーがあらかじめ決まっていてサイズを気にしなくていいような場合には、
`Object`を使った簡単な操作のほうがふさわしいでしょう。

### [コラム] キーの等価性とNaNオブジェクト

`Map`に値をセットする際のキーにはあらゆるオブジェクトが使えますが、一部のオブジェクトについては扱いに注意が必要です。

与えられたキーがすでに存在するか、つまり挿入と上書きの判定は基本的に`===`演算子と同じ挙動をしますが、`NaN`は常に等価であるとみなされます。
この挙動は[same-value][]アルゴリズムと呼ばれるものです。

{{book.console}}
```js
const map = new Map();
map.set(NaN, "value");
console.log(map.get(NaN)); // => "value"
```

## Set

[Set][]はユニークな値を格納するセット型のデータ構造を提供するビルトインオブジェクトです。
セットと配列は似ていますが、セットはインデックスによるアクセスができない点と、
同じ値は1つしか保持されない点が大きな違いです。

### セットの作成とアクセス

新しいセットを作成するには、`Set`のコンストラクタを使います。
作成されたばかりのセットには何も保存されていないので、マップのサイズを返す`Set#size`プロパティは0を返します。

{{book.console}}
```js
const set = new Set();
console.log(set.size); // => 0
```

#### データの追加・削除

セットにデータを追加するには、`Map#add`メソッドを使います。
ただし、同一の値を存在する場合は無視されます。
ある値がセットに保存されているかを確かめるには`Set#has`メソッドを使います。

{{book.console}}
```js
const set = new Set();
// 値の追加
set.add(1);
console.log(set.size); // => 1
// 重複する値は追加されない
set.add(1);
console.log(set.size); // => 1
// キーの存在確認
console.log(set.has(1)); // => true
console.log(set.has(2)); // => false
```

セットから特定の値を削除するには、`Set#delete`メソッドを使います。
また、すべての値を削除したいときには`Set#clear`メソッドを使います。

{{book.console}}
```js
const set = new Set();
set.add(1);
set.add(2);
console.log(set.size); // => 2
set.delete(1);
console.log(set.size); // => 1
set.clear();
console.log(set.size); // => 0
```

#### データ全体へのアクセス

`Set`オブジェクトも、`Map`オブジェクトと同じようにデータ全体に反復処理を行うためのいくつかのメソッドを提供します。

`Set#forEach`メソッドはセットに保存されたすべての値を挿入順に反復します。
コールバック関数には引数として値、Setのインスタンスの2つが与えられます。

{{book.console}}
```js
const set = new Set();
set.add(1);
set.add(2);
const results = [];
set.forEach((value) => {
    results.push(value); 
});
console.log(results); // => [1,2]
```

`Set`オブジェクトはietrableオブジェクトなので、そのままfor...of文で反復できます。

{{book.console}}
```js
const set = new Set();
set.add(1);
set.add(2);
const results = [];
for (const value of set) {
    results.push(value);
}
console.log(results); // => [1,2]
```

`Map`オブジェクトと同じように`Set#keys`メソッドと`Set#values`メソッドがありますが、
どちらの戻り値も値を挿入順に並べたIteratorオブジェクトで、for...of文で反復されるものと違いはありません。

`Set#entries`メソッドも`Map#entries`メソッドと同じようにエントリーのIteratorオブジェクトを返しますが、
エントリーのキーは値と同じになります。

{{book.console}}
```js
const set = new Set();
set.add(1);
set.add(2);
const results = [];
for (const [key, value] of set.entries()) {
    results.push(`${key}:${value}`);
}
console.log(results); // => ["1:1","2:2"]
```

## WeakMap/WeakSet

[WeakMap][]と[WeakSet][]は、それぞれ`Map`と`Set`に対応したデータ構造を提供するビルトインオブジェクトです。
Weakと名付けられているとおり、これらは**弱参照**（Weak Reference）を扱うためにカスタマイズされたマップとセットです。

[弱参照][]とは、参照先のオブジェクトをガベージコレクションの対象外にしないための仕組みです。
あるオブジェクトへの参照がすべて弱参照のとき、そのオブジェクトはいつでもガベージコレクタによって解放できます。
弱参照は不要になったオブジェクトを参照し続けるときに発生するメモリリークを防ぐために使われます。

### WeakMap

`WeakMap`はキーへの参照を弱参照とするマップです。
キーが解放されたときにエントリーも自動で削除されるので、不要なエントリーが残り続けることによるメモリリークを防ぐことができます。
`WeakMap`のAPIはほとんど`Map`と変わりませんが、iterableではないので`keys`メソッドや`forEach`メソッドなどは存在しません。

`WeakMap`のユースケースとしては、あるオブジェクトに紐づくデータの格納があります。
親となるオブジェクトが自分自身をキーとしてデータを保持することで、親オブジェクトに依存するデータをメモリリークの心配なく保持できます。
たとえば次のように、あるDOM要素に紐づくデータを`WeakMap`で保持しておけば、
DOM要素が削除されたときに自動的にデータも削除されます。

```js
const weakMap = new WeakMap();
const element = document.createElement("div");
weakMap.set(element, {
    createdAt: Date.now()
});
```

### WeakSet

`WeakSet`は値への参照を弱参照とするセットです。
格納された値をガベージコレクタから保護しないので、不要な値が残り続けることによるメモリリークを防ぐことができます。
`WeakSet`のAPIはほとんど`Set`と変わりませんが、`WeakMap`と同様にiterableではないので`keys`メソッドや`forEach`メソッドなどは存在しません。

`WeakSet`のユースケースとしては、イベントエミッターのような仕組みを実装する際のイベントリスナーの格納があります。
次の例のようにイベントリスナーを弱参照で管理しておけば、
イベントエミッターのオブジェクトが解放されたときに自動的にイベントリスナーも解放できます。

```js
class EventEmitter {
    constructor() {
        this.listeners = new WeakSet();
    }
    addEventListener(listener) {
        this.listeners.add(listener);
    }
}
```

[Map]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map
[same-value]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Equality_comparisons_and_when_to_use_them#Same-value_equality
[Set]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Set
[WeakMap]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
[WeakSet]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/WeakSet
[弱参照]: https://ja.wikipedia.org/wiki/%E5%BC%B1%E3%81%84%E5%8F%82%E7%85%A7