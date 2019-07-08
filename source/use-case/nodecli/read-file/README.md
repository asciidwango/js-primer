---
author: laco 
description: "Node.jsのfsモジュールを使ったファイルの読み込みについて学びます。"
---

# ファイルを読み込む {#read-file}

前のセクションではコマンドライン引数を受け取って、Node.jsのスクリプト中で利用できるようになりました。
このセクションではコマンドライン引数に指定されたファイルを読み込んで、標準出力に表示してみましょう。

## ファイルパスを受け取る {#receive-file-path}

まずは読み込むファイルのパスを受け取ります。前回のセクションでインストールしたcommanderを使って、コマンドライン引数からファイルパスを取得しましょう。
オプションでないコマンドライン引数は`program.args`配列から取得できます。
次のように、ファイルパスを取得して標準出力に表示します。

[import receive-path.js](src/receive-path.js)

このスクリプトを次のように実行すると、引数に与えたファイルパスがそのまま表示されます。

```shell-session
$ node receive-path.js sample.md
sample.md
```

## fsモジュールを使ってファイルを読み込む {#read-file-by-fs}

取得したファイルパスをもとに、ファイルを読み込みます。
Node.jsでファイルの読み書きをおこなうには、標準モジュールの[fsモジュール][]を使います。
まずは読み込むためのファイルを作成しましょう。`sample.md`という名前で`receive-path.js`と同じディレクトリに配置します。

[import sample.md](src/sample.md)

### fsモジュール {#fs-module}

fsモジュールは、Node.jsでファイルの読み書きをおこなうための基本的な関数を提供するモジュールです。
すべての関数は非同期形式と同期形式の両方が提供されています。
非同期形式の関数は常にコールバック関数を受け取ります。 
コールバック関数の第1引数は必ずその処理で発生したエラーオブジェクトになっていて、処理の戻り値などがその後ろの引数につづきます。
処理が成功したときには、第1引数は`null`または`undefined`になります。
一方、同期形式の関数が処理に失敗したときは例外を発生させるので、try...catch文によって例外処理をおこなうことができます。

次のサンプルコードは非同期形式の関数の例です。

<!-- doctest:disable -->
```js
const fs = require("fs");

fs.readFile("sample.md", (err, file) => {
});
```

そして、次のサンプルコードは同じ関数の同期形式の例です。

<!-- doctest:disable -->
```js
const fs = require("fs");

try {
    const file = fs.readFileSync("sample.md");
} catch (err) { 
}
```

Node.jsはシングルスレッドなので、ノンブロッキング処理である非同期形式のAPIを選ぶことがほとんどです。
Node.jsにはfsモジュール以外にも多くの非同期APIがあるので、非同期処理に慣れておきましょう。

### readFile関数を使う {#use-readFile}

ファイルを読み込むには、fsモジュールの`readFile`関数を使います。
`readFile`関数にはいくつかのオーバーロードがあります。
次の例では、ファイルパスとコールバック関数だけを渡していますが、
このときのコールバック関数の第2引数は`Buffer`インスタンスになります。

[import read-file-1a.js](src/read-file-1a.js)

`sample.md`を引数に渡した実行結果は次のようになります。
`Buffer`インスタンスはファイルの中身をバイト列として保持していて、そのまま`console.log`関数に渡しても人間が読める文字列にはなりません。

```shell-session
$ node read-file-1a.js sample.md
<Buffer 23 20 73 61 6d 70 6c 65>
```

`Buffer`インスタンスから文字列を取り出すには、`toString`メソッドを使います。
`toString`メソッドはオプショナルな引数として文字エンコーディングを受け取れますが、
何も指定しなかった場合は自動的にUTF-8として変換されます。
次の例ではコールバック関数の中で`toString`メソッドを呼び出して、ファイルの中身をUTF-8の文字列として表示します。

[import read-file-1b.js](src/read-file-1b.js)

`sample.md`を引数に渡した実行結果は次のようになります。

```shell-session
$ node read-file-1b.js sample.md
# sample
```

ちなみに、次の例のように`readFile`関数の第2引数で文字エンコーディング形式を指定できます。
このときのコールバック関数の第2引数は、指定した文字エンコーディングでエンコードされた後の文字列が渡されます。

[import read-file-2.js](src/read-file-2.js)

`sample.md`を引数に渡した実行結果は次のようになります。

```shell-session
$ node read-file-2.js sample.md
# sample
```

### エラーハンドリング {#error-handling}

先述のとおり、fsモジュールのコールバック関数の第1引数には常にエラーオブジェクトが渡されます。
ファイルの読み書きは存在の有無や権限、ファイルシステムの違いなどによって例外が発生しやすいので、必ずエラーハンドリング処理を書きましょう。
次の例は`err`オブジェクトが`null`または`undefined`ではないことだけをチェックするシンプルなエラーハンドリングです。
エラーが発生していたときには表示し、`process.exit`関数を使って実行しているプロセスを異常終了させています。

[import read-file-3.js](src/read-file-3.js)

存在しないファイルである`notfound.md`を引数に渡すと、次のようにエラーが発生して終了します。

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
