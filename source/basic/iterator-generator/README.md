---
author: azu
description: "JavaScriptにおけるイテレータとジェネレータの基本概念と使い方について紹介します。ES2025で導入される新しいイテレータメソッドについても解説します。"
sponsors: []
---

# イテレータとジェネレータ {#iterator-generator}

この章では、JavaScriptにおけるイテレータ（Iterator）とジェネレータ（Generator）について紹介します。
イテレータは、データを順番に処理するための仕組みで、`for...of`ループの背後で動作している重要な概念です。
ジェネレータは、イテレータを簡単に作成するための仕組みです。

また、ES2025で導入される新しいイテレータメソッドについても解説し、宣言的なデータ処理の方法を紹介します。

## はじめに {#introduction}

JavaScriptでデータを処理する場合、多くの場面で配列を使用します。
しかし、すべてのデータを配列として扱うのが常に最適とは限りません。
特に、大量のデータや無限に続くデータを扱う場合、メモリ効率や処理効率の観点から配列で扱うと問題となることがあります。

### 配列とイテレータの違い {#array-vs-iterator}

たとえば、1から5000までの数値を処理する場合を考えてみましょう。
配列を使う場合、まずすべての数値をメモリに格納してから処理を開始します。
つまり5000個の要素をもつ配列が必要となります。

{{book.console}}
[import, title="配列を使った場合"](./examples/basic/array-vs-iterator.example.js)

一方、イテレータを使う場合は、必要になったタイミングで値を生成します。
そのため、最初から5000個の要素をメモリに格納する必要はなく、必要な分だけを生成して処理できます。
これを**遅延評価**（lazy evaluation）と呼びます。

次のコードでは、イテレータを使った例を示しています。
（`function*`の詳しい使い方は、後のセクションで説明します）

{{book.console}}
[import, title="イテレータを使った場合"](./examples/basic/iterator.example.js)

#### 遅延評価とは {#lazy-evaluation-concept}

遅延評価とは、値が実際に要求されるまで計算を遅らせる仕組みです。
配列の場合は「先行評価（eager evaluation）」で、すべての値を即座に計算してメモリに保存します。
一方、イテレータは「遅延評価（lazy evaluation）」で、`next`メソッドを呼び出したタイミングで初めて値を計算します。

{{book.console}}
```js
// 配列（先行評価）：すべての値を事前に計算
const numbers = [1, 2, 3];
console.log(numbers[0]); // => 1
console.log(numbers[1]); // => 2
console.log(numbers[2]); // => 3

// イテレータ（遅延評価）: 値は必要な時に計算
function* numberGenerator() {
    yield 1; // 初めてnext()が呼ばれた時に評価される
    yield 2; // 次のnext()が呼ばれた時に評価される
    yield 3; // さらに次のnext()が呼ばれた時に評価される
}
const iterator = numberGenerator();
console.log(iterator.next().value); // => 1
console.log(iterator.next().value); // => 2
console.log(iterator.next().value); // => 3
```

この必要なタイミング処理を行うという点は、無限に続くデータや非常に大きなデータセットを扱う場合において重要になります。

## IterableプロトコルとIteratorプロトコル {#iterable-and-iterator}

JavaScriptにおけるイテレーション（反復処理）は、**Iterableプロトコル**と**Iteratorプロトコル**という2つのプロトコルによって定義されています。

これらのプロトコルは、`for...of`ループの背後で動作する仕組みを定義しています。

### Iterableプロトコル {#iterable-protocol}

Iterableプロトコルは、オブジェクトが反復可能であることを示すプロトコルです。
オブジェクトがIterableになるためには、`Symbol.iterator`というメソッドを持つ必要があります。

`Symbol.iterator`は、JavaScriptの組み込みSymbolの1つで、オブジェクトがIterableであることを示す特殊なキーです。

```js
const iterableObject = {
    [Symbol.iterator]() {
        // Iteratorオブジェクトを返す
        return {
            // Iterator プロトコルを実装
        };
    }
};
```

### Iteratorプロトコル {#iterator-protocol}

Iteratorプロトコルは、値のシーケンスを生成する方法を定義します。
Iteratorオブジェクトは、`next`メソッドを持つ必要があります。

`next`メソッドは、次の形式のオブジェクトを返します。

<!-- doctest:disable -->
```js
// nextメソッドの戻り値の形式
const result = iterator.next();
console.log(result.value); // 現在のIteratorが生成する値
console.log(result.done);  // 反復が完了したかどうか（true: 完了、false: 継続）
```

