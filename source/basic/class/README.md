---
author: azu
---

# クラス

「クラス」と一言にいってもさまざまであるため、ここでは**構造**、**動作**（メソッド）、**状態**をもつもののことを示すことにします。
また、この章では概念を示す場合は**クラス**と呼び、クラスに関する構文（記述するコード）のことを`class`構文と呼びます。

**クラス**とは、**動作**を持った**構造**を定義でき、その構造からインスタンスを作成し、そのインスタンスは**状態**を持てるものです。
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

クラス宣言文では`class`キーワードを使い、`class クラス名{ }`のようにクラスを定義できます。
クラスは必ずコンストラクタを持ち、`constructor`という名前のメソッドとして定義します。
コンストラクタとは、そのクラスからインスタンスを作成する際にインスタンスに関する初期化を行うメソッドです。

```js
class MyClass {
    constructor() {
        // コンストラクタ関数の処理
    }
}
```

もうひとつの定義方法であるクラス式は、クラスを値として定義する方法です。
クラス式ではクラス名を省略できます。これは関数式における匿名関数と同じです。

```js
const MyClass = class MyClass {
    constructor() {}
};

const AnnonymousClass = class {
    constructor() {}
};
```

クラスは必ずコンストラクタを持ちますが、コンストラクタ関数内で何も処理がない場合はコンストラクタの記述を省略できます。

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

```js
class MyClass {
}
// `MyClass`をインスタンス化する
const myClass = new MyClass();
// 毎回新しいインスタンス(オブジェクト)を作成する
const myClassAnother = new MyClass();
// それぞれのインスタンスの参照は異なる
console.log(myClass === myClassAnother); // => false
```

このままでは何もできない空のクラスなので、値を持ったクラスを定義してみましょう。

クラスではインスタンスの初期化処理をコンストラクタ関数で行います。
コンストラクタ関数は`new`演算子でインスタンス化されるときに暗黙的によばれ、
コンストラクタのなかでの`this`はこれから新しく作るインスタンスオブジェクトとなります。

次のコードでは`x`座標と`y`座標の値をもつ`Point`というクラスを定義しています。
コンストラクタ関数(`constructor`)の中でインスタンスオブジェクト（`this`）の`x`と`y`プロパティに値を代入して初期化しています。

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
`new`演算子には関数と同じように引数を渡すことができます。
`new`演算子の引数はクラスの`constructor`メソッド（コンストラクタ関数）の仮引数に渡されます。
そして、コンストラクタのなかではインスタンスオブジェクト(`this`）の初期化処理を行います。

```js
class Point {
    // 2. コンストラクタ関数の仮引数として`x`には`3`、`y`には`4`が渡る
    constructor(x, y) {
        // 3. インスタンス(`this`)の`x`と`y`プロパティにそれぞれ値を設定する
        this.x = x;
        this.y = y;
        // 4. return文がなくてもコンストラクタは自動的に`this`を返す
    }
}

// 1. コンストラクタ関数には引数として`3`と`4`渡してインスタンス化
const point = new Point(3, 4);
// 5. `Point`のインスタンスである`point`の`x`と`y`プロパティにはそれぞれ値が入る
console.log(point.x); // => 3
console.log(point.y); // => 4
```

コンストラクタ（`construtor`メソッド)の中では明示的に`return`文が出てきていません。
通常の関数とは異なり、コンストラクタ関数は暗黙的に`this`（インスタンスオブジェクト）を返します。
明示的に`return`文を書くこともできますが、通常はコンストラクタ関数内で`return`文は書きません。

```js
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // コンストラクタ関数内では暗黙的に`this`が返される
        return this;
    }
}

const point = new Point(3, 4);
console.log(point.x); // => 3
console.log(point.y); // => 4
```

### [Note] クラス名は大文字で始める

JavaScriptでは慣習としてクラス名は大文字で始まる名前を付けます。
これは、変数名にキャメルケースを使う慣習があるのと同じで、名前自体には特別なルールがあるわけではありません。
クラス名を大文字にしておき、そのインスタンスは小文字で開始すれば、名前が被らないため合理的な理由で好まれています。

```js
class Thing {}
const thing = new Thing();
```

### [コラム] `class`構文と関数でのクラスの違い

ES2015より前はこれらのクラスを`class`構文ではなく、関数で表現していました。
その表現方法は人によってさまざまで、これも`class`構文という統一した表現が導入された理由の1つです。

次のコードでは先ほどの`class`構文でのクラスを簡略化した関数での1つの実装例です。
この関数でのクラス表現は、継承の仕組みなどは省かれていますが、`class`構文とよく似ています。

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

## クラスのメソッドの定義

