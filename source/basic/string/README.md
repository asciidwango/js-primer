---
author: azu
---

# 文字列 {#string}

この章ではJavaScriptにおける文字列について学んでいきます。
文字列の表現やその背景にあるUnicodeを見ていき、文字列の操作方法について学びます。
そして、文字列を編集して自由な文字列を作れるようになることがこの章の目的です。

## 文字列を作成する {#create}

文字列を作成するには文字列リテラルを利用します。
文字列リテラルには3種類ありますが、まずは`"`（ダブルクオート）と`'`（シングルクオート）について見ていきます。
（[データ型とリテラル](../data-type/README.md#string)を参照）

`"`（ダブルクオート）と`'`（シングルクオート）に意味的な違いはありません。
そのため、どちらを使うかは好みやプロジェクトごとのコーディング規約によって異なります。
この書籍では、`"`（ダブルクオート）を主に文字列リテラルとして利用します。

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

<!-- textlint-enable eslint -->

文字列リテラルは同じ記号が対となるため、次のように文字列の中に同じ記号が出現した場合は、
`\"`のように`\`（バックスラッシュ）を使いエスケープする必要があります。

{{book.console}}
```js
const string = "This book is \"js-primer\"";
console.log(string); // => 'This book is "js-primer"'
```

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

特定の書式に値を埋め込みために文字列結合を行う場合には、
テンプレートリテラルを使うとより宣言的に書くことができます。

テンプレートリテラルは `` ` ``（バッククオート）で文字列を作成できる点は、`"`（ダブルクオート）や`'`（シングルクオート）と同じです。
加えて、テンプレートリテラルは文字列中に変数を埋め込むことができます。

テンプレートリテラル中に`${変数名}`で書かれた変数は評価時に展開されます。
つまり、先ほどの文字列結合は次のように書くことができます。

{{book.console}}
```js
const name = "JavaScript";
console.log(`Hello ${name}!`);// => "Hello JavaScript!"
```

## 文字列とは {#what-is-string}

今まで何気なく「文字列」という言葉を利用していましたが、ここでいう文字列とはどのようなものでしょうか？

「文字列」とは「文字」が順番に並んでいるものです。
これは、**配列**は**配列の要素**が順番に並んでいるという関係によく似ています。
文字列においても、配列と同様にインデックスを指定することで、指定したインデックスにある文字へアクセスできます。

`文字列[インデックス]`という記述することでアクセスでき、インデックスの値は`0`以上`2^53 - 1`未満の整数が指定できます。

```js
const string = "文字列";
// 配列と同じようにインデックスでアクセスできる
console.log(string[1]); // => "字"
```

文字列と文字の関係を簡単に紹介しましたが、実際の文字列はもっと複雑です。
私達は視覚的に文字を認識しますが、コンピュータでは文字の形ではなく、「ひらがなの『あ』という種類の文字」といった情報をやり取りします。
また、視覚的に見えない制御文字や結合文字のように情報を組み合わせて扱うものも存在します。

制御文字など含めた文字は、JavaScriptエンジン上で一意なビット列に変換されて扱われます。
文字をビット列へ変換することを符号化（エンコード）と呼びます。

文字とビット列の組み合わせを定義したものが文字コードであり、JavaScriptでは文字コードとしてUnicodeを採用しています。
また、Unicodeには文字をエンコードする方式としてUTF-8、UTF-16、UTF-32などがありますが、JavaScriptではUTF-16を採用しています。

まとめるとJavaScriptはUnicodeのUTF-16を採用しており、文字列はUTF-16でエンコードされたデータとしてやり取りされます。

### Code Point {#code-point}

Unicodeでは、文字と1対1で対応するビット列を表のようなもので管理されています。
たとえば、"A"という文字は表の56の位置にあるといった、文字とビット列の対応位置が決められています。
この、対応表における位置のことを符号位置（Code Point）と呼びます。

ES2015で追加された`String#codePointAt`メソッドを使うことで、その文字のCode Pointを取得できます。

```js
// 文字列"あ"の0番目のCode Pointを取得
console.log("あ".codePointAt(0)); // => 12354
```

逆に、`String.fromCodePoint`メソッドを使うことで、指定したCode Pointの文字を取得できます。

```js
// 符号位置12354の文字を取得する
console.log(String.fromCodePoint(12354)); // => "あ"
```

また、文字列リテラル中にはUnicodeエスケープシーケンスで、直接Code Pointを書くこともできます。
Code Pointは`\u{Code Pointの16進数の値}`で書くことができます。

```js
// "あ"のCode Pointは12354
// 12354の16進数表現は3042
console.log("\u{3042}"); // => "あ"
```

Code Pointの16進数表現は次のようにして求めることができます。

```js
// "あ"のCode Pointは12354
const codePointOfあ = "あ".codePointAt(0);
// 12354の16進数表現は"3042"
const hexOfCodePoint = codePointOfあ.toString(16);
// \はエスケープシーケンスであるため、\自体を表現するにはエスケープが必要
console.log("\\u{" + hexOfCodePoint + "}"); // => "\\u{3042}"
```

直接キーボードから入力が難しい特殊な文字や絵文字などは、Unicodeエスケープシーケンスを使うことでソースコード上に安全に書くことができます。

### Code Unit {#code-unit}

符号単位（Code Unit）は、文字を構成する最小の単位ですが、解説をする前にまずUnicodeの歴史を振り返る必要があります。

Unicodeは元々16ビットつまり最大65,536文字で世界中の文字が収まるという前提で、文字とCode Pointの組み合わせを定義していました。
しかし、今もなお増えている文字が65,536文字で収まるわけもなく、1文字（1つのCode Point）が16ビット1つで表現できるという前提は崩れてしまいました。
そこで、16ビットを2つ並べることによって扱える文字数を増やすエンコード方式がUnicodeに追加されました。
このエンコード方式がUTF-16です。

JavaScriptの仕様であるECMAScriptもUTF-16を採用しているため、この16ビットを2つ並べることで1文字（1つのCode Point）を表現できます。
JavaScriptにおいては、この16ビット1つのことを**符号単位（Code Unit）**とよび、文字列における最小の単位です。
そのため、すべての文字列はCode Unitが並んでいるものとして扱われます。

16ビット1つで表現できる文字の場合は、**Code Point**と**Code Unit**が同じ値を示します。

Code UnitもCode Pointと同じく、Unicodeエスケープシーケンスとして文字列リテラルに書くことができます。
Code Pointとよく似ていますが、`\u4桁の16進数`と文字列リテラル中に書くことができます。

```js
// Code Unit
"\u3042"; // => "あ"
// Code Point
"\u{3042}"; // => "あ"
```

1つの16ビットで表現できない文字をUTF-16では2つの16ビットで表現します。
この表現方法を**サロゲートペア**とよび、Code Unit2つで1つのCode Pointを表現します。

UTF-16では次の範囲をサロゲートペアの領域としています。

- `\uD800`～`\uDBFF`：上位サロゲートの範囲
- `\uDC00`～`\uDFFF`：下位サロゲートの範囲

<!-- textlint-disable -->

これは、文字列中に上位サロゲートであるCode Unitが登場したとき、
次のインデックスにある下位サロゲートであるCode Unitを組み合わせて1文字（厳密にはCode Point）とするということです。

<!-- textlint-enable -->

具体的にサロゲートペアの文字である「𩸽（ほっけ）」は次の2つのCode Unitで表現できます。

```js
// 上位サロゲート + 下位サロゲートの組み合わせ
"\uD867\uDE3D"; // => "𩸽"
// Code Pointでの表現
"\u{29e3d}"; // => "𩸽"
```

このようにCode Unitは歴史的な経緯もあり、1つまたは2つのCode Unitで1つのCode Pointを表現します。
JavaScriptでは基本的にStringメソッドは、文字列をCode Unitが並んでいるものとして扱います。

```js
"文字列";
// == 内部的にはCode Unitが並んでいるもの
"\u6587\u5b57\u5217"; // => "文字列"
// インデックスでのアクセスもCode Unitごと
"𩸽"[0]; // => "\uD867"
```

次の3つは例外として、文字列をCode Pointが並んでいるように扱います。

- Iterator（`for...or`や`Array.from`など)
- メソッドに`CodePoint`という名前を含むもの
- `u`（Unicode）フラグが有効化されている正規表現

