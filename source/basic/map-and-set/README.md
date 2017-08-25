---
author: laco
---

# Map/Set

JavaScriptでデータの集まりを扱うコレクションは配列だけではありません。
この章では、マップ型のデータを扱うための`Map`と、セット型のデータを扱うための`Set`について学びます。

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
for (const value of map.values()) {
    values.push(value);
}
for (const [key, value] of map.entries()) {
    entries.push(`${key}:${value}`);
}
console.log(keys); // => ["key1","key2"]
console.log(values); // => ["value1","value2"]
console.log(entries); // => ["key1:value1","key2:value2"]
```

### ObjectとMapの違い

ES2015で`Map`が導入されるまで、JavaScriptにおいてキーと値のマップを実現するために`Object`が利用されてきました。
何かをキーにして値にアクセスするという点で、`Map`と`Object`はよく似ています。
ただし、マップとしての`Object`と`Map`オブジェクトにはいくつかの違いがあります。

`Object`をマップとして使うとき、`Object`はプロトタイプをもつため既定のキーがマップ中に存在します。
また、プロパティとしてデータを保持するため、キーとして使えるのは文字列か`Symbol`に限られます。

たとえば`constructor`というキーは`Object.prototype.constructor`プロパティと衝突してしまうため、マップのキーとして使えません。
（ただし、この問題はマップとして使う`Object`のインスタンスを`Object.create(null)`のように作成すれば回避できます。）

{{book.console}}
```js
const map = {};
// 既定のキーのプロパティが存在する
console.log(typeof map["constructor"] !== undefined); // => true
```

一方、`Map`オブジェクトはプロパティとは別の空間にデータを保持します。
そのため、`Map`のプロトタイプがもつキーと衝突することがありません。
また、キーにはあらゆるオブジェクトを使うことができます。

このように、マップとして`Object`を使った際に起きる多くの問題は、`Map`オブジェクトを使うことで解決しますが、
常に`Map`が`Object`の代替になるわけではありません。
たとえば関数の引数として渡されるようないくつかのデータをまとめるための簡易なマップとしては、
リテラル表現がある`Object`のほうが使いやすいでしょう。

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
セットとは、重複する値がないことを保証したコレクションのことをいいます。
複数の値を保持するという点でセットは配列と似ています。
ただし、重複する値を追加できない点と、インデックスで値にアクセスできない点が配列と違います。

### セットの作成とアクセス

新しいセットを作成するには、`Set`のコンストラクタを使います。
作成されたばかりのセットは何ももっていません。
そのため、セットのサイズを返す`Set#size`プロパティは0を返します。

{{book.console}}
```js
const set = new Set();
console.log(set.size); // => 0
```

#### データの追加・削除

セットにデータを追加するには、`Map#add`メソッドを使います。
ただし、同一の値を存在する場合は無視されます。
セットがある値をもっていることを確かめるには`Set#has`メソッドを使います。

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

セットから特定の値を削除するには、`Set#delete`メソッドを使います。
また、すべての値を削除したいときには`Set#clear`メソッドを使います。

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

#### セットを列挙する

`Set`オブジェクトは配列と同じように、中身のデータを列挙するいくつかのメソッドを提供します。

`Set#forEach`メソッドはセットがもつすべての値を追加順に反復します。
コールバック関数には引数として値、Setのインスタンスの2つが渡されます。

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

また、Setはiterableオブジェクトなので、for...of文を使って反復処理を行うこともできます。
for...of文で`Set`のインスタンスを反復したときは、追加順に値が取り出されます。

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

`Map`オブジェクトと同じように、`Set#keys`メソッドと`Set#values`メソッドがあります。
ただし、どちらの戻り値も値を挿入順に並べたIteratorオブジェクトで、for...of文で反復されるものと違いはありません。

`Set#entries`メソッドも`Map#entries`メソッドと同じようにエントリーのIteratorオブジェクトを返します。
ただし、エントリーのキーは値と同じになります。

{{book.console}}
```js
const set = new Set();
set.add("a");
set.add("b");
const results = [];
for (const [key, value] of set.entries()) {
    results.push(`${key}:${value}`);
}
console.log(results); // => ["a:a","b:b"]
```

## WeakMap/WeakSet

[WeakMap][]と[WeakSet][]は、それぞれ`Map`と`Set`に対応したデータ構造を提供するビルトインオブジェクトです。
Weakと名付けられているとおり、これらはマップとセットに**弱い参照**（Weak Reference）を導入したものです。

[弱い参照][]とは、参照先のオブジェクトをガベージコレクションの対象外にしないための仕組みです。
あるオブジェクトへの参照がすべて弱い参照のとき、そのオブジェクトはいつでもガベージコレクタによって解放できます。
弱い参照は不要になったオブジェクトを参照し続けるときに発生するメモリリークを防ぐために使われます。

### WeakMap

`WeakMap`はキーへの参照を弱い参照とするマップです。
`WeakMap`のAPIはほとんど`Map`と変わりませんが、iterableではないので`keys`メソッドや`forEach`メソッドなどは存在しません。
次の例のように、キーが解放されたときにエントリーも自動で削除されます。
そのため、不要なエントリーが残り続けることによるメモリリークを防ぐことができます。

{{book.console}}
```js
let key = {};
const weakMap = new WeakMap();
weakMap.set(key, "value");
// keyが参照するオブジェクトはまだ存在する
console.log(weakMap.has(key)); // => true
// keyが参照するオブジェクトが変わった
key = {};
// 自動的にweakMapから消える
console.log(weakMap.has(key)); // => false
```

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

`WeakSet`は値への参照を弱い参照とするセットです。
`WeakSet`のAPIはほとんど`Set`と変わりませんが、iterableではないので`keys`メソッドや`forEach`メソッドなどは存在しません。
次の例のように、格納された値が解放されたときに自動で削除されます。
そのため、不要な値が残り続けることによるメモリリークを防ぐことができます。

{{book.console}}
```js
let value = {};
const weakSet = new WeakSet();
weakSet.add(value);
// valueが参照するオブジェクトはまだ存在する
console.log(weakSet.has(value)); // => true
// valueが参照するオブジェクトが変わった
value = {};
// 自動的にweakSetから消える
console.log(weakSet.has(value)); // => false
```

`WeakSet`のユースケースとしては、イベントエミッターのような仕組みを実装する際のイベントリスナーの格納があります。
次の例のようにイベントリスナーを弱い参照で保持しておけば、
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
[弱い参照]: https://ja.wikipedia.org/wiki/%E5%BC%B1%E3%81%84%E5%8F%82%E7%85%A7