---
author: azu
---

# 配列

この章では、配列の基本的な操作と配列を扱う場合においてのパターンについて学びます。
配列はJavaScriptの中でもよく使われるオブジェクトです。

配列とは値に順序つけて格納することができるオブジェクトです。
配列に格納したそれぞれの値のことを**要素**、それぞれの要素の位置のことを**インデックス**（`index`）と呼びます。
また、JavaScriptの配列は可変長の配列のみとなっています。

## 配列は特別なオブジェクト

JavaScriptはプリミティブ型のデータ以外はすべてオブジェクトです。
そのため、配列もオブジェクトの一種です。
このことは、`typeof`演算子の結果を見てみることでもわかります。

```js
typeof ["配列", "は", "オブジェクト"]; // => "object"
```

しかし、`Object`から作られるオブジェクトとは異なる特殊な動作やメソッドを持っています。

その特殊な動作であるのが`length`プロパティです。
配列には複数の要素を格納することができます。
格納している要素数は `length`プロパティで知ることができます。

```js
var array = ["文字列", 42, { key: "value" }];
console.log(array.length); // => 3
```

`length`プロパティは配列の要素の数を返します。

また、`length`プロパティへ値を代入することができます。
これは配列の要素を削除することに利用されますが、特殊な動作となっているため後ほど詳しく解説します。

```js
var array = ["文字列", 42, { key: "value" }];
array.length = 0; // 配列を空にする
console.log(array); // => []
```

### オブジェクトが配列かどうかを判定する

配列は特殊なオブジェクトですが、私たちは`length`プロパティを持ったオブジェクトを作ることができます。

```js
var object = {
    length: 0
};
```

先ほど示したように`typeof`ではオブジェクトと配列の区別は付きません。
また、`length`プロパティが存在するかでは、それが配列であるとは判断することができません。

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
// objectにはプロパティ名が"100"のものがないため、undefinedが返る
console.log(object[100]); // => undefined
```

また、配列は常に`length`の数だけ要素を持っているとは限りません。
次のように、配列リテラルでは値を省略することで、未定義の要素を含めることができます。
このような、配列の中に隙間があるものを**疎の配列**と呼びます。
一方、隙間がなくすべてのインデックスに要素がある配列を**密の配列**と呼びます。

```js
// 未定義の要素が1つ含まれる疎の配列
var sparselyArray = [1,, 3];
console.log(sparselyArray.length); // => 3 
// 1番目の要素は存在しないため undefined が返る
console.log(sparselyArray[1]); // => undefined
```

### コラム: 値がない要素と未定義の要素の違い

- [ ] hasOwnPropertyについて

## 配列から要素を検索

- [x] find
- [x] includes
- [x] indexOf

## 追加と削除

配列は可変長であるため、生成後に要素を追加したり、削除することができます。

要素を配列の末尾へ追加するには`Array#push`が利用できます。
逆に、配列の末尾から要素を削除するには`Array#pop`が利用できます。

```js
var array = ["A", "B", "C"];
array.push("D"); // "D"を末尾に追加
console.log(array); // => ["A", "B", "C", "D"]
var popedItem = array.pop(); // 最末尾の要素を削除し、その要素を返す 
console.log(popedItem); // => "D"
console.log(array); // => ["A", "B", "C"]
```

要素を配列の先頭へ追加するには`Array#unshift`が利用できます。
逆に、配列の先頭から要素を削除するには`Array#shift`が利用できます。

```js
var array = ["A", "B", "C"];
array.unshift("S"); // "S"を先頭に追加
console.log(array); // => ["S", "A", "B", "C"]
var shiftedItem = array.shift(); // 先頭の要素を削除 
console.log(shiftedItem); // => "S"
console.log(array); // => ["A", "B", "C"]
```

## 配列から要素を削除
## 配列を使ってLRU
## 疎の配列を作る
## Array-likeとは何か
## 配列をコピー

どのメソッドも`array`変数が参照する配列そのものを変更している操作であることが分かります。
次のような例を見てみると分かるように、`myArray`に対して要素を追加した場合にも、
`myArray`の参照値のコピーを持った`yourArray`にも影響がでているということが分かります。

```js
var myArray = ["A", "B", "C"];
var yourArray = myArray;
myArray.push("D");
console.log(yourArray); // => ["A", "B", "C"]
```

これは、`myArray`と`yourArray`が同じ配列オブジェクトへの参照を持っているためです。
オブジェクトは値への参照を使い操作されるため参照型のデータであるため（[データ型とリテラル](../data-type/README.md)を参照）、
どちらの変数も同じ配列オブジェクトの参照となっています。

これを回避するためには配列を明示的にコピーしたものを`yourArray`に代入する必要があります。
JavaScriptには残念ながら copyメソッドというような分かりやすい名前のメソッドは存在していませんが、
配列の参照をコピーする機能を持つメソッドが代用されています。

`Array#slice`と`Array#concat`がコピーの代用として使われているメソッドです。

```js
var myArray = ["A", "B", "C"];
var yourArray = myArray.slice(); // `myArray`のコピーを返す
myArray.push("D");
console.log(yourArray); // => ["A", "B", "C"]
```


- [ ] MutableとImmutable

## 高階関数とメソッドチェーン
## パターン: nullを返さずに配列を返す
