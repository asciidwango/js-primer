---
author: laco 
description: "Node.jsのfsモジュールを使ったファイルの読み込みについて学びます。"
---

# ファイルを読み込む {#read-file}

前のセクションではコマンドライン引数を受け取って、Node.jsのスクリプト中で利用できるようになりました。
このセクションではコマンドライン引数に指定されたファイルを読み込んで、標準出力に表示してみましょう。

## ファイルパスを受け取る {#receive-file-path}

まずは読み込むファイルのパスを受け取ります。

前回のセクションでインストールしたcommanderを使って、コマンドライン引数からファイルパスを取得しましょう。

次のように、`receive-path.js`というファイルを作成しファイルパスを取得して標準出力に表示してみます。
`commanderでパース後に、オプションとして定義していないコマンドライン引数は`program.args`配列から取得できます。

[import title:"receive-path.js"](src/receive-path.js)

このスクリプトを次のように実行すると、引数に与えたファイルパスがそのまま表示されます。

```shell-session
$ node receive-path.js sample.md
sample.md
```

## fsモジュールを使ってファイルを読み込む {#read-file-by-fs}

取得したファイルパスをもとに、ファイルを読み込みます。
Node.jsでファイルの読み書きをおこなうには、標準モジュールの[fsモジュール][]を使います。
まずは読み込むためのファイルを作成しましょう。`sample.md`という名前で`receive-path.js`と同じディレクトリに配置します。

[import title:"sample.md"](src/sample.md)

### fsモジュール {#fs-module}

fsモジュールは、Node.jsでファイルの読み書きをおこなうための基本的な関数を提供するモジュールです。
fsモジュールのメソッドは非同期形式と同期形式の両方が提供されています。

非同期形式の関数は常にコールバック関数を受け取ります。 
コールバック関数の第1引数は必ずその処理で発生したエラーオブジェクトになり、残りの引数は処理の戻り値となります。
処理が成功したときには、第1引数には`null`または`undefined`になります。
一方、同期形式の関数が処理に失敗したときは例外を発生させるので、`try...catch`構文によって例外処理をおこなうことができます。

次のサンプルコードは、指定したファイルを読み込む非同期形式の`readFile`メソッドの例です。

<!-- doctest:disable -->
```js
const fs = require("fs");

fs.readFile("sample.md", (err, file) => {
    if (err) {
        console.error(err);
    } else {
        console.log(file);
    }
});
```

そして、次のサンプルコードは、同じく指定したファイルを読み込む同期形式`readFileSync`メソッドの例です。

<!-- doctest:disable -->
```js
const fs = require("fs");

try {
    const file = fs.readFileSync("sample.md");
} catch (err) { 
    // ファイルが読み込めないなどのエラーが発生したときに呼ばれる
}
```

Node.jsはシングルスレッドなので、他の処理をブロックしにくい非同期形式のAPIを選ぶことがほとんどです。
Node.jsにはfsモジュール以外にも多くの非同期APIがあるので、非同期処理に慣れておきましょう。

### readFile関数を使う {#use-readFile}

fsモジュールの`readFile`メソッドを使いMarkdownファイルを読み込んでみます。
`readFile`関数には引数によってファイルの読み込み方を指定できます。

次の`read-file-1a.js`では、ファイルパスとコールバック関数だけを渡しています。
このときのコールバック関数の第2引数にはファイルの中身を表す`Buffer`インスタンスが渡されます。

[import title:"read-file-1a.js"](src/read-file-1a.js)

`sample.md`を引数に渡した実行結果は次のようになります。
`Buffer`インスタンスはファイルの中身をバイト列として保持しています。
そのため、そのまま`console.log`メソッドに渡しても人間が読める文字列にはなりません。

`read-file-1a.js`に`sample.md`を引数に渡した実行結果は次のようになります。

```shell-session
$ node read-file-1a.js sample.md
<Buffer 23 20 73 61 6d 70 6c 65>
```

`Buffer`インスタンスから文字列を取り出すには、`toString`メソッドを使います。
`Buffer#toString`メソッドはオプショナルな引数として文字エンコーディングを受け取れますが、
何も指定しなかった場合は自動的にUTF-8として変換されます。

次の`read-file-1b.js`では、`readFile`メソッドで読み込んだ`Buffer`インスタンスに対して`toString`メソッドを呼び出しています。
`toString`メソッドを呼び出すことでファイルの中身をUTF-8の文字列へと変換し、その内容をコンソールに出力しています。

[import title:"read-file-1b.js"](src/read-file-1b.js)

`read-file-1b.js`に`sample.md`を引数に渡した実行結果は次のようになります。

```shell-session
$ node read-file-1b.js sample.md
# sample
```

毎回、`Buffer#toString`メソッドを呼び出すのは面倒であるため、`readFile`メソッドの引数で読み込むファイルの文字エンコーディングを指定できます。

次の`read-file-2.js`では、`readFile`関数の第2引数で文字エンコーディング形式として`utf8`を指定することで、UTF-8のファイルとして読み込みます。
このときのコールバック関数の第2引数は、指定した文字エンコーディングでエンコードされた後の文字列が渡されます。

[import title:"read-file-2.js"](src/read-file-2.js)

`read-file-2.js`に`sample.md`を引数に渡した実行結果は次のようになります。

```shell-session
$ node read-file-2.js sample.md
# sample
```

### エラーハンドリング {#error-handling}

先ほどの例のようにfsモジュールのコールバック関数の第1引数には常にエラーオブジェクトが渡されます。
ファイルの読み書きは存在の有無や権限、ファイルシステムの違いなどによって例外が発生しやすいので、必ずエラーハンドリング処理を書きましょう。

次の`read-file-3.js`では、`err`オブジェクトが`null`または`undefined`ではないことだけをチェックするシンプルなエラーハンドリングです。
エラーが発生していたときには表示し、`process.exit`関数に終了ステータスを指定してプロセスで終了しています。
ここでは、一般的なエラーを表す終了ステータスの`1`でプロセスを終了しています。

[import title:"read-file-3.js"](src/read-file-3.js)

`read-file-3.js`を存在しないファイルである`notfound.md`を引数に渡して実行すると、次のようにエラーが発生して終了します。

```shell-session
$ node read-file-3.js notfound.md
Error: ENOENT: no such file or directory, open 'notfound.md'
```

これでコマンドライン引数に指定したファイルを読み込んで標準出力に表示できました。

## このセクションのチェックリスト {#section-checklist}

- commanderを使ってコマンドライン引数からファイルパスを取得した
- fsモジュールの`readFile`関数を使ってファイルを読み込み、ファイルの中身をログ出力した
- `readFile`関数の呼び出しにエラーハンドリング処理を記述した

[fsモジュール]: https://nodejs.org/api/fs.html
[Buffer]: https://nodejs.org/api/buffer.html
