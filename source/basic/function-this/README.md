---
author: azu
---

# 関数とthis

この章では`this`という特殊な動作をするキーワードについてを見ていきます。
`this`は基本的には関数やメソッドの中で利用します。`this`は読み取り専用の変数のようなもので、その参照先は暗黙的で実行時に決定されます。
つまり、`this`を利用する場所、関数の宣言方法、関数の呼び出し方によって異なる値となります。

`this`の参照先は主に次の条件によって変わります。

- グローバルにおける`this`
    - 実行コンテキストが"Script"
    - 実行コンテキストが"Module"
- コンストラクタにおける`this`
- Arrow Function以外の関数における`this`
    - strict modeの有無
- Arrow Functionにおける`this`
- `Function#call`、`Function#apply`での関数呼び出しにおける`this`

もっとも直感的ではない挙動をするのは「Arrow Function以外の関数における`this`」です。
この「Arrow Function以外の関数」にはクラスも含まれます。
なぜならJavaScriptにおいてのクラスはES2015で後から追加された概念で、クラスは関数の一種と考えられるためです。
そのため、「Arrow Function以外の関数における`this`」で学んだ`this`の挙動はそのままクラスにおいても適応されます。

この章では、さまざまな条件下で変わる`this`の挙動と関数やArrow Functionとの関係を見ていきます。

## コード直下における`this`

最初に[JavaScriptとは][]の章において、JavaScriptには実行コンテキストとして"Script"と"Module"があるという話をしました。
コードのトップレベルにある`this`は、この実行コンテキストによって値が異なります。
実行コンテキストの違いは意識しにくい部分であり、コードのトップレベルにある`this`を使うことは混乱を生むことになります。
そのため、コードのトップレベルにおいては`this`を使うべきではありませんが、それぞれの実行コンテキストにおける動作を紹介します。

## スクリプトにおける`this` {#global-this}

実行コンテキストが"Script"である場合、そのコード直下に書かれた`this`はグローバルオブジェクトを参照します。
グローバルオブジェクトとは、実行環境において異なるものが定義されています。
ブラウザなら`window`オブジェクト、Node.jsなら`global`オブジェクトとなります。

ブラウザでは、`script`要素の`type`属性を指定してない場合は実行コンテキストが"Script"として実行されます。
この`script`要素の直下に書いた`this`はグローバルオブジェクトである`window`オブジェクトとなります。

```html
<script>
// 実行コンテキストは"Script"
console.log(this); // => window
</script>
```

## モジュールにおける`this` {#module-this}

実行コンテキストが"Module"である場合、そのコード直下に書かれた`this`は常に`undefined`となります。

ブラウザでは、`script`要素の`type="module"`属性がついた場合は実行コンテキストが"Module"として実行されます。
この`script`要素の直下に書いた`this`は`undefined`となります。

```html
<script type="module">
// 実行コンテキストは"Module"
console.log(this); // => undefined
</script>
```

このように、コード直下の`this`は実行コンテキストによって`undefined`となる場合があります。
単純にグローバルオブジェクトを参照したい場合は、`this`ではなく`window`などのグローバルオブジェクトを直接参照した方がよいです。

## 関数における`this`

**関数**を定義する方法として、`function`キーワードによる関数宣言と関数式、Arrow Functionなどがあります。
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
一般的にはメソッドも含めたものを**関数**といい、関数宣言などとプロパティである関数を区別する場合に**メソッド**と呼びます。

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

Arrow Function以外の関数（メソッドも含む)における`this`は実行時に決まる値となります。
言い方をかえると`this`は関数に渡される暗黙的な引数のようなもので、その渡される値は関数を実行する時に決まります。

次のコードは擬似的なものです。
関数の中に書かれた`this`は、関数の呼び出し元から暗黙的に渡される値を参照することになります。
このルールは関数やメソッドで共通した仕組みとなります。Arrow Functionで定義した関数やメソッドはこのルールとは別の仕組みとなります。

<!-- doctest:disable -->
```js
// 擬似的な`this`の値の仕組み
function fn(仮引数, 暗黙的渡されるthisの値) {
    console.log(this); // => 暗黙的渡されるthisの値
}
fn(引数, 暗黙的に渡すthisの値);
```

