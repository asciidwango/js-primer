---
author: azu
---

# クラス

「クラス」と一言にいってもさまざまであるため、ここでは**構造**、**動作**、**状態**を定義できるものを示すことにします。
また、この章では概念を示す場合は**クラス**と呼び、クラスに関する構文（記述するコード）のことを`class`構文と呼びます。

**クラス**とは、**動作**を持った**構造**を定義でき、その構造からインスタンスを作成し、そのインスタンスは**状態**をもてるものです。
とても抽象的なことに見えますが、これは今までオブジェクトや関数を使って表現してきたものにも見えます。
実際にJavaScriptではES2015より前までは`class`構文はなく、関数を使いクラスのようなものを表現して扱っていました。

ES2015で`class`構文が導入されましたが、この`class`構文で定義したクラスは一種の関数オブジェクトです。
`class`構文ではプロトタイプベースの継承の仕組みの上に関数でクラスを表現しています。
そのため、`class`構文はクラスを作るための関数定義や継承をパターン化した書き方といえます。[^糖衣構文]

JavaScriptでは関数で学んだことの多くはクラスでもそのまま適応されます。
また、関数の定義方法として関数宣言文と関数式があるように、クラスにもクラス宣言文とクラス式があります。
この章では、`class`構文でのクラスの定義や継承、クラスの性質について学んでいきます。

## クラスの定義 {#class-declaration}

クラスを定義するには`class`構文を使いますが、クラスの定義方法にはクラス宣言文とクラス式があります。

まずは、クラス宣言文によるクラスの定義方法を見ていきます。

クラス宣言文では`class`キーワードを使い、`class クラス名{ }`のようにクラスの**構造**を定義できます。
クラスは必ずコンストラクタを持ち、`constructor`という名前のメソッドとして定義します。
コンストラクタとは、そのクラスからインスタンスを作成する際にインスタンスに関する**状態**の初期化を行うメソッドです。

{{book.console}}
```js
class MyClass {
    constructor() {
        // コンストラクタ関数の処理
    }
}
```

もうひとつの定義方法であるクラス式は、クラスを値として定義する方法です。
クラス式ではクラス名を省略できます。これは関数式における匿名関数と同じです。

{{book.console}}
```js
const MyClass = class MyClass {
    constructor() {}
};

const AnnonymousClass = class {
    constructor() {}
};
```

コンストラクタ関数内で何も処理がない場合はコンストラクタの記述を省略できます。
省略した場合には自動的に空のコンストラクタが定義されるため、クラスにはコンストラクタが必ず存在します。

```js
class MyClassA {
    constructor() {
        // コンストラクタの処理が必要なら書く
    }
}
// コンストラクタの処理が不要な場合は省略できる
class MyClassB {

}
```

## クラスのインスタンス化 {#class-instance}

クラスは`new`演算子でインスタンスであるオブジェクトを作成できます。
`class`構文で定義したクラスからインスタンスを作成することを**インスタンス化**と呼びます。
あるインスタンスが指定したクラスから作成されたものかを判定するには`instanceof`演算子が利用できます。

{{book.console}}
```js
class MyClass {
}
// `MyClass`をインスタンス化する
const myClass = new MyClass();
// 毎回新しいインスタンス(オブジェクト)を作成する
const myClassAnother = new MyClass();
// それぞれのインスタンスは異なるオブジェクト
console.log(myClass === myClassAnother); // => false
// クラスのインスタンスかどうかは`instanceof`演算子で判定できる
console.log(myClass instanceof MyClass); // => true
console.log(myClassAnother instanceof MyClass); // => true
```

このままでは何もできない空のクラスなので、値を持ったクラスを定義してみましょう。

クラスではインスタンスの初期化処理をコンストラクタ関数で行います。
コンストラクタ関数は`new`演算子でインスタンス化されるときに暗黙的によばれ、
コンストラクタのなかでの`this`はこれから新しく作るインスタンスオブジェクトとなります。

次のコードでは`x`座標と`y`座標の値をもつ`Point`というクラスを定義しています。
コンストラクタ関数(`constructor`)の中でインスタンスオブジェクト（`this`）の`x`と`y`プロパティに値を代入して初期化しています。

{{book.console}}
```js
class Point {
    // コンストラクタ関数の仮引数として`x`と`y`を定義
    constructor(x, y) {
        // コンストラクタ関数における`this`はインスタンスを示すオブジェクト
        // インスタンスの`x`と`y`プロパティにそれぞれ値を設定する
        this.x = x;
        this.y = y;
    }
}
```