### Iterable Iterator {#iterable-iterator}

Iterableプロトコルは反復可能なオブジェクトという定義で、Iteratorプロトコルはその反復処理に利用する`next`メソッドを持つオブジェクトという定義となります。
この2つはよく似ているのでややこしいですが、IterableかつIteratorの両方のプロトコルを実装することが一般的です。
そのため、IterableとIteratorは常にセットで考えることができます。

どのような実装になるかというと、`[Symbol.iterator]`メソッドと`next`メソッドを持つオブジェクトとなります。
次のコードでは、Iterableプロトコルである`[Symbol.iterator]`メソッドと、Iteratorプロトコルである`next`メソッドを持つオブジェクトの定義しています。
`[Symbol.iterator]`メソッドは、`this`で自分自身(`iterableObject`)を返すことで、IterableかつIteratorの両方のプロトコルを実装しています。

```js
const iterableObject = {
    // Iteratorプロトコルを実装
    next() {
        // { value: 次の値, done: false } または { value: undefined, done: true } を返す
    },
    // Iterableプロトコルを実装
    [Symbol.iterator]() {
        return this; // 自分自身を返す
    }
};
// Iteratorを取得
const iterator = iterableObject[Symbol.iterator]();
// IteratorもIterable（自分自身を返す）
console.log(iterator === iterator[Symbol.iterator]()); // => true
```

このように、IterableとIteratorの両方のプロトコルを実装するオブジェクトのことを**Iterable Iterator**と呼びます。
IterableとIteratorはほとんどセットで扱われるため、単純にイテレータと呼ばれるオブジェクトはIterable Iteratorであることが多いです。

### シンプルなIterable Iteratorの実装 {#simple-iterable-iterator}

具体例として、指定された範囲の数値を生成するIterable Iteratorを実装してみましょう。
次の`createRange`関数は、指定された`start`から`end`までの数値を順番に生成するIterable Iteratorを返します。
Iteratorの`next`メソッドを呼び出すことで、`start`から`end`までの数値を1つずつ取得できます。

{{book.console}}
[import, title="指定範囲の数値を生成するIterable/Iteratorの実装"](./examples/protocol/create-range.example.js)

### for...ofループでIterable Iteratorを使用する {#for-of-usage}

Iteratorの`next`メソッドを直接呼び出すことで、値を1つずつ取得できますが、通常は`for...of`ループを使ってIterable Iteratorを反復処理します。
`for...of`ループは、Iterable Iteratorの`[Symbol.iterator]`メソッドを呼び出し取得したIteratorの`next`メソッドを自動的に繰り返し呼び出します。
つまり、先ほどの手動で`[Symbol.iterator]`メソッドを呼び出して、`next`メソッドを繰り返し呼び出す処理を自動的に行います。

{{book.console}}
[import, title="for...ofループとIterator Iterableを反復処理"](./examples/protocol/manual-iteration.example.js)

Iterable Iteratorを扱うときは、基本的には`for...of`ループを使用します。
そのため、`[Symbol.iterator]`メソッドや`next`メソッドを直接呼び出すケースはあまりありません。

## 組み込みIterableオブジェクト {#built-in-iterables}

JavaScriptには、IterableプロトコルとIteratorプロトコルを実装したビルトインオブジェクトが多数存在します。
これらのビルトインオブジェクトはIterable Iteratorであるため、`for...of`ループで反復処理が可能です。

いくつかの代表的なIterable Iteratorであるビルトインオブジェクトを紹介します。

### 配列（Array） {#array-iterable}

配列はもっとも基本的なIterable Iteratorで、各要素を順番に反復できます。

{{book.console}}
```js
const fruits = ["apple", "banana", "orange"];

// for...of ループで配列を反復
for (const fruit of fruits) {
    console.log(fruit); // "apple", "banana", "orange"
}
```

### 文字列（String） {#string-iterable}

文字列もIterable Iteratorであり、各文字を順番に反復できます。
このときの文字は、Code Pointごとに反復されます。

{{book.console}}
```js
const text = "Hello";

// 文字列の各文字を反復
for (const char of text) {
    console.log(char); // "H", "e", "l", "l", "o"
}
```

### Map {#map-iterable}

MapオブジェクトもIterable Iteratorで、キーと値のペアを順番に反復できます。

