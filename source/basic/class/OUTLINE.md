# `class`のアウトライン

## 目的

- `class`の基本的な文法についてを学ぶ
    - コンストラクタ
	    - `new`で呼ぶことが前提の関数のこと
	    - 実際に`typeof`は`function`
	    - しかし `[[Call]]`はできないように仕様で規定されている
    - new
	    - newした時の`this`の仕組み
    - メソッド
		- インスタンスメソッド
	- getter/setter
		- Computed Varibale(プロパティ)
			- Public Field
		- アクセス制御
		- WeakSet
    - prototype
	    - ES2015以前
	    - ES2015以後
    - 継承
	    - super
	    - instanceof
	    - カスタムクラス
	    - ネイティブクラス
		    - Error, HTMLElement
    - 静的メソッド
	    - `of`や`from`
- 発展的利用方法
	- classは値
	- mixin
	- multiple extends
- 将来の発展性についてを軽く触れる
    - [コラム] minimal maximal
    - Symbol
    - Public Field
    - Private
    - これらの拡張の基盤について

### 触れないこと

- OOPとしてのクラス
	- リスコフの置換原則とは〜みたいな
	- 根底としてはそこは守るけど、明示はしない
	- 他の言語ではこういうことできるけど、JavaScriptではどうなの?的な感じの触れ方はしない
	- 機能自体が少ないことについては説明する
- メタ
	- propery descriptor
	- メソッドなどは列挙されない
		- enumerable
		- configurable
	- `Object.freeze(this)`でのImmutable class
- Proposalの詳細
	- https://github.com/tc39/proposal-class-public-fields
	- https://github.com/tc39/proposal-private-fields
	- https://github.com/tc39/proposal-class-fields
	- https://github.com/tc39/proposal-static-class-features/


----


# アウトライン: クラス

- 目的: クラスの基本的な使い方、クラスができることできないことを学ぶ
- 目的ではないこと: オブジェクト指向のパターンや型としてのクラス、構文としてできないことをむりやりやる方針としての話
- クラスとは構造、状態、動作(メソッド)を持つものを作る構文や概念のことを言います。
	- ここでは構文のことを`class`構文と呼び、概念としてのことを言う場合は**クラス**と呼びます。
	- ここで**クラス**とは、動作や値を持った**構造**を定義でき、その構造からインスタンスを作ることでき、またそのインスタンスは**状態**を持てるものをクラスと呼びます。
	- JavaScriptではES2015まで`class`構文はなく、関数を使いクラスのようなものを表現して扱っていました
	- ES2015で`class`構文が導入されましたが、この構文で定義したクラスは特殊な関数と言えます。なぜなら、`class`構文で定義された結果作られるオブジェクトは一種の関数であり、`class`構文はクラスを作るための関数定義をパターン化されたものと言えます。
	- そのため、関数で学んだことのそのままはクラスでも適応できます。
	- また、定義の仕方も関数宣言文と関数式があるようのと同じく、クラスにもクラス宣言文とクラス式があります。
	- この章では、`class`構文の基本的な使い方やクラスとしての機能を使ってできることや出来ないことについてを学んでいきます。
- `class`構文の定義方法
	- 具体例: `MyClass`
	- `class` = コンストラクタ関数を同時に定義する
	- クラスは暗黙的にコンストラクタを持ちます。
		- 空の`constructor(){}`は省略できます
	- コンストラクタ関数に対して`new`演算子を使って行う
		- `class`構文で定義したコンストラクタ関数は関数としては呼び出せない
- クラスのインスタンス化
	- `new`演算子でインスタンス化してそのインスタンスを使います。
	- なぜならクラスのコンストラクタは関数として呼ぶことはできないため。
- [コラム] クラスの名前は大文字開始にする
	- これは慣習であってこれによる挙動の違いはない
	- しかし、クラス名とインスタンス名が大文字小文字の違いで表現できる
- クラスの初期値とメソッドの定義
	- クラスの初期化は`constructor`関数で行います。
	- `new`演算子の引数で渡したものが`constructor`関数の仮引数に渡されます。
	- この時のコンストラクタ関数の`this`はクラスのインスタンスになります
	- つまり次のようにコンストラクタで`this.x`のように代入すれば、それはインスタンスが持つ`x`プロパティに値が入るという事になります。
	- インスタンスのプロパティとして定義した値はデフォルトで外から読み書きが可能です。
	- 具体例: `Point`
	- また、`class`構文でコンストラクタ以外にもそのクラスが持つメソッドを定義できます。
	- 後述しますが、このメソッドはインスタンス(`this`)ではなく、クラスの`prototype`に定義されることで、各インスタンスからも呼び出すことが共通のメソッドを定義できます。
	- 具体例: `Counter`
	- 各メソッドからインスタンスを参照する場合もどうように`this`を使います。
