# `class`のアウトライン

## 目的

- `class`の基本的な文法についてを学ぶ
    - コンストラクタ
	    - `new`で呼ぶことが前提の関数のこと
	    - 実際に`typeof`は`function`
	    - しかし `[[Call]]`はできないように仕様で規定されている
    - new
    - メソッド
        - インスタンスメソッド
	        - Computed Varibale
        - getter/setter
    - prototype
    - 継承
	    - super
	    - multiple extends
	    - カスタムクラス
	    - ネイティブクラス
		    - Error, HTMLElement
    - mixin
    - 静的メソッド
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
- Person
- Counter
- EventEmitter
- EventEmitterの継承


-----

## [Understanding ECMAScript 6](https://leanpub.com/understandinges6/read#leanpub-auto-introducing-javascript-classes "Understanding ECMAScript 6")

- 最初から最後まで`PersonClass`

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