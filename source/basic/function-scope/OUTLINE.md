# 関数とスコープ

- スコープ
- Next: this

## アウトライン


- @機能 関数はスコープを作り出します
- @目的 スコープを賢く使うことで読みやすいコードを書くことができ、また意図しないコードを減らせることを学ぶ
- スコープとはどのようなものか
	- @提起 スコープと変数宣言には大きな関連があります。 
	- @理由 なぜなら`let`や`const`、`function`文などはすべてそのスコープへ変数を宣言して値を関連付けるためです
	- @命名 関数などでブロックを使っているこれがいわゆるスコープ
	- @事実 スコープの中にある変数は外からアクセスできない
	- @事実 引数はスコープの中にある変数なので外からはアクセスできない
	- @事実 逆にスコープの中から外にある変数へアクセスすることはできる
	- @関連 スコープと変数宣言
- スコープと変数の生存期間
	- @疑問 スコープを抜けた場合にすぐに変数が消滅している?
	- @反例

```js
function createObj(){
	const inner = {};
	return inner;
}
// スコープを抜けた後も`inner`の変数は生きている?
const obj = createObj();
console.log(obj);// => {}
```

	- @事実 一つの変数が複数のスコープに紐づくことがある
- @誤解 スコープの中にある変数は、その関数が終了したから消えるわけではない。
- @詳細 アクセスがなくなったときに初めて消える = ガーベージコレクション
	- @確認 ガーベージコレクションは仕様ではどのような表現?
