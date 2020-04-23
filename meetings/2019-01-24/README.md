# 2019-01-24 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

----

## ミーティングアジェンダ

- [2019-01-24 ミーティングアジェンダ · Issue #623 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/62)

----

## Prettierによる整形

- azu: HTMLだけに適応した #621 #358
- azu: 他のJavaScriptとかにもやるべきか検討する
- laco: prettierでやると改行とかが増えそう
- laco: ユースケースのjsぐらいなのかな
- azu: ユースケースってコードをコピペしてる?
- laco: 一部説明的なのはしてる
- azu: 両方やらないと崩れてしまうのが難しそう
- azu: 文字幅については? 書籍ではどうするかとかはある?
- kahei: TeXで編集する時に決まるのでなんとも

### 結論

- ユースケースのHTMLはやる
- ユースケースのJSは要検討
- => 現状維持
- 手動であてて確認するかもしれない

----

## リファクタリング進捗 - azu

- azu: 前回いっていたリファクタリング
- [x] 章の並び順を変更
    - <https://github.com/asciidwango/js-primer/issues/600>
    - [refactor(SUMMARY): 章の並び順を変更 by azu · Pull Request #603 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/603)
    - Mathが後ろに移動した
- [x] TODOが簡潔した
    - <https://github.com/asciidwango/js-primer/issues/4>
    - 自分でやってみよう的な課題を足した <https://github.com/asciidwango/js-primer/pull/620>
- [x] 関数と宣言
    - いくつかのIssueを元にリファクタリングした
    - <https://github.com/asciidwango/js-primer/pull/605>
- [x] オブジェクト -> プロトタイプとの分離
    - オブジェクトとプロトタイプオブジェクトを分離した
    - <https://github.com/asciidwango/js-primer/pull/633>
- [ ] 文字列
    - [\[WIP\] refactor(string): 文字列とUnicode by azu · Pull Request #643 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/643)
    - [文字列: 章の再構成 · Issue #598 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/598)
    - 作業中
- azu: 文字列は今ただの文字列とUnicode的な話でファイルを分けている
- azu: Unicode的な話はどうやっても面白くはなりにくい。(初心者にとって）楽しい話ではないのでスキップ出来るように分けている
    - 興味がある人は読むことを推奨的な話
- azu: このサイトに行って絵文字を入力すると、ほら文字数カウントがおかしいでしょという話ぐらいしかできない
- azu: 他の書籍を見てると文字列という章そのものが無かったりすることが多い
- azu: Rustのチュートリアルを見てたら、結構最後は投げっぱなしだった
- azu: 飛ばしても大丈夫なように章として分けてみる。オブジェクト <-> プロトタイプのような関係
    - 文字列
    - 複雑な文字列? 
- azu: 良いタイトルが浮かばない...
- azu: 複雑な文字列の方はユースケースでは使ってない知識の範囲なので、最悪飛ばしても大丈夫な作りにする
- azu: 実際にハマってから見ないとしっくりこない内容だと思っている

### 結論

- 文字列を "文字列" と "複雑な文字列" に分離する
- "複雑な文字列"自体は飛ばしても大丈夫な作りにする

----

## モジュール

- azu: あ、モジュールを移動しないと
- azu: ajaxでは使ってないのでTODOの前
- laco: Nodeの前?
- azu: そっちか

### 結論

- jsprimer.net/use-case/module をNode.jsの前に移動する
- [モジュールの章を移動する · Issue #644 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/644)

----

## WeakMapの例

- azu: [WeakMap の例について · Issue #627 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/627)
- azu: WeakMapの最初の例が複雑というか長い感じ
- laco: 考えたけどいい例が
- azu: WeakMapはやっぱり観測できないのが正しい気がする
- azu: 観測できているなら、それは参照してることだし
- 〜参考探し〜
- azu: [19. Maps and Sets](http://exploringjs.com/es6/ch_maps-sets.html#sec_weakmap)これはEvent
- azu: [ECMAScript 6 collections, Part 3: WeakMaps - Human Who Codes](https://humanwhocodes.com/blog/2012/11/06/ecmascript-6-collections-part-3-weakmaps/) これわかりやすそう
-　azu: でも、これ`null`代入してるから`key`がnullになってるだけだ。WeakMap関係ない
- azu: やっぱりコメントで「GCします」とかそういう説明しかできない感じがする
- laco: DOMのusecase: heightのcache のほうがシンプルに見える
- azu: WeakMapの例、privatekかDOMか
- laco: 日本語で説明、classとprivateの例、DOMのやつはいまのままで

### 結論

- 弱い参照の例は日本語を交えて簡単な例を出す
- privateのusecase: class EventEmitter
- DOMのusecase: heightのcache (いまのまま）

----

## 残りの章

- azu: 残ってるのは。。。
- 文字列、まえがき、[次に何をするか: 参考リンク集 · Issue #510 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/510)
- kahei: あとどれぐらいで揃いそう?
- azu: 1ヶ月もあれば揃うような気がする
- kahei: それが揃った編集などでレビューをする感じで

### 結論

- azu: 文字列
- azu: まえがき
- laco: 次に何をするか

----

## その他

- azu: Node.jsバージョン assignした
    - [Node.jsでHello World: Node.jsのバージョン · Issue #475 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/475)
- laco: ES2019でBigInt
- azu: 今月話をする
- azu: [agendas/01.md at master · tc39/agendas](https://github.com/tc39/agendas/blob/master/2019/01.md)
- azu: BigIntはこなさそう
- azu: くるのはメソッド系だけぐらいなので大きな違いはなさそう
- azu: あとランディングページみたいのがあるといいのかもなー
- https://webperf.guide/
- https://factquiz.chibicode.com/
- laco: 画像があれば一瞬で終わりそう
- azu: そもそも、タイトルとか決めてなかった


----

## 次回

2019年2月25日（月）
