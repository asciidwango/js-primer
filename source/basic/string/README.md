---
author: azu
description: "文字列リテラルを使った文字列の作成から検索や置換など基本的な文字列操作について紹介します。また正規表現と組み合わせた文字列操作やタグ付きテンプレート関数を使ったテンプレート処理などについても紹介します。"
---

# 文字列 {#string}

この章ではJavaScriptにおける文字列について学んでいきます。
まずは、文字列の表現方法や文字列の操作方法について見ていきます。
そして、文字列を編集して自由な文字列を作れるようになることがこの章の目的です。

## 文字列を作成する {#create}

文字列を作成するには、文字列リテラルを利用します。
「[データ型とリテラル][]」の章でも紹介しましたが、文字列リテラルには`"`（ダブルクオート）、`'`（シングルクオート）、`` ` ``（バッククオート）の3種類があります。

まずは`"`（ダブルクオート）と`'`（シングルクオート）について見ていきます。

`"`（ダブルクオート）と`'`（シングルクオート）に意味的な違いはありません。
そのため、どちらを使うかは好みやプロジェクトごとのコーディング規約によって異なります。
この書籍では、`"`（ダブルクオート）を主な文字列リテラルとして利用します。

<!-- textlint-disable eslint -->

{{book.console}}
```js
const double = "文字列";
console.log(double); // => "文字列"
const single = '文字列';
console.log(single); // => '文字列'
// どちらも同じ文字列
console.log(double === single);// => true
```

ES2015では、テンプレートリテラル `` ` ``（バッククオート）が追加されました。
テンプレートリテラルは、 `` ` ``（バッククオート）で囲み文字列を作成できる点は、他の文字列リテラルと同じです。

これに加えてテンプレートリテラルでは、文字列中に改行を入力できます。
次のコードでは、テンプレートリテラルを使い複数行の文字列を見た目どおりに定義しています。

{{book.console}}
```js
const multiline = `1行目
2行目
3行目`;
// \n は改行を意味する
console.log(multiline); // => "1行目\n2行目\n3行目"
```

<!-- textlint-enable eslint -->

どの文字列リテラルでも共通ですが、文字列リテラルは同じ記号が対になります。
そのため、文字列の中にリテラルと同じ記号が出現した場合は、`\`（バックスラッシュ）を使いエスケープする必要があります。
次のコードでは、文字列中の`"`を`\"`のようにエスケープしています。

{{book.console}}
```js
const string = "This book is \"js-primer\"";
console.log(string); // => 'This book is "js-primer"'
```

## エスケープシーケンス {#escape-sequence}

文字列リテラル中にはそのままは入力できない特殊な文字もあります。
改行もそのひとつで、`"`（ダブルクオート）と`'`（シングルクオート）の文字列リテラルには改行をそのまま入力できません。
（テンプレートリテラル中には例外的に改行をそのまま入力できます）

次のコードは、JavaScriptの構文として正しくないため、構文エラー（SyntaxError）となります。

[import, multiline-invalid.js](src/multiline-invalid.js)

この問題を回避するために、改行のような特殊な文字はエスケープシーケンスとして書く必要があります。
エスケープシーケンスは、`\`と特定の文字を組み合わせることで、特殊文字を表現します。

次の表では、代表的な[エスケープシーケンス][]を紹介しています。
エスケープシーケンスは、`"`（ダブルクオート）、`'`（シングルクオート）、`` ` ``（バッククオート）すべての文字列リテラルの中で利用できます。

| エスケープシーケンス     | 意味                                     |
| ------------------------ | ---------------------------------------- |
| `\'`                     | シングルクオート                         |
| `\"`                     | ダブルクオート                           |
| `` \` ``                 | バッククオート                           |
| `\\`                     | バックスラッシュ(`\`そのものを表示する)  |
| `\n`                     | 改行                                     |
| `\t`                     | タブ                                     |
| `\uXXXX`                 | Code Unit(`\u`と4桁のHexDigit)   |
| `\u{X}` ... `\u{XXXXXX}` | Code Point(の中にHexDigit) |

このエスケープシーケンスを利用することで、先ほどの`"`（ダブルクオート）の中に改行（`\n`）を入力できます。

{{book.console}}`\u{}`
```js
// 改行を\nのエスケープシーケンスとして入力している
const multiline = "1行目\n2行目\n3行目";
```