- @分類 静的なスコープと動的なスコープ
	- ある変数がどのスコープにあるのかは見て分かる
	- スコープには関数スコープ、catchのスコープなど何種類化ある
	- 基本的には `{ }` で囲まれたブロック
	- スコープにLexiacal Envという変数が作成され、変数はこのEnvに紐付けられる
	- 静的なスコープ
		- functionや
	- @http//azu.github.io/annotation-memo/es6-draft/
		- 動的なスコープ
				- withとeval
				- [JS scope: static, dynamic, and runtime-augmented – codeburst](https://codeburst.io/js-scope-static-dynamic-and-runtime-augmented-5abfee6223fe "JS scope: static, dynamic, and runtime-augmented – codeburst")
- @分類 グローバルスコープ
	- @目的 グローバルスコープとはすべての関数で共有されているスコープということを理解する
		- 多用するべきではない点についてはコラムで扱う
	- 別名は大域スコープ
	- グローバルスコープとは何か?
	- 暗黙的に生成されるスコープで、プログラム直下はグローバルスコープである
	- グローバルスコープはすべてのスコープで共有する変数が扱われる
	- 少しでもグローバルスコープは減らしたほうがいい
	- ならなら関数の中で未定義であっても、グローバルスコープに定義されているなら参照できるため
	- うっかりミスで例外がでないけどなぜか動いているというコードがつくらてしまう。
	- global
	- [x] 確認: 仕様ではどのような言及
	- https://tc39.github.io/ecma262/#sec-global-environment-records
- @分類 ブロックスコープ
- @機能 スコープチェイン
- @名前解決 スコープ間で同じ変数の定義とshadowing
- @コラム スコープは小さく、変数の影響範囲は小さく
	- @具体例 swithchをスコープに閉じ込めて結果だけを取り返す方法
	- 変数を不用意にグローバルに書いてしまうと影響範囲がお多い
	- そのため必要なスコープで必要な変数を定義する
	- 複数のスコープで共有する変数は?
		- => いわゆるデザインパターンの世界
	- 必要なスコープで必要な変数を定義する
- @活用 クロージャー
	- @構成要素
		- 変数とスコープの生存期間
		- スコープチェイン
		- 静的なスコープ
	- 変数の生きてる例
	- クロージャーはファクトリと言えそう
		- <http://www.sbcr.jp/products/4797388640.html>
	- @応用 ファクトリをその場で作って定義は捨てるIIFE
	- @具体的 正規表現の初期化コスト
- [コラム] hoistingについて
	- `var`のhoisting
	- `function`宣言と`const fn = function`の違い
	- TDZについて
- 未使用
	- 参照できない変数を参照した時のエラー

**Note**:

スコープの説明パターン

- コードで説明する
	- 初めてのJavaScript
- 図で説明する
	- JavaScript本格入門
	- [You-Dont-Know-JS/ch1.md at 31e1d4ff600d88cc2ce243903ab8a3a9d15cce15 · getify/You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS/blob/31e1d4ff600d88cc2ce243903ab8a3a9d15cce15/scope%20%26%20closures/ch1.md "You-Dont-Know-JS/ch1.md at 31e1d4ff600d88cc2ce243903ab8a3a9d15cce15 · getify/You-Dont-Know-JS")
- 擬似コードで説明する
	- 仕様をコードにする


## 関数とスコープ: 序文: なぜスコープは大事？

- スコープと名前解決
		- プログラミングで重要な概念は値を変数に保存して、必要なときに取り出して使うことです
		- 関数も値であるので、関数を変数に保存して、必要な処理を再利用できます
		- しかし変数は同じ名前をスコープに宣言することはできません
		- 何かアプリケーションを作成する際に、あらゆるところから取り出す必要がある値よりも一時的な値、つまり一時的な変数の方が多いです
		- つまり、ひとつのグローバルスコープへすべての変数を定義する必要性はありません
		- むしろ変数は必要なスコープの中でのみ扱い、その中で完結することが見た目どおりのコードへつながります
- 関数とプログラミング
		- 関数を使わなくてもプログラミングはできます
		- 多くのプログラミング言語は人間が書くために作られたものです
		- すべての処理を関数を使わずに書くこともできその処理結果は同等です
		- しかし次のように関数を使うことで人間が読んで分かるコードを書きやすくなる


## 関数とスコープ: 未使用

- スコープは**静的**に決定される
	- そのため見た目よりははるかに分かりやすい
	- 開眼JavaScript参照
	- スコープチェインの参照は動的(実行時に)おこなわれる
- クロージャー
	- クロージャを一言で表すと「スコープチェーンに存在する変数への参照を(囲い込んで)保持している関数」と言えます。
	- 開眼JavaScript参照
- ScopeとEnviroment
	- scopeによって定義されたenviroment
	- EnvironmentはRecordから構成される
	- inner env -> outer envによりスコープチェインという現象が起きる
	- <https://tc39.github.io/ecma262/#sec-lexical-environments>
- Scope chain
	- https://tc39.github.io/ecma262/#sec-newdeclarativeenvironment
	- スコープを作成するときにouter lexicale envへのリファレンスを
- A global environment is a Lexical Environment
	- GlobalもLexicalの一種
	- globalはouterがnull
- Envの種類
	- <https://tc39.github.io/ecma262/#table-23>
	- LexicalEnv
		- letやconst、classはこちらに登録する
		- https://tc39.github.io/ecma262/#sec-let-and-const-declarations
	- VariableEnv
		- varはこちらに登録する
		- https://tc39.github.io/ecma262/#sec-variable-statement
	- この２つのenvは同じことがあり、実行Contextに紐づく
- module environment もあるよ
	- module envはglobal envとなることがある
- function environment は`this`の新しいバインディングを作成する
- GlobalとLocal Scope?
	- Localという言葉を使うことでの矛盾が起きるかどうか
	- 仕様ではLocalはない、Globalはある
	- lexical scopeという分類のうち、色々あるという体後
	- var 命令を使わずに宣言された変数はすべてグローバル変数と見なす
- Global scopeのメタファ
	- https://github.com/getify/You-Dont-Know-JS/blob/31e1d4ff600d88cc2ce243903ab8a3a9d15cce15/scope%20%26%20closures/ch1.md#building-on-metaphors

擬似コードでのスコープ

```js
const globalScope = {
		outer: null, // <= globalより外側のスコープはないためnull
		envRec: new Map(), // <= envRecはスコープ毎に作られる
};
// globalスコープには`outer`変数が定義されていり
// 変数はglobalスコープのenvRecに記録される
globalScope.envRec.set("outer", "out");

// function宣言により関数fnのスコープを作成する
const fnScope = {
		outer: globalScope, // <= 現在の実装スコープ = globalScope
		envRec: new Map() // <= envRecはスコープ毎に作られる
		// Object.create(null) = arguments
		// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
};
// function fnの中の変数処理
// `arg` 仮引数はfnScopeのenvRecに記録される
fnScope.envRec.set("arg", 1);
// 関数スコープ内で宣言された`inter`変数もfnScopeのenvRecにされる
fnScope.envRec.set("inter", "in");
// fnScopeのなかで`outer`変数を参照する
// この時のcurrentScopeはfnScope
getValue("outer", fnScope);

function getValue(variableName, currentScope) {
		if (!currentScope) {
				throw new Error(`変数:${variableName}は定義されていません`);
		}
		// 現在のScopeのenvRecに変数が定義されているならそのenvRecから取り出す
		if (currentScope.envRec.has(variableName)) {
				return currentScope.envRec.get(variableName);
		} else {
				// ない場合は、outerのscopeに訪ねに行く
				return getValue(variableName, currentScope.outer);
		}
}
```

## Arrow Functionとthis

- Arrow Functionでは`this`が`[[ThisMode]]`が`lexical`になる
- https://tc39.github.io/ecma262/#sec-functioninitialize
- lexicalではもっとも近いfunctionを参照するようになる = 


-----

## スコープとは何?

- @目的 コードとしては見えないがスコープとは何かを身近な例を元に理解する
- スコープは暗黙的に作られれるが意識すればスコープはわかる
	- なぜなぜ暗黙的な変換などと違いスコープは静的に決定されるため
- @関数 最も身近に見ることができるスコープは関数のスコープです。
- @スコープ この関数の`{`と`}`ブロックを使っているのがスコープ
- @変数 スコープは変数の名前を解決するプロセスと大きく関わります
- @具体例 関数は宣言するとスコープを作成するため、スコープの中と外で変数の名前を解決できる範囲がことなります。
		- スコープの中から外の変数は参照できる
		- 一方スコープの外から中にある変数は参照できません
		- 同じスコープに同じ名前の変数は宣言できません


```js
function fn() {
		const x = 1;
		console.log(x); // => 1
}
console.log(x); // => ReferenceError: x is not defined

```

```js
const x = 1;
const x = 2;
```

- 目的スコープとはそもそもどういうものなのかを解説する
- スコープにはいくつか種類があります
- 最も身近なスコープは関数スコープです
- 変数を宣言した時、変数名とその変数の値は今いるスコープに紐付けられます。
- 具体的な次のコードの `x` は 関数 `a` に紐付いた変数として宣言されています。
- そのため、関数 `a` の外側(のスコープ)からは 変数 `x` を参照することはできません。
	- 具体的なコード
- 別の読み方をしてみましょう。
- letやconstで宣言した変数名は1つのスコープないでは１つのみです



## ブロックスコープ

- @目的 ブロックにもスコープがあることを知る
- 関数スコープは関数によるスコープですが、`{`と`}`で囲んだブロックもスコープを作成します。（「文と式」を参照）
- @具体例 ブロックの内側で宣言した変数はブロックの外側から参照できません
- ブロックは `if文` や `for文` なども同様です
- @具体例 for文は変数の宣言とブロックを同時に扱うため少し特殊に見えますが、iterationごとに新しいブロックをスコープを作り出します。
- Note: letとforのスコープはIterateごとに新しく作られる
	- [9. Variables and scoping](http://exploringjs.com/es6/ch_variables.html#sec_let-const-loop-heads "9. Variables and scoping")
	- [CreatePerIterationEnvironment](http://www.ecma-international.org/ecma-262/6.0/#sec-createperiterationenvironment "CreatePerIterationEnvironment")

## スコープチェイン

- @目的 スコープがネストした時の名前解決について学ぶ
- @事実 関数スコープ、ブロックスコープで既に分かるかもしれませんが、スコープはネストできます
- スコープが別々ではなくスコープが入れ子となった場合の同じ名前には最も近い内側のスコープにある変数の名前を解決します。
- スコープがネストした時、変数の名前解決は現在いる位置のスコープから順番に外側のスコープかを確認していきます。
- @具体例 外側のスコープに変数定義が存在するケース(参照できる)
- @具体例 外側のスコープにも変数定義が存在しないケース(ReferenceError)
- @命名 この仕組みスコープチェーンと呼ばれています。以前オブジェクトで紹介したプロトタイプチェーンとよく似た仕組みと言えます。
- ネストしたスコープで同じ名前の変数が定義されていた場合も内側から外側のスコープへと順番に確認していきます。
- 異なるスコープ または `let` or `const` で宣言した変数でなければ同じ名前の変数を定義することができます。
- @具体例 外側のスコープと同じ名前で定義した場合のコード例
	- `name`という変数を定義した例
	- Notes: ビルトインオブジェクトについてはグローバルスコープで話す
- Notes:
	- 唯一の違いは、プロトタイプチェーンはオブジェクトのプロパティであるため、該当結果がない場合はundefineを返します。一方スコープチェーンの名前解決結果で該当結果がない場合は`ReferenceError: x is not defined`のようにReferenceErrorが発生します。


## グローバルスコープ

- @目的 グローバルスコープは暗黙的に存在し強力だが、強くは依存していはいけないことを知る
- @事実 グローバルスコープとはプログラム直下の暗黙的に作られているスコープのこと
- @事実 グローバルスコープに定義された変数はどのスコープからも参照できる
- @問題 グローバルスコープにはJavaScriptのビルトインオブジェクトがあり実行環境が定義する様々な関数や値が定義されています。
- @問題 グローバル変数がビルトインオブジェクトと同じ名前で定義してしまうと、そのスコープではビルトインオブジェクトへアクセスすることができなくなります。
- @具体例 `URL`の再定義
- グローバル変数とビルトインオブジェクト
- @解決 グローバル変数の利用を極力抑えることがこの問題の解決方法の一つです。
- @具体例 例えばグローバルに置く変数をオブジェクトとしてまとめたり、関数を使ってグローバルに直接変数を定義しなくすることが有用です。
- @具体例 ???
- @コラム モジュールとモジュールスコープ
	- 実践的にはJavaScriptのモジュールにも関数と同様にモジュールスコープが存在します。
	- モジュール直下に定義された変数はexportしない限り他のモジュールからは参照できません。
	- つまりモジュールスコープに変数を定義すればグローバル変数はないということです。
	- そのため、関数などの処理をモジュールに分けていくことで自然とグローバル変数の利用は減っていきます。
- 未使用:
	- グローバルスコープの反対はローカルスコープと言われることがあります
	- ローカルスコープはグローバルスコープ以外のスコープなので関数、ブロックなど
- Note: グローバル変数とビルトインオブジェクト
	- グローバルオブジェクトのプロパティがグローバル変数のこと
	- ビルトインオブジェクトのプロパティがparseIntなどホスト環境が定義しているものがあり様々
	- どちらもグローバルスコープにあり、`x` という名前を解決するときにグローバル変数が優先して解決される
	- そのため、ビルトインオブジェクトと同じ名前のグローバル変数を定義すると、そのプログラムでビルトインオブジェクトを使うことができなくなる
	- グローバル変数の定義
		- varはglobal objectのプロパティで
		- let constはグローバルスコープの変数定義
		- current -> module variable -> global variable -> global object -> built-in object で解決される
		- [9. Variables and scoping](http://exploringjs.com/es6/ch_variables.html#sect_global-object "9. Variables and scoping")
	- `URL`などをグローバル変数として定義すると悲惨なことになる

```js
const a = 2;
window.a = 1;
console.log(a) // => 2
```

- 未使用
	- @問題 どこからでも参照できるということは便利では、一方ではグローバル変数の乱用は不必要な依存性を作り出してしまいます。
	- @具体例 


----

## [コラム] スコープを小さく

- スコープを小さく書くことで何が良くなるのかを例題から学ぶ
- グローバル変数に限らす変数のスコープを小さくすることはいいこと
- モジュールもモジュールのスコープを持つため、モジュールに分けることもスコープを小さくすることにつながる

```
var 消費税 = 0.8;
function multiple(){
	return x * 消費税;
}
function add(){

}
```


不要な一時的な変数をグローバル変数にするのを避ける

```js
// before
const start = Date.now();
task();
const end = Date.now();
console.log(end - start);

// after
function doTask(callback){
	const start = Date.now();
	callback();
	return Date.now() - start;
}
doTask(task);
```

一度しか実行できない関数(クロージャが必要)

```js
// Before: グローバルにsubmmitedというフラグが見えている
let submmitted = false
function submit(data){
	if(submitted){
		return
	}
	// ... データを処理 ...
	submmitted = true;
}
```