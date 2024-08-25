---
author: laco
description: "ユニットテストの導入とソースコードのモジュール化を行います。"
sponsors: []
---

# ユニットテストを記述する {#unit-test}

このセクションでは、これまで作成したCLIアプリケーションにユニットテストを導入します。
ユニットテストの導入と合わせて、ソースコードを整理してテストがしやすくなるようにモジュール化します。

前のセクションまでは、すべての処理をひとつのJavaScriptファイルに記述していました。
ユニットテストを行うためにはテスト対象がモジュールとして分割されていなければいけません。
今回のアプリケーションでは、CLIアプリケーションとしてコマンドライン引数を処理する部分と、MarkdownをHTMLへ変換する部分に分割します。

## アプリケーションをモジュールに分割する {#split-script}

実際にアプリケーションのモジュール化をする前に、[ECMAScriptモジュール][]におけるエクスポートについて簡単に振り返ります。

ECMAScriptモジュールでは`export`文を使って変数や関数などのオブジェクトをエクスポートし、他のスクリプトから利用できるようにします。
次の`greet.js`というファイルは、`greet`関数をエクスポートするモジュールの例です。

[import, title:"greet.js"](src/example/greet.js)

このモジュールを利用する側では、`import`文を使って指定したファイルパスのJavaScriptファイルをインポートできます。
次のコードでは先ほどの`greet.js`のパスを指定してモジュールとしてインポートして、エクスポートされた`greet`関数を利用しています。

[import, title:"greet-main.js"](src/example/greet-main.js)

これから行うアプリケーションのモジュール化とは、このようにアプリケーションの一部分を別のファイルに切り出した上で、必要なオブジェクトをエクスポートして外部から利用可能にするということです。
機能をモジュールとして切り出すことで、アプリケーションとユニットテストの両方から利用できるようになります。

それではCLIアプリケーションのソースコードをモジュールに分割してみましょう。
`md2html.js`という名前のJavaScriptファイルを作成し、次のようにmarkedを使ったMarkdownの変換処理を記述します。

[import title:"md2html.js"](./src/md2html.js)

このモジュールがエクスポートするのは、与えられたオプションを元にMarkdown文字列をHTMLに変換する関数です。
アプリケーションのエントリーポイントである`main.js`では、次のようにこのモジュールをインポートして使用します。

[import title:"main.js"](./src/main.js)

markedパッケージや、そのオプションに関する記述がひとつの`md2html`関数に隠蔽され、`main.js`がシンプルになりました。
そして`md2html.js`はアプリケーションから独立したひとつのモジュールとして切り出され、ユニットテストが可能になりました。

## ユニットテスト実行環境を作る {#create-env}

ユニットテストの実行にはさまざまな方法があります。
このセクションではNode.jsの標準モジュールのひとつである[testモジュール][]から提供される`test`を使って、ユニットテストの実行環境を作成します。
`test`関数はその内部でエラーが発生したとき、そのテストを失敗として扱います。
つまり、期待する結果と異なるならエラーを投げ、期待どおりならエラーを投げないというテストコードを書くことになります。

今回はNode.jsの標準モジュールのひとつである[assertモジュール][]から提供される`assert.strictEqual`メソッドを利用します。
`assert.strictEqual`メソッドは第一引数と第二引数の評価結果が`===`で比較して異なる場合に、例外を投げる関数です。

ユニットテストを実行するには、Node.jsが提供する`node`コマンドの`--test`オプションを使います。
`package.json`の`scripts`プロパティには、次のように記述します。

```json
{
    ...
    "scripts": {
        "test": "node --test"
    },
    ...
}
```

この記述により、`npm test`コマンドを実行すると、`node --test`で`test/`ディレクトリにあるテストファイルを実行します。実行時にディレクトリの指定を省いていますが、`node --test`はデフォルトで`test/`ディレクトリを探索するようになってます。
試しに`npm test`コマンドを実行し、テストが行われることを確認しましょう。
まだテストファイルを作っていないので、0個のテストが実行されて正常終了します。