<!-- textlint-disable no-js-function-paren -->

関数における`this`の基本的な参照先（暗黙的に関数に渡す`this`の値）は「関数を呼び出したオブジェクト」となります。
たとえば、`fn()`という呼び出し方ならば、この`fn`関数を呼び出したオブジェクトはいないため、`this`は`undefiend`となります。
一方、`obj.method()`のような呼び出し方ならば、この`obj.method`メソッドは`obj`オブジェクトが呼び出したため、`this`は`obj`となります。

この「メソッドを呼び出したオブジェクト」のことベースオブジェクトと呼びます。
ベースオブジェクトとは「メソッドを呼ぶ際に、そのメソッドのドット演算子またはブラケット演算子のひとつ左にあるオブジェクト」のことを言います。
つまり、メソッドではない`fn()`のような関数呼び出しにはそもそもベースオブジェクトはありません。

<!-- textlint-enable no-js-function-paren -->

<!-- doctest:disable -->
```js
// `fn`関数はメソッドではないのでベースオブジェクトはない
fn();
// `obj.method`メソッドのベースオブジェクトは`obj`
obj.method();
// `obj1.obj2.method`メソッドのベースオブジェクトは`obj2`
// ドット演算子、ブラケット演算子どちらも結果は同じ
obj1.obj2.method();
obj1["obj2"]["method"]();
```

`this`は関数の定義ではなく呼び出し方で参照する値が異なります。これは、後述する「`this`が問題となるパターン」で詳しく紹介します。
つまり、Arrow Function以外の関数は関数の定義だけを見て、この関数内にかかれた`this`は何かということは決定できない点には注意が必要です。

### 関数宣言や関数式における`this` {#function-this}

まずは、関数宣言や関数式の場合を見ていきます。

次の例では、関数宣言と関数式で定義した関数の中の`this`をコンソールに出力しています。
このとき、`fn1`と`fn2`はメソッドではなくただの関数呼び出されいるため、ベースオブジェクトはありません。
つまり、この関数の中での`this`が参照するオブジェクトはないため、`this`は`undefined`となります。[^strict mode]

```js
function fn1() {
    return this;
}
const fn2 = function() {
    return this;
};
// 関数の中の`this`が参照する値は呼び出し方によって決まる
// `fn1`と`fn2`どちらもただの関数として呼び出している
// メソッドとして呼び出していないためベースオブジェクトはない
// ベースオブジェクトがない場合、`this`は`undefined`となる
fn1(); // => undefined
fn2(); // => undefined
```

これは、関数の中に関数を定義して呼び出す場合も同じです。

```js
function outer() {
    // `outer`関数のベースオブジェクトはない
    console.log(this); // => undefined
    function inner() {
        // `inner`関数のベースオブジェクトはない
        console.log(this); // => undefined
    }
    inner();
}
outer();
```


### メソッド呼び出しにおける`this` {#method-this}

次に、メソッドの場合を見ていきます。
メソッドの場合は、そのメソッドは何かしらのオブジェクトに所属しています。
なぜなら、JavaScriptではオブジェクトのプロパティとして指定される関数のことをメソッドと呼ぶためです。

次の例では`method1`と`method2`は`object`というオブジェクトのプロパティです。
それぞれをメソッド呼び出しにした場合、それぞれのメソッド内では`this`はベースオブジェクトである`object`を参照します。

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
// メソッド呼び出しの場合、それぞれの`this`はベースオブジェクト(`object`)を参照する
// メソッド呼び出しの`.`の左にあるオブジェクトがベースオブジェクト
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

このようにメソッドが所属するオブジェクトのプロパティを、`オブジェクト名.プロパティ名`の代わりに`this.プロパティ名`で参照できます。

オブジェクトは何重にもネストできます。
そのため、ネストしたオブジェクトのメソッドの場合の「ベースオブジェクト」についてを明確にしておきます。
ベースオブジェクトとは「メソッドを呼ぶ際に、そのメソッドのドット演算子またはブラケット演算子の左にあるオブジェクト」のことを言います。

