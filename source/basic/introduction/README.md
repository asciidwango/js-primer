---
author: azu
---

# JavaScriptとは

JavaScriptはウェブブラウザ、Node.jsを始め、今はIoT（Internet of Things）デバイスなど幅広い環境で動作する言語となっています。

<!-- TODO(azu): 上手く並び替えたい。最初に否定から入るのは良いのかどうか? -->

しかし、すべての環境で全く同じコードが動くわけではありません。
その理由のひとつとして、JavaScriptという仕様があるわけではなく、JavaScriptという実装があるだけだからです。

JavaScriptという言語は、[Ecma International][]によって標準化された[ECMAScript][]という仕様の実装になります。
そのため、JavaScriptが使える環境でも利用できる機能が異なります。

逆に、[ECMAScript][]という仕様で定義されている機能は、基本的にどの実行環境でも同じ動作をします。

- [ ] JavaScriptとECMAScriptについて明確な区別を付けずに記述しているという点について書く

この章では、そのような実行環境に依存しないJavaScriptの機能について学んでいきます。

## JavaScriptってどのような言語？

JavaScriptは、C、Java、Self、Schemaなどの言語の影響を受けています。

また、JavaScriptはクラスベースではなくプロトタイプベースの言語です。
ECMAScript 2015から`class`構文が追加されましたが、このクラスもプロトタイプベースの上で実現されています。

大部分がオブジェクトであり、そのオブジェクト同士のコミュニケーションによって成り立っています。
オブジェクトには、ECMAScriptの仕様として定められた**ビルトインオブジェクト**と、
実行環境が定義したオブジェクトとユーザの定義したオブジェクトが存在します。

実行環境が定義しているオブジェクトとしては、
ブラウザがもつDOM（Document Object Model） APIやNode.jsがもつコアAPIなどがあります。

第一部の基本文法ではECMAScriptの定義する構文やビルトインオブジェクトを扱い、
第二部のユースケースではブラウザが定義するDOM APIやNode.jsのコアAPIを使いながら、
JavaScriptについて学んでいきます。

JavaScriptの言語的な特徴を簡単に紹介すると、JavaScriptは大文字小文字を区別します。

たとえば、次のように`name`という変数を大文字と小文字で書いた場合に、
それぞれは別々の名前の変数として認識されます。

```js
// `name`という名前の変数を宣言
const name = "azu";
// `NAME`という名前の変数を宣言
const NAME = "azu";
```

また、クラスは大文字で開始しなければならないといった命名規則が意味をもつケースはありません。
そのため、あくまで別々の名前として認識されるというだけになっています。

また、JavaScriptには特別な意味をもつキーワード（または予約語）が存在しています。
キーワードと同じ名前の変数や関数は宣言できません。
先ほどの、変数を宣言する`const`もキーワードのひとつとなっているため、`const`という変数名は宣言できません。

JavaScriptは、文（Statement）ごとに処理していき、文はセミコロン（`;`）によって区切られます。
特殊なルールにもとづき、セミコロンがない文も行末に自動でセミコロンが挿入されるという仕組みも持っています。[^1]
しかし、暗黙的なものへ頼ると意図しない挙動が発生するため、セミコロンは常に書くようにします。

また、スペース、タブ文字などは空白文字（ホワイトスペース）と呼ばれます。
空白文字をいくつ文の中に置いても挙動に違いはありません。

JavaScriptの実行コンテキストとして"Script"と"Module"があります。
この2つの実行コンテキストの違いは意識しなくても問題ありません。

"Module"はJavaScriptをモジュールとして実行するために、ECMAScript 2015で導入されたものです。
"Module"の実行コンテキストでは古く安全でない構文や機能は一部禁止されているものがあります。

最後に、JavaScriptには**strict mode**という実行モードが存在しています。
名前のとおり厳格な実行モードで、古く安全でない構文や機能が一部禁止されています。
"Module"の実行コンテキストでは、このstrict modeがデフォルトとなっています。

`"use strict"`という文字列をファイルまたは関数の先頭に書くことで、そのスコープにあるコードはstrict modeで実行されます。

```js
"use strict";
// このコードはstrict modeで実行される
```

strict modeでは、`eval`や`with`といったレガシーな機能や構文を禁止します。
また、あきらかな問題を含んだコードに対しては早期的に例外を投げることで、開発者が間違いに気づきやすくしてくれます。
たとえば、次のような`var`などのキーワードを含まずに変数を宣言しようとした場合に、strict modeでは例外が発生します。
（strict modeでない場合は、例外が発生せずにグローバル変数が作られていました。）

```js
"use strict";
mistypedVaraible = 42; // => ReferenceError
```

このように、strict modeでは開発者が安全にコードを書けるように、JavaScriptの落とし穴を一部ふさいでくれます。
そのため、常にstrict modeで実行できるコードを書くことがより安全なコードにつながります。

本書では、明示的に「strict modeではない」ことを宣言した場合を除き、
すべてstrict modeとして実行できるコードを扱います。

[^1]: Automatic Semicolon Insertionと呼ばれる仕組みです。

[Ecma International]: http://www.ecma-international.org/  "Ecma International"
[ECMAScript]: http://www.ecma-international.org/publications/standards/Ecma-262.htm  "Standard ECMA-262"
