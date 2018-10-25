---
author: laco 
---

# Node.jsでHello World {#hello-world-by-nodejs}

実際にアプリケーションを作成するまえに、まずはHello Worldアプリケーションを通じてNode.jsのCLIアプリケーションの基本を学びましょう。

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

これらを踏まえた上で、次のセクションからCLIアプリケーションの開発をはじめていきましょう。

[Node.js]: https://nodejs.org/ja/
[V8]: https://developers.google.com/v8/
[Electron]: http://electron.atom.io/
[ダウンロードページ]: https://nodejs.org/ja/download/
[DOM API]: https://developer.mozilla.org/ja/docs/DOM/DOM_Reference/Introduction
[global]: https://nodejs.org/docs/latest-v8.x/api/globals.html
[process]: https://nodejs.org/docs/latest-v8.x/api/process.html#process_process
[Buffer]: https://nodejs.org/docs/latest-v8.x/api/buffer.html
