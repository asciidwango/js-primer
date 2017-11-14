---
author: azu
description: 関数の宣言方法とメソッドについて
---
# 関数と宣言

JavaScriptでは、処理をまとめる際に関数やメソッド、クラスを使います。
これらは関数オブジェクトと言われる関数として使えるオブジェクトの一種です。

関数オブジェクトは`()`を付けることで関数として呼び出すことができます。
またオブジェクトでもあるため、`{}`で定義したオブジェクトと同じ使い方もできます。

```js
// `fn`という名前の関数オブジェクトを定義する
function fn() {
}
// 関数オブジェクトにプロパティを追加できる
fn.property = "value";
```

しかし、関数に対してオブジェクトのようにプロパティを追加することは殆どしません。
このようなことがしたい場合は、関数に状態を持たせたいケースが殆どです。
これに対して、状態を扱うことが前提の**クラス**を使うことで分かりやすく管理できます。（詳しくはn章で解説します）

そのため、まずは関数オブジェクトではなく関数について見ていきましょう。

## 関数宣言

JavaScriptでは、関数宣言を`function`キーワードを使うことで行えます。
`function`から始まる文は関数宣言と呼び、次のように関数を宣言をできます。

<!-- doctest:disable -->
```js
// 関数定義
function 関数名(仮引数1, 仮引数2) {
    // 関数を呼び出された時の処理
    // ...
    return 関数が返す値;
}
// 関数呼び出し
関数名(引数1, 引数2);
```

関数は次の3つの要素から構成されています。

- 関数名 - 利用できる文字列は変数名と同じ
- 仮引数 - 引数と共に呼ばれた場合に値が入る変数。複数ある場合は`,`（カンマ）で区切る
- 関数の処理 - `{`と`}`で囲んだ関数の処理

<!-- textlint-disable no-js-function-paren -->

宣言した関数は、`関数名()`と書くことで呼び出すことができます。
関数を引数と共に呼ぶ際は、`関数名(引数1, 引数2)`とし、引数が複数ある場合は`,`（カンマ）で区切ります。

<!-- textlint-enable no-js-function-paren -->

次の例では、引数で受け取った値を2倍にして返す関数を定義しています。
関数は`return 返り値;`で返り値を返すことができます。

{{book.console}}
```js
function multiple(num) {
    return num * 2;
}

console.log(multiple(10)); // => 20
```

値を返していない又は空の`return;`と書いた場合、関数は`undefined`を返します。

{{book.console}}
```js
function noop() {
}

console.log(noop()); // => undefined;
```

### 可変長引数

関数には引数の数が固定ではなく、可変長である場合があります。
たとえば、`Math.max(...args)`は引数を何個でも受け取り、受け取った引数の中で最大の値を返します。

{{book.console}}
```js
const max = Math.max(1, 5, 10, 20);
console.log(max); // => 20
```

可変長引数を実現するためには、引数がすべて入った`arguments`か、Rest parametersを使用します。

#### `arguments`

`arguments`は関数の中でのみ参照できる特殊な変数です。
`arguments`は関数に渡された値が入った**Array-like**なオブジェクトです。

{{book.console}}
```js
function myFunc() {
    console.log(arguments[0]); // => "a" 
    console.log(arguments[1]); // => "b" 
    console.log(arguments[2]); // => "c" 
}
myFunc("a", "b", "c");
```

**Array-like**なオブジェクトは、配列のようにインデックスで要素へアクセスできます。
しかし、`Array`を継承していないため、`Array`のメソッドが使えない特殊なオブジェクトです。

### Rest parameters

Rest parametersは仮引数名の前に`...`をつけます。
この仮引数には、関数に渡された値の配列が入ります。

{{book.console}}
```js
function myFunc(...args) {
    console.log(args[0]); // => "a" 
    console.log(args[1]); // => "b" 
    console.log(args[2]); // => "c" 
}
myFunc("a", "b", "c");
```

`arguments`は後述するArrow Functionでは利用できないことや、**Array-like**なオブジェクトであるため扱いにくいです。
そのため、可変長引数が必要な場合はRest parametersでの実装を検討した方がよいでしょう。

## ファーストクラスファンクション

関数が値として扱えることをファーストクラスファンクション（第一級関数）と呼びます。
JavaScriptは他のオブジェクトと同じように関数を値として扱えるため、ファーストクラスファンクションの性質を持っています。

