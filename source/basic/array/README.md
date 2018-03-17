---
author: azu
---

# 配列 {#array}

この章では、配列の基本的な操作と配列を扱う場合においてのパターンについて学びます。
配列はJavaScriptの中でもよく使われるオブジェクトです。

配列とは値に順序をつけて格納できるオブジェクトです。
配列に格納したそれぞれの値のことを**要素**、それぞれの要素の位置のことを**インデックス**（`index`）と呼びます。
また、JavaScriptの配列は可変長の配列のみとなっています。

## 配列は特別なオブジェクト {#array-is-special-object}

JavaScriptでは、プリミティブ型のデータ以外はすべてオブジェクトです。
そのため、配列もオブジェクトの一種です。
このことは、`typeof`演算子の結果を見てみることでもわかります。

{{book.console}}
```js
typeof ["A", "B", "C"]; // => "object"
```

しかし、`Object`のインスタンスにはない`Array#forEach`などのメソッドや特殊な動作を持っています。

その特殊な動作が`length`プロパティです。
配列には複数の要素を格納できますが、`length`プロパティはその配列の要素数を返します。

{{book.console}}
```js
const array = ["A", "B", "C"];
console.log(array.length); // => 3
```

また、`length`プロパティへ値を代入できます。
`length`プロパティへ値を代入は配列の要素を削除することに利用されることがあります。
配列の`length`プロパティは特殊な動作となっているため、後ほど解説します。

{{book.console}}
```js
const array = ["A", "B", "C"];
array.length = 0; // 配列を空にする
console.log(array); // => []
```

### オブジェクトが配列かどうかを判定する {#detect-array}

配列の`length`プロパティは特殊な動作をしますが、独自の`length`プロパティを持ったオブジェクトを作ることができます。
この２つのオブジェクトの違いはどのように見分ければいいのでしょうか？

{{book.console}}
```js
// 配列
const array = [];
// `length`を持つオブジェクト
const object = {
    length: 0
};
```

先ほど示したように`typeof`ではオブジェクトと配列の区別は付きません。
また、`length`プロパティが存在するかでは、それが配列であるとは判断できません。

そのため、あるオブジェクトが配列なのかを知りたい場合には、`Array.isArray`メソッドを利用します。
`Array.isArray`メソッドは引数が配列ならば`true`を返します。

{{book.console}}
```js
const array = [];
console.log(Array.isArray(array)); // => true
// 配列のようなオブジェクト
const object = {
    length: 0
};
console.log(Array.isArray(object)); // => false
```


### [コラム] TypedArray {#typed-array}

JavaScriptの配列は可変長のみですが、`TypedArray`という固定長でかつ型付きの配列を扱う別のオブジェクトが存在します。
`TypedArray`はバイナリデータを扱うためのオブジェクトで、WebGLやバイナリを扱う場面で利用されます。
`TypedArray`は文字列や数値などのプリミティブ型の値はそのままでは扱えないため、扱う値はTypedArrayオブジェクトという形式にする必要があります。
そのため、通常の配列とは異なる使い勝手や用途が存在します。

JavaScriptで配列といった場合には`Array`を示します。

## 配列の作成とアクセス {#create-and-access}

