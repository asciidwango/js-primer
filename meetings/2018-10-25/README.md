# 2018-10-25 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@vvakame](https://github.com/vvakame)
- [@lacolaco](https://github.com/lacolaco)

----

## ミーティングアジェンダ

- [2018年10月25日 ミーティングアジェンダ · Issue #537 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/537)

-----

## ドメイン移行

- azu: <https://jsprimer.net/>のドメインへ移行した
- azu: 既存のページは自動的にリダイレクトされるはず
- azu: あとはGoogleの検索結果が切り替われば問題なし

----

## "この文は実行されません"について

- azu: "この文は実行されません"が2種類ある
- コメントとconsole.logしているパターン
- どちらかに統一したい
- kahei: 初心者的にはコメントのほうがわかりやすい
- laco: テストしたいという気持ちもわかる
- azu: テスト時に`code.replace("この文は実行されません", "throw new Error")`すればテストできそう

### 結論

- コメントに統一
- コメントをテストする仕組みを入れる

----

## 残り

- azu: 残っているプロジェクト
- [基本文法](https://github.com/asciidwango/js-primer/projects/1 "基本文法")
- [ユースケース](https://github.com/asciidwango/js-primer/projects/3 "ユースケース")
- 基本文法は- [ feat(other-parts): その他の高度なAPI #549 ](https://github.com/asciidwango/js-primer/pull/549)を入れると大体終わり
- あとはリファクタリングや最初の導入だけ
- azu: ユースケースはNode.jsのインストール?
- laco:  Node.js実行環境のセクション、ラフに書いたけどどこを掘り進めるべきかわからなくて止まってます
- azu: Node.jsのインストールのやつはNode.jsのインストール、npm、npxのコマンドが入ってるのを確認できるぐらいのイメージかな
    - ajaxでnpx @js-primer/local-serverしたいので先にインストール確認したい
    - npx @js-primer/hello-world みたいので`npx`の確認をしてみるとか
- azu: Node.jsのhello world自体は(node main.js)はnode-cliのところでいいのではないかな
- この章はツールとしてのNode.jsの使い方の説明?だけをするとか
- イメージ
    - Node.jsインストール(ユースケースの準備)
        - node
        - npm
        - npx
        - コマンドの存在確認
    - Ajax
        - ローカルサーバ
    - Node CLI
        - Node.jsの環境オブジェクト
    - Todo
        - module
- laco: Node.jsのインストールじゃなくてユースケースの準備という立て付けが正しいのかも
- laco: node cliのところで`node main.js`してるし準備のところではいらなさそう
- azu: 今のだと node -> browser -> node -> browserとなっているのが気になる
- なので、あんまりユースケースの準備ではnodeのことを掘り下げなくていいかなーと
- ツールとしてのnode
- laco: Node.jsインストールの章というよりは、アプリケーション開発の準備　のセクションで
- azu: あとmoduleも独立してるけど、これもTodoの中に移動していいかな

### 結論

- laco:
    - Node.jsのインストールの章は"アプリケーション開発の準備"の章とに変更
    - `node main.js`などについてはnode cliにまかせる
- "アプリケーション開発の準備"が完了したらajax, cli, todoからのリンクを付け足す
- azu:
    - moduleはTodoの準備に持っていく

----

## 全体のバランス

- azu: あとは全体を見直して行く感じ
    - 前から順番に読んでいけるように書いている
    - なのでできるだけなだらかな難易度にしていきたい
    - 途中で難易度がいきなりあがるとそこで脱落する人がでてしまう
    - 今の所難易度が高いのがStringと非同期
- laco: Mathはここにいる意味がなさそう(文字列の後ろ)
    - Dateとかみたいにビルトインオブジェクト系にまとめてよさそう
- azu: Mathに依存してるものは特にないから大丈夫そう
- laco: Stringももっと後ろにあってもいいのかも
- Map/SetはArrayのすぐあとにしてデータ構造としてまとめるとか
- azu: String動かすならどのへん?
- laco: Dateとかのビルトインオブジェクト系で
- これアプリケーション寄りの話になってるから後ろでもいいかなーと
- azu: なるほど
- laco: あとは関数、thisとか
- azu: thisはユースケースで使ってるのは半分ぐらいかなー
- だから短縮はありかな
- laco: Date, Math, 文字列操作、JSONあたりはユースケース寄りのほうがなだらかに登っていけそう
- azu: 書籍にするときにどのくらいのページ数ならいいとかあるんですかね?
- kahei: アスキードワンゴだとあまりページ数は気にしていない
- さっき言っていたように難易度から章を削ったりするとかは考えられる。
- azu: まずは章ごとのページ数とか依存関係を可視化して、バランスが崩れてないかを見るところからかなー

### 結論

- 章のバランスを分析する => 必要なら章を並び替え、リファクタリング
- [章間の依存関係を分析する · Issue #555 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/555 "章間の依存関係を分析する · Issue #555 · asciidwango/js-primer")
- [章ごとのページ量を可視化する · Issue #554 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/554 "章ごとのページ量を可視化する · Issue #554 · asciidwango/js-primer")

----


## 編集

- vvakame: いつごろkaheiさんは編集作業に入る?
- kahei: 一通り修正などが終わった段階
- そこで表記統一や書籍向けのレイアウトなどを組んでいく

-----

## 次回

11月29日(木) 19:30 ~