### 文字列とCode UnitとCode Point {#string-code-unit-code-point}

ここまでを踏まえて、JavaScriptにおける文字列とは何かということをまとめると次のように言い表せます。

- 「文字列」は「Code Unit」が順番に並んだもの
- 「文字列」は「Code Point」ごとに扱う方法が別途用意されている

このように文字列を扱うStringメソッドにおいては、各Code Unitごとに処理されている前提が、直感的ではない結果を発生させることがあります。

この章では、どのような場面でこの仕組みを意識するのかを考えつつStringメソッドについて見ていきます。
Unicodeについて詳しくは[プログラマのための文字コード技術入門][]などを参照してください。

## 文字列の分解と結合 {#split-join}

文字列を配列へ分解するには`String#split`メソッドを利用できます。
一方、配列の要素を結合し文字列にするは`Array#join`メソッドが利用できます。

この２つはよく組み合わせて利用されるため、あわせてみていきます。

`String#split`メソッドは、第一引数に指定した区切り文字で文字列を分解した配列を返します。
次のコードでは、文字列を`・`で区切った配列を作成しています。

```js
const strings = "赤・青・緑".split("・");
console.log(strings); // => ["赤", "青", "緑"]
```

分解してできた文字列の配列を結合して文字列を作る際に、`Array#join`メソッドがよく利用されます。
`Array#join`メソッドの第一引数には区切り文字を指定し、その区切り文字で結合した文字列を返します。

