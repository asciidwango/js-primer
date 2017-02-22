---
author: azu
---

# String

この章ではJavaScriptにおける文字列について学んでいきます。
文字列の表現やその背景にあるユニコードを見ていき、文字列の操作方法について学びます。
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
var double = "文字列";
console.log(double); // => "文字列"
var single = '文字列';
console.log(single); // => '文字列'
// どちらも同じ文字列
console.log(double === single);// => true
```

<!-- textlint-enable eslint -->

文字列リテラルは同じ記号が対となるため、次のように文字列の中に同じ記号が出現した場合は、
`\"`のように`\`を使いエスケープする必要があります。

{{book.console}}
```js
var string = "This book is \"js-primer\"";
console.log(string); // => 'This book is "js-primer"'
```

## 文字列を結合する {#concat}

文字列を結合する簡単な方法は文字列結合演算子（`+`）を使う方法です。

{{book.console}}
```js
var string = "a" + "b";
console.log(string); // => "ab"
```

変数と文字列を結合したい場合も文字列結合演算子で行うことができます。

{{book.console}}
```js
var name = "JavaScript";
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
var name = "JavaScript";
console.log(`Hello ${name}!`);// => "Hello JavaScript!"
```

## 文字とは

- [ ] 文字列と要素（文字）
- [ ] 文字

## 文字列の分解と結合 {#split-join}

文字列を配列へ分解するには`String#split`メソッドを利用できます。
一方、配列の要素を結合し文字列にするは`Array#join`メソッドが利用できます。

この２つはよく組み合わせて利用されるため、あわせてみていきます。

`String#split`メソッドは、第一引数に指定した区切り文字で文字列を分解した配列を返します。
次のコードでは、文字列を`・`で区切った配列を作成しています。

```js
var strings = "赤・青・緑".split("・");
console.log(strings); // => ["赤", "青", "緑"]
```

分解してできた文字列の配列を結合して文字列を作る際に、`Array#join`メソッドがよく利用されます。
`Array#join`メソッドの第一引数には区切り文字を指定し、その区切り文字で結合した文字列を返します。

この２つを合わせれば、区切り文字を`・`から`、`へ変換する処理を次のように書くことができます。

```js
var string = "赤・青・緑".split("・").join("、");
console.log(string); // => "赤、青、緑"
```

`String#split`メソッドの第一引数には正規表現を指定することもできます。
これを利用すると、次のように文字列をスペースで区切るような処理が簡単に書くことができます。

```
// 文字列を1つ以上のスペースを区切りにして分解する
var strings = "a b    c      d".splice(/¥s+/);  
console.log(strings); // => ["a", "b", "c", "d"] 
```

### `String#split`と空文字

`String#split`メソッドでは、空文字（`""`）を区切り文字として指定し、文字列を**文字**の配列にする方法として紹介されることがあります。

```js
// 空文字("")で文字列を分解する
var characters = "文字列".split("");
console.log(characters); // => ["文", "字", "列"]
```

しかし、この空文字での区切り方には問題があります。

JavaScriptにおいて、メソッド名に`CodePoint`が含まれているものやIteratorを扱うもの**以外**は、すべてCode Unitが並んでいるものとして扱われます。
つまり、`split`メソッドも各Code Unitごとに文字列を分解しています。

次のコードを見ると、`string.split("")`は各**文字**ごとで分解するのではなく、各**Code Unit**ごとに分解していることが分かります。

```js
// "𩸽"はサロゲートペアであるため2つのCode Unit（\uD867\uDE3D）からなる
// サロゲートペアを含む文字列を各Code Unitに分解
var codeUnitElements = "𩸽のひらき".split("");
// サロゲートペアを各CodeUnitに分解したため、文字化けしている
console.log(codeUnitElements); // ["�", "�", "の", "ひ", "ら", "き"] 
```

サロゲートペアを含んだ文字列をそれぞれの**Code Point**へ分解するには、Iteratorを利用するが簡単です。
文字列はIteratorを実装しているIterableという特性をもち、また文字列のIteratorはそれぞれのCode Pointごとに列挙します。

