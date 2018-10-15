---
author: laco
---

# Node.jsについて {#nodejs}

これまでに学んだJavaScriptの基本構文は、実行環境を問わずに使えるものです。
しかしこの後に続くユースケースの章では、具体的な実行環境としてWebブラウザと[Node.js][]の2つを扱います。
このセクションではユースケースの学習へ進むために必要なNode.js実行環境の準備と、Webブラウザ環境との違いについて学びます。

## Node.jsとは {#what-is-nodejs}

[Node.js][]はサーバーサイドJavaScript実行環境のひとつで、次のような特徴があります。

- WebブラウザのChromeと同じ、[V8][] JavaScriptエンジンで動作する
- オープンソースで開発されている
- OSを問わずクロスプラットフォームで動作する

Node.jsはサーバーサイドで使うために開発されました。
しかし今ではコマンドラインツールや[Electron][]など、Webブラウザに依存しないクライアントサイドのJavaScript実行環境としても幅広く使われています。

## Node.jsのインストール {#install-nodejs}

Node.jsは多くの他のプログラミング言語と同じように、実行環境をマシンにインストールすることで使用できます。
公式の[ダウンロードページ][]から、開発用のマシンに合わせたインストーラをダウンロードして、インストールしましょう。

Node.jsには常に2つのリリース版が存在します。ひとつは**LTS（Long-Term Support）**版で、2年間のメンテナンスとサポートが宣言されたバージョンです。
具体的には、後方互換性を壊さない範囲でのアップデートと、継続的なセキュリティパッチの提供が行われます。
もうひとつは最新版で、Node.jsの最新の機能を使用できますが、常に最新のバージョンしかメンテナンスされません。
ほとんどのユーザーは、LTS版を用いることが推奨されます。Node.jsでの開発が初めてであれば、迷わずにLTS版のインストーラをダウンロードしましょう。
この章では執筆時点の最新LTS版であるバージョン8.12系で動作するように開発します。

インストールが完了すると、コマンドラインで`node`コマンドが使用可能になっているはずです。
次のコマンドを実行して、インストールされたNode.jsのバージョンを確認しましょう。

```
$ node -v 
v8.12.0
```

また、Node.jsには[npm][]というパッケージマネージャーが同梱されています。
Node.jsをインストールすると、`node`コマンドだけでなくnpmを扱うための`npm`コマンドも使えるようになっています。
次のコマンドを実行して、インストールされたnpmのバージョンを確認しましょう。

```
$ npm -v 
6.4.1
```

npmや`npm`コマンドについての詳細は[公式ドキュメント](https://docs.npmjs.com/)や[npmのGitHubリポジトリ][]を参照してください。
Node.jsのライブラリのほとんどはnpmを使ってインストールできます。
実際に、ユースケースの章ではnpmを使ってライブラリをインストールして利用します。

## Hello World {#hello-world}

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

## Node.jsのグローバルオブジェクト {#nodejs-global-objects}

Node.jsはChromeと同じV8エンジンを利用しているため、ECMAScriptで定義されている基本構文はほとんどブラウザと同じように使えます。
ただし、ブラウザ環境とNode.js環境では利用できるグローバルスコープが違うため、アプリケーションを開発するときにはその違いを理解しなくてはなりません。

ECMAScriptで定義されているグローバルオブジェクトはグローバルスコープにかかわらず存在します。
たとえば`Boolean`、`String`などのラッパーオブジェクトや、`Map`、`Array`、`Promise`のようなコンストラクターオブジェクトがそれにあたります。

Webブラウザ環境のグローバルスコープは`window`オブジェクトですが、Node.jsでは[global][]と呼ばれるオブジェクトがグローバルスコープになります。
そのため、`window`オブジェクトがもつプロパティや関数は、Node.jsではグローバルスコープに存在していません。
たとえば `document`オブジェクトや`confirm`関数などがそれにあたります。
また、`XMLHttpRequest`のようなWeb APIもNode.jsのグローバルスコープには存在しません。

逆に、Node.jsのグローバルスコープには次のようなグローバルオブジェクトがあります。

- `process`オブジェクト: 実行中のNode.jsプロセスに関する情報やコントロールを提供するAPI
- `Buffer`オブジェクト: `Buffer`インスタンスを作成するためのコンストラクターオブジェクト
- `__dirname`・`__filename`: 処理中のスクリプトのディレクトリパスとファイルパスを保持する文字列オブジェクト

[Node.js]: https://nodejs.org/ja/
[V8]: https://developers.google.com/v8/
[Electron]: http://electron.atom.io/
[ダウンロードページ]: https://nodejs.org/ja/download/
[npm]: https://www.npmjs.com/
[npmのGitHubリポジトリ]: https://github.com/npm/npm
[DOM API]: https://developer.mozilla.org/ja/docs/DOM/DOM_Reference/Introduction
[global]: https://nodejs.org/docs/latest-v8.x/api/globals.html
[process]: https://nodejs.org/docs/latest-v8.x/api/process.html#process_process
[Buffer]: https://nodejs.org/docs/latest-v8.x/api/buffer.html