配列の作成と要素へのアクセス方法は[データ型とリテラル](../data-type/#array)ですでに紹介していますが、
もう一度振り返ってみましょう。

配列の作成には配列リテラルを使うのが簡単です。
配列リテラル（`[`と`]`）の中に要素をカンマ（`,`）区切りで記述するだけです。

{{book.console}}
```js
const emptyArray = [];
const numbers = [1, 2, 3];
const matrix = [
    [0, 1],
    [0, 1]
]; // ２次元配列
```

作成した配列の要素へインデックスとなる数値を、`配列[インデックス]`と記述することで、
そのインデックスにある要素を配列から読み取ることができます。
配列の先頭要素のインデックスは`0`となります。配列のインデックスは、`0`以上`2^32 - 1`未満の整数となります。

{{book.console}}
```js
const array = ["one", "two", "three"];
console.log(array[0]); // => "one"
```

先ほど学んだように、配列の`length`プロパティは配列の要素の数を返します。
そのため、配列の最後の要素へアクセスするには `array.length - 1` をインデックスとして指定します。

{{book.console}}
```js
const array = ["one", "two", "three"];
console.log(array[array.length - 1]); // => "three"
```

一方、存在しないインデックスにアクセスした場合はどうなるでしょうか？
多くの言語では、配列の存在しないインデックスへアクセスするとエラーなりますが、JavaScriptでは`undefined`が返ってきます。

{{book.console}}
```js
const array = ["one", "two", "three"];
console.log(array[100]); // => undefined
```

これは、配列がオブジェクトであることを考えると、次のように存在しないプロパティへのアクセスと同じということが分かります。
オブジェクトでも、存在しないプロパティへのアクセスした場合には`undefined`が返ってきます。

{{book.console}}
```js
const object = {
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

{{book.console}}
```js
// 未定義の箇所が1つ含まれる疎な配列
const sparseArray = [1,, 3];
console.log(sparseArray.length); // => 3 
// 1番目の要素は存在しないため undefined が返る
console.log(sparseArray[1]); // => undefined
```

## [コラム] undefinedの要素と未定義の要素の違い {#diff-undefined-and-no-element}

疎な配列で該当するインデックスに要素がない場合は`undefined`を返します。
しかし、JavaScriptに`undefined`値も存在するため、配列に`undefined`値がある場合に区別できません。

{{book.console}}
```js
// 要素として`undefined`を持つ密な配列
const denseArray = [1, undefined, 3];
// 要素そのものがない疎な配列
const sparseArray = [1, , 3];
console.log(denseArray[1]); // => undefined
console.log(sparseArray[1]); // => undefined
```

この違いを見つける方法として利用できるのが`Object#hasOwnProperty`メソッドです。
`hasOwnProperty`メソッドを使うことで、配列の指定したインデックスに要素自体が存在するかを判定できます。

{{book.console}}
```js
const denseArray = [1, undefined, 3];
const sparseArray = [1, , 3];
// 要素自体は`undefined`値が存在する
console.log(denseArray.hasOwnProperty(1)); // => true
// 要素自体がない
console.log(sparseArray.hasOwnProperty(1)); // => false
```

## 配列から要素を検索 {#search-element}

配列からある要素があるかを探索したい場合に、
主に次の3つの目的に分類できます。

- その要素のインデックスが欲しい場合
- その要素自体が欲しい場合
- その要素が含まれているかという真偽値が欲しい場合

配列にはそれぞれに対応したメソッドが用意されているため、目的別に見ていきます。

### インデックスを取得 {#indexof}

ある要素が配列のどの位置にあるかを知りたい場合、`Array#indexOf`メソッドや`Array#findIndex`メソッドを利用します。
要素の位置のことを**インデックス**（`index`）と呼ぶため、メソッド名にも`index`という名前が入っています。

次のコードでは、`Array#indexOf`メソッドを利用して、配列の中から`"JavaScript"`という文字列のインデックスを取得しています。
`indexOf`メソッドは引数と厳密等価演算子（`===`）で一致する要素があるなら、その要素のインデックスを返し、該当する要素がない場合は`-1`を返します。
`indexOf`メソッドは先頭から探索して見つかった要素のインデックスを返します。
`indexOf`メソッドには対となる`Array#lastIndexOf`メソッドがあり、`lastIndexOf`メソッドは末尾から探索した結果を得ることができます。

{{book.console}}
```js
const array = ["Java", "JavaScript", "Ruby"];
const indexOfJS = array.indexOf("JavaScript");
console.log(indexOfJS); // => 1
console.log(array[indexOfJS]); // => "JavaScript"
// "JS" という要素はないため `-1` が返される
console.log(array.indexOf("JS")); // => -1
```

`indexOf`メソッドは配列からプリミティブな要素は発見できますが、オブジェクトは持っているプロパティが同じでも別オブジェクトだと異なるものとして扱われます。
次のコードを見ると、同じプロパティをもつ異なるオブジェクトは、`indexOf`メソッドでは見つけることができません。
これは、異なる参照をもつオブジェクト同士は`===`で比較しても一致しないためです。

{{book.console}}
```js
const object = { key: "value" };
const array = ["A", "B", object];
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

{{book.console}}
```js
// colorプロパティを持つオブジェクトの配列
const colors = [
    { "color": "red" },
    { "color": "green" },
    { "color": "blue" }
];
// `color`プロパティが"blue"のオブジェクトのインデックスを取得
const indexOfBlue = colors.findIndex((object) => {
    return object.color === "blue";
});
console.log(indexOfBlue); // => 2
console.log(colors[indexOfBlue]); // => { "color": "blue" }
```

### 条件に一致する要素を取得 {#find}

配列から要素を取得する方法としてインデックスを使うこともできます。
先ほどのように`findIndex`メソッドでインデックスを取得、そのインデックスで配列へアクセスすればよいだけです。

しかし、`findIndex`メソッドを使い要素を取得するケースでは、
そのインデックスが欲しいのか、またはその要素自体が欲しいのかがコードとして明確ではありません。

より明確に要素自体が欲しいということを表現するには、`Array#find`を使うことができます。
`find`メソッドは、`findIndex`メソッドと同様にテストする関数をコールバック関数として渡します。
`find`メソッドの返り値は、要素そのものとなり、要素が存在しない場合は`undefined`を返します。

{{book.console}}
```js
// colorプロパティを持つオブジェクトの配列
const colors = [
    { "color": "red" },
    { "color": "green" },
    { "color": "blue" }
];
// `color`プロパティが"blue"のオブジェクトを取得
const blueColor = colors.find((object) => {
    return object.color === "blue";
});
console.log(blueColor); // => { "color": "blue" }
// 該当する要素がない場合は`undefined`を返す
console.log(colors.find((object) => object.color === "white")); // => undefined
```

### 指定範囲の要素を取得 {#slice}

配列から指定範囲の要素を取り出す方法として`Array#slice`メソッドが利用できます。
`slice`メソッドは第一引数に開始位置、第二引数に終了位置を指定することで、その範囲を取り出した新しい配列を返します。
第二引数は省略でき、省略した場合は配列の末尾が終了位置となります。

{{book.console}}
```js
const array = ["A", "B", "C", "D", "E"];
// インデックス1から4の範囲を取り出す
console.log(array.slice(1, 4)); // => ["B", "C", "D"]
// 第二引数を省略した場合は、第一引数から末尾の要素までを取り出す
console.log(array.slice(1)); // => ["B", "C", "D", "E"]
// マイナスを指定すると後ろからの数えた位置となる
console.log(array.slice(-1)); // => ["E"]
// 第一引数 > 第二引数の場合、常に空配列を返す
console.log(array.slice(4, 1)); // => []
```

### 真偽値を取得 {#get-boolean}

最後に、ある要素が配列に含まれているかを知る方法について見ていきます。
インデックスや要素が取得できれば、その要素は配列に含まれているということは分かります。

しかし、ある要素が含まれているか**だけ**を知りたい場合に、
`Array#findIndex`メソッドや`Array#find`メソッドは過剰な機能を持っています。
そのコードを読んだ人は取得したインデックスや要素を何に使うのかが明確ではありません。

次のコードは、`Array#indexOf`メソッドを利用し、該当する要素が含まれているかを判定しています。
`indexOf`メソッドの結果を`indexOfJS`に代入していますが、含まれているかを判定する以外には利用していません。
コードを隅々まで読まないといけないため、意図が明確ではなくコードの読みづらさにつながります。

{{book.console}}
```js
const array = ["Java", "JavaScript", "Ruby"];
// `indexOf`メソッドは含まれていないときのみ`-1`を返すことを利用
const indexOfJS = array.indexOf("JavaScript");
if (indexOfJS !== -1) {
    console.log("配列にJavaScriptが含まれている");
    // ... 色々な処理 ...
    // `indexOfJS`は、含まれているのかの判定以外には利用してない
}

```

しかし、ES2015からは`Array#includes`メソッドである要素が含まれているかを判定できます。
`includes`メソッドは真偽値を返すので、`indexOf`メソッドを使った場合に比べて意図が明確になります。
そのため、前述のコードは次のように`includes`メソッドを使うべきでしょう。

{{book.console}}
```js
const array = ["Java", "JavaScript", "Ruby"];
// `includes`は含まれているなら`true`を返す
if (array.includes("JavaScript")) {
    console.log("配列にJavaScriptが含まれている");
}
```

`includes`メソッドは、`indexOf`メソッドと同様で、異なるオブジェクトだが値が同じものを見つけたい場合には利用できません。
`Array#find`メソッドのようにテストするコールバック関数を利用して、真偽値を得るには`Array#some`メソッドを利用できます。

`Array#some`メソッドはテストする関数をコールバック関数にマッチする要素があるなら`true`を返し、存在しない場合は`false`を返します。
（[ループと反復処理](../loop/README.md#array-some)を参照）

{{book.console}}
```js
// colorプロパティを持つオブジェクトの配列
const colors = [
    { "color": "red" },
    { "color": "green" },
    { "color": "blue" }
];
// `color`プロパティが"blue"のオブジェクトがあるかどうか
const isIncludedBlueColor = colors.some((object) => {
    return object.color === "blue";
});
console.log(isIncludedBlueColor); // => true
```

## 追加と削除 {#add-and-delete}

配列は可変長であるため、作成後の配列に対して要素を追加、削除できます。

要素を配列の末尾へ追加するには`Array#push`が利用できます。
一方、末尾から要素を削除するには`Array#pop`が利用できます。

{{book.console}}
```js
const array = ["A", "B", "C"];
array.push("D"); // "D"を末尾に追加
console.log(array); // => ["A", "B", "C", "D"]
const popedItem = array.pop(); // 最末尾の要素を削除し、その要素を返す 
console.log(popedItem); // => "D"
console.log(array); // => ["A", "B", "C"]
```

要素を配列の先頭へ追加するには`Array#unshift`が利用できます。
一方、配列の先頭から要素を削除するには`Array#shift`が利用できます。

{{book.console}}
```js
const array = ["A", "B", "C"];
array.unshift("S"); // "S"を先頭に追加
console.log(array); // => ["S", "A", "B", "C"]
const shiftedItem = array.shift(); // 先頭の要素を削除 
console.log(shiftedItem); // => "S"
console.log(array); // => ["A", "B", "C"]
```

## 配列同士を結合 {#concat}

`Array#concat`メソッドを使うことで配列と配列を結合した新しい配列を作成できます。

{{book.console}}
```js
const array = ["A", "B", "C"];
const newArray = array.concat(["D", "E"]);
console.log(newArray); // => ["A", "B", "C", "D", "E"]
```

また、`concat`メソッドは配列だけではなく任意の値を要素として結合できます。

{{book.console}}
```js
const array = ["A", "B", "C"];
const newArray = array.concat("新しい要素");
console.log(newArray); // => ["A", "B", "C", "新しい要素"]
```

## 配列から要素を削除 {#delete-element}

### `Array#splice` {#splice}

配列の先頭や末尾の要素を削除する場合は`Array#shift`や`Array#pop`で行えます。
しかし、配列の任意のインデックスにある要素を削除することはできません。
配列の任意のインデックスの要素削除するには`Array#splice`を利用できます。

`Array#splice`メソッドを利用すると、削除した要素を自動で詰めることができます。
`Array#splice`メソッドは、`index`番目から`削除する数`だけ要素を取り除き、必要ならば要素を同時に追加できます。

{{book.console}}
<!-- doctest: ReferenceError -->
```js
const array = [];
array.splice(インデックス, 削除する要素数);
// 削除と同時に要素の追加もできる
array.splice(インデックス, 削除する要素数, ...追加する要素);
```

たとえば、配列のインデックスが`1`の要素を削除するには、インデックス`1`から`1`つの要素を削除するという指定をする必要があります。
このとき、削除した要素は自動で詰められるため、疎な配列にはなりません。

{{book.console}}
```js
const array = [1, 2, 3];
// 1番目から1つの要素を削除
array.splice(1, 1);
console.log(array); // => [1, 3]
console.log(array.length); // => 2
console.log(array[1]); // => 3
// すべて削除
array.splice(0, array.length);
console.log(array.length); // => 0
```

### `length`プロパティへの代入 {#assign-to-length}

配列のすべての要素を削除することは`Array#splice`で行うことができますが、
配列の`length`プロパティへの代入を利用した方法もあります。

{{book.console}}
```js
const array = [1, 2, 3];
array.length = 0; // 配列を空にする
console.log(array); // => []
```

配列の`length`プロパティへ`要素数`を代入すると、その要素数に配列が切り詰められます。
つまり、`length`プロパティへ`0`を代入すると、インデックスが`0`以降の要素がすべて削除されます。

### 空の配列を代入 {#assign-empty-array}

さいごに、その配列の要素を削除するのではなく、新しい空の配列を変数へ代入する方法です。
次のコードでは、`array`変数に空の配列を代入することで、`array`は空の配列を参照させることができます。

{{book.console}}
```js
let array = [1, 2, 3];
console.log(array.length); // => 3
// 新しい配列で変数を上書き
array = [];
console.log(array.length); // => 0
```

元々、`array`変数が参照していた`[1, 2, 3]`はどこからも参照されなくなり、ガベージコレクションによりメモリから解放されます。

また、`var`で宣言していた変数を`const`にした場合は、再代入できないためこの手法は使うことができません。
そのため、再代入をしたい場合は`let`または`var`で変数する必要があります。

[import, const-empty-array-invalid.js](./src/const-empty-array-invalid.js)

## 破壊的なメソッドと非破壊的なメソッド {#mutable-immutable}

これまで紹介してきた配列を変更するメソッドには、破壊的なメソッドと非破壊的メソッドがあります。この破壊的なメソッドと非破壊的メソッドの違いを知ることは、意図しない結果を避けるために重要です。
破壊的なメソッドとは、配列オブジェクトそのものを変更し、変更した配列または変更箇所を返すメソッドです。
非破壊的メソッドとは、配列オブジェクトのコピーを作成してから変更し、そのコピーの配列を返すメソッドです。

<!-- 具体例:破壊的なメソッド -->

破壊的なメソッドの例として、配列に要素を追加する`Array#push`メソッドがあります。
`push`メソッドは、`myArray`の配列そのものへ要素を追加しています。
その結果`myArray`の参照する配列が変更されるため破壊的なメソッドです。

{{book.console}}
```js
const myArray = ["A", "B", "C"];
const result = myArray.push("D"); 
// `push`の返り値は配列ではなく、追加後の配列のlength
console.log(result); // => 4
// `myArray`が参照する配列そのものが変更されている
console.log(myArray); // => ["A", "B", "C", "D"]
```

<!-- 具体例:非破壊的メソッド -->

非破壊的なメソッドの例として、配列に要素を結合する`Array#concat`メソッドがあります。
`concat`メソッドは、`myArray`をコピーした配列に対して要素を結合しその配列を返します。
その結果`myArray`の参照する配列は変更されないため非破壊的なメソッドです。

{{book.console}}
```js
const myArray = ["A", "B", "C"];
// `concat`の返り値は結合済みの新しい配列
const newArray = myArray.concat("D");
console.log(newArray); // => ["A", "B", "C", "D"]
// `myArray`は変更されていない
console.log(myArray); // => ["A", "B", "C"]
// `newArray`と`myArray`は異なる配列オブジェクト
console.log(myArray === newArray); // => false
```

<!--　必要性  -->

JavaScriptにおいて破壊的なメソッドと非破壊的メソッドを名前から見分ける方法はありません。
また、返り値が配列の破壊的なメソッドもあるため、返り値からも判別できません。たとえば、`Array#sort`メソッドは返り値がソート済みの配列ですが破壊的です。
次に紹介するメソッドは破壊的なメソッドであり、その他のメソッドは非破壊的なメソッドです。

| メソッド名                                    | 返り値           |
| ---------------------------------------- | ------------- |
| [`Array.prototype.pop`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) | 配列の末尾の値       |
| [`Array.prototype.push`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/push) | 変更後の配列のlength |
| [`Array.prototype.splice`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) | 取り除かれた要素を含む配列 |
| [`Array.prototype.reverse`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) | 反転した配列        |
| [`Array.prototype.shift`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) | 配列の先頭の値       |
| [`Array.prototype.sort`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) | ソートした配列       |
| [`Array.prototype.unshift`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) | 変更後の配列のlength |
| [`Array.prototype.copyWithin`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin) | 変更後の配列        |
| [`Array.prototype.fill`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) | 変更後の配列        |


破壊的メソッドは意図せぬ副作用を与えてしまうことがあるため、そのことを意識して利用する必要があります。たとえば、配列から特定のインデックスの要素を削除する`removeAtIndex`という関数を提供したいとします。

```
// `array`の`index`番目の要素を削除した配列を返す関数
function removeAtIndex(array, index) { /* 実装 */ }
```

次のように破壊的なメソッドである`Array#splice`メソッドで要素を削除すると、引数として受け取った配列にも影響を与えます。この場合`removeAtIndex`関数には副作用があるため、破壊的であることについてのコメントがあると親切です。


{{book.console}}
```js
// `array`の`index`番目の要素を削除した配列を返す関数
// 引数の`array`は破壊的に変更される
function removeAtIndex(array, index) {
    array.splice(index, 1);
    return array;
}
const array = ["A", "B", "C"];
// `array`から1番目の要素を削除した配列を取得
const newArray = removeAtIndex(array, 1);
console.log(newArray); // => ["A", "C"]
// `array`自体にも影響を与える
console.log(array); // => ["A", "C"]
```

一方、非破壊的メソッドは配列のコピーを作成するため元々の配列に対して影響はありません。
この`removeAtIndex`関数を非破壊的ものにするには、受け取った配列をコピーしてから変更を加える必要があります。

JavaScriptには`copy`メソッドはそのもの存在しませんが、配列をコピーする方法として`Array#slice`メソッドと`Array#concat`メソッドが利用されています。`slice`メソッドと`concat`メソッドは引数なしで呼び出すと、その配列のコピーを返します。

{{book.console}}
```js
const myArray = ["A", "B", "C"];
// `slice`は`myArray`のコピーを返す - `myArray.concat()`でも同じ
const copiedArray = myArray.slice(); 
myArray.push("D");
console.log(myArray); // => ["A", "B", "C", "D"]
// `array`のコピーである`copiedArray`には影響がない
console.log(copiedArray); // => ["A", "B", "C"]
// コピーであるため参照は異なる
console.log(copiedArray === myArray); // => false
```

コピーした配列に変更を加えることで、`removeAtIndex`関数を非破壊的な関数として実装できます。
非破壊的であれば引数の配列への副作用がないので、注意させるようなコメントは不要です。

{{book.console}}
```js
// `array`の`index`番目の要素を削除した配列を返す関数
function removeAtIndex(array, index) {
    // コピーを作成してから変更する
    const copiedArray = array.slice();
    copiedArray.splice(index, 1);
    return copiedArray;
}
const array = ["A", "B", "C"];
// `array`から1番目の要素を削除した配列を取得
const newArray = removeAtIndex(array, 1);
console.log(newArray); // => ["A", "C"]
// 元の`array`には影響がない
console.log(array); // => ["A", "B", "C"]
```

このようにJavaScriptの配列には破壊的なメソッドと非破壊的メソッドが混在しています。そのため、統一的なインタフェースで扱えないのが現状です。このような背景もあるため、JavaScriptには配列を扱うためのさまざまライブラリが存在します。
[immutable-array-prototype][]は破壊的なメソッドを非破壊的にしたものを提供し、[Lodash][]は標準にはない便利なメソッドを提供し、[Immutable.js][]は効率的なデータ構造を提供するなどさまざまです。

## [コラム] Array-likeオブジェクト {#array-like}

配列のように扱えるが配列ではないオブジェクトのことを、**Array-likeオブジェクト**と呼びます。
Array-likeオブジェクトとは配列のようにインデックスにアクセスでき、配列のように`length`プロパティも持っています。しかし、配列のインスタンスではないため、Arrayメソッドは持っていないオブジェクトのことです。

| 機能                             | Array-likeオブジェクト | 配列    |
| ------------------------------ | ---------------- | ----- |
| インデックスアクセス（`array[0]`)         | できる              | できる   |
| 長さ（`array.length`) 　      | 持っている            | 持っている |
| Arrayメソッド(`Array#forEach`など) | 持っていない場合もある      | 持っている |