{{book.console}}
```js
const userMap = new Map([
    ["name", "Alice"],
    ["age", 25],
    ["city", "Tokyo"]
]);

// Mapのエントリ（キーと値のペア）を反復
for (const [key, value] of userMap) {
    console.log(key + ": " + value); // "name: Alice", "age: 25", "city: Tokyo"
}
```

### Set {#set-iterable}

SetオブジェクトもIterable Iteratorで、Setの重複のない値を順番に反復できます。

{{book.console}}
```js
const uniqueNumbers = new Set([1, 2, 3, 2, 1]);

// Setの要素を反復（重複は除去されている）
for (const num of uniqueNumbers) {
    console.log(num); // 1, 2, 3
}
```

## ジェネレータ関数 {#generator-functions}

今まではIterable Iteratorを手動で実装してきましたが、JavaScriptには**ジェネレータ関数**というIterable Iteratorを定義するための構文があります。

ジェネレータ関数は、`function*`キーワードを使って定義し、`yield`式を使って値を生成します。

```js
function* generatorFunction() {
    yield value1; // 最初の値を生成
    yield value2; // 次の値を生成
    // ...
    return value3; // 最後の値を生成
}
```

値を返しているように見える点で`yield`式は、関数の`return`文と似ています。
一方で、ジェネレータ関数では`next`メソッドが呼ばれるたびに、`yield`式の位置で関数の実行が一時停止し、その右辺の値を返します。
この`yield`式の特性は、通常の関数とは異なるので具体的なコードで確認してみましょう。

次のコードでは、`function*`キーワードで`simpleGenerator`というジェネレータ関数を定義しています。
`simpleGenerator`関数は、`yield`式を使って1, 2, 3の値を順番に生成します。
`simpleGenerator`関数で作成したジェネレータオブジェクトの`next`メソッドを呼び出すことで、次の`yield`まで関数の実行が進み、その値を取得できます。

{{book.console}}
```js
// ジェネレータ関数の定義
function* simpleGenerator() {
    yield 1; // 1度目のnext()が呼ばれたときに、ここまで実行され1を返す
    yield 2; // 2度目のnext()が呼ばれたときに、ここまで実行され2を返す
    yield 3; // 3度目のnext()が呼ばれたときに。ここまで実行され3を返す
    return;  // 4度目のnext()が呼ばれたときに。ここまで実行されdone: trueを返し終了する
}

// ジェネレータオブジェクトを取得
const generator = simpleGenerator();

// Iteratorとして使用
console.log(generator.next()); // => { value: 1, done: false }
console.log(generator.next()); // => { value: 2, done: false }
console.log(generator.next()); // => { value: 3, done: false }
console.log(generator.next()); // => { value: undefined, done: true }
```

ジェネレータ関数から返されるGeneratorオブジェクトは、IterableプロトコルとIteratorプロトコルの両方を実装しています。
つまり、GeneratorオブジェクトもIterable Iteratorであり、`for...of`ループで反復処理が可能です。

{{book.console}}
```js
function* simpleGenerator() {
    yield 1;
    yield 2;
    yield 3;
    return; 
}

// for...ofループでIterable Iteratorとして利用
for (const num of simpleGenerator()) {
    console.log(num); // 1, 2, 3
}
```

ジェネレータ関数も、通常の関数と同じく`return`文までくるとそこで関数は終了します。
先ほどの例では、明示的に`return`文を使って終了していますが、通常の関数と同じくジェネレータ関数でも`return`文は省略可能です。
`return`文を省略した場合、最後の`yield`まで実行され、`{ value: undefined, done: true }`が返されます。

{{book.console}}
```js
function* simpleGenerator() {
    yield 1;
    yield 2;
    yield 3;
    // return を省略すると { value: undefined, done: true } が返される
}

for (const num of simpleGenerator()) {
    console.log(num); // 1, 2, 3
}
```


### ジェネレータ関数の利点 {#generator-benefits}

ジェネレータ関数では、通常の関数とは異なり、関数の途中で実行を一時停止し、値を返すことができます。
`yield`式は、関数の実行を一時停止し、値を呼び出し元に返します。
`next`メソッドが呼ばれると、次の`yield`まで関数の実行が再開されます。

そのため、次のように`next`メソッドを呼ぶまで、ジェネレータ関数の処理は実行されません。

{{book.console}}
```js
function* createGenerator() {
    console.log("a. 開始");
    yield 1;
    console.log("b. 中間");
    yield 2;
    console.log("c. 終了");
    return 3;
}

const generator = createGenerator();
// ここではまだ何も出力されない
console.log(generator.next()); // "a. 開始" が出力され、{ value: 1, done: false }が返される
console.log(generator.next()); // "b. 中間" が出力され、{ value: 2, done: false }が返される
console.log(generator.next()); // "c. 終了" が出力され、{ value: 3, done: true }が返される
```

