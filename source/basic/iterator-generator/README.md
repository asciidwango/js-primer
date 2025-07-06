---
author: azu
description: "JavaScriptにおけるイテレータとジェネレータの基本概念と使い方について学習します。ES2025で導入される新しいイテレータメソッドについても解説します。"
sponsors: []
---

# イテレータとジェネレータ {#iterator-generator}

この章では、JavaScriptにおけるイテレータ（Iterator）とジェネレータ（Generator）について学習します。
イテレータは、データを順番に処理するための仕組みで、`for...of`ループの背後で動作している重要な概念です。
ジェネレータは、イテレータを簡単に作成するための仕組みです。

また、ES2025で導入される新しいイテレータメソッドについても解説し、宣言的なデータ処理の方法を学習します。

## はじめに {#introduction}

JavaScriptでデータを処理する場合、多くの場面で配列を使用します。
しかし、すべてのデータを配列として扱うのが常に最適とは限りません。
特に、大量のデータや無限に続くデータを扱う場合、メモリ効率や処理効率の観点から問題となることがあります。

### 配列とイテレータの違い {#array-vs-iterator}

たとえば、1から1万までの数値を処理する場合を考えてみましょう。
配列を使う場合、まずすべての数値をメモリに格納してから処理を開始します。

{{book.console}}
```js
// 配列を使った場合：すべての数値を一度にメモリに作成
const numbers = [];
for (let i = 1; i <= 5000; i++) {
    numbers.push(i);
}
console.log("配列のサイズ:", numbers.length); // => 5000

// すべてのデータがメモリに存在している
console.log("最初の5つ:", numbers.slice(0, 5)); // => [1, 2, 3, 4, 5]
```

一方、イテレータを使う場合は、必要になったタイミングで値を生成します。
これにより、メモリ使用量を削減できます。

{{book.console}}
```js
// イテレータを使った場合：必要な時に値を生成
function* numberGenerator() {
    for (let i = 1; i <= 5000; i++) {
        yield i; // 値を一つずつ生成
    }
}

const iterator = numberGenerator();
console.log("最初の値:", iterator.next().value); // => 1
console.log("次の値:", iterator.next().value); // => 2
// 必要な分だけメモリを使用
```

この違いは、特に無限に続くデータや非常に大きなデータセットを扱う場合において重要になります。

### イテレータの利点 {#iterator-benefits}

イテレータには次のような利点があります。

- メモリ効率： 必要な時に値を生成するため、大量のデータでもメモリ使用量を抑制できます
- 遅延評価： 実際に値が必要になるまで処理を遅延できます
- 無限データ： 無限に続くデータシーケンスを表現できます
- 処理の中断と再開： 処理を途中で止めて、後から続きを実行できます

次のセクションでは、イテレータとジェネレータの具体的な仕組みについて学習していきます。

## IterableプロトコルとIteratorプロトコル {#iterable-and-iterator}

JavaScriptにおけるイテレーション（反復処理）は、**Iterableプロトコル**と**Iteratorプロトコル**という2つのプロトコルによって定義されています。

これらのプロトコルは、`for...of`ループの背後で動作する仕組みを定義しています。

### Iterableプロトコル {#iterable-protocol}

Iterableプロトコルは、オブジェクトが反復可能であることを示すプロトコルです。
オブジェクトがIterableになるためには、`Symbol.iterator`というメソッドを持つ必要があります。

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

- `value`: 現在の値
- `done`: 反復が完了したかどうかを示すboolean値

### シンプルなIteratorの実装 {#simple-iterator-implementation}

具体例として、指定された範囲の数値を生成するRangeIteratorを実装してみましょう。

{{book.console}}
```js
// 範囲の数値を生成するIterable/Iteratorの実装
function createRange(start, end) {
    return {
        // Iterableプロトコル: Symbol.iteratorメソッドを実装
        [Symbol.iterator]() {
            let current = start;
            
            // Iteratorプロトコル: nextメソッドを持つオブジェクトを返す
            return {
                next() {
                    if (current <= end) {
                        return { value: current++, done: false };
                    } else {
                        return { value: undefined, done: true };
                    }
                }
            };
        }
    };
}

// 使用例
const range = createRange(1, 3);

// for...of ループで使用
for (const num of range) {
    console.log(num);
}
// => 1
// => 2
// => 3
```

### for...ofループの動作原理 {#how-for-of-works}

`for...of`ループは、内部的に次のような処理を行っています。

