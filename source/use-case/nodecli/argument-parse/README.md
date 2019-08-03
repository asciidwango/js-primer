---
author: laco 
description: "コマンドライン引数を受け取り、アプリケーションから使いやすい形にパースする方法を学びます。"
---

# コマンドライン引数を処理する {#processing-commandline-args}

このユースケースで作成するCLIアプリケーションの目的は、コマンドライン引数として与えられたファイルを変換することです。
このセクションではコマンドライン引数を受け取って、それをパースするところまでを行います。

## `process`オブジェクトとコマンドライン引数 {#process-object-and-commandline-args}

コマンドライン引数を扱う前に、まずは`process`オブジェクトについて触れておきます。
`process`オブジェクトはNode.js実行環境のグローバル変数のひとつです。
`process`オブジェクトが提供するのは、現在のNode.jsの実行プロセスについて、情報の取得と操作をするAPIです。
詳細は[公式ドキュメント](https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process)を参照してください。

コマンドライン引数へのアクセスを提供するのは、`process`オブジェクトの`argv`プロパティで、文字列の配列になっています。
例として、次のように`process.argv`をコンソール出力するだけの`process-argv.js`を作成します。

[import title:"process-argv.js"](src/process-argv.js)

このスクリプトを次のようなコマンドで実行します。

```shell-session
$ node process-argv.js one two=three four
```

このコマンドの実行結果は次のようになります。

```
[ 
  '/usr/local/bin/node', // Node.jsの実行プロセスのパス
  '/Users/laco/nodecli/argument-parse/src/process-argv.js', // 実行したスクリプトファイルのパス
  'one', // 1番目の引数
  'two=three', // 2番目
  'four'  // 3番目
]
```

1番目と2番目の要素は常に`node`コマンドと実行されたスクリプトのファイルパスになります。
つまりアプリケーションがコマンドライン引数として使うのは、3番目以降の要素です。

## コマンドライン引数をパースする {#parse-args}

`process.argv`配列を使えばコマンドライン引数を取得できますが、取得できるのは文字列の配列です。
そのままではアプリケーションから扱いにくいため、コマンドライン引数をパースして整形する必要があります。
文字列処理を自前で行うこともできますが、このような一般的な処理は既存のライブラリを使うと簡単に書けます。
今回は[commander][]というライブラリを使ってコマンドライン引数をパースします。

### `commander`パッケージをインストールする {#install-commander}

commanderは[npm][]の`npm install`コマンドを使ってインストールできます。
まだnpmの実行環境を用意できていなければ、先に[アプリケーション開発の準備][]を参照してください。

npmでパッケージをインストールする前に、まずは`pacakge.json`というファイルを作成します。
`package.json`とは、アプリケーションが依存するパッケージの種類やバージョンなどの情報を記録するJSON形式のファイルです。
`package.json`ファイルのひな形は、`npm init`コマンドで生成できます。
通常は対話式のプロンプトによって情報を設定しますが、ここではすべてデフォルト値で`pacakge.json`を作成する`--yes`オプションを付与します。

`nodecli`のディレクトリ内で、`npm init --yes`コマンドを実行して`pacakge.json`を作成しましょう。

```shell-session
$ npm init --yes
```

生成された`package.json`ファイルは次のようになっています。

[import, title:"package.json"](src/package.init.json)

`package.json`ファイルが用意できたら、`npm install`コマンドを使って`commander`パッケージをインストールします。
このコマンドの引数にはインストールするパッケージの名前とそのバージョンを`@`記号でつなげて指定できます。
バージョンを指定せずにインストールすれば、その時点での最新の安定版が自動的に選択されます。
次のコマンドを実行して、commanderのバージョン2.9をインストールします。[^1]

```shell-session
$ npm install commander@2.9
```

インストールが完了すると、`package.json`ファイルは次のようになっています。

[import, title:"package.json"](src/package.json)

また、npmのバージョンが5以上であれば `package-lock.json`ファイルが生成されています。
このファイルはnpmがインストールしたパッケージの、実際のバージョンを記録するためのものです。
さきほどcommanderのバージョンは`2.9`としましたが、実際にインストールされるのは`2.9.x`に一致する最新のバージョンです。
`package-lock.json`ファイルには実際にインストールされたバージョンが記録されています。
これによって、ふたたび`npm install`を実行したときに、異なるバージョンがインストールされることを防ぎます。

### CommonJSモジュール {#commonjs-module}

インストールした`commander`パッケージを使う前に、**CommonJSモジュール**のことを知っておきましょう。
[CommonJSモジュール][]とは、[Node.js][]環境で利用されているJavaScriptのモジュール化の仕組みです。
CommonJSモジュールは基本文法で学んだ[ECMAScriptモジュール][]の仕様が策定されるより前からNode.jsで使われています。
Node.jsの標準パッケージやnpmで配布されるパッケージは、CommonJSモジュールとして提供されていることがほとんどです。
先ほどインストールした`commander`パッケージも、CommonJSモジュールとして利用できます。

