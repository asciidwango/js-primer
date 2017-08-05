---
author: laco
---

# Map/Set

## Map

[Map][]はマップ型のデータ構造を提供するためのビルトインオブジェクトです。
何かをキーにして値にアクセスという点で、マップと配列は似ています。
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

#### データの集合としてのMap

`Map`オブジェクトは配列と同じように、データ全体に反復処理を行うためのいくつかのメソッドを提供します。

`Map#forEach`メソッドはマップに保存されたすべてのデータをマップへの挿入順に反復します。
コールバック関数には引数として値、キー、Mapのインスタンスの3つが与えられます。

{{book.console}}
```js
const map = new Map();
map.set("key1", "value1");
map.set("key2", "value2");
map.forEach((value, key) => {
    console.log(`${value}:${key}`);
});
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
for (const key of map.keys()) {
    console.log(key);
}
for (const value of map.values()) {
    console.log(value);
}
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
for (const entry of map.entries()) {
    console.log(`${entry[0]}-${entry[1]}`);
}
// 分割代入を使った例
for (const [key, value] of map.entries()) {
    console.log(`${key}-${value}`);
}
```

また、Mapは`System.iterator`を実装しているiterableオブジェクトなので、for...of文を使用して反復処理を行うこともできます。
for...of文で`Map`のインスタンスを反復したときは`Map#entries`と同じくエントリーが取り出されます。

{{book.console}}
```js
const map = new Map();
map.set("key1", "value1");
map.set("key2", "value2");
for (const [key, value] of map) {
    console.log(`${key}-${value}`);
}
```

### ObjectとMapの違い

## Set

### Setの作成とアクセス

## WeakMap/WeakSet

### Weakとは

### ユースケース


[Map]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map
[Set]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Set
[WeakMap]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
[WeakSet]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/WeakSet