関数を値として定義する場合にも関数宣言と同じく`function`キーワードを利用します。
このとき、関数を式（代入する値）として扱うため関数式と呼び、関数宣言とは異なるルールがあります。
関数式には呼び名や書き方が幾つかあるためそれぞれの方法を見ていきます。

### 関数式 {#function-expression}

関数式とは、関数を値として変数へ代入している式のことを言います。
関数宣言は文でしたが、関数式では関数を文字列などと同じように値として扱っています。

```js
// 関数式
const 関数名 = function() {
    // 関数を呼び出した時の処理
    // ...
    return 関数の返す値;
};
```

関数式では`function`キーワードの右辺に書く関数名は省略できます。
なぜなら関数式では変数名が関数名となるためです。一方、関数宣言では`function`キーワードの右辺の関数名は省略できません。

```js
// 関数宣言では"関数名"は省略できない
function 関数名() {

}
// 関数式では変数名があるため"関数名"を省略できる
const 変数名かつ関数名 = function() {
};
```

<!-- textlint-disable prh -->

このように関数式では、名前を持たない関数を変数に代入できます。
このような名前を持たない関数を**匿名関数**（または無名関数）と呼びます。

<!-- textlint-enable prh -->

また、関数式でも関数に名前を付けることもできます。
この場合、関数式に付けた名前は関数の外からは呼ぶことができません。
一方、関数の中からは呼ぶことができるため、再帰呼び出しなどに利用されます。

{{book.console}}
```js
// innerFactは外からは見えない名前
const factorial = function innerFact(n) {
    if (n === 0) {
        return 1;
    }
    return n * innerFact(n - 1); // 再帰呼び出し
};
console.log(factorial(3)); // => 6
```

### [ES2015] Arrow Function {#arrow-function}

関数式にはもうひとつArrow Functionと呼ばれる書き方があります。
名前があらわすように `=>`（イコールと大なり記号） を使うことで、匿名関数を定義できます。
次のように、`function`キーワードを使った関数式とよく似た書き方をします。

```js
const 関数名 = () => {
    // 関数を呼び出した時の処理
    // ...
    return 関数の返す値;
};
```

Arrow Functionには書き方のいくつかパターンがありますが、`function`キーワードに比べて短く書けるようになっています。
また、Arrow Functionには省略記法があり、次の場合にはさらに短く書けます。

- 関数の仮引数が1つのときは`()`を省略できる
- 関数の処理が1つの式である場合に、ブロックと`return`文を省略できる
    - その式の評価結果を`return`の返り値とする

<!-- textlint-disable eslint -->

{{book.console}}
```js
// 仮引数の数と定義
const fnA =     () => { /* 仮引数がないとき*/ };
const fnB =    (x) => { /* 仮引数が1つのみのとき*/ };
const fnC =      x => { /* 仮引数が1つのみのときは()を省略可能*/ };
const fnD = (x, y) => { /* 仮引数が複数の時*/ };
// 値の返し方
// 次の２つの定義は同じ意味となる
const mulA =     x => { return x * x; } // ブロックの中でreturn
const mulB =     x => x * x;            // 1行のみの場合はreturnとブロックを省略できる
```

<!-- textlint-enable eslint -->

Arrow Functionについては次のような特徴があります。

- 名前を付けることができない（常に匿名関数）
- `this`がレキシカルに決定する（詳しくはn章で解説します)
- `function`キーワードに比べて短く書くことができる
- `new`できない（コンストラクタ関数ではない）
- `arguments`を持たない

たとえば、`function`キーワードの関数式では、値を返すコールバック関数を次のように書きます。
`Array#map`は、配列の値を順番にコールバック関数へ渡します。
コールバック関数が返した値を新しい配列にして返します。

{{book.console}}
```js
const array = [1, 2, 3];
// 1,2,3と順番に値が渡されコールバック関数（匿名関数）が処理する
const doubleArray = array.map(function(value) {
    return value * 2; // 返した値をまとめた配列ができる
});
console.log(doubleArray); // => [2, 4, 6];
```

Arrow Functionでは処理が1つの式だけである場合に、`return`文を省略し暗黙的にその式の評価結果を`return`の返り値とします。
また、Arrow Functionは仮引数が1つである場合は`()`を省略できます。
このような省略はコールバック関数を多用する場合にコードの見通しを良くします。

