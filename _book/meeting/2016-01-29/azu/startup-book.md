autoscale: true

# ES6本

------

# 現状の課題


## 現状では"ES6"をベースとしたJavaScriptに入門する書籍がない

------

# レベル

------

- 初心者
	- プログラム初心者
	- ちょっと触った事がある初心者 :arrow_double_up:
- 中級者
	- 他の言語を経験済み、JavaScriptは初心者 :arrow_double_up:
	- ライブラリのみ使ってる人
- 上級者
	- 調べて書ける人

------


# 書籍: 初心者

- 2015/ES3 [確かな力が身につくJavaScript「超」入門](http://www.amazon.co.jp/dp/4797383585/ "確かな力が身につくJavaScript「超」入門 (確かな力が身につく「超」入門シリーズ)")
- 2010/ES3 [JavaScript本格入門](http://www.amazon.co.jp/dp/4774144665/)
- 2012/ES3 [ノンプログラマのためのJavaScriptはじめの一歩](http://www.amazon.co.jp/dp/4774153761/ "ノンプログラマのためのJavaScriptはじめの一歩")
- 2013/ES3 [開眼！ JavaScript](http://www.oreilly.co.jp/books/9784873116211/ "開眼！ JavaScript")


-----

# 書籍: 中級者

- 2011/ES5 [パーフェクトJavaScript](http://www.amazon.co.jp/dp/477414813X/)
- 2011/ES5 [JavaScriptパターン](http://www.oreilly.co.jp/books/9784873114880/ "JavaScriptパターン")
- 2014/ES5 [Speaking JavaScript](http://speakingjs.com/ "Speaking JavaScript")
- 2014/ES5 [Eloquent JavaScript](http://eloquentjavascript.net/ "Eloquent JavaScript")

----

# 書籍: 上級者

- 2012/ES5 [O'Reilly Japan - JavaScript 第6版](http://www.oreilly.co.jp/books/9784873115733/ "O&#39;Reilly Japan - JavaScript 第6版")
- 2015/ES6 [Exploring ES6](http://exploringjs.com/ "Exploring ES6")
- 2013-/ES5-ES.next [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS "You Don&#39;t Know JS")

-----

# 書籍: 欄外

- 中級者(さすがに今読むものではない)
	- 2008/ES3 [JavaScript: The Good Parts](https://www.oreilly.co.jp/books/9784873113913/ "JavaScript: The Good Parts")
- 中-上級者(いい本だけど副読本という印象)
	- 2013/ES5 [Effective JavaScript](http://www.amazon.co.jp/dp/B00EESW7JQ/ "Effective JavaScript")

------

# 目的

- 現代的なJavaScriptについて理解できるようにする
- 「:book: これ読んでおいて」と渡せる書籍
- ES2015/ES2016...と言うような新しいものが出てきたら時に取り組める素養を付く

-----

# 対象

- IT企業へ入社したばかりの人
	- (「これ読んでおいて」と渡されて読む人)
- プログラミング自体は全くの初心者ではない人
- 初心者〜中級者: [JavaScriptのレベル別書籍のまとめ](https://gist.github.com/azu/027859e08e284cb8dfe7 "JavaScriptのレベル別書籍のまとめ")

----
# 競合?

- [Learning JavaScript](http://shop.oreilly.com/product/0636920035534.do "Learning JavaScript") 第3版(β)
	- 初めてのJavaScript(Oreilly)
- [開眼！ JavaScript](http://www.oreilly.co.jp/books/9784873116211/ "開眼！ JavaScript")
	- 本の性質的に近そうだけど、ちょっと言語性質に寄り過ぎ
	- 扱う内容はES3ベース
- [プロになるためのJavaScript入門](http://www.amazon.co.jp/dp/4774154385/ "プロになるためのJavaScript入門")
	- 言語の説明が仕様の裏付けがあった印象

----


# ECMAScript

- ES3 + ES5 + ES6
- かなり色々な機能、非推奨な機能もある
- ECMAScriptの機能をグループ別にまとめたもの
- [azu.github.io/how-to-learn-es6/learn-cost-by-features/](http://azu.github.io/how-to-learn-es6/learn-cost-by-features/)

-----

![es6](https://raw.githubusercontent.com/azu/how-to-learn-es6/gh-pages/features.png)

------

# しないこと

- "ES5以下"と"ES6以降"で区別しない
	- prototypeとclassは一緒に話すべき内容
	- 新規で学ぶのに区別は不要。ラベルは必要かも?
- リファレンスを目指さない
	- リファレンスを目指すならMDNを見ればいい
	- なぜこういう機能が必要なのか、どういう時に使うか

-----

# しないこと2

- 全ては説明しない
	- ページ足りない、終わらない
	- [機能別の数値合計](http://azu.github.io/how-to-learn-es6/learn-cost-by-features/) = 288
- 歴史的経緯は最小限に
	- JavaScriptにはBad partsが多い
	- ES6で多くの問題が解決されているのであえて書く必要はない

-----

# しないこと3

- ライブラリの機能についての解説はしない
	- ライブラリがどのように実装されているのかを読み解く力を付けるのが目的
	- ライブラリを学ぶのが目的ではない
- ツールを使うのが目的ではない
	- できるだけブラウザ/Node.jsで済ませる


----

# アプローチ :bulb: 

### (個人的な考え)

----

# [作りながら学ぶRuby入門](http://rubybook.vacco.net/ "作りながら学ぶRuby入門")

![inline, 理想](./how-to-learn-ruby.png)


----

# 現実的な話

[どのような順番で学ぶのか/どのような順番で教えるのか](https://github.com/azu/how-to-learn-es6/blob/gh-pages/story.md "どのような順番で学ぶのか/どのような順番で教えるのか")

- 書き方(What)を学ぶ
- ユースケース(How, Where, When)を学ぶ
- なぜ必要なのか(Why)を学ぶ

----


# どのように書くか

- **言語**なので書かれることは、どの本も同じはず
- どのように教えるかが大事になる
	- どうやってハマりどころを減らすか
- ユースケースを考えて、それを元に必要な要素を解説する


----

# Re:目的

- JavaScriptについて理解できるようにする
	- →書き方(文法)を学ぶ
- JavaScriptで書かれたものを理解できるようにする
	- →使い方(ユースケース)を学ぶ
- 新しいものが出てきたら時に取り組める素養を付ける
	- →学び方を学ぶ

----

# ECMAScript | 分布

- ECMAScriptは言語としては大きくなった
- 基礎的な部分を **拡張** + **リファクタリング**で作られてる
- ==段階的に分ける==
- ES3+ES5+ES6の基礎における"書き方"と"使い方"
- ES5+ES6の追加オブジェクトにおける"書き方"と"使い方"


-----

- 全ては説明しない
	- 追加オブジェクトはまだユースケースが分かりにくいものもある
	- 無理して全部を紹介しなくてもいいはず

-----

# まとめ

- 基本に忠実、ハマりにくいもの目指したい
	- 一人で読み進められるもの
- 仕様の解説は表面的には少なめに、でも裏付けには仕様を使う
- 言語の説明ばかりしてても面白くない
- ユースケースはちゃんと探す
	- ユースケースにたどり着くために言語を解説する感じ


----

# 理想

- 全ての機能にユースケースがあり
- 全てのユースケースを上手く使ったアプリが動く
