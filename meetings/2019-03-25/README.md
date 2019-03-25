# 2019-03-25 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

----

## ミーティングアジェンダ

- [2019-03-25のミーティングアジェンダ · Issue #734 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/734)

----

## 進捗報告 - azu

- azu: 前回から進んだところ
- [JavaScriptとは](https://jsprimer.net/basic/introduction/)
- azu: これは書き直した
- azu: 図を追加したりしたのだけど、これって図は印刷時にモノクロ?
- kahei: そうですね
- kahei: イラストを起こしてもらうとかできるので、調整できます
- [`// この行は実行{されません,されます}` に統一する #673](https://github.com/asciidwango/js-primer/issues/673)
- azu: これは前回話したように統一した
- azu: コメントは実行されない書き方
- [データ型とリテラル: ラッパーオブジェクトについてのコラム #674](https://github.com/asciidwango/js-primer/issues/674)
- azu: データ型とリテラル -> ラッパーオブジェクトの関係を追加した
- [ユースケースに目次とdescriptionを追加する · Issue #676 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/676)
- azu: これは各部に目次を追加した
- azu: 書籍にするときにはこの目次はなくてもいいかもしれない
- [別の章へのリンクの仕方を統一 #173 ](https://github.com/asciidwango/js-primer/issues/173)
- azu: リンク方法を統一した
- azu: <https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING.md#%E7%AB%A0%E3%81%B8%E3%81%AE%E3%83%AA%E3%83%B3%E3%82%AF>にも追加した
- azu: "まえがき"を追加しました
  - https://jsprimer.net/intro/ を追加
- azu: プロジェクトは <https://github.com/asciidwango/js-primer/projects/5>にあります
- azu: あとは謝辞とかはまだないです
- azu: 基本的に章は書き終わっているので、今はリファクタリングをやってます。
- azu: 基本文法は非同期以外を大体、昨日はTodoappをやってました

## 解決しないといけないやつ 

- azu: [nodcli: npm test の実行結果がちょっと違います · Issue #723 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/723)はもう解決してる?
- laco: してる
- azu: 他のnpmモジュールは固定してる?
- azu: commanderと...?
- laco: marked
- azu: commanderはしてるっぽい
- azu: markedはしてないっぽい
- laco: します。
- azu: markedは0.5系か。。。 1.xだといいんだけど
- azu: あとは、[ループ: コラム 無限ループの対処 #695](https://github.com/asciidwango/js-primer/issues/695)をやりたい
- azu: かんたんRubyでもあったし、コード書いてたら起こしそうなので同対処するか
- azu: あと流行りだし
- laco: 無限ループ書いてリロードしてもキャッシュが残っていて、反映されないとか
- azu: スーパーリロードについてもどこかで欲しいな
- laco: あとはこれはブラウザ上で?
- azu: index.html, index.jsでやったときの想定
- azu: Firefoxで無限ループしたときの挙動と対処を書くとかしたい
- azu: あとは Meta: "参考" を本文から外す #690 をやりたい
- azu: 文字列とかの参考を外す
- azu: あとは[次に何をするか: 参考リンク集 · Issue #510 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/510)?
- azu :これの進捗は?
- laco: 今書いているところですが、これでいいですか?
- ...見てる...
- azu: 大体よさそう
- laco: どこまで掘り下げるべきか
- azu: 基本的に古くなったら消せるぐらいなので、これぐらいでいい気がする
- laco: これって物理版には載せない?
- azu: 載せない想定だけど(URLだけ想定)、これぐらいなら印刷もありかな
- laco: リンク切れもしやすそう
- azu: 載せるなら古くなってるかもという注意書きが必要
- azu: 後はタイトルでぐぐってとか
- azu: [リンク切れをチェックする · Issue #285 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/285)を後でやる


## 結論

- laco: [nodecli: npmモジュールのバージョンを固定する #739](https://github.com/asciidwango/js-primer/issues/739)
- azu: [ループ: コラム 無限ループの対処 #695](https://github.com/asciidwango/js-primer/issues/695)
- laco: [次に何をするか: 参考リンク集 · Issue #510 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/510)
- azu: [リンク切れをチェックする · Issue #285 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/285)

----

## 特典やプロモーション

- azu: 他に特典で書きたいものはある?
- azu: https://github.com/asciidwango/js-primer/issues/734#issuecomment-476015676 に書き出してみたけど
- laco: チートシート
- azu: なるほど。物理本だと欲しいかも
- laco: 検索しにくい記号とかをまとめたもの
- azu: Arrow Functionとかの読み方とか
- laco: 読み方を知らないと検索できない
- azu: 読み方大辞典
- azu: ふりがなJavaScriptも人気だったりありそう
- laco: 読み方と章の対応みたいな
- azu: ページ数は省いてタイトルだけでよさそう
- azu: チートシート単体で公開して、詳細は jsprimer で見られるよという誘導にも利用できる
- azu: チートシートってこれ印刷する場合はどういうフォーマットでつくるんだろ?
- azu: 組版的な問題になりそう
- kahei; その辺は複雑かも
- azu: 自分で印刷できるオンデマンド的なもので欲しいかも
- azu: 後ウェブでも欲しい
- azu: 読み方、ボキャブラリー
- azu: コード索引
- laco: ボキャブラリーシート
- azu: (検索しながら)書き方チートシートは結構あるので、やっぱり読み方だな
- laco: 検索するためのボキャブラリー
- azu: 載せるものを一覧する
- azu: 裏表(2ページ)程度かな
- kahei: チートシートなのに多いとおかしいので
- laco: やってみる
- azu: 後はプロモーション系
- azu: JavaScriptクイズとか factquiz.chibicode.com
- azu: 書籍にリーチできない人にリーチする方法
- laco: twitter広告とか
- kahei: あれってどれぐらい効果があるんです?
- azu: ウェブで検索できる人は大体 jsprimer に辿り着けそう
- azu: そういう意味だとやっぱり新人な人へのアプローチ
- azu: 結局は新人研修で使ってもらうのが早そう
- azu: Twitterに投げた
- https://twitter.com/azu_re/status/1110080716866412544
- 反応はいくつかあったのであたってみる
- azu: 報酬もらうと税金めんどい
- azu: 報酬をそのままプールして宣伝費にしたい
- azu: あとは"JavaScriptの入門書 js-primer Newsleter"(TOPにあるメールフォーム)で数百人ぐらい登録されてる
- azu: これをリリース前に通知出す
- azu: 書影が決まったときぐらいのタイミング?
- azu: 書影ってどれぐらい前に決まる感じですか?
- kahei: タイトル、表紙は3ヶ月前ぐらいかなー
- azu: そのタイミングぐらい と リリース(amazonとか)ぐらいのタイミング
- azu: 表紙は? そもそもタイトルもまだ未定
- kahei: JavaScriptっぽいアイコンって何かあるんですかね?
- azu: サイは古い気がする。大体黄色のJSな気がする
- laco: ひよこ?
- laco: Unityのやつはでっかいひよこ
- kahei: 小動物だとprimerっぽいですかね
- kahei: タイトルも追々考えいきましょう

## 結論

- laco: [ボキャブラリーシート · Issue #738 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/738)作る

----

## CLA

- azu: [オブジェクトリテラルのハイフンを含むプロパティ名の説明及びサンプルの追加 by sekky0905 · Pull Request #679 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/679)のような追加をどう取り込むか
- azu: 今はCLAみたいなものがないので
- kahei: CLAって権利を移譲するという話ですよね
- azu: OSSのLICENSEで似たようなものがアレばいいのだけど
- ....いろいろ検索....
- azu: [オープンソース プログラムの作成 - The Linux Foundation](https://www.linuxfoundation.jp/resources/open-source-guides/creating-an-open-source-program/ "オープンソース プログラムの作成 - The Linux Foundation")はテンプレートがあるといってる
- kahei: [Individual Contributor License Agreement Template (CLA)](https://www.docracy.com/0pmrhl5zsdf/individual-contributor-license-agreement-template-cla "Individual Contributor License Agreement Template (CLA)")はテンプレっぽい
- azu: Apacheのやつみたいですね
- kahei: これをベースに書籍向けに作るかんじですかね

## 結論

- kahei: CLAを作成する

----

## レビューア

- azu: 章は完成しているので後はレビュー
- azu: レビューアどうします?
- kahei: 面識があるなら直接、ないなら編集部から行う感じで
- azu: 何人ぐらいいるといいですか?
- kahei: あんまり多すぎでも問題なので10人ぐらいかな
- azu: JavaScript詳しい人ってよりも読んで感想もらえる人がいいかな
- azu: 仕様的にそんな間違いはないと思うので。もちろんいてもいいけど
- azu: しっかり読んでくれる人
- azu: 何人かリストアップしてみよう
- laco: yes
- laco: あとはフィードバック方法
- laco: 感想的なものを置ける場所、Googleフォームとか
- azu: IssueとかPRくれると楽
- laco: 悪いところはオープンだと書きにくい
- azu: テクニカルはGitHubで、感想はGoogleフォームで
- azu: スコアとかいる?
- laco: 意味ないからいらない
- azu: 匿名でできたっけ?
- kahei: 献本の連絡先とかが
- laco: 献本が欲しい人は連絡先をいれてねぐらいで

## 結論

- azu, laco: レビューアを何人かリストアップ(合計10人)
- azu: [レビューフィードバックフォームを作成する · Issue #740 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/740 "レビューフィードバックフォームを作成する · Issue #740 · asciidwango/js-primer")

----

## 次回

2019年4月22日（月）