また、`\`から始まる文字は自動的にエスケープシーケンスとして扱われます。
しかし、`\a`のように定義されていないエスケープシーケンスは、`\`が単に無視され`a`という文字列として扱われます。
これにより、`\`（バックスラッシュ）そのものを入力していたつもりが、その文字がエスケープシーケンスとして扱われる問題があります。

次のコードでは、`\_`という組み合わせのエスケープシーケンスはないため、`\`が無視された文字列として評価されます。

{{book.console}}
```js
console.log("¯\_(ツ)_/¯"); 
// ¯_(ツ)_/¯ のように\が無視されて表示される
```

`\`（バックスラッシュ）そのものを入力したい場合は、`\\`のようにエスケープする必要があります。

{{book.console}}
```js
console.log("¯\\_(ツ)_/¯"); 
//　¯\_(ツ)_/¯ と表示される
```

<!-- Note: https://tc39.github.io/ecma262/#prod-NonEscapeCharacter

- 指定外の組み合わせもNonEscapeCharacterとして扱われ構文的には無害
- 単純に \ がないように使われる。

 -->

## 文字列を結合する {#concat}

文字列を結合する簡単な方法は文字列結合演算子（`+`）を使う方法です。

{{book.console}}
```js
const string = "a" + "b";
console.log(string); // => "ab"
```

変数と文字列を結合したい場合も文字列結合演算子で行うことができます。

{{book.console}}
```js
const name = "JavaScript";
console.log("Hello " + name + "!");// => "Hello JavaScript!"
```

特定の書式に文字列を埋め込むには、テンプレートリテラルを使うとより宣言的に書くことができます。

テンプレートリテラル中に`${変数名}`で書かれた変数は評価時に展開されます。
つまり、先ほどの文字列結合は次のように書くことができます。

{{book.console}}
```js
const name = "JavaScript";
console.log(`Hello ${name}!`);// => "Hello JavaScript!"
```

## 文字へのアクセス {#get-char}

文字列の特定の位置にある文字はインデックスを指定してアクセスできます。
これは、配列における要素へのアクセスにインデックス指定をするのと同じです。

文字列では`文字列[インデックス]`のように指定した位置（インデックス）の文字へアクセスできます。
インデックスの値は`0`以上`2^53 - 1`未満の整数が指定できます。

{{book.console}}
```js
const string = "文字列";
// 配列と同じようにインデックスでアクセスできる
console.log(string[0]); // => "文"
console.log(string[1]); // => "字"
console.log(string[2]); // => "列"
```

また、存在しないインデックスへのアクセスは配列やオブジェクトと同じように`undefined`を返します。

{{book.console}}
```js
const string = "文字列";
// 42番目のインデックスは存在しない
console.log(string[42]); // => undefined
```

## 文字列とは {#what-is-string}

今まで何気なく「文字列」という言葉を利用していましたが、ここでいう文字列とはどのようなものでしょうか？
コンピュータのメモリ上に文字列の「ア」といった文字をそのまま保存はできないため、0と1からなるビット列へ変換する必要があります。
この文字からビット列へ変換することを符号化（エンコード）と呼びます。

一方で、変換後のビット列が何の文字なのかを管理する表が必要になります。
この文字に対応するIDの一覧表のことを符号化文字集合と呼びます。

次の表は、Unicodeという文字コードにおける符号化文字集合からカタカナの一部分を取り出したものです。[^UnicodeTable]
Unicodeはすべての文字に対してID（Code Point）を振ることを目的に作成されている仕様です。

|      | 0    | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    | 9    | A    | B    | C    | D    | E    | F    |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 30A0 | ゠   | ァ   | ア   | ィ   | イ   | ゥ   | ウ   | ェ   | エ   | ォ   | オ   | カ   | ガ   | キ   | ギ   | ク   |
| 30B0 | グ   | ケ   | ゲ   | コ   | ゴ   | サ   | ザ   | シ   | ジ   | ス   | ズ   | セ   | ゼ   | ソ   | ゾ   | タ   |
| 30C0 | ダ   | チ   | ヂ   | ッ   | ツ   | ヅ   | テ   | デ   | ト   | ド   | ナ   | ニ   | ヌ   | ネ   | ノ   | ハ   |


JavaScript（ECMAScript）は文字コードとしてUnicodeを採用し、文字をエンコードする方式としてUTF-16を採用しています。
UTF-16とは、それぞれの文字を16bitのビット列に変換するエンコード方式です。
Unicodeでは文字を構成する最小のビット列を**Code Unit**（符号単位）と呼び、UTF-16では各Code Unitのサイズが16bit（2バイト）になります。

<!-- 
- 用語集: http://unicode.org/glossary/
- 比較表: http://unicode.org/faq/utf_bom.html#gen6
 -->

次のコードは、文字列を構成するCode Unitをhex値（16進数）にして表示する例です。
`String#charCodeAt`メソッドは、文字列の指定インデックスのCode Unitを整数として返します。
そのCode Unitの整数値を`String#toString`メソッドでhex値（16進数）にしています。

{{book.console}}
```js
const string = "アオイ";
// それぞれの文字をCode Unitのhex値（16進数）に変換する
// toStringの引数に16を渡すと16進数に変換される
console.log(string.charCodeAt(0).toString(16)); // => "30a2"
console.log(string.charCodeAt(1).toString(16)); // => "30aa"
console.log(string.charCodeAt(2).toString(16));  // => "30a4"
```

逆に、Code Unitをhex値（16進数）から文字へと変換するには`String.fromCharCode`メソッドを使います。
次のコードでは、16進数の整数リテラルである`0x`で記述したCode Unitから文字列へと変換しています。
（`0x`リテラルについては「[データ型とリテラル][]」の章を参照）

{{book.console}}
```js
const string = String.fromCharCode(
    0x30a2, // アのCode Unit
    0x30aa, // オのCode Unit
    0x30a4  // イのCode Unit
);
console.log(string); // => "アオイ"
```

これらの結果をまとめると、この文字列と文字列を構成するUTF-16のCode Unitの関係は次のようになります。

| インデックス                       | 0     | 1     | 2     |
| -------------------------------- | ----- | ----- | ----- |
| 文字列                            | ア    | オ    | イ     |
| UTF-16のCode Unit（16進数）        | 0x30A2 | 0x30AA | 0x30A4 |

このように、JavaScriptにおける文字列は16bitのCode Unitが順番に並んだものとして内部的に管理されています。
これは、ECMAScriptの内部表現としてUTF-16を採用しているだけで、JavaScriptファイル（ソースコードを書いたファイル）のエンコーディングとは関係ありません。そのため、JavaScriptファイル自体のエンコードは、UTF-16以外の文字コードであっても問題ありません。

UTF-16を利用していることはJavaScriptの内部的な表現であるため、気にする必要がないようにも思えます。
しかし、このJavaScriptがUTF-16を利用していることは、これから見ていくStringのAPIにも影響しています。
このUTF-16と文字列については、次の章である「[文字列とUnicode][]」で詳しくみていきます。

ここでは、「JavaScriptの文字列の各要素はUTF-16のCode Unitで構成されている」ということだけを覚えておけば問題ありません。

## 文字列の分解と結合 {#split-join}

文字列を配列へ分解するには`String#split`メソッドを利用できます。
一方、配列の要素を結合し文字列にするは`Array#join`メソッドが利用できます。

この２つはよく組み合わせて利用されるため、あわせてみていきます。

`String#split`メソッドは、第一引数に指定した区切り文字で文字列を分解した配列を返します。
次のコードでは、文字列を`・`で区切った配列を作成しています。

{{book.console}}
```js
const strings = "赤・青・緑".split("・");
console.log(strings); // => ["赤", "青", "緑"]
```

分解してできた文字列の配列を結合して文字列を作る際に、`Array#join`メソッドがよく利用されます。
`Array#join`メソッドの第一引数には区切り文字を指定し、その区切り文字で結合した文字列を返します。

この２つを合わせれば、区切り文字を`・`から`、`へ変換する処理を次のように書くことができます。
`・`で文字列を分割(`split`)してから、区切り文字を`、`にして結合(`join`)すれば変換できます。

