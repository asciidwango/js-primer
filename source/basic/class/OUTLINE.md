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
		- Computed Varibale
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
- 発展的利用方法
	- classは値
	- mixin
	- multiple extends
	- 列挙
- 将来の発展性についてを軽く触れる
    - [コラム] minimal maximal
    - Symbol
    - Public Field
    - Private
    - これらの拡張の基盤について

### 触れないこと

- OOPとしてのクラス
	- いわゆるデザインパターンを目的とた話
- メタ
	- enumerable
	- configurable

----

## サンプル

- 状態を持つクラス
- Point
	- クラス
- Counter
- EventEmitter
	- 継承の例
	- DOMはEventTarget、NodeはEventEmitter
	- https://github.com/mysticatea/event-target-shim
	- https://blog.jxck.io/entries/2017-07-10/subclassible-eventtarget.html
- Person


-----

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