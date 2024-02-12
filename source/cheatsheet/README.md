---
author: azu
description: "JavaScriptチートシート"
sponsors: []
---

<!-- load script -->

<script type="text/javascript">
function loadExt(e,t){var s=this;s.files=e,s.js=[],s.head=document.getElementsByTagName("head")[0],s.after=t||function(){},s.loadStyle=function(e){var t=document.createElement("link");t.rel="stylesheet",t.type="text/css",t.href=e,s.head.appendChild(t)},s.loadScript=function(e){var t=document.createElement("script");t.type="text/javascript",t.src=s.js[e];var a=function(){++e<s.js.length?s.loadScript(e):s.after()};t.onload=function(){a()},s.head.appendChild(t)};for(var a=0;a<s.files.length;a++)/\.js$/.test(s.files[a])&&s.js.push(s.files[a]),/\.css$/.test(s.files[a])&&s.loadStyle(s.files[a]);s.js.length>0?s.loadScript(0):s.after()}

function highlightCheatsheetCodes() {
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
      highlightCheatsheetCodes();
    });
  } else {
    highlightCheatsheetCodes();
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

/* 
| コード例 | 説明 | 解説 | MDN | 
| 45% | 30% | 15% | 10% | 
*/
.cheatsheet-marker ~ table {
  width: 100%; 
}
.cheatsheet-marker ~ table th:nth-child(1) {
  width: 45%;
}
.cheatsheet-marker ~ table th:nth-child(2) {
  width: 30%;
}
.cheatsheet-marker ~ table th:nth-child(3) {
  width: 15%;
}
.cheatsheet-marker ~ table th:nth-child(4) {
  width: 10%;
}
</style>

# 付録: JavaScriptチートシート {#cheat-sheet}

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

<div class="cheatsheet-marker" aria-hidden="true"><!-- Tableのスタイルのためのマーカー --></div>

| コード例 | 説明 | 解説 | MDN | 
|---------|-------------|-------------|-------------|
| `// xxx` | 一行コメント | [コメント][] | [字句文法](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Lexical_grammar#%E3%82%B3%E3%83%A1%E3%83%B3%E3%83%88)
| `/* xxx */` | 複数行コメント | [コメント][] | [字句文法](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Lexical_grammar#%E3%82%B3%E3%83%A1%E3%83%B3%E3%83%88)
| `<!-- xxx -->` | [ES2015] HTML-likeコメント | [コメント][] | &nbsp; |

### データ構造 {#data-structures}

変数宣言について。

<div class="cheatsheet-marker" aria-hidden="true"><!-- Tableのスタイルのためのマーカー --></div>


| コード例 | 説明 | 解説 | MDN |
|---------|-------------|-------------|-------------|
| `const x` | [ES2015] **変数宣言**。`x`に値の再代入はできない | [変数と宣言][] | [const](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/const) |
| `let x` | [ES2015] **変数宣言**。`const`と似ているが、`x`に値を再代入できる | [変数と宣言][] | [let](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/let) |
| `var x` | **変数宣言**。レガシーな変数宣言方法 | [変数と宣言][] | [var](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/var) |

### リテラル {#literal}

データ構造を表現するリテラルについて。

<div class="cheatsheet-marker" aria-hidden="true"><!-- Tableのスタイルのためのマーカー --></div>


| コード例 | 説明 | 解説 | MDN |
|---------|-------------|-------------|-------------|
| `true` または `false` | **真偽値** | [データ型とリテラル][] | [字句文法](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Lexical_grammar#%E8%AB%96%E7%90%86%E5%80%A4%E3%83%AA%E3%83%86%E3%83%A9%E3%83%AB) |
| `123` | **10進数**の整数リテラル | [データ型とリテラル][] | [字句文法](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Lexical_grammar#%E6%95%B0%E5%80%A4%E3%83%AA%E3%83%86%E3%83%A9%E3%83%AB) |
| `123n` | [ES2020] 巨大な整数を表すBigIntリテラル | [データ型とリテラル][] | [字句文法](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Lexical_grammar#%E6%95%B0%E5%80%A4%E3%83%AA%E3%83%86%E3%83%A9%E3%83%AB) |
| `0b10` | [ES2015] **2進数**の整数リテラル | [データ型とリテラル][] | [字句文法](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Lexical_grammar#%E6%95%B0%E5%80%A4%E3%83%AA%E3%83%86%E3%83%A9%E3%83%AB) |
| `0o777` | [ES2015] **8進数**の整数リテラル | [データ型とリテラル][] | [字句文法](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Lexical_grammar#%E6%95%B0%E5%80%A4%E3%83%AA%E3%83%86%E3%83%A9%E3%83%AB) |
| `0x30A2` | **16進数**の整数リテラル | [データ型とリテラル][] | [字句文法](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Lexical_grammar#%E6%95%B0%E5%80%A4%E3%83%AA%E3%83%86%E3%83%A9%E3%83%AB) |
| `123_456` | [ES2021]数値リテラルにおける**Numeric Separators** | [データ型とリテラル][] | [字句文法](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Lexical_grammar#%E6%95%B0%E5%80%A4%E3%83%AA%E3%83%86%E3%83%A9%E3%83%AB) |
| `{ k: v }` | プロパティ名が`k`、プロパティの値が`v`の**オブジェクト**を作成 | [オブジェクト][] | [文法とデータ型](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Grammar_and_types#object_literals) |
| <i class="s4"></i> `{ n }` | [ES2015] プロパティ名が`n`、プロパティの値が`n`の**オブジェクト**を作成 | [オブジェクト][] | [オブジェクト初期化子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Object_initializer#%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%81%AE%E5%AE%9A%E7%BE%A9) |
| `[x, y]` | `x`と`y`を初期値にもつ**配列オブジェクト**を作成 | [配列][] | [文法とデータ型](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Grammar_and_types#array_literals) |
| `/pattern/` | `pattern`をもつ**正規表現オブジェクト**を作成 | [文字列][] | [字句文法](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Lexical_grammar#%E6%AD%A3%E8%A6%8F%E8%A1%A8%E7%8F%BE%E3%83%AA%E3%83%86%E3%83%A9%E3%83%AB) |
| `null` | `null`値 | [データ型とリテラル][] | [字句文法](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Lexical_grammar#null_%E3%83%AA%E3%83%86%E3%83%A9%E3%83%AB) |

### 文字列 {#string}

文字列について。

<div class="cheatsheet-marker" aria-hidden="true"><!-- Tableのスタイルのためのマーカー --></div>

| コード例 | 説明 | 解説 | MDN |
|---------|-------------|-------------|-------------|
| `"xxx"` | ダブルクォートの**文字列リテラル**。改行などは`\`と特定の文字を組み合わせたエスケープシーケンスとして表現します。 | [文字列][] | [文法とデータ型](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Grammar_and_types#string_literals) |
| `'xxx'` | シングルクォートの**文字列リテラル**。`"xxx"`と意味は同じ。 | [文字列][] | [文法とデータ型](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Grammar_and_types#string_literals) |
| `` `xxx` `` | [ES2015] テンプレート文字列リテラル。改行を含んだ入力が可能 | [文字列][] | [テンプレートリテラル (テンプレート文字列)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Template_literals) |
| <i class="s4"></i> `` `${x}` `` | [ES2015] テンプレート文字列リテラル中の変数`x`の値を展開する | [文字列][] | [テンプレートリテラル (テンプレート文字列)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Template_literals) |

### データアクセス {#data-access}

データへのアクセスについて。

<div class="cheatsheet-marker" aria-hidden="true"><!-- Tableのスタイルのためのマーカー --></div>


| コード例 | 説明 | 解説 | MDN |
|---------|-------------|-------------|-------------|
| `array[0]`| 配列への**インデックスアクセス** | [配列][] | [Array](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array#%E6%B7%BB%E5%AD%97%E3%81%AB%E3%82%88%E3%82%8B%E9%85%8D%E5%88%97%E3%81%AE%E8%A6%81%E7%B4%A0%E3%81%B8%E3%81%AE%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9) |
| `obj["x"]`| オブジェクトへの**プロパティアクセス**（ブラケット記法） | [オブジェクト][] | [プロパティアクセサー](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Property_Accessors) |
| `obj.x`| オブジェクトへの**プロパティアクセス**（ドット記法） | [オブジェクト][] | [プロパティアクセサー](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Property_Accessors) |
| `obj?.x`| [ES2020] オブジェクトへの**プロパティアクセス**（Optional chaining演算子） | [オブジェクト][] | [オプショナルチェーン (?.)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Optional_chaining) |
| `const { x } = obj;`| [ES2015] オブジェクトの**分割代入** | [オブジェクト][] | [分割代入](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) |
| `const [ x ] = array;`| [ES2015] 配列の**分割代入** | [配列][] | [分割代入](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) |
| `f(...array)`| [ES2015] **Spread構文**での配列の展開 | [配列][] | [スプレッド構文](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax) |
| `f({ ...obj })`| [ES2018] **Spread構文**でのオブジェクトの展開 | [オブジェクト][] | [スプレッド構文](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax) |

### 演算子 {#operator}

演算子について。

<div class="cheatsheet-marker" aria-hidden="true"><!-- Tableのスタイルのためのマーカー --></div>


| コード例 | 説明 | 解説 | MDN |
|---------|-------------|-------------|-------------|
| `+` | プラス演算子、文字列結合演算子 | [演算子][] | [加算 (+)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Addition) |
| `-` | マイナス演算子 | [演算子][] | [減算 (-)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Subtraction) |
| `*` | 乗算演算子 | [演算子][] | [乗算 (*)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Multiplication) |
| `/` | 除算演算子 | [演算子][] | [除算 (/)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Division) |
| `%` | 剰余演算子 | [演算子][] | [剰余 (%)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Remainder)  |
| `**` | [ES2016] べき乗演算子 | [演算子][] | [べき乗 (**)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Exponentiation) |
| `++` | インクリメント演算子 | [演算子][] | [インクリメント](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Increment) |
| `--` | デクリメント演算子 | [演算子][] | [デクリメント (--)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Decrement) |
| `===` | 厳密等価演算子 | [演算子][] | [厳密等価 (===)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Strict_equality) |
| `!==` | 厳密不等価演算子 | [演算子][] | [厳密不等価 (!==)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Strict_inequality) |
| `==` | 等価演算子 | [演算子][] | [等価 (==)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Equality) |
| `!=` | 不等価演算子 | [演算子][] | [不等価 (!=)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Inequality) |
| `>` | 大なり演算子/より大きい | [演算子][] | [大なり (>)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Greater_than) |
| `>=` | 大なりイコール演算子/以上 | [演算子][] | [大なりイコール (>=)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Greater_than_or_equal) |
| `<` | 小なり演算子/より小さい | [演算子][] | [小なり (<)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Less_than) |
| `<=` | 小なりイコール演算子/以下 | [演算子][] | [小なりイコール (<=)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Less_than_or_equal) |
| `&` | ビット論理積 | [演算子][] | [ビット論理積 (&)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Bitwise_AND) |
| <code>&#x7C;</code> | ビット論理和 | [演算子][] | [ビット論理和 (&#x7C;)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Bitwise_OR) |
| `^` | ビット排他的論理和 | [演算子][] | [ビット排他的論理和 (^)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR) |
| `~` | ビット否定 | [演算子][] | [ビット否定 (~)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT) |
| `<<` | 左シフト演算子 | [演算子][] | [左シフト (<<)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Left_shift) |
| `>>` | 右シフト演算子 | [演算子][] | [右シフト (>>)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Right_shift) |
| `>>>` | ゼロ埋め右シフト演算子 | [演算子][] | [符号なし右シフト (>>>)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift) |
| `&&` | AND演算子 | [演算子][] | [論理積 (&&)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_AND) |
| `??` | [ES2020] Nullish coalescing演算子 | [演算子][] | [Null 合体演算子 (??)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) |
| <code>&#x7C;&#x7C;</code> | OR演算子 | [演算子][] | [論理和 (&#x7C;&#x7C;)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_OR) |
| `(x)` | グループ演算子 | [演算子][] | [グループ化演算子 ( )](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Grouping) |
| `x, y` | カンマ演算子 | [演算子][] | [カンマ演算子 (,)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Comma_Operator) |

### 関数と挙動 {#function-behavior}

関数の定義と挙動について。

<!-- textlint-disable no-js-function-paren -->

<div class="cheatsheet-marker" aria-hidden="true"><!-- Tableのスタイルのためのマーカー --></div>


| サンプル | 説明 | 解説 | MDN |
|---------|-------------|-------------|-------------|
| `function f(){}` | **関数**宣言 | [関数と宣言][] | [関数宣言](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/function) |
| `const f = function(){};` | **関数**式 | [関数と宣言][] | [関数式](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/function) |
| `const f = () => {};` | [ES2015] **Arrow Function**の宣言 | [関数と宣言][] | [アロー関数式](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow_functions) |
| `async function f(){}` | [ES2017] **Async Function**の宣言 | [非同期処理][] | [非同期関数](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function) |
| <i class="s4"></i> `const f = async function(){};` | [ES2017] 関数式を使った**Async Function**の宣言 | [非同期処理][] | [非同期関数式](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/async_function) |
| <i class="s4"></i> `const f = async () => {};` | [ES2017] Arrow Functionを使った**Async Function**の宣言 | [非同期処理][] | [非同期関数式](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/async_function) |
| `function f(x, y){}` | 関数における仮引数の宣言 |  [関数と宣言][] | [関数宣言](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/function) |
| <i class="s4"></i> `function f(x = 1, y = 2){}` | **デフォルト引数**、引数が渡されていない場合の初期値を指定する。 |  [関数と宣言][] | [デフォルト引数](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Default_parameters) |
| <i class="s4"></i> `function f([x, y]){}` | [ES2015] 関数の引数における配列の**分割代入**。引数の配列からインデックスが`0`の値を`x`に、インデックスが`1`の値を`y`に代入する。 |  [関数と宣言][] | [分割代入](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%E9%85%8D%E5%88%97%E3%81%AE%E5%88%86%E5%89%B2%E4%BB%A3%E5%85%A5) |
| <i class="s4"></i> `function f({ x, y }){}` | [ES2015] 関数の引数におけるオブジェクトの**分割代入**。引数のオブジェクトから`x`と`y`プロパティを受け取る。 |  [関数と宣言][] | [分割代入](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E5%88%86%E5%89%B2%E4%BB%A3%E5%85%A5) |
| <i class="s4"></i> `function f(...args)){}` | [ES2015] **可変長引数**/**Rest parameters**。引数に渡された値を配列として受け取る |  [関数と宣言][] | [残余引数](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/rest_parameters) |
| `const o = { method: function(){} };` | **メソッド定義** | [関数と宣言][] | [メソッド定義](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Method_definitions#%E8%A7%A3%E8%AA%AC) |
| `const o = { method(){} };` | [ES2015] **メソッド定義**の短縮記法 | [関数と宣言][] | [メソッド定義](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Method_definitions#%E8%A7%A3%E8%AA%AC) |
| `class X{}` | [ES2015] **クラス**宣言 | [クラス][] | [class](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/class) |
| `const X = class X{};` | [ES2015] **クラス**式 | [クラス][] | [クラス式](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/class) |
| <i class="s4"></i> `class X{ method(){} }` | [ES2015] クラスの**インスタンスメソッド**定義 | [クラス][] | [クラス](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes#%E3%83%97%E3%83%AD%E3%83%88%E3%82%BF%E3%82%A4%E3%83%97%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89) |
| <i class="s4"></i> `class X{ get x(){}, set x(v){} }` | [ES2015] クラスの**アクセッサメソッド**の定義 | [クラス][] | [オブジェクトでの作業](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Working_with_Objects#defining_getters_and_setters) |
| <i class="s4"></i> `class X{ property = 1; }` | [ES2022] クラスの**Publicクラスフィールド**の定義 | [クラス][] | [パブリッククラスフィールド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/Public_class_fields) |
| <i class="s4"></i> `class X{ #privateField = 1; }` | [ES2022] クラスの**Privateクラスフィールド**の定義 | [クラス][] | [プライベートクラス機能](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/Private_class_fields) |
| <i class="s4"></i> `class X{ static method(){} }` | [ES2015] クラスの**静的メソッド**定義 | [クラス][] | [static](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/static) |
| `class C extends P{}` | [ES2015] クラスの**継承** | [クラス][] | [extends](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/extends) |
| <i class="s4"></i> `super` | [ES2015] **親クラス**を参照する | [クラス][] | [super](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/super) |
| `fn()` | 関数呼び出し | [関数と宣言][] | [関数](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Functions#calling_functions) |
| `` fn`xxx` ``  | [ES2015] タグ関数呼び出し | [文字列][] | [テンプレートリテラル (テンプレート文字列)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Template_literals#%E3%82%BF%E3%82%B0%E4%BB%98%E3%81%8D%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88) |
| `new X()`  | `new`演算子でのクラス（コンストラクタ関数をもつオブジェクト）からインスタンスを作成 | [クラス][] | [new 演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/new) |

<!-- textlint-enable -->

### コントロールフロー {#control-flow}

コントロールフローの制御構文について。

<div class="cheatsheet-marker" aria-hidden="true"><!-- Tableのスタイルのためのマーカー --></div>


| 例 | 説明 | 解説 | MDN |
|---------|-------------|-------------|-------------|
| `while(x){}`  | **whileループ**。`x`が`true`なら反復処理を行う | [ループと反復処理][] | [while](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/while) |
| `do{}while(x);`  | **do...whileループ**。`x`が`true`なら反復処理を行う。`x`に関係なく必ず初回は処理が行われる | [ループと反復処理][] | [do...while](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/do...while) |
| `for(let x=0;x < y ;x++){}`  | **forループ**。`x < y`が`true`なら反復処理を行う | [ループと反復処理][] | [for](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for) |
| `for(const p in o){}`  | **for...inループ**。オブジェクト（`o`）のプロパティ(`p`)に対して反復処理を行う | [ループと反復処理][] | [for...in](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for...in) |
| `for(const x of iter){}`  | [ES2015] **for...ofループ**。イテレータ(`iter`)の反復処理を行う | [ループと反復処理][] | [for...of](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for...of) |
| `if(x){/*A*/}else{/*B*/}`  | **条件式**。`x`が`true`ならAの処理を、それ以外ならBの処理を行う | [条件分岐][] | [if...else](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/if...else) |
| `switch(x){case "A":{/*A*/} "B":{/*B*/}}`  | **switch文**。`x`が`"A"`ならAの処理を、"B"ならBの処理を行う | [条件分岐][] | [switch](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/switch) |
| `x ? A: B`  | **条件 （三項） 演算子**。`x`が`true`なら`A`の処理を、それ以外なら`B`の処理を行う | [条件分岐][] | [条件 (三項) 演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) |
| `break`  | **break文**。現在の反復処理を終了し、ループから抜け出す。 | [条件分岐][] | [break](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/break) |
| `continue`  | **continue文**。現在の反復処理を終了し、次のループに行く。 | [条件分岐][] | [continue](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/continue) |
| `try{}catch(e){}finally{}`  | `try...catch`構文 | [例外処理][] | [try...catch](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/try...catch) |
| `throw new Error("xxx")`  | `throw`文 | [例外処理][] | [throw](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/throw) |

### モジュール {#module}

ECMAScriptモジュールについて。

<div class="cheatsheet-marker" aria-hidden="true"><!-- Tableのスタイルのためのマーカー --></div>


| コード | 説明 | 解説 | MDN |
|---------|-------------|-------------|-------------|
| `import x from "./x.js"` | [ES2015] **デフォルトインポート** | [ECMAScriptモジュール][] | [Import](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import) |
| `import { x } from "./x.js"` | [ES2015] **名前付きインポート** | [ECMAScriptモジュール][] | [Import](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import) |
| `import { x as y } from "./x.js"` | [ES2015] 名前付きインポートの**エイリアス** | [ECMAScriptモジュール][] | [Import](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import) |
| `import * as x from "./x.js"` | [ES2015] **すべての名前付きエクスポートをインポート**してエイリアス | [ECMAScriptモジュール][] | [Import](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import) |
| `import "./x.js"` | [ES2015] 副作用のための**インポート** |[ECMAScriptモジュール][] | [Import](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import) |
| `export default x` | [ES2015] **デフォルトエクスポート** | [ECMAScriptモジュール][] | [Export](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/export) |
| `export { x }` | [ES2015] **名前付きエクスポート** | [ECMAScriptモジュール][] | [Export](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/export) |
| `export { x as y }` | [ES2015] 名前付きエクスポートの**エイリアス** | [ECMAScriptモジュール][] | [Export](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/export) |
| `export { x } from "./x.js"` | [ES2015] 名前付きエクスポートの**再エクスポート** | [ECMAScriptモジュール][] | [Export](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/export) |
| `export * from "./x.js"` | [ES2015] すべての名前付きエクスポートの**再エクスポート** | [ECMAScriptモジュール][] | [Export](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/export) |
| `export * as ns from "./x.js"` | [ES2020] **すべての名前付きエクスポートをインポート**して`ns`という名前で**再エクスポート** | [ECMAScriptモジュール][] | [Export](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/export) |

### その他 {#miscellaneous}

<div class="cheatsheet-marker" aria-hidden="true"><!-- Tableのスタイルのためのマーカー --></div>



| コード例 | 説明 | 解説 | MDN |
|---------|-------------|-------------|-------------|
| `x;` | **文** | [文と式][] | [字句文法](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Lexical_grammar#%E8%87%AA%E5%8B%95%E3%82%BB%E3%83%9F%E3%82%B3%E3%83%AD%E3%83%B3%E6%8C%BF%E5%85%A5) |
| `{ }` | ブロック文 | [文と式][] | [ブロック](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/block) |

## ガイド {#guide}

### プロジェクト構造 {#project-anatomy}

JavaScriptにおける基本的なプロジェクトレイアウト、ファイル、フォルダ構造について。

| 名前 | 説明 |
|--------| ---- |
| src/ | プロジェクトのソースコード |
| <s class="s4"></s> index.js | アプリケーションのデフォルトエントリーポイント |
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
[Ajax通信]: ../use-case/ajaxapp/README.md
[エントリーポイント]: ../use-case/ajaxapp/entrypoint/README.md
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
[エントリーポイント]: ../use-case/todoapp/entrypoint/README.md
[アプリの構成要素]: ../use-case/todoapp/app-structure/README.md
[Todoアイテムの追加を実装する]: ../use-case/todoapp/form-event/README.md
[イベントとモデル]: ../use-case/todoapp/event-model/README.md
[Todoアイテムの更新と削除を実装する]: ../use-case/todoapp/update-delete/README.md
[Todoアプリのリファクタリング]: ../use-case/todoapp/final/README.md
[付録: 参考リンク集]: ../appendix/links/README.md
[おわりに]: ../outro/README.md
