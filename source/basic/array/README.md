---
author: azu
---

# 配列

この章では、配列の基本的な操作と配列を扱う場合においてのパターンについて学びます。
配列はJavaScriptの中でもよく使われるオブジェクトです。

配列とは値に順序をつけて格納できるオブジェクトです。
配列に格納したそれぞれの値のことを**要素**、それぞれの要素の位置のことを**インデックス**（`index`）と呼びます。
また、JavaScriptの配列は可変長の配列のみとなっています。

## 配列は特別なオブジェクト

JavaScriptでは、プリミティブ型のデータ以外はすべてオブジェクトです。
そのため、配列もオブジェクトの一種です。
このことは、`typeof`演算子の結果を見てみることでもわかります。

```js
typeof ["A", "B", "C"]; // => "object"
```

しかし、`Object`のインスタンスにはない`Array#map`などのメソッドや特殊な動作を持っています。

その特殊な動作が`length`プロパティです。
配列には複数の要素を格納できますが、`length`プロパティはその配列の要素数を返します。

```js
var array = ["A", "B", "C"];
console.log(array.length); // => 3
```

また、`length`プロパティへ値を代入できます。
`length`プロパティへ値を代入は配列の要素を削除することに利用されることがあります。
配列の`length`プロパティは特殊な動作となっているため、後ほど解説します。

```js
var array = ["A", "B", "C"];
array.length = 0; // 配列を空にする
console.log(array); // => []
```

### オブジェクトが配列かどうかを判定する

配列の`length`プロパティは特殊な動作をしますが、独自の`length`プロパティを持ったオブジェクトを作ることができます。
この２つのオブジェクトの違いはどのように見分ければいいのでしょうか？

```js
// 配列
var array = [];
// `length`を持つオブジェクト
var object = {
    length: 0
};
```

先ほど示したように`typeof`ではオブジェクトと配列の区別は付きません。
また、`length`プロパティが存在するかでは、それが配列であるとは判断できません。

そのため、あるオブジェクトが配列なのかを知りたい場合には、`Array.isArray`メソッドを利用します。
`Array.isArray`メソッドは引数が配列ならば`true`を返します。

```js
var array = [];
console.log(Array.isArray(array)); // => true
// 配列のようなオブジェクト
var object = {
    length: 0
};
console.log(Array.isArray(object)); // => false
```


### [コラム] TypedArray

JavaScriptの配列は可変長のみですが、`TypedArray`という固定長でかつ型付きの配列を扱う別のオブジェクトが存在します。
`TypedArray`はバイナリデータを扱うためのオブジェクトで、WebGLやバイナリを扱う場面で利用されます。
`TypedArray`は文字列や数値などのプリミティブ型の値はそのままでは扱えないため、扱う値はTypedArrayオブジェクトという形式にする必要があります。
そのため、通常の配列とは異なる使い勝手や用途が存在します。

JavaScriptで配列といった場合には`Array`を示します。

## 配列の作成とアクセス