この２つを合わせれば、区切り文字を`・`から`、`へ変換する処理を次のように書くことができます。

```js
const string = "赤・青・緑".split("・").join("、");
console.log(string); // => "赤、青、緑"
```

`String#split`メソッドの第一引数には正規表現を指定することもできます。
これを利用すると、次のように文字列をスペースで区切るような処理が簡単に書くことができます。

```js
// 文字列を1つ以上のスペースを区切りにして分解する
const strings = "a b    c      d".split(/\s+/);
console.log(strings); // => ["a", "b", "c", "d"] 
```

### `String#split`と空文字 {#split-and-empty-string}

`String#split`メソッドでは、空文字（`""`）を区切り文字として指定し、文字列を**文字**の配列にする方法として紹介されることがあります。

```js
// 空文字("")で文字列を分解する
const characters = "文字列".split("");
console.log(characters); // => ["文", "字", "列"]
```

しかし、この空文字での区切り方には問題があります。

一部を除いた文字列操作は、基本的に文字列をCode Unitが並んでいるものとして扱います。
つまり、`split`メソッドも各Code Unitごとに文字列を分解しています。

次のコードを見ると、`string.split("")`は各**文字**ごとで分解するのではなく、各**Code Unit**ごとに分解していることが分かります。

```js
// "𩸽"はサロゲートペアであるため2つのCode Unit（\uD867\uDE3D）からなる
// サロゲートペアを含む文字列を各Code Unitに分解
const codeUnitElements = "𩸽のひらき".split("");
// サロゲートペアを各CodeUnitに分解したため、文字化けしている
console.log(codeUnitElements); // ["�", "�", "の", "ひ", "ら", "き"] 
```

サロゲートペアを含んだ文字列をそれぞれの**Code Point**へ分解するには、Iteratorを利用するが簡単です。
文字列はIteratorを実装しているIterableという特性をもち、また文字列のIteratorはそれぞれのCode Pointごとに列挙します。

そのため、Iterableを扱える`Array.from`メソッドや`...`（spread構文）を利用することで、
文字列をそれぞれのCode Pointごとに分解できます。

```js
const string = "𩸽のひらき";
// Array.fromメソッドで文字列を分解
console.log(Array.from(string)); // => ["𩸽", "の", "ひ", "ら", "き"]
// ...（spread構文）で文字列を展開しものを配列にする
console.log([...string]); // => ["𩸽", "の", "ひ", "ら", "き"]
// for...ofもIteratorを列挙するため、Code Pointごとで列挙できる
for (const codePoint of string) {
    console.log(codePoint);
}
```