この`Point`クラスのインスタンスを作成するには`new`演算子を使います。
`new`演算子には関数呼び出しと同じように引数を渡すことができます。
`new`演算子の引数はクラスの`constructor`メソッド（コンストラクタ関数）の仮引数に渡されます。
そして、コンストラクタのなかではインスタンスオブジェクト(`this`）の初期化処理を行います。

{{book.console}}
```js
class Point {
    // 2. コンストラクタ関数の仮引数として`x`には`3`、`y`には`4`が渡る
    constructor(x, y) {
        // 3. インスタンス(`this`)の`x`と`y`プロパティにそれぞれ値を設定する
        this.x = x;
        this.y = y;
        // コンストラクタではreturn文は書かない
    }
}

// 1. コンストラクタを`new`演算子で引数とともに呼び出す
const point = new Point(3, 4);
// 4. `Point`のインスタンスである`point`の`x`と`y`プロパティには初期化された値が入る
console.log(point.x); // => 3
console.log(point.y); // => 4
```

このようにクラスからインスタンスを作成するには必ず`new`演算子を使います。

一方、クラスは通常の関数として呼ぶことができません。
これは、クラスのコンストラクタはインスタンス（`this`）の初期化する場所であり、通常の関数とは役割が異なるためです。

{{book.console}}
```js
class MyClass {
    construtor() { }
}
// クラスのコンストラクタ関数として呼び出すことはできない
MyClass(); // => TypeError: class constructors must be invoked with |new|
```

コンストラクタは初期化処理を書く場所であるため、`return`文で値を返すべきではありません。
JavaScriptでは、コンストラクタで任意のオブジェクトを返すことが可能ですが行うべきではありません。
なぜなら、コンストラクタは`new`演算子で呼び出び、その評価結果はクラスのインスタンスを期待するのが一般的であるためです。

{{book.console}}
```js
// 非推奨の例: コンストラクタで値を返すべきではない
class Point {
    constructor(x, y) {
        // `this`の代わりにただのオブジェクトを返せる
        return { x, y };
    }
}

// `new`演算子の結果はコンストラクタ関数が返したただのオブジェクト
const point = new Point(3, 4);
console.log(point); // => { x: 3, y: 4 }
// Pointクラスのインスタンスではない
console.log(point instanceof Point); // => false
```

### [Note] クラス名は大文字で始める {#class-name-start-upper-case}

JavaScriptでは慣習としてクラス名は大文字で始まる名前を付けます。
これは、変数名にキャメルケースを使う慣習があるのと同じで、名前自体には特別なルールがあるわけではありません。
クラス名を大文字にしておき、そのインスタンスは小文字で開始すれば、名前が被らないため合理的な理由で好まれています。

```js
class Thing {}
const thing = new Thing();
```

### [コラム] `class`構文と関数でのクラスの違い {#class-vs-function}

ES2015より前はこれらのクラスを`class`構文ではなく、関数で表現していました。
その表現方法は人によってさまざまで、これも`class`構文という統一した表現が導入された理由の1つです。

次のコードでは先ほどの`class`構文でのクラスを簡略化した関数での1つの実装例です。
この関数でのクラス表現は、継承の仕組みなどは省かれていますが、`class`構文とよく似ています。

{{book.console}}
```js
// コンストラクタ関数
const Point = function PointConstructor(x, y) {
    // インスタンスの初期化処理
    this.x = x;
    this.y = y;
};

// `new`演算子でコンストラクタ関数から新しいインスタンスを作成
const point = new Point(3, 4);
```

大きな違いとして、`class`構文で定義したクラスは関数と呼び出すことができません。
クラスは`new`演算子でインスタンス化して使うものなので、これはクラスの誤用を防ぐ仕様です。
一方、関数でのクラス表現はただの関数なので、当然関数として呼び出せます。

{{book.console}}
```js
// `class`構文でのクラス
class MyClass {
}
// 関数でのクラス表現
function MyClassLike() {
}
// 関数なので関数として呼び出せる
MyClassLike(); 
// クラスは関数として呼び出すと例外が発生する
MyClass(); // => TypeError: class constructors must be invoked with |new|
```

このように、`class`構文で定義したクラスは一種の関数ですが、そのクラスはクラス以外には利用できないようになっています。

## クラスのメソッドの定義 {#class-method-definition}

クラスの**動作**はメソッドによって定義できます。
`constructor`メソッドは初期化時に呼ばれる特殊なメソッドですが、`class`構文ではクラスに対して自由にメソッドを定義できます。
このクラスに定義したメソッドは各インスタンスがもつ動作となります。

次のように`class`構文ではクラスに対してメソッドを定義できます。
メソッドの中からクラスのインスタンスを参照するには、`construtor`メソッドと同じく`this`を使います。
このクラスのメソッドにおける`this`は「[関数とthis][]の章」で学んだメソッドと同じくベースオブジェクトを参照します。

<!-- doctest:disable -->
```js
class クラス {
    メソッド() {
        // ここでの`this`はベースオブジェクトを参照
    }
}

const インスタンス = new クラス();
// メソッド呼び出しのベースオブジェクト(`this`)は`インスタンス`となる
インスタンス.メソッド();
```

クラスのプロトタイプメソッド定義では、オブジェクトにおけるメソッドとは異なり`key : value`のように`:`区切りでメソッドを定義できないことに注意してください。
つまり、次のような書き方はSyntax Errorとなります。

<!-- textlint-disable -->
<!-- doctest:disable -->
```js
// クラスでは次のようにメソッドを定義できない
class クラス {
   // Syntax Error
   メソッド: () => {}
   // Syntax Error
   メソッド: function(){}
}
```
<!-- textlint-enable -->

このようにクラスに対して定義したメソッドは、クラスの各インスタンスから**共有されるメソッド**となります。
このインスタンス間で共有されるメソッドのことを**プロトタイプメソッド**と呼びます。
また、プロトタイプメソッドはインスタンスから呼び出せるメソッドであるため**インスタンスメソッド**とも呼ばれます。

この書籍では、プロトタイプメソッド（インスタンスメソッド)を`クラス#メソッド名`のように表記します。

次のコードでは、`Counter`クラスに`increment`メソッド（`Counter#increment`メソッド）を定義しています。
`Counter`クラスのインスタンスはそれぞれ別々の状態（`count`プロパティ）を持ちます。
一方、`increment`メソッドはプロトタイプメソッドとして定義されているため、各インスタンス間から参照先が同じとなります。

{{book.console}}
```js
class Counter {
    constructor() {
        this.count = 0;
    }
    // `increment`メソッドをクラスに定義する
    increment() {
        // `this`は`Counter`のインスタンスを参照する
        this.count++;
    }
}
const counterA = new Counter();
const counterB = new Counter();
// `counterA.increment()`のベースオブジェクトは`counterA`インスタンス
counterA.increment();
// 各インスタンスのもつプロパティ(状態)は異なる
console.log(counterA.count); // => 1;
console.log(counterB.count); // => 0
// 各インスタンスのメソッドは共有されている(同じ関数を参照している)
console.log(counterA.increment === counterB.increment); // => true
```