Array-likeオブジェクトの例として`arguments`があります。
`aguments`オブジェクトは、`function`で宣言した関数の中から参照できる変数です。
`aguments`オブジェクトには関数の引数に渡された値が順番に格納されていて、配列のように引数へアクセスできます。

{{book.console}}
```js
function myFunc() {
    console.log(arguments[0]); // => "a" 
    console.log(arguments[1]); // => "b" 
    console.log(arguments[2]); // => "c" 
    // 配列ではないため、配列のメソッドは持っていない
    console.log(typeof arguments.forEach); // => "undefined"
}
myFunc("a", "b", "c");
```

Array-likeオブジェクトか配列なのかを判別するには`Array.isArray`メソッドを利用できます。
`Array-like`オブジェクトは配列ではないので結果は常に`false`となります。

{{book.console}}
```js
function myFunc() {
    console.log(Array.isArray([1, 2, 3])); // => true
    console.log(Array.isArray(arguments)); // => false
}
myFunc("a", "b", "c");
```

Array-likeオブジェクトは配列のようで配列ではないというもどかしさをもつオブジェクトです。`Array.from`メソッドを使うことでArray-likeをオブジェクト配列に変換して扱うことができます。一度配列に変換してしまえばArrayメソッドも利用できます。

{{book.console}}
```js
function myFunc() {
    // Array-likeオブジェクトを配列へ変換
    const argumentsArray = Array.from(arguments);
    console.log(Array.isArray(argumentsArray)); // => true
    // 配列のメソッドを利用できる
    argumentsArray.forEach(arg => {
        console.log(arg);
    });
}
myFunc("a", "b", "c");
```

