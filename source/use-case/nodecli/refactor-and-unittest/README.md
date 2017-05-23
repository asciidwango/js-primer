---
author: laco 
---

# ユニットテストを記述する

このセクションでは、これまで作成したCLIアプリケーションにユニットテストを導入します。
ユニットテストの導入とあわせて、ソースコードを整理してテストがしやすくなるようにモジュール化します。

## スクリプトをモジュールに分割する

前のセクションまでは、すべての処理をひとつのJavaScriptファイルに記述していました。
ユニットテストを行うためにはテスト対象がモジュールとして分割されていなければいけません。
今回のアプリケーションでは、CLIアプリケーションとしてコマンドライン引数を処理する部分と、MarkdownをHTMLへ変換する部分に分割します。

Node.jsでは、複数のJavaScriptファイル間で変数や関数などをやりとりするために、モジュールという仕組みを利用します。
モジュールとは変数や関数などのオブジェクトをエクスポートするJavaScriptファイルのことです。
モジュールであるJavaScriptファイルは、別のJavaScriptファイルからインポートできます。
モジュールからオブジェクトをエクスポートするには、Node.jsのグローバル変数である[moduleオブジェクト][]を利用します。
`module.exports`オブジェクトは、そのファイルからエクスポートされるオブジェクトを格納します。
次のコードは簡単な関数をエクスポートするモジュールの例です。

```js
// greet.js
module.exports = function greet(name) {
    return `Hello ${name}!`;
};
```

`require`関数は別のJavaScriptファイルをモジュールとしてインポートできます。
次の例では先ほどのモジュールをインポートして、エクスポートされた関数を取得しています。

```js
const greet = require("./greet");
greet("World"); // => Hello World!
```

`module.exports`オブジェクトに直接代入するのではなく、そのプロパティとしてオブジェクトをエクスポートすることもできます。
次の例では2つの関数を同じファイルからエクスポートしています。


```js
// functions.js
module.exports.foo = function() { /**/ };
module.exports.bar = function() { /**/ };
```

このようにエクスポートされたオブジェクトは、`require`関数の戻り値のプロパティとしてアクセス可能になります。

```js
const functions = require("./functions");
functions.foo();
functions.bar();
```

それではCLIアプリケーションのソースコードをモジュールに分割してみましょう。
`md2html.js`という名前のJavaScriptファイルを作成し、次のようにMarkdownの変換処理を記述します。

[import md2html.js](./src/md2html.js)

このモジュールがエクスポートするのは、与えられたオプションをもとにMarkdown文字列をHTMLに変換する関数です。
アプリケーションのエントリポイントである`main.js`では、次のようにこのモジュールをインポートして使用します。

[import main.js](./src/main.js)

markedパッケージや、そのオプションに関する記述がひとつの`md2html`関数に隠蔽され、`main.js`がシンプルになりました。
そして`md2html.js`はアプリケーションから独立したひとつのモジュールとして切り出され、ユニットテストが可能になりました。

## ユニットテスト実行環境を作る

ユニットテストの実行にはさまざまな方法がありますが、
このセクションではテスティングフレームワークとして[Mocha][]を使って、ユニットテストの実行環境を作成します。
Mochaの詳細については、[JavaScript Promiseの本][]よりテストの章を参照してください。

Mochaによるテスト環境を作るために、まずは次のコマンドで`mocha`パッケージをインストールします。

```shell-session
$ npm install --save-dev mocha
```

`--save-dev`オプションは、パッケージを`devDependencies`としてインストールするためのものです。
package.jsonの`devDependencies`には、そのパッケージを開発するときだけ必要な依存ライブラリを記述します。

Mochaをインストールした後、package.jsonの`scripts`を次のように記述します。

```json
{
    "scripts": {
        "test": "mocha"
    }
}
```

この記述により、`npm test`コマンドを実行したときに`mocha`コマンドが呼び出されます。
試しに`npm test`コマンドを実行し、Mochaによるテストが行われることを確認しましょう。
まだ何もテストを書いていないので、`0 passing`と表示されます。


```shell-session
$ npm test
> mocha

 0 passing (2ms)
```

## ユニットテストを記述する

テストの実行環境ができたので、実際にユニットテストを記述します。
Mochaのユニットテストは`test`ディレクトリの中にJavaScriptファイルを配置して記述します。
`test/md2html.js`ファイルを作成し、`md2html.js`に対するユニットテストを次のように記述します。

[import test/md2html.js](./src/test/md2html.js)

`it`関数で定義したユニットテストは、`md2html`関数の変換結果が期待するものになっているかをテストしています。
`test/fixtures`ディレクトリにはユニットテストで用いるファイルを配置しています。
今回は変換元のMarkdownファイルと、期待する変換結果のHTMLファイルの2つが存在します。

ユニットテストを記述したら、もう一度改めて`npm test`コマンドを実行しましょう。1件のテストが通れば成功です。

```shell-session
$ npm test
> mocha

  ✓ converts Markdown to HTML

  1 passing (18ms)
```

[moduleオブジェクト]: https://nodejs.org/api/modules.html#modules_the_module_object
[Mocha]: http://mochajs.org/
[JavaScript Promiseの本]: http://azu.github.io/promises-book/#chapter3-promise-testing