プロトタイプメソッドはクラスの継承の仕組みとも関連するため後ほど詳細に解説します。

### クラスのインスタンスに対してメソッドを定義する {#class-instance-method}

`class`構文でのメソッド定義はプロトタイプメソッドとなり、インスタンス間で共有されます。

一方、クラスのインスタンスに対して直接メソッドを定義することも可能です。
これは、コンストラクタ関数内でインスタンスに対してメソッドを定義するだけです。

次の例では`Counter`クラスのコンストラクタ関数で、インスタンスに`increment`メソッドを定義しています。
コンストラクタ関数内でインスタンス(`this`)に対してメソッドを定義しています。
コンストラクタで毎回同じ挙動の関数（オブジェクト）を新しく定義しているため、各インスタンスからのメソッドの参照先も異なります。

{{book.console}}
```js
class Counter {
    constructor() {
        this.count = 0;
        this.increment = () => {
            // `this`は`constructor`メソッドにおける`this`を参照する
            this.count++;
        };
    }
}
const counterA = new Counter();
const counterB = new Counter();
counterA.increment();
// 各インスタンスのもつプロパティ(状態)は異なる
console.log(counterA.count); // => 1;
console.log(counterB.count); // => 0
// 各インスタンスのもつメソッドも異なる
console.log(counterA.increment === counterB.increment); // => false
```

インスタンスからメソッドを参照できるのは同じですが、`Counter`というクラス自体へのメソッド定義ではない点がことなります。
これは、`Counter`クラスのインスタンスであっても同じ動作（`increment`メソッド）をもたない場合があるという違いあります。

次のコードは、同じ`Counter`クラスのインスタンスでも`increment`メソッドを持たない場合がある実装例です。
コンストラクタの初期化処理ならば、インスタンスにメソッドを定義するかをif文で分岐できます。
しかし、このように同じクラスのインスタンスに対してメソッドを定義するかを分岐することは、混乱を生むためするべきではないでしょう。

{{book.console}}
```js
class Counter {
    // `hasDefineIncrement`に`true`を渡したときだけ`increment`メソッドを定義する
    constructor(hasDefineIncrement) {
        this.count = 0;
        if (hasDefineIncrement) {
            this.increment = () => {
                // `this`は`constructor`メソッドにおける`this`を参照する
                this.count++;
            };
        }
    }
}
const counter = new Counter();
// Counterのインスタンスであるが`increment`メソッドをもっていない
counter.increment(); // => TypeError: counter.increment is not a function 
```

また、プロトタイプメソッドとはことなり、インスタンスへのメソッド定義ではArrow Functionでメソッドを定義できるという違いがあります。
Arrow Functionには`this`が静的に決まるという性質があります。
そのため、Arrow Functionで定義した`increment`メソッドはどんな呼び出し方をしても、必ず`this`は`Counter`のインスタンスを参照することが保証できます。（「[Arrow Functionでコールバック関数を扱う][]」を参照）

{{book.console}}
```js
"use strict";
class ArrowClass {
    constructor() {
        this.method = () => {
            // Arrow Functionにおける`this`は静的に決まる
            // そのため`this`は常にインスタンスを参照する
            return this;
        };
    }
}
const instance = new ArrowClass();
const method = instance.method;
method(); // => instance
```

一方、プロトタイプメソッドにおける`this`は呼び出し時のベースオブジェクトを参照します。
そのためプロトタイプメソッドは呼び出し方によって`this`の参照先が異なります。（[`this`を含むメソッドを変数に代入した場合の問題][]を参照）

{{book.console}}
```js
"use strict";
class PrototypeClass {
    method() {
        // `this`はベースオブジェクトを参照する
        return this;
    };
}
const instance = new PrototypeClass();
const method = instance.method;
method(); // => undefined
```

## クラスのアクセッサプロパティの定義 {#class-accessor-property}

<!-- textlint-disable no-js-function-paren -->

クラスに対してメソッドを定義できますが、メソッドは`メソッド名()`のように呼び出す必要があります。
クラスでは、プロパティのように参照するだけで呼び出せるgetterやsetterと呼ばれる**アクセッサプロパティ**を定義できます。
アクセッサプロパティとは、プロパティの参照（getter）、プロパティへの代入（setter）に対応するメソッドのことです。

<!-- textlint-enable no-js-function-paren -->

次のコードでは、プロパティの参照（getter）、プロパティへの代入（setter）に対するアクセッサプロパティ（`get`と`set`)を定義しています。
getter（`get`）には仮引数はありませんが、必ず値を返す必要があります。
setter（`set`）の仮引数にはプロパティへ代入された値が入りますが、値を返す必要はありません。

<!-- doctest:disable -->
```js
class クラス {
    // getter
    get プロパティ名() {
        return 値;
    }
    // setter
    set プロパティ名(仮引数) {
        // setterの処理
    }
}
const インスタンス = new クラス();
インスタンス.プロパティ名; // getterが呼び出される
インスタンス.プロパティ名 = 値; // setterが呼び出される
```

次のコードでは、`NumberValue#value`をアクセッサプロパティとして定義しています。
`number.value`へアクセスした際にそれぞれ定義したgetterとsetterが呼ばれていることが分かります。
このアクセッサプロパティで実際に読み書きされているのは、`NumberValue`インスタンスの`_value`プロパティとなります。

{{book.console}}
```js
class NumberValue {
    constructor(value) {
        this._value = value;
    }
    // `_value`プロパティの値を返すgetter
    get value() {
        console.log("getter");
        return this._value;
    }
    // `_value`プロパティに値を代入するsetter
    set value(newValue) {
        console.log("setter");
        this._value = newValue;
    }
}

const number = new NumberValue(1);
// "getter"とコンソールに表示される
console.log(number.value); // => 1
// "setter"とコンソールに表示される
number.value = 42;
// "getter"とコンソールに表示される
console.log(number.value); // => 42
```