## メソッドチェーンと高階関数 {#method-chain-and-high-order-function}

配列で頻出するパターンとしてメソッドチェーンがあります。
メソッドチェーンとは名前のとおり、メソッドの呼び出しを行いその結果の値に対してさらにメソッドを呼び出すパターンのことを言います。

次のコードでは、`Array#concat`メソッドの返り値、つまり配列に対してさらに`concat`メソッドを呼び出すというメソッドチェーンが行われています。

{{book.console}}
```js
const array = ["a"].concat("b").concat("c");
console.log(array); // => ["a", "b", "c"]
```

このコードの`concat`メソッドの呼び出しを分解してみると何がおこなわれているのか分かりやすいです。
`concat`メソッドの返り値は結合した新しい配列です。先ほどのメソッドチェーンでは、その新しい配列に対してさらに`concat`メソッドで値を結合しているということが分かります。

{{book.console}}
```js
// メソッドチェーンを分解した例
// 一時的な`abArray`という変数が増えている
const abArray = ["a"].concat("b");
console.log(abArray); // => ["a", "b"]
const abcArray = abArray.concat("c");
console.log(abcArray); // => ["a", "b", "c"]
```

メソッドチェーンを利用することで処理の見た目を簡潔にできます。メソッドチェーンを利用した場合も最終的な処理結果は同じですが、途中の一時的な変数を省略できます。先ほどの例では`abArray`という一時的な変数をメソッドチェーンでは省略できています。