{{book.console}}
```js
const string = "赤・青・緑".split("・").join("、");
console.log(string); // => "赤、青、緑"
```

`String#split`メソッドの第一引数には正規表現も指定できます。
これを利用すると、次のように文字列をスペースで区切るような処理が簡単に書くことができます。
`/\s+/`は1つ以上のスペースにマッチする正規表現オブジェクトを作成する正規表現リテラルです。

{{book.console}}
```js
// 文字間に1つ以上のスペースがある
const string = "a     b    c      d";
// 1つ以上のスペースにマッチして分解する
const strings = string.split(/\s+/);
console.log(strings); // => ["a", "b", "c", "d"] 
```

## 文字列の長さ {#length}

`String#length`プロパティは文字列の要素数を返します。
文字列の構成要素はCode Unitであるため、`length`プロパティはCode Unitの個数を返します。

次の文字列は3つの要素（Code Unit）が並んだものであるため、`length`プロパティは`3`を返します。

{{book.console}}
```js
console.log("文字列".length); // => 3
```

また、空文字は要素数が`0`であるため、`length`プロパティの結果も`0`となります。
 
{{book.console}}
```js
console.log("".length); // => 0
```

## 文字列の比較 {#compare}

文字列の比較には`===`（厳密比較演算子）を利用します。
次の条件を満たしていれば同じ文字列となります。

- 文字列の要素であるCode Unitが同じ順番で並んでいるか
- 文字列の長さ（length）は同じか

{{book.console}}
```js
console.log("文字列" === "文字列"); // => true
// 一致しなければfalseとなる
console.log("JS" === "ES"); // => false
// 文字列の長さが異なるのでfalseとなる
console.log("文字列" === "文字"); // => false
```


また、`===`などの比較演算子だけではなく、
`>`、`<`、`>=`、`<=`など大小の関係演算子で文字列同士の比較もできます。

これらの関係演算子も、文字列の要素であるCode Unitの同士を先頭から順番に比較します。
文字列からCode Unitの数値を取得するには`String#charCodeAt`メソッドを利用できます。

次のコードでは、`ABC`と`ABD`を比較した場合にどちらが大きい（Code Unitの値が大きい）かを比較しています。

{{book.console}}
```js
// "A"と"B"のCode Unitは65と66
console.log("A".charCodeAt(0)); // => 65
console.log("B".charCodeAt(0)); // => 66
// "A"（65）は"B"（66）よりCode Unitの値が小さい
console.log("A" > "B"); // => false
// 先頭から順番に比較し C > D が falseであるため
console.log("ABC" > "ABD"); // => false
```

このように、JavaScriptの文字列比較はCode Unit同士を比較しています。

## 部分文字列の取得 {#slice}

文字列からその一部を取り出したい場合には、`String#slice`メソッドや`String#substring`メソッドが利用できます。

`slice`メソッドについては、すでに配列で学んでいますが、基本的な動作は文字列でも同様です。
まずは`slice`メソッドについて見ていきます。

`String#slice`メソッドは、第一引数に開始位置、第二引数に終了位置を指定しその範囲を取り出し新しい文字列を返します。
第二引数は省略でき、省略した場合は文字列の末尾が終了位置となります。

位置にマイナスの値を指定した場合は文字列の末尾から数えた位置となります。
また、第一引数の位置が第二引数の位置より大きい場合、常に空の文字列を返します。

{{book.console}}
```js
const string = "ABCDE";
console.log(string.slice(1)); // => "BCDE"
console.log(string.slice(1, 5)); // => "BCDE"
// マイナスを指定すると後ろからの位置となる
console.log(string.slice(-1)); // => "E"
// 位置:1から4の範囲を取り出す
console.log(string.slice(1, 4)); // => "BCD"
// 第一引数 > 第二引数の場合、常に空文字を返す
console.log(string.slice(4, 1)); // => ""
```

`String#substring`メソッドは、`slice`メソッドと同じく第一引数に開始位置、第二引数に終了位置を指定しその範囲を取り出し新しい文字列を返します。
第二引数を省略した場合の挙動も同様で、省略した場合は文字列の末尾が終了位置となります。

`slice`メソッドとは異なる点として、位置にマイナスの値を指定した場合は常に`0`として扱われます。
また、第一引数の位置が第二引数の位置より大きい場合、第一引数と第二引数が入れ替わるという予想しにくい挙動となります。

{{book.console}}
```js
const string = "ABCDE";
console.log(string.substring(1)); // => "BCDE"
console.log(string.substring(1, 5)); // => "BCDE"
// マイナスを指定すると0として扱われる
console.log(string.substring(-1)); // => "ABCDE"
// 位置:1から4の範囲を取り出す
console.log(string.substring(1, 4)); // => "BCD"
// 第一引数 > 第二引数の場合、引数が入れ替わる
// string.substring(1, 4)と同じ結果になる
console.log(string.substring(4, 1)); // => "BCD"
```

このように、マイナスの位置や引数が交換される挙動は分かりやすいものとはいえません。
そのため、`slice`メソッドと`substring`メソッドに指定する引数は、どちらとも同じ結果となる範囲に限定した方が直感的な挙動となります。
つまり、位置は0以上の値でかつ、第二引数を指定する場合は`第一引数の位置 < 第二引数の位置`にするということです。

`String#slice`メソッドは`String#indexOf`メソッドなど位置を取得するものと組み合わせて使うことが多いでしょう。
次のコードでは、`?`の位置を`indexOf`メソッドで取得し、それ以降の文字列を`slice`メソッドで切り出しています。

{{book.console}}
```js
const url = "https://example.com?param=1";
const indexOfQuery = url.indexOf("?");
const queryString = url.slice(indexOfQuery);
console.log(queryString); // => "?param=1"
```

また、配列とは異なりプリミティブ型の値である文字列は、`slice`メソッドと`substring`メソッド共に非破壊的です。
機能的な違いが殆どないため、どちらを利用するかは好みの問題となるでしょう。

## 文字列の検索 {#search}

文字列の検索方法として、大きく分けて文字列による検索と正規表現による検索があります。

<!-- Note: 検索はある目的を持って探すこと、探索は目的外の有益な情報も探すことを含んでいる -->
<!-- ここでは目的が決まっているので"検索" -->
<!-- http://www.st38.net/chigaino-zatugaku/z0174.html -->

