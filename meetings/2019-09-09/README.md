# 2019-09-09 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

----

## ミーティングアジェンダ

- [2019年9月9日 ミーティングアジェンダ · Issue #956 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/956)

----

## Firefoxのコンソール

- @azu: Nightlyで新しい機能がコンソールに入る
- @azu: スクラッチパッドみたいな複数行のエディタ機能
- https://twitter.com/MozWebCompat/status/1170889728171753473
- @azu: これを本編で紹介する悩み中
- @azu: スクショ自体はほぼ同じなので大丈夫かな
- @azu: Stableに入るかまだわからないので保留

----

## チートシート

- @azu: 全体像をざっくりつかめるものが欲しくてチートシートを書いた
- [ボキャブラリーシート · Issue #738 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/738)
- [feat(cheetsheet): チートシートの追加 by azu · Pull Request #955 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/955)
- @azu: https://cheats.rs/ をイメージして書いた
- @kahei: これも付録に?
- @azu: 書いてていて意外とページ数的には少なさそう
- @azu: 2-3ページぐらいなんじゃないかなと思った
- @azu: なので入れて良さそう
- ~~~~
- @laco: チートシートに本編みたいないつ入った機能なのかの表記ほしいな
- @azu: [ES2015]みたいなやつか
- @azu: 入れる
- ~~~~
- @azu: 他に抜けてるものは?
- @azu: js-primerで紹介してるものだからGeneratorは意図的に抜いてる
- @azu: switchがない
- @azu: Rustを見てたからか
- @laco: 他は大丈夫そう

### 結論

- @azu: チートシートを完成させる

----

## 付録C

- @azu: テスト駆動開発の"付録C: 訳者解説:テスト駆動開発の現在" っぽくエッセイを書くとかありかもと思った
- @azu: これをやりたいと思ったのは書籍限定のなにかが合ったほうがいいんじゃないかなというところから
- @azu: Promise本だと本の作り方とかをかいたんだよね
- @azu: 本に入れるかは別として宣材的にもつかえるかもしれないので考えたい
- @azu: 本編だと長く使えるものをベースにしてたので、完全に使い捨てのエッセイ気味の内容
- @azu: TDDだと始まりとパラダイムシフト的な過去の流れ
- @laco: JavaScriptだとエコシステムってやたらでてくるけど何?ってのがありそう
- @azu: ever greenって?
- @laco: あとはleft-padとか
- @azu: たしかに。それはSRE本にも書かれてた気がする。
- @azu: パラダイムシフト... backbone、フレームワーク?
- @laco: フレームワーク寄りになる?
- @azu: JavaScriptはブラウザ、ウェブに密接なのでそこの関係は避けられない気がする
- @azu: ECMAScriptの変化は入れるかな? 本編にあるけど
- @azu: ES2015は大きな変化
- @laco: JVMだと仕様と実装は同じあたりだけどECMAScriptだと?
- @azu: 半分ぐらいは同じかな。
- @laco: ECMAScriptって言語作者みたい人がいないってのは特徴的かも
- @azu: なるほど。この人がOKならOKみたいなのはないかもしれない
- @azu: 最近はChrome一強だから変化はあるかもしれない
- @laco: Web APIの方は特に
- @azu: その辺で2-3コテーマ決めて書けるものがあったら書きたいな
- @azu: 書くなら賞味期限を決めたいな。1週間もつもの、1年もつもので抽象度違うし
- @kahei: その辺は基本的に過去よりになるならあまり依存しないかも
- @azu: 過去よりになる既にJavaScript知ってる人が面白い内容になってしまうかも
- @azu: 過去から学べるものじゃないと意味がなさそう。
- @azu: 考えてみる

### 結論

- @azu: エッセイを考える
- https://github.com/asciidwango/js-primer/issues/957

----

## サブタイトル

- https://github.com/asciidwango/js-primer/issues/865
- @azu: 既存の書籍のサブタイトルを列挙してみた
- @azu: 基礎 が入ってることは多いね ぐらい
- @kahei: それはわかります。
- @kahei: 前回言っていた用に迷わないとか
- 〜 案を出し合う 〜
- https://github.com/asciidwango/js-primer/issues/956#issuecomment-529421600
- @azu: JavaScript + 基礎 + 入門 あたりはだいたい
- @kahei: 「 ずっと役立つ基礎を身につける！」みたいのは帯に近いところにいれるとか
- @laco: よさそう
- @azu: タイトル、サブタイトル、帯で分解よさそう

### 結論

- 結論はでてない
- ざっくりと次のようなイメージ
- 言葉がかぶってるので修正する必要がある

```
　　JavaScript Primer
基礎から学べるJavaScript入門

〜 迷わずにJavaScriptを学ぼう！ 〜
```

----

## array spread

- @laco: チートシートに戻ってarray spreadの説明が内見
- @azu: Math.maxで突然だして使ってる
- @laco: 配列で説明する?
- @laco: concatと並べるとか
- @azu: ... は展開と関数か
- @laco: Rest ParameterのところでSpread Syntaxを入れて、配列のところでconcatの対比とか
- @azu: 分けるのがいいか

### 結論

- @azu: Spread Syntaxの説明を追加する
- https://github.com/asciidwango/js-primer/issues/958

----

## 次回

2019年10月7日（月）
