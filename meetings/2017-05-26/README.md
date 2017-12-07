# 2017-05-26 Meeting Notes
             
- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)
             
## アジェンダ

- [2017-05-26 ミーティングアジェンダ · Issue #233 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/233 "2017-05-26 ミーティングアジェンダ · Issue #233 · asciidwango/js-primer")

## [String](https://github.com/asciidwango/js-primer/issues/121 "String · Issue #121 · asciidwango/js-primer")

- @azu: [String · Issue #121 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/121 "String · Issue #121 · asciidwango/js-primer")
- ひとまず書き終わり
- 後は用語の整理とかをすれば完了
- [String: 構造的文字列 -> ??? · Issue #228 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/228 "String: 構造的文字列 -&gt; ??? · Issue #228 · asciidwango/js-primer")が悩ましい

### 結論

- ただの報告なので特に無し

----

## タグ付きテンプレートリテラルの書き方の統一

- @azu: Stringの章ではreduceを使ってタグ関数を書いた
- ユースケースではmapを使って書いてる
- 書き方を統一したい
- [String + ajaxapp: tagged template literalの書き方を揃える · Issue #214 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/214 "String + ajaxapp: tagged template literalの書き方を揃える · Issue #214 · asciidwango/js-primer")
- @laco: OK

### 結論

- [String + ajaxapp: tagged template literalの書き方を揃える · Issue #214 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/214 "String + ajaxapp: tagged template literalの書き方を揃える · Issue #214 · asciidwango/js-primer")でユースケースと基本文法で書き方を揃える

-----

## GitBook.com の連携が切れてる件

- @azu: 以前gitbook.comと連携してた
- PRに対して自動でプレビューを作ってくれてた
- 今は動いてない
- 仕組みがorganizationに紐付いてしまっているため
- asciidwangoのorganizationをgitbookに作る必要がある
- ちょっと権限がないので保留

### 保留

- 連携なしのまま保留

-----

## [Node.jsのCLIアプリ #7](https://github.com/asciidwango/js-primer/issues/7 "Node.jsのCLIアプリ #7")

- @laco: Node.js CLIがひとまつ完了
- @azu: まとめ的なのはないの?
- 結構唐突に終わってる感じがする
- @laco: [nodecli: 終わりました感 のあるまとめ · Issue #235 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/235 "nodecli: 終わりました感 のあるまとめ · Issue #235 · asciidwango/js-primer")
- @azu: あとはユニットテストの意義的な説明がないかも
- いきなり当然のようにユニットテストでてきてるので、なぜするのかが薄い感じがする
- リファクタリングがしやすくなるとか
- Node.jsはブラウザよりははるかにしやすいので、積極的にテストして欲しい
- @kahei: 今の章ってテストフレームワークは何かつかってます?
- @laco: mochaとbuilt-inのassertのみ
- @azu: 日本だとよく見る組み合わせ
- 海外だとjasmineとかjestとかAVAも多い
- @laco: jestもjasmine forkしたり

### 結論

- [nodecli: 終わりました感 のあるまとめ · Issue #235 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/235 "nodecli: 終わりました感 のあるまとめ · Issue #235 · asciidwango/js-primer")
- [nodecli: ユニットテストの意義について追記 · Issue #236 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/236 "nodecli: ユニットテストの意義について追記 · Issue #236 · asciidwango/js-primer")
- @laco: それぞれを簡単に追加する

----

## 用語の根拠説明

- @azu: 主にこの本を書く人向けに用語の根拠を記録しておきたい
- なぜこの用語なのかということをメモっておきたい
- とりあえずは[[meta] 用語集 · Issue #231 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/231 "[meta] 用語集 · Issue #231 · asciidwango/js-primer")に書いてる


> JavaScriptの文脈で「クラスを作って、そのインスタンスを作る。」とかいう人までいますし。
> [JavaScript - プロトタイプベースのオブジェクト指向言語が広く使われていない理由は?(77753)｜teratail](https://teratail.com/questions/77753 "JavaScript - プロトタイプベースのオブジェクト指向言語が広く使われていない理由は?(77753)｜teratail")

- というのはJavaScriptの仕様的にも間違っているとは言えない
- 「クラスはコンストラクタ関数を定義するためのシンタックスである」なので
- クラスでコンストラクタ関数を作り、それをnewしてインスタンス化することは正しい。
- これを略すると「クラスを作って、そのインスタンスを作る」になってしまう
- こういうJavaScript的にブレやすい用語は文章としても説明/注釈が必要かもしれない
- @laco: 特にクラスは…
- @azu: クラスはなんとも言いにくい感じなので、この本ではこういうことって書いたほうが良さそう
- @laco: オブジェクトの章?
- @azu: オブジェクトの章でインスタンス化の話、関数/クラスでクラスの話になる気がする
- @kahei: そうなるのが自然そう
- @azu: 定義が曖昧だとなんか文句言われそう
- @kahei: 仕様的に嘘でないことが説明できれば…
- @azu: 嘘をつかずにJavaScriptを簡単に説明するのは難しそう…
- @kahei: 一冊読んで嘘じゃないことが分かるような説明になっていれば良さそう

### 結論

- とりあえずの用語は[[meta] 用語集 · Issue #231 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/231 "[meta] 用語集 · Issue #231 · asciidwango/js-primer")に書いていく
- prhからリンク貼れる
- 一冊読んで嘘じゃないことが分かるような作りにする

----

## npm v5

- @azu: npm 5がプレリリース
- [Release v5.0.0 · npm/npm](https://github.com/npm/npm/releases/tag/v5.0.0 "Release v5.0.0 · npm/npm")
- @azu: `--save`がデフォルト化した
- @laco: 説明の変更が必要になりそう?
- @azu: `--save`はそのまま使えるのでそのままでも良さそう
- @laco: 嘘になってないなら大丈夫そう
- Node.js v8は何か入る?
- @azu: async/await、Object.values/Object.entries
- [ECMAScript 2017 (ES8): the final feature set](http://2ality.com/2016/02/ecmascript-2017.html "ECMAScript 2017 (ES8): the final feature set")
- @laco: asyncの説明する?
- @azu: 恐らくPromiseとこで
- [Promise · Issue #94 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/94 "Promise · Issue #94 · asciidwango/js-primer")
- @laco: function trailing commaも入る
- 関数は,で区切るという話してる?
- @azu: して無さそう
- @azu: カンマで区切らない言語もあるので一応書いておこ
- [関数と宣言: カンマで引数を区切る · Issue #239 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/239 "関数と宣言: カンマで引数を区切る · Issue #239 · asciidwango/js-primer")

### 結論

- npmに関して変更は特にいらなそう
- [関数と宣言: カンマで引数を区切る · Issue #239 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/239 "関数と宣言: カンマで引数を区切る · Issue #239 · asciidwango/js-primer")の修正をする

----

## ES Modules

- @azu: ES Modulesはブラウザでは動くようになってる
- Node.jsではまだ先だけど、
- なので、Modulesの説明にブラウザが使えるかも?
- [Can I use... Support tables for HTML5, CSS3, etc](http://caniuse.com/#feat=es6-module "Can I use... Support tables for HTML5, CSS3, etc")
- safariはstable
- FirefoxとChromeとEdgeはフラグ付き
- 一応、本のターゲットはFirefoxだけどターゲット変えても良さそうではある
- @laco: TODOのアプリもmodulesで書ける
- @azu: たしかに
- Babelの説明不要になるし、ES Moduleをネイティブに使うのが良さそう
- 補足としてBabelなどのツールがあるよという話になる

### 結論

- Modulesをブラウザで説明するかも
- TODOのユースケースをネイティブのmoduleで書くの良さそう

----

## 次のタスク - @laco

- @azu: 次 @laco はどれを書く
- @laco: Promise?
- Promiseはなんかコンテキストがありそう
- [Promise · Issue #94 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/94 "Promise · Issue #94 · asciidwango/js-primer")
- エラーハンドリング -> Promise
- @azu: try-catchは多分普通の説明するだけだと思う
- @laco: 他だと Map/WeakMap Set/WeakSet?
- Map/WeakMap Set/WeakSetはどういうまとまり?
- @azu: データ構造?
- WeakSetとかは使い道はほぼ一つ
- MapとSetはセットな気がする
- [Map/Set · Issue #148 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/148 "Map/Set · Issue #148 · asciidwango/js-primer")
- @laco: [Map/Setの章 · Issue #238 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/238 "Map/Setの章 · Issue #238 · asciidwango/js-primer")
- @laco: ビルトインオブジェクト系から攻めていきたい
- 他のだとJSON
- @azu: JSONは「JSONとは、JSONのパース、JSONのシリアライズについて」みたいなことかな
- @laco: application/jsonとかも
- 仕様はIETF?
- @azu: ECMA 404の方。これ構文のみだから微妙だけど
- https://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf

### 結論

- @laco: 次はここをやっていく
- [Map/Setの章 · Issue #238 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/238 "Map/Setの章 · Issue #238 · asciidwango/js-primer")をやる
- [JSONの章 · Issue #237 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/237 "JSONの章 · Issue #237 · asciidwango/js-primer")
----

## ページ数

- @kahei: 今のページ数ってどれぐらい?
- @azu: あとで出してみる
- GitBookでPDF化すれば適当な値がでそう

### 計測結果

- 現在 192 ページある

----

## 次回

7/21（金） 