### [コラム] プライベートプロパティ {#private-property}

`NumberValue#value`のアクセッサプロパティで実際に読み書きしているのは、`_value`プロパティです。
このように、外から直接読み書きしてほしくないプロパティを`_`（アンダーバー）で開始するのはただの習慣であるため、構文としての意味はありません。

現時点（ES2018）には外から原理的に見ることができないプライベートプロパティ（hard private）を定義する構文はありません。
プライベートプロパティについてはECMAScriptの提案が行われており導入が検討[^Proposal]されています。
また、現時点でも`WeakSet`などを使うことで擬似的なプライベートプロパティ（soft private）を実現できます。
擬似的なプライベートプロパティ（soft private）については「[Map/Set][]」の章について解説します。

### `Array#length`をアクセッサプロパティで再現する {#array-like-length}

getterやsetterを利用しないと実現が難しいものとして`Array#length`プロパティがあります。
`Array#length`プロパティへ値を代入すると、そのインデックス以降の値は自動的に削除される仕様があります。

次のコードでは、配列の要素数(`length`プロパティ)を小さくすると配列の要素が削除されています。

{{book.console}}
```js
const array = [1, 2, 3, 4, 5];
// 要素数を減らすと、インデックス以降の要素が削除される
array.length = 2;
console.log(array.join(", ")); // => "1, 2"
// 要素数だけを増やしても、配列の中身は空要素が増えるだけ
array.length = 5;
console.log(array.join(", ")); // => "1, 2, , , "
```

この`length`プロパティの挙動を再現する`ArrayLike`クラスを実装してみます。
`Array#length`プロパティは、`length`プロパティへ値を代入した際に次のようなことを行っています。

- 現在要素数より小さな**要素数**が指定された場合、その**要素数**を変更し、配列の末尾の要素を削除する
- 現在要素数より大きな**要素数**が指定された場合、その**要素数**だけを変更し、配列の実際の要素はそのままにする

<!-- Note:

- 仕様的にもIf newLen ≥ oldLenでは`length`だけを変更している
- <https://tc39.github.io/ecma262/#sec-arraysetlength>

-->

つまり、`ArrayLike#length`のsetterで要素の追加や削除を実装することで、配列のような`length`プロパティを実装できます。

{{book.console}}
```js
/**
 * 配列のようなlengthを持つクラス
 */
class ArrayLike {
    constructor(items = []) {
        this._items = items;
    }

    get items() {
        return this._items;
    }

    get length() {
        return this._items.length;
    }

    set length(newLength) {
        const currentItemLength = this.items.length;
        // 現在要素数より小さな`newLength`が指定された場合、指定した要素数となるように末尾を削除する
        if (newLength < currentItemLength) {
            this._items = this.items.slice(0, newLength);
        } else if (newLength > currentItemLength) {
            // 現在要素数より大きな`newLength`が指定された場合、指定した要素数となるように末尾に空要素を追加する
            this._items = this.items.concat(new Array(newLength - currentItemLength));
        }
    }
}

const arrayLike = new ArrayLike([1, 2, 3, 4, 5]);
// 要素数を減らすとインデックス以降の要素が削除される
arrayLike.length = 2;
console.log(arrayLike.items.join(", ")); // => "1, 2"
// 要素数を増やすと末尾に空要素が追加される
arrayLike.length = 5;
console.log(arrayLike.items.join(", ")); // => "1, 2, , , "
```

このようにアクセッサプロパティは、プロパティのようありながら実際にアクセスした際には他のプロパティなどと連動する動作を実現できます。

## 2つのメソッド定義 {#two-method-definition}

クラスでは、2つのメソッド定義方法について見てきました。
`class`構文を使ったインスタンス間で共有されるプロトタイプメソッドの定義と、
`constructor`の中でインスタンス（オブジェクト）に対するメソッドの定義です。

これらの2つの方法を同時に使い、1つのクラスに同じ名前でメソッドを定義した場合はどうなるでしょうか？
次の`ConflictClass`ではプロトタイプメソッドとインスタンスに対して同じ`method`という名前のメソッドを定義しています。

```js
class ConflictClass {
    constructor() {
        // インスタンス自身に`method`を定義
        this.method = () => {
            console.log("インスタンスのメソッド");
        };
    }

    // クラスのプロトタイプメソッドとして`method`を定義
    method() {
        console.log("プロトタイプのメソッド");
    }
}

const conflict = new ConflictClass();
conflict.method(); // どちらの`method`が呼び出される？
```

結論から述べるとこの場合はインスタンス自身に定義した`method`が呼び出されます。
このとき、インスタンスの`method`プロパティを`delete`演算子で削除すると、今度はプロトタイプメソッドの`method`が呼び出されます。

```js
class ConflictClass {
    constructor() {
        this.method = () => {
            console.log("インスタンスのメソッド");
        };
    }

    method() {
        console.log("プロトタイプメソッド");
    }
}

const conflict = new ConflictClass();
conflict.method(); // "インスタンスのメソッド"
// インスタンスの`method`プロパティを削除
delete conflict.method;
conflict.method(); // "プロトタイプのメソッド"
```

この実行結果から次のことが分かります。

- プロトタイプメソッドとインスタンスのメソッドは上書きされずにどちらも定義されている
- インスタンスのメソッドがプロトタイプのメソッドよりも優先して呼ばれている

どちらも注意深く意識しないと気づきにくいですが、この挙動はJavaScriptの重要な仕組みであるため理解することは重要です。