### 文字列による検索 {#search-by-string}

文字列による検索は「文字列」から「部分文字列」を検索できます。
Stringメソッドには検索したい状況に応じたものが用意されています。

#### インデックスの取得 {#search-index-by-string}

検索した結果「部分文字列」の開始インデックスを取得する`String#indexOf`メソッドと`String#lastIndexOf`メソッドがあります。
これは、配列の`Array#indexOf`メソッドと同じで、厳密等価演算子（`===`）で一致する文字列のインデックスを取得します。
一致する文字列がない場合は`-1`を返します。

- `文字列.indexOf("部分文字列")`: 先頭から検索し、インデックスを返す
- `文字列.lastIndexOf("部分文字列")`: 末尾から検索し、インデックスを返す

どちらのメソッドも一致する文字列が複数個ある場合でも、指定した部分文字列を一度見つけた時点で検索は終了します。

{{book.console}}
```js
// 検索対象となる文字列
const string = "にわにはにわにわとりがいる";
// indexOfは先頭から検索しインデックスを返す - "**にわ**にはにわにわとりがいる"
// "にわ"の先頭のインデックスを返すため 0 となる
console.log(string.indexOf("にわ")); // => 0
// lastIndexOfは末尾から検索しインデックスを返す- "にわにはにわ**にわ**とりがいる"
console.log(string.lastIndexOf("にわ")); // => 6
// 該当する部分文字列が見つからない場合は -1 を返す
console.log(string.indexOf("未知のキーワード")); // => -1
```

検索している部分文字列の長さは固定であるため、一致した文字列は自明ですが、
`String#slice`と取得したインデックスを組み合わせることで検索結果を取得できます。

{{book.console}}
```js
const string = "JavaScript";
const searchWord = "Script";
const index = string.indexOf("Script");
if (index !== -1) {
    console.log(string.slice(index, index + searchWord.length)); // => "Script"
} else {
    console.log(`${searchWord}は見つかりませんでした`);
}
```

#### 真偽値の取得 {#test-by-string}

「文字列」に「部分文字列」が含まれているかを検索する方法がいくつか用意されています。

- `文字列.startsWith("部分文字列")`: 部分文字列が先頭にあるかの真偽値を返す[ES2015]
- `文字列.endsWith("部分文字列")`: 部分文字列が終端にあるかの真偽値を返す[ES2015]
- `文字列.includes("部分文字列")`: 部分文字列を含むかの真偽値を返す[ES2015]

具体的な例をいくつか見てみましょう。

{{book.console}}
```js
// 検索対象となる文字列
const string = "にわにはにわにわとりがいる";
// startsWith - 部分文字列が先頭ならtrue
console.log(string.startsWith("にわ")); // => true
console.log(string.startsWith("いる")); // => false
// endsWith - 部分文字列が末尾ならtrue
console.log(string.endsWith("にわ")); // => false
console.log(string.endsWith("いる")); // => true
// includes - 部分文字列が含まれるならtrue
console.log(string.includes("にわ")); // => true
console.log(string.includes("いる")); // => true
```

### 正規表現による検索 {#search-by-regexp}

正規表現による検索は、正規表現オブジェクトを利用します。

正規表現オブジェクトは正規表現リテラルや`RegExp`コンストラクタを使うことで生成できます。

正規表現リテラルは、`/`と`/`のリテラル内に正規表現のパターンを書くことで、正規表現オブジェクトを静的に生成します。
正規表現のパターン内では、`+`や`\`（バックスラッシュ）から始まる特殊文字が特別な意味を持ちます。

<!-- パターンと正規表現オブジェクトの用語については https://github.com/asciidwango/js-primer/issues/21#issuecomment-293502813 -->

次のコードでは、スペースやタブにマッチする特殊文字である`\s`を使い、3つ連続するホワイトスペースにマッチする正規表現を生成しています。

```js
// 3つの連続するスペースにマッチする正規表現
const pattern = /\s{3}/;
```

一方、`RegExp`コンストラクタは、文字列から正規表現オブジェクトを動的に生成できます。
正規表現リテラルでは、動的に正規表現オブジェクトを生成できません。
そのため、`RegExp`コンストラクタは、変数をパターンに埋め込んだ正規表現を動的に生成できます。

注意点として、`\`（バックスラッシュ）自体が、文字列中ではエスケープ文字であることに注意してください。
そのため、`RegExp`コンストラクタの引数のパターン文字列において、バックスラッシュから始まる特殊文字はバックスラッシュを2つにする必要があります。

```js
const spaceCount = 3;
// `/\s{3}/`の正規表現を動的に生成する
// "\"がエスケープ文字であるため、"\"自身を文字列として書くには、"\\"のように2つ書く
const pattern = new RegExp(`\\s{${spaceCount}}`);
```

`RegExp`コンストラクタは動的に正規表現オブジェクトを生成できますが、正規表現の特殊文字のエスケープが必要になります。
そのため、正規表現リテラルで表現できる場合は、リテラルを利用したほうが簡潔です。
パターンに変数を利用する場合など、動的でないと表現できないものは`RegExp`コンストラクタを利用します。

#### マッチした文字列を取得 {#match-by-regexp}

`String#indexOf`メソッドの正規表現版ともいえる`String#search`メソッドがあります。

- `String#indexOf(部分文字列)`: 部分文字列にマッチした文字列のインデックスを返す
- `String#search(/パターン/)`: 正規表現のパターンにマッチした文字列のインデックスを返す

文字列による検索は、検索しマッチした文字列の長さが決まっているため、`indexOf`メソッドでもマッチした文字列が取得できていました。
しかし、正規表現による検索は、パターンによる検索であるため、検索しマッチした文字列の長さは固定ではありません。
つまり、次のように`String#search`メソッドでインデックスのみを取得しても、実際にマッチした文字列が分かりません。

{{book.console}}
<!-- doctest:disable -->
```js
const string = "abc123def";
const searchPattern = /\d+/;
const index = string.search(searchPattern); // => 3
// `index` だけではマッチした文字列が分からない
// そのため`マッチした文字列の長さ`が`String#search`では分からない
string.slice(index, index + マッチした文字列の長さ); // マッチした文字列は取得できない
```

マッチした文字列を取得するには`RegExp#exec`メソッドか`String#match`メソッドを利用します。
これらのメソッドは、正規表現の繰り返す`g`フラグ（globalの略称）と組み合わせてよく利用されます。

