# 2016-04-19 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@vvakame](https://github.com/vvakame)
- [@laco0416](https://github.com/laco0416)

@ 株式会社ドワンゴ会議室

## [文法の基本解説をどうするか · Issue #8 · asciidwango/ES6book](https://github.com/asciidwango/ES6book/issues/8 "文法の基本解説をどうするか · Issue #8 · asciidwango/ES6book")

- 最初に文法の解説があるといいのでは
- 配列はどれくらい?
  - メソッドチェーンの話が一緒に出てきそう
- 基本編
    - 基礎文法
        - 字句構造
        - 型、値、変数
        - 式と演算子
        - 文
        - 配列
        - オブジェクト
        - 関数
        - クラス
        - 正規表現
    - ビルトインオブジェクト
        - Object
        - Array
        - Map
        - Set
        - JSON
        - Promise
        - Date
- 応用編
    - ユースケース
        - TODO
        - Ajax、非同期、エラーハンドリング
        - Node.js

### Mathはどうするか?

> Math系と数字と浮動小数点数とparseInt系の上手く扱うケースとして計算機を作ってみるというのはありがちだけど、ありそう。  
> https://github.com/asciidwango/ES6book/issues/6#issuecomment-211386682

あらゆるものが載ってる本じゃなくて、必要な物を書こうとした時に無駄にはまらないようにするのが目的。
Matchははまりやすいけど、書くときにしらべて書くようなものが中心。
なので、軽くはあってもいいが、計算機を作ってというほどでもないという話

## ES2016以降の話

- Appendixに書くような形
- Proposalの読み方、探し方について書くとか
- (同じ系統の話としてライブラリの選び方とかもあるとよさそう)

## 担当

- azu: [文法の基本解説をどうするか · Issue #8 · asciidwango/ES6book](https://github.com/asciidwango/ES6book/issues/8)
- laco: [Ajaxで何か · Issue #9 · asciidwango/ES6book](https://github.com/asciidwango/ES6book/issues/9)
- laco: [Node.jsのCLIアプリ · Issue #7 · asciidwango/ES6book](https://github.com/asciidwango/ES6book/issues/7)
- azu: [TODOアプリ · Issue #4 · asciidwango/ES6book](https://github.com/asciidwango/ES6book/issues/4)

## [実行環境について #2](https://github.com/asciidwango/ES6book/issues/2 "実行環境について #2")

- どうせウェブサイトでも公開するなら、ウェブ上にREPLを置いて実行させる
    - [JavaScript Promiseの本](http://azu.github.io/promises-book/ "JavaScript Promiseの本")の形式
    - 推奨実行環境と裏側ではBabelでの変換を行うなどの対処法がとれる
    - スクラッチパッドとかじゃなくても良さそう
- 書籍にはウェブ上には同じ内容のものが公開されているという注記が必要
- サンプルコードを読み込んでREPLのみがある専用のページがあってもいいかもしれない

## 執筆環境

- Markdownで
- ローカルでプレビューとかしやすいようにGitBookで見れるようにする
- [feat(gitbook): gitbookのセットアップ by azu · Pull Request #10 · asciidwango/ES6book](https://github.com/asciidwango/ES6book/pull/10 "feat(gitbook): gitbookのセットアップ by azu · Pull Request #10 · asciidwango/ES6book")
    - Publicでいいならいつでもウェブから確認できるようにできる

## [CIを回す #11](https://github.com/asciidwango/ES6book/issues/11 "CIを回す #11")

- サンプルコードはつねにCIのテストを通った状態にしたい
- CIがプライベートリポジトリだと使えるサービスが限られていそう
- asciidwangoのリポジトリに連携する権限が必要そう

## マイルストーン

- とりあえず書き始めてみてから引く

## 次回

5月27日 @ 株式会社ドワンゴ会議室