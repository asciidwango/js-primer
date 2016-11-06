---
author: laco 
---

# Node.jsでHello World

Node.jsでCLIアプリケーションを開発するにあたり、まずはじめにNode.jsについての簡単な解説を行い、Hello Worldアプリケーションを作成します。

## Node.jsとは

[Node.js][]はサーバーサイドJavaScript実行環境のひとつで、次のような特徴があります。

- WebブラウザのChromeと同じ、[V8][]JavaScriptエンジンで動作する
- オープンソースで開発されている
- OSを問わずクロスプラットフォームで動作する

Node.jsはもともとサーバーサイドで使う目的で開発されました。
しかし今ではコマンドラインツールや[Electron][]のように、Webブラウザに依存しないJavaScript実行環境として幅広い用途で使われています。

## Node.jsのインストール

Node.jsは多くの他の言語と同じように、実行環境をマシンにインストールすることで使用できます。
公式の[ダウンロードページ][]から、開発用のマシンに合わせたインストーラをダウンロードして、インストールしましょう。

Node.jsには常に2つのリリース版が存在します。ひとつは**LTS（Long-Term Support）**版で、2年間のメンテナンスとサポートが約束されたバージョンです。
もうひとつは最新版で、Node.jsの最新の機能を使用できますが、常に最新のバージョンしかメンテナンスされません。
ほとんどのユーザーは、LTS版を用いることが推奨されます。Node.jsでの開発が初めてであれば、迷わずにLTS版のインストーラをダウンロードしましょう。
この章では執筆時点の最新LTS版であるバージョン6.9系で動作するように開発します。

インストールが完了すると、コマンドラインで`node`コマンドが使用可能になっているはずです。
次のコマンドを実行して、インストールされたNode.jsのバージョンを確認しましょう。

```
$ node -v 
v6.9.1      
```

## Hello World

<!-- textlint-disable preset-ja-technical-writing/no-exclamation-question-mark -->

まずはNode.jsでHello Worldアプリケーションを作ってみましょう。
具体的には、実行すると標準出力に"Hello World!"という文字列を表示するCLIアプリケーションを記述します。
はじめに用意するのは、アプリケーションのエントリポイントとなるJavaScriptファイルです。
適当なディレクトリに`main.js`という名前でファイルを作成し、次のように記述します。

[import main.js](src/main.js)

Webブラウザの実行環境では、`console.log`関数の出力先はブラウザのコンソールでしたが、
Node.js環境では標準出力になります。
このコードは、標準出力に`Hello World!`という文字列を出力するものです。

<!-- textlint-enable preset-ja-technical-writing/no-exclamation-question-mark -->

JavaScriptのコードをNode.jsで実行するには、`node`コマンドを使用します。
次のコマンドを実行して、Node.jsで`main.js`を実行します。

```
$ node main.js
Hello World!
```

Node.jsの基本は、エントリポイントとなるJavaScriptファイルを作成し、そのファイルを`node`コマンドの引数に渡して実行するという流れです。
また、WebブラウザのJavaScriptと同じく、コードは1行目から順に実行されます。
これらを踏まえた上で、次のセクションからCLIアプリケーションの開発をはじめていきましょう。

[Node.js]: https://nodejs.org/ja/
[Chrome V8]: https://developers.google.com/v8/
[Electron]: http://electron.atom.io/
[ダウンロードページ]: https://nodejs.org/ja/download/