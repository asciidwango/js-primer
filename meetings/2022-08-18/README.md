# 2022-08-18 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

----

## ミーティングアジェンダ

[2022-08-18 ミーティングアジェンダ · Discussion #1460 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/discussions/1460)

----

## 非同期の章の書き直し

- azu: 非同期の章を書き直してる
- azu: エラーファーストコールバックをコラムに移動
- azu: Node CLIもpromiseベースに変更して、エラーファーストコールバックをコラムに移動した
- [fix(async): エラーファーストコールバックをコラムへ移動 by azu · Pull Request #1457 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/1457)
- azu: あと書いてて、Unit Test でfs syncが出てる
- https://deploy-preview-1457--js-primer.netlify.app/use-case/nodecli/refactor-and-unittest/
- azu: これはawaitにしてもいい気はするけどどうだろ?
- laco: うーん、どっちでもいい気はするが、awaitの方がいい気がする
- azu: mochaの第二引数がpromiseを返した時の挙動とかはいいかな?
- azu: jestとかnode:testとかも同じだし、いらないか
- azu: あとは、並行と並列の図を書く
- [非同期: 並行、並列の説明を整理する · Issue #1459 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1459)
- azu: 横にバーがあって、setTimeoutで登録、ながいブロックする処理、発火が遅れるという感じの図
- azu: 昔どっかで見て、これで自分も理解した気がする


### 結論

- azu: 非同期の処理の書き換えを進める
  - [fix(async): エラーファーストコールバックをコラムへ移動 by azu · Pull Request #1457 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/1457)
  - [非同期: 並行、並列の説明を整理する · Issue #1459 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1459)

----

## [Node v16.17.0 (LTS)](https://nodejs.org/en/blog/release/v16.17.0/)でnode:testとかがきた

- azu: 前回も話してたけど、node:testについて
- azu: [Node v16.17.0 (LTS)](https://nodejs.org/en/blog/release/v16.17.0/)にbackportされたのでNode 16でも使えるようになった
- azu: けどexperimentalだからいいか
- laco: node:test, util.parseArgsどちらもexperimentalっぽい
- azu: 次の更新では入れないけど、その次は大きく変わるかも
- azu: mochaもcommoanderもいらなくなるから、markedだけになる
- azu: 別の題材を考えた方がいいのかも
- laco: yamlを読み込んで変換する処理とか
- azu: yq, jq的な

### 結論

- 特に対応はしない

----

## 残りのタスク

- https://github.com/asciidwango/js-primer/discussions/1460#discussioncomment-3421497
- azu: 残りのタスク、来月ぐらいまでに、本文的な追加要素は片づけたい。
- 10月は直しにしたい。
  - [Node.js ESMの対応 · Issue #1355 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1355)
  - [Node.js 16 LTSに更新する · Issue #1437 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1437)
  - [ユースケース: `node:assert` などのnode prefixを使うようにする · Issue #1451 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1451)
  - [`typeof` 演算子で `function` が返ることについて補足する · Issue #1455 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1455)
- azu: でかいのはNodeのESM対応
- azu: これは3でCJSの方向にするんだっけ?
- https://github.com/asciidwango/js-primer/issues/1355#issuecomment-998571399
- azu: "このユースケースで今後登場するモジュールはすべてCommonJSモジュールです。 Node.jsではES Moduleもサポートされる予定ですが、現在はまだ安定した機能としてサポートされていません。" この辺は書き換える必要がある
- laco: いっそESMベースにした方が長く持つ気がする
- azu: 確かに。CJSからESMは大変だけど、ESMからCJSはそうでもない
- laco: Commander.jsはESM対応してるんだっけ?
- azu: もうしてそう。named importになってるポイ
- laco: じゃあ、1のESMベースにCommonJSはコラムで良さそう
- azu: CJSは https://jsprimer.net/use-case/nodecli/argument-parse/#commonjs-module この辺でコラムを入れる感じで
- azu: 他にもESM周りで書き換える場所はありそう
- https://jsprimer.net/basic/module/ でTODOを参照してるところとか
- azu: どこまでCJSを深くやるかが難しいそう。コラムに収まるか
- azu: 相互運用性の問題はとても大変なのでリンクに投げたい。Nodeのドキュメントあるかな?
- azu: https://nodejs.org/api/esm.html#interoperability-with-commonjs 一応あるっぽい
- azu: MDNはある?
- laco: 大したものはないかも
- laco:  Node.jsの本じゃないので。細かいところはドキュメントとかMDNとかに投げたい。
- azu: それで良さそう。


### 結論

- laco: [Node.js ESMの対応 · Issue #1355 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1355)
  - ESMベースに書き直す
- azu: そのほかのやつをやる

----

## その他

- azu: レビューアーどうしようかあん
- azu: Node ESMのところとかは改めてレビューして欲しい気がする
- azu: https://github.com/asciidwango/js-primer/discussions/1445 特にやりたい人来てない。
- azu: ESMの完成したらもう一度投げよう

## 次回

- 9月22日(木) 19:00