絵文字などサロゲートペアを含む文字列をそれぞれの**Code Unit**で分解すると、加工して結合すると化けてしまうなどの問題が発生しやすいです。
Iteratorを利用すればサロゲートペアもそれぞれの**Code Point**で扱うことができます。

しかし、JavaScriptにおいて、見た目どおりの**文字**ごとに処理を行う標準的な方法は用意されていません。
結合文字などを考慮した**文字**について、詳しくは[JavaScript has a Unicode problem · Mathias Bynens][]を参照してください。

## 文字列の長さ {#length}

`String#length`プロパティは文字列の要素数を返します。
文字列のそれぞれの要素はCode Unitであるため、`length`プロパティはCode Unitの数を返します。
つまり、サロゲートペアを含む文字列は視覚的な長さとは異なった値になります。

```js
console.log("文字列".length); // => 3
// 評価結果の文字列の要素数（Code Unit数)であるため1つ
console.log("\u{3042}".length); // => 1
// サロゲートペアを含むためCode Unitは6つ
console.log("𩸽のひらき".length); // => 6;
```

これは、`文字列.split("").length`と同じ結果です。

### Code Pointの数 {#code-points-length}

一般に言われる**文字列の長さ**とは視覚的な文字の数を表すことが多いため、
`String#length`だけでは**文字列の長さ**を得ることが難しいです。

たとえば、絵文字はUnicodeとして定められており、これらはサロゲートペアとして表現されています。
そのため、絵文字などサロゲートペアを含む文字列が日常的に使われるようになった今では、
Code Unitの数を文字列の長さとしたときに直感と反する場合が増えてきています。

たとえば、Twitterにおける140文字の**文字数**にはCode Pointの数をベースにしています。（[twitter-text][]というライブラリとして公開されています。）
`Array.from`メソッドを利用すれば、文字列におけるCode Pointの数は次のようにして取得できます。

```js
// Code Pointごとの配列にする
// Array.fromメソッドはIteratorを配列にする
const codePoints = Array.from("𩸽のひらき");
console.log(codePoints.length); // => 5
```

Code Pointの数を数えた場合も、結合文字など視覚的に見えないものを1つと数えてしてしまいます。そのため、文字として数えたくないものは正規表現で取り除く必要があるなど、視覚的な**文字列の長さ**を数えるにはさらなる工夫が必要になります。

<!-- textlint-disable preset-ja-technical-writing/no-doubled-joshi -->

ECMAScriptが参照するUnicodeの仕様も更新されて続けています。
そのため、文字列の長さを正確に測るにはある程度の妥協が必要になります。

<!-- textlint-enable preset-ja-technical-writing/no-doubled-joshi -->

## 文字列の比較 {#compare}

文字列の比較には`===`（厳密比較演算子）を利用します。

```js
console.log("文字列" === "文字列"); // => true
// 文字列の評価結果を比較するため、評価結果の文字列はどちらも同じ
console.log("𩸽のひらき" === "\u{29e3d}のひらき"); // => true
// 一致しなければfalseとなる
console.log("JS" === "ES"); // => false
```

次の条件を満たしていれば同じ文字列となります。

- 文字列の要素であるCode Unitが同じ順番で並んでいるか
- 文字列の長さ（length）は同じか

また、`===`などの比較演算子だけではなく、
`>`、`、`、`>=`、`<=`など大小の関係演算子で文字列同士を比較することもできます。

これらの関係演算子も、文字列の要素であるCode Unitの数値を先頭から順番に比較します。
しかし、これらの関係演算子は暗黙的な型変換を行うため事前に文字列同士であるかのチェックが必要です。

文字列からCode Unitの数値を取得するには`String#charCodeAt`メソッドを利用します。

```js
// "A"と"B"のCode Unitは65と66
console.log("A".charCodeAt(0)); // => 65
console.log("B".charCodeAt(0)); // => 66
// "A"（65）は"B"（66）よりCode Unitの値が小さい
console.log("A" > "B"); // => false
// 先頭から順番に比較し C > D が falseであるため
console.log("ABC" > "ABD"); // => false
```

