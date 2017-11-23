---
author: azu
---

# 関数とthis

この章では`this`という特殊な動作をするキーワードについてを見ていきます。
`this`は基本的には関数やメソッドの中で利用します。`this`は読み取り専用の変数のようなもので、その参照先は暗黙的で実行時に決定されます。
つまり、`this`を利用する場所、関数の宣言方法、関数の呼び出し方によって異なる値となります。

`this`の参照先は主に次の条件によって変わります。

- グローバルにおける`this`
- Arrow Function以外の関数における`this`
- Arrow Functionにおける`this`
- `Function#call`、`Function#apply`での関数呼び出しにおける`this`

もっとも直感的ではない挙動をするのは「Arrow Function以外の関数における`this`」です。
この「Arrow Function以外の関数」にはクラスも含まれます。
なぜならJavaScriptにおいてのクラスはES2015で後から追加された概念で、クラスは関数の一種と考えられるためです。
そのため、「Arrow Function以外の関数における`this`」で学んだ`this`の挙動はそのままクラスにおいても適応されます。

この章では、さまざまな条件下で変わる`this`の挙動を関数を中心に見ていきます。

## グローバルにおける`this` {#global-this}

グローバル、つまりプログラム直下における`this`は`undefined`となります。[^strict mode]
そのため、グローバルにおいて`this`を使う理由はありません。

```js
console.log(this); // => undefined
```

## 関数における`this`

**関数**を定義する方法として、`function`キーワード関数宣言、式として関数式、Arrow Functionなどがあります。
`this`が参照先を決めるルールはArrow Functionとそれ以外の方法で異なります。

そのため、まずは関数定義の種類についてを振り返ってから、それぞれの`this`について見ていきます。

### 関数の種類

[関数と宣言][]で詳しくは紹介していますが、関数の定義方法と呼び出し方について改めて振り返ってみましょう。
**関数**を定義する場合には、次の3つの方法を利用します。

```js
// `function`キーワードから始める関数宣言
function fn1() {}
// `function`を式として扱う関数式
const fn2 = function() {};
// Arrow Functionを使った関数式
const fn3 = () => {};
```

<!-- textlint-disable no-js-function-paren -->

それぞれ定義した関数は`関数名()`と書くことで呼び出すことができます。

<!-- textlint-enable no-js-function-paren -->

```js
// 関数宣言
function fn() {}
// 関数呼び出し
fn();
```

### メソッドの種類

JavaScriptではオブジェクトのプロパティが関数である場合にそれを**メソッド**と呼びます。
メソッドを定義する場合には、オブジェクトのプロパティに関数式を定義するだけです。

```js
const object = {
    // `function`キーワードを使ったメソッド
    method1: function() {
    },
    // Arrow Functionを使ったメソッド
    method2: () => {
    }
};
```

これに加えてメソッドには短縮記法があります。
オブジェクトリテラルの中で `メソッド名(){ /*メソッドの処理*/ }`と書くことで、メソッドを定義できます。

```js
const object = {
    // メソッドの短縮記法で定義したメソッド
    method() {
    }
};
```

<!-- textlint-disable no-js-function-paren -->

これらのメソッドは、`オブジェクト名.メソッド名()`と書くことで呼び出すことができます。

<!-- textlint-enable no-js-function-paren -->

```js
const object = {
    // メソッドの定義
    method() {
    }
};
// メソッド呼び出し
object.method();
```

関数定義とメソッドの定義についてまとめると、次のような種類があります。

| 名前                                        | 関数 | メソッド |
| ------------------------------------------- | ---- | ---- |
| 関数宣言(`function fn(){}`)                 | ✔    | x    |
| 関数式(`const fn = function(){}`)           | ✔    | ✔    |
| Arrow Function(`const fn = () => {}`)       | ✔    | ✔    |
| メソッドの短縮記法(`const obj = { method(){} }`) | x    | ✔    |

そして、最初に書いたように`this`の挙動はArrow Functionとそれ以外で異なります。
そのため、まずはArrow Function以外の関数やメソッドにおける`this`を見ていき、
その後、Arrow Functionにおける`this`を見ていきます。

| 名前                                        | 関数 | メソッド | this                       |
| ------------------------------------------- | ---- | ---- | -------------------------- |
| 関数宣言(`function fn(){}`)                 | ✔    | x    | 所属するオブジェクト               |
| 関数式(`const fn = function(){}`)           | ✔    | ✔    | 所属するオブジェクト               |
| Arrow Function(`const fn = () => {}`)       | ✔    | ✔    | ひとつ外側の関数またはグローバルオブジェクト |
| メソッドの短縮記法(`const obj = { method(){} }`) | x    | ✔    | 所属するオブジェクト               |

## Arrow Function以外の関数における`this` {#function-without-arrow-function-this}

Arrow Function以外の関数における`this`は実行時に決まる値となります。
`this`が参照先は「関数を呼び出す際にその関数が所属するオブジェクト」となります。
つまり、`arguments`などのように呼び出し方によって変わる値ということには注意が必要です。

まずは、メソッドではない関数の場合を見ていきます。

