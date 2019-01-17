---
author: azu
description: JavaScriptのオブジェクトとプロトタイプについて
---

# プロトタイプオブジェクト {#prototype-object}

## `Object`はすべての元 {#object-is-origin}

`Object`には、他の`Array`や`String`、`Function`などの他のオブジェクトとは異なる特徴があります。
それは、他のオブジェクトはすべて`Object`を継承しているという点です。

正確には、ほとんどすべてのオブジェクトは`Object`の`prototype`オブジェクトを継承しています。
`prototype`オブジェクトはすべてのオブジェクトに備わっている特別なオブジェクトです。
そのため、`Object`の`prototype`オブジェクトは、すべてのオブジェクトから利用できるメソッドなどを提供するベースオブジェクトともいえます。

![すべてのオブジェクトは`Object`の`prototype`を継承している](./img/object-prototype.png)

具体的にどういうことかを見てみます。
先ほども登場した、`Object#hasOwnProperty`メソッドは、`Object`の`prototype`オブジェクトに`hasOwnProperty`メソッドの定義があります。

{{book.console}}
```js
// `Object`の`prototype`オブジェクトに`hasOwnProperty`メソッドの定義がある
console.log(typeof Object.prototype.hasOwnProperty); // => "function"
```

この`Object.prototype.hasOwnProperty`メソッドは、`Object`の`prototype`オブジェクトに定義されています。
そのため、ほとんどのオブジェクトは`hasOwnProperty`メソッドを持っています。

```js
// このような定義が自動的に行われているイメージ
// `Object`の`prototype`オブジェクトに`hasOwnProperty`メソッドの定義を行う
Object.prototype.hasOwnProperty = (propertyName) => {
    // hasOwnPropertyの処理
};
```

`Object`のインスタンスは、この`prototype`オブジェクトに定義されたメソッドやプロパティをインスタンス化時に継承します。
つまり、オブジェクトリテラルや`new Object`でインスタンス化したオブジェクトは、`Object.prototype`に定義されたものが利用できるということです。

{{book.console}}
```js
// var object = new Object()も同じ
const object = {};
// インスタンスがprototypeオブジェクトに定義されたものを継承する
console.log(object.hasOwnProperty === Object.prototype.hasOwnProperty); // => true
```

そのため、`Object.prototype`に定義されている`toString`メソッドや`hasOwnProperty`メソッドが、
`Object`のインスタンスで利用できます。

> `Object`のインスタンス -> `Object.prototype`


### `in`演算子と`Object#hasOwnProperty`メソッドの違い {#diff-in-operator-and-hasOwnProperty}

先ほど学んだ`in`演算子と`Object#hasOwnProperty`メソッドの違いからもここから生じています。

`hasOwnProperty`メソッドは、そのオブジェクト自身が指定したプロパティを持っているかを判定します。
一方、`in`演算子はオブジェクト自身が持っていなければ、そのオブジェクトの親オブジェクトまで順番に探索して持っているかを判定します。

{{book.console}}
```js
const object = {};
// `object`のインスタンス自体に`toString`メソッドが定義されているわけではない
console.log(object.hasOwnProperty("toString")); // => false
// `in`演算子は指定されたプロパティ名が見つかるまで親を辿るため、`Object.prototype`まで見に行く
console.log("toString" in object); // => true
```

これにより`Object`のインスタンス自身が`toString`メソッドを持っているわけではなく、`Object.prototype`が`toString`メソッドを持っていることが分かります。

### オブジェクトの継承元を明示する`Object.create`メソッド {#create-method}

`Object.create`メソッドを使うと、第一引数に指定した`prototype`オブジェクトを継承した新しいオブジェクトを作成できます。

先ほど、オブジェクトリテラルは`Object.prototype`オブジェクトを自動的に継承したオブジェクトを作成していることがわかりました。
オブジェクトリテラルで作成する新しいオブジェクトは、`Object.create`メソッドを使うことで次のように書くことができます。