このように、JavaScriptの文字列比較はCode Unitがベースとなります。

この「先頭から順番に比較する」という仕様は、数字の文字列を数値順にソートしたい時などに問題が起きます。
次のように、`["10", "2", "1"]`という数字の配列を`Array#sort`メソッドで昇順ソートした場合、直感的には`["1", "2", "10"]`となることを期待します。
しかし、実際の結果は`["1", "10", "2"]`となります。

```js
const numberStrings = ["10", "2", "1"];
// Array#sortは、デフォルトでは配列の要素を`<`で比較する
// 文字列同士を`<`で比較し、Code Unitの値で昇順にした配列を返している
console.log(numberStrings.sort()); // => ["1", "10", "2"]
```

なぜなら、`"10" < "2"`を比較した場合に、先頭の文字（Code Unit）から順番に比較されるためです。
まず`"10"[0] < "2"[0]`が比較され`true`となり、`"10"`が`"2"`より小さいと判定されます。

```js
console.log("10" < "2"); // => true
// 数値同士なら10の方が大きい
console.log(10 < 2); // => false
```

数字の比較だけではなく、文字列の比較は地域や言語によって「自然な結果」が異なります。
たとえば、`ä`（アクセント付きa）と`z`は、アメリカ英語のアルファベットでは`ä`の方が後ろの位置にありますが、
スウェーデンアルファベットでは`ä`の方が前になります。

このように文字列の並び順をひとつとっても、地域や言語によって異なるため、ローカライズする必要があります。
JavaScriptでは、ECMAScriptの関連仕様として国際化API（ECMAScript Internationalization API）があります。
（Internationalizationは長いためしばしばi18nと省略されることがあります）

この書籍では詳しく紹介しませんが、国際化APIは`Intl`オブジェクトにあり、言語に依存した整形や比較などが利用できます。
`Intl`オブジェクトはECMAScriptの仕様ではなく、[ECMA-402][]と呼ばれる「ECMAScriptに関連する仕様」という位置づけになっています。
そのため、すべての実行環境で実装されているわけではありません。

ブラウザにおけるサポート状況については[Can I use...][]で見ることができます。

先ほどの数字のソートについては、国際化APIのひとつである`Intl.Collator`コンストラクタを利用することで地域化できます。
`Intl.Collator`はさまざまなオプションを持ちますが、`numeric`オプションを`true`にすることで数字を数値として比較できます。

```js
// numericをtrueとすると数字が数値として比較されるようになる
const collator = new Intl.Collator("ja", { numeric: true });
// collator.compareはsortに渡せる関数となっている
const sortedValues = ["1", "10", "2"].sort(collator.compare);
console.log(sortedValues);  // => ["1", "2", "10"]
```

文字列の比較においては、単純な比較であれば、`===`（厳密比較演算子）や`>`（大なり演算子）を利用します。
その地域や言語においてのより自然な形を求める場合は、ローカライズするために国際化APIなどを利用できます。

## 部分文字列の取得 {#slice}

文字列からその一部を取り出したい場合には、`String#slice`メソッドや`String#substring`メソッドが利用できます。

`slice`メソッドについては、すでに配列で学んでいますが、基本的な動作は文字列でも同様です。
まずは`slice`メソッドについて見ていきます。

`String#slice`メソッドは、第一引数に開始位置、第二引数に終了位置を指定しその範囲を取り出し新しい文字列を返します。
第二引数は省略でき、省略した場合は文字列の末尾が終了位置となります。

位置にマイナスの値を指定した場合は文字列の末尾から数えた位置となります。
また、第一引数の位置が第二引数の位置より大きい場合、常に空の文字列を返します。

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

`slice`メソッドと`substring`メソッドの引数に直接`1`や`4`といった位置を指定することは少ないです。
次のように、`String#indexOf`メソッドなど位置を取得するものと組み合わせて使うことが多いでしょう。

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

