---
author: azu
description: "JavaScriptチートシート"
---

<!-- load script -->

<script type="text/javascript">
function loadExt(e,t){var s=this;s.files=e,s.js=[],s.head=document.getElementsByTagName("head")[0],s.after=t||function(){},s.loadStyle=function(e){var t=document.createElement("link");t.rel="stylesheet",t.type="text/css",t.href=e,s.head.appendChild(t)},s.loadScript=function(e){var t=document.createElement("script");t.type="text/javascript",t.src=s.js[e];var a=function(){++e<s.js.length?s.loadScript(e):s.after()};t.onload=function(){a()},s.head.appendChild(t)};for(var a=0;a<s.files.length;a++)/\.js$/.test(s.files[a])&&s.js.push(s.files[a]),/\.css$/.test(s.files[a])&&s.loadStyle(s.files[a]);s.js.length>0?s.loadScript(0):s.after()}

function highlightCheetsheetCodes() {
    document.querySelectorAll('.markdown-section table td:first-child code').forEach(function(block){
        block.classList.add("javascript");
        hljs.highlightBlock(block);
    });   
}
function loadSyntaxHighlight(){
  var files = [
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/default.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js",
  ];
  if (typeof hljs === "undefined") {
    new loadExt(files, function(){
      highlightCheetsheetCodes();
    });
  } else {
    highlightCheetsheetCodes();
  }
}
document.addEventListener('DOMContentLoaded', function(){
    loadSyntaxHighlight();
});
typeof gitbook === "object" && gitbook.events.one("page.change", function() {
    loadSyntaxHighlight();
});
</script>

<style>
.s4::after {
    content: "    ";
    white-space: pre;
}
.markdown-section table td:first-child {
}
.markdown-section table td:first-child code {
    white-space: pre;
    display: inline-block;
    padding: .1em;
    border-radius: .3em;
    background: #fafafa;
}
</style>

# 付録: JavaScriptチートシート {#cheet-sheet}

JavaScriptの言語機能に関するチートシートです。