<!-- doctest:disable -->
```js
obj1.obj2.obj3.method();
obj1["obj2"]["obj3"]["method"]();
// methodはobj3オブジェクトに所属
// ドット演算子、ブラケット演算子どちらも同じ
```

次のコードを見てみると、ネストしたオブジェクトにおいてメソッド内の`this`がベースオブジェクトである`obj3`を参照していることが分かります。
このときのベースオブジェクトはドットで繋いだ一番左の`obj1`ではなく、メソッドから見てひとつ左の`obj3`となります。

```js
const obj1 = {
    obj2: {
        obj3: {
            method() {
                return this;
            }
        }
    }
};
// `obj1.obj2.obj3.method`メソッドの`this`は`obj3`を参照
console.log(obj1.obj2.obj3.method()); // => obj1.obj2.obj3
```

## `this`が問題となるパターン {#this-problem}

`this`はその関数（メソッドも含む）呼び出しのベースオブジェクトを参照することがわかりました。
`this`は所属するオブジェクトを直接書く代わりとして利用できますが、一方`this`には色々な問題があります。

この問題の原因は`this`が関数の呼び出し時に、どの値を参照するかが決まるという性質に由来します。
この`this`の性質が問題となるパターンの代表的な2つの例とそれぞれの対策についてを見ていきます。


### `this`を含むメソッドを変数に代入した場合 {#assign-this-function}

JavaScriptでは関数やメソッドが所属するオブジェクトは変わることがあります。
なぜなら、関数やメソッドは関数オブジェクトという値の一種であるため、別の変数やオブジェクトのプロパティへ代入できるためです。
そのため、メソッドとして定義した関数も、別の変数に代入してただの関数として呼び出されることがあります。
この場合には、メソッドとして定義した関数であっても、実行時にはただの関数であるため所属するオブジェクトが変わっています。
これは`this`も関数の実行時に変わるということを意味しています。

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

この問題の対処方法としては大きく分けて2つあります。
ひとつはメソッドとして定義されている関数はメソッドとして呼ぶということです。
もうひとつは、`this`の値を指定して関数を呼べるメソッドで関数を実行する方法です。

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

このように`call`、`apply`、`bind`メソッドを使うことで`this`を明示的に指定した状態で関数を呼び出せます。
しかし、毎回関数を呼び出すたびにこれらのメソッドを使うのは、関数を呼び出すための関数が必要になってしまい手間がかかります。
そのため、基本的には「メソッドとして定義されている関数はメソッドとして呼ぶこと」でこの問題を回避するほうがよいでしょう。
その中で、どうしても`this`を固定したい場合には`call`、`apply`、`bind`メソッドを利用するのがよいです。

<!--
そのため、ES2015ではこの`this`の問題を解決するためにArrow Functionという新しい関数の定義方法を導入しました。
そもそも`call`、`apply`、`bind`が必要となるのは「`this`が呼び出し方によって暗黙的に決まる」という問題があるためです。
-->

### コールバック関数と`this`

JavaScriptでコールバック関数の中で`this`を参照することはよくあります。
なぜなら、JavaScriptが元々もつ関数には、`Array#map`メソッドなどの関数を引数として受け取る高階関数が多くあるためです。
このとき、コールバック関数はメソッドではなく関数として呼ばれてることに注目してください。

具体的に、コールバック関数における`this`が問題となっている例を見てみましょう。
次のコードでは`Array#map`メソッドのコールバック関数の中で、`Prefixer`オブジェクトを参照するつもりで`this`を参照しています。
しかし、このコールバック関数における`this`はグローバルオブジェクトを参照、`this.prefix`は`undefined`となっています。
なぜなら、グローバルオブジェクトには`prefix`というプロパティは存在しないため、プロパティが存在しない場合は`undefined`となります。

```js
const Prefixer = {
    prefix: "pre",
    /**
     * `strings`配列の各要素にprefixをつける
     */
    prefixArray(strings) {
        return strings.map(function(string) {
            // `this`がグローバルオブジェクトを示す
            // そのため`this.prefix`は`undefined`となる
            return this.prefix + "-" + string;
        });
    }
};
const prefixedStrings = Prefixer.prefixArray(["a", "b", "c"]);
console.log(prefixedStrings); // => ["undefined-a", "undefined-b", "undefined-c"]
```