- `String#match(正規表現)`: 文字列中でマッチするものを検索する
    - マッチした文字列の配列を返す
    - マッチしない場合は null を返す。 
    - `g`フラグが有効化されている時は、マッチしたすべての結果を配列で返す
- `RegExp#exec(文字列)`: 文字列中でマッチするものを検索する
    - マッチした文字列の配列を返す
    - マッチしない場合は null を返す
    - `g`フラグが有効化されている時は、正規表現オブジェクト自身が最後にマッチしたインデックスを記憶する

通常の検索では、検索結果が見つかった時点で検索が終了します。
しかし、正規表現の`g`フラグを有効化することで、検索結果を見つけた場合も検索を続けることができます。

たとえば、`/[a-zA-Z]+/`という正規表現は`a`から`Z`のどれかの文字が1つ以上連続しているものにマッチします。
`String#match`メソッドは、`g`フラグのなしではマッチする最初の結果のみを返しますが、`g`フラグありではすべての結果を返します。

{{book.console}}
<!-- doctest:disable -->
```js
const string = "ABC あいう DE えお";
// gフラグなしでは、最初の結果のみを持つ配列を返す
const results = string.match(/[a-zA-Z]+/);
console.log(results); // => ["ABC"]
// aからZのどれかの文字が1つ以上連続するパターンにマッチするものを繰り返した（gフラグ）結果を返す
const resultsWithG = string.match(/[a-zA-Z]+/g);
console.log(resultsWithG[0]); // => "ABC"
console.log(resultsWithG[1]); // => "DE"
```

`RegExp#exec`メソッドも、`g`フラグの有無によって挙動が変化します。
`g`フラグなしではマッチした最初の結果のみを取得します。
しかし、`g`フラグありでは最後にマッチした末尾のインデックスを正規表現オブジェクトの`lastIndex`プロパティに記憶します。
次に、`exec`メソッドを呼び出すと最後にマッチした末尾のインデックスから検索が開始されます。

{{book.console}}
<!-- execの結果は配列に色々なプロパティが入っているためdoctest=deepEqualは失敗する -->
<!-- doctest:disable -->
```js
const string = "ABC あいう DE えお";
// gフラグなしでは、最初の結果のみを持つ配列を返す
const results = /[a-zA-Z]+/.exec(string);
console.log(results); // => ["ABC"]
// gフラグが有効化されているパターン
const alphabetsPattern = /[a-zA-Z]+/g;
// まだ一度も検索していないので、lastIndexは0となり先頭から検索開始される
console.log(alphabetsPattern.lastIndex); // => 0
// gフラグありでも、一回目の結果は同じだが、`lastIndex`プロパティが更新される
console.log(alphabetsPattern.exec(string)); // => ["ABC"]
console.log(alphabetsPattern.lastIndex); // => 3
// 2回目の検索が、`lastIndex`の値のインデックスから開始される
console.log(alphabetsPattern.exec(string)); // => ["DE"]
```

どちらのメソッドも`g`フラグによって挙動が変わり、`RegExp#exec`メソッドに`lastIndex`プロパティを変更するという副作用を持ちます。

#### マッチした一部の文字列を取得 {#match-capture-by-regexp}

`RegExp#exec`メソッドか`String#match`メソッドのどちらも正規表現のキャプチャリングに対応しています。
キャプチャリングとは、正規表現中で`/パターン1(パターン2)/`のように括弧で囲んだ部分を取り出すことです。
このキャプチャリングによって、正規表現でマッチした一部分だけを取り出せます。

`String#match`メソッド、`RegExp#exec`メソッドどちらもマッチした結果を配列として返します。

そのマッチしてるパターンにキャプチャが含まれている場合は、次のように返り値の配列へキャプチャした部分が追加されていきます。

<!-- doctest:disable -->
```js
const [マッチした全体の文字列, ...キャプチャされた文字列] = 文字列.match(/パターン(キャプチャ)/);
```

次のコードでは、`ECMAScript 数字`の`数字`部分だけを取り出そうとしています。
`String#match`メソッドとキャプチャリングによって数字(`\d`)にマッチする部分を取り出せています。

{{book.console}}
```js
// "ECMAScript (数字+)"にマッチするが、欲しい文字列は数字の部分のみ
const pattern = /ECMAScript (\d+)/i;
// 返り値は0番目がマッチした全体、1番目がキャプチャの1番目というように対応している
// [マッチした全部の文字列, キャプチャの1番目, キャプチャの2番目 ....]
// `pattern.exec("ECMAScript 6")`も返り値は同じ
const [all, capture1] = "ECMAScript 6".match(pattern);
console.log(all); // => "ECMAScript 6"
console.log(capture1); // => "6"
```

#### 真偽値を取得 {#test-by-regexp}

正規表現オブジェクトを使い、そのパターンにマッチするかをテストするには、`RegExp#test`メソッドを利用できます。

正規表現のパターンには、位置を指定する特殊文字があります。
そのため、「文字列による検索」で登場したメソッドは、すべての特殊文字と`RegExp#test`メソッドで表現できます。

- `String#startsWith`: `/^パターン/.test(文字列)`
- `String#endsWith`: `/パターン$/.test(文字列)`
- `String#includes`: `/パターン/.test(文字列)`

具体的な例を見てみましょう。

{{book.console}}
```js
// 検索対象となる文字列
const string = "にわにはにわにわとりがいる";
// ^ - 部分文字列が先頭ならtrue
console.log(/^にわ/.test(string)); // => true
console.log(/^いる/.test(string)); // => false
// $ - 部分文字列が末尾ならtrue
console.log(/にわ$/.test(string)); // => false
console.log(/いる$/.test(string)); // => true
// 部分文字列が含まれるならtrue
console.log(/にわ/.test(string)); // => true
console.log(/いる/.test(string)); // => true
```

その他にも、正規表現では繰り返しや文字の集合などを特殊文字で表現できるため、
Stringメソッドによる検索より曖昧検索を簡単に書くことができます。

### 文字列と正規表現どちらを使うべきか {#string-or-regexp}

Stringメソッドでの検索と同等のことは、正規表現でもできることがわかりました。
Stringメソッドと正規表現で同じ結果が得られる場合はどちらを利用するのがよいでしょうか？