クラスのインスタンスに値（プロパティ）を定義するのはコンストラクタ関数(`constructor`)で行います。
JavaScriptではプロパティに値として関数も代入できるため、それぞれのインスタンスにメソッドを追加することも可能です。
次の例では`Counter`クラスのコンストラクタ関数で、インスタンスに`increment`メソッドを定義しています。

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
const counter = new Counter();
counter.increment();
console.log(counter.count); // => 1;
```

インスタンスに対して直接メソッドを定義することもできますが、毎回同じ挙動の関数を定義していることが分かります。
つまり、インスタンス化するたびに同じ挙動の関数を新しく定義して、インスタンスへ代入しているため無駄にも見えます。

----

### Note: なぜインスタンスへの代入はクラスの動作とはいえないか

最初にクラスとは**構造**、**動作**（メソッド）、**状態**ものであると言いました。
コンストラクタへのインスタンスオブジェクトに対して定義は、このクラスのインスタンスが必ずこの動作（メソッド）をもつということにはなりません。

具体的には、コンストラクタの初期化処理ならば次のコードのようにメソッドを定義するかを分岐することが可能です。
この場合、`Counter`クラスであっても、`increment`メソッドをもたないということになります。
つまり、コンストラクタ関数の中でインスタンスオブジェクトに対してメソッドを定義することは、クラスとしての動作を宣言的に定義しているとはいえません。

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

----

`class`構文ではクラスに対して宣言的にメソッドを定義できます。
このクラスに対して定義したメソッドは、クラスの各インスタンスから**共有されるメソッド**となります。
このインスタンス間で共有されるメソッドのことを**プロトタイプメソッド**と呼びます。

`class`構文では次のようにクラスに対してプロトタイプメソッドを定義できます。
`constructor`メソッド同じように、`class`に対して短縮記法でメソッドを定義します。

```js
class Counter {
    constructor() {
        this.count = 0;
    }
    // `increment`メソッドをクラスに定義する
    increment() {
        // `this`はベースオブジェクトを参照する
        this.count++;
    }
}
const counter = new Counter();
// `counter.increment()`のベースオブジェクトは`counter`
counter.increment();
console.log(counter.count); // => 1;

// 各インスタンスで同じメソッドを参照している
const counter1 = new Counter();
const counter2 = new Counter();
console.log(counter1.increment === counter2.increment); // => true
```

プロトタイプメソッドはクラスの継承の仕組みとも関連するため後ほど詳細に解説します。
現時点では、クラスに対してメソッドを宣言的に定義するものと認識していれば十分です。

## クラスのアクセッサの定義

クラスに対してメソッドを定義できますが、メソッドは`()`で呼び出す必要があります。
クラスでは、プロパティのように参照するだけで呼び出せるgetterやsetterと呼ばれる**アクセッサプロパティ**を定義できます。
アクセッサプロパティとは、メソッドの前に`get`または`set`を付けたメソッドのことを示します。
このアクセッサプロパティは、通常のプロパティの参照（`get`）、プロパティへの代入（`set`）する際に呼び出されるメソッドを定義できます。

getterとsetterは次のように同じプロパティ名に対してそれぞれ`get`と`set`を付けたメソッドで定義できます。
getterには仮引数はありませんが、必ず値を返す必要があります。
setterには仮引数としてプロパティ名へ代入された値が入りますが、値を返す必要はありません。

<!-- doctest:disable -->
```js
class クラス {
    get プロパティ名() {
        return 値;
    }
    set プロパティ名(仮引数) {
        // setterの処理
    }
}
const インスタンス = new クラス();
インスタンス.プロパティ名; // getterが呼び出される
インスタンス.プロパティ名 = 値; // setterが呼び出される
```

次のコードでは、`NumberValue#value`への値を読み書きをするそれぞれの`value`メソッドを定義しています。
`number.value`へアクセスした際にそれぞれ定義したgetterとsetterが呼ばれていることが分かります。

```js
class NumberValue {
    constructor(value) {
        this._value = value;
    }
    get value() {
        console.log("getter");
        return this._value;
    }
    set value(newValue) {
        console.log("setter");
        this._value = newValue;
    }
}

const number = new NumberValue(1);
console.log(number.value); // => 1
// "getter"がコンソールに表示される
number.value = 42;
// "setter"がコンソールに表示される
console.log(number.value); // => 42
```

### [コラム] プライベートプロパティ {#private-property}

`NumberValue#value`のgetterとsetterで実際に読み書きしているのは`_value`プロパティとなっています。
このように、外から直接読み書きしてほしくないプロパティを`_`（アンダーバー）で開始するのはただの習慣であるため、構文としての意味はありません。

現時点（ES2018）には外から原理的に見ることができないプライベートプロパティ（hard private）を定義する構文はJavaScriptにはありません。
プライベートプロパティについてはECMAScriptの提案が行われており導入が検討[^Class field declarations for JavaScript]されています。
また、現時点でも`WeakSet`などを使うことで擬似的なプライベートプロパティ（soft private）を実現できます。
擬似的なプライベートプロパティ（soft private）については「[Map/Set][]」の章について解説します。

### `Array#length`をアクセッサプロパティで再現 {#array-like-length}

getterやsetterを利用しないと実現が難しいものとして`Array#length`プロパティがあります。
`Array#length`プロパティへ値を代入すると、そのインデックス以降の値は自動的に削除される仕様があります。

次のコードでは、配列の要素数(`length`プロパティ)を小さくすると配列の要素が削除されています。

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
// インデックス以降の要素が削除される
arrayLike.length = 2;
console.log(arrayLike.items.join(", ")); // => "1, 2"
// 要素数を増やすと
arrayLike.length = 5;
console.log(arrayLike.items.join(", ")); // => "1, 2, , , "
```

このようにアクセッサプロパティは、プロパティのように振る舞いつつ実際にアクセスした際には他のプロパティなどと連動する動作を実現できます。

[^糖衣構文]: `class`構文でのみしか実現できない機能はなく、読みやすさや分かりやさのために導入された構文という側面もあるためJavaScriptの`class`構文は糖衣構文と呼ばれることがあります。
[^Class field declarations for JavaScript]: <https://github.com/tc39/proposal-class-fields>においてECMAScriptへ提案と議論が行われている。

[Map/Set]: ../map-and-set/README.md