```shell
$ npm test

> test
> node --test

ℹ tests 0
ℹ suites 0
ℹ pass 0
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 7.3243
```

## ユニットテストを記述する {#write-unit-test}

テストの実行環境ができたので、実際にユニットテストを記述します。
記述する際には、`test`ディレクトリの中にJavaScriptファイルを配置します。
`test/md2html-test.js`ファイルを作成し、`md2html.js`に対するユニットテストを次のように記述します。

`test`関数は第一引数にテストのタイトルを入れ、第二引数にテストの内容を書きます。

[import, title:"test/md2html-test.js"](./src/test/md2html-test.js)

`test`関数で定義したユニットテストは、`md2html`関数の変換結果が期待するものになっているかをテストしています。
`test/fixtures`ディレクトリにはユニットテストで用いるファイルを配置しています。
今回は変換元のMarkdownファイルと、期待する変換結果のHTMLファイルが存在します。

次のように変換元のMarkdownファイルを`test/fixtures/sample.md`に配置します。

[import, title:"test/fixtures/sample.md"](./src/test/fixtures/sample.md)

そして、期待する変換結果のHTMLファイルも`test/fixtures`ディレクトリに配置します。
`gfm`オプションの有無にあわせて、`expected.html`と`expected-gfm.html`の2つを次のように作成しましょう。

[import, title:"test/fixtures/expected.html"](./src/test/fixtures/expected.html)

[import, title:"test/fixtures/expected-gfm.html"](./src/test/fixtures/expected-gfm.html)

ユニットテストの準備ができたら、もう一度改めて`npm test`コマンドを実行しましょう。2件のテストが通れば成功です。

```shell
$ npm test

> test
> node --test

✔ converts Markdown to HTML (GFM=false) (12.2419ms)
✔ converts Markdown to HTML (GFM=true) (4.4282ms)
ℹ tests 2
ℹ suites 0
ℹ pass 2
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 63.881902
```

ユニットテストが通らなかった場合は、次のことを確認してみましょう。

- `test/fixtures`ディレクトリに`sample.md`と`expected.html`、`expected-gfm.html`というファイルを作成したか
- それぞれのファイルは文字コードがUTF-8で、改行コードがLFになっているか
- それぞれのファイルに余計な文字が入っていないか

たとえば、`npm test`を実行して次のようにテストが失敗している場合のエラーメッセージを見てみましょう。

