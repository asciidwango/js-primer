# 2022-10-06 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

----

## ミーティングアジェンダ

- [2022-10-06 ミーティング · Discussion #1480 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/discussions/1480)

----

## 前回からの変更

- azu: 前回からの差分
- azu: 非同期の章に、バー的な図を足した
- [fix(async): 非同期処理と同期処理の図を追加(並列) #1467 ](https://github.com/asciidwango/js-primer/pull/1467)
  - https://jsprimer.net/basic/async/
- azu: Node CLIをES Modulesにして、CJSはコラムに変更
- [ fix(use-case/nodecli): ESModule対応 #1465 ](https://github.com/asciidwango/js-primer/pull/1465)
- azu: `__dirname` だけはちょっと気になった
- laco: npm testではcwdは固定なのでパスは変わらない
- azu: よく考えるとinputのpathも同じくcwd依存ではある。
- azu: このままでいいか
- azu: Node 16 LTSに切り替える準備として、リポジトリをアップデートした
- [ refactor: リポジトリをNode 16+/npm 8+へ変更 #1464 ](https://github.com/asciidwango/js-primer/pull/1464)

----

## 今月やるべきもの

- azu: Node 16 LTSへのアップデートは必要
- [Node.js 16 LTSに更新する · Issue #1437 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1437)
- azu: `npx` がダウンロードと実行に分かれて、`npx -y` か Enter押してもらう必要がある
- azu: どっちがいいんだろ? やっぱり `npx -y` かな
- azu: `npm init -y` を使ってるんだっけ?
- laco: 確かそう。
- azu: なら `-y` に合わせるのがいいか
- azu: これはNode 16 LTSが26日に出るのでそこで入れる

### 結論

- azu: [Node.js 16 LTSに更新する · Issue #1437 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1437)をやる

---

## やれるといいなというやつ

- azu: やれたらいいななもの
- azu: 今月読み直すので、そのときに見ながら直していけるといい感じ
- [`letではなくconstで反復処理をする` のタイトルと内容の組み合わせは意図的なものでしょうか · Issue #1288 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1288)
- azu: これはコラムのタイトルが分かりにくいという感じ
- [`function` キーワードと関数式のうち推奨のものがあればそれを、ない場合はその旨明記してほしい · Issue #1354 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1354)
- azu: これは推奨はどっち? というやつ。
- azu: これはちょっと置いておくかも
- [falsyな値の一覧の不足 · Issue #1378 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1378)
- azu: `-0`と`+0` を区別するケースがないので、列挙しなくてもいいんじゃないかというやつ
- azu: falsyの説明は2箇所出てくる
- laco: 説明がfalsyの定義、その値を列挙になってる。
- laco: 次の値はfalseとなり、それをfalsyと呼ばれます みたいな順序の方がよさそう
- laco: falsyはESの仕様の定義じゃないんですよね?
- azu: 仕様にはなかったはず
- laco: これらの値の評価結果がfalseとなるやつで、それをまとめてfalsyと呼ぶという立て付けが良さそう
- laco: 週末にちょっと直してみます
- [ECMAScript: ECMA262のURL変更 · Issue #1479 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1479)
- azu: これは `.es` ドメインが公式なのでそっちにしようという話
- azu: `.io` で学んだなので こういうドメインはやめて欲しかった
- azu: 変更するだけ
- [Array#sliceの説明について · Issue #1163 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1163)
- azu: これはTableで書けるのかな?
- azu: 書面だといけます?
- kahei: LaTeXとかはちょっとやりたくないので、イラストレータで図におこすものかも
- azu: やっぱり図かな。
- azu: Tableだと線の下に書くので難しい
- azu: 図書いてみます。

### 結論

- @azu:
    - [`letではなくconstで反復処理をする` のタイトルと内容の組み合わせは意図的なものでしょうか · Issue #1288 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1288)
    - [ECMAScript: ECMA262のURL変更 · Issue #1479 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1479)
    - [Array#sliceの説明について · Issue #1163 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1163)
- @laco:
    - [falsyな値の一覧の不足 · Issue #1378 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1378)

## そのほか

- azu: 後やることは見直しぐらいかなー
- azu: 付録とか何か書きます?
- laco: 賞味期限がどれぐらいのイメージで?
- azu: 付録は賞味期限短くてその時の感想でいいじゃないかな
- azu: エコシステムとか
- laco: ECMAScriptとは別になっちゃいますがIntlについては今後ありそう
- azu: 数値とかDateとか文字列のカウントとか
- azu: ちょっと実際のユースケースと絡めるところが難しいかも。ライブラリ感がある
- laco: ちょっと先のES Proposalを書くとか?
- azu: decoratorとかRecords Tupleとか大きめのが待ってる。構文か
- kahei: 考えてみるということで


## 次回

- 2022年11月10日 19:00
