---
author: laco 
---

# コマンドライン引数を処理する

このユースケースで作成するCLIアプリケーションの目的は、コマンドライン引数として与えられたファイルを変換することです。
このセクションではコマンドライン引数を受け取って、それをパースするところまでを行います。

## `process`オブジェクトとコマンドライン引数

コマンドライン引数を扱う前に、まずは`process`オブジェクトについて触れておきます。
`process`オブジェクトはNode.js実行環境のグローバル変数のひとつです。
`process`オブジェクトが提供するのは、現在のNode.jsの実行プロセスについて、情報の取得と操作を行うAPIです。
詳細は[公式ドキュメント](https://nodejs.org/dist/latest-v6.x/docs/api/process.html#process_process)を参照してください。

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

## コマンドライン引数をパースする

`process.argv`配列を使えばコマンドライン引数を取得できますが、取得できるのは文字列の配列です。
真偽値や数値、フラグとパラメータの区別など、アプリケーションが扱いやすくするためには、コマンドライン引数をパースして整形する必要があります。
文字列処理を自前で行うこともできますが、このような一般的な処理は既存のライブラリを使うと簡単に書けます。
今回は[commander][]というライブラリを使ってコマンドライン引数をパースします。

### npmを使ってパッケージをインストールする

Node.jsのライブラリの多くは[npm][]というパッケージマネージャーを使ってインストールできます。
npmや`npm`コマンドについての詳細は[公式ドキュメント](https://docs.npmjs.com/)や[npmのGitHubリポジトリ][]を参照してください。
Node.jsをインストールすると、`node`コマンドだけでなく`npm`コマンドも使えるようになっています。

npmでパッケージをインストールする前に、まずは次のコマンドでnpmのパッケージ管理環境を作りましょう。
npmでは`package.json`というファイルを使って、依存するパッケージの種類やバージョンを管理します。
次のコマンドを実行して、デフォルト設定の`package.json`を生成します。

```shell-session
$ npm init --yes
```

さらに次のコマンドを実行して、commanderパッケージをインストールします。
`--save`オプションを付与すると、`package.json`にインストールしたパッケージを記録します。

```shell-session
$ npm install --save commander
```

インストールされたパッケージは、`node_modules`というディレクトリの中に配置されています。

### commanderパッケージを使う

`node_modules`ディレクトリに配置されたパッケージは、[require関数][]を使ってスクリプト中に読み込みます。
`require`関数はNode.js環境のグローバル関数のひとつで、指定したパッケージのモジュールを読み込めます。
commanderパッケージを読み込むには、次のように記述します。

```js
const program = require("commander");
```

commanderは`parse`メソッドを使ってコマンドライン引数をパースします。
次の`commander-flag.js`では、値を持たない引数（フラグ）を真偽値にパースしています。

[import commander-flag.js](src/commander-flag.js)

このスクリプトを次のように実行すると、`--foo`という引数がパースされ、`program.foo`プロパティとして扱えるようになっています。

```shell-session
$ node commander-flag.js --foo
true
```

フラグだけでなく、対応する値を受け取る場合は、次の`commander-param.js`のように記述します。

[import commander-param.js](src/commander-param.js)

`--foo`フラグに値を与えて実行すれば、文字列が`program.foo`プロパティにセットされていることがわかります。

```shell-session
$ node commander-param.js --foo bar
bar
```

このように、`process.argv`配列を直接扱うよりも、commanderのようなライブラリを使うことで簡単にコマンドライン引数を処理できます。
次のセクションからは、こうして受け取ったコマンドライン引数を使って、CLIアプリケーションを作成していきます。

[commander]: https://github.com/tj/commander.js/
[npm]: https://www.npmjs.com/
[npmのGitHubリポジトリ]: https://github.com/npm/npm
[require関数]: https://nodejs.org/dist/latest-v6.x/docs/api/modules.html#modules_loading_from_node_modules_folders