正規表現は曖昧な検索に強く、特殊文字を使うことで柔軟な検索結果を得ることができます。
一方、曖昧であるため、コードを見ても何を検索しているかが正規表現のパターン自体から分からないことがあります。

次の例は、`/`から始まり`/`で終わる文字列かを判定する正規表現とStringメソッドを使った方法を比べたものです。
（これは意図的に正規表現に不利な例となっています）

正規表現の場合、`/^\/.*\/$/`のようにパターンそのものを見ても何をしたいのかはひと目では分かりにくいです。
Stringメソッドの場合は、`/`から始まり`/`で終わるかを判定してることがそのままコードにあらわれています。

{{book.console}}
```js
const string = "/正規表現のような文字列/";
// 正規表現で`/`から始まり`/`で終わる文字列のパターン
const regExpLikePattern = /^\/.*\/$/;
// RegExp#testメソッドでパターンにマッチするかを判定
console.log(regExpLikePattern.test(string)); // => true
// Stringメソッドで同等の判定をする関数
const isRegExpLikeString = (string) => {
    return string.startsWith("/") && string.endsWith("/");
};
console.log(isRegExpLikeString(string)); // => true
```

このように、正規表現は柔軟で便利ですが、コード上から意図が消えてしまいやすいです。
そのため、正規表現を扱う際にはコメントや変数名で具体的な意図を補足する必要があります。

「Stringメソッドと正規表現で同じ結果が得られる場合はどちらを利用するのがよいでしょうか？」という疑問に戻ります。
Stringメソッドで表現できることはStringメソッドで表現し、柔軟性や曖昧な検索が必要な場合はコメントとともに正規表現を利用するという方針を推奨します。

正規表現についてより詳しくは[正規表現 - JavaScript | MDN][]や、コンソールで実行しながら試せる[regex101][]のようなサイトを参照してください。

## 文字列の置換/削除 {#replace-delete}

文字列を一部を置換や削除するには`String#replace`メソッドを利用します。
「[データ型とリテラル][]」で説明したようにプリミティブ型である文字列は不変な特性をもちます。
そのため、文字列から一部の文字を削除するような操作はできません。

つまり、`delete`演算子は文字列に対して利用できません。
strict modeでは削除出来ないプロパティを削除しようとするエラーが発生します。
（strict modeでない場合はエラーも発生せず単に無視されます。）

{{book.console}}
```js
"use strict";
const string = "文字列";
// 文字列の0番目を削除を試みるがStrict modeは例外が発生
delete string[0]; // => Error
```

代わりに、`String#replace`メソッドなどで削除したい文字を取り除いた新しい文字列を返すことで削除を表現します。
`replace`メソッドは、**文字列**から第一引数の`検索文字列`また正規表現にマッチする部分を、第二引数の`置換文字列`へ置換します。
第一引数には、文字列または正規表現を指定できます。

<!-- doctest: ReferenceError -->
```js
文字列.replace("検索文字列", "置換文字列");
文字列.replace(/パターン/, "置換文字列");
```

次のように、`replace`メソッドで、削除したい部分を空文字へ置換することで、文字列を削除できます。

{{book.console}}
```js
const string = "文字列";
// "文字"を""（空文字）へ置換することで"削除"を表現
const newString = string.replace("文字", "");
console.log(newString); // => "列"
```

`replace`メソッドには正規表現も指定できます。
`g`フラグを有効化した正規表現を渡すことで、文字列からパターンにマッチするものをすべて削除できます。

{{book.console}}
```js
// 検索対象となる文字列
const string = "にわにはにわにわとりがいる";
// 文字列を指定した場合は、最初に一致したものだけが置換される
console.log(string.replace("にわ", "niwa")); // => "niwaにはにわにわとりがいる"
// `g`フラグなしの場合は、最初に一致したものだけが置換される
console.log(string.replace(/にわ/, "niwa")); // => "niwaにはにわにわとりがいる"
// `g`フラグで繰り返し置換を行う
console.log(string.replace(/にわ/g, "niwa")); // => "niwaにはniwaniwaとりがいる"
```

`replace`メソッドでは、キャプチャした文字列を利用しさらに複雑な置換処理をおこなうこともできます。

`replace`メソッドの第二引数にはコールバック関数を渡すことができます。
第一引数の`パターン`にマッチした部分がコールバック関数の返り値で置換されます。
コールバック関数の第一引数には`パターン`に一致した文字列全体、第二引数以降へキャプチャした文字列が順番に入ります。

<!-- doctest:disable -->
```js
const 置換した結果の文字列 = 文字列.replace(/(パターン)/, (all, ...captures) => {
    return 置換したい文字列;
});
```

例として、`2017-03-01`を`2017年03月01日`に置換する処理を書いてみましょう。

`/(\d{4})-(\d{2})-(\d{2})/`という正規表現が`"2017-03-01"`という文字列へマッチします。
コールバック関数の`year`、`month`、`day`にはそれぞれキャプチャした文字列が入り、
マッチした文字列全体がコールバック関数の返り値に置換されます。

{{book.console}}
```js
function toDateJa(dateString) {
    // パターンにマッチしたときのみ、コールバック関数で置換処理が行われる
    return dateString.replace(/(\d{4})-(\d{2})-(\d{2})/, (all, year, month, day) => {
        // `all`には、マッチした文字列全体が入っているが今回は利用しない
        // `all`が次の返す値で置換されるイメージ
        return `${year}年${month}月${day}日`;
    });
}
// マッチしない文字列の場合は、そのままの文字列が返る
console.log(toDateJa("本日ハ晴天ナリ")); // => "本日ハ晴天ナリ"
// マッチした場合は置換した結果を返す
console.log(toDateJa("今日は2017-03-01です")); // => "今日は2017年03月01日です"
```

## 文字列の組み立て {#built}

最後に文字列の組み立てについて見ていきましょう。
最初に述べたようにこの章の目的は、「自由な文字列を作れるようになること」です。

文字列を単純に結合したり置換することで新しい文字列を作れることがわかりました。
一方、構造的な文字列の場合は単純に結合するだけでは意味が異なってしまうことがあります。