そもそも、なぜ`this`はグローバルオブジェクトを参照するかを見ていきます。
コールバック関数としてその場で定義した匿名関数を渡していることに注目してください。
このコードは次のように一度`callback`変数に関数を代入したのと同じことになっています。

<!-- textlint-disable no-js-function-paren -->

このとき、1秒後に呼び出される`callback`関数は、`callback()`のように関数呼び出しされた場合と同じです。
つまり、`callback`変数を関数として呼び出すとき、この関数にはベースオブジェクトはありません。
そのため`callback`関数の`this`は`undefined`となります。

<!-- textlint-enable no-js-function-paren -->

```js
const Prefixer = {
    prefix: "pre",
    prefixArray(strings) {
        return strings.map(function(string) {
            // `this`がグローバルオブジェクトを示す
            // そのため`this.prefix`は`undefined`となる
            return this.prefix + "-" + string;
        });
    }
};
const prefixedStrings = Prefixer.prefixArray(["a", "b", "c"]);
console.log(prefixedStrings); // => ["undefined-a", "undefined-b", "undefined-c"]
```

この問題への対処法として広く知られているのは、`this`を別の変数に代入し、その`this`の参照先を保持するという方法です。
`this`は呼び出し元で変化し、その参照先は呼び出し元におけるベースオブジェクトです。
関数の中で関数を定義してそれを呼び出すとまた別の関数呼び出しとなるため`this`が代わってしまう問題がありました。
そのため、最初の関数呼び出しに置ける`this`の参照先を変数に保持しておいて、内側の関数からはその変数を参照することで`this`の値を維持できます。

もちろん`.call(this)`などと明示的に`this`を渡して関数を呼び出すこともできます。
実際に`this`を引数として渡せる仕組みを持っているメソッドなどもあります。
ただ、メソッドや関数によって使い方が異なるよりは単純に保持していた`this`を変数として参照することでこの問題を解決できています。

しかし、この解決方法は`this`が変わることを意識して書く必要があるため、いつのまにか`this`が変わっているということが起きやすいというのが問題です。
コールバック関数で`this`が代わってしまうのが色々と問題であるため、これを解決するためにArrow Functionが導入されました。

Arrow Functionで先ほどのコールバック関数を定義すると、何もせずにコールバック関数内の`this`がそのまま`person`オブジェクトを参照します。
Arrow Functionは暗黙的な`this`という変数を持っていません、そのため`this`を外側の関数(この場合は`delaySayName`)に探索します。
これにより、Arrow Functionにおいては`this`が実行時に変わることなく、外側の`this`をそのまま利用できています。

```js
const Prefixer = {
    prefix: "pre",
    prefixArray(strings) {
        return strings.map((string) => {
            // `this`は一つ外側の`prefixArray`関数がもつ`this`を参照する
            // そのため`this.prefix`は"pre"となる
            return this.prefix + "-" + string;
        });
    }
};
// この時、`prefixArray`のベースオブジェクトは`Prefixer`となる
// つまり、`prefixArray`メソッド内の`this`は`Prefixer`を参照する
const prefixedStrings = Prefixer.prefixArray(["a", "b", "c"]);
console.log(prefixedStrings); // => ["pre-a", "pre-b", "pre-c"]
```

詳しいArrow Function解説を見ていきます。

## thisとArrow Function

Arrow Functionで定義された関数やメソッドにおける`this`は常に静的に決定されます。
`this`の参照先は「Arrow Function自身の外側のスコープにあるもっとも近い関数の`this`の値」となります。

Arrow Functionとそれ以外の関数で大きく違うことは、Arrow Functionは`this`を暗黙的な引数として受け付けないということです。
そのため、Arrow Functionで定義した関数内での`this`は呼び出し方によって変わることがあります。

一方、Arrow Function内の`this`はどのように値を決めるのかというと、その仕組みはスコープチェーンとよく似ています。
Arrow Functionにおける`this`は関数に限定したスコープチェーンのような挙動をします。
スコープチェーンでは、同じスコープ内に同じ識別子の変数や関数がなければ、外側のスコープへ探索していくという仕組みについて学びました。
Arrow Function自身は`this`を持っていないため、常に外側の関数（スコープ）に定義されている`this`を参照しにいきます。
そして、スコープの性質として、スコープは静的に決まります。
つまり、スコープと同じような仕組みで動くArrow Function内の`this`は静的に決定されるということになります。

