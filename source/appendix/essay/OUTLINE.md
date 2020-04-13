# 目的

- なんで今のJavaScriptってこうなってるのかの雰囲気を理解してもらう
- 本書で説明できなかった現在につながる背景
- 知りたいこと
    - プロセス
    - 過去と今の役割
    - エコシステムの複雑さ
- この書籍を書こうと思ったきっかけ
    - ES5とES2015は全く別物と言われるがそうではない
        - TDZとかcontextual keywordsなど既存のコードは99.9%そのまま動作するような言語設計がサれている
        - これはES4から学んだ痛みある失敗に起因する科学である
    - そのため言語として修正ではなく、追加を選んだ部分があるため、不要になった機能もでてきた
        - typeof nullを直すことはできなかった
    - だから、一から2015をベースに書こうと思った
- この書籍はECMAScriptのプロセスをかなり参考にしてる
    - 議事録を毎回書いて公開してるのはそれを意識してる

## 目的外

- 正確な歴史のタイムラインを理解することは目的ではない

## 大枠

- 誕生 - 歴史的な仕様は今も残り続ける
    - [\[ES2015\] HTML-likeコメント](https://jsprimer.net/basic/comments/#html-like-comment)
    - [\[コラム\] なぜletやconstは追加されたのか？](https://jsprimer.net/basic/variables/#why-add-let-and-const)
- 発達 - JavaScriptの役割は変わる
    - [クラス · JavaScript Primer #jsprimer](https://jsprimer.net/basic/class/)
    - [非同期処理:コールバック/Promise/Async Function · JavaScript Primer #jsprimer](https://jsprimer.net/basic/async/)
    - JavaScriptにアプリケーションとして言語が求められるようになった
    - ES4の失敗
    - https://auth0.com/blog/a-brief-history-of-javascript/
- 停滞と競争と混乱 - 停滞することは嫌われる、jQueryのようなユーザーランドの互換性を補うライブラリがある理由、
    - [Node.jsでCLIアプリ · JavaScript Primer #jsprimer](https://jsprimer.net/use-case/nodecli/md-to-html/)
    - [Todoアプリのリファクタリング · JavaScript Primer #jsprimer](https://jsprimer.net/use-case/todoapp/final/)
    - 実装が複数でてきた。
    - jQueryはIEのバグをカバーする
- 調和とプロセスの変化 - 停滞を解決するプロセス
    - [ECMAScript · JavaScript Primer #jsprimer](https://jsprimer.net/basic/ecmascript/)
    - [ECMAScriptモジュール · JavaScript Primer #jsprimer](https://jsprimer.net/basic/module/)
    - ECMAScript
    - 小さくすすめる例
        - class
        - module
- 巨大化と複雑化 - 巨大化したコミュニティによる複雑さがある現在
    - [付録: 参考リンク集 · JavaScript Primer #jsprimer](https://jsprimer.net/appendix/links/)

## アウトライン

- JavaScriptの誕生
    - 目的: JavaScriptが先に誕生しECMAScriptは後。JavaScriptの仕様バグの経緯と後方互換性について
    - JavaScriptはNetscape Navigatorというブラウザに搭載するスクリプト言語として開発された
    - 「Javaのような構文」が求められていたためBrendan Eichは10日間で、Javaを参考にスクリプト言語を開発した
    - このときの実装ミスやDateなどの仕様は、今のJavaScriptにもそのまましようとして引き継がれている
    - その後、ECMAScriptという仕様を実装を元にECMAにおいて作成した
    - JavaScriptという仕様ではないのは、JavaScriptはSunの商標でありSunはそれをdonateしなかったため https://twitter.com/BrendanEich/status/905677632225763328
- DHTML、アプリケーションとしてのJavaScript
    - 目的: JavaScriptという言語がもつ役割が変化していることについて。これは今も変わっていってる
    - HTMLはドキュメントを扱うものであった
    - しかしながら、IE 4のころからDHTML（Dynamic HTML）というように動的なHTML、今でいうウェブアプリケーションを扱うものとしての方向が出てきた
    - Google Mapなどで有名になったAjaxなどでJavaScriptはおもちゃからアプリケーションを書く言語という役割をもつようになった
    - 現代
    - モバイルアプリとの比較されるような複雑なアプリケーションもJavaScriptで書かれるようになった
- 停滞と競争（IE 6、ES 4、io.js）
    - 目的: JavaScriptに限らず停滞や独占を嫌う背景。ブラウザ互換への道
    - IEは最初のブラウザ戦争で勝利した
    - これによりブラウザはIEが一強となった
    - しかし、IEそのもののアップデートが遅かったため、ブラウザが戦場であったJavaScriptも一緒に止まってしまった
    - => 独自APIが多く作られた？のはいつ？
    - prototype.jsや jQueryなどのライブラリ
    - => prototype拡張の現在
    - http://perfectionkills.com/whats-wrong-with-extending-the-dom/
    - Firefox、Opera、WHATWG、HTML5
    - iOSとSafari、モバイルアプリとの比較
    - ES 4はアプリケーションを書く言語としては貧弱だったJavaScriptを全く別物に変えようという取り組み
    - しかしながら、コンセンサスを取ることに難航してナン年もの成果を破棄しない状態になってしまった
    - => ES 6はこのときの提案を元にしたものが多く、Harmonyというネームが使われていたことからES2015の新しい取り組みに与えた影響は大きい
    - Node.js はJoyentが管理していた
    - Node.js 0.xはJoyentの意向により、新しい機能などがマージされずらくなり停滞してしまった
    - このときにNode.jsのContributorがio.jsというForkを作り作業をすすめることで、この停滞を打ち破ろうとした
- 調和とプロセスの変化（CoffeeScriptからECMAScript 2015）
    - 目的: 今のプロセスの考えは過去の停滞から来ていることを知る。またプロセスにツールが上手く取り込まれた流れやエコシステムの発展について
    - CoffeeScriptから始まったJavaScriptを別の言語で記述する試み
    - この動きがうまくいき、6to5が生まれた
    - これらのTranspilerはメタ言語となり、いままではベンダーが実装しなければ机上の空論で進んでしまっていたものも実際に試すことができるようになった
    - ES 4の反動から小さく試して小さく進む動きがあり、この流れでBabelのようなツールは上手くJavaScriptのエコシステムに溶け込んだ
    - https://gist.github.com/azu/47082cbcaf7cc7b2b2f2075afad1b025
    - 今まではコンパイルはせずに使っていたJavaScriptだが、Babelやwebpackなどのビルドを行うというプロセスが間に入ることが自然となった
    - このプロセスによってさまざまな最適化などを行うツールが開発に介入する余地が生まれた => 次
- コミュニティとエコシステムの巨大化と多様性
    - 目的: JavaScriptはもっとも使われている言語であり、JavaScriptが難しい部分にはエコシステムが大きく関係していることについて
    - JavaScriptはもっと書いているユーザーが多い言語となった
    - Node.js、npmといったツールを作るためのエコシステムも用意されあらゆるツール、ライブラリがある
    - パッケージの数もあらゆる言語の中でもっと多くなっている
    - => これはエコシステムの難しさにも通じる
    - 言語の難しさとツールの難しさ
    - この本では言語について紹介した => この書籍でアプリケーションが作れるようになるとは限らないといった背景
    - 一方で現代のJavaScriptはツールの難しさがある
    - この難しさがどこからきているのか、またなぜ複雑になっているのかを知る


## 参考

- https://news.ycombinator.com/item?id=12758514
- [The Past, Present, and Future of JavaScript - O'Reilly Media](https://www.oreilly.com/programming/free/past-present-future-javascript.csp)
    - [The Past, Present, and Future of JavaScript - past-present-future-javascript.pdf](https://www.oreilly.com/programming/free/files/past-present-future-javascript.pdf)


---

## ターニングポイント {#points}

筆者が感じた大きなターニングポイントは次のところです。

- Google MapとAjax
- Node.js/npm
- AltJSとES2015
- プリフィックス or Flag or Origin Trial or Future Feature
    - https://webkit.org/blog/6131/updating-our-prefixing-policy/

現在のJavaScriptは想像よりはるかに大きな労力をもって進んでいます。
特に仕様の策定に一部実装が含まれているは歴史から学んだことですが、これは実際にパワーが必要です。
そのため、形だけを真似てもJavaScriptのような変化はしないと考えています。
また、ISO標準化など硬いルールのところにも新しいやり方を入れていたり、その変化の影響範囲はあまりにも広いです。

- ECMAScriptの仕様と実装
- ECMAScript Specification Suiteという仕様
- ウェブブラウザの仕様と実装

## 歴史 {#history}

- Early
    - ウェブブラウザ誕生
    - Ajax
    - DHTML
        - https://en.wikipedia.org/wiki/Dynamic_HTML
    - DocumetからAppへの変化
    - IEと停滞
    - ES4と停滞
    - jQuery
        - 互換レイヤー
- Middle
    - Node.js
    - モジュール
        - [history-of-javascript/4_evolution_of_js_modularity at master · myshov/history-of-javascript](https://github.com/myshov/history-of-javascript/tree/master/4_evolution_of_js_modularity)
        - Namespace
        - AMD
        - CJS
        - UMD
        - ES Modules <-
- Later
    - CoffeeScript(2011) -> traceur - 6to5(babel) 2014
    - ECMAScript 6/ES2015
    - io.js fork <- Node.jsにおける停滞と
    - vs. mobile
        - JavaScriptそのものに競争相手はいなかった? けどアプリが競争相手になっていた
    - Side Note
        - W3C/WHATWG HTML

これと本文を紐付ける。

- moduleは本文でも後戻りしてる。これは歴史の複雑さを示している

## 氷塊すべきところ

- JavaScriptに関わる仕様
    - HTML, ECMAScript, DOM
    - そこへ至る未知
    - jQuery
    - 独自実装
    - => 停滞
- 相互運用性が強くなってきたから
    - コミュニティモデル
    - npm
    - モジュール
- 増え続けるAPI
    - https://web-confluence.appspot.com/#!/confluence
    - 年間500

## 本書の読み方 {#reading}

## JavaScriptの学び方 {#how-to-learn}

- 現代のJavaScript
- npmが97%
- エコシステムも含めてJavaScript
