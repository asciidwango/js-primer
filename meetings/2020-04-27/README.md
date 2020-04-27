# 2020-04-27 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

----

## ミーティングアジェンダ

[2020-04-27のミーティングアジェンダ · Issue #1154 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1154)

----

## 出版

出版した :tada:

[JavaScript Primerを出版しました！/JavaScript Primerはなぜ書かれたのか？ | Web Scratch](https://efcl.info/2020/04/27/jsprimer/)

## 電子版

- kahei: 電子版について
- azu: ブログとかサイトからリンクをしたいので、発売開始されたら知りたい
- kahei: 達人出版会には既に渡してあるので、今週中ぐらいにはPDF版は買えるようになるかなー
- kahei: epub/kindleはちょっとまだ分からない

### 結論

- azu: 電子版が買えるようになったらサイトからリンクを貼る
- [JavaScript Primer 発売開始 · Issue #1152 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1152)

## `publish1` ブランチ

- azu: `publish1` ブランチはそのまま残すでいいですよね?
- azu: 誤字の修正とかがあったらこれをベースに直す?
- kahei: そうですね。
- azu: あと v1との正誤表差分を管理するようなブランチっていりますかね?
- azu: masterはそのまま開発しちゃいたいです
- azu: PDFとかの修正はpublish1にするとして
- kahei: publish1の方があれば、特にv1ブランチみたいなものはいらないですね

### 結論

- publish1は残す
- v1ブランチみたいのは不要

## 今後のリリース

- kahei: 今後も変更していくんですよね?
- azu: ES2020の対応 #1145 と marked 1.0.0 #1155 はとりあえずやるかなー
- azu: markedは一昨日ぐらいに1.0になったので、きりが良いし
- laco: そのv1との差分を知りたいという人にはどう対応する?
- azu: 今一応タグは貼ってあります
- https://github.com/asciidwango/js-primer/releases
- azu: masterはそのまま追加していく
- azu: Promise本のときはGitHubのReleaseにリリースノートを書いていた
- azu: 基本的にPRベースだったので、PRのリンクを一覧する感じ
- laco: リリースノートにminorの変更があればよさそう
- azu: じゃあそれで
- azu: あとメール登録してる人には重要な変更は通知するよって書いてあります。
- kahei: 2-3年後ぐらいに書籍もアップデートできるといいですね。

### 結論

- 今後のminorな変更はGitHub Releaseにタグを付けて変更履歴を書く


## 次回

- 必要に応じて連絡する