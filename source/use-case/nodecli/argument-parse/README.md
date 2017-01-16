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
例えば次のようなコマンドでNode.jsのスクリプトを実行したとき、

```
$ node process.js one two=three four
```

`process.argv`配列の中身は次のようになります。

```
0: /usr/local/bin/node
1: /Users/laco/work/node/process.js
2: one
3: two=three
4: four
```

1番目と2番目の要素は常に`node`コマンドと実行されたスクリプトのファイルパスになります。
つまりアプリケーションがコマンドライン引数として使うのは、3番目以降の要素です。

それでは前のセクションで作った`main.js`で、コマンドライン引数を受け取ってみましょう。
`Array#slice`メソッドを使って、`process.argv`配列の3番目以降の要素を取得します。
取得したコマンドライン引数は標準出力に出力します。

```js
const args = process.argv.slice(2);
console.log(args);
```

`main.js`を次のコマンドで実行すると、コマンドライン引数が取得できていることがわかります。

```
$ node main.js foo bar
[ 'foo', 'bar' ]
```

## コマンドライン引数をパースする

`process.argv`配列を使えばコマンドライン引数を取得できますが、取得できるのは文字列の配列です。
真偽値や数値、フラグとパラメータの区別など、アプリケーションが使いやすい形にするにはコマンドライン引数をパースして整形する必要があります。
文字列処理を自前で行うこともできますが、このような一般的な処理はすでにあるライブラリを使うと簡単に書けます。
今回は[commander][]というライブラリを使ってコマンドライン引数をパースします。

### npmを使ってパッケージをインストールする

Node.jsのライブラリの多くは[npm][]というパッケージマネージャーを使ってインストールできます。
Node.jsをインストールすると、`node`コマンドだけでなく`npm`コマンドも使えるようになっています。


npmでパッケージをインストールするまでに、まずは次のコマンドでnpmのパッケージ管理環境を作りましょう。
コマンドを実行すると`package.json`というファイルが生成されています。

```
$ npm init -y
```

さらに次のコマンドを実行して、commanderパッケージをインストールします。

```
$ npm install --save commander
```

インストールされたパッケージは、`node_modules`というディレクトリの中に配置されています。

### commanderパッケージを使う

`node_modules`ディレクトリに配置されたパッケージをNode.jsのスクリプト中に読み込むには、[require関数][]を使います。
`require`関数はNode.js環境のグローバル関数のひとつで、指定したパッケージのモジュールを読み込めます。

次のように`main.js`でcommanderパッケージを読み込みます。

```js
const program = require("commander");
```

commanderは`parse`メソッドを使ってコマンドライン引数をパースします。
値を持たない真偽値だけの引数（フラグ）をパースするには、次のように`main.js`を記述します。

```js
const program = require("commander");
program.option("--foo");
program.parse(process.argv);
console.log(program.foo);
```

このスクリプトを次のように実行すると、`--foo`という引数がパースされ、`program.foo`プロパティとして扱えるようになっています。

```
$ node main.js --foo
true
```

フラグだけでなく、対応する値を受け取る場合は、次のように`main.js`を記述します。

```js
const program = require("commander");
program.option("--foo <text>");
program.parse(process.argv);
console.log(program.foo);
```

`--foo`フラグに値を与えて実行すれば、文字列が`program.foo`プロパティにセットされていることがわかります。

```
$ node main.js --foo bar
bar
```

このように、`process.argv`配列を直接扱うよりも、commanderのようなライブラリを使うことで簡単にコマンドライン引数を処理できます。
次のセクションからは、こうして受け取ったコマンドライン引数を使って、CLIアプリケーションを作成していきます。

[commander]: https://github.com/tj/commander.js/
[npm]: https://www.npmjs.com/
[require関数]: https://nodejs.org/dist/latest-v6.x/docs/api/modules.html#modules_loading_from_node_modules_folders