IteratorプロトコルとIterableプロトコルを手で書いて同様の実装も可能ですが、かなり複雑になります。
ジェネレータ関数と`yield`式を使うことで、イテレータの実装が簡潔に書けるようになるのがジェネレータ関数の大きな利点です。

### 無限シーケンスの生成 {#infinite-sequence-generation}

ジェネレータを使うと、無限に連続した数値を出力し続けるIteable Iteratorを簡単に定義できます。
次のコードでは、無限シーケンスを生成するジェネレータを定義しています。
このジェネレータは、`next`メソッドが呼ばれるたびに次の数値を返すため、必要な分だけ数値を生成できます。

{{book.console}}
```js
// 無限に数値を生成するジェネレータ
function* infiniteNumbers() {
    let num = 1;
    while (true) {
        yield num++;
    }
}

// 必要な分だけ取得
const numbers = infiniteNumbers();
console.log(numbers.next().value); // => 1
console.log(numbers.next().value); // => 2
console.log(numbers.next().value); // => 3
// for...of で使用する場合は注意が必要（無限ループになる）
```

## [ES2025] イテレータのメソッド {#iterator-methods}

ES2025では、Iteratorプロトタイプに新しいメソッドが追加されました。
これらのメソッドにより、配列のメソッドと同様の操作をIteratorに対して行えるようになり、
宣言的なデータ処理が可能になります。

多くのメソッドは[配列のメソッド][配列のメソッド]と同じ名前で同じ動作をします。
ただし、配列では全要素を一度に処理するのに対し、Iteratorでは必要になったタイミングで各要素を処理します。

### Iterator.from メソッド {#iterator-from}

`Iterator.from`メソッドは、Iterableオブジェクトからイテレータを作成します。

{{book.console}}
<!-- doctest:meta:{ "ECMAScript": "2025" } -->
```js
// 配列からIteratorを作成
const iterator = Iterator.from([1, 2, 3, 4, 5]);

console.log(iterator.next()); // => { value: 1, done: false }
console.log(iterator.next()); // => { value: 2, done: false }
```

### take メソッド {#iterator-take}

`take`メソッドは、指定した数の要素のみを取得するIteratorを返します。
これは配列にはないIterator特有のメソッドで、無限シーケンスから有限の要素を取得する際に特に有用です。

{{book.console}}
<!-- doctest:meta:{ "ECMAScript": "2025" } -->
```js
// 無限に数値を生成するジェネレータ
function* infiniteNumbers() {
    let num = 1;
    while (true) {
        yield num++;
    }
}

// 最初の5つだけを取得
const first5 = Iterator.from(infiniteNumbers()).take(5);

for (const value of first5) {
    console.log(value); // 1, 2, 3, 4, 5
}
```

配列でこのような無限シーケンスを表現するとメモリなどの色々な制限があるため、かなり難しいです。
一方で、イテレータとジェネレータを使った場合は簡単に表現でき、`take`メソッドを使うことで最初の5つといったように必要な分だけを取得できます。

### map メソッド {#iterator-map}

`map`メソッドは、各要素を変換した新しいIteratorを返します。
このメソッドは、[配列の`map`メソッド][配列のmap]と同じように動作しますが、遅延評価される点が異なります。

{{book.console}}
<!-- doctest:meta:{ "ECMAScript": "2025" } -->
```js
const numbers = Iterator.from([1, 2, 3, 4, 5]);

// 各数値を2倍にする
const doubled = numbers.map(x => x * 2);

for (const value of doubled) {
    console.log(value); // 2, 4, 6, 8, 10
}
```

### filter メソッド {#iterator-filter}

`filter`メソッドは、条件に合致する要素のみを含む新しいIteratorを返します。
このメソッドは、[配列の`filter`メソッド][配列のfilter]と同じように動作しますが、遅延評価される点が異なります。

{{book.console}}
<!-- doctest:meta:{ "ECMAScript": "2025" } -->
```js
const numbers = Iterator.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// 偶数のみを抽出
const evenNumbers = numbers.filter(x => x % 2 === 0);

for (const value of evenNumbers) {
    console.log(value); // 2, 4, 6, 8, 10
}
```

### drop メソッド {#iterator-drop}

`drop`メソッドは、指定した数の要素をスキップした新しいIteratorを返します。