{{book.console}}
```js
// var object = {} と同じ
const object = Object.create(Object.prototype);
// `object`は`Object.prototype`を継承している
console.log(object.hasOwnProperty === Object.prototype.hasOwnProperty); // => true
```

### ArrayもObjectを継承している {#inherit-object}

`Object`と`Object.prototype`の関係と同じく、`Array`コンストラクタも`Array.prototype`を持っています。
そのため、`Array`コンストラクタのインスタンスは`Array.prototype`を継承します。
さらに、`Array.prototype`は`Object.prototype`を継承しているため、`Array`のインスタンスは`Object.prototype`も継承しているのです。

> `Array`のインスタンス -> `Array.prototype` -> `Object.prototype`

`Object.create`メソッドを使って`Array`と`Object`の関係をコードとして表現してみます。
`Array`コンストラクタの実装などは実際のものとは異なるので、あくまで関係の例示でしかないことに注意してください。

{{book.console}}
```js
// `Array`コンストラクタ自身は関数でもある
const Array = function() {};
// `Array.prototype`は`Object.prototype`を継承している
Array.prototype = Object.create(Object.prototype);
// `Array`のインスタンスは、`Array.prototype`を継承している
const array = Object.create(Array.prototype);
// `array`は`Object.prototype`を継承している
console.log(array.hasOwnProperty === Object.prototype.hasOwnProperty); // => true
```

このように、`Array`のインスタンスも`Object.prototype`を継承しているため、
`Object.prototype`に定義されているメソッドを利用できます。

{{book.console}}
```
// var array = new Array(); と同じ
var array = [];
// `Array`のインスタンス -> `Array.prototype` -> `Object.prototype`
console.log(array.hasOwnProperty === Object.prototype.hasOwnProperty); // => true
```

この継承の仕組みは、**プロトタイプ継承**と呼ばれるJavaScriptのコアとなる概念です。
詳しくは、[クラス][]の章で詳しく解説します。

ここでは、`Object`はすべてのオブジェクトの親となるオブジェクトであることだけを覚えておくだけで問題ありません。
これにより、`Array`や`String`などのインスタンスも`Object.prototype`がもつメソッドを利用できる点を覚えておきましょう。

## [コラム] `Object.prototype`を継承しないオブジェクト {#not-inherit-object}

`Object`はすべてのオブジェクトの親となるオブジェクトである言いましたが、例外もあります。

イディオムに近いのですが、`Object.create(null)`とすることで`Object.prototype`を継承しないオブジェクトを作ることができます。
これにより、プロパティやメソッドをなどを全く持たない本当に**空のオブジェクト**を作ることができます。

{{book.console}}
```js
// 親がnull、つまり親がいないオブジェクトを作る
const object = Object.create(null);
// Object.prototypeを継承しないため、hasOwnPropertyが存在しない
console.log(object.hasOwnProperty); // => undefined
```

`Object.create`メソッドはES5から導入されました。
`Object.create`メソッドは`Object.create(null)`というイディオムで、一部ライブラリなどで`Map`オブジェクトの代わりとして利用されています。
`Object`のインスタンスはデフォルトで`Object.prototype`を継承するため、`toString`などのプロパティ名がオブジェクトを作成した時点で存在します。
`Object.create(null)`をつかうことで`Object.prototype`を継承しないオブジェクトを作成できるため、何もプロパティをもたないオブジェクトを作成できます。

{{book.console}}
```js
// ただのオブジェクト
const object = {};
// "toString"という値を定義してないのに、"toString"が存在している
console.log(object["toString"]);// Function 
// Mapのようなオブジェクト
const mapLike = Object.create(null);
// toStringキーは存在しない
console.log(mapLike["toString"]); // => undefined
```

しかし、ES2015からは、本物の`Map`が利用できるため、`Object.create(null)`を`Map`の代わりに利用する必要はありません。

{{book.console}}
```js
const map = new Map();
// toStringキーは存在しない
console.log(map.has("toString")); // => false
```