そのため、Iterableを扱える`Array.from`メソッドや`...`（spread operator）を利用することで、
文字列をそれぞれのCode Pointごとに分解できます。

```js
var string = "𩸽のひらき";
// Array.fromメソッドで文字列を分解
console.log(Array.from(string)); // => ["𩸽", "の", "ひ", "ら", "き"]
// ...（spread operator）で文字列を展開しものを配列にする
console.log([...string]); // => ["𩸽", "の", "ひ", "ら", "き"]
// for...ofもIteratorを列挙するため、Code Pointごとで列挙できる
for (var codePoint of string) {
    console.log(codePoint);
}
```

絵文字などサロゲートペアを含む文字列をそれぞれの**Code Unit**で分解すると、加工して結合すると化けてしまうなどの問題が発生しやすいです。
Iteratorを利用すればサロゲートペアもそれぞれの**Code Point**で扱うことができます。

しかし、JavaScriptにおいて、見た目どおりの**文字**ごとに処理を行う標準的な方法は用意されていません。
結合文字などを考慮した**文字**について、詳しくは[JavaScript has a Unicode problem · Mathias Bynens][]を参照してください。

## 文字列の比較 {#compare}
## 文字列の検索 {#search}
## 文字列の置換/削除 {#replace-delete}
## 部分文字列の取得 {#slice}

文字列からその一部を取り出したい場合には、`String#slice`メソッドや`String#substring`メソッドが利用できます。

`slice`メソッドについては、すでに配列で学んでいますが、基本的な動作は文字列でも同様です。
まずは`slice`メソッドについて見ていきます。

`String#slice`メソッドは、第一引数に開始位置、第二引数に終了位置を指定しその範囲を取り出し新しい文字列を返します。
第二引数は省略でき、省略した場合は文字列の末尾が終了位置となります。

位置にマイナスの値を指定した場合は文字列の末尾から数えた位置となります。
また、第一引数の位置が第二引数の位置より大きい場合、常に空の文字列を返します。

```js
var string = "ABCDE";
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
var string = "ABCDE";
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

`slice`メソッドと`substring`メソッドの引数へ、直接`1`や`4`といった位置を使うことは少ないです。
次のように、`String#indexOf`メソッドなど位置を取得するものと組み合わせて使うことが多いでしょう。

```js
var url = "https://example.com?param=1";
var indexOfQuery = url.indexOf("?");
var queryString = url.slice(indexOfQuery);
console.log(queryString); // => "?param=1"
```

また、配列とは異なりプリミティブ型の値である文字列は、`slice`メソッドと`substring`メソッド共に非破壊的です。
機能的な違いが殆どないため、どちらを利用するかは好みの問題となるでしょう。

## 文字列の組み立て {#built}

## 参考

- [What every JavaScript developer should know about Unicode](https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/)
- [「文字数」ってなぁに？〜String, NSString, Unicodeの基本〜 - Qiita](http://qiita.com/takasek/items/19438ecf7e60c8d53bbc)
- [プログラマのための文字コード技術入門 | Gihyo Digital Publishing … 技術評論社の電子書籍](https://gihyo.jp/dp/ebook/2014/978-4-7741-7087-9)
- [文字コード「超」研究　改訂第2版【委託】 - 達人出版会](http://tatsu-zine.com/books/moji-code)
- [Unicode のサロゲートペアとは何か - ひだまりソケットは壊れない](http://vividcode.hatenablog.com/entry/unicode/surrogate-pair)
- [文字って何かね？ - Qiita](http://qiita.com/matarillo/items/91b9656428bed7a1a797)
- [ものかの >> archive >> Unicode正規化　その１](http://tama-san.com/old/document03.html)
- [結合文字列をUnicode正規化で合成する方法の危険性 - Qiita](http://qiita.com/monokano/items/d4c37d9bc9833eaeda6e)

[JavaScript has a Unicode problem · Mathias Bynens]: https://mathiasbynens.be/notes/javascript-unicode  "JavaScript has a Unicode problem · Mathias Bynens"
