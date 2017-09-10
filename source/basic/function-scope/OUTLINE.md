# 関数とスコープ

- スコープ
- Next: this

## アウトライン


- 機能: 関数はスコープを作り出します
- 目的: スコープを賢く使うことで読みやすいコードを書くことができ、また意図しないコードを減らせる
- スコープとはどのようなものか
	- 命名：関数などでブロックを使っているこれがいわゆるスコープ
	- 名前解決: スコープの中にある変数は外からアクセスできない
	- 引数はスコープの中にある変数?なので外からはアクセスできない
	- 機能: 逆にスコープの中から外にある変数へアクセスすることはできる
- スコープと変数の生存期間
	- 一つの変数が複数のスコープに紐づくことがある
- 具体例: swithchをスコープに閉じ込めて結果だけを取り返す方法
- 誤解: スコープの中にある変数は、その関数が終了したから消えるわけではない。
- 詳細: アクセスがなくなったときに初めて消える = ガーベージコレクション
	- 確認: ガーベージコレクションは仕様ではどのような表現?
- 分類: 静的なスコープと動的なスコープ
	- ある変数がどのスコープにあるのかは見て分かる
	- スコープには関数スコープ、catchのスコープなど何種類化ある
	- 基本的には `{ }` で囲まれたブロック
	- スコープにLexiacal Envという変数が作成され、変数はこのEnvに紐付けられる
	- 静的なスコープ
		- functionや
	- http://azu.github.io/annotation-memo/es6-draft/
    - 動的なスコープ
        - withとeval
        - [JS scope: static, dynamic, and runtime-augmented – codeburst](https://codeburst.io/js-scope-static-dynamic-and-runtime-augmented-5abfee6223fe "JS scope: static, dynamic, and runtime-augmented – codeburst")
- 関連: スコープと変数宣言
	- スコープと変数宣言には大きな関連があります。
	- なぜなら`let`や`const`、`function`文などはすべてそのスコープへ変数を宣言して値を関連付けるたです
- 分類: グローバルスコープ
	- global
	- [x] 確認: 仕様ではどのような言及
	- https://tc39.github.io/ecma262/#sec-global-environment-records
- 分類: ブロックスコープ
- 機能: スコープチェイン
- 名前解決: スコープ間で同じ変数の定義とshadowing
- [コラム] スコープは小さく、変数の影響範囲は小さく
	- 変数を不用意にグローバルに書いてしまうと影響範囲がお多い
	- そのため必要なスコープで必要な変数を定義する
	- 複数のスコープで共有する変数は?
		- => いわゆるデザインパターンの世界
	- 必要なスコープで必要な変数を定義する
- 活用: クロージャー
	- 変数の生きてる例
	- クロージャーはファクトリと言えるかも
		- <http://www.sbcr.jp/products/4797388640.html>
	- ファクトリをその場で作って定義は捨てるIIFE
	- 正規表現の初期化
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

- 目的: コードとしては見えないがスコープとは何かを身近な例を元に理解する
- スコープは暗黙的に作られれるが意識すればスコープはわかる
	- なぜなぜ暗黙的な変換などと違いスコープは静的に決定されるため
- 関数: 最も身近に見ることができるスコープは関数のスコープです。
- スコープ: この関数の`{`と`}`ブロックを使っているのがスコープ
- 変数: スコープは変数の名前を解決するプロセスと大きく関わります
- 具体例: 関数は宣言するとスコープを作成するため、スコープの中と外で変数の名前を解決できる範囲がことなります。
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
- 