この挙動は**プロトタイプオブジェクト**と呼ばれる特殊なオブジェクトと**プロトタイプチェーン**と呼ばれる仕組みで成り立っています。
どちらも**プロトタイプ**とついていることからも分かるように、2つで1組のような仕組みです。

このセクションでは、**プロトタイプオブジェクト**と**プロトタイプチェーン**とはどのような仕組みなのかを見ていきます。

## プロトタイプオブジェクト {#prototype}

先ほどの実行結果からプロトタイプメソッドはインスタンスのメソッドはそれぞれ別々のオブジェクトに定義されているような挙動がわかりました。

実際に、これらのメソッドは異なるオブジェクトに対して定義されています。
プロトタイプメソッドは**プロトタイプオブジェクト**へ、インスタンスのメソッドは**インスタンスオブジェクト**へそれぞれ定義されています。

**プロトタイプタイプオブジェクト**とは、JavaScriptの関数オブジェクトの`prototype`プロパティに自動的に作成される特殊なオブジェクトです。
クラスも一種の関数オブジェクトであるため、自動的に`prototype`プロパティにプロトタイプオブジェクトが作成されています。

次のコードでは関数やクラス自身の`prototype`プロパティにプロトタイプオブジェクトが自動的に作成されていることが分かります。

{{book.console}}
```js
function fn() {
}
// `prototype`プロトタイプにプロタイプオブジェクトが存在する
console.log(typeof fn.prototype === "object"); // => true

class MyClass {
}
// `prototype`プロトタイプにプロタイプオブジェクトが存在する
console.log(typeof MyClass.prototype === "object"); // => true
```

`class`構文のメソッド定義は、このプロタイプオブジェクトのプロパティとして定義されます。
次のコードでは、クラスのメソッドがプロトタイプオブジェクトに定義されていることを確認できます。
また、クラスには`constructor`メソッド（コンストラクタ）が必ず定義されます。
この`constructor`プロパティはクラス自身を参照します。

```js
class MyClass {
    method() { }
}

console.log(typeof MyClass.prototype.method === "function"); // => true
console.log(MyClass.prototype.constructor === MyClass); // => true
```

このように、プロトタイプメソッドとインスタンスのメソッドはそれぞれ異なるオブジェクトに定義されていることが分かります。
そのため、２つの方法でメソッドを定義しても上書きされずにそれぞれ定義されます。

## プロトタイプチェーン {#prototype-chain}

`class`構文で定義したプロトタイプメソッドはプロトタイプオブジェクトに定義されます。
しかし、インスタンス自身にはメソッドが定義されていないのに、インスタンスからクラスのプロトタイプメソッドを呼び出すことができます。

```js
class MyClass {
    method() {
        console.log("プロトタイプのメソッド");
    }
}
const instance = new MyClass();
instance.method(); // "プロトタイプのメソッド"
```

このインスタンスからプロトタイプメソッドを呼び出せるのは**プロトタイプチェーン**と呼ばれる仕組みによるものです。
プロトタイプチェーンは2つの処理から成り立ちます。

- インスタンスを作成時に、インスタンスの`[[Prototype]]`内部プロパティへプロトタイプオブジェクトの参照を保存する処理
- インスタンスからプロパティ（またはメソッド）を参照する時に、`[[Prototype]]`内部プロパティまで探索する処理

### インスタンス作成時

クラスから`new`演算子によってインスタンスを作成する際に、インスタンスにはクラスのプロトタイプオブジェクトの参照が保存されます。
このとき、インスタンスからクラスのプロトタイプオブジェクトへの参照は、インスタンスオブジェクトの`[[Prototype]]`という内部プロパティに保存されます。

`[[Prototype]]`内部プロパティは仕様上定められた内部的な表現であるため、通常のプロパティのようにはアクセスできません。
しかし、`Object.getPrototypeOf(object)`メソッドで`object`の`[[Prototype]]`内部プロパティを読み取れます。
次のコードでは、インスタンスの`[[Prototype]]`内部プロパティがクラスのプロトタイプオブジェクトを参照していることを確認できます。

```js
class MyClass {
    method() {
        console.log("プロトタイプのメソッド");
    }
}
const instance = new MyClass();
// instanceの`[[Prototype]]`内部プロパティは`MyClass.prototype`と一致する
const Prototype = Object.getPrototypeOf(instance);
console.log(Prototype === MyClass.prototype); // => true
```

ここで重要なのは、インスタンスはどのクラスから作られたかやそのクラスのプロトタイプオブジェクトを知っているということです。

----

#### Note: `[[Prototype]]`内部プロパティを読み書きする

`Object.getPrototypeOf(object)`で`object`の`[[Prototype]]`を読み取ることができます。
一方、`Object.setPrototypeOf(object, prototypeObject)`で`object`の`[[Prototype]]`に`prototypeObject`を保存できます。
また、`[[Prototype]]`内部プロパティを通常のプロパティのように扱える`__proto__`という特殊なアクセッサプロパティが存在します。

しかし、これらの`[[Prototype]]`内部プロパティを直接読み書きすることは通常の用途では行いません。
また、既存のビルトインオブジェクトの動作なども変更できるため、不用意に扱うべきではないでしょう。

----

### プロパティを参照する時

オブジェクトのプロパティを参照するときに、オブジェクト自身がプロパティを持っていない場合でもそこで探索が終わるわけではありません。
オブジェクトの`[[Prototype]]`内部プロパティのプロトタイプオブジェクトに対しても探索を続けます。
これは、スコープに指定した識別子の変数がなかった場合に外側のスコープへと探索するスコープチェインと良く似た仕組みです。

つまり、オブジェクトがプロパティを探索するときは次のような順番で、それぞれのオブジェクトを調べます。
すべてのオブジェクトにおいて見つからなかった場合の結果は`undefined`を返します。

1. `instance`オブジェクト自身
2. `instance`オブジェクトの`[[Prototype]]`の参照先（プロトタイプオブジェクト）

