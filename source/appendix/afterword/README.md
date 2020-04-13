---
author: azu
description: "JavaScript Primerはなぜ書かれたのか"
---

# この書籍はなぜ書かれたのか？ {#afterword}

この付録では、[JavaScript Primer][]がなぜ作られたのかについて見ていきます。

「[はじめに][]」では、この書籍の目的を紹介しましたが、なぜその目的に対してこの書籍が書かれたのかを見ていきます。

## この書籍の目的 {#do}

この書籍の目的は、JavaScriptというプログラミング言語を学ぶ必要が出てきた人が、一からJavaScriptを学べるようにすることです。
この「JavaScriptを学ぶ」には基本的な書き方を知るという意味もありますが、設計を考えてJavaScriptアプリケーションを作れるようになることも目的に含まれています。

また、JavaScriptはECMAScriptという仕様が毎年更新されているように、常に変化している言語です。そのため、JavaScriptの変化に対して対応できるように学び方を学べる必要もありました。

そのため、この書籍の目的は大きく分けて次の3つとなりました。

- 書き方: 基本文法などのJavaScriptの書き方
- 作り方: JavaScriptを使ったアプリケーションの作り方
- 学び方: JavaScriptの進化を自分で知る学び方

これら3つを一冊の書籍で扱うため、基本を学びつつそれでいて現実のユースケースからは離れすぎないというバランスを一緒に扱うことを決めました。

## 「書き方」「作り方」「学び方」 {#three-principle}

JavaScript Primerは[2015-12-17](https://github.com/asciidwango/js-primer/tree/master/meetings/2015-12-17)から始まったプロジェクトです。
最初からOSSとして書籍を書くという目的だったので、すべてのミーティングログが公開されています。

- https://github.com/asciidwango/js-primer/tree/master/meetings

最初期の[2016-01-29のミーティング](https://github.com/asciidwango/js-primer/tree/master/meetings/2016-01-29)で書籍の内容をどうするべきかというミーティングで次のようなスライドを発表しています。

- スライド: [ES6本](https://github.com/asciidwango/js-primer/blob/master/meetings/2016-01-29/azu/startup-book.pdf)

このスライドでは、この書籍がどのような目標で書かれるべきかを決めています。

事前に[JavaScriptのレベル別書籍のまとめ](https://gist.github.com/azu/027859e08e284cb8dfe7)を調べた所、この時点ではES2015をベースにしたJavaScript初心者向けの書籍がありませんでした。


この3つの原則は書籍の構成にも現れています。
第一部の基本文法で「書き方」を学び、第二部のユースケースで「作り方」を学べるようになっています。

「学び方」は、章としてではなく全体的な流れとして取り入れることにしました。
なぜなら、「学び方」自体は学びたいことによっても異なる方法を取る場合があります。
そのため、「学び方」で個別の章とするよりは、他の章で「書き方」や「作り方」と一緒に見たほうがよいと考えたためです。

たとえば、基本文法などの学び方にはMDNのようなリファレンスサイトを見たほうがいいし、
アプリケーションの作り方は実際のサイトなどを参考にしたほうがよいためです。

[はじめに]: ../../intro/README.md
[JavaScript Primer]: https://jsprimer.net
[MDN]: https://developer.mozilla.org/j