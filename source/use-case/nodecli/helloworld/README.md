---
author: laco 
description: "Hello Worldアプリケーションを通じてNode.jsのCLIアプリケーションの基本を学びます。"
---

# Node.jsでHello World {#hello-world-by-nodejs}

実際にアプリケーションを作成するまえに、まずはHello Worldアプリケーションを通じてNode.jsのCLIアプリケーションの基本を学びましょう。

## Hello World {#hello-world}

<!-- textlint-disable preset-ja-technical-writing/no-exclamation-question-mark -->

まずはNode.jsでHello Worldアプリケーションを作ってみましょう。
具体的には、実行すると標準出力に`"Hello World!"`という文字列を表示するCLIアプリケーションを記述します。
はじめに用意するのは、アプリケーションのエントリポイントとなるJavaScriptファイルです。
適当なディレクトリに`main.js`という名前でファイルを作成し、次のように記述します。

[import, title:"main.js"](src/main.js)

ウェブブラウザの実行環境では、`console.log`関数の出力先はブラウザの開発者ツールのコンソールでした。
Node.js環境では、`console.log`関数の出力先は標準出力になります。
このコードは、標準出力に`Hello World!`という文字列を出力するものです。

<!-- textlint-enable preset-ja-technical-writing/no-exclamation-question-mark -->

JavaScriptのコードをNode.jsで実行するには、`node`コマンドを使用します。
次のコマンドを実行して、Node.jsで`main.js`を実行します。

```
$ node main.js
Hello World!
```

Node.jsの基本は、エントリポイントとなるJavaScriptファイルを作成し、そのファイルを`node`コマンドの引数に渡して実行するという流れです。
また、ウェブブラウザのJavaScriptと同じく、コードは1行目から順に実行されます。

## Node.jsとブラウザのグローバルオブジェクト {#global-objects}

Node.jsはChromeと同じV8エンジンを利用しているため、ECMAScriptで定義されている基本構文はほとんどブラウザと同じように使えます。
ただし、ブラウザ環境とNode.js環境では利用できるグローバルオブジェクトが違うため、アプリケーションを開発するときにはその違いを理解しなくてはなりません。

ECMAScriptで定義されているグローバルオブジェクトはブラウザとNode.jsどちらの環境にも存在します。
たとえば`Boolean`、`String`などのラッパーオブジェクトや、`Map`、`Array`、`Promise`のようなビルトインオブジェクトがそれにあたります。

ウェブブラウザ環境のグローバルオブジェクトは`window`オブジェクトですが、Node.jsでは[global][]と呼ばれるオブジェクトがグローバルオブジェクトになります。
ブラウザの`window`オブジェクトにはたとえば次のようなプロパティや関数があります。

- [document][]
- [XMLHttpRequest][]

一方、Node.jsの`global`オブジェクトにはたとえば次のようなプロパティや関数があります。

- [process][]
- [Buffer][]

それぞれのグローバルオブジェクトにあるプロパティなどは、同じ名前でグローバル変数や関数としてアクセスできます。
たとえば`window.document`プロパティは、グローバル変数の`document`としてもアクセスできます。

また、ECMAScriptで定義されたものではありませんが、ほぼ同等の機能と名前をもつプロパティや関数がブラウザとNode.jsどちらにもある場合もあります。
たとえば次のようなものです。

- Console API
- `setTimeout`関数

これらを踏まえた上で、次のセクションからCLIアプリケーションの開発をはじめていきましょう。

## このセクションのチェックリスト {#section-checklist}

- `main.js`ファイルを作成した
- `node`コマンドで`main.js`を実行し、標準出力にログが出力されるのを確認した
- グローバルオブジェクトについて、ウェブブラウザとNode.jsで実行環境による違いがあることを理解した

[document]: https://developer.mozilla.org/ja/docs/Web/API/Document
[XMLHttpRequest]: https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest
[global]: https://nodejs.org/docs/latest-v8.x/api/globals.html
[process]: https://nodejs.org/docs/latest-v8.x/api/process.html#process_process
[Buffer]: https://nodejs.org/docs/latest-v8.x/api/buffer.html
