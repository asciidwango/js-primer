# 2023-02-16 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

----

## ミーティングアジェンダ

- [2023-02-16のミーティングアジェンダ · Discussion #1589 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/discussions/1589)

----

## 揃う前の余談

- azu: 前回の言っていたOpen Collectiveの件
- azu: 今OAuth AppのRequestをasciidwangoに送ったので承認お願いします
- kahei: Approveしました
- azu: これでOpen Collectiveにリポジトリを紐付けできる

----

## Node.js 18/npmの更新

- azu: Node.js 18.14.0がリリースされたので更新しました
- [refactor: Update to Node.js 18.14.0 and npm 9.3.1 by azu · Pull Request #1567 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/1567)
- npmにバグがあるので、もう一回ぐらいはアップデートあるかもしれないですが、npm 9.xのメジャーバージョンは同じなので、これが最終系かもしれないです

----

## 残りのタスク

- azu: レビューは2月末で一区切りにする予定です
- azu: なので三月の頭にLaTeXに差分を判定します
- azu: あとはレビューアーの追加や細かいものを一緒にやるつもりです
- azu: kaheiさんの方の作業とコンフリクトすると微妙なので、タイミングがちょっと悩ましいです
- kahei: LaTeXへの反映は、私の方でやりましょうか?
- azu: そうしますか
- kahei: 1版からの差分は結構手動マージでやっているので
- azu: あとはレビューアーの名前をちゃんと集めないと
- 雑談
- kahei: MarkdownからLaTexに落とすのをもっと機械的にできるといいんですけどねー
- kahei: Markdownの構文に揺れがあったり、スペースの有無だったり
- azu: Markdown to Markdownの正規化はやろうと思えばできますね。markdownlintでルール入れるとかも

### 結論

- azu: レビューアーへの謝辞を追加する
  - [第二版のレビューアーを追加する · Issue #1590 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1590)
- kahei: レビューの差分を反映する
  - [書籍版へ差分を反映 · Issue #1591 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1591)

----

## 書籍のPDFのレビュー

- azu: 書籍に反映して、最終的なレビューはいつぐらいからですかね?
- kahei: 3月の頭に反映作業して、今の差分だと1-2日ぐらいでできると思います。
- kahei: なので次の週ぐらいにはPDFができると思うので、そこから一週間ぐらいレビューですかね?
- azu: そうですね。
- kahei: 手動マージしてるので、漏れとか残りが混ざってる可能性があるので、それをチェックする
- azu: さらっと見るには数時間だけど真面目に読むと数日はかかるので、大きな抜け漏れのチェックですかね
- kahei: チェックが終わってから、大体2-3ヶ月ぐらいで出版ですかね

### 結論

- azu, laco: 3/6(月)にPDFをもらって、13日までレビューする

----

## ES2023

- azu: ES2023は6月末に出るので、これが終わったら対応しないといけない
- [proposals/finished-proposals.md at main · tc39/proposals · GitHub](https://github.com/tc39/proposals/blob/main/finished-proposals.md)
- azu: 配列が大きく変わりそう
- laco: 非破壊的な配列のメソッドが追加される
- [tc39/proposal-change-array-by-copy: Provides additional methods on Array.prototype and TypedArray.prototype to enable changes on the array by returning a new copy of it with the change.](https://github.com/tc39/proposal-change-array-by-copy)
- azu: あとはES2024でIterator Helperもあるので配列の章は大きく書き換える必要がありそう
- laco: あとはHashbag?
- [tc39/proposal-hashbang: #! for JS](https://github.com/tc39/proposal-hashbang)
- azu: ほぼ関係ないじゃない?
- azu: あ、コメント記法として `#!` が増えるのか
- azu: 今3種類と書いてる気がするので、ここを変更する必要があるかも

## 次回

- 2023/03/13(月) 19:00