{{book.console}}
```js
const array = [1, 2, 3];
const doubleArray = array.map(value => value * 2);
console.log(doubleArray); // => [2, 4, 6];
```

Arrow Functionは`function`キーワードに比べて、できることとできないことがはっきりしています。
これにより、人による解釈や実装の違いが発生しにくくなり、コード行数も短くなります。
そのため、`function`キーワードよりもArrow Functionを使い実装した方がよいといえるでしょう。

また、もっとも大きな違いとしてArrow Functionでは`this`の参照先が静的に決定します。
`function`キーワードの関数における`this`は呼び出し元によって値が異なるため、`this`が含まれるコードはとても読みにくいものとなっていました。
Arrow Functionでは、`this`がコードを見たまま値が決まるため読みやすいコードとなります。
詳細はn章で解説しますが、この`this`の問題を解決できるためArrow Functionの利用を推奨しています。

### コールバック関数 {#callback}

関数はファーストクラスであるため、その場で作った匿名関数を関数の引数として渡すことができます。
引数として渡される関数のことを**コールバック関数**と呼びます。
一方、コールバック関数を引数として使う関数やメソッドのことを**高階関数**と呼びます。

```js
function 高階関数(コールバック関数) {
    コールバック関数();
}
```

たとえば、`Array#forEach`メソッドはコールバック関数を引数として受け取る高階関数です。
`Array#forEach`メソッドは、受け取ったコールバック関数を、配列の要素を順番に渡しながら処理します。

{{book.console}}
```js
const array = [1, 2, 3];
const output = (value) => {
    console.log(value);
};
array.forEach(output);
// 次のような実行しているのと同じ
// output(1); => 1
// output(2); => 2
// output(3); => 3
```

関数を定義して、その関数をコールバック関数として毎回渡すのは大変です。
そこで、関数はファーストクラスであることを利用して、コールバック関数となる関数式をその場で作って渡すことができます。

{{book.console}}
```js
const array = [1, 2, 3];
array.forEach((value) => {
    console.log(value);
});
```

JavaScriptを扱うブラウザやNode.jsでは、非同期処理がデフォルトとなっています。
高階関数側がコールバック関数を実行するタイミングを決めることができるため、
非同期処理ではコールバック関数がとてもよく利用されます。

そのため、JavaScriptではコールバック関数が重要な概念となっています。

## メソッド

メソッドとは、オブジェクトのプロパティである関数のことをいいます。
次のコードにおける`object`の`method`プロパティを**メソッド**といいます。

```js
const object = {
    method: () => {
    }
};
```

次のように空の`object`を宣言してから、`method`プロパティへ関数を代入しても同様です。

```js
const object = {};
object.method = () => {
};
```

<!-- textlint-disable no-js-function-paren -->

メソッドを呼び出す場合は、関数呼び出しと同様に`オブジェクト.メソッド名()`と書くことで呼び出せます。

<!-- textlint-enable no-js-function-paren -->

{{book.console}}
```js
const object = {
    method: () => {
        return "this is method";
    }
};
console.log(object.method()); // => "this is method"
```

### [ES2015] メソッドの短縮記法

先ほどの方法では、プロパティに関数を代入するという書き方になっていました。
ES2015からは、メソッドとしてプロパティを定義するための短縮した書き方が追加されています。

次のように、オブジェクトリテラルの中で `メソッド名(){ /*メソッドの処理*/ }` と書くことができます。

{{book.console}}
```js
const object = {
    method() {
        return "this is method";
    }
};
console.log(object.method()); // => "this is method"
```

この書き方はオブジェクトのメソッドだけではなく、クラスのメソッドと共通の書き方となっています。
そのため、メソッドを定義する場合は、できるだけこの短縮記法に統一した方がよいでしょう。

## まとめ

この章では、次のことについて学びました。

- 関数の宣言方法
- 関数を値として使う方法
- コールバック関数
- 関数式とArrow Function
- メソッドの定義方法

基本的な関数の定義や値としての関数について学びました。
JavaScriptでは、非同期処理を扱うことが多く、その場合にコールバック関数が使われます。

Arrow Functionを使うことで、コールバック関数を短く簡潔に書くことができます。

しかし、コールバック関数が多用されるとコードの動作フローを追うことが難しくなっていきます。
このような全体的なコントロールフローを管理する方法としてPromiseやGeneratorといったものがあります。