- `文字列.indexOf("部分文字列")`: 先頭からの検索し、インデックスを返す
- `文字列.lastIndexOf("部分文字列")`: 末尾から検索し、インデックスを返す

どちらのメソッドも一致する文字列が複数個ある場合でも、指定した部分文字列を1度見つけた時点で検索は終了します。

```js
// 検索対象となる文字列
const string = "にわにはにわにわとりがいる";
// indexOfは先頭から検索しインデックスを返す - "**にわ**にはにわにわとりがいる"
// "にわ"の先頭のインデックスを返すため 0 となる
console.log(string.indexOf("にわ")); // => 0
// lastIndexOfは末尾から検索しインデックスを返す- "にわにはにわ**にわ**とりがいる"
console.log(string.lastIndexOf("にわ")); // => 6
// 該当する部分文字列が見つからない場合は -1 を返す
console.log(string.indexOf("キーワード")); // => -1
```

検索している部分文字列の長さは固定であるため、一致した文字列は自明ですが、
`String#slice`と取得したインデックスを組み合わせることで検索結果を取得できます。

```js
const string = "JavaScript";
const searchWord = "Script";
const index = string.indexOf("Script");
if (index !== -1) {
    console.log(string.slice(index, index + searchWord.length)); // => searchWord
} else {
    console.log(`${searchWord}は見つかりませんでした`);
}
```

ES2015より前では`String#indexOf`メソッドしか固定文字列の検索できませんでした。
そのため、`string.indexOf("検索文字列") !== -1`で`"検索文字列"`が含まれているかを表現するイディオムがありました。
しかし、ES2015以降は`String#includes`メソッドなど、より適切な真偽値を取得するメソッドが追加されています。

```js
// indexOfで含まれているかを判定する表現するイディオム
console.log("にわにはにわとりがいる".indexOf("にわ") !== -1); // => true
// String#includesによる同等の表現
console.log("にわにはにわとりがいる".includes("にわ")); // => true
```

#### 真偽値の取得 {#test-by-string}

「文字列」に「部分文字列」が含まれているかを検索する方法がいくつか用意されています。

- `文字列.startsWithstartsWith("部分文字列")`: 先頭にあるかの真偽値を返す[ES2015]
- `文字列.endsWith("部分文字列")`: 終端にあるかの真偽値を返す[ES2015]
- `文字列.includes("部分文字列")`: 含むかの真偽値を返す[ES2015]

具体的な例をいくつか見てみましょう。

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
正規表現リテラルでは、動的に正規表現オブジェクトを生成することはできません。
そのため、`RegExp`コンストラクタは、変数をパターンに埋め込んだ正規表現を生成する際に利用されます。

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

- `String#indexOf(部分文字列)`: 部分`文字列にマッチした文字列のインデックスを返す
- `String#search(/パターン/)`: 正規表現のパターンにマッチした文字列のインデックスを返す

文字列による検索は、検索しマッチした文字列の長さが決まっているため、`indexOf`メソッドでインデックスを取得することに意味がありました。
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

そのため、マッチした文字列そのものを取得するには`RegExp#exec`メソッドか`String#match`メソッドを利用します。
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
// aからZのどれかの文字が1つ以上連続するパターンにマッチするものを繰り返した（gフラグ)結果を返す
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

どちらのメソッドも正規表現のパターン内にかかれた`(`と`)`で囲んだ部分を取得できます。
この`/パターン(パターン)/`のように括弧で囲んだ部分を取り出せるようにすることをキャプチャリングと呼びます。

正規表現のパターン全体に一致する文字列は必要ないですが、`()`で囲んだ部分（キャプチャした部分）の文字列だけが欲しいという場合に利用できます。
`String#match`メソッド、`RegExp#exec`メソッドどちらもマッチした結果として配列を返します。

そのマッチしてるパターンにキャプチャが含まれている場合は、次のように返り値の配列へキャプチャした部分が追加されていきます。

<!-- doctest:disable -->
```js
const [マッチした文字列, ...キャプチャされた文字列] = 文字列.match(/パターン(キャプチャ)/);
```

具体的な例を見てみましょう。

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
Stringメソッドによる検索より曖昧検索が簡単に書くことができます。