{{book.console}}
```js
const range = createRange(1, 3);

// for...of ループと同等の処理を手動で実装
const iterator = range[Symbol.iterator](); // Iteratorを取得

let result = iterator.next();
while (!result.done) {
    const value = result.value;
    console.log(value); // ループ内の処理
    result = iterator.next(); // 次の値を取得
}
// => 1
// => 2
// => 3
```

この仕組みにより、`for...of`ループは配列だけでなく、Iterableプロトコルを実装したすべてのオブジェクトで動作できます。

## 組み込みIterableオブジェクト {#built-in-iterables}

JavaScriptには、Iterableプロトコルを実装している組み込みオブジェクトが多数存在します。
これらのオブジェクトは、`for...of`ループで直接使用できます。

### 配列（Array） {#array-iterable}

配列はもっとも基本的なIterableオブジェクトです。

{{book.console}}
```js
const fruits = ["apple", "banana", "orange"];

// for...of ループで配列を反復
for (const fruit of fruits) {
    console.log(fruit);
}
// => "apple"
// => "banana"
// => "orange"

// 配列のIteratorを直接使用
const iterator = fruits[Symbol.iterator]();
console.log(iterator.next()); // => { value: "apple", done: false }
console.log(iterator.next()); // => { value: "banana", done: false }
```

### 文字列（String） {#string-iterable}

文字列もIterableオブジェクトで、各文字を順番に反復できます。

{{book.console}}
```js
const text = "Hello";

// 文字列の各文字を反復
for (const char of text) {
    console.log(char);
}
// => "H"
// => "e"
// => "l"
// => "l"
// => "o"

// Unicode文字も正しく処理される
const emoji = "👨‍👩‍👧‍👦";
for (const char of emoji) {
    console.log(char);
}
// => "👨‍👩‍👧‍👦"
```

### Map {#map-iterable}

MapオブジェクトはIterableで、キーと値のペアを順番に反復できます。

{{book.console}}
```js
const userMap = new Map([
    ["name", "Alice"],
    ["age", 25],
    ["city", "Tokyo"]
]);

// Mapのエントリ（キーと値のペア）を反復
for (const [key, value] of userMap) {
    console.log(key + ": " + value);
}
// => "name: Alice"
// => "age: 25"
// => "city: Tokyo"

// キーのみを反復
for (const key of userMap.keys()) {
    console.log(key);
}
// => "name"
// => "age"
// => "city"
```

### Set {#set-iterable}

SetオブジェクトもIterableで、要素を順番に反復できます。

{{book.console}}
```js
const uniqueNumbers = new Set([1, 2, 3, 2, 1]);

// Setの要素を反復（重複は除去される）
for (const num of uniqueNumbers) {
    console.log(num);
}
// => 1
// => 2
// => 3

console.log(uniqueNumbers.size); // => 3
```

### その他のIterableオブジェクト {#other-iterables}

次のオブジェクトもIterableプロトコルを実装しています。

- NodeList： `document.querySelectorAll`の結果
- Arguments： 関数の引数オブジェクト（`function`キーワードで定義された関数内）
- TypedArray： `Uint8Array`、`Int32Array`など

{{book.console}}
```js
// Arguments オブジェクトの例
function showArguments() {
    for (const arg of arguments) {
        console.log(arg);
    }
}

showArguments("a", "b", "c");
// => "a"
// => "b"
// => "c"
```

これらの組み込みIterableオブジェクトを理解することで、JavaScriptにおけるデータ処理の幅が大きく広がります。

## ジェネレータ関数 {#generator-functions}

前のセクションでIteratorを手動で実装しましたが、複雑なロジックを持つIteratorを作るのは煩雑になりがちです。
ジェネレータ関数は、Iteratorを簡単に作成するための仕組みです。

### ジェネレータ関数の基本 {#generator-basics}

ジェネレータ関数は、`function*`キーワードで定義し、`yield`式を使って値を生成します。

{{book.console}}
```js
// ジェネレータ関数の定義
function* simpleGenerator() {
    yield 1;
    yield 2;
    yield 3;
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

{{book.console}}
```js
function* countToThree() {
    yield 1;
    yield 2;
    yield 3;
}

// for...of ループで使用
for (const num of countToThree()) {
    console.log(num);
}
// => 1
// => 2
// => 3
```

### yield式と関数の実行 {#yield-and-execution}

`yield`式は、関数の実行を一時停止し、値を呼び出し元に返します。
`next`メソッドが呼ばれると、次の`yield`まで関数の実行が再開されます。

{{book.console}}
```js
function* executionDemo() {
    console.log("開始");
    yield "最初の値";
    console.log("中間処理");
    yield "2番目の値";
    console.log("終了");
    return "最終値";
}