メソッドチェーンは配列に限ったものではありませんが、配列では頻出するパターンです。なぜなら、配列に含まれるデータを表示する際には、最終的に文字列や数値など別のデータへ加工することが殆どであるためです。配列には配列を返す高階関数が多く実装されているため、配列を柔軟に加工できます。配列を返すことができる高階関数（関数を引数に受け取るメソッド）としては`Array#map`、`Array#filter`などがあります。

次のコードでは、ECMAScriptのバージョン名と発行年数が定義された`ecmascriptVersions`という配列が定義されています。この配列から`2000`年以前に発行されたECMAScriptのバージョン名の一覧を取り出すことを考えてみます。目的の一覧を取り出すには「2000年以前のデータに絞り込む」と「データから`name`を取り出す」という2つの加工処理を組み合わせる必要があります。

それぞれの加工処理は`Array#filter`メソッドと`Array#map`メソッドで実現できます。`filter`メソッドで配列から`2000`年以前というルールで絞り込み、`map`メソッドでそれぞれの要素から`name`プロパティを取り出せます。どちらのメソッドも配列を返すのでメソッドチェーンで処理を繋げることができます。

{{book.console}}
```js
// ECMAScriptのバージョン名と発行年
const ECMAScriptVersions = [
    { name: "ECMAScript 1", year: 1997 },
    { name: "ECMAScript 2", year: 1998 },
    { name: "ECMAScript 3", year: 1999 },
    { name: "ECMAScript 5", year: 2009 },
    { name: "ECMAScript 5.1", year: 2011 },
    { name: "ECMAScript 2015", year: 2015 },
    { name: "ECMAScript 2016", year: 2016 },
    { name: "ECMAScript 2017", year: 2017 },
];
// メソッドチェーンで必要な加工処理を並べている
const versionNames = ECMAScriptVersions
    // 2000年以下のデータに絞り込み
    .filter(ECMAScript => ECMAScript.year <= 2000)
    // それぞれの要素から`name`プロパティを取り出す
    .map(ECMAScript => ECMAScript.name);
console.log(versionNames); // => ["ECMAScript 1", "ECMAScript 2", "ECMAScript 3"]
```

メソッドチェーンを使うことで複数の処理からなるものをひとつのまとった処理のように見せることができます。長過ぎるメソッドチェーンは長すぎる関数と同じように読みにくくなりますが、適度な単位のメソッドチェーンは処理をスッキリ見せるパターンとして利用されています。

[immutable-array-prototype]: https://github.com/azu/immutable-array-prototype  "azu/immutable-array-prototype: A collection of Immutable Array prototype methods(Per method packages)."
[Lodash]: https://lodash.com/  "Lodash"
[Immutable.js]: https://facebook.github.io/immutable-js/  "Immutable.js"