{{book.console}}
<!-- doctest:meta:{ "ECMAScript": "2025" } -->
```js
const numbers = Iterator.from([1, 2, 3, 4, 5]);

// 最初の2つの要素をスキップ
const skipped = numbers.drop(2);

for (const value of skipped) {
    console.log(value); // 3, 4, 5
}
```

### flatMap メソッド {#iterator-flatmap}

`flatMap`メソッドは、各要素をマップしてから結果を平坦化します。
このメソッドは、[配列の`flatMap`メソッド][配列のflatMap]と同じように動作しますが、遅延評価される点が異なります。

{{book.console}}
<!-- doctest:meta:{ "ECMAScript": "2025" } -->
```js
const words = Iterator.from(["hi", "fi"]);

// 各文字列を文字の配列に分割して平坦化
const chars = words.flatMap(word => word.split(""));

for (const char of chars) {
    console.log(char); // h, i, f, i
}
```

### reduce メソッド {#iterator-reduce}

`reduce`メソッドは、すべての要素を単一の値に集約します。
このメソッドは、[配列の`reduce`メソッド][配列のreduce]と同じように動作します。

{{book.console}}
<!-- doctest:meta:{ "ECMAScript": "2025" } -->
```js
const numbers = Iterator.from([1, 2, 3, 4, 5]);

// 合計を計算
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // => 15

// 文字列を連結
const words = Iterator.from(["Hello", "Iterator", "Methods"]);
const sentence = words.reduce((acc, word) => acc + " " + word);
console.log(sentence); // => "Hello Iterator Methods"
```

### toArray メソッド {#iterator-toarray}

`toArray`メソッドは、Iteratorのすべての要素を配列として取得します。

{{book.console}}
<!-- doctest:meta:{ "ECMAScript": "2025" } -->
```js
const iterator = Iterator.from([1, 2, 3]).map(x => x * 2);
const array = iterator.toArray();

console.log(array); // => [2, 4, 6]
```

### メソッドチェーンによる宣言的な処理 {#method-chaining}

Iteratorメソッドをチェーンすることで、複雑なデータ処理を宣言的に記述できます。

次のコードでは、10個の数値から偶数をフィルタリングし、最初の3つを取得して2乗する処理を行っています。

{{book.console}}
<!-- doctest:meta:{ "ECMAScript": "2025" } -->
```js
// 複数のメソッドを組み合わせた例
const result = Iterator.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .filter(x => x % 2 === 0)  // 偶数をフィルタリング
    .take(3)                   // 最初の3つを取得
    .map(x => x * x)           // 2乗する
    .toArray();                // 配列に変換

console.log(result); // => [4, 16, 36]
```

配列では、`filter`メソッドが配列のすべての要素に対して適用されます。
そのため、必ず`1`から`10`までのすべての要素を処理します。

一方で、Iteratorでは必要な分だけを処理します。
そのため、`filter`メソッドは、最初の3つの偶数(`2,4,6`)を見つけた時点で処理を終了します。

要素数が少ない場合は、配列とIteratorの違いはあまり感じられませんが、要素数が多い場合や無限シーケンスを扱う場合は、Iteratorの方が効率的に処理できます。

<!-- doctest:enable -->

## まとめ {#conclusion}

この章では、JavaScriptにおけるイテレータとジェネレータについて紹介しました。

- **Iterableプロトコル**と**Iteratorプロトコル**は、JavaScriptのイテレーション（反復処理）の基盤となる仕組みです
- `for...of`ループは、これらのプロトコルを利用してさまざまなオブジェクトを反復処理できます
- **ジェネレータ関数**（`function*`と`yield`）を使うことで、Iteratorを簡潔に作成できます
- **ES2025の新しいイテレータメソッド**により、配列と同様の宣言的なデータ処理が可能になりました
- イテレータの**遅延評価**特性により、大量のデータや無限シーケンスを効率的に処理できます

イテレータとジェネレータを理解することで、より効率的で表現力豊かなJavaScriptコードを書けるようになります。
特に、大量のデータを扱うアプリケーションやストリーミング処理において、これらの概念は重要な役割を果たします。

[配列]: ../array/README.md
[配列のmap]: ../array/README.md#array-map
[配列のfilter]: ../array/README.md#array-filter
[配列のflatMap]: ../array/README.md#array-flatmap
[配列のreduce]: ../array/README.md#array-reduce
[配列のメソッド]: ../array/README.md#array-prototype-method
