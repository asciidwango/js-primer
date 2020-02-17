# 2020-02-14 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

----

## ミーティングアジェンダ

- [2020-02-14 ミーティングアジェンダ · Issue #1073 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1073)

----

## レイアウトの確認

- [書籍用レイアウト/著者校正用PDF · Issue #1070 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1070)
- kahei: レイアウトの確認について
- kahei: ES2015のラベルはこんな感じはどうですかね?
- azu: もうちょっと枠になって幅とっていいかもしれない
- azu: セクションのタイトル部分にしか入れないので
- laco: 右上のページとかには不要ですね。"ES2015" のラベルは見出しだけで（目次と柱にはつけない）
- kahei: あと目次にはES2015とかいりますか?
- azu: 目次はメソッドとかの単位で切っているわけじゃないので、付けられないと思います
- azu: まざってしまう
- azu: なので不要ですね
- kahei: https://jsprimer.net/basic/ このページはいりますか? 目次とかぶる
- azu: 目次とかぶるのでどっちかでいいですね
- azu: 目次に説明を入れるパターンもあるけど
- kahei: 目次は一覧だけになりますね
- azu: なら目次だけで https://jsprimer.net/basic/ は削除でいいですね
- kahei: [読み始める前の事前準備 · JavaScript Primer #jsprimer](https://jsprimer.net/intro/preparation/)はいります?
- azu: これはウェブ向けなのでいらないですね
- azu: 削除でOKです
- kahei: [文章の間違いに気づいたら · JavaScript Primer #jsprimer](https://jsprimer.net/intro/feedback/)はどうします。
- azu: "この書籍はGitHub上で公開されているため、GitHubリポジトリのIssueとしてあなたの疑問を報告できます。" あたりの箇条書きは冗長ですね。
- azu: これもウェブ向けという感じはあるので、"問題を修正する"というところはいいかもしれないけど
- laco: ここ(=>)ってIssueテンプレートになってればいいですよね
- azu: すでにあるはず。なのでいらない
- azu: あと書籍における正誤表とか一般的な修正な案内ありますよね?
- kahei: 基本的に問題あったらメール送ってというのが末尾にあるぐらいですね
- kahei: この"参考" はいります?
- azu: うーん、これはいらない気はしますね(最初の部分にかかっている)
- kahei: 報告方法あたりと参考はカットして、最初と修正方法については乗せる感じにします
- kahei: リンク
- kahei: リンクはPDFだとクリックできるようにしてます。pandocがおかしいので手修正していますが
- kahei: 書籍ではクリックできないので、脚注にURLを記載する形にしてます
- azu: それでOKです
- azu: あんまりにも数が多いページがあったら削る感じでいいですね
- kahei: "コラム"について。コラムはこういう枠で表現している
- laco: "コラム"って文字はないですね。
- kahei: 毎回コラムって出ちゃうので
- azu: 文中に"コラム"って書いてたっけ?
- azu: 一箇所だけあった。これ修正すれば大丈夫そうです
- [コラムという言葉を文中に使わないようにする · Issue #1076 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1076)
- kahei: あとは[はじめに · JavaScript Primer #jsprimer](https://jsprimer.net/intro/)はどうします?
- kahei: これ書き直します?
- azu: 見た感じそのままでも大体は良さそうな気がしますね。
- azu: 本書の目的ではないこと はちょっと冗長ではあるけど
- laco: js primerらしさはある
- azu: 前回ここに未来のECMAScriptについては触れてないという話をいれるというのをいったぐらいですね
- [はじめに: 未来(ES.next)についても書いていないことを書く · Issue #1029 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1029)
- azu: きほんてきにはこれぐらいかな。
- azu: セクションはこれでたります? 本書の目的 、目的ではないこと ...
- azu: ライセンスのあとに修正方法の話?かも
- kahei: ページ的には続いてるので大丈夫ですね。
- laco: 章として分けるかどうかですね。
- azu: はじめにの中に[文章の間違いに気づいたら · JavaScript Primer #jsprimer](https://jsprimer.net/intro/feedback/)が入っていいですね。短くなってるだろうし
- azu: あとは謝辞か
- azu: これははじめにの最後ですかね?
- kahei: はじめに -> 文章の間違いに気づいたら -> 著者紹介 なのでどこにいれるかですね
- azu: はじめに -> 文章の間違いに気づいたら -> 謝辞 -> 著者紹介ですかね
- [はじめに: 謝辞 · Issue #1075 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1075)
- azu: レビューアーとコントリビューターに対する謝辞を書く
- azu: セクションタイトルは"謝辞"
- laco: 他の書籍も謝辞ぽい
- azu: 謝辞で行く
- azu: あとコンテンツ的なものだとスクショか
- laco: コンソールの文字が読めなかったですね
- kahei: 画面の解像度を下げてとるというテクニックがありますね
- azu: 1024 x 640までさげられるっぽい
- laco: 解像度を下げて撮影ですかね
- [Firefoxのスクショを更新する · Issue #1028 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1028)

## サブタイトル 

- kahei: タイトルは「JavaScript Primer」でいいですよね
- kahei: サブタイトルはどうしましょう
- kahei: タイトル、サブタイトル、キャッチの3つがあります。
- kahei: サブタイトルとキャッチどっちかとかもできます。
- azu: キーワードで考えるか、センテンスで考えるか
- azu: 自分はAmazonのタイトル一覧で載ってるイメージ。SEO的な考えで見てる部分ある
- laco: はじめにの内容が反映されているといいですよね
- azu: 変化に対応?
- kahei: キャッチフレーズっぽいですね。
- laco: 基本とユースケースから学ぶ入門書?
- azu: 「から」だと２つ意味がある感じがする 
- laco: fromと
- azu: うーん
- azu: 結局は「入門書」ということが伝わればいいって感じですよね。Primerは単語として伝われないので
- azu: 最悪、基本、ユースケースは省いていい。
- kahei: 以前でてた「迷わない」とか
- laco: 「迷わない」だとネガティブなので「まっすぐ」とか
- azu: なんかまっすぐだと違う感じがする。
- azu: 「迷う」の対義語ってなんだろ
- azu: 「悟る」
- kahei: それ開眼ですね…
- laco: イメージ図 https://github.com/asciidwango/js-primer/issues/1073#issuecomment-586213225
- azu: 「迷わず学べる入門書」と「迷わないための入門書 」だと迷わないための入門書の方がバランスいいですね。
- azu: 迷うの感じが画数多いのでひらがなだといい
- kahei: とりあえず「迷わないための入門書」ですすめる感じでいいですかね?
- azu, laco: OK

## イラスト

- 〜色々検索しながら〜
- kahei: 迷わないだとコンパスとか地図とか
- azu: リアルチックになるとちょっと微妙だなー
- laco: Safariっぽい
- laco: Mapのピンとか
- laco: こんな感じの山に登ってるイメージいいかもしれないですね
- azu: 自分も山登るからなー
- azu: https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2018/06/Screen-Shot-2018-06-13-at-10.39.18-PM.png とかイメージ近い?
- laco: イラストは次回までに決まっていればいいんでしたっけ?
- kahei: そうですね。
- laco: 次回までに各自3枚ぐらい案を出す感じで

## 次回

2020-03-13 金曜