次の例では、関数宣言と関数式で定義した関数の中の`this`をコンソールに出力しています。
このとき、`fn1`と`fn2`はメソッドではないのでどのオブジェクトにも所属していません。
つまり、この関数の中での`this`が参照するオブジェクトはないため、`this`は`undefined`となります。

```js
// `fn1`はどのオブジェクトのプロパティではない
function fn1() {
    return this; 
}
// `fn2`はどのオブジェクトのプロパティではない
const fn2 = function() {
    return this;
};
// 関数の中の`this`が参照する値をそれぞれ返す
fn1(); // => undefined
fn2(); // => undefined
```

次に、メソッドの場合を見ていきます。
メソッドの場合は、そのメソッドは何かしらのオブジェクトに所属しています。
なぜなら、JavaScriptではオブジェクトのプロパティとして指定される関数のことをメソッドと呼ぶためです。

次の例では`method1`と`method2`は`object`というオブジェクトに所属しています。
そのため、それぞれのメソッドの中では`this`は`object`を参照します。

```js
const object = {
    // 関数式をプロパティの値にしたメソッド
    method1: function() {
        return this;
    },
    // 短縮記法で定義したメソッド
    method2() {
        return this;
    }
};
// メソッドを呼び出し、それぞれの`this`は所属するオブジェクト(`object`)となる
object.method1(); // => object
object.method2(); // => object
```

これを利用すれば、メソッドの中から同じオブジェクトに所属する別のプロパティを`this`で参照できます。

```js
const person = {
    fullName: "Brendan Eich",
    sayName: function() {
        // `person.fullName`と書いているのと同じ
        return this.fullName;
    }
};
// `person.fullName`を出力する
console.log(person.sayName()); // => "Brendan Eich"
```

#### 実行時に所属するオブジェクト

`this`は関数やメソッドを実行するときに、その関数やメソッドが所属しているオブジェクトを参照することがわかりました。
JavaScriptでは、関数やメソッドはただの関数オブジェクトという値の一種に過ぎません。
そのため、メソッドとして定義した関数も別の変数に代入して呼び出されることがあります。
これは、メソッドとして定義した関数であっても、所属するオブジェクトは後から変わることがあるということです。

具体的に、実行時に所属するオブジェクトが変わる、つまり`this`が変わる例を見ていましょう。
次の例では、`person.sayName`メソッドを変数`sayName`に代入してから実行しています。
このときの`this`は`undefined`となってしまうため、`undefined.fullName`は参照できずに例外をなげます。

```js
const person = {
    fullName: "Brendan Eich",
    sayName: function() {
        // `this`は呼び出し元によってことなる
        return this.fullName;
    }
};
// `sayName`メソッドは`person`オブジェクトに所属する
// `this`は`person`オブジェクトとなる
person.sayName(); // => "Brendan Eich"
// `person.sayName`を別の変数に代入する
const say = person.sayName;
// 代入したメソッドを関数として呼ぶ
// この`say`関数はどのオブジェクトにも所属していない
// `this`はundefinedとなるため例外を投げる
say(); // => TypeError: Cannot read property 'fullName' of undefined
```

先ほどの`sayName`関数が何故例外を投げてしまうかを詳しく見てみましょう。

`person.sayName`メソッドを呼び出すとき、`sayName`メソッドは`person`オブジェクトに所属するため、`this`は`person`オブジェクトになります。
一方、`const say = person.sayName;`することで、`say`変数は`person.sayName`メソッドの実体である関数を参照しています。
つまり、`say`変数（関数）はメソッドではなくただの関数です。
そのため、`say`変数（関数）の中では`this`は`undefined`となるため、例外を投げてしまいます。

```js
// const sayName = person.sayName; は次のようなイメージ
const say = function(){
    return this.fullName;
}
// `this`は`undefined`となるため例外をなげる
say(); // => TypeError: Cannot read property 'fullName' of undefined
```

Arrow Function以外の関数においては、`this`は定義時ではなくあくまで実行時に決定されます。
通常、関数を呼び出すときに`this`は暗黙的に決定されますが、明示的に指定して関数を実行する方法もあります。
`Function`（関数オブジェクト）には`call`、`apply`、`bind`といった明示的に`this`を指定して関数を実行するメソッドが用意されています。

#### call、apply

#### bind

### thisとメソッド

メソッドにおける`this`は暗黙的に決まる値となります。
つまり、`arguments`のように呼び出し方によって`this`に入る値が変わります。
最初に述べたように`this`はArrow Functionとそれ以外の関数で分けられます。

### thisは動的

### thisの名前解決

### thisを使う理由

## call

## apply

## bind

## thisとArrow Function

Arrow Functionのときは`[[ThisMode]]`が`lexical`となる。

- <https://tc39.github.io/ecma262/#sec-arrow-function-definitions-runtime-semantics-evaluation>
- `Arrow` のときは、Functionが作られる
- `Arrow` のときは`[[ThisMode]]`が`lexical`となる
- <https://tc39.github.io/ecma262/#sec-functioninitialize>

[^strict mode]: この書籍では注釈がないコードはstrict modeとして扱います。strict modeではない場合`this`はグローバルオブジェクトを返します。
[関数と宣言]: ../function-declaration/README.md
[動的スコープ]: ../function-scope/README.md#dynamic-scope
