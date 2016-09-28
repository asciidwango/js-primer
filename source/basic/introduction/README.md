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

この章ではECMAScriptの定義するビルトインオブジェクトを扱い、
後半のユースケースでは実行環境が定義するDOM APIやNode.jsのコアAPIを使いながら、
JavaScriptについて学んでいきます。

JavaScriptは、Unicodeで定義された文字を扱い、大文字小文字を区別します。

たとえば、次のように`name`という変数を大文字と小文字で書いた場合に、
それぞれは別々の名前の変数として認識されます。

```js
// `name`という名前の変数を宣言
const name = "azu";
const NAME = "azu";
```

しかし、クラスは大文字で開始しなければならないというような言語的な制限は存在しないため、
あくまで別々の名前として認識されるというだけになっています。

また、JavaScriptには特別な意味をもつキーワード（または予約語）が存在しています。
キーワードと同じ名前の変数を宣言することができません。
先ほどの、変数を宣言する`const`もキーワードのひとつとなっています。

JavaScriptは、文（Statement）ごとに処理していき、文はセミコロン（`;`）によって区切られます。
特殊なルールにもとづき、セミコロンがない文も行末に自動でセミコロンが挿入されるという仕組みも持っています。[^1]
しかし、暗黙的なものへ頼ると意図しない挙動が発生するため、セミコロンは常に書くようにします。

また、スペース、タブ文字などは空白文字（ホワイトスペース）と呼ばれます。
JavaScriptでは、空白文字をいくつ文に置いても挙動は同じであり、インデントによる挙動は発生しません。

JavaScriptの実行コンテキストとして"script"と"module"があります。
この2つの実行コンテキストの違いは意識しなくても問題ありません。

モジュールはECMAScript 2015で後から導入されたものであるため、
"module"の実行コンテキストでは古く安全でない構文や機能は一部禁止されているものがあります。

最後に、JavaScriptには**strict mode**という実行モードが存在しています。
名前のとおり厳格な実行モードで、古く安全でない構文や機能が一部禁止されています。
"module"の実行コンテキストでは、このstrict modeがデフォルトとなっています。

`"use strict"`という文字列をファイルまたは関数の先頭に書くことで、
そのスコープ上のコードはstrict modeで実行されます。

```js
"use strict";
// このコードはstrict modeで実行される
```

strict modeでは、`eval`や`with`といった構文が禁止されています。
しかし、strict modeではないコードを書くケースは存在しません。
そのため、常にstrict modeで実行できるコードを書くことが、より安全なコードにつながります。

本書では、明示的に「strict modeではない」ことを宣言した場合を除き、
すべてstrict modeを前提として実行できるコードについて紹介しています。

[^1]: Automatic Semicolon Insertionと呼ばれる仕組みです。

[Ecma International]: http://www.ecma-international.org/  "Ecma International"
[ECMAScript]: http://www.ecma-international.org/publications/standards/Ecma-262.htm  "Standard ECMA-262"