### 文字列と正規表現どちらを使うべきか {#string-or-regexp}

Stringメソッドでの検索と同等のことは、正規表現でもできることがわかりました。
Stringメソッドと正規表現で同じ結果が得られる場合はどちらを利用するのがよいでしょうか？

正規表現は曖昧な検索に強く、特殊文字を使うことで柔軟な検索結果を得ることができます。
一方、曖昧であるため、コードを見ても何を検索しているかが正規表現のパターン自体から分からないことがあります。

次の例は、`/`から始まり`/`で終わる文字列かを判定する正規表現とStringメソッドを使った方法を比べたものです。
（これは意図的に正規表現に不利な例となっています）

正規表現の場合、`/^\/.*\/$/`のようにパターンそのものを見ても何をしたいのかはひと目では分かりにくいです。
Stringメソッドの場合は、`/`から始まり`/`で終わるかを判定してることがそのままコードにあらわれています。

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

```js
const string = "文字列";
// "文字"を""（空文字）へ置換することで"削除"を表現
const newString = string.replace("文字", "");
console.log(newString); // => "列"
```

`replace`メソッドには正規表現も指定できます。
`g`フラグを有効化した正規表現を渡すことで、文字列からパターンにマッチするものをすべて削除できます。

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
たとえば、URL文字列は次のような構造を持っており、それぞれの要素に入る文字列の種類などが制限されています。(「[URL Standard][]」を参照)

```
"http://example.com/index.html"
 ^^^^   ^^^^^^^^^^^    
  |          |     ^^^^^^^^^^^
scheme      host     pathname
```

これらの文字列を作成する場合は、文字列結合演算子（`+`）で単純に結合するよりも専用の関数を用意する方が安全です。

たとえば、次のように`baseURL`と`pathname`を渡し、それらを結合したURLにあるリソースを取得する`getResource`関数があるとします。
この`getResource`関数には、ベースURLとベースURLからのパスを引数にそれぞれ渡して利用します。

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
この場合は`getResource`関数の内部で、`baseURL`と`pathname`を結合してできたURLは異なります。
そのため、意図しないURLからリソースを取得するという問題が発生します。

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

この問題が難しいところは、結合してできた`url`は文字列としては正しいためエラーではないということです。
つまり、一見すると問題ないように見えますが、実際に動かしてみて初めて分かるような問題が生じやすいです。

そのため、このような構造的な文字列を扱う場合は、専用の関数や専用のオブジェクトを利用することでより安全に文字列を処理できます。

先ほどのような、URL文字列の結合を安全に行うには、入力される`baseURL`文字列の揺れを吸収する仕組みを作成します。
次の`baseJoin`関数はベースURLとパスを結合した文字列を返しますが、ベースURLの末尾に`/`があるかの揺れを吸収しています。

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
URLを扱うものとしてブラウザ上のAPIである[URL][]オブジェクト、Node.jsのコアモジュールである[Path][]モジュールなどがあります。構造が決まっている文字列において、それ向けの仕組みがある場合はそちらを利用することをお勧めします。

### タグ付きテンプレート関数 {#tagged-template-function}

文字列操作を行う場合にコンテキストをもつ文字列では気をつける必要があります。
しかし、文字列処理をする際に毎回関数で囲んで書くとコードの見た目が分かりにくい場合もあります。

次のようなユーザー入力を受け取り構築されるURLを考えてみましょう。
次の`input`にはユーザー入力、つまり外部から受け取った任意の文字列が入ります。