次のコードでは、インスタンスオブジェクト自身は`method`プロパティを持っていません。
そのため、実際参照してるのはクラスのプロトタイプオブジェクトの`method`プロパティです。

```js
class MyClass {
    method() {
        console.log("プロトタイプのメソッド");
    }
}
const instance = new MyClass();
// インスタンスには`method`プロパティがないため、プロトタイプオブジェクトの`method`が参照される
instance.method(); // "プロトタイプのメソッド"
// `instance.method`の参照はプロトタイプオブジェクトの`method`と一致する
const Prototype = Object.getPrototypeOf(instance);
console.log(instance.method === Prototype.method); // => true
```

このように、インスタンス（オブジェクト）に`method`が定義されていなくても、クラスのプロトタイプオブジェクトの`method`を呼び出すことができます。
このプロパティを参照する際に、オブジェクト自身から`[[Prototype]]`内部プロパティへと順番に探す仕組みのことを**プロトタイプチェーン**と呼びます。

プロトタイプチェーンの仕組みを擬似的なコードとして表現すると次のような動きをしています。

```js
// プロトタイプチェーンの擬似的な動作の擬似的なコード
class MyClass {
    method() {
        console.log("プロトタイプのメソッド");
    }
}
const instance = new MyClass();
// `instance.method()`を行う際には、次のような呼び出し処理が行われている
// インスタンス自身が`method`プロパティを持っている場合
if (instance.hasOwnProperty("method")) {
    instance.method();
} else {
    // インスタンスの`[[Prototype]]`の参照先（`MyClass`のプロトタイプオブジェクト）を取り出す
    const prototypeObject = Object.getPrototypeOf(instance);
    // プロトタイプオブジェクトが`method`プロパティを持っている場合
    if (prototypeObject.hasOwnProperty("method")) {
        // `this`はインスタンス自身を指定して呼び出す
        prototypeObject.method.call(instance);
    }
}
```

プロトタイプチェーンの仕組みによって、プロトタイプオブジェクトに定義したプロトタイプメソッドがインスタンスから呼び出すことができています。

普段は、プロトタイプオブジェクトやプロトタイプチェーンといった仕組みを意識する必要はありません。
`class`構文はこのようなプロトタイプを意識せずにクラスを利用できるように導入された構文です。
しかし、プロトタイプベースである言語のJavaScriptではクラスをこのようなプロトタイプを使い表現していることは知っておくとよいでしょう。

<!-- Note

インスタンスのメソッドがプロトタイプのメソッドの呼び出しの仕組みについてを見ていきます。
 
- プロトタイプチェーンという仕組み
- インスタンス化されるときに自動的にインスタンスはプロトタイプオブジェクトを参照する（継承）
- これは`[[Prototype]]`という内部プロパティに保存されますが、`__proto__`というアクセッサプロパティで参照できます
- しかし、`class`構文を利用する場合にはこれを意識して触ることはありません

-->

## 継承 {#extends}

`extends`キーワードを使うことで既存のクラスを継承できます。
ここでの継承とはクラスの**構造**や**機能**を引き継いだ新しいクラスを定義することを言います。

### 継承したクラスの定義 {#class-extends}

`extends`キーワードを使って既存のクラスを継承した新しいクラスを定義してみます。
`class`構文の右辺に`extends`キーワードで継承元となる**親クラス**（基底クラス）を指定することで、
親クラスを継承した**子クラス**（派生クラス）を定義できます。

<!-- doctest:disable -->
```js
class 子クラス extends 親クラス {

}
```

次のコードでは、`Parent`クラスを継承した`Child`クラスを定義しています。
子クラスである`Child`クラスのインスタンス化は通常のクラスと同じく`new`演算子を使って行います。

{{book.console}}
```js
class Parent {

}
class Child extends Parent {

}
const instance = new Child();
```

### `super` {#class-super}

`extends`を使って定義した子クラスから親クラスを参照するには`super`というキーワードを利用します。
もっともシンプルな`super`を使う例としてコンストラクタの処理を見ていきます。

`class`構文でも紹介しましたが、クラスは必ず`constrctor`メソッド（コンストラクタ）をもちます。
これは、継承した子クラスでも同じです。

<!-- textlint-disable no-js-function-paren -->

次のコードでは、`Parent`クラスを継承した`Child`クラスのコンストラクタで、`super()`を呼び出しています。
`super()`は子クラスから親クラスの`constructor`メソッドを呼び出します。（`super()`は子クラスのコンストラクタ以外では書くことができません）

{{book.console}}
```js
// 親クラス
class Parent {
    constructor(...args) {
        console.log("Parentコンストラクタの処理", ...args);
    }
}
// Parentを継承したChildクラスの定義
class Child extends Parent {
    constructor(...args) {
        // Parentのコンストラクタ処理を呼びだす
        super(...args);
        console.log("Childコンストラクタの処理", ...args);
    }
}
const child = new Child("引数1", "引数2");
// "Parentコンストラクタの処理", "引数1", "引数2"
// "Childコンストラクタの処理", "引数1", "引数2"
```

`class`構文でのクラス定義では、`constrctor`メソッド（コンストラクタ）で何も処理を行わない場合は省略できることを紹介しました。
これは、継承した子クラスでも同じです。

次のコードでは、`Child`クラスのコンストラクタでは何も処理を行っていません。
そのため、`Child`クラスの`constructor`メソッドの定義を省略できます。

{{book.console}}
```js
class Parent {}
class Child extends Parent {}
```

このように子クラスで`constructor`を省略した場合は次のように書いた場合と同じ意味になります。

{{book.console}}
```js
class Parent {}
class Child extends Parent {
    constructor(...args) {
        super(...args); // 親クラスに引数をそのまま渡す
    }
}
```