- アクセッサメソッドの定義
	- メソッドは`()`で呼び出す必要がありますが、プロパティのように参照するだけで呼び出せるgetterやsetterと呼ばれるアクセッサプロパティを定義できます。
	- 具体例: 特に意味はないgetとsetの実装
	- メソッドの前に`get`や`set`をつけることで、アクセッサプロパティとして定義できます
	- getterには引数は書くことができませんがsetterには引数が必要です。
	- アクセッサメソッドを使ってインスタンス変数の値を合成した値を返したり、getだけを実装し外からsetはできないようにすると言った実装が可能です
	- (習慣として外からアクセスしてほしくないプロパティは`_`で開始することが習慣としてあります。これはさまざま言語で見られるものでかつECMAScriptでは特殊な内部プロパティが`__`で定義されているという実装からきているものと考えられます。)
	- 具体例: ArrayLikeな`length`の実装
	- しかし、現在のJavaScriptのクラスにはクラスの外側から完全に見えない値を定義する(hard privateと呼ばれる)アクセス制御を行う方法は持っていません。
	- これについては今後hard privateの機能を追加することが検討されています。(後述する[コラム] maximally minimal class)、また現時点でもWeakSetを使って擬似的なprivate(soft privateと呼ばれる)を実現できます(詳細は「Map/Set」の章）
- [コラム] インスタンスが持つ初期値
	- 現在のクラスにはフィールド変数をメソッドのように定義する構文はありません。
	- そのためインスタンスが持つ初期値はconstructor関数の中で`this`に対して代入したり、アクセッサメソッドで代用できます。
	- オブジェクトと同じくメソッドの中で新しいプロパティをインスタンスに対して追加することもできますが、オブジェクトでも書きましたが作成時に持つべきプロパティを宣言した方が読む人にとってもこのインスタンスが持つプロパティが分かるため良い習慣がいえます。
	- 具体例: 初期値として`0`を持つインスタンス?
		- Counterの良くない例,Goodの良い例
    - prototype
	    - ES2015以前
	    - ES2015以後
    - [コラム] クラスは関数の一種
	- typeof の結果はfunctionです
	- また関数として呼び出せません。また詳しくは解説しませんが、手順は複雑ですが`Reflect`メソッドや`prototype`オブジェクトを使うことでクラスと同等のことを関数で表現できます。
	- そのため、`class`で宣言したクラスは一種の関数であると言えます。
	- そのため、`class`は関数でクラスを表現するために用意された糖衣構文(Syntax Suger)と呼ばれることがあります。
    - 継承
	    - 具体例: EventとSquare
	    - super
	    - instanceof
	    - カスタムクラス
	    - ネイティブクラス
		    - Error, HTMLElement
    - 静的メソッド
	    - `of`や`from`
- 発展的利用方法
	- classは値
	- mixin
	- multiple extends
- 将来の発展性についてを軽く触れる
    - [コラム] minimal maximal
    - Symbol
    - Public Field
    - Private
    - これらの拡張の基盤について
- 未使用
	- `[prop]()`で定義できるよという話
		- Symbolとの併せわざ
	- オブジェクトにもgetterやsetterがあるよ
	- `Object.freeze`でのimmutable class



----


## サンプル

- 状態を持つクラス
- Point
	- クラス
- Counter
- 継承の例
	- EventEmitter
		- DOMはEventTarget、NodeはEventEmitter
		- https://github.com/mysticatea/event-target-shim
		- https://blog.jxck.io/entries/2017-07-10/subclassible-eventtarget.html
	- Square
- 継承の場合
	- 次のパターンは省略可能であるという話
	- EventEmitter

```js
constructor(...args){
 super(...args);
}
```

- 静的メソッドの例
	- `of`や`from`を持つ例
	- `ArrayLike#of`


-----

# ノート

## `class`のコンストラクタ関数が呼び出せない理由

```js
class C{}
C(); // => TypeError
```

これって意外にも `[[Call]]` で クラスのコンストラクタ関数は呼び出すと例外を投げるって書いてあるんだ。てっきり定義するときに例外を投げる関数を登録みたいな感じだと思ってた。

- [Runtime Semantics: ClassDefinitionEvaluation](https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation "Runtime Semantics: ClassDefinitionEvaluation")
	- `class`で定義した場合
- [MakeClassConstructor ( F )](https://tc39.github.io/ecma262/#sec-makeclassconstructor "MakeClassConstructor ( F )")
	- このコンストラクタ関数の`[[FunctionKind]]`が`classConstructor`になる
- [`[[Call]] ( thisArgument, argumentsList )`](https://tc39.github.io/ecma262/#sec-ecmascript-function-objects-call-thisargument-argumentslist)
	- `[[FunctionKind]]`が`classConstructor`な関数は`TypeError`を投げる


-----
# 他の書籍

## [Understanding ECMAScript 6](https://leanpub.com/understandinges6/read#leanpub-auto-introducing-javascript-classes "Understanding ECMAScript 6")

- `PersonClass`
- `Rectangle` -> `Square`
	- instanceof

## Exploring JS

- [15. Classes](http://exploringjs.com/es6/ch_classes.html#sec_overview-classes "15. Classes")
- `Point`

## JavaScript本格入門

- `Area`
- `Member`
	- 継承 `BussinessMember`

## Refactoring JavaScript

> Why Do Some People Hate Classes?

Mutateや意図しないネストのextendsを加速させるから

```
class Dog extends (Animal, Barky, Bitey) { };
```

はできないという話


- `class JapaneseWord extends Word{}`


protototyep note

- There’s a “nonstandard” yet popular alternative to Object.getProto-typeOf(thing), which you use like this: thing.__proto__.•Object.getPrototypeOf has the alias Reflect.getPrototypeOf.
- There’s another prototype inspection attribute that you can use like this:thing.prototype. It’s super unreliable.
- Partly because there’s so much nonsense and inconsistency around pro-totypes, when people talk about the “real, true, deep-down” prototype ofsomething, they’ll use syntax like [[Prototype]] to indicate they meanthe real prototype, as opposed to the five ways of actually interrogatingan object.



## 初めてのJavaScript


- `Car`
- getter/setter
	- 本当の制御はWeakMapで
- StaticメソッドはID生成の例

```
let _id = 0;
class Car { static createUUID(){ return _id++ } }
Car.createUUID()
```


- 継承 `Vehicle` -> `Car`