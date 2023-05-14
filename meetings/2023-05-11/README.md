# 2023-05-11 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

----

## ミーティングアジェンダ

- [2023-05-11 ミーティングアジェンダ · asciidwango/js-primer · Discussion #1663](https://github.com/asciidwango/js-primer/discussions/1663)

----

## 最終チェック

- azu: 最終的にチェックして見つけたIssue
    - 脱字の報告 #1656
    - TodoItemView、TodoListViewのJSDocのparamについて #1657
    - Publish: npm 8 → npm 9 #1659
    - Publish: 非同期の図がモノクロだと違いがわからない #1660
- kahei: 誤字の方はTeXでは直ってたんですよね?
- azu: YES
- kahei: 他のやつはこちらで直すで大丈夫ですかね?
- azu: 大丈夫だと思います
- kahei: 図のやつは上げてもらったやつで問題ないと思います
- azu: 解像度 2xで上げてたので、3xとsvgで上げておきます。

### 結論

- @kahei: TeXを修正する、画像を反映する

## その他の修正

- azu: markedが5に上がってた
- azu: けど4のままでもいいかなーと
- azu: オプションが色々Deprecatedになったり、まだ出たばかりなのでminorで変わりそうなので
- azu: あとはファイルパスに名前に入ってるやつ
- https://github.com/asciidwango/js-primer/blob/ecd2e66c12d5aed5e843ca4326e36e3cb11fb0dd/source/use-case/nodecli/argument-parse/README.md?plain=1#LL34C5-L34C5
- laco: 確かに
- azu: まあどちらでもいいかなーと
- laco: このままでいいか

### 結論

- markedは本は4のまま
- パスはそのまま

## スケジュール

- azu: もうページができてる
- https://www.kadokawa.co.jp/product/302303004295/
- kahei: 値段が100円だけ上がってます。
    - 定価： 4,290円 （本体3,900円＋税）
    - 発売日：2023年06月09日
- kahei: 5月末ぐらいには印刷所からの見本が届くと思います
- kahei: もうページ公開されてるので、周知しても大丈夫です
- azu: まあAmazonで予約ができるようになってからかな
- kahei: Amazonの在庫切れになってるのは確認してみます
- azu: PRの流れ
- 予約ができたら、
    - メーリスで投げる
    - 記事も書く
- 発売日が来たら
    - メール
    - 記事を書く

### 結論

- 予約できるようになったら、メーリスと記事を書く

## 献本

- azu: レビューアーへの献本の宛先と流れ
- azu: メールアドレスもらって、そこに送ってもらう形でいいですかね
- kahei: 私のメールアドレスに送ってもらえれば
- azu: あとは送り方のテンプレートを作っておきます
- azu: PDFと物理が選べる形?
- kahei: epub版も作ってます
- azu: 物理の場合は住所もか
- azu: これ見本ができてからの方がいいかな
- この辺をまとめてレビューアーに送る

    フォーマット: PDF or epub or 物理本
    物理希望の人は住所も一緒に
    GitHubアカウントも一緒に送ってもらう

- azu: あとは献本依頼の方
- azu: リストをとりあえず作ってみました
- azu: 本を書いてる人とかが色々かな
- azu: 連絡先わかってない人もいるので、できるなら献本してほしいぐらいな感じです
- kahei: やっておきます

### 結論

- 見本できたら、献本

## ES2023

- azu: ES2023の対応をまとめてました
- [ECMAScript 2023の対応 · Issue #1658 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1658)
- azu: 前に言ってたように配列がほとんどになる
- azu: 非破壊と破壊的な部分とかが結構どうするか悩みどころ
- laco: コレクション系にまとめるとかがありそう
- azu: iterator helperが出たらMapとかもまとまりそうな気がする
- laco: 基本はimmutableの方優先なんですかね?
- azu: うーん、pushとかpopは使うような気はする
- azu: 両方まだ使うかな
- azu: sortとかはimmutableの方がいいけど

### 結論

- issueを作って進める

## 次回

- 次は発売日前なので、広報戦略とかその辺の話
- 6/8(木) 19:00 ~
