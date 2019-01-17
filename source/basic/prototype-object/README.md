---
author: azu
description: JavaScriptのプロトタイプオブジェクトについて
---

# プロトタイプオブジェクト {#prototype-object}

「[オブジェクト]」の章では、オブジェクトの処理方法について見ていきました。
その中で、空のオブジェクトであっても`toString`メソッドなどの呼びだせていました。

{{book.console}}
```js
const object = {};
console.log(object.toString()); // "[object Object]"
```

この`toString`メソッドなどはJavaScriptに組み込まれたビルトインメソッドですが、これらのメソッドはどこに実装されているのでしょうか？
この章では、これらのビルトインメソッドがどのように実装され、なぜ`Object`のインスタンスから呼び出せるのかを見ていきます。

## `Object`はすべての元 {#object-is-origin}

`Object`には、他の`Array`、`String`、`Function`などの他のオブジェクトとは異なる特徴があります。
それは、他のオブジェクトはすべて`Object`を継承しているという点です。

正確には、ほとんどすべてのオブジェクトは`Object`の`prototype`オブジェクトを継承しています。
`prototype`オブジェクトとは、すべてのオブジェクトの作成時に自動的に追加される特殊なオブジェクトです。
`Object`の`prototype`オブジェクトは、すべてのオブジェクトから利用できるメソッドなどを提供するベースオブジェクトともいえます。

![すべてのオブジェクトは`Object`の`prototype`を継承している](./img/object-prototype.png)

具体的にどういうことかを見てみます。

先ほども登場した`toString`メソッドは、実際には`Object`の`prototype`オブジェクトに定義があります。

{{book.console}}
```js
// `Object.prototype`オブジェクトに`toString`メソッドの定義がある
console.log(typeof Object.prototype.toString); // => "function"
```

このような`Object`の`prototype`オブジェクトに組み込まれているメソッドは**プロトタイプメソッド**と呼ばれます。この書籍では`Object.prototype.toString`のようなプロトタイプメソッドを`Object#toString`と短縮して表記します。

> `Object.prototype.toString` = `Object#toString`

`Object`のインスタンスは、この`prototype`オブジェクトに定義されたメソッドやプロパティをインスタンス化時に継承します。
つまり、オブジェクトリテラルや`new Object`でインスタンス化したオブジェクトは、`Object.prototype`に定義されたものが利用できるということです。

次のコードでは、オブジェクトリテラルで作成（インスタンス化）したオブジェクトから、`Object#toString`メソッドを参照できます。

{{book.console}}
```js
// var object = new Object()も同じ
const object = {
    "key": "value"
};
// インスタンスがprototypeオブジェクトに定義されたものを継承する
// object.toString.prototype.toStringを参照している
console.log(object.toString === Object.prototype.toString); // => true
// インスタンスからプロトタイプメソッドを呼び出せる
console.log(object.toString()); // => "[object Object]"
```

このように`Object.prototype`に定義されている`toString`メソッドや`hasOwnProperty`メソッドは、`Object`のインスタンスから呼び出せます。
これによりオブジェクトリテラルで作成した空のオブジェクトでも、`Object#toString`メソッドなどを呼び出せるようになっています。

このインスタンスから`prototype`オブジェクト上に定義されたメソッドを自動的に参照する仕組みは**プロトタイプチェーン**と呼びます。
プロトタイプチェーンの仕組みについては「[クラス][]」の章で扱うため、ここではインスタンスからプロトタイプメソッドを呼び出せるということがわかっていれば問題ありません。

### プロトタイプメソッドと同じ名前のメソッド {#same-method-name}

プロトタイプメソッドと同じ名前のメソッドがインスタンスオブジェクトに定義されている場合もあります。
その場合には、インスタンスに定義したメソッドが優先して呼び出されます。

次のコードでは、`Object`のインスタンスである`customObject`に`toString`メソッドを定義しています。
実行してみると、プロトタイプメソッドよりも優先してインスタンスのメソッドが呼び出されていることがわかります。

{{book.console}}
```js
// オブジェクトのインスタンスにtoStringメソッドを定義
const customObject = {
    toString() {
        return "custom value";
    }
};
console.log(customObject.toString()); // => "custom value"
```

このように、インスタンスとプロトタイプオブジェクトで同じ名前のメソッドがある場合には、インスタンスのメソッドが優先されます。