### コンストラクタの処理順は親クラスから子クラスへ {#constructor-order}

コンストラクタの処理順は親クラスから子クラスへと順番が決まっています。

`class`構文ではかならず親クラスのコンストラクタ処理（`super()`を呼び）を先に行い、その次に子クラスのコンストラクタ処理を行います。
子クラスのコンストラクタでは、`this`を触る前に`super()`で親クラスのコンストラクタ処理を呼び出さないとSyntaxErrorとなるためです。

次のコードでは、`Parent`と`Child`でそれぞれインスタンス（`this`）の`name`プロパティに値を書き込んでいます。
子クラスでは先に`super()`を呼び出す前に、`this`に触ることはできません。
そのため、コンストラクタの処理順は`Parent`から`Child`という順番に限定されます。

<!-- textlint-enable no-js-function-paren -->

{{book.console}}
```js
class Parent {
    constructor() {
        this.name = "Parent";
    }
}
class Child extends Parent {
    constructor() {
        // 子クラスでは`super()`を`this`に触る前に呼び出さなければならない
        super();
        // 子クラスのコンストラクタ処理
        // 親クラスで書き込まれた`name`は上書きされる
        this.name = "Child";
    }
}
const parent = new Parent();
console.log(parent.name); // => "Parent";
const child = new Child();
console.log(child.name); // => "Child";
```

### プロトタイプ継承 {#prototype-inheritance}

次のコードでは`extends`キーワードを使い`Parent`クラスを継承した`Child`クラスを定義しています。
`Parent`クラスでは`method`を定義しているため、これを継承している`Child`クラスのインスタンスからも呼び出せます。

{{book.console}}
```js
class Parent {
    method() {
        console.log("Parent#method");
    }
}
// `Parent`を継承した`Child`を定義
class Child extends Parent {
    // methodの定義はない
}
// `Child`のインスタンスは`Parent`のプロトタイプメソッドを継承している
const instance = new Child();
instance.method(); // "Parent#method"
```

このように、子クラスのインスタンスから親クラスのプロトタイプメソッドもプロトタイプチェーンの仕組みによって呼びだせます。

`extends`によって継承したクラス間でもプロトタイプチェーンの仕組みが働くように`[[Prototype]]`の値が設定されます。
この例では、`Child.prototype`オブジェクトの`[[Prototype]]`内部プロパティには`Parent.prototype`が設定されます。

これにより、プロパティを探索する場合には次のような順番でオブジェクトを探索しています。

1. `instance`オブジェクト自身
2. `Child.prototype`（`instance`オブジェクトの`[[Prototype]]`の参照先）
3. `Parent.prototype`（`Child.prototype`オブジェクトの`[[Prototype]]`の参照先）

このプロトタイプチェーンの仕組みより、`method`プロパティは`Parent.prototype`オブジェクトに定義されたものを参照します。

このようにJavaScriptでは`class`構文と`extends`キーワードを使うことでクラスの"機能"を継承できます。
継承の仕組みとしてプロトタイプオブジェクトプロトタイプチェーンを使うため、この継承の仕組みを**プロトタイプ継承**と呼びます。

### `super`プロパティ {#super-property}

<!-- textlint-disable no-js-function-paren -->

子クラスから親クラスのコンストラクタ処理を呼び出すには`super()`を使います。
同じように、子クラスのプロトタイプメソッドからは、`super.プロパティ名`で親クラスのプロトタイプメソッドを参照できます。

次のコードでは、`Child#method`の中で`super.method()`と書くことで`Parent#method`を呼び出しています。
このように、子クラスから継承元の親クラスのプロトタイプメソッドは`super.プロパティ名`で参照できます。

<!-- textlint-enable no-js-function-paren -->

{{book.console}}
```js
class Parent {
    method() {
        console.log("Parent#method");
    }
}
class Child extends Parent {
    method() {
        console.log("Child#method");
        // `this.method()`だと自分(`this`)のmethodを呼び出して無限ループする
        // そのため明示的に`super.method()`とParent#methodを呼びだす
        super.method();
    }
}
const instance = new Child();
instance.method(); 
// コンソールには次のように出力される
// "Child#method"
// "Parent#method"
```

プロトタイプチェーンでは、インスタンス -> `Child` -> `Parent`と継承関係をさかのぼるようにメソッドを探索すると紹介しました。
そのため`Child#method`が定義されている場合に、`Child`のインスタンスから`method`を呼び出すと`Child#method`が呼び出されます。

### 継承の判定 {#instanceof}

あるクラスが指定したクラスをプロトタイプ継承しているかは`instanceof`演算子を使って判定できます。

次のコードでは、`Child`のインスタンスは`Child`クラスと`Parent`クラスを継承したオブジェクトであることを確認しています。

{{book.console}}
```js
class Parent {}
class Child extends Parent {}

const parent = new Parent();
const child = new Child();
// `Parent`のインスタンスは`Parent`のみを継承したインスタンス
console.log(parent instanceof Parent); // => true
console.log(parent instanceof Child); // => false
// `Child`のインスタンスは`Child`と`Parent`を継承したインスタンス
console.log(child instanceof Parent); // => true
console.log(child instanceof Child); // => true
```

<!-- Note:

- `instanceof`演算子は`[[Prototype]]`プロパティを見ている
- <https://tc39.github.io/ecma262/#sec-ordinaryhasinstance>
- `Symbol.hasInstance`によって詳細は変わるため絶対とは言い切れない
- <https://tc39.github.io/ecma262/#sec-symbol.hasinstance>

-->

### 継承のユースケース {#extends-usecase}

ここまでで`extends`キーワードや`super`を使ったプロトタイプ継承の仕組みについてを見ていきました。
主に仕組みの話が中心であったため、具体的なコードを使った継承のサンプルを見てみましょう。

