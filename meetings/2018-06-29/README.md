# 2018-06-29 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

## アジェンダ

- [2018-06-29: ミーティングアジェンダ · Issue #492 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/492)

----

## エディタ/実行環境 - azu

- @azu: usecaseではディレクトリとかの概念がでてくる
- しかしエディタとかの説明を一切してない
- なので、ファイルのディレクトリ構造とかそういう話するときに困るのでは?
- あと推奨エディタないと、初めてJavaScript触る人はそこで戸惑ったりしそう
- [かんたん Ruby](http://gihyo.jp/book/2018/978-4-7741-9861-3)ではVSCodeを紹介していた
- エディタは本文では必須ではないはず
- ソフトウェア的にはブラウザだけでいい
- @kahei: エディタはコラム的なのでもいいのでは
- @azu: あと実行環境の方も迷ってる
- <https://github.com/asciidwango/js-primer/issues/85#issuecomment-399644697>
- Firefoxのスクラッチパッドはコンソールの結果が一緒にでてこない
- なので微妙な使いにくさがある
- 他
    - コンソールを使う
    - Node.jsを使う
    - [CodeSandbox](https://codesandbox.io/) のようなものを使う
    - js-primerのサイト上にREPLを用意する
- @laco: Node.jsのREPLは微妙そう
- @azu: コンソールも重複の`const`宣言が不安要素
- 無意味なストレスがある感じになりそう
- CodeSandboxは便利だけど、いつのまにか変わっていそう
- @laco: index.htmlを書いて`<script>`で実行する方式とか?
- @azu: なるほど
- 他の本でも結構それが多そうだった
- [JavaScript入門 (全24回) - プログラミングならドットインストール](https://dotinstall.com/lessons/basic_javascript_v2)もそうだった
- 他のやり方の紹介は?
- 後エディタもそこでコラム的に紹介するのがいいかな?
- ~エディタ比較~
- @azu: サイト自体が日本語になるのは[Brackets](http://brackets.io/)ぐらいなのか
- VScodeはインストールすればロケールが日本語になる
- まあVSCodeでよさそう
- @azu: index.htmlだと`file:///`で実行することになる
- まあ、moduleとかajaxになるまでは大丈夫
- @laco: 2章の最初でローカルサーバの話をする

### 結論

- [read-eval-print: コンソールの開き方について · Issue #85 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/85)で次の内容を書く
    - index.html + コンソール 
        - index.htmlにscriptタグを書いて、コンソール実行。リロード方式
        - script のtypeなしで書く 
    - エディタ
        - [Visual Studio Code](https://code.visualstudio.com/ "Visual Studio Code - Code Editing. Redefined")
    - その他のリンク?
      - CodeSandboxとか設定方法へのリンクをまとめたもの?

----

## Todoアプリ - azu

- @azu: Todoアプリは一通りかけた
- 後はローカルサーバのところをどうするか
- [ `npx @js-primer/local-server` #462 ](https://github.com/asciidwango/js-primer/issues/462)の紹介自体は2章の最初で行うであってる?
- Todoアプリ側はその章を参照するという形
- @laco: それであってそう
- ajaxもそこの章を参照する

### 結論

- [ `npx @js-primer/local-server` #462 ](https://github.com/asciidwango/js-primer/issues/462)でのローカルサーバについては[ 2章の序章: 環境ごとのオブジェクト #267 ](https://github.com/asciidwango/js-primer/issues/267)に書く
- Todoアプリとajaxはこの章を参照する(ローカルサーバの立て方や意味について)

----

## イベントの用語統一 - azu


- @azu: 前回の[2018-05-17: ミーティング](https://github.com/asciidwango/js-primer/issues/454)でイベント用語の統一案をだした。
- 実際にやってみた。
- [refactor: イベントの用語の整理 by azu · Pull Request #488 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/488)
- イベントハンドラとイベントリスナーの用語の問題がでてきた
- 感覚的には使い分けるけど、意味の違いは区別しないよという話をしたい
- @laco: 最初にイベントリスナーの説明をしてるのはどこだっけ
- @azu: https://jsprimer.net/basic/map-and-set/#weakmap で登場してる
- ここで、イベントリスナーとイベントハンドラの使い分けの区別はしないことについて言及?
- @laco: それとイベントリスナーに統一した方がいいかな
- Javaでは[What's the difference between Event Listeners & Handlers in Java? - Stack Overflow](https://stackoverflow.com/questions/4725241/whats-the-difference-between-event-listeners-handlers-in-java)という区別らしい- 1:n(リスナー)、1:1（ハンドラー）とのこと
- @azu: イベントリスナーを呼び出す vs. イベントハンドラーを呼び出す
- リスナーを呼び出すとはあんまり言いたくない感じがする
- なんか感覚で使い分けている気がする。統一されていればいいかな

### 結論

- assign: @azu
- [用語: イベントを~する · Issue #455 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/455)
- イベントハンドラは イベントリスナーに 統一する  #488
- イベントリスナーは イベントハンドラーともよばれることがありますが、この書籍では区別しませんと入れる
- prh統一する辞書を入れる

-----

## 非同期処理 - azu

- @azu: 非同期処理（旧Promise） #503を書いている
- Promiseだったけど、非同期処理自体の説明しないとだめじゃんと思って直した
- 今はエラーファーストコールバックについて書いてる

### 結論

- 非同期処理を完成させる

-----

## moduleの進捗 #329 #505 - laco

- @laco: モジュールを書いてる
- [ WIP feat(usecase): モジュール #505 ](https://github.com/asciidwango/js-primer/pull/505)
-  構文は大体できて、ファイルシステムとかbundlerとかの話をどうするかが悩む
- 構文だけなら基本文法の方に移すべき?
- @azu: でも先に文法だけだと動かし確認があったほうがよさそう
- 構文だけだと何もできない
- モジュールバンドラーはコラム行きでよさおう
- @azu: 実際に動かせないとやっぱりつらそう
- @laco: こうかな
    - モジュールとは
    - ES Module構文説明
    - ES Module動かし方 script type module
    - CommonJS
    - コラム: バンドラー
- @azu: CommonJSについて扱ってるはCLIだけ?
- [Porting from CommonJS](http://jsmodules.io/cjs.html)
- うーん、ES module -> CommonJSってあんまりないんだな
- 大体逆になっている
- @laco: Node.jsとCommonJSは nodecliで使う範囲の最小限に留めるでよさそう
- @azu: 動かし方はそこで説明するなら
- 最初の index.html [read-eval-print: コンソールの開き方について · Issue #85 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/85) は `type=module` なしでいい?
- @laco: よさそう

### 結論

- 担当: @laco
- moudleは2部の章になる
    - モジュールとは
    - ES Module構文説明
    - ES Module動かし方 script type module
    - CommonJS
    - コラム: バンドラー

----

## 実際の開発とツール 

- @azu: 今どきのアプリを書く上で必要なことで、この書籍で触れてる/触れてない項目をまとめた
- [x] Transpiler #367 
  - [x] TypeScript/Flow 型?
- [x] Bundler #505 
- [ ] 開発者ツールでのデバッグ
  - パフォーマンス系?
- [x] フレームワークの存在
- [ ] クロスブラウザ対応/違い
- [ ] Lint/コーディングルール系 #142
- 全部はいらないんだけど、実際に開発するにはこういうものが必要かもねって触れ方をしたい
- @laco: eslintとか、開発を助けるツールについての付録にするとか
- 付録って実際に付録?
- @kahei: いや書籍の最後に同じように書くだけ
- @laco: メンテコストはありそう
- @azu: 紹介するページへのURLを最後に書くとか
- 書く場所的にほんとに最後の最後
- 次に何を読めばいいかという。
     - リンク集的なものをウェブに作って、本からはリンクを貼るみたいな感じにする
- そういう案内がある方がいいかなと思った
- あとはBad Partsもなんか似てるな
- @laco: バッドパーツ、今は`arguments`と即時実行関数だけ
- あんまり盛り上がらなかった
- 統合するのが良さそう
- @azu: 今のバッドパーツは各章のコラムに移動させる
- [Bad Partsの章 · Issue #142 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/142)はなくす

### 結論


- 次に何をするべきかというリンク集を作る
- [ 次に何をするか: 参考リンク集 #510 ](https://github.com/asciidwango/js-primer/issues/510)
- [Bad Partsの章 · Issue #142 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/142)はやめて、各章のコラムに移動させる

----

## 章/セクションタイトル

- @azu: ユースケースのタイトル周りが不安定
- 名詞だったり〜するだったり
- 目次を見て読むのを決める人が多そうだから〜するけい具体的にしたい
- @laco: よさそう

### 結論

- 章/セクションの目次に乗るタイトルを整理する
- ユースケースは〜する系に統一する

----

## その他

- @azu: [ GitBookでファイル名を表示 #241 ](https://github.com/asciidwango/js-primer/issues/241) これやる
- `[import, title:"filename.js"](path) `でファイル名でるようにする
- `title`必要なら入れておいて。moduleとか
- @laco: OK


---

## 次回

7月26日（木曜日）
