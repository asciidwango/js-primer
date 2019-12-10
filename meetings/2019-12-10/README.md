# 2019-12-10 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

----

## ミーティングアジェンダ

- [2019-12-10 ミーティングアジェンダ · Issue #1008 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1008)

----

## スケジュール

- @kahei: とりあえず3月中旬に出すのを目標に
- 2019年12月に内容を一通り修正
- 2020年1月にレイアウトを入れて
- 2020年3月ぐらいに本として出せるようなイメージで

----

## 用語統一

- @kahei: Mecabで単語を取り出して揺れている部分を取り出してみました
- 〜 紙の用語を見ながら 〜
- 〜 漢字の統一、開きなどを統一する用語を選んで
- @kahei: ここで統一した用語はあとでIssueにあげますね
- @azu: prhがJSのコメントに対応してないケースが多かった
- @azu: textlint-rule-prhで対応が必要そう
- @laco: prhで自動修正を先にやったほうがいい?
- @azu: そこはどっちでも
- @azu: ダブルチェック的な意味にprhをしたいならあとでも先でもいい

### 結論

- @kahei 選択した用語に統一していく
- @azu textlint-rule-prhでコメントの対応をする
- 修正する際にはprh.ymlなどの辞書も要修正

----

## 用語統一 2

- @kahei: この用語の揺れをどう反映するのがいいですか?
- @kahei: 直接コミットするかPull Requestするか?
- @azu: Pull Requestして @kahei さんがマージしちゃうのが良さそう
- @azu: Pull Requestの方が履歴も残るので
- @azu: あとは事後的にそのPRをみてコメントを書いていく感じで、
- @azu: 何かあったらIssueを切るほうがいいですかね?
- @kahei: うーん
- @azu: Issueになるかはコメント見てからじゃないとわからないか
- @azu: 次のような流れでよさそう

    @kahei PRで修正を投げる
    @azu @lacolaco PRのコメントで意見とかを書く
    全員: 問題になりそうだったらIssueにする

### 結論

- 修正の流れは PR -> コメント -> Issue
- PRは勝手にマージしていい

----

## 図

- @azu: あとは雑な図とかテーブルがいくつかある
- @azu: https://jsprimer.net/basic/implicit-coercion/#implicit-coercion-of-equal-operator ここの図とか
- @azu: これは最悪消してもいい。この組み合わせを覚えるのは無理でしょという図(スクショ)なので
- @kahei: ならレイアウトの段階でどうにかなりますね
- @azu: https://jsprimer.net/basic/function-this/#conclusion あとこういうテーブルは入る?
- @kahei: これぐらいなら入りますね
- @azu: Tableは読まなくていいやつなのでできるだけ入れないようにしてた

----

## ES2020

- @azu: ES2020は結構変更はありそう
- @azu: そういえばOreillyのサイ本の7thが書かれてる
- https://learning.oreilly.com/library/view/javascript-the-definitive/9781491952016/
- @azu: まだ半分もいってなささおう
- @azu: ES2020は https://github.com/tc39/proposals/blob/master/finished-proposals.md 結構jsprimerにも影響がある変更がありそう
- @azu: Optional ChainとかBigIntとか
- @azu: BigIntはリテラルなので追加するけど、詳細はMathとかがないので入れないかも
- @azu: まあこの辺は別途Issueをキリます。
- @azu: 最初の出版ではFirefoxとES2019までなので対象外

----

## その他

- @laco: Node.jsとかはRマーク（®）がいる?
- @kahei: そういうのは最初に断っておけば、本文中には不要な認識です。
- @kahei: 今までそれで問題になったことはないので



----

## 次回

2020年1月16日（木）
