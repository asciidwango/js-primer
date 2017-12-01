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

この章では、さまざまな条件下で変わる`this`の挙動と関数やArrow Functionとの関係を見ていきます。

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
JavaScriptにおいて関数は関数オブジェクトというオブジェクトの一種です。
そのため、関数をオブジェクトのプロパティの値とした場合に、関数宣言などと:それを区別するためにメソッドと呼びます。

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
`this`の参照先は「関数を呼び出す際にその関数が所属するオブジェクト」となります。
つまり、`arguments`などのように呼び出し方によって変わる値ということには注意が必要です。

まずは、関数宣言や関数式の場合を見ていきます。

次の例では、関数宣言と関数式で定義した関数の中の`this`をコンソールに出力しています。
このとき、`fn1`と`fn2`はメソッドではないのでどのオブジェクトにも所属していません。
つまり、この関数の中での`this`が参照するオブジェクトはないため、`this`は`undefined`となります。[^var]

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

このように`this`は所属する別のプロパティを、`オブジェクト名.プロパティ名`の代わりに`this.プロパティ名`で参照できます。

### 実行時に所属するオブジェクト

`this`は関数やメソッドを実行するときに、その関数やメソッドが所属しているオブジェクトを参照することがわかりました。
しかし、JavaScriptでは関数やメソッドが所属するオブジェクトは変わることがあります。
なぜなら、関数やメソッドは関数オブジェクトという値の一種であるため、別の変数やオブジェクトのプロパティへ代入できるためです。

そのため、メソッドとして定義した関数も別の変数に代入して呼び出されることがあります。
この場合には、メソッドとして定義した関数であっても、実行時には別の変数に代入されているため所属するオブジェクトが変わっています。
これは`this`も実行時に変わるということを意味しています。

