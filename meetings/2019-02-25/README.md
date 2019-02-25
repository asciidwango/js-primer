# 2019-02-25 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

----

## ミーティングアジェンダ

- [2019-02-25のミーティングアジェンダ · Issue #669 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/669)

----

## `// この文は実行されません`の統一

- azu: 前回も話しあったけど、実行されない行のコメントとかの統一
- https://github.com/asciidwango/js-primer/tree/master/meetings/2018-10-25#%E3%81%93%E3%81%AE%E6%96%87%E3%81%AF%E5%AE%9F%E8%A1%8C%E3%81%95%E3%82%8C%E3%81%BE%E3%81%9B%E3%82%93%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6
- azu: このようなPRがきた https://github.com/asciidwango/js-primer/pull/655
- azu: これは特殊なケースで、コメントが連続なのが良くない気がする
- azu: この辺の表記を統一したい
    - `console.log("この文は実行されません")` 
    - `// この文は実行されません`
    - `// この行は実行されません`
- azu: どれがいいんですかね?
- kahei: コメントの方が実行されない感じがあるので初心者にとって良さそうな気が
- laco: コメントかな
- azu: コメントのほうが注目を集めなくていいかなとは思う
- azu: 該当PRはコメントをちょっと書き直す感じにすれば良さそうな気がする
- azu: あとは "この行" と "この文" どちらがいいかな?
- kahei: どちらも正しい? 行の方が直感的ですかね
- azu: 行の方が直感的
- azu: あ、try-catchのところで、"この文は実行される"というのがあるのか
- azu: こちらは意味的に文のほうがあっている気がする。
- azu: 現在はちょっと混ざっているのが気持ち悪い
- 〜 悩む 〜
- azu: 行にしましょう
- azu: 後からどうにでもなるし、`// この行は実行{されません,されます}`に統一

## 結論

- `// この行は実行{されません,されます}` に統一
- [`// この行は実行{されません,されます}` に統一する · Issue #673 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/673)

----

## 「文字列」と「文字列とユニコード」の分離の進捗

- azu: 大体「文字列」と「文字列とユニコード」の分離は書き終わって後は調整
- azu: 結合文字とか濁点とか絵文字のやつとかどこまでやるかというのは残ってる
- azu: 個人的には、サロゲートペアぐらいまでなのかなと思っている
- azu: normalizeの話とかもちゃんとやるのはすごく難しい気がする

----

## 章の調整

- https://textstat-viewer.netlify.com/?gist=2a5d12080063327053fb6711fb13e04e を見ながら
- laco: ラッパーオブジェクトの章で文字数がガクッと落ちてる。移動できるか？
    - [jsprimer.net/basic/wrapper-object](https://jsprimer.net/basic/wrapper-object/)
- laco: ラッパーオブジェクトの脱線感をどうにかしたい
- azu: 移動するならデータ型の後ろとか
- azu: 何に依存してるんだろ
- laco: Stringとメソッド
- azu: ラッパーオブジェクトは拡張したコラムみたいなものだから中途半端なのかな
- azu: 改訂新版JavaScript本格入門だとほんとに1枚のコラムレベルだった
- azu: ラッパーオブジェクトオブジェクトは暗黙的な型変換をしているとも言えるので、混ぜられるけど
- azu: 暗黙的な変換 + ラッパーオブジェクト
- laco: 微妙そう
- 〜 ラッパーオブジェクトがStringじゃなければもっと前に移動できるかも議論〜
- azu: ラッパーオブジェクトは結局2つのことをいってる
    - プリミティブ型がメソッド呼べるのはなぜ?
    - ラッパーオブジェクトじゃなくてリテラルを使いましょう
- azu: [データ型の説明について（新人研修使用でのポイント） · Issue #438 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/438) これも似たような話なんだよなー
- azu: これは前半について。ポインターがうまくあればいいのかな
- azu: データ型で「 `new String`でも書けるけど、リテラルを使いましょう -> 理由はラッパーオブジェクトの章で」というのがいいんじゃないかなー
- azu: ざっくり次のような感じ。プリミティブぽくないというは比較とかinstanceofとか色々あるけど

```
`new String`、`new Number`、`new Boolean`のようにプリミティブなデータをもつオブジェクトを作成できますが、この方法は推奨されません。
`typeof a` が`object`になってしまい、プリミティブっぽくなるなる。
また、プリミティブ型のデータであってもオブジェクトのようにメソッドを呼べる仕組み(ラッパーオブジェクト)があります。
そのため、常にリテラル(プリミティブ型)としてデータを扱うことにしましょう

詳細はラッパーオブジェクトで
```

- laco: ラッパーオブジェクトの位置は? 次のように取られるとプロトタイプオブジェクトの後だと自然そう
    - `toString()` がどのオブジェクトでも呼び出せる仕組み => プロトタイプオブジェクト
    - オブジェクトじゃなくてプリミティブでも呼び出せる仕組み => ラッパーオブジェクト
- azu: 自分はラッパーオブジェクトは箸休め的なものだと思っているのでどちらでもいいかなー
- laco: Stringの前にラッパーオブジェクトについてやったほうが自然そう
- azu: そうする

## 結論

- assign to @azu
- [データ型とリテラル: ラッパーオブジェクトについてのコラム · Issue #674 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/674 "データ型とリテラル: ラッパーオブジェクトについてのコラム · Issue #674 · asciidwango/js-primer")
- [ラッパーオブジェクト: 章の移動 · Issue #675 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/675 "ラッパーオブジェクト: 章の移動 · Issue #675 · asciidwango/js-primer")


----


## Description

- azu: 各章にdescriptionを入れて第一部にまとめた
- [第1部: 基本文法 · JavaScriptの入門書 #jsprimer](https://jsprimer.net/basic/ "第1部: 基本文法 · JavaScriptの入門書 #jsprimer")
    - [Does not have a meta description · Issue #429 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/429 "Does not have a meta description · Issue #429 · asciidwango/js-primer")
- laco: よさそう
- azu: これユースケースでもやる?
- azu: もともと検索でたどり着くとまっさらで困るのをどうにかしたかった
- laco: やるのがよさそう
- laco: すでに説明あるから流用でいける?
- azu: https://github.com/asciidwango/js-primer/blob/master/tools/generate-summary-1.js に自動生成する(descriptionからMarkdownを更新する)ツール書いてあるのでこれを増やす感じ

## 結論

- ユースケースも各章にdescriptionを追加
- 次のページにそれぞれ目次ライクな表示を追加
- [jsprimer.net/use-case/](https://jsprimer.net/use-case/)
- [jsprimer.net/use-case/ajaxapp](https://jsprimer.net/use-case/ajaxapp/)
- [jsprimer.net/use-case/nodecli](https://jsprimer.net/use-case/nodecli/)
- [jsprimer.net/use-case/todoapp](https://jsprimer.net/use-case/todoapp/)
- => [ユースケースに目次とdescriptionを追加する · Issue #676 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/676)

-----

## 参考リンク集

- laco: 何するかわからない
    - [次に何をするか: 参考リンク集 · Issue #510 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/510 "次に何をするか: 参考リンク集 · Issue #510 · asciidwango/js-primer")
    - [[wip] 参考リンク集 by lacolaco · Pull Request #659 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/659 "[wip] 参考リンク集 by lacolaco · Pull Request #659 · asciidwango/js-primer")
- laco: issue見てると最初はESLintを入れたいね的な話だった、その後プラットフォーム的な話になってる
- azu: プラットフォーム的な話はRustの本読んで、その後が選択肢がないという経験から
- laco: もっと絞りたい
- laco: NodeとかElectronは必須だとして
- azu: エコシステム的な話に絞るとか
- azu: エコシステムと公開プラットフォーム? 開発プラットフォーム的な感じ
    - 開発エコシステム
    - 実行プラットフォーム
- azu: Lintと整形?
- laco: `チーム開発を助けるツール`
- laco: `パフォーマンスを改善する`
- laco: `コードエディタ`
- azu: あとは?（ https://risingstars.js.org/2018/en/ を見ながら）
- azu: 静的サイト生成ツール?
- laco: それはいらなそう
- azu: 次はプラットフォーム系
- laco: Node.jsとかFirebase
- azu: HTMLを公開するサービス?
- azu: 自分が作ったサイトを公開するためのサービスみたいな感じか
- azu: gh-pages, netlify, ...
- laco: Node.jsだとheroku, nowとか

## 結論

- laco: 書く

----

## 文章のライセンス

- kahei: 文章の追加的なものってPRありました?
- azu: いまのところなくて、基本は修正とか訂正
- azu: 一応　https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING.md#pull-request にも努力的な寄付的な話はかいてある
- azu: CLA的なものをちゃんと入れた方がいいかな
- kahei: 追加がなければ今の所大丈夫かな



----

## 次回

2019年3月25日（月）