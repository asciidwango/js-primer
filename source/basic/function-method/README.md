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

```js
function 関数名(仮引数1, 仮引数2) {
    // 関数を呼び出した時の処理
    // ...
    return 関数が返す値;
}
```

関数は次の3つの要素から構成されています。

- 関数名 - 利用できる文字列は変数名と同じ
- 仮引数 - 引数と共に呼ばれた場合に値が入る変数
- 関数の処理 - `{`と`}`で囲んだ関数の処理

<!-- textlint-disable no-js-function-paren -->

宣言した関数は、`関数名()`と書くことで呼び出すことができます。

<!-- textlint-enable no-js-function-paren -->

次の例では、引数で受け取った値を2倍にして返す関数を定義しています。
関数は`return 返り値;`で返り値を返すことができます。

{{book.console}}
```js
function multiple(num) {
    return num * 2;
}

multiple(10); // => 20
```

値を返していない又は空の`return;`と書いた場合、関数は`undefined`を返します。

{{book.console}}
```js
function noop() {
}

noop(); // => undefined;
```

### 可変長引数

関数には引数の数が固定ではなく、可変長である場合があります。
たとえば、`Math.max(...args)`は引数を何個でも受け取り、受け取った引数の中で最大の値を返します。

{{book.console}}
```js
var max = Math.max(1, 5, 10, 20);
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

JavaScriptにおいて、関数も値の1つです。
関数が値として扱えることを第一級関数やファーストクラスファンクションと呼びます。

関数を値として定義する場合には、関数式とArrow Functionの2つの方法があります。

### 関数式

関数式は関数宣言とよく似た書き方をします。
次のように関数を値として変数へ代入できます。

```js
const 関数名 = function() {
    // 関数を呼び出した時の処理
    // ...
    return 関数の返す値;
};
```

関数宣言と比べて見ると次のような違いが分かります。

- 関数式では`function 関数名`の関数名を省略できる

<!-- textlint-disable prh -->

関数式は名前を持たない関数を定義できます。
このような関数を**匿名関数**（または無名関数）と呼びます。

<!-- textlint-enable prh -->

JavaScriptでは関数を引数に渡す。

また、関数式には名前を付けることもできます。
この場合、関数式に付けた名前は関数の外からは呼ぶことができません。
一方関数の中からは呼ぶことができるため、再帰呼び出しなどに利用されます。

{{book.console}}
```js
// innerFactは外からは見えない名前
const factorial = function innerFact(n) {
    if (n === 0) {
        return 1;
    };
    return n * innerFact(n - 1); // 再帰呼び出し
};
console.log(factorial(3)); // => 6
```

### コールバック関数

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
var array = [1, 2, 3];
var output = function(value) {
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
var array = [1, 2, 3];
array.forEach(function(value) {
    console.log(value);
});
```

JavaScriptを扱うブラウザやNode.jsでは、非同期処理がデフォルトとなっています。
高階関数側がコールバック関数を実行するタイミングを決めることができるため、
非同期処理ではコールバック関数がとてもよく利用されます。

そのため、JavaScriptではコールバック関数が重要な概念となっています。

### [ES2015] Arrow Function
.
関数式にはもうひとつ種類があります。
Arrow Functionと呼ばれる `=>` を使うことで、匿名関数を定義できます。
次のように、関数式とよく似た書き方をします。

```js
const 関数名 = () => {
    // 関数を呼び出した時の処理
    // ...
    return 関数の返す値;
};
```

Arrow Functionについては次のような特徴があります。

- 名前を付けることができない（常に匿名関数）
- `this`がレキシカルに決定する（詳しくはn章で解説します)
- function式に比べて短く書くことができる
- `new`できない（コンストラクタ関数ではない）
- `arguments`を持たない

たとえば、function式では値を返すコールバック関数を次のように書く必要があります。
`Array#map`は、配列の値を順番にコールバック関数へ渡します。
コールバック関数が返した値を新しい配列にして返します。

{{book.console}}
```js
var array = [1, 2, 3];
// 1,2,3と順番に値が渡されコールバック関数（匿名関数）が処理する
var doubleArray = array.map(function(value) {
    return value * 2; // 返した値をまとめた配列ができる
});
console.log(doubleArray); // => [2, 4, 6];
```

Arrow Functionでは処理が一行である場合に、`return`文を省略し暗黙的なreturnとできます。
また、仮引数が1つの場合は仮引数を囲むカッコを省略することもできます。
そのため、function式に比べて短く書くことができ、このような省略はコールバック関数を多用する場合に有用です。

{{book.console}}
```js
var array = [1, 2, 3];
var doubleArray = array.map(value => value * 2);
console.log(doubleArray); // => [2, 4, 6];
```

function式に比べて、できることとできないことがはっきりしています。
これにより、人による解釈や実装の違いが発生しにくくなり、コード行数も短くなります。

また、もっとも大きな違いとしてArrow Functionでは`this`がレキシカルに決定します。
詳しくはn章で解説しますが、function式の`this`は呼び出し元によって値が異なるため、
`this`が含まれるコードはとても読みにくいものとなっていました。
Arrow Functionでは、`this`がコードを見たまま値が決まるため読みやすいコードとなります。

- [ ] TODO: スコープの話を書く

function式を使うケースの殆どはArrow Functionで実装できます。
そのため、function式よりもArrow Functionを使い実装した方がよいといえるでしょう。

## メソッド

メソッドとは、オブジェクトのプロパティである関数のことをいいます。
つまり、オブジェクトのプロパティの値として関数が代入されているものです。

```js
var object = {
    method: () => {
    }
};
// 次のように書いても同じ
var object = {};
object.method = () => {
};
```

<!-- textlint-disable no-js-function-paren -->

メソッドを呼び出す場合は、関数呼び出しと同様に`オブジェクト.メソッド名()`のように呼び出します。

<!-- textlint-enable no-js-function-paren -->

{{book.console}}
```js
var object = {
    method: () => {
        return "this is method";
    }
};
console.log(object.method()); // => "this is method"
```

### [ES2015] メソッドの短縮記法

先ほどの方法では、プロパティに関数を代入するという書き方になっていました。
ES2015からは、メソッドとしてプロパティを定義するという書き方が追加されています。

次のように、`メソッド名(){ /*メソッドの処理*/ }` と書くことができるようになっています。

{{book.console}}
```js
var object = {
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