具体的に、`this`が実行時に変わる例を見ていましょう。
次の例では、`person.sayName`メソッドを変数`say`に代入してから実行しています。
このときの`say`関数(`sayName`メソッドを参照)はどのオブジェクトにも所属していません。
そのため、`this`は`undefined`となり、`undefined.fullName`は参照できずに例外をなげます。

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
// `person.sayName`を`say`変数に代入する
const say = person.sayName;
// 代入したメソッドを関数として呼ぶ
// この`say`関数はどのオブジェクトにも所属していない
// `this`はundefinedとなるため例外を投げる
say(); // => TypeError: Cannot read property 'fullName' of undefined
```

先ほどの`say`関数がなぜ例外を投げてしまうかを詳しく見てみましょう。

`person.sayName`メソッドを呼び出すとき、`sayName`メソッドは`person`オブジェクトに所属するため、`this`は`person`オブジェクトになります。
一方、`const say = person.sayName;`することで、`say`変数は`person.sayName`メソッドの実体である関数を参照しています。
つまり、`say`変数（関数）はメソッドではなくただの関数です。どのオブジェクトにも所属しない関数の`this`は`undefined`となります。
そのため、`say`変数（関数）の中では`this`は`undefined`となり、例外を投げています。

```js
// const sayName = person.sayName; は次のようなイメージ
const say = function() {
    return this.fullName;
};
// `this`は`undefined`となるため例外をなげる
say(); // => TypeError: Cannot read property 'fullName' of undefined
```

このように、Arrow Function以外の関数において、`this`は定義した時ではなく実行した時に決定されます。
そのため、関数に`this`を含んでいる場合、その関数は意図した呼ばれ方がされないと間違った結果が発生するという問題があります。

### call、apply、bindメソッド {#call-apply-bind}

関数やメソッドの`this`を明示的に指定して関数を実行する方法もあります。
`Function`（関数オブジェクト）には`call`、`apply`、`bind`といった明示的に`this`を指定して関数を実行するメソッドが用意されています。

`call`メソッドは第一引数に`this`としたい値を指定し、残りの引数は呼び出す関数の引数となります。

<!-- doctest:disable -->
```js
関数.call(thisの値, ...関数の引数);
```

次の例では`this`に`person`オブジェクトを指定した状態で`say`関数を呼び出しています。
`call`メソッドの第二引数で指定した値が、`say`関数の仮引数`message`に入ります。

```js
function say(message) {
    return `${message} ${this.fullName}！`; 
}
const person = {
    fullName: "Brendan Eich"
};
// `this`を`person`にして`say`関数を呼びだす
say.call(person, "こんにちは"); // => "こんにちは Brendan Eich！"
// `say`関数をそのまま呼び出すと`this`は`undefined`となるため例外が発生
say("こんにちは"); // => TypeError: Cannot read property 'fullName' of undefined
```

<!-- 
この例を見ると`this`が暗黙的に関数に渡される仮引数の一種のよう扱われていることが分かります。
他の言語とは異なり`this`が実行時に決定されることは、定義時点ではthisの値が何になるのか分からないという曖昧さがあることを示しています。
-->

`apply`メソッドは第一引数に`this`としたい値を指定し、第二引数に関数の引数を配列として渡します。

<!-- doctest:disable -->
```js
関数.apply(thisの値, [関数の引数1, 関数の引数2]);
```

次の例では`this`に`person`オブジェクトを指定した状態で`say`関数を呼び出しています。
`apply`メソッドの第二引数で指定した配列は、自動的に展開されて`say`関数の仮引数`message`に入ります。

```js
function say(message) {
    return `${message} ${this.fullName}！`; 
}
const person = {
    fullName: "Brendan Eich"
};
// `this`を`person`にして`say`関数を呼びだす
// callとは異なり引数を配列として渡す
say.apply(person, ["こんにちは"]); // => "こんにちは Brendan Eich！"
// `say`関数をそのまま呼び出すと`this`は`undefined`となるため例外が発生
say("こんにちは"); // => TypeError: Cannot read property 'fullName' of undefined
```

`call`メソッドと`apply`メソッドの違いは、関数の引数への値の渡し方が異なるだけです。
また、どちらのメソッドも`this`の値が不要な場合は`null`を渡すのが一般的です。

```js
function add(x, y) {
    return x + y;
}
// `this`は不要なのでnullを渡す
add.apply(null, [1, 2]); // => 3
add.call(null, 1, 2); // => 3
```

最後に`bind`メソッドは、名前のとおり`this`の値を束縛（bind）した新しい関数を作成します。

<!-- doctest:disable -->
```js
関数.bind(thisの値, ...関数の引数); // => thisや引数がbindされた関数
```

次の例では`this`を`person`オブジェクトに束縛した`say`関数の関数を作っています。
`bind`メソッドの第二引数以降に値を渡すことで、束縛した関数の引数も束縛できます。

```js
function say(message) {
    return `${message} ${this.fullName}！`; 
}
const person = {
    fullName: "Brendan Eich"
};
// `this`を`person`に束縛した`say`関数をラップした関数を作る
const sayPerson = say.bind(person, "こんにちは");
sayPerson(); // => "こんにちは Brendan Eich！"
```

この`bind`メソッドをただの関数で表現すると次のように書けます。
`bind`は`this`や引数を束縛した関数を作るメソッドということがわかります。

```js
function say(message) {
    return `${message} ${this.fullName}！`; 
}
const person = {
    fullName: "Brendan Eich"
};
// `this`を`person`に束縛した`say`関数をラップした関数を作る
//  say.bind(person, "こんにちは"); は次のようなラップ関数を作る
const sayPerson = () => {
    return say.call(person, "こんにちは");
};
sayPerson(); // => "こんにちは Brendan Eich！"
```

`call`、`apply`、`bind`を使うことで`this`を明示的に指定した状態で関数を呼び出せます。
しかし、毎回関数を呼び出すたびにこれらのメソッドを使うのは、関数を呼び出すための関数が必要になってしまい手間がかかります。

そのため、ES2015ではこの`this`の問題を解決するためにArrow Functionという新しい関数の定義方法を導入しました。
そもそも`call`、`apply`、`bind`が必要となるのは「`this`が呼び出し方によって暗黙的に決まる」という問題があるためです。

## thisとArrow Function

Arrow Functionで定義された関数やメソッドにおける`this`は常に静的に決定されます。
`this`の参照先は「Arrow Functionを除いて、自身より外側のスコープにあるもっとも近い関数またはグローバルオブジェクト」となります。

[関数とスコープ][]の章において、スコープは[静的スコープ][]という性質をもつため、実行する前にスコープ間の関係が決まるという話をしました。
つまりArrow Functionにおける`this`は、スコープと同じように実行する前にどの値を参照するかが分かるということです。

具体的な例を元にArrow Functionにおける`this`の動きを見ていきましょう。

まずは、関数式のArrow Functionを見ていきます。

次の例では、関数式で定義したArrow Functionの中の`this`をコンソールに出力しています。
このとき、`fn`の外側には関数はないため、「自身より外側のスコープにあるもっとも近い関数」の条件にあてはまるものはありません。
つまり、このArrow Functionの中での`this`が参照するのはグローバルオブジェクトとなります。
グローバルオブジェクトは、実行環境において異なるものが定義されていますが、ブラウザなら`window`、Node.jsなら`global`となります。

```js
// Arrow Functionで定義した関数
const fn = () => {
    // この関数の外側には関数は存在しない
    // `this`はグローバルオブジェクトを参照する
    return this; 
};
// グローバルオブジェクトはブラウザならwindow、Node.jsならglobal
fn(); // => global
```

次の例のように、Arrow Functionを包むように別の関数が定義されている場合はどうでしょうか。

```js
function outer() {
    // Arrow Functionで定義した関数を返す
    return () => {
        // この関数の外側には`outer`関数が存在する
        // `this`は`outer`関数を参照する
        return this; 
    };
}
// `outer`関数の返り値はArrow Functionて定義された関数
const innerArrowFunction = outer();
console.log(innerArrowFunction()); // => outer;
```


Arrow Functionのときは`[[ThisMode]]`が`lexical`となる。

- <https://tc39.github.io/ecma262/#sec-arrow-function-definitions-runtime-semantics-evaluation>
- `Arrow` のときは、Functionが作られる
- `Arrow` のときは`[[ThisMode]]`が`lexical`となる
- <https://tc39.github.io/ecma262/#sec-functioninitialize>

[^var]: `var`で宣言された関数式は特別でグローバルオブジェクトのプロパティとして扱われるため例外的に`this`はグローバルオブジェクトを示します。
[^strict mode]: この書籍では注釈がないコードはstrict modeとして扱います。strict modeではない場合`this`はグローバルオブジェクトを返します。
[関数と宣言]: ../function-declaration/README.md
[関数とスコープ]: ../function-scope/README.md
[静的スコープ]: ../function-scope/README.md#static-scope
[動的スコープ]: ../function-scope/README.md#dynamic-scope
