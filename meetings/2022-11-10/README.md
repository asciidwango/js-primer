# 2022-11-10 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

----

## ミーティングアジェンダ

- [2022年11月10日のミーティングアジェンダ · Discussion #1495 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/discussions/1495)

----

## 前回からの変更

- azu: 前回のやつ
  - @azu:
      - [x] [`letではなくconstで反復処理をする` のタイトルと内容の組み合わせは意図的なものでしょうか · Issue #1288 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1288)
      - [x] [ECMAScript: ECMA262のURL変更 · Issue #1479 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1479)
      - [x] [Array#sliceの説明について · Issue #1163 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1163)
  - @lacolaco :
      - [x] [falsyな値の一覧の不足 · Issue #1378 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1378)
- azu: だいたいできた
- azu: あとはリンク切れがあった
- azu: 429が多いけど、MDN系 #1497 がちょこちょこ
  - https://github.com/asciidwango/js-primer/security/code-scanning
- azu: あと一つだけなので修正する

## Node.js 18 LTSへの更新

- azu: Node.js 18に更新した
  - [Node.js 18 LTSに更新する · Issue #1437 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1437)
- azu: ただし1月18日水曜日 に npm 9がNode 18にバックポートされる予定というのが困ってる
  - [npm v9.0.0 released | GitHub Changelog](https://github.blog/changelog/2022-10-24-npm-v9-0-0-released/)
- kahei: ギリギリ
- azu: ほんとに互換性あってbackportできるのかが謎
- azu: 互換性あるなら `npm -v` してるところの一箇所だけ変更するイメージ

----

## Date

- azu: Dateを変更してて、ECMA-402とTemporalに触れるべきかどうか
- azu: ライブラリ前提ではあるけど、代わりそうな気配もある
- azu: ただ他ではこういうProposalは触れてないのでバランスが悪い
- laco: 触れなくていいかなーと
- azu: MDNのDateのページは最初からメモでTemporal参照してるのか
  - https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date
- laco: ECMA402は触れてないのか
- laco: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString で触れてるのか
- azu: ECMAScriptの仕様から402を参照する形だったからかも
- azu: ライブラリ使うのはまだ変わらないので、触れないでいいか
- laco: OK

### 結論

- 追加しない

---

## ajaxのURL

- azu: ajaxのページのエディタとURLを足した
- https://github.com/asciidwango/js-primer/pull/1423
- azu: URLが書籍に入ってる `https://jsprimer.net/use-case/ajaxapp/promise/src/`
- azu: これを変えるなら今なので、どうかな?
- laco: TODOの方はsrc入ってないんでしたっけ?
- azu: ディレクトリの下にindex.htmlがあるので
- laco: src/ なしに変更します

### 結論

- @laco ajaxのURLをsrc/なしに変更する
- https://github.com/asciidwango/js-primer/issues/1532

---

## 1版からの差分

- azu: 読んでて1版からの差分があった方が良さそうと思った
- [第1版からの差分をまとめる · Issue #1528 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1528)
- azu: 文章だと長いので箇条書きでいいかな?
- kahei: 読者もあった方がわかりやすいと思います
- azu: ウェブ版と書籍版でちょっと差分が違う
- azu: ウェブ版はリリースノートかあん
- azu: 書籍は箇条書きで
- azu: どこに入れるのが適当?
- kahei: はじめにとか
- laco: はじめにに最後の方に

### 結論

- @azu: https://jsprimer.net/intro/ にセクションを追加する
- [第1版からの差分をまとめる · Issue #1528 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1528)

---

## その他

- azu: 付録考えてたけどTypeScriptぐらいしかおもつかなかった
- azu: TypeScriptは避けられない感じなので、
- laco: どういう感じで書くんです?
- laco: サンプルコードとかをちょっと紹介するとか
- azu: うーん
- kahei: 付録は必須ではないので

## コードフリーズ

- kahei: コードフリーズはいつぐらいからで大丈夫ですか?
- azu: もう誤字脱字ぐらい。ちょっとTodoはいじりたいかもしれない
- azu: 12月の最初にフリーズで大丈夫ですか?
- kahei: 大丈夫
- kahei: 11月末まで作業して12月から書籍の作業に入る感じで
- azu, laco: OK

----


## 次回

- 2022年12月8日(木) 19:00
