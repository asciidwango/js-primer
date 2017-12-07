# 2017-01-20 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@vvakame](https://github.com/vvakame)
- [@lacolaco](https://github.com/lacolaco)

@ 会議室

## アジェンダ

- [2017-01-20 ミーティングアジェンダ · Issue #178 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/178 "2017-01-20 ミーティングアジェンダ · Issue #178 · asciidwango/js-primer")

-----

## テンプレートリテラルの表記

- @azu: テンプレートリテラル普段は英語で`Template literal`とか書く
- けど日本語に合わせたほうが良さそう?
- でも、日本語で書いてなかった理由としては`Tagged Template Literal`の訳語が存在しない
- タグ付きテンプレートリテラルをみたことあるぐらい
- @vvakame: タグ付けテンプレートリテラル?
- @azu
- "タグ付けテンプレートリテラル": 1件
- "タグ付きテンプレートリテラル": 17件
- どっちもどっち
- @laco, @kahei: 初回のみ英語を併記するとか
- タグ付けテンプレートリテラル（Tagged Template literal)とする
- @kahei: 何度も頻出するならどうにかした方がいいけど、そこまでは多くない?
- @azu: 3箇所ぐらい

### 結論

- 初回のみ正式名称を併記する
- タグ付けテンプレートリテラル（Tagged Template literal)とする

-------

## ES2017について

- @azu: `**`や`Object.values`などLTSだとまだ動かない
- [[ES2016] Node.js LTS(v6)だと動かないコードがある点について · Issue #174 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/174 "[ES2016] Node.js LTS(v6)だと動かないコードがある点について · Issue #174 · asciidwango/js-primer")
- 今日発売の[O'Reilly Japan - 初めてのJavaScript 第3版](https://www.oreilly.co.jp/books/9784873117836/ "O&#39;Reilly Japan - 初めてのJavaScript 第3版")は付録でES2017を扱っている
- ES2017についてはどうする?
- @vvakame: async/awaitは現実的に使いたそう
- Promiseは現実のプロジェクトだと避けることができないものだと思う
- @azu: Promiseの後にasync/awaitを置くか、付録のようにするか
- async/awaitはPromiseには依存するけど、そこまでベッタリではない
- 一応分けて書くことはできるはず


### 結論

- ES2016, 2017の追加要素はそこまで密結合ではないので、分けて書いてみる
- 一応書く方向で

-----

## コマンドラインのシンタックスハイライト

- @laco: シェルコマンド部分の記述について
- シンタックス指定: bash? shell-session? どうするか
- 意味的にはshell-sessionが正しいけど今のgitbookの環境ではハイライトが効いてないっぽい
- `bash` だとシェルスクリプトとなってちょっと違う感じ…
- [highlight.js demo](https://highlightjs.org/static/demo/ "highlight.js demo")にBashしかない…

### 結論
 
- とりあえず `shell-session`
- ひつようなら一括置換しやすい

-----

## npmについての解説のレベル 

- @laco: npmまわりどこまで解説するか
- 詳しく全部は解説したくない
- @azu: ミスったときに復帰できるような対策がされているのが良さそう
- `require("hoge")`してモジュールが読み込まれてないエラーが出たときにどうするかとか
- インストールがされてるのかを確認する方法とか
- @vvakame: それぞれのステップコードに参照できるサンプルコードを置くとか?
- 変更があったときの管理コストが高いけど
- @laco: 以下の点を追加する
- うまくいかなかったらnode_modulesを消してインストールからやり直してください
- requireするモジュール名が間違ってたとき(not found)のエラーを例示
- @azu: npmでインストールするモジュールはバージョン指定した方が良さそう?
- `npm i commandar@2` のような感じで
- 既に`npm i npm@latest`してるのか
- `npm`はNode.js LTSの同梱で良くないかな?
- @laco: npmだけ変数になってしまってるのよくないかも
- `npm i npm@lates`は一回外す
- バージョンは x.y.z の方が見慣れてそう
- `npm i commander@2.9 --save`とかにした方がよさそう
- インストールについてはもう少し追記があったほうがよさそう

### 結論

- `require("hoge")`してモジュールが読み込まれてないエラーが出たときにどうするかとか
- インストールがされてるのかを確認する方法とか
- `npm i npm@latest`は省略。LTSのバンドルされてるものを使う
- バージョン指定でインストール

----

## コマンドライン引数に呼び方について

```console
$ node main.js --verbose --output ./dist src/foo.js src/bar.js

--verbose // オプション
--output ./dist // オプション
src/foo.js src/bar.js // 引数？
```

- @laco: 値を取らないコマンドラインの引数の名前?
- フラグ、オプション?
- @azu: boolean flagとか見た感じする
- @vvakame: 普通にオプションでいいのでは
- @laco: オプションで
- @laco: `src/foo.js` のようなコマンドが受け取る引数部分のことは?(オプションではない部分)
- @vvakame: 引数?
- @azu: 入力?
- @laco: 引数で

### 結論

```console
$ node main.js --verbose --output ./dist src/foo.js src/bar.js

--verbose // 値を取らないオプション
--output ./dist // 値を取るオプション
src/foo.js // 引数
src/bar.js // 引数
```

-----


## レシーバーについて

- @azu:  `target`ってなんてよべば

```js
target.method()
^^^^^^
これの名前
```

- @azu: `this`とかの文脈で出て来る
- @vvakame: TS本だとインスタンスって呼んでた
- @kahei: インスタンス。うーん
- @azu: 仕様だと一応レシーバーって書いてあった
- けど一般的かというと微妙そう
- どこかでレシーバーとは?という解説必要そう
- @vvakame: レシーバーともいれなくないかなと思えてきた

### 結論

- とりあえずレシーバーで

-----

次回: 2月24日