const gen = executionDemo();

console.log("next()を呼ぶ前");
console.log(gen.next()); // "開始" が出力され、{ value: "最初の値", done: false }

console.log("2回目のnext()");
console.log(gen.next()); // "中間処理" が出力され、{ value: "2番目の値", done: false }

console.log("3回目のnext()");
console.log(gen.next()); // "終了" が出力され、{ value: "最終値", done: true }
```

### 実用的なジェネレータの例 {#practical-generator-examples}

#### 無限シーケンスの生成 {#infinite-sequence-generation}

ジェネレータを使うと、無限に続くシーケンスを効率的に表現できます。

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
// 後のセクションで学習するtake()メソッドなどで制限する
```

#### フィボナッチ数列の生成 {#fibonacci-sequence-generation}

{{book.console}}
```js
// フィボナッチ数列を生成するジェネレータ
function* fibonacci() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

// 最初の10個のフィボナッチ数を取得
const fib = fibonacci();
for (let i = 0; i < 10; i++) {
    console.log(fib.next().value);
}
// => 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
```

#### 配列の遅延処理 {#lazy-array-processing}

{{book.console}}
```js
// 配列を遅延評価で処理するジェネレータ
function* processLazy(array) {
    for (const item of array) {
        console.log(`処理中: ${item}`);
        yield item * 2; // 何らかの処理を施す
    }
}

const data = [1, 2, 3, 4, 5];
const processor = processLazy(data);

// 必要な時だけ処理が実行される
console.log("最初の結果:", processor.next().value); // "処理中: 1" と "最初の結果: 2"
console.log("2番目の結果:", processor.next().value); // "処理中: 2" と "2番目の結果: 4"
```

ジェネレータ関数により、複雑なIteratorを簡潔に記述できるようになります。
特に、状態を持つシーケンスや無限データの表現において、その威力を発揮します。

## [ES2025] イテレータのメソッド {#iterator-methods}

ES2025では、Iteratorプロトタイプに新しいメソッドが追加されました。
これらのメソッドにより、配列のメソッドと同様の操作をIteratorに対して行えるようになり、
宣言的なデータ処理が可能になります。

多くのメソッドは[配列のメソッド][配列のメソッド]と同じ名前で同じ動作をしますが、
Iteratorメソッドの重要な違いは**遅延評価**される点です。
配列では全要素を一度に処理しますが、Iteratorでは必要になったタイミングで各要素を処理します。

<!-- doctest:disable -->

### Iterator.from メソッド {#iterator-from}

`Iterator.from`メソッドは、Iterableオブジェクトからイテレータを作成します。

{{book.console}}
```js
// 配列からIteratorを作成
const iterator = Iterator.from([1, 2, 3, 4, 5]);

console.log(iterator.next()); // => { value: 1, done: false }
console.log(iterator.next()); // => { value: 2, done: false }
```

### map メソッド {#iterator-map}

`map`メソッドは、各要素を変換した新しいIteratorを返します。
このメソッドは、[配列の`map`メソッド][配列のmap]と同じように動作しますが、遅延評価される点が異なります。

{{book.console}}
```js
const numbers = Iterator.from([1, 2, 3, 4, 5]);

// 各数値を2倍にする
const doubled = numbers.map(x => x * 2);

for (const value of doubled) {
    console.log(value);
}
// => 2
// => 4
// => 6
// => 8
// => 10
```

### filter メソッド {#iterator-filter}

`filter`メソッドは、条件に合致する要素のみを含む新しいIteratorを返します。
このメソッドは、[配列の`filter`メソッド][配列のfilter]と同じように動作しますが、遅延評価される点が異なります。

{{book.console}}
```js
const numbers = Iterator.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// 偶数のみを抽出
const evenNumbers = numbers.filter(x => x % 2 === 0);

for (const value of evenNumbers) {
    console.log(value);
}
// => 2
// => 4
// => 6
// => 8
// => 10
```

### take メソッド {#iterator-take}

`take`メソッドは、指定した数の要素のみを取得するIteratorを返します。
無限Iteratorから有限の要素を取得する際に特に有用です。

{{book.console}}
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
    console.log(value);
}
// => 1
// => 2
// => 3
// => 4
// => 5
```

### drop メソッド {#iterator-drop}

`drop`メソッドは、指定した数の要素をスキップした新しいIteratorを返します。

{{book.console}}
```js
const numbers = Iterator.from([1, 2, 3, 4, 5]);