```js
// ユーザー入力
const input = "test";
// ユーザー入力を使ってURLを構築
const searchURL = `https://example.com/search?query=${input}&sort=desc`;
```

このとき、単純な文字列結合だとユーザー入力によってはURLが壊れてしまいます。
なぜなら、ユーザー入力に`&`や`/`などが含まれているとURLの意味合いが変わってしまったり、
URLには含められない文字列があるためです。

```js
// ユーザ入力
const input = "/";
// URLエスケープせずに結合した場合
const URL = `https://example.com/search?query=${input}&sort=desc`;
// `query`のパラメータのはずがパスの区切り文字と解釈されてしまう
console.log(URL); // => "https://example.com/search?query=/&sort=desc"
```

そのため、URLのパラメータなどにユーザー入力を含めるためにはURLエスケープする必要があります。
JavaScriptでは、`encodeURIComponent`関数を使うことで文字列をURL中に埋め込んでも安全な文字列へエスケープできます。

```js
// ユーザ入力
const input = "/";
// URLエスケープして結合した場合
const URL = `https://example.com/search?query=${encodeURIComponent(input)}&sort=desc`;
// `/`が`%2F`へURLエスケープされている
console.log(URL); // => "https://example.com/search?query=%2F&sort=desc"
```

このように、変数（ユーザー入力など）をURLエスケープしてから文字列結合してもよいのですが、変数の数だけURLエスケープの関数を書く必要があります。そのため、変数をひとつでもURLエスケープし忘れると安全ではなくなります。

このようなエスケープ忘れなどの問題は、デフォルトを安全側に倒すことでコーディングミスが起きても問題をレベルを小さくする工夫が必要です。
ここでは、タグ付きテンプレート（Tagged Template）を使い、テンプレート中の変数を自動でエスケープする処理を加えることができます。

タグ付きテンプレートとは、``` タグ関数`テンプレート` ```という形式で記述する関数とテンプレートリテラルをあわせた表現です。
関数の呼び出しに```タグ関数(`テンプレート`)```ではなく、``` タグ関数`テンプレート` ```という書式を使っていることに注意してください。

通常の関数として呼び出した場合、引数にはただの文字列が渡ってきます。

```js
function tag(string) {
    console.log(string); // => "template 0 literal 1"
}
tag(`template ${0} literal ${1}`);
```

しかし、`()`ではなく ``` タグ関数`テンプレート` ``` と記述することで、`タグ関数`が受け取る引数にはタグ付きテンプレート向けの値が渡ってきます。
そのため、タグ付きテンプレートで利用する関数のことを、タグ関数（Tag function）と呼び分けることにします。

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

タグ関数の引数は特殊な形をしていることが分かります。
引数をどう扱うかを見ていくために、タグ付きテンプレートの内容をそのまま結合して返す`stringRaw`というタグ関数を実装してみます。
`Array#reduce`メソッドを使うことで、テンプレートの文字列と変数を順番に結合できます。

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

ここで実装した`stringRaw`関数と同様のものが、`String.raw`という名前でビルトイン関数として提供されています。

```js
String.raw`template ${0} literal ${1}`; // => "template 0 literal 1"
```


それでは、テンプレート中の変数をURLエスケープするタグ付きテンプレートを実装してみましょう。
`encodeURIComponent`関数を利用し、変数をURLエスケープする`escapeURL`タグ関数を定義します。
このタグ関数を使うことで、テンプレートリテラル中の変数がURLエスケープできます。

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

この章では、JavaScriptにおける文字列とは何かやUnicodeとの関係について紹介しました。
文字列処理を行うStringメソッドにはさまざまなものがあり、正規表現との組み合わせ使うものも含まれます。

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
- 国際化APIについて
    - [Intl - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation)
    - [andyearnshaw/Intl.js](https://github.com/andyearnshaw/Intl.js/)
    - [ECMAScript® 2017 Internationalization API Specification](https://tc39.github.io/ecma402/)
    - [ウェブサイトをグローバル化するために便利なIntl APIの話 - Qiita](http://qiita.com/teyosh/items/b126f21a16b795885067 "ウェブサイトをグローバル化するために便利なIntl APIの話 - Qiita")
    - [カスタムの大文字と小文字の対応規則および並べ替え規則](https://msdn.microsoft.com/ja-jp/library/xk2wykcz(v=vs.110).aspx "カスタムの大文字と小文字の対応規則および並べ替え規則")
- 文字列の検索について
    - [四章第一回　文字列の操作 — JavaScript初級者から中級者になろう — uhyohyo.net](http://uhyohyo.net/javascript/4_1.html "四章第一回　文字列の操作 — JavaScript初級者から中級者になろう — uhyohyo.net")

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