継承のサンプルとして値（`value`プロパティ）を更新されたときに指定したコールバック関数を呼び出すクラスを作ることを目標にします。
現在の値をコンソールへ出力するコールバック関数を登録すれば、`value`プロパティが変化するたびにその結果が自動的にコンソールに表示すると言ったことが実現できます。

「値を更新されたときに指定したコールバック関数を呼び出すクラス」を作れば目的は達成されますが、ここでは継承の練習としてその機能をもっとバラバラに考えてみましょう。

「値（`value`プロパティ）を更新されたとき」というのはアクセッサプロパティのsetterを定義すればできそうです。
それとは別に「何かが起きた時に指定したコールバック関数を呼び出すクラス」というのも必要そうです。

クラスでは親クラスになるほど概念的（抽象的）なものが多くなり、子クラスほど具体的になる傾向があります。
概念的な親クラスはインスタンス化せずに単純に継承するために定義されることがあります。
一方、子クラスはインスタンス化して利用するので用途がより明確なものなるため、このような傾向が考えられます。

「値（`value`プロパティ）が更新されたとき」というのは`value`プロパティという部分が具体的です。
「何かした時にコールバック関数を呼び出すクラス」というのはやや抽象的です。

そのため、「何かした時にコールバック関数を呼び出すクラス」を親クラスとして定義し、
子クラスとして「値を更新した時にコールバック関数を呼び出すクラス」を定義してみます。

- 親クラス: 何かした時にコールバック関数を呼び出すクラス
- 子クラス: 値を更新した時にコールバック関数を呼び出すクラス

まずは、親クラスとなる「何かした時にコールバック関数を呼び出すクラス」を定義します。

次の`EventEmitter`というクラスを見てみます。
このクラスはコールバック関数を`addEventLister`メソッドで登録し、
登録済みのコールバック関数を`emit`メソッドによって呼びだせます。

これによって、`emit`メソッドを呼び出すと登録済みのコールバック関数を呼び出すことができます。
このようなパターンをObserverパターンと呼び、ブラウザやNode.jsなど多くの実行環境で似た実装が使われています。

{{book.console}}
```js
class EventEmitter {
    constructor() {
        // 登録済みのイベントハンドラーの状態
        this.eventHandlers = [];
    }
    // `handler`(コールバック関数)を登録する
    addEventLister(handler) {
        this.eventHandlers.push(handler);
    }
    // 登録済みのイベントハンドラーに対して引数`...args`を渡して呼び出す
    emit(...args) {
        this.eventHandlers.forEach(handler => {
            handler(...args);
        });
    }
}

const event = new EventEmitter();
// コールバック関数を登録
event.addEventLister(() => console.log("Hello!"));
event.addEventLister((...args) => console.log("Hi", ...args));
// コールバック関数をまとめて呼びだす
event.emit("a", "b", "c");
// コールバック関数がそれぞれよびだされ、コンソールには次のように出力される
// "Hello!"
// "Hi", "a", "b", "c"
```

次は、この`EventEmitter`クラスを継承して「値（`value`プロパティ）を更新した時にコールバック関数を呼び出すクラス」を実装します。

次の`ObservableValue`というクラスを見てみます。
`ObservableValue`は先ほど定義した`EventEmitter`クラスを継承しています。
これにより、`ObservableValue`クラスのプロトタイプメソッド内では、`EventEmitter`クラスのプロトタイプメソッドを呼び出せます。

`ObservableValue#onChange`メソッドでは継承した`addEventLister`メソッドを使い、値を更新した時のコールバック関数を登録できます。
また、`value`プロパティのsetterでは、値が実際に更新されているなら登録されたコールバック関数を`emit`メソッドで呼び出しています。

これにより、値が更新される度に新しい値をコンソールに出力するコールバック関数を呼び出す実装ができました。

```js
class EventEmitter {
    constructor() {
        this.eventHandlers = [];
    }
    addEventLister(handler) {
        this.eventHandlers.push(handler);
    }
    emit(...args) {
        this.eventHandlers.forEach(handler => {
            handler(...args);
        });
    }
}

class ObservableValue extends EventEmitter {
    constructor(defaultValue) {
        super();
        this._value = defaultValue;
    }
    // 値が変わったときに呼ばれる`handler`（コールバック関数）を登録する
    onChange(handler) {
        this.addEventLister(handler);
    }
    get value() {
        return this._value;
    }
    // 値を更新した時にコールバック関数を呼び出すアクセッサプロパティ
    set value(newValue) {
        const prevValue = this._value;
        // 値が変わっていない場合は無視する
        if (prevValue === newValue) {
            return;
        }
        this._value = newValue;
        // 値が変わったらコールバック関数(`handler`)を呼ぶ
        this.emit(prevValue, newValue);
    }
}

// 1. 初期値は`1`のインスタンスを作成する
const observable = new ObservableValue(1);
observable.onChange((prevValue, newValue) => {
    // 3. 登録済みのコールバック関数が呼ばれる
    console.log(prevValue); // => 1
    console.log(newValue); // => 2
});
// 2. 値を更新する
observable.value = 2;
```


[^糖衣構文]: `class`構文でのみしか実現できない機能はなく、読みやすさや分かりやさのために導入された構文という側面もあるためJavaScriptの`class`構文は糖衣構文と呼ばれることがあります。
[^Proposal]: <https://github.com/tc39/proposal-class-fields>においてHard Privateの仕様についての提案と議論が行われている。


[Arrow Functionでコールバック関数を扱う]: ../functiont-this/README.md#arrow-function-callback
[`this`を含むメソッドを変数に代入した場合の問題]: ../functiont-this/README.md#assign-this-function}
[関数とthis]: ../functiont-this/README.md
[Map/Set]: ../map-and-set/README.md
