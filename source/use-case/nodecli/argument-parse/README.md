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
例として、次のように`process-argv.js`を記述します。

[import process-argv.js](src/process-argv.js)

このスクリプトを次のようなコマンドで実行します。

```shell-session
$ node process-argv.js one two=three four
```

すると、出力結果は次のようになります。

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

### commanderパッケージをインストールする {#install-commander}

commanderは[npm][]の`npm install`コマンドを使ってインストールできます。
まだnpmの実行環境を用意できていなければ、先に[アプリケーション開発の準備][]を参照してください。

npmでパッケージをインストールする前に、まずは`pacakge.json`というファイルを作成しましょう。
`package.json`とは、アプリケーションが依存するパッケージの種類やバージョンなどの情報を記録するJSON形式のファイルです。
`package.json`ファイルのひな形は、`npm init`コマンドで生成できます。
通常は対話式のプロンプトによって情報を設定しますが、ここではすべてデフォルト値で問題ないため、`--yes`オプションを付与します。
次のコマンドを実行して`pacakge.json`を作成しましょう。

```shell-session
$ npm init --yes
```

生成された`package.json`ファイルは次のようになっています。

[import package.json](src/package.init.json)

`package.json`ファイルが用意できたら、`npm install`コマンドを使ってcommanderパッケージをインストールします。
このコマンドの引数にはインストールするパッケージの名前とそのバージョンを`@`記号でつなげて指定できます。
バージョンを指定せずにインストールすれば、その時点での最新の安定版が自動的に選択されます。
次のコマンドを実行して、commanderのバージョン2.9をインストールします。[^1]

```shell-session
$ npm install commander@2.9
```

インストールが完了すると、`package.json`ファイルは次のようになっています。

[import package.json](src/package.json)

また、npmのバージョンが5以上であれば `package-lock.json`ファイルが生成されています。
このファイルはnpmがインストールしたパッケージの、実際のバージョンを記録するためのものです。
さきほどcommanderのバージョンは`2.9`としましたが、実際にインストールされるのは`2.9.x`に一致する最新のバージョンです。
`package-lock.json`ファイルには実際にインストールされたバージョンが記録されています。
これによって、ふたたび`npm install`を実行したときに異なるバージョンがインストールされることを防ぎます。

### commanderパッケージを使う {#use-commander}

`npm install`コマンドでインストールされたパッケージは、`node_modules`というディレクトリの中に配置されています。
`node_modules`ディレクトリに配置されたパッケージは、[require関数][]を使ってスクリプト中に読み込みます。
`require`関数はNode.js環境のグローバル関数のひとつで、指定したパッケージのモジュールを読み込めます。
commanderパッケージを読み込むには、次のように記述します。

```js
const program = require("commander");
```

commanderは`parse`メソッドを使ってコマンドライン引数をパースします。
パースした後に`opts`メソッドを呼び出すと、定義したオプションと与えられた値をオブジェクトとして取り出すことができます。
次の`commander-flag.js`では、値をもたないオプションを真偽値にパースしています。

[import commander-flag.js](src/commander-flag.js)

このスクリプトを次のように実行すると、`--foo`オプションがパースされ、`options.foo`プロパティとして扱えるようになっています。

```shell-session
$ node commander-flag.js --foo
true
```

もし、次のようなエラーが表示されたときは、commanderパッケージが`node_modules`ディレクトリ内にないことを示しています。
commanderパッケージのインストールに失敗しているので、パッケージのインストールからやり直してみましょう。

```
Error: Cannot find module 'commander'
```

値をもつオプションをパースする場合は、次の`commander-param.js`のように記述します。

[import commander-param.js](src/commander-param.js)

`--foo`オプションに値を与えて実行すれば、文字列が`options.foo`プロパティにセットされていることがわかります。

```shell-session
$ node commander-param.js --foo bar
bar
```

このように、`process.argv`配列を直接扱うよりも、commanderのようなライブラリを使うことで簡単にコマンドライン引数を処理できます。
次のセクションからは、こうして受け取ったコマンドライン引数を使って、CLIアプリケーションを作成していきます。

[commander]: https://github.com/tj/commander.js/
[npm]: https://www.npmjs.com/
[npmのGitHubリポジトリ]: https://github.com/npm/npm
[require関数]: https://nodejs.org/dist/latest-v8.x/docs/api/modules.html#modules_loading_from_node_modules_folders
[アプリケーション開発の準備]: ../../setup-local-env/README.md
[^1]: --saveオプションをつけてインストールしたのと同じ意味。npm 5.0.0からは--saveがデフォルトオプションとなりました。