```shell
$ npm test

> test
> node --test

✔ converts Markdown to HTML (GFM=false) (11.568601ms)
✖ converts Markdown to HTML (GFM=true) (5.6456ms)
  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
  + actual - expected ... Lines skipped
  
    '<h1>サンプルファイル</h1>\n' +
      '<p>これはサンプルです。\n' +
  ...
      '<li>サンプル1</li>\n' +
      '<li>サンプル2</li>\n' +
  +   '</ul>'
  -   '</ul>\n' +
  -   ';;;'
      at TestContext.<anonymous> (file:///Users/laco/nodecli/test/md2html-test.js:29:10)
      at async Test.run (node:internal/test_runner/test:632:9)
      at async Test.processPendingSubtests (node:internal/test_runner/test:374:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: '<h1>サンプルファイル</h1>\n<p>これはサンプルです。\n<a href="https://jsprimer.net/">https://jsprimer.net/</a></p>\n<ul>\n<li>サンプル1</li>\n<li>サンプル2</li>\n</ul>',
    expected: '<h1>サンプルファイル</h1>\n<p>これはサンプルです。\n<a href="https://jsprimer.net/">https://jsprimer.net/</a></p>\n<ul>\n<li>サンプル1</li>\n<li>サンプル2</li>\n</ul>\n;;;',
    operator: 'strictEqual'
  }

ℹ tests 2
ℹ suites 0
ℹ pass 1
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 64.548503

✖ failing tests:

test at file:/Users/laco/nodecli/test/md2html-test.js:21:1
✖ converts Markdown to HTML (GFM=true) (5.6456ms)
  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
  + actual - expected ... Lines skipped
  
    '<h1>サンプルファイル</h1>\n' +
      '<p>これはサンプルです。\n' +
  ...
      '<li>サンプル1</li>\n' +
      '<li>サンプル2</li>\n' +
  +   '</ul>'
  -   '</ul>\n' +
  -   ';;;'
      at TestContext.<anonymous> (file:///Users/laco/nodecli/test/md2html-test.js:29:10)
      at async Test.run (node:internal/test_runner/test:632:9)
      at async Test.processPendingSubtests (node:internal/test_runner/test:374:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: '<h1>サンプルファイル</h1>\n<p>これはサンプルです。\n<a href="https://jsprimer.net/">https://jsprimer.net/</a></p>\n<ul>\n<li>サンプル1</li>\n<li>サンプル2</li>\n</ul>',
    expected: '<h1>サンプルファイル</h1>\n<p>これはサンプルです。\n<a href="https://jsprimer.net/">https://jsprimer.net/</a></p>\n<ul>\n<li>サンプル1</li>\n<li>サンプル2</li>\n</ul>\n;;;',
    operator: 'strictEqual'
  }
```

このテスト結果では `converts Markdown to HTML (GFM=true)` というタイトルのテストが1つ失敗していることがわかります。
また、`+ actual - expected `には、`assert.strictEqual`で比較した結果が一致していない部分が表示されています。
この場合は、expected（期待する結果）の末尾に`;;;`という不要な文字列が入ってしまっているのが、テストが失敗している理由です。
そのため、`expected-gfm.html`ファイルを確認し不要な`;;;`という文字列を取り除けば、テストが通るようになるはずです。

## なぜユニットテストを行うのか {#reason-for-unit-test}

ユニットテストを実施することには多くの利点があります。
早期にバグが発見できることや、安心してリファクタリングを行えるようになるのはもちろんですが、
ユニットテストが可能な状態を保つこと自体に意味があります。
実際にテストを行わなくてもテストしやすいコードになるよう心がけることが、アプリケーションを適切にモジュール化する指針になります。

またユニットテストには生きたドキュメントとしての側面もあります。
ドキュメントはこまめにメンテナンスされないとすぐに実際のコードと齟齬が生まれてしまいますが、
ユニットテストはそのモジュールが満たすべき仕様を表すドキュメントとして機能します。

ユニットテストの記述は手間がかかるだけのようにも思えますが、
中長期的にアプリケーションをメンテナンスする場合にはかかせないものです。
そしてよいテストを書くためには、日頃からテストを書く習慣をつけておくことが重要です。

## まとめ {#unit-test-summary}

このユースケースの目標であるNode.jsを使ったCLIアプリケーションの作成と、ユニットテストの導入ができました。
npmを使ったパッケージ管理や外部モジュールの利用、`fs`モジュールを使ったファイル操作など、多くの要素が登場しました。
これらはNode.jsアプリケーション開発においてほとんどのユースケースで応用されるものなので、よく理解しておきましょう。

## このセクションのチェックリスト {#section-checklist}

- Markdownの変換処理をECMAScriptモジュールとして`md2html.js`に切り出し、`main.js`から読み込んだ
- `npm test`コマンドで`node --test`が実行できることを確認した
- `md2html`関数のユニットテストを作成し、テストの実行結果を確認した

[ECMAScriptモジュール]: ../../../basic/module/README.md
[moduleオブジェクト]: https://nodejs.org/api/modules.html#modules_the_module_object
[testモジュール]: https://nodejs.org/api/test.html
[assertモジュール]: https://nodejs.org/api/assert.html