CommonJSモジュールはNode.jsのグローバル変数である`module`変数を使って変数や関数などをエクスポートします。
CommonJSモジュールでは`module.exports`プロパティに代入されたオブジェクトが、そのJavaScriptファイルからエクスポートされます。
複数の名前付きエクスポートが可能なES Moduleとは異なり、CommonJSでは`module.exports`プロパティの値だけがエクスポートの対象です。

次の例では、`cjs-export.js`というファイルを作成し、`module.exports`でオブジェクトをエクスポートしています。

[import, title:"cjs-export.js"](src/cjs-export.js)

このCommonJSモジュールをインポートするには、グローバル関数である[require関数][]を使います。
次のように`require`関数にインポートしたいモジュールのファイルパスを渡し、戻り値としてエクスポートされた値をインポートできます。
インポートするファイルパスに拡張子が必須なES Moduleとは異なり、CommonJSの`require`関数では拡張子である`.js`が省略可能です。

[import, title:"cjs-import.js"](src/cjs-import.js)

また、`require`関数は相対パスや絶対パス以外にもnpmでインストールしたパッケージ名を指定することもできます。
`npm install`コマンドでインストールされたパッケージは、`node_modules`というディレクトリの中に配置されています。
`require`関数にインストールしたパッケージ名を指定することで、`node_modules`ディレクトリに配置されたパッケージを読み込めます。

次の例では、先ほどインストールした`commander`パッケージを`node_modules`ディレクトリから読み込んでいます。

```js
const program = require("commander");
```

このユースケースで今後登場するモジュールはすべてCommonJSモジュールです。
Node.jsではES Moduleもサポートされる予定ですが、現在はまだ安定した機能としてサポートされていません。

### `commander`パッケージを使う {#use-commander}

先ほどインストールした`commander`パッケージを使ったコマンドライン引数のパース例を見ていきます。

次の`commander-flag.js`では、コマンドライン引数の`--foo`オプションを真偽値としてパースしています。
commanderは`options`メソッドを使って、受け取りたいオプションを定義します。
オプションの定義後に、`parse`メソッドに`process.argv`を渡してコマンドライン引数をパースします。
パースした後に`opts`メソッドを呼び出すと、定義したオプションと与えられた値をオブジェクトとして取り出すことができます。

[import title:"commander-flag.js"](src/commander-flag.js)

このスクリプトを次のように実行すると、`--foo`オプションがパースされ、`options.foo`プロパティとして扱えるようになっています。

```shell-session
$ node commander-flag.js --foo
true
```

もし、次のようなエラーが表示されたときは、`commander`パッケージが`node_modules`ディレクトリ内にないことを示しています。
`commander`パッケージのインストールに失敗しているので、パッケージのインストールからやり直してみましょう。

```
Error: Cannot find module 'commander'
```

次の`commander-param.js`では、コマンドライン引数の`--bar`オプションに渡された値を受け取っています。

[import title:"commander-param.js"](src/commander-param.js)

`--bar`オプションに値を与えて実行すれば、文字列が`options.bar`プロパティにセットされていることがわかります。
`options`メソッドで、`--オプション名 <値の種類>`を定義することで、指定したオプション名に渡された値を取得できます。

```shell-session
$ node commander-param.js --bar "value"
value
```

このように、`process.argv`配列を直接扱うよりも、commanderのようなライブラリを使うことで宣言的にコマンドライン引数を定義し処理できます。
次のセクションからは、同じようにコマンドライン引数を定義し、CLIアプリケーションを作成していきます。

## このセクションのチェックリスト {#section-checklist}

- `process.argv`配列に`node`コマンドのコマンドライン引数が格納されていることを確認した
- npmを使ってパッケージをインストールする方法を理解した
- `require`関数を使ってパッケージのモジュールを読み込めることを確認した
- commanderを使ってコマンドライン引数をパースできることを確認した

[commander]: https://github.com/tj/commander.js/
[npm]: https://www.npmjs.com/
[npmのGitHubリポジトリ]: https://github.com/npm/npm
[CommonJSモジュール]: https://nodejs.org/docs/latest/api/modules.html
[Node.js]: https://nodejs.org/ja/
[require関数]: https://nodejs.org/dist/latest-v8.x/docs/api/modules.html#modules_loading_from_node_modules_folders
[アプリケーション開発の準備]: ../../setup-local-env/README.md
[ECMAScriptモジュール]: ../../../basic/module/README.md
[^1]: --saveオプションをつけてインストールしたのと同じ意味。npm 5.0.0からは--saveがデフォルトオプションとなりました。