ここでの構造的な文字列とは、URL文字列やファイルパス文字列といった構造をもつ文字列です。
たとえば、URL文字列は次のような構造を持っており、それぞれの要素に入る文字列の種類などが制限されています。(詳細は「[URL Standard][]」を参照)

```
"http://example.com/index.html"
 ^^^^   ^^^^^^^^^^^    
  |          |     ^^^^^^^^^^^
scheme      host     pathname
```

これらの文字列を作成する場合は、文字列結合演算子（`+`）で単純に結合するよりも専用の関数を用意する方が安全です。

たとえば、次のように`baseURL`と`pathname`を渡し、それらを結合したURLにあるリソースを取得する`getResource`関数があるとします。
この`getResource`関数には、ベースURL(`baseURL`)とパス（`pathname`）を引数にそれぞれ渡して利用します。

{{book.console}}
```js
// `baseURL`と`pathname`にあるリソースを取得する
function getResource(baseURL, pathname) {
    const url = baseURL + pathname;
    console.log(url); // => "http://example.com/resouces/example.js"
    // 省略) リソースを取得する処理...
}
const baseURL = "http://example.com/resouces";
const pathname = "/example.js";
getResource(baseURL, pathname);
```

しかし、人によっては、`baseURL`の末尾には`/`が含むと考える場合もあります。
`getResource`関数は、`baseURL`の末尾に`/`が含まれているケースを想定していませんでした。
そのため、意図しないURLからリソースを取得するという問題が発生します。

{{book.console}}
```js
// `baseURL`と`pathname`にあるリソースを取得する
function getResource(baseURL, pathname) {
    const url = baseURL + pathname;
    // `/` と `/` が２つ重なってしまっている
    console.log(url); // => "http://example.com/resouces//example.js"
    // 省略) リソースを取得する処理...
}
const baseURL = "http://example.com/resouces/";
const pathname = "/example.js";
getResource(baseURL, pathname);
```

この問題が難しいところは、結合してできた`url`は文字列としては正しいため、エラーではないということです。
つまり、一見すると問題ないように見えますが、実際に動かしてみて初めて分かるような問題が生じやすいです。

そのため、このような構造的な文字列を扱う場合は、専用の関数や専用のオブジェクトを作ることで安全に文字列を処理します。

先ほどのような、URL文字列の結合を安全に行うには、入力される`baseURL`文字列の表記揺れを吸収する仕組みを作成します。
次の`baseJoin`関数はベースURLとパスを結合した文字列を返しますが、ベースURLの末尾に`/`があるかの揺れを吸収しています。

{{book.console}}
```js
// ベースURLとパスを結合した文字列を返す
function baseJoin(baseURL, pathname) {
    // 末尾に / がある場合はそれを削除してから結合する
    const stripSlashBaseURl = baseURL.replace(/\/$/, "");
    return stripSlashBaseURl + pathname;
}
// `baseURL`と`pathname`にあるリソースを取得する
function getResource(baseURL, pathname) {
    const url = baseJoin(baseURL, pathname);
    // baseURLの末尾に`/`あってもなくても同じ結果となる
    console.log(url); // => "http://example.com/resouces/example.js"
    // 省略) リソースを取得する処理...
}
const baseURL = "http://example.com/resouces/";
const pathname = "/example.js";
getResource(baseURL, pathname);
```

ECMAScriptの範囲ではありませんが、URLやファイルパスといった典型的なものに対してはすでに専用のものがあります。
URLを扱うものとしてブラウザ上のAPIである[URL][]オブジェクト、Node.jsのコアモジュールである[Path][]モジュールなどがあります。URLのように専用の仕組みがある場合は、直接`+`演算子で結合するような文字列処理は避けるべきです。

### タグ付きテンプレート関数 {#tagged-template-function}

JavaScriptでは、テンプレートとなる文字列に対して一部分だけを変更する処理を行う方法として、タグ付きテンプレート関数があります。
タグ付きテンプレート関数とは、``` タグ関数`テンプレート` ```という形式で記述する関数とテンプレートリテラルをあわせた表現です。
関数の呼び出しに```タグ関数(`テンプレート`)```ではなく、``` タグ関数`テンプレート` ```という書式を使っていることに注意してください。

通常の関数として呼び出した場合、関数の引数にはただの文字列が渡ってきます。

{{book.console}}
```js
function tag(string) {
    // `string`にはただの文字列が渡ってくる
    console.log(string); // => "template 0 literal 1"
}
tag(`template ${0} literal ${1}`);
```

しかし、`()`ではなく ``` タグ関数`テンプレート` ``` と記述することで、`タグ関数`が受け取る引数にはタグ付きテンプレート向けの値が渡ってきます。

{{book.console}}
<!-- doctest:disable -->
```js
// タグ関数は引数の形が決まっていること以外は関数と同じ
function tag(strings, ...values) {
    // stringsには文字列部分が${}で区切られて順番に入る
    console.log(strings); // => ["template "," literal ",""]
    // valuesには${}の評価値が順番に入る
    console.log(values); // => [0, 1]
}
tag`template ${0} literal ${1}`;
```

どちらも同じ関数ですが、``` タグ関数`テンプレート` ```という書式で呼び出すと渡される引数が特殊な形になります。
そのため、タグ付きテンプレートで利用する関数のことを**タグ関数**（Tag function）と呼びわけることにします。

まずは引数をどう扱うかを見ていくために、タグ付きテンプレートの内容をそのまま結合して返す`stringRaw`というタグ関数を実装してみます。
`Array#reduce`メソッドを使うことで、テンプレートの文字列と変数を順番に結合できます。

{{book.console}}
```js
// テンプレートを順番どおりに結合した文字列を返すタグ関数
function stringRaw(strings, ...values) {
    return strings.reduce((result, string, i) => {
        return result + values[i - 1] + string;
    }); 
}
// 関数`テンプレートリテラル` という形で呼び出す
stringRaw`template ${0} literal ${1}`; // => "template 0 literal 1"
```

ここで実装した`stringRaw`タグ関数と同様のものが、`String.raw`という名前でビルトイン関数として提供されています。

```js
String.raw`template ${0} literal ${1}`; // => "template 0 literal 1"
```

タグ付きテンプレート関数を利用することで、テンプレートとなる文字列に対して特定の形式に変換したデータを埋め込むといったテンプレート処理が行なえます。

