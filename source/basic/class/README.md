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

このセクションでは、**プロトタイプオブジェクト**と**プロトタイプチェーン**によってなぜ先ほどのような挙動となるのかを見ていきます。

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
そのため、２つの方法でメソッドを定義しても上書きされずに定義できていました。

しかし、インスタンスからクラスのプロトタイプメソッドを呼び出せるということになります。

```js
class MyClass {
    method() {
        console.log("プロトタイプメソッド");
    }
}
const instance = new MyClass();
// `instance`から`MyClass.prototype.method`を呼び出せている
instance.method();// "プロトタイプメソッド"
// `method`プロパティの参照先はプロトタイプメソッドと一致する
console.log(instance.method === MyClass.prototype.method); // => true
```

これは、プロトタイプオブジェクトと関連した**プロトタイプチェーン**という仕組みによって、
インスタンス自身にはないメソッドが呼び出せています。
次はなぜ、プロトタイプチェーンがどのようにインスタンスからクラスのプロトタイプメソッドを呼びだしているかを見ていきます。

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
const instance = newInstance(MyClass);
// instanceの`[[Prototype]]`内部プロパティは`MyClass.prototype`と一致する
const Prototype = Object.getPrototypeOf(instance);
console.log(Prototype === MyClass.prototype); // => true
```

ここで重要なのは、インスタンスはどのクラスから作られたかやそのクラスのプロトタイプオブジェクトを知っているということです。

----

#### Note: `[[Prototype]]`内部プロパティを読み書きする

しかし、`Object.getPrototypeOf(object)`で`object`の`[[Prototype]]`を読み取ることができます。
また、`Object.setPrototypeOf(object, prototypeObject)`で`object`の`[[Prototype]]`に`prototypeObject`を保存できます。

----

### プロパティを参照する時

オブジェクトのプロパティを参照するときに、オブジェクト自身がプロパティを持っていない場合でもそこで探索が終わるわけではありません。
オブジェクトの`[[Prototype]]`内部プロパティのプロトタイプオブジェクトに対しても探索を続けます。
これは、スコープに指定した識別子の変数がなかった場合に外側のスコープへと探索するスコープチェインと良く似た仕組みです。

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

<!-- textlint-disable no-js-function-paren -->
つまり、`instance.method()`のように`instance`オブジェクトの`method`プロパティを参照する際には、次のような順番で`method`プロパティを探索しています。
<!-- textlint-enable  no-js-function-paren -->

1. `instance`オブジェクト自身
2. `instance`オブジェクトの`[[Prototype]]`の参照先（プロトタイプオブジェクト）

この仕組みにより、インスタンス（オブジェクト）に`method`が定義されていなくてもクラスのプロトタイプオブジェクトの`method`を呼びだすことができます。
このプロパティを参照する際に、オブジェクト自身から`[[Prototype]]`へと順番に探す仕組みのことを**プロトタイプチェーン**と呼びます。

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

プロトタイプチェーンの仕組みによって、プロトタイプオブジェクトに定義したプロトタイプメソッドがインスタンスから呼びだすことができています。

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


[^糖衣構文]: `class`構文でのみしか実現できない機能はなく、読みやすさや分かりやさのために導入された構文という側面もあるためJavaScriptの`class`構文は糖衣構文と呼ばれることがあります。
[^Proposal]: <https://github.com/tc39/proposal-class-fields>においてHard Privateの仕様についての提案と議論が行われている。


[Arrow Functionでコールバック関数を扱う]: ../functiont-this/README.md#arrow-function-callback
[`this`を含むメソッドを変数に代入した場合の問題]: ../functiont-this/README.md#assign-this-function}
[関数とthis]: ../functiont-this/README.md
[Map/Set]: ../map-and-set/README.md
