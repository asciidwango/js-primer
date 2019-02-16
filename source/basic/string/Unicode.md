---
author: azu
---

TODO: ここから未完成。

## 文字列と文字コード {#string-encoding}

## 文字列とは {#what-is-string}

今まで何気なく「文字列」という言葉を利用していましたが、ここでいう文字列とはどのようなものでしょうか？

「文字列」とは「文字」が順番に並んでいるものです。
これは、**配列**は**配列の要素**が順番に並んでいるという関係によく似ています。
文字列においても、配列と同様にインデックスを指定することで、指定したインデックスにある文字へアクセスできます。

`文字列[インデックス]`という記述することでアクセスでき、インデックスの値は`0`以上`2^53 - 1`未満の整数が指定できます。

{{book.console}}
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

TODO: これはCodeUnitでアクセスしてしまっている例。

```js
"𠮷"[0];
```

### Code Point {#code-point}

Unicodeでは、文字と1対1で対応するビット列を表のようなもので管理されています。
たとえば、"A"という文字は表の56の位置にあるといった、文字とビット列の対応位置が決められています。
この、対応表における位置のことを符号位置（Code Point）と呼びます。

ES2015で追加された`String#codePointAt`メソッドを使うことで、その文字のCode Pointを取得できます。

{{book.console}}
```js
// 文字列"あ"の0番目のCode Pointを取得
console.log("あ".codePointAt(0)); // => 12354
```

逆に、`String.fromCodePoint`メソッドを使うことで、指定したCode Pointの文字を取得できます。

{{book.console}}
```js
// 符号位置12354の文字を取得する
console.log(String.fromCodePoint(12354)); // => "あ"
```

また、文字列リテラル中にはUnicodeエスケープシーケンスで、直接Code Pointを書くこともできます。
Code Pointは`\u{Code Pointの16進数の値}`で書くことができます。

{{book.console}}
```js
// "あ"のCode Pointは12354
// 12354の16進数表現は3042
console.log("\u{3042}"); // => "あ"
```

Code Pointの16進数表現は次のようにして求めることができます。

{{book.console}}
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

- Iterator（`for...of`や`Array.from`など）
- メソッドに`CodePoint`という名前を含むもの
- `u`（Unicode）フラグが有効化されている正規表現

### 文字列とCode UnitとCode Point {#string-code-unit-code-point}

ここまでを踏まえて、JavaScriptにおける文字列とは何かということをまとめると次のように言い表せます。

- 「文字列」は「Code Unit」が順番に並んだもの
- 「文字列」は「Code Point」ごとに扱う方法が別途用意されている

このように文字列を扱うStringメソッドにおいては、各Code Unitごとに処理されている前提が、直感的ではない結果を発生させることがあります。

この章では、どのような場面でこの仕組みを意識するのかを考えつつStringメソッドについて見ていきます。
Unicodeについて詳しくは[プログラマのための文字コード技術入門][]などを参照してください。


----


JavaScriptの文字列処理は基本的には文字列に対してCode Unitが並んだものとしてアクセスしている。
サロゲートペアの際に問題がおきる場合があります。

----

### `String#split`と空文字 {#split-and-empty-string}

`String#split`メソッドでは、空文字（`""`）を区切り文字として指定し、文字列を**文字**の配列にする方法として紹介されることがあります。

{{book.console}}
```js
// 空文字("")で文字列を分解する
const characters = "文字列".split("");
console.log(characters); // => ["文", "字", "列"]
```

しかし、この空文字での区切り方には問題があります。

一部を除いた文字列操作は、基本的に文字列をCode Unitが並んでいるものとして扱います。
つまり、`split`メソッドも各Code Unitごとに文字列を分解しています。

次のコードを見ると、`string.split("")`は各**文字**ごとで分解するのではなく、各**Code Unit**ごとに分解していることが分かります。

{{book.console}}
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

{{book.console}}
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

しかし、JavaScriptにおいて、見た目どおりの**文字**ごとに処理する標準的な方法は用意されていません。
結合文字などを考慮した**文字**について、詳しくは[JavaScript has a Unicode problem · Mathias Bynens][]を参照してください。


## 文字列の長さ {#length}

`String#length`プロパティは文字列の要素数を返します。
文字列のそれぞれの要素はCode Unitであるため、`length`プロパティはCode Unitの数を返します。
つまり、サロゲートペアを含む文字列は視覚的な長さとは異なった値になります。

{{book.console}}
```js
console.log("文字列".length); // => 3
// 評価結果の文字列の要素数（Code Unit数）であるため1つ
console.log("\u{3042}".length); // => 1
// サロゲートペアを含むためCode Unitは6つ
console.log("𩸽のひらき".length); // => 6
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

{{book.console}}
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

## 文字列の比較 {#compare-string-codeunit}

次の条件を満たしていれば同じ文字列となります。

- 文字列の要素であるCode Unitが同じ順番で並んでいるか
- 文字列の長さ（length）は同じか

また、`===`などの比較演算子だけではなく、
`>`、`、`、`>=`、`<=`など大小の関係演算子で文字列同士の比較もできます。

これらの関係演算子も、文字列の要素であるCode Unitの数値を先頭から順番に比較します。
しかし、これらの関係演算子は暗黙的な型変換をするため、事前に文字列同士であるかのチェックが必要です。

文字列からCode Unitの数値を取得するには`String#charCodeAt`メソッドを利用します。

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

このように、JavaScriptの文字列比較はCode Unitがベースとなります。

この「先頭から順番に比較する」という仕様は、数字の文字列を数値順にソートしたい時などに問題が起きます。
次のように、`["10", "2", "1"]`という数字の配列を`Array#sort`メソッドで昇順ソートした場合、直感的には`["1", "2", "10"]`となることを期待します。
しかし、実際の結果は`["1", "10", "2"]`となります。

{{book.console}}
```js
const numberStrings = ["10", "2", "1"];
// Array#sortは、デフォルトでは配列の要素を`<`で比較する
// 文字列同士を`<`で比較し、Code Unitの値で昇順にした配列を返している
console.log(numberStrings.sort()); // => ["1", "10", "2"]
```

なぜなら、`"10" < "2"`を比較した場合に、先頭の文字（Code Unit）から順番に比較されるためです。
まず`"10"[0] < "2"[0]`が比較され`true`となり、`"10"`が`"2"`より小さいと判定されます。

{{book.console}}
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

{{book.console}}
```js
// numericをtrueとすると数字が数値として比較されるようになる
const collator = new Intl.Collator("ja", { numeric: true });
// collator.compareはsortに渡せる関数となっている
const sortedValues = ["1", "10", "2"].sort(collator.compare);
console.log(sortedValues);  // => ["1", "2", "10"]
```

文字列の比較においては、単純な比較であれば、`===`（厳密比較演算子）や`>`（大なり演算子）を利用します。
その地域や言語においてのより自然な形を求める場合は、ローカライズするために国際化APIなどを利用できます。

## 正規表現の`//u` {#regexp-unicode}
