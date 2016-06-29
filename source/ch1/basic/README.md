# JavaScriptとは

JavaScriptはウェブブラウザ、Node.jsを始め、今はIoT（Internet of Things）デバイスなど幅広い環境で動作する言語となっています。

<!-- TODO(azu): 上手く並び替えたい。最初に否定から入るのは良いのかどうか? -->

しかし、すべての環境で全く同じコードが動くわけではありません。
その理由のひとつとして、JavaScriptという仕様があるわけではなく、JavaScriptという実装があるだけだからです。

JavaScriptという言語は、[Ecma International][]によって標準化された[ECMAScript][]という仕様の実装になります。
そのため、JavaScriptが使える環境でも利用できる機能が異なります。

逆に、[ECMAScript][]という仕様で定義されている機能は、基本的にどの実行環境でも同じ動作をします。

この章では、そのような実行環境に依存しないJavaScriptの機能について学んでいきます。

[Ecma International]: http://www.ecma-international.org/  "Ecma International"
[ECMAScript]: http://www.ecma-international.org/publications/standards/Ecma-262.htm  "Standard ECMA-262"