// 最初の2つの要素をスキップ
const skipped = numbers.drop(2);

for (const value of skipped) {
    console.log(value);
}
// => 3
// => 4
// => 5
```

### flatMap メソッド {#iterator-flatmap}

`flatMap`メソッドは、各要素をマップしてから結果を平坦化します。
このメソッドは、[配列の`flatMap`メソッド][配列のflatMap]と同じように動作しますが、遅延評価される点が異なります。

{{book.console}}
```js
const words = Iterator.from(["hello", "world"]);

// 各文字列を文字の配列に分割して平坦化
const chars = words.flatMap(word => word.split(""));

for (const char of chars) {
    console.log(char);
}
// => h
// => e
// => l
// => l
// => o
// => w
// => o
// => r
// => l
// => d
```

### reduce メソッド {#iterator-reduce}

`reduce`メソッドは、すべての要素を単一の値に集約します。
このメソッドは、[配列の`reduce`メソッド][配列のreduce]と同じように動作します。

{{book.console}}
```js
const numbers = Iterator.from([1, 2, 3, 4, 5]);

// 合計を計算
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // => 15

// 文字列を連結
const words = Iterator.from(["Hello", "Iterator", "Methods"]);
const sentence = words.reduce((acc, word) => acc + " " + word);
console.log(sentence); // => Hello Iterator Methods
```

### toArray メソッド {#iterator-toarray}

`toArray`メソッドは、Iteratorのすべての要素を配列として取得します。

{{book.console}}
```js
const iterator = Iterator.from([1, 2, 3]).map(x => x * 2);
const array = iterator.toArray();

console.log(array); // => [2, 4, 6]
```

### メソッドチェーンによる宣言的な処理 {#method-chaining}

これらのメソッドをチェーンすることで、複雑なデータ処理を宣言的に記述できます。

{{book.console}}
```js
// 複数のメソッドを組み合わせた例
const result = Iterator.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .filter(x => x % 2 === 0)  // 偶数をフィルタリング
    .map(x => x * x)           // 2乗する
    .take(3)                   // 最初の3つを取得
    .toArray();                // 配列に変換

console.log(result); // => [4, 16, 36]
```

### 遅延評価の利点 {#lazy-evaluation-benefits}

Iteratorのメソッドは遅延評価されるため、大量のデータや無限シーケンスに対しても効率的に動作します。

{{book.console}}
```js
function* largeDataSet() {
    for (let i = 1; i <= 1000000; i++) {
        console.log(`生成中: ${i}`); // この出力で遅延評価を確認
        yield i;
    }
}

// 実際に必要な要素だけが処理される
const result = Iterator.from(largeDataSet())
    .filter(x => x % 1000 === 0)  // 1000の倍数のみ
    .take(3)                      // 最初の3つだけ
    .toArray();

console.log(result); // => [1000, 2000, 3000]
// "生成中: ..." は3000までしか出力されない
```

これらのメソッドにより、Iteratorは配列と同等の表現力を持ちながら、メモリ効率や処理効率の面で優れた特性を維持できます。

<!-- doctest:enable -->

## まとめ {#conclusion}

この章では、JavaScriptにおけるイテレータとジェネレータについて学習しました。

- **Iterableプロトコル**と**Iteratorプロトコル**は、JavaScriptのイテレーション（反復処理）の基盤となる仕組みです
- `for...of`ループは、これらのプロトコルを利用してさまざまなオブジェクトを反復処理できます
- **ジェネレータ関数**（`function*`と`yield`）を使うことで、Iteratorを簡潔に作成できます
- **ES2025の新しいイテレータメソッド**により、配列と同様の宣言的なデータ処理が可能になりました
- イテレータの**遅延評価**特性により、大量のデータや無限シーケンスを効率的に処理できます

イテレータとジェネレータを理解することで、より効率的で表現力豊かなJavaScriptコードを書けるようになります。
特に、大量のデータを扱うアプリケーションやストリーミング処理において、これらの概念は重要な役割を果たします。

次のステップとして、非同期イテレータ（Async Iterator）や、実際のWebアプリケーションでのイテレータの活用例について学習することをお勧めします。

[配列]: ../array/README.md
[配列のmap]: ../array/README.md#array-map
[配列のfilter]: ../array/README.md#array-filter
[配列のflatMap]: ../array/README.md#array-flatmap
[配列のreduce]: ../array/README.md#array-reduce
[配列のメソッド]: ../array/README.md#array-prototype-method