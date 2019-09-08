---
author: azu
description: "JavaScriptチートシート"
---

* 言語機能
    * [Comments](#comments)
    * [Data Structures](#data-structures)
    * [Literal](#literal)
    * [String](#string)
    * [Data Access](#data-access)
    * [Operator](#operator)
    * [Functions & Behavior](#functions-behavior)
    * [Control Flow](#control-flow)
    * [Modules](#module)
    * [Miscellaneous](#miscellaneous)
* Guide
    * [Project Anatomy](#project-anatomy)

## 言語機能 {#language-feature}

### Comments {#comments}

コメントの書き方について。

| Example | Explanation |
|---------|-------------|
| `// ~~~` | 一行コメント |
| `/* ~~~ */` | 複数行コメント |
| `<!-- ~~~ -->` | HTML-likeコメント |


### Data Structures {#data-structures}

キーワードを使った変数宣言。

| Example | Explanation |
|---------|-------------|
| `const x;` | **変数宣言**。`x`に値の再代入はできません。 |
| `let x;` | **変数宣言**。`const`と似ているが、`x`に値を再代入できる。 |
| `var x;` | **変数宣言**。レガシーな変数宣言方法。 |

### Literal {#literal}

データ構造を表現するリテラルについて。

| Example | Explanation |
|---------|-------------|
| `true` or `false` | **真偽値** |
| `123` | **10進数**の整数リテラル |
| `0b10` | **2進数**の整数リテラル |
| `0o777` | **8進数**の整数リテラル |
| `0x30A2` | **16進数**の整数リテラル |
| `{ k: v }` | プロパティ名が`k`、プロパティの値が`v`の**オブジェクト**を作成します |
| &nbsp; &nbsp; `{ n }` | プロパティ名が`n`、プロパティの値が`n`の**オブジェクト**を作成します |
| `[x, y]` | `x`、`y`を初期値にもつ**配列オブジェクト**を作成します |
| `/pattern/` | `pattern`をもつ**正規表現オブジェクト**を作成します |
| `null` | `null`リテラル |

### String {#string}

文字列について。

| Example | Explanation |
|---------|-------------|
| `"~~~"` | **文字列リテラル**。改行などは`\`と特定の文字を組み合わせたエスケープシーケンスとして表現します。 |
| `'~~~'` | **文字列リテラル**。`"~~~"`と意味は同じ。 |
| `` `~~~` `` | テンプレート文字列リテラル。改行を含んだ入力が可能 |
| &nbsp; &nbsp; `` `${x}` `` | テンプレート文字列リテラル中の変数`x`の値を展開する |

### Data Access {#data-access}

データへのアクセス。

| Example | Explanation |
|---------|-------------|
| `array[0]`| 配列へのインデックスアクセス | 
| `obj["x"]`| オブジェクトのプロパティアクセス | 
| `obj.x`| ブジェクトのプロパティアクセス | 
| `const { x } = o;`| オブジェクトの分割代入 | 
| `const [ x ] = array;`| 配列の分割代入 | 
| `f(...array)`| Spread構文での配列の展開 | 
| `f({ ...obj })`| Spread構文でのオブジェクトの展開 | 

### Operator {#operator}

演算子について。


| Example | Explanation |
|---------|-------------|
| `+` | プラス演算子、文字列結合演算子 |
| `-` | マイナス演算子 |
| `*` | 乗算演算子 |
| `/` | 除算演算子 |
| `%` | 剰余演算子 |
| `**` | べき乗演算子 |
| `++` | インクリメント演算子 |
| `--` | デクリメント演算子 |
| `===` | 厳密等価演算子 |
| `!==` | 厳密不等価演算子 |
| `==` | 等価演算子 |
| `!=` | 不等価演算子 |
| `>` | 大なり演算子/より大きい |
| `>=` | 大なりイコール演算子/以上 |
| `<` | 小なり演算子/より小さい |
| `<=` | 小なりイコール演算子/以下 |
| `&` | ビット論理積 |
| `|` | ビット論理和 |
| `^` | ビット排他的論理和 |
| `~` | ビット否定 |
| `<<` | 左シフト演算子 |
| `>>` | 右シフト演算子 |
| `>>>` | ゼロ埋め右シフト演算子 |
| `&&` | AND演算子 |
| `||` | OR演算子 |
| `(x)` | グループ演算子 |
| `x, y` | カンマ演算子 |

### Functions & Behavior {#function-behavior}

関数の定義と挙動について。

<!-- textlint-disable no-js-function-paren -->

| Example | Explanation |
|---------|-------------|
| `function f(){}` | **関数**宣言 |
| `const f = function(){};` | **関数**式 |
| `const f = () => {};` | **Arrow Function**の宣言 |
| `async function f(){}` | **Async Function**の宣言 |
| &nbsp; &nbsp; `const f = async function(){};` | 関数式を使った**Async Function**の宣言 |
| &nbsp; &nbsp; `const f = async () => {};` | Arrow Functionを使った**Async Function**の宣言 |
| `function f(x, y, c){}` | 関数における仮引数の宣言 |
| &nbsp; &nbsp; `function f(x = 1, y = 2){}` | **デフォルト引数**、引数が渡されていない場合の初期値を指定する。 |
| &nbsp; &nbsp; `function f([x, y]){}` | 関数の引数における配列の**分割代入**。引数の配列からインデックスが`0`の値を`x`に、インデックスが`1`の値を`y`に代入する。 |
| &nbsp; &nbsp; `function f({ x, y }){}` | 関数の引数におけるオブジェクトの**分割代入**。引数のオブジェクトから`x`と`y`プロパティを受け取る。 |
| &nbsp; &nbsp; `function f(...args)){}` | **可変長引数**/**Rest parameters**。引数に渡された値を配列として受け取る |
| `const o = { method: function(){} };` | **メソッド定義** |
| `const o = { method(){} };` | **メソッド定義**の短縮記法 |
| `class X{}` | **クラス**宣言 |
| `const X = class X{}` | **クラス**式 |
| &nbsp; &nbsp; `class X{ method(){} }` | クラスの**インスタンスメソッド**定義 |
| &nbsp; &nbsp; `class X{ get x(){}, set x(v){} }` | クラスの**アクセッサメソッド**の定義 |
| &nbsp; &nbsp; `class X{ static method(){} }` | クラスの**静的メソッド**定義 |
| `class C extends P{}` | クラスの**継承** |
| &nbsp; &nbsp; `super` | **親クラス**を参照する |
| `fn()` | 関数呼び出し |
| `` fn`~~~` ``  | タグ関数呼び出し |

<!-- textlint-enable -->


### Control Flow {#control-flow}

コントロールフローの制御構文について。

| Example | Explanation |
|---------|-------------|
| `while(x){}`  | **whileループ**。`x`が`true`なら反復処理を行う |
| `do{}while(x);`  | **do...whileループ**。`x`が`true`なら反復処理を行う。`x`に関係なく必ず初回は処理が行われる |
| `for(let x=0,x<y;x++){}`  | **forループ**。`x < y`が`true`なら反復処理を行う |
| `for(const p in o){}`  | **for...inループ**。オブジェクト（`o`）のプロパティ(`p`)に対して反復処理を行う |
| `for(const x of iter){}`  | ***for...ofループ**。イテレータ(`iter`)の反復処理を行う |
| `if(x){/*A*/}else{/*B*/}`  | **条件式**。`x`が`true`ならAの処理を、それ以外ならBの処理を行う |
| `x ? A: B`  | **条件 （三項） 演算子**。`x`が`true`なら`A`の処理を、それ以外なら`B`の処理を行う |
| `break`  | **break文**。現在の反復処理終了し、ループから抜け出す。 |
| `continue`  | **continue文**。現在の反復処理を終了し、次のループに行く。 |
| `try{}catch(e){}finally{}`  | `try...catch`構文 |


### Modules {#modules}

ECMAScriptモジュールについて。

| Example | Explanation |
|---------|-------------|
| `import x from "./x.js"` | **デフォルトインポート** |
| `import { x } from "./x.js"` | **名前付きインポート** |
| `import { x as y } from "./x.js"` | 名前付きインポートの**エイリアス** |
| `import * as x from "./x.js"` | **すべての名前付きエクスポートをインポート**してエイリアス |
| `import "./x.js"` | 副作用のためのインポート |
| `export default x` | **デフォルトエクスポート** |
| `export { x }` | **名前付きエクスポート** |
| `export { x }` | 名前付きエクスポートのエイリアス |
| `export { x } from "./x.js"` | 名前付きエクスポートの**再エクスポート** |
| `export * from "./x.js"` | すべての名前付きエクスポートの**再エクスポート** |


### Miscellaneous {#miscellaneous}

| Example | Explanation |
|---------|-------------|
| `x;` | **文** |
| `{ }` | ブロック文 |


## Guide {#guide}

### Project Anatomy {#project-anatomy}

JavaScriptにおける基本的なプロジェクトレイアウト、ファイル、フォルダ構造について。

| Idiom | Code |
|--------| ---- |
| `src/` | プロジェクトのソースコード |
| &nbsp;&nbsp;  `index.js` | アプリケーションのデフォルトエントリポイント |
| `test/` | テストコード。`src/`に対するユニットテストを置くことが多い |
| &nbsp;&nbsp;  `index.test.js` | アプリケーションのユニットテストファイル。例) `index-test.js`、`indexSpec.js`など |
| `node_modules/` | プロジェクトが依存するnpmモジュールのインストール先 |
| `package.json` | プロジェクトの設定ファイル。名前、説明、スクリプト、依存モジュールなど |
| `package-lock.json` | npmの依存関係のロックファイル |