配列の作成と要素へのアクセス方法は[データ型とリテラル](../data-type/#array)ですでに紹介していますが、
もう一度振り返ってみましょう。

配列の作成には配列リテラルを使うのが簡単です。
配列リテラル（`[`と`]`）の中に要素をカンマ（`,`）区切りで記述するだけです。

```js
var emptyArray = [];
var numbers = [1, 2, 3];
var matrix = [
    [0, 1],
    [0, 1]
]; // ２次元配列
```

作成した配列の要素へインデックスとなる数値を、`配列[インデックス]`と記述することで、
そのインデックスにある要素を配列から読み取ることができます。
配列の先頭要素のインデックスは`0`となります。配列のインデックスは、`0`以上`2^32 - 1`未満の整数となります。

```js
var array = ["one", "two", "three"];
console.log(array[0]); // => "one"
```

先ほど学んだように、配列の`length`プロパティは配列の要素の数を返します。
そのため、配列の最後の要素へアクセスするには `array.length - 1` をインデックスとして指定します。

```js
var array = ["one", "two", "three"];
console.log(array[array.length - 1]); // => "three"
```

一方、存在しないインデックスにアクセスした場合はどうなるでしょうか？
多くの言語では、配列の存在しないインデックスへアクセスするとエラーなりますが、JavaScriptでは`undefined`が返ってきます。

```js
var array = ["one", "two", "three"];
console.log(array[100]); // => undefined
```

これは、配列がオブジェクトであることを考えると、次のように存在しないプロパティへのアクセスと同じということが分かります。
オブジェクトでも、存在しないプロパティへのアクセスした場合には`undefined`が返ってきます。

```js
var object = {
    "0": "one",
    "1": "two",
    "2": "three",
    "length": 3
};
// object[100]はobject["100"]としてアクセスされる
// objectにはプロパティ名が"100"のものがないため、undefinedが返る
console.log(object[100]); // => undefined
```

また、配列は常に`length`の数だけ要素を持っているとは限りません。
次のように、配列リテラルでは値を省略することで、未定義の要素を含めることができます。
このような、配列の中に隙間があるものを**疎な配列**と呼びます。
一方、隙間がなくすべてのインデックスに要素がある配列を**密な配列**と呼びます。

```js
// 未定義の箇所が1つ含まれる疎な配列
var sparseArray = [1,, 3];
console.log(sparseArray.length); // => 3 
// 1番目の要素は存在しないため undefined が返る
console.log(sparseArray[1]); // => undefined
```

## [コラム] undefinedの要素と未定義の要素の違い

疎な配列で該当するインデックスに要素がない場合は`undefined`を返します。
しかし、JavaScriptに`undefined`値も存在するため、配列に`undefined`値がある場合に区別できません。

```js
// 要素として`undefined`を持つ密な配列
var denseArray = [1, undefined, 3];
// 要素そのものがない疎な配列
var sparseArray = [1, , 3];
console.log(denseArray[1]); // => undefined
console.log(sparseArray[1]); // => undefined
```

この違いを見つける方法として利用できるのが`Object#hasOwnProperty`メソッドです。
`hasOwnProperty`メソッドを使うことで、配列の指定したインデックスに要素自体が存在するかを判定できます。

```js
var denseArray = [1, undefined, 3];
var sparseArray = [1, , 3];
// 要素自体は`undefined`値が存在する
console.log(denseArray.hasOwnProperty(1)); // => true
// 要素自体がない
console.log(sparseArray.hasOwnProperty(1)); // => false
```

## 配列から要素を検索

配列からある要素があるかを探索したい場合に、
主に次の3つの目的に分類できます。

- その要素のインデックスが欲しい場合
- その要素自体が欲しい場合
- その要素が含まれているかという真偽値が欲しい場合

配列にはそれぞれに対応したメソッドが用意されているため、目的別に見ていきます。

### インデックスを取得

ある要素が配列のどの位置にあるかを知りたい場合、`Array#indexOf`メソッドや`Array#findIndex`メソッドを利用します。
要素の位置のことを**インデックス**（`index`）と呼ぶため、メソッド名にも`index`という名前が入っています。

次のコードでは、`Array#indexOf`メソッドを利用して、配列の中から`"JavaScript"`という文字列のインデックスを取得しています。
`indexOf`メソッドは引数と厳密等価演算子（`===`）で一致する要素があるなら、その要素のインデックスを返し、該当する要素がない場合は`-1`を返します。
`indexOf`メソッドは先頭から探索して見つかった要素のインデックスを返します。
`indexOf`メソッドには対となる`Array#lastIndexOf`メソッドがあり、`lastIndexOf`メソッドは末尾から探索した結果を得ることができます。

```js
var array = ["Java", "JavaScript", "Ruby"];
var indexOfJS = array.indexOf("JavaScript");
console.log(indexOfJS); // => 1
console.log(array[indexOfJS]); // => "JavaScript"
// "JS" という要素はないため `-1` が返される
console.log(array.indexOf("JS")); // => -1
```

`indexOf`メソッドは配列からプリミティブな要素は発見できますが、オブジェクトは持っているプロパティが同じでも別オブジェクトだと異なるものとして扱われます。
次のコードを見ると、同じプロパティをもつ異なるオブジェクトは、`indexOf`メソッドでは見つけることができません。
これは、異なる参照をもつオブジェクト同士は`===`で比較しても一致しないためです。

```js
var object = { key: "value" };
var array = ["A", "B", object];
console.log(array.indexOf({ key: "value" })); // => -1
// リテラルは新しいオブジェクトを作るため異なるオブジェクトを比較している
console.log(object === { key: "value" }); // => false
// 等価のオブジェクト
console.log(array.indexOf(object)); // => 2
```

このように、異なるオブジェクトだが値が同じものを見つけたい場合には、`Array#findIndex`メソッドが利用できます。
`findIndex`メソッドは関数には配列の各要素をテストする関数をコールバック関数として渡します。
`indexOf`メソッドとは異なり、テストする処理を自由に書くことができます。
これにより、異なるオブジェクトだが値が同じという要素を配列から見つけて、その要素のインデックスを得ることができます。

```js
// colorプロパティを持つオブジェクトの配列
var colors = [
    { "color": "red" },
    { "color": "green" },
    { "color": "blue" }
];
// `color`プロパティが"blue"のオブジェクトのインデックスを取得
var indexOfBlue = colors.findIndex((object) => {
    return object.color === "blue";
});
console.log(indexOfBlue); // => 2
console.log(colors[indexOfBlue]); // => { "color": "blue" }
```

### 要素を取得

配列から要素を取得する方法としてインデックスを使うこともできます。
先ほどのように`findIndex`メソッドでインデックスを取得、そのインデックスで配列へアクセスすればよいだけです。

しかし、`findIndex`メソッドを使い要素を取得するケースでは、
そのインデックスが欲しいのか、またはその要素自体が欲しいのかがコードとして明確ではありません。

より明確に要素自体が欲しいということを表現するには、`Array#find`を使うことができます。
`find`メソッドは、`findIndex`メソッドと同様にテストする関数をコールバック関数として渡します。
`find`メソッドの返り値は、要素そのものとなり、要素が存在しない場合は`undefined`を返します。

```js
// colorプロパティを持つオブジェクトの配列
var colors = [
    { "color": "red" },
    { "color": "green" },
    { "color": "blue" }
];
// `color`プロパティが"blue"のオブジェクトを取得
var blueColor = colors.find((object) => {
    return object.color === "blue";
});
console.log(blueColor); // => { "color": "blue" }
// 該当する要素がない場合は`undefined`を返す
console.log(array.find((object) => object.color === "white")); // => undefined
```

### 真偽値を取得

最後に、ある要素が配列に含まれているかを知る方法について見ていきます。
インデックスや要素が取得できれば、その要素は配列に含まれているということは分かります。

しかし、ある要素が含まれているか**だけ**を知りたい場合に、
`Array#findIndex`メソッドや`Array#find`メソッドは過剰な機能を持っています。
そのコードを読んだ人は取得したインデックスや要素を何に使うのかが明確ではありません。

次のコードは、`Array#indexOf`メソッドを利用し、該当する要素が含まれているかを判定しています。
`indexOf`メソッドの結果を`indexOfJS`に代入していますが、含まれているかを判定する以外には利用していません。
コードを隅々まで読まないといけないため、意図が明確ではなくコードの読みづらさにつながります。

```js
var array = ["Java", "JavaScript", "Ruby"];
// `indexOf`メソッドは含まれていないときのみ`-1`を返すことを利用
var indexOfJS = array.indexOf("JavaScript");
if (indexOfJS !== -1) {
    console.log("配列にJavaScriptが含まれている");
    // ... 色々な処理 ...
    // `indexOfJS`は、含まれているのかの判定以外には利用してない
}

```

しかし、ES2015からは`Array#includes`メソッドである要素が含まれているかを判定できます。
`includes`メソッドは真偽値を返すので、`indexOf`メソッドを使った場合に比べて意図が明確になります。
そのため、前述のコードは次のように`includes`メソッドを使うべきでしょう。

```js
var array = ["Java", "JavaScript", "Ruby"];
// `includes`は含まれているなら`true`を返す
if (array.includes("JavaScript")) {
    console.log("配列にJavaScriptが含まれている");
}
```

`includes`メソッドは、`indexOf`メソッドと同様で、異なるオブジェクトだが値が同じものを見つけたい場合には利用できません。
`Array#find`メソッドのようにテストするコールバック関数を利用して、真偽値を得るには`Array#some`メソッドを利用できます。

`Array#some`メソッドはテストする関数をコールバック関数にマッチする要素があるなら`true`を返し、存在しない場合は`false`を返します。
（[ループと反復処理](../loop/README.md#array-some)を参照）

```js
// colorプロパティを持つオブジェクトの配列
var colors = [
    { "color": "red" },
    { "color": "green" },
    { "color": "blue" }
];
// `color`プロパティが"blue"のオブジェクとがあるかどうか
var isIncludedBlueColor = colors.some((object) => {
    return object.color === "blue";
});
console.log(isIncludedBlueColor); // => true
```

## 追加と削除

配列は可変長であるため、生成後に要素を追加したり、削除できます。

要素を配列の末尾へ追加するには`Array#push`が利用できます。
一方、末尾から要素を削除するには`Array#pop`が利用できます。

```js
var array = ["A", "B", "C"];
array.push("D"); // "D"を末尾に追加
console.log(array); // => ["A", "B", "C", "D"]
var popedItem = array.pop(); // 最末尾の要素を削除し、その要素を返す 
console.log(popedItem); // => "D"
console.log(array); // => ["A", "B", "C"]
```

要素を配列の先頭へ追加するには`Array#unshift`が利用できます。
一方、配列の先頭から要素を削除するには`Array#shift`が利用できます。

```js
var array = ["A", "B", "C"];
array.unshift("S"); // "S"を先頭に追加
console.log(array); // => ["S", "A", "B", "C"]
var shiftedItem = array.shift(); // 先頭の要素を削除 
console.log(shiftedItem); // => "S"
console.log(array); // => ["A", "B", "C"]
```

## 配列から要素を削除

### `Array#splice`

配列の先頭や末尾の要素を削除する場合は`Array#shift`や`Array#pop`で行えます。
しかし、配列の任意のインデックスにある要素を削除することはできません。
配列の任意のインデックスの要素削除するには`Array#splice`を利用できます。

`Array#splice`メソッドを利用すると、削除した要素を自動で詰めることができます。
`Array#splice`メソッドは、`index`番目から`削除する数`だけ要素を取り除き、必要ならば要素を同時に追加できます。

```js
var array = [];
array.splice(インデックス, 削除する要素数);
// 削除と同時に要素の追加もできる
array.splice(インデックス, 削除する要素数, ...追加する要素);
```

たとえば、配列のインデックスが`1`の要素を削除するには、インデックス`1`から`1`つの要素を削除するという指定をする必要があります。
このとき、削除した要素は自動で詰められるため、疎な配列にはなりません。

```js
var array = [1, 2, 3];
// 1番目から1つの要素を削除
array.splice(1, 1);
console.log(array); // => [1, 3]
console.log(array.length); // => 2
console.log(array[1]); // => 3
// すべて削除
array.splice(0, array.length);
console.log(array.length); // => 0
```

### `length`プロパティへの代入

配列のすべての要素を削除することは`Array#splice`で行うことができますが、
配列の`length`プロパティへの代入を利用した方法もあります。

```js
var array = [1, 2, 3];
array.length = 0; // 配列を空にする
console.log(array); // => []
```

配列の`length`プロパティへ`要素数`を代入すると、その要素数に配列が切り詰められます。
つまり、`length`プロパティへ`0`を代入すると、インデックスが`0`以降の要素がすべて削除されます。

### 空の配列を代入

さいごに、その配列の要素を削除するのではなく、新しい空の配列を変数へ代入する方法です。
次のコードでは、`array`変数に空の配列を代入することで、`array`は空の配列を参照させることができます。

```js
var array = [1, 2, 3];
console.log(array.length); // => 3
// 新しい配列で変数を上書き
array = [];
console.log(array.length); // => 0
```

元々、`array`変数が参照していた`[1, 2, 3]`はどこからも参照されなくなり、ガベージコレクションによりメモリから解放されます。

また、`var`で宣言していた変数を`const`にした場合は、再代入できないためこの手法は使うことができません。
そのため、再代入をしたい場合は`let`または`var`で変数する必要があります。

[import, const-empty-array-invalid.js](./src/const-empty-array-invalid.js)

-------

- [ ] ここまでが配列の基礎

-------

## 配列を使ってLRU
## 疎な配列を作る
## Array-likeとは何か
## 配列をコピー

どのメソッドも`array`変数が参照する配列そのものを変更している操作であることが分かります。
次のような例を見てみると分かるように、`myArray`に対して要素を追加したとき、`yourArray`にも影響がでているということが分かります。

```js
var myArray = ["A", "B", "C"];
var yourArray = myArray;
myArray.push("D");
console.log(yourArray); // => ["A", "B", "C", "D"]
```

これは、`myArray`と`yourArray`が同じ配列オブジェクトへの参照を持っているためです。
オブジェクトは値への参照を使い操作されるため参照型のデータであるため（[データ型とリテラル](../data-type/README.md)を参照）、
どちらの変数も同じ配列オブジェクトの参照となっています。

たとえば、`removeAtIndex`という関数がある場合に、次のように渡した配列に対して影響を与えることは予測しにくい場合があります。

```js
function removeAtIndex(array, index) {
    array.splice(index, 1);
}
var array = ["A", "B", "C"];
removeAtIndex(array, 1);
console.log(array); // => ["A", "C"]
```

`removeAtIndex`関数は、引数で受け取った`array`から要素を削除しているため、それ以降の`array`自体に影響を与えています。
このような、ある機能が受け取った値そのものに影響を与えることを**破壊的**操作と呼びます。

- [ ] `Array` の比較について

これを回避するためには配列を明示的にコピーしたものを`yourArray`に代入する必要があります。
JavaScriptには残念ながら copyメソッドというような分かりやすい名前のメソッドは存在していませんが、
配列の参照をコピーする機能をもつメソッドが代用されています。

`Array#slice`と`Array#concat`がコピーの代用として使われているメソッドです。

```js
var myArray = ["A", "B", "C"];
var yourArray = myArray.slice(); // `myArray`のコピーを返す
myArray.push("D");
console.log(yourArray); // => ["A", "B", "C"]
```


```js
function removeAtIndex(array, index) {
    array.splice(index, 1);
}
var array = ["A", "B", "C"];
removeAtIndex(array, 1);
console.log(array); // => ["A", "C"]
```


## 高階関数とメソッドチェーン
## パターン: nullを返さずに配列を返す