[関数とスコープ][]の章において、スコープは[静的スコープ][]という性質をもつため、実行する前にスコープ間の関係が決まるという話をしました。
つまりArrow Functionにおける`this`は、スコープと同じように実行する前にどの値を参照するかが分かるということです。

具体的な例を元にArrow Functionにおける`this`の動きを見ていきましょう。

まずは、関数式のArrow Functionを見ていきます。

次の例では、関数式で定義したArrow Functionの中の`this`をコンソールに出力しています。
このとき、`fn`の外側には関数はないため、「自身より外側のスコープにあるもっとも近い関数」の条件にあてはまるものはありません。
このArrow Functionの中での`this`が参照するのはグローバルオブジェクトとなります。

```js
// Arrow Functionで定義した関数
const fn = () => {
    // この関数の外側には関数は存在しない
    return this;
};
fn();
```

次の例のように、Arrow Functionを包むように別の関数が定義されている場合はどうでしょうか。

```js
"use strict";
function outer() {
    // Arrow Functionで定義した関数を返す
    return () => {
        // この関数の外側には`outer`関数が存在する
        // `outer`関数に`this`を書いた場合と同じ
        return this;
    };
}
// `outer`関数の返り値はArrow Functionにて定義された関数
const innerArrowFunction = outer();
console.log(innerArrowFunction()); // => undefined;
```

Arrow Functionは「自身の外側の関数スコープにおける`this`」となります。
つまり、先ほどのコードは次のように評価されたのと同じです。

```js
"use strict";
function outer() {
    // `outer`関数直下の`this`
    const that = this;
    // Arrow Functionで定義した関数を返す
    return () => {
        // Arrow Function自身は`this`を持たない
        // `outer`関数に`this`を書いた場合と同じ
        return that;
    };
}
// `outer()`と呼び出した時の`outer`関数直下の`this`は`undefined`
const innerArrowFunction = outer();
console.log(innerArrowFunction()); // => undefined;
```

### メソッドの中の関数

Arrow Functionがもっと活用できるパターンです。
この例は、`var that = this`のパターンで回避していました。
しかし、Arrow Functionでは単純に`this`と書くことで問題なくなります。
なぜならArrow Functionの中に書かれた`this`はArrow Functionの外側の関数に書かれた`this`と同じ扱いになるためです。
次の例では、Arrow Functionの中での`this`は`obj.show`の呼び出しもとである`obj`を示します。

```js
const obj = {
    show() {
        setTimeout(() => {
            this.count++;
        }, 100);
    }
};
```

### Arrow Functionにはcall,apply,bindが効かない

これは、Arrow Functionが`this`を持てないことを象徴する仕様です。
次のようにArrow Functionで定義した関数に対して`call`で`this`をしても、`this`の参照先が代わっていないことが分かります。
これは、`apply`や`bind`メソッドを使った場合も`this`の参照先が代わりません。

```js
const fn = () => {
    return this;
};
// Scriptコンテキストの場合、スクリプト直下のArrow Functionのthisはグローバルオブジェクト
console.log(fn()); // => global
// callで`{}`を参照させようとしても結果は変わらない
fn.call({}); // => global
```

最初に述べたように通常の関数は実行時にベースオブジェクトが暗黙的な引数のように`this`の値として渡されます。
一方、Arrow Functionの関数は実行時に`this`を受け取らずに、定義時のArrow Functionにおける`this`の参照先が静的に決定されます。


[^strict mode]: この書籍では注釈がないコードはstrict modeとして扱います。strict modeではない場合`this`はグローバルオブジェクトを参照します。
[JavaScriptとは]: ../introduction/README.md
[関数と宣言]: ../function-declaration/README.md
[関数とスコープ]: ../function-scope/README.md
[静的スコープ]: ../function-scope/README.md#static-scope
[動的スコープ]: ../function-scope/README.md#dynamic-scope
