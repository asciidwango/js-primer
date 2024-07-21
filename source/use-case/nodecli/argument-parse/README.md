---
author: laco
description: "コマンドライン引数を受け取り、アプリケーションから使いやすい形にパースする方法を学びます。"
sponsors: []
---

# コマンドライン引数を処理する {#processing-commandline-args}

このユースケースで作成するCLIアプリケーションの目的は、コマンドライン引数として与えられたMarkdownファイルをHTMLへ変換することです。
このセクションでは`node`コマンドでスクリプトを実行する際に引数を渡し、コマンドライン引数としてパースするところまでを行います。

## `process`オブジェクトとコマンドライン引数 {#process-object-and-commandline-args}

コマンドライン引数を扱う前に、まずは`process`オブジェクトについて触れておきます。
`process`オブジェクトはNode.js実行環境のグローバル変数のひとつです。
`process`オブジェクトが提供するのは、現在のNode.jsの実行プロセスについて、情報の取得と操作をするAPIです。
詳細は[公式ドキュメント](https://nodejs.org/docs/latest-v20.x/api/process.html#process_process)を参照してください。

コマンドライン引数へのアクセスを提供するのは、`process`オブジェクトの`argv`プロパティで、文字列の配列になっています。
次のように`main.js`を変更し、`process.argv`をコンソールに出力しましょう。

[import title:"main.js"](src/main-1.js)

このスクリプトを次のようにコマンドライン引数をつけて実行してみましょう。

```shell
$ node main.js one two=three four
```

このコマンドの実行結果は次のようになります。

```
[
  '/usr/local/bin/node', // Node.jsの実行プロセスのパス
  '/Users/laco/nodecli/main.js', // 実行したスクリプトファイルのパス
  'one', // 1番目の引数
  'two=three', // 2番目
  'four'  // 3番目
]
```

1番目と2番目の要素は常に`node`コマンドと実行されたスクリプトのファイルパスになります。
つまりアプリケーションがコマンドライン引数として使うのは、3番目以降の要素です。

## コマンドライン引数をパースする {#parse-args}

`process.argv`配列を使えばコマンドライン引数を取得できますが、取得できる情報にはアプリケーションに不要なものも含まれています。
また、文字列の配列として渡されるため、フラグのオンオフのような真偽値を受け取るときにも不便です。
そのため、アプリケーションでコマンドライン引数を扱うときには、一度パースして扱いやすい値に整形するのが一般的です。

今回は、Node.jsの標準モジュールである`node:util`モジュールの[parseArgs][]という関数を使ってコマンドライン引数をパースしてみましょう。
文字列処理を自前で行うこともできますが、このような一般的な処理はNode.jsの標準モジュールやサードパーティ製のライブラリを使うことで簡単に実装できます。

### ECMAScriptモジュールを使う {#esmodule}

今回のユースケースでは、`node:util`モジュールを利用するにあたって、基本文法で学んだ[ECMAScriptモジュール][]を使います。
`node:util`モジュールは、次のように`import`文を使ってインポートできます。

<!-- doctest:disable -->
```js
// `node:util`モジュールを、utilオブジェクトとしてインポートする
import * as util from "node:util";
```

ただし、ECMAScriptモジュールを扱う場合には、Node.jsに対してJavaScriptファイルがどのモジュール形式であるかを明示する必要があります。
なぜなら、[Node.js][]は[CommonJSモジュール][]という別のモジュール形式もサポートしており、CommonJSモジュール形式では`import`文は利用できないためです。

Node.jsはもっとも近い上位ディレクトリの `package.json` が持つ `type` フィールドの値によってJavaScriptファイルのモジュール形式を判別します。
`type`フィールドが `module` であればECMAScriptモジュールとして、`type`フィールドが `commonjs` であればCommonJSモジュールとして扱われます。[^2]
また、JavaScriptファイルの拡張子によって明示的に示すこともできます。拡張子が `.mjs` である場合はECMAScriptモジュールとして、`.cjs` である場合はCommonJSモジュールであると判別されます。

今回は `main.js` を ECMAScriptモジュールとして判別させるために、次のコマンドで `package.json` に`type` フィールドを追加します。
まだ、`package.json`を作成していない場合は、先に「[Node.jsプロジェクトのセットアップ][]」を参照してください。

```shell
# npm pkg コマンドで、package.jsonの type フィールドの値をセットする
$ npm pkg set type=module
```

コマンドが実行できたら`package.json`ファイルに `type` フィールドが追加されていることを確認してください。

[import, title:"package.json"](src/package.json)

#### [コラム] CommonJSモジュール {#commonjs-module}

[CommonJSモジュール][]とは、Node.js環境で利用されているJavaScriptのモジュール化の仕組みです。
CommonJSモジュールは[ECMAScriptモジュール][]の仕様が策定されるより前からNode.jsで使われています。

現在はNode.jsでもECMAScriptモジュールがサポートされていますが、`fs` などの標準モジュールはCommonJSモジュールとして提供されています。
また、サードパーティ製のライブラリや長く開発が続けられているプロジェクトのソースコードなどでも、CommonJSモジュールを利用する場面は少なくありません。
そのため、この2つのモジュール形式が共存する場合には、開発者はモジュール形式間の相互運用性（互いを組み合わせた時の動作）に注意する必要があります。[^3]

Node.jsはECMAScriptモジュールからCommonJSモジュールをインポートする方向の相互運用性をサポートしています。
たとえば、次のようにCommonJSモジュールで`exports`オブジェクトを使ってエクスポートされたオブジェクトは、ECMAScriptモジュールで`import`文を使ってインポートできます。
Node.jsの標準モジュールはECMAScriptモジュールのJavaScriptファイルからでも利用できますが、それはこの相互運用性によるものです。

<!-- doctest:disable -->
```js
// lib.cjs
exports.key = "value";

// app.mjs
import { key } from "./lib.cjs";
```

一方で、CommonJSモジュールからECMAScriptモジュールをインポートする方向の相互運用性はサポートされていません。
もし既存のライブラリから提供されるモジュールがECMAScriptモジュールであれば、それを使うアプリケーションもECMAScriptモジュールで書かれている必要があります。
複数のパッケージを利用しながらNode.jsアプリケーションを開発する際には、相互運用性に注意しておく必要があるでしょう。

### コマンドライン引数からファイルパスを取得する {#get-file-path}

`node:util`パッケージを使って、コマンドライン引数として渡されたファイルパスを取得しましょう。
このCLIアプリケーションでは、処理の対象とするファイルパスを次のようなコマンドの形式で受け取ります。

```shell
$ node main.js ./sample.md
```

コマンドライン引数をパースするためには、`node:util`パッケージの`parseArgs`関数を利用します。

<!-- doctest:disable -->
```js
// `node:util`モジュールを、utilオブジェクトとしてインポートする
import * as util from "node:util";

// コマンドライン引数をutil.parseArgsメソッドでパースする
const {
    values,
    positionals
} = util.parseArgs({
    // オプションやフラグ以外の引数を渡すことを許可する
    allowPositionals: true
});
console.log(values); // オプションやフラグを含むオブジェクト
console.log(positionals); // フラグ以外の引数の配列
```

`parseArgs`関数は、コマンドライン引数をパースした結果として`values`と`positionals`の2つのプロパティを持つオブジェクトを返します。
`values`オブジェクトには、`--key=value`のようなオプションや`--flag`のようなフラグをパースした結果が保存されています。
`positionals`配列には、オプションやフラグ以外の引数が配列として順番に格納されています。
デフォルトでは、`positionals`配列はパース結果には含まれないため、`allowPositionals`オプションを`true`に設定しています。

今回の`main.js`に渡す`./sample.md`引数はオプションやフラグではないので、`positionals`配列に格納されます。
それでは`main.js`を次のように変更し、コマンドライン引数で渡されたファイルパスを取得しましょう。

[import title:"main.js"](src/main-2.js)

次のコマンドを実行すると、`positionals`配列の先頭に格納された`./sample.md`文字列が取得されてコンソールに出力されます。
`./sample.md`は`process.argv`配列では3番目に存在していましたが、パース後の`positionals`配列では1番目になって扱いやすくなっています。

```shell
$ node main.js ./sample.md
./sample.md
```

このように、`process.argv`配列を直接扱うよりも、`node:util`の`parseArgs`関数を利用すると、コマンドライン引数をより扱いやすい形にパースできます。
次のセクションではコマンドライン引数から取得したファイルパスを元に、ファイルを読み込む処理を追加していきます。

#### [エラー例] SyntaxError: Cannot use import statement outside a module {#syntax-error-import-statement}

「`import`文をECMAScriptモジュールの外で使うことはできません」というエラーが出ています。`main.js` の実行でこのエラーが出る場合は、Node.jsが`main.js`ファイルをECMAScriptモジュールだと判別できていないことを意味します。

<!-- doctest:disable -->
```shell
import * as util from "node:util";
^^^^^^

SyntaxError: Cannot use import statement outside a module
```

[ECMAScriptモジュールを使う](#esmodule)で述べたように、`package.json`の`type`フィールドを`module`に設定しましょう。

## このセクションのチェックリスト {#section-checklist}

- `process.argv`配列に`node`コマンドのコマンドライン引数が格納されていることを確認した
- ECMAScriptモジュールを使ってパッケージを読み込めることを確認した
- `node:util`モジュールの`parseArgs`関数を使ってコマンドライン引数をパースできることを確認した
- コマンドライン引数で渡されたファイルパスを取得してコンソールに出力できた

[npm]: https://www.npmjs.com/
[npmのGitHubリポジトリ]: https://github.com/npm/npm
[CommonJSモジュール]: https://nodejs.org/docs/latest/api/modules.html
[Node.js]: https://nodejs.org/
[アプリケーション開発の準備]: ../../setup-local-env/README.md
[ECMAScriptモジュール]: ../../../basic/module/README.md
[parseArgs]: https://nodejs.org/api/util.html#utilparseargsconfig
[Node.jsプロジェクトのセットアップ]: ../helloworld/README.md#setup-nodejs-project
[^2]: [package.json and file extensions](https://nodejs.org/api/packages.html#packagejson-and-file-extensions)
[^3]: [Interoperability with CommonJS](https://nodejs.org/api/esm.html#interoperability-with-commonjs)