- 言語機能
    - [コメント](#comments)
    - [データ](#data-structures)
    - [リテラル](#literal)
    - [文字列](#string)
    - [データアクセス](#data-access)
    - [演算子](#operator)
    - [関数と挙動](#function-behavior)
    - [コントロールフロー](#control-flow)
    - [モジュール](#module)
    - [その他](#miscellaneous)
- ガイド
    - [プロジェクト構造](#project-anatomy)

## 言語機能 {#language-feature}

### コメント {#comments}

コメントの書き方について。

| コード例 | 説明 | 解説 |
|---------|-------------|-------------|
| `// xxx` | 一行コメント | [コメント][] |
| `/* xxx */` | 複数行コメント | [コメント][] |
| `<!-- xxx -->` | [ES2015] HTML-likeコメント | [コメント][] |


### データ構造 {#data-structures}

変数宣言について。

| コード例 | 説明 | 解説 |
|---------|-------------|-------------|
| `const x` | [ES2015] **変数宣言**。`x`に値の再代入はできない | [変数と宣言][] |
| `let x` | [ES2015] **変数宣言**。`const`と似ているが、`x`に値を再代入できる | [変数と宣言][] |
| `var x` | **変数宣言**。レガシーな変数宣言方法 | [変数と宣言][] |

### リテラル {#literal}

データ構造を表現するリテラルについて。

| コード例 | 説明 | 解説 |
|---------|-------------|-------------|
| `true` または `false` | **真偽値** | [データ型とリテラル][] | 
| `123` | **10進数**の整数リテラル | [データ型とリテラル][] | 
| `0b10` | [ES2015] **2進数**の整数リテラル | [データ型とリテラル][] | 
| `0o777` | [ES2015] **8進数**の整数リテラル | [データ型とリテラル][] | 
| `0x30A2` | **16進数**の整数リテラル | [データ型とリテラル][] | 
| `{ k: v }` | プロパティ名が`k`、プロパティの値が`v`の**オブジェクト**を作成 | [オブジェクト][] |
| <i class="s4"></i> `{ n }` | [ES2015] プロパティ名が`n`、プロパティの値が`n`の**オブジェクト**を作成 | [オブジェクト][] |
| `[x, y]` | `x`と`y`を初期値にもつ**配列オブジェクト**を作成 | [配列][] |
| `/pattern/` | `pattern`をもつ**正規表現オブジェクト**を作成 | [文字列][] |
| `null` | `null`値 | [データ型とリテラル][] |

### 文字列 {#string}

文字列について。

| コード例 | 説明 | 解説 |
|---------|-------------|-------------|
| `"xxx"` | ダブルクオートの**文字列リテラル**。改行などは`\`と特定の文字を組み合わせたエスケープシーケンスとして表現します。 | [文字列][] |
| `'xxx'` | シングルクオートの**文字列リテラル**。`"xxx"`と意味は同じ。 | [文字列][] |
| `` `xxx` `` | [ES2015] テンプレート文字列リテラル。改行を含んだ入力が可能 | [文字列][] |
| <i class="s4"></i> `` `${x}` `` | [ES2015] テンプレート文字列リテラル中の変数`x`の値を展開する | [文字列][] |

### データアクセス {#data-access}

データへのアクセスについて。

| コード例 | 説明 | 解説 |
|---------|-------------|-------------|
| `array[0]`| 配列への**インデックスアクセス** | [配列][] |
| `obj["x"]`| オブジェクトへの**プロパティアクセス**（ブラケット記法） | [オブジェクト][] |
| `obj.x`| オブジェクトへの**プロパティアクセス**（ドット記法） | [オブジェクト][] |
| `const { x } = obj;`| [ES2015] オブジェクトの**分割代入** | [オブジェクト][] |
| `const [ x ] = array;`| [ES2015] 配列の**分割代入** | [配列][] |
| `f(...array)`| [ES2015] **Spread構文**での配列の展開 | [配列][] |
| `f({ ...obj })`| [ES2018] **Spread構文**でのオブジェクトの展開 | [オブジェクト][] |

### 演算子 {#operator}

演算子について。


| コード例 | 説明 | 解説 |
|---------|-------------|-------------|
| `+` | プラス演算子、文字列結合演算子 | [演算子][] |
| `-` | マイナス演算子 | [演算子][] |
| `*` | 乗算演算子 | [演算子][] |
| `/` | 除算演算子 | [演算子][] |
| `%` | 剰余演算子 | [演算子][] |
| `**` | [ES2016] べき乗演算子 | [演算子][] |
| `++` | インクリメント演算子 | [演算子][] |
| `--` | デクリメント演算子 | [演算子][] |
| `===` | 厳密等価演算子 | [演算子][] |
| `!==` | 厳密不等価演算子 | [演算子][] |
| `==` | 等価演算子 | [演算子][] |
| `!=` | 不等価演算子 | [演算子][] |
| `>` | 大なり演算子/より大きい | [演算子][] |
| `>=` | 大なりイコール演算子/以上 | [演算子][] |
| `<` | 小なり演算子/より小さい | [演算子][] |
| `<=` | 小なりイコール演算子/以下 | [演算子][] |
| `&` | ビット論理積 | [演算子][] |
| <code>&#x7C;</code> | ビット論理和 | [演算子][] |
| `^` | ビット排他的論理和 | [演算子][] |
| `~` | ビット否定 | [演算子][] |
| `<<` | 左シフト演算子 | [演算子][] |
| `>>` | 右シフト演算子 | [演算子][] |
| `>>>` | ゼロ埋め右シフト演算子 | [演算子][] |
| `&&` | AND演算子 | [演算子][] |
| <code>&#x7C;&#x7C;</code> | OR演算子 | [演算子][] |
| `(x)` | グループ演算子 | [演算子][] |
| `x, y` | カンマ演算子 | [演算子][] |

### 関数と挙動 {#function-behavior}

関数の定義と挙動について。

<!-- textlint-disable no-js-function-paren -->

| サンプル | 説明 | 解説 |
|---------|-------------|-------------|
| `function f(){}` | **関数**宣言 | [関数と宣言][] |
| `const f = function(){};` | **関数**式 | [関数と宣言][] |
| `const f = () => {};` | [ES2015] **Arrow Function**の宣言 | [関数と宣言][] |
| `async function f(){}` | [ES2017] **Async Function**の宣言 | [非同期処理][] |
| <i class="s4"></i> `const f = async function(){};` | [ES2017] 関数式を使った**Async Function**の宣言 | [非同期処理][] |
| <i class="s4"></i> `const f = async () => {};` | [ES2017] Arrow Functionを使った**Async Function**の宣言 | [非同期処理][] |
| `function f(x, y){}` | 関数における仮引数の宣言 |  [関数と宣言][] |
| <i class="s4"></i> `function f(x = 1, y = 2){}` | **デフォルト引数**、引数が渡されていない場合の初期値を指定する。 |  [関数と宣言][] |
| <i class="s4"></i> `function f([x, y]){}` | [ES2015] 関数の引数における配列の**分割代入**。引数の配列からインデックスが`0`の値を`x`に、インデックスが`1`の値を`y`に代入する。 |  [関数と宣言][] |
| <i class="s4"></i> `function f({ x, y }){}` | [ES2015] 関数の引数におけるオブジェクトの**分割代入**。引数のオブジェクトから`x`と`y`プロパティを受け取る。 |  [関数と宣言][] |
| <i class="s4"></i> `function f(...args)){}` | [ES2015] **可変長引数**/**Rest parameters**。引数に渡された値を配列として受け取る |  [関数と宣言][] |
| `const o = { method: function(){} };` | **メソッド定義** | [関数と宣言][] |
| `const o = { method(){} };` | [ES2015] **メソッド定義**の短縮記法 | [関数と宣言][] |
| `class X{}` | [ES2015] **クラス**宣言 | [クラス][] |
| `const X = class X{};` | [ES2015] **クラス**式 | [クラス][] |
| <i class="s4"></i> `class X{ method(){} }` | [ES2015] クラスの**インスタンスメソッド**定義 | [クラス][] |
| <i class="s4"></i> `class X{ get x(){}, set x(v){} }` | [ES2015] クラスの**アクセッサメソッド**の定義 | [クラス][] |
| <i class="s4"></i> `class X{ static method(){} }` | [ES2015] クラスの**静的メソッド**定義 | [クラス][] |
| `class C extends P{}` | [ES2015] クラスの**継承** | [クラス][] |
| <i class="s4"></i> `super` | [ES2015] **親クラス**を参照する | [クラス][] |
| `fn()` | 関数呼び出し | [関数と宣言][] |
| `` fn`xxx` ``  | [ES2015] タグ関数呼び出し | [文字列][] |
| `new X()`  | `new`演算子でのクラス（コンストラクター関数をもつオブジェクト）からインスタンスを作成 | [クラス][] |

<!-- textlint-enable -->

### コントロールフロー {#control-flow}

コントロールフローの制御構文について。

| 例 | 説明 | 解説 |
|---------|-------------|-------------|
| `while(x){}`  | **whileループ**。`x`が`true`なら反復処理を行う | [ループと反復処理][] |
| `do{}while(x);`  | **do...whileループ**。`x`が`true`なら反復処理を行う。`x`に関係なく必ず初回は処理が行われる | [ループと反復処理][] |
| `for(let x=0;x < y ;x++){}`  | **forループ**。`x < y`が`true`なら反復処理を行う | [ループと反復処理][] |
| `for(const p in o){}`  | **for...inループ**。オブジェクト（`o`）のプロパティ(`p`)に対して反復処理を行う | [ループと反復処理][] |
| `for(const x of iter){}`  | [ES2015] **for...ofループ**。イテレータ(`iter`)の反復処理を行う | [ループと反復処理][] |
| `if(x){/*A*/}else{/*B*/}`  | **条件式**。`x`が`true`ならAの処理を、それ以外ならBの処理を行う | [条件分岐][] | 
| `switch(x){case "A":{/*A*/} "B":{/*B*/}}`  | **switch文**。`x`が`"A"`ならAの処理を、"B"ならBの処理を行う | [条件分岐][] | 
| `x ? A: B`  | **条件 （三項） 演算子**。`x`が`true`なら`A`の処理を、それ以外なら`B`の処理を行う | [条件分岐][] |
| `break`  | **break文**。現在の反復処理を終了し、ループから抜け出す。 | [条件分岐][] |
| `continue`  | **continue文**。現在の反復処理を終了し、次のループに行く。 | [条件分岐][] |
| `try{}catch(e){}finally{}`  | `try...catch`構文 | [例外処理][] |
| `throw new Error("xxx")`  | `throw`文 | [例外処理][] |


### モジュール {#module}

ECMAScriptモジュールについて。

| コード | 説明 | 解説 |
|---------|-------------|-------------|
| `import x from "./x.js"` | [ES2015] **デフォルトインポート** | [ECMAScriptモジュール][] |
| `import { x } from "./x.js"` | [ES2015] **名前付きインポート** | [ECMAScriptモジュール][] |
| `import { x as y } from "./x.js"` | [ES2015] 名前付きインポートの**エイリアス** | [ECMAScriptモジュール][] |
| `import * as x from "./x.js"` | [ES2015] **すべての名前付きエクスポートをインポート**してエイリアス | [ECMAScriptモジュール][] |
| `import "./x.js"` | [ES2015] 副作用のための**インポート** |[ECMAScriptモジュール][] |
| `export default x` | [ES2015] **デフォルトエクスポート** | [ECMAScriptモジュール][] |
| `export { x }` | [ES2015] **名前付きエクスポート** | [ECMAScriptモジュール][] |
| `export { x as y }` | [ES2015] 名前付きエクスポートの**エイリアス** | [ECMAScriptモジュール][] |
| `export { x } from "./x.js"` | [ES2015] 名前付きエクスポートの**再エクスポート** | [ECMAScriptモジュール][] |
| `export * from "./x.js"` | [ES2015] すべての名前付きエクスポートの**再エクスポート** | [ECMAScriptモジュール][] |


### その他 {#miscellaneous}

| コード例 | 説明 | 解説 |
|---------|-------------|-------------|
| `x;` | **文** | [文と式][] |
| `{ }` | ブロック文 | [文と式][] |


## ガイド {#guide}

### プロジェクト構造 {#project-anatomy}

JavaScriptにおける基本的なプロジェクトレイアウト、ファイル、フォルダ構造について。

| 名前 | 説明 |
|--------| ---- |
| src/ | プロジェクトのソースコード |
| <s class="s4"></s> index.js | アプリケーションのデフォルトエントリポイント |
| test/ | テストコード。`src/`に対するユニットテストを置くことが多い |
| <s class="s4"></s> index.test.js | アプリケーションのユニットテストファイル。例) `index-test.js`、`indexSpec.js`など |
| node_modules/ | プロジェクトが依存するnpmモジュールのインストール先 |
| package.json | プロジェクトの設定ファイル。名前、説明、スクリプト、依存モジュールなど |
| package-lock.json | npmが扱う依存モジュールのロックファイル |


**参考**

- [Todoアプリ][]

<!-- link -->

[第一部: 基本文法]: ../basic/README.md
[JavaScriptとは]: ../basic/introduction/README.md
[コメント]: ../basic/comments/README.md
[変数と宣言]: ../basic/variables/README.md
[値の評価と表示]: ../basic/read-eval-print/README.md
[データ型とリテラル]: ../basic/data-type/README.md
[演算子]: ../basic/operator/README.md
[暗黙的な型変換]: ../basic/implicit-coercion/README.md
[関数と宣言]: ../basic/function-declaration/README.md
[文と式]: ../basic/statement-expression/README.md
[条件分岐]: ../basic/condition/README.md
[ループと反復処理]: ../basic/loop/README.md
[オブジェクト]: ../basic/object/README.md
[プロトタイプオブジェクト]: ../basic/prototype-object/README.md
[配列]: ../basic/array/README.md
[文字列]: ../basic/string/README.md
[文字列とUnicode]: ../basic/string-unicode/README.md
[ラッパーオブジェクト]: ../basic/wrapper-object/README.md
[関数とスコープ]: ../basic/function-scope/README.md
[関数とthis]: ../basic/function-this/README.md
[クラス]: ../basic/class/README.md
[例外処理]: ../basic/error-try-catch/README.md
[非同期処理]: ../basic/async/README.md
[Map/Set]: ../basic/map-and-set/README.md
[JSON]: ../basic/json/README.md
[Date]: ../basic/date/README.md
[Math]: ../basic/math/README.md
[ECMAScriptモジュール]: ../basic/module/README.md
[ECMAScript]: ../basic/ecmascript/README.md
[第一部: おわりに]: ../basic/other-parts/README.md
[第二部: 応用編（ユースケース）]: ../use-case/README.md
[アプリケーション開発の準備]: ../use-case/setup-local-env/README.md
[Ajaxで通信]: ../use-case/ajaxapp/README.md
[エントリポイント]: ../use-case/ajaxapp/entrypoint/README.md
[HTTP通信]: ../use-case/ajaxapp/http/README.md
[データを表示する]: ../use-case/ajaxapp/display/README.md
[Promiseを活用する]: ../use-case/ajaxapp/promise/README.md
[Node.jsでCLIアプリ]: ../use-case/nodecli/README.md
[Node.jsでHello World]: ../use-case/nodecli/helloworld/README.md
[コマンドライン引数を処理する]: ../use-case/nodecli/argument-parse/README.md
[ファイルを読み込む]: ../use-case/nodecli/read-file/README.md
[MarkdownをHTMLに変換する]: ../use-case/nodecli/md-to-html/README.md
[ユニットテストを記述する]: ../use-case/nodecli/refactor-and-unittest/README.md
[Todoアプリ]: ../use-case/todoapp/README.md
[エントリポイント]: ../use-case/todoapp/entrypoint/README.md
[アプリの構成要素]: ../use-case/todoapp/app-structure/README.md
[Todoアイテムの追加を実装する]: ../use-case/todoapp/form-event/README.md
[イベントとモデル]: ../use-case/todoapp/event-model/README.md
[Todoアイテムの更新と削除を実装する]: ../use-case/todoapp/update-delete/README.md
[Todoアプリのリファクタリング]: ../use-case/todoapp/final/README.md
[付録: 参考リンク集]: ../appendix/links/README.md
[おわりに]: ../outro/README.md
