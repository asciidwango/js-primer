


# 関数オブジェクトとthis

目的: 関数のメソッドについてを紹介
目的: thisについてを紹介

## もっと具体的な目標

- 関数の定義方法の振り返り
	- function宣言、function式、Arrow Function
	- nameの関係
- `this`の動きについてを理解する
	- どういうときに使われ、どういう動きをするのか
- 特殊な`this`動きを関数として回避する方法について
	- `var that = this`とArrow Functionon

	- メソッドとしてのcall/apply/bindについて

## 書かないこと

- newとthisの関係 => クラス
- Promiseとthis?
- jQuery、Vue

## アウトライン


- 関数はオブジェクトです。`Function`オブジェクト
- オブジェクトの中で呼び出せるものを関数と読んでいる
- しかし、`typeof`はfunctionであるため関数がオブジェクトであることは。強く意識する必要はありません。
- 文字列や配列のように`Function`オブジェクトだけが持つメソッドやプロパティについて紹介
- また、その中でも`bind`、`call`、`apply`メソッドに関連する`this`というキーワードについてを紹介します。
- プロパティ
	- `Function.name`
- メソッド
	- `toString`
- [コラム] リフレクションはproductionで使えない
	- あくまでデバッグ用
	- [Function.name - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/name "Function.name - JavaScript | MDN")
- this
	- thisとはなにか
	- Arrow FunctionとFunction式による違い
	- thisのサンプル
- `apply`
- `bind`
- `call`
- 関数という話
	- Function定義
	- メソッド定義はFunction定義
	- Arrow Function定義
	- メソッド定義のArrow Function
	- getter/setter
- thisという話
	- ThisModeという視点だと`this`は三種類
		- `global` = undefined
		- `strict` = dynamic
		- `lexical` = Arrow Function
	- thisは特別なキーワード
	- thisとクラス
	- thisは暗黙的
	- thisは暗黙的だから使う
	- thisとFunctionキーワード
	- thisとArrow Function
	- thisを決めて関数を呼ぶ
		- call
		- apply
		- 3rd arguments(Array系))
		- bind
		- `this`はこの影響を受けない
			- `If thisMode is lexical, return NormalCompletion(undefined).`という回避ステップがある
- 未使用
	- getter/setterについて


## 開眼JavaScriptの`this`の章

開眼JavaScript

- this とは何か、および this は何を参照するか
	- `obj.method` を `this.method`に置き換える例
	- `this`は混乱する
	- new、call,apply,bindは別
- this の値はどのように決められるのか?
	- コンテキストに基づく
- 入れ子関数内では、this は グローバルオブジェクトを参照する
	- ES5で直るパターン
- 入れ子関数内で this を見失う問題を スコープチェーンを使って回避する
	- `var that = this`
- call() や apply() を使って this の値を コントロールする
- this キーワードをユーザ定義の コンストラクタ関数で使う
	- newは特別
- プロトタイプメソッド内の this は 生成されるインスタンスを参照する

## ['this' in TypeScript · Microsoft/TypeScript Wiki](https://github.com/Microsoft/TypeScript/wiki/'this'-in-TypeScript "&#39;this&#39; in TypeScript · Microsoft/TypeScript Wiki")

- `this`がどのような問題を持っているか
- その問題となる実例
	- Event Listener
	- コールバック
	- オプションオブジェクト
	- Promiseなど
- その中でも特に間違いが多いRed Flagsの例
	- 代入
	- イベント
- 問題の解決方法について
	- public method = () => {}
	- local () => {}
	- Function bind

## [This in JavaScript | Zell Liew](https://zellwk.com/blog/this/ "This in JavaScript | Zell Liew")

- コンテキストに基づく`this`の動きについて

----

## `this` in the future

個人の感想としては関数(`function`)やオブジェクトのメソッドにおいて`this`を積極的に利用する理由はあまりないと考える。
引数を一つ省略出来るという見た目上の美しさがありデザインパターンとして使われることがあるが、それ以上にthisは動的かつ暗黙的だから難しくなるためである。
この書籍では、芸術的に書くよりも読んで分かる書いても分かるものを目指すべきである。

- https://github.com/tc39/proposal-bind-operator
- `this`のダイナミックさを最大限活用しようとしたProposal
- https://github.com/tc39/proposal-pipeline-operator
- 一方のpipeline operatorは`this`がない