### `in`演算子と`Object#hasOwnProperty`メソッドの違い {#diff-in-operator-and-hasOwnProperty}

「[オブジェクト][]」の章で学んだ`Object#hasOwnProperty`メソッドと`in`演算子の挙動の違いについて見ていきます。
2つの挙動の違いはこの章で紹介したプロトタイプオブジェクトに関係しています。

`hasOwnProperty`メソッドは、そのオブジェクト自身が指定したプロパティを持っているかを判定します。
一方、`in`演算子はオブジェクト自身が持っていなければ、そのオブジェクトの継承元である`prototype`オブジェクトまで探索して持っているかを判定します。
つまり、`in`演算子はインスタンスに実装されたメソッドなのか、プロトタイプオブジェクトに実装されたメソッドなのかは区別しません。

次のコードでは、空のオブジェクトが`toString`メソッドを持っているかを`Object#hasOwnProperty`メソッドと`in`演算子でそれぞれ判定しています。
`hasOwnProperty`メソッドが`false`を返し、`in`演算子では`toString`メソッドがインスタンスまたはプロトタイプオブジェクトに存在するため`true`を返します。

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
オブジェクトリテラルで作成する新しいオブジェクトは、`Object.create`メソッドを使うことで次のように書けます。

{{book.console}}
```js
// const object = {} と同じ
const object = Object.create(Object.prototype);
// `object`は`Object.prototype`を継承している
console.log(object.hasOwnProperty === Object.prototype.hasOwnProperty); // => true
```

### ArrayもObjectを継承している {#inherit-object}

`Object`と`Object.prototype`の関係と同じく、`Array`コンストラクタも`Array.prototype`を持っています。
そのため、`Array`のインスタンスは`Array.prototype`を継承します。
さらに、`Array.prototype`は`Object.prototype`を継承しているため、`Array`のインスタンスは`Object.prototype`も継承してます。

> `Array`のインスタンス -> `Array.prototype` -> `Object.prototype`

`Object.create`メソッドを使って`Array`と`Object`の関係をコードとして表現してみます。
`Array`コンストラクタの実装などは実際のものとは異なるので、あくまで関係の例示でしかないことに注意してください。

{{book.console}}
```js
// このコードはイメージです！
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

次のコードでは、`Array`のインスタンスから`Object#hasOwnProperty`メソッドが参照できていることがわかります。

{{book.console}}
```js
const array = [];
// `Array`のインスタンス -> `Array.prototype` -> `Object.prototype`
console.log(array.hasOwnProperty === Object.prototype.hasOwnProperty); // => true
```

この参照が可能なのもプロトタイプチェーンという仕組みによるものです。

ここでは、`Object.prototype`はすべてのオブジェクトの親となるオブジェクトであることだけを覚えておくだけで問題ありません。
これにより、`Array`や`String`などのインスタンスも`Object.prototype`がもつメソッドを利用できる点を覚えておきましょう。

また、`Array.prototype`などもそれぞれ独自のメソッドを定義しています。
`Array#toString`メソッドもそのひとつです。
そのため、配列のインスタンスで`toString`メソッドを呼び出すと`Array#toString`が優先して呼び出されます。

{{book.console}}
```js
const number = [1, 2, 3];
// Array#toStringが定義されているため、`Object#toString`とは異なる形式となる
console.log(number.toString()); // => "1,2,3";
```

## [コラム] `Object.prototype`を継承しないオブジェクト {#not-inherit-object}

`Object`はすべてのオブジェクトの親となるオブジェクトである言いましたが、例外もあります。

イディオム（慣習的な書き方）ですが、`Object.create(null)`とすることで`Object.prototype`を継承しないオブジェクトを作成できます。
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

なぜなら、`Object`のインスタンスはデフォルトで`Object.prototype`を継承するため、`toString`などのプロパティ名がオブジェクトを作成した時点で存在します。`Object.create(null)`をつかうことで`Object.prototype`を継承しないオブジェクトを作成できるため、何もプロパティをもたないオブジェクトを作成できます。

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
`Map`については「[Map/Set][]」の章で詳しく紹介します。

{{book.console}}
```js
const map = new Map();
// toStringキーは存在しない
console.log(map.has("toString")); // => false
```

[クラス]: ../class/README.md
[オブジェクト]: ../object/README.md
[Map/Set]: ../map-and-set/README.md