次のコードでは、テンプレート中の変数をURLエスケープしてから埋め込むタグ付きテンプレート関数を定義しています。
`encodeURIComponent`関数は引数の値をURLエスケープする関数です。
`escapeURL`では受け取った変数を`encodeURIComponent`関数でURLエスケープしてから埋め込んでいます。

{{book.console}}
```js
// 変数をURLエスケープするタグ関数
function escapeURL(strings, ...values) {
    return strings.reduce((result, string, i) => {
        return result + encodeURIComponent(values[i - 1]) + string;
    });  
}

const input = "A&B";
// escapeURLタグ関数を使ったタグ付きテンプレート
const escapedURL = escapeURL`https://example.com/search?q=${input}&sort=desc`;
console.log(escapedURL); // => "https://example.com/search?q=A%26B&sort=desc"
```

このようにタグ付きテンプレートリテラルを使うことで、コンテキストに応じた処理を付け加えることができます。
この機能はJavaScript内にHTMLなどの別の言語やDSL（ドメイン固有言語）を埋め込む際に利用されることが多いです。

## おわりに {#string-summary}

この章では、JavaScriptにおける文字列(`String`)関係について紹介しました。
文字列処理するStringメソッドにはさまざまなものがあり、正規表現と組み合わせて使うものも含まれます。

正規表現については、正規表現のみでひとつの本が作れるようなJavaScript言語内にある別言語です。
詳細は[正規表現 - JavaScript | MDN][]などを参照してください。

文字列は一見単純なオブジェクトに見えますが、多くの場合コンテキストを含んでいるため扱い方はさまざまです。
タグ付きテンプレートリテラルを利用することで、テンプレート中の変数は自動でエスケープするといったコンテキストを実現できます。
文字列を安全に扱うためには、コンテキストに応じた処理が必要になります。

## 参考 {#reference-for-string}

- [What every JavaScript developer should know about Unicode](https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/)
- Unicodeについて
    - [「文字数」ってなぁに？〜String, NSString, Unicodeの基本〜 - Qiita](http://qiita.com/takasek/items/19438ecf7e60c8d53bbc)
    - [プログラマのための文字コード技術入門 | Gihyo Digital Publishing … 技術評論社の電子書籍](https://gihyo.jp/dp/ebook/2014/978-4-7741-7087-9)
    - [文字コード「超」研究　改訂第2版【委託】 - 達人出版会](http://tatsu-zine.com/books/moji-code)
    - [Unicode のサロゲートペアとは何か - ひだまりソケットは壊れない](http://vividcode.hatenablog.com/entry/unicode/surrogate-pair)
    - [文字って何かね？ - Qiita](http://qiita.com/matarillo/items/91b9656428bed7a1a797)
    - [ものかの >> archive >> Unicode正規化　その１](http://tama-san.com/old/document03.html)
    - [結合文字列をUnicode正規化で合成する方法の危険性 - Qiita](http://qiita.com/monokano/items/d4c37d9bc9833eaeda6e)
    - [Unicode（絵文字） - CyberLibrarian](http://www.asahi-net.or.jp/~ax2s-kmtn/ref/unicode/emoji.html "Unicode（絵文字） - CyberLibrarian")
    - [Unicode Emoji](http://unicode.org/emoji/ "Unicode Emoji")
    - [JavaScript における文字コードと「文字数」の数え方 | blog.jxck.io](https://blog.jxck.io/entries/2017-03-02/unicode-in-javascript.html)
- 国際化APIについて
    - [Intl - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation)
    - [andyearnshaw/Intl.js](https://github.com/andyearnshaw/Intl.js/)
    - [ECMAScript® 2017 Internationalization API Specification](https://tc39.github.io/ecma402/)
    - [ウェブサイトをグローバル化するために便利なIntl APIの話 - Qiita](http://qiita.com/teyosh/items/b126f21a16b795885067 "ウェブサイトをグローバル化するために便利なIntl APIの話 - Qiita")
    - [カスタムの大文字と小文字の対応規則および並べ替え規則](https://msdn.microsoft.com/ja-jp/library/xk2wykcz(v=vs.110).aspx "カスタムの大文字と小文字の対応規則および並べ替え規則")
- 文字列の検索について
    - [四章第一回　文字列の操作 — JavaScript初級者から中級者になろう — uhyohyo.net](http://uhyohyo.net/javascript/4_1.html "四章第一回　文字列の操作 — JavaScript初級者から中級者になろう — uhyohyo.net")

[文字列とUnicode]: ../string-unicode/README.md "TODO: 文字列とUnicodeのリンク"
[エスケープシーケンス]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String#%E3%82%A8%E3%82%B9%E3%82%B1%E3%83%BC%E3%83%97%E3%82%B7%E3%83%BC%E3%82%B1%E3%83%B3%E3%82%B9
[twitter-text]: https://github.com/twitter/twitter-text  "twitter/twitter-text: Twitter Text Libraries"
[JavaScript has a Unicode problem · Mathias Bynens]: https://mathiasbynens.be/notes/javascript-unicode  "JavaScript has a Unicode problem · Mathias Bynens"
[プログラマのための文字コード技術入門]: https://gihyo.jp/magazine/wdpress/plus/978-4-7741-4164-0  "プログラマのための文字コード技術入門（WEB+DB PRESS plusシリーズ）｜gihyo.jp … 技術評論社"
[Can I use...]: http://caniuse.com/#feat=internationalization  "Can I use... Support tables for HTML5, CSS3, etc"
[正規表現 - JavaScript | MDN]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_Expressions  "正規表現 - JavaScript | MDN"
[regex101]: https://regex101.com/  "Online regex tester and debugger: PHP, PCRE, Python, Golang and JavaScript"
[データ型とリテラル]: ../data-type/README.md
[ECMA-402]: https://www.ecma-international.org/publications/standards/Ecma-402.htm  "Standard ECMA-402"
[URL Standard]: https://url.spec.whatwg.org/  "URL Standard"
[URL]: https://developer.mozilla.org/ja/docs/Web/API/URL  "URL - Web API インターフェイス | MDN"
[Path]: https://nodejs.org/api/path.html  "Path | Node.js v7.9.0 Documentation"

[^UnicodeTable]: Unicodeのカタカナの一覧 <https://unicode-table.com/jp/#katakana>
