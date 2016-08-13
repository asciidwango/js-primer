---
author: azu
---

# 条件分岐

この章ではif文やswitch文を使った条件分岐について学んでいきます。

## if文

if文を使うことで、プログラム内に条件分岐を書くことができます。

if文は次のように構文が基本形となり、`条件式`の評価結果が`true`であるならば、
`実行する文`が実行されます。

```js
if (条件式)
    実行する文;
```

どのような式が`true`として評価されるかは、[Booleanオブジェクト][]で紹介します。

- [ ] TODO: Booleanオブジェクトのリンク先がない

`実行する文`が複数行である場合は、`{` と `}`で囲みます。
この`{` と `}`で囲んだ範囲を**ブロック**と呼びます。

```js
if (条件式) {
    実行する文;
    実行する文;
}
```


次のコードでは `year` が `2015` よりも大きな値である場合、
if文の `{` と `}` で囲まれたブロック内が処理されます。

{{book.console}}
[import, if-example.js](src/if/if-example.js)

`実行する文`が1行のみである場合、ブロックは省略が可能ですが、コードの読みにくさに繋がるため常につけることを推奨します。

### else if文

複数の条件分岐を書く場合は、if文に続けてelse if文を使うことでできます。
たとえば、次の3つの条件分岐するプログラムを考えます。

- `version` が "ES5" ならば "ECMAScript 5" と出力
- `version` が "ES6" ならば "ECMAScript 2015" と出力
- `version` が "ES7" ならば "ECMAScript 2016" と出力

次のコードでは、if文とelse if文を使うことで3つの条件を書いています。

{{book.console}}
[import, else-if-example.js](src/if/else-if-example.js)

### else文

if文とelse if文では、条件に一致した場合の処理をブロック内に書いていました。
一方、条件に一致しなかった場合の処理は、else文を使うことでできます。

{{book.console}}
[import, else-example.js](src/if/else-example.js)

#### ネストしたif文

if、else if、else文は`実行する文`としてさらにif文を書きネストすることができます。

ネストしたif文の例として、今年がうるう年かを判定してましょう。

うるう年の条件は次のとおりです。

<!-- textlint-disable preset-ja-technical-writing/no-start-duplicated-conjunction -->

- 西暦で示した年が4で割り切れる年はうるう年です
- ただし、西暦で示した年が100で割り切れる年はうるう年ではありません
- ただし、西暦で示した年が400で割り切れる年はうるう年です

<!-- textlint-enable preset-ja-technical-writing/no-start-duplicated-conjunction -->

西暦で示した年は `new Date().getFullYear();` で取得できるため、
この条件をif文で表現すると次のように書くことができます。

{{book.console}}
[import, leap-year-nest-example.js](src/if/leap-year-nest-example.js)

条件を上から順に書き下したため、ネストが深い文となってしまっています。
一般にネストは少ない方が、読みやすいコードとなります。

条件を少し読み解くと、400で割り切れる年は無条件にうるう年であることがわかります。
そのため、条件を並び替えることで、ネストするif文なしに書くことができます。

{{book.console}}
[import, leap-year-flat-example.js](src/if/leap-year-flat-example.js)

## switch文

switch文は次のような構文を持ち、`式`の評価結果が指定した値である場合に行う処理を並べて書きます。

```js
switch (式) {
    case ラベル1:
        // `式`の評価結果が`ラベル1`と一致する場合に実行する文
        break;
    case ラベル2:
        // `式`の評価結果が`ラベル2`である場合に実行する文
        break;
    default:
        // どのcaseにも該当しない場合の処理
        break;
}
// break; 後はここから実行される
```

switch文はif文と同様に`式`の評価結果にもとづく条件分岐を扱います。
またbreak文は、switch文から抜けswitch文の次の文から実行するためのものです。
次の例では`version`の評価結果は`"ES6"`となるため、`case "ES6":`に続く文が実行されます。

[import, switch-example.js](./src/switch/switch-example.js)

これはif文で次のように書いた場合と同じ結果になります。

{{book.console}}
```js
var version = "ES6";
if (version === "ES5") {
    console.log("ECMAScript 5");
} else if (version === "ES6") {
    console.log("ECMAScript 2015");
} else if (version === "ES7") {
    console.log("ECMAScript 2016");
} else {
    console.log("しらないバージョンです");
}
```

switch文はやや複雑な仕組みであるためどのように処理されているかを見ていきます。
まず `switch (式)` の`式`を評価します。

```js
switch (式) {
    // case
}
```

次に`式`の評価結果に一致するラベルを探索します。
一致するラベルが存在する場合は、そのcase節を実行します。
一致する`ラベル`が存在しない場合は、default節が実行されます。

```js
switch (式) {
    // if (式 === "ラベル1")
    case "ラベル1":
        break;
    // else if (式 === "ラベル2")
    case "ラベル2":
        break;
    // else
    default:
        break;
}
```

### break文

switch文のcase節では基本的に`break;`を使いswitch文を抜けるようにします。
この`break;`は省略が可能ですが、省略した場合、後ろに続くcase節が条件に関係なく実行されます。

{{book.console}}
[import, miss-case-example.js](./src/switch/miss-case-example.js)

このように`break;`を忘れてしまうと意図しない挙動となります。
そのため、case節とbreak文が多用されているswitch文が出てきた場合、
別の方法で書かないかを考えるべきサインとなります。

一般にswitch文はif文の代用として使うのではなく、関数と組み合わせて値を返すパターンとして使うことが多いです。

{{book.console}}
[import, switch-return-example.js](./src/switch/switch-return-example.js)

関数については、n章 で詳しく解説します。

- [ ] 関数の章を書いたらn章を変更する。

## 参考

- [閏年 - Wikipedia](https://ja.wikipedia.org/wiki/%E9%96%8F%E5%B9%B4)
- [C言語入門：うるう年判定プログラム:Geekなぺーじ](http://www.geekpage.jp/programming/c/leap-year.php)
- [どうしてこんなキーワードがあるの？ - あどけない話](http://d.hatena.ne.jp/kazu-yamamoto/20080904/1220495854)
- [switch - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/switch)
- [制御フローとエラー処理 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)

[Booleanオブジェクト]: ../Boolean/README.md "TODO: リンクが未完成"
