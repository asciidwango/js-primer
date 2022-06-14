# 2022-06-14 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

----

## ミーティングアジェンダ

[2022-06-14のミーティングアジェンダ · Discussion #1431 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/discussions/1431)

----

## 次の改訂版に向けた動き

- kahei: まだ未決定だけど、次の改訂に向けてどう動くのかについてのミーティングです

## ES2022への対応

- azu: 現状のES2022の対応度合いについて
- azu: ES2022の主要な変更は対応済み
  - [feat!: ES2022のサポート by azu · Pull Request #1432 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/1432)
  - [ECMAScript 2022対応 · Issue #1337 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1337)
- azu: ES2022が正式リリースされたのに合わせてリリースノートを公開するつもり
- azu: もし改訂する場合はこれをベースにする感じだと思う

## どこまでやるか

- azu: 改善したい箇所をとりあえず出してみた
  - [2022-06-14のミーティングアジェンダ · Discussion #1431 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/discussions/1431#discussioncomment-2945149)
- azu: Node ESM対応
  - 前に話してたように、CLIではCJSベースでESMも対応したよぐらいに留める気がする
  - 現実のESM対応はまだまだ未発達
  - [Node.js ESMの対応 · Issue #1355 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1355)
- azu: Node 16 LTSが来るので、npm 8になる
- laco: npm 8(lock)に触れてるのは、nodeとnpmのバージョンを出してるところだけ?
  - https://jsprimer.net/use-case/setup-local-env/#install-nodejs
- azu: なら、シンプルにそこだけ対応する感じかな
- azu: どっちかというとリポジトリをnpm 8にしたい
- azu: これはやるという感じで良さそう
- azu: よく見る詰まりどころ
  - クラス
  - 非同期
  - TODOアプリ
- azu: 全部単に長いからからもしれない。
- azu: これもどうにかできるといいなー
- laco: クラスとかについて意見を募集してみるとが良さそう
- laco: アンケート出す仕組みとかあります?
- azu: やろうと思えば
- laco: Discussionで、クラスを分解とか読みやすくするためのアイデアを募集して、そのフィードバックを求めるとか
- azu: それでいいかな。リリースノートのところに入れておく感じ
- azu: ビット演算子は書き直して、結構長くなったけど、ユースケースでは登場してない
- azu: 紙面的に結構向いてない(横に長い)ので最悪削ってもいい
- kahei: その辺はやってみての相談ですかね
- azu: 付録は更新する?
- azu: AtomはDprecatedになってる
- laco: 今だとウェブエディタ?
- laco: CodeSandboxとか、
- azu: repl.it, codesandbox, stackbliz
- azu: ホスティングは…
- laco: Vercelがないので
- laco: 付録って紙面にあるんでしたっけ?
- azu: リンクだけだったかも
- laco: じゃあ後でいい気がします。

### 結論

- azu: Discussionでクラス、非同期、TODOの意見募集スレを作る
  - リリースノートで意見を募集するリンクを貼る
- azu: Node.jsの更新についてのIssueは作ってやる
  - Node 16 LTSが2021-10-26に出たら更新する
  - https://nodejs.org/ja/about/releases/
  - [Node.js 16 LTSに更新する · Issue #1437 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1437)
- laco: [付録: リンク集を更新する · Issue #1436 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1436)

## レビューアー

- kahei: もし改訂するときはもう一度レビューしてもらう感じですかね?
- azu: そこまで内容全体が変わってるわけじゃないので、新しく募集するのが良い気がする

## 次回

- 7/14(木)
