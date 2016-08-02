---
author: azu
description: 関数の宣言方法とメソッドについて
---
# 関数の宣言

## 関数宣言

JavaScriptでは、関数宣言を`function`キーワードを使うことで行えます。
`function`から始まる文は関数宣言と呼び、次のように関数を宣言をすることができます。

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

宣言した関数は、`関数名()`とすることで関数を呼び出すことができます。

次の例では、引数で受け取った値を2倍にして返す関数を定義しています。
関数は`return 返り値;`で返り値を返すことができます。

```js
function multiple(num) {
    return num * 2;
}

multiple(10); // => 20
```

値を返していない又は空の`return;`と書いた場合、関数は`undefined`を返します。

```js
function noop() {
}

noop(); // => undefined;
```

### 可変長引数

関数には引数の数が固定ではなく、可変長である場合があります。
たとえば、`Math.max(...args)`は引数を何個でも受け取り、受け取った引数の値が最大のものを返します。

```js
var max = Math.max(1, 5, 10, 20);
console.log(max); // => 20
```

可変長引数を実現するためには、引数がすべて入った`arguments`か、Rest parametersを使用します。

#### `arguments`

`arguments`は関数の中でのみ参照できる特殊な変数です。
`arguments`は関数に渡された値が入った**配列ライク**なオブジェクトです。

```js
function myFunc() {
    console.log(arguments[0]); // => "a" 
    console.log(arguments[1]); // => "b" 
    console.log(arguments[2]); // => "c" 
}
myFunc("a", "b", "c");
```

**配列ライク**なオブジェクトは、配列のように添字で値へアクセスできます。
しかし、`Array`を継承していないため、`Array`のメソッドが使えない特殊なオブジェクトです。

### Rest parameters

Rest parametersは仮引数名の前に`...`をつけます。
この仮引数には、関数に渡された値の配列が入ります。

```js
function myFunc(...args) {
    console.log(args[0]); // => "a" 
    console.log(args[1]); // => "b" 
    console.log(args[2]); // => "c" 
}
myFunc("a", "b", "c");
```

`arguments`は後述するArrow Functionでは利用できないことや、**配列ライク**なオブジェクトであるため扱いにくいです。
そのため、可変長引数が必要な場合はRest parametersでの実装を検討した方がよいでしょう。

## ファーストクラスファンクション

JavaScriptにおいて、関数も値の1つです。
関数が値として扱えることを第一級関数やファーストクラスファンクションと呼びます。

関数を値として定義する場合には、関数式とArrow Functionの2つの方法があります。

### 関数式

関数式は関数宣言とよく似た書き方をします。
次のように関数を値として変数へ代入することができます。

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

関数式は名前を持たない関数を定義することができます。
このような関数を**匿名関数**（または無名関数）と呼びます。

<!-- textlint-enable prh -->

JavaScriptでは関数を引数に渡す。

また、関数式には名前を付けることもできます。
この場合、関数式に付けた名前は関数の外からは呼ぶことができません。
一方関数の中からは呼ぶことができるため、再帰呼び出しなどに利用されます。

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

### [ES2015] Arrow Function
.
関数式にはもうひとつ種類があります。
Arrow Functionと呼ばれる `=>` を使うことで、匿名関数を定義することができます。
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
- `new`することができない（コンストラクタ関数ではない）
- `arguments`を持たない

たとえば、function式では値を返すコールバック関数を次のように書く必要があります。

```js
var array = [1, 2, 3];
var doubleArray = array.map(function(value) {
    return value * 2;
});
console.log(doubleArray); // => [2, 4, 6];
```

Arrow Functionでは処理が一行である場合に、`return`文を省略し暗黙的なreturnとすることができます。
また、仮引数が1つの場合は仮引数を囲むカッコを省略することもできます。

```js
var array = [1, 2, 3];
var doubleArray = array.map(value => value * 2);
console.log(doubleArray); // => [2, 4, 6];
```

function式に比べて、できることとできないことがはっきりしています。
これにより、人による解釈や実装の違いが発生しにくくなり、コード行数も短くなります。

また、最も大きな違いとしてArrow Functionでは`this`がレキシカルに決定します。
詳しくはn章で解説しますが、function式の`this`は呼び出し元によって値が異なるため、
`this`が含まれるコードはとても読みにくいものとなっていました。
Arrow Functionでは、`this`がコードを見たまま値が決まるため読みやすいコードとなります。

- [ ] TODO: スコープの話を書く

function式を使うケースの殆どはArrow Functionで実装できます。
そのため、function式よりもArrow Functionを使い実装した方がよいといえるでしょう。

