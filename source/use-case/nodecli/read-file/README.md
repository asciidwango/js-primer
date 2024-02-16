---
author: laco
description: "Node.jsの`fs`モジュールを使ったファイルの読み込みについて学びます。"
sponsors: []
---

# ファイルを読み込む {#read-file}

前のセクションではコマンドライン引数からファイルパスを取得して利用できるようになりました。
このセクションでは渡されたファイルパスを元にMarkdownファイルを読み込んで、標準出力に表示してみましょう。

## `fs`モジュールを使ってファイルを読み込む {#read-file-by-fs}

前のセクションで取得できるようになったファイルパスを元に、ファイルを読み込みましょう。
Node.jsでファイルの読み書きを行うには、標準モジュールの[`fs`モジュール][]を使います。
まずは読み込む対象のファイルを作成しましょう。`sample.md`という名前で`main.js`と同じ`nodecli`ディレクトリに配置します。

[import title:"sample.md"](src/sample.md)

### `fs`モジュール {#fs-module}

`fs`モジュールは、Node.jsでファイルの読み書きを行うための基本的な関数を提供するモジュールです。

`fs`モジュールは同期形式と非同期形式の両方が提供されています。
同期APIと非同期APIはどちらも`fs`モジュールに含まれていますが、
非同期形式のAPIは`fs/promises`というモジュール名でも参照できるようになっています。
この書籍では分かりやすさのために、非同期形式のみのAPIを提供する`fs/promises`モジュールを利用します。

Node.jsの標準モジュールは`node:fs`のように`node:`プリフィックスをつけてインポートできます。
プリフィックスを付けない`fs`でもインポートできますが、npmからインストールしたサードパーティ製のモジュールとの区別が明確になるため、付けておくことが推奨されます。

次のコードは、ECMAScriptモジュールの`import * as`構文を使って、`fs/promises` モジュール全体を`fs`オブジェクトとしてインポートしています。

<!-- doctest:disable -->
```js
// fs/promisesモジュール全体を読み込む
import * as fs from "node:fs/promises";
```

もちろん、次のように名前付きインポートを使って、`fs/promises`モジュール全体ではなく一部のAPIだけを利用することもできます。

<!-- doctest:disable -->
```js
// fs/promisesモジュールからreadFile関数を読み込む
import { readFile } from "node:fs/promises";
```

`fs/promises`の非同期APIは、モジュール名からもわかるようにPromiseを返します。
ファイルの読み書きといった非同期処理が成功したときには、返された`Promise`インスタンスがresolveされます。
一方、ファイルの読み書きといった非同期処理が失敗したときには、返された`Promise`インスタンスがrejectされます。

次のサンプルコードは、指定したファイルを読み込む`fs/promises`の`readFile`メソッドの例です。

<!-- doctest:disable -->
```js
// 非同期APIを提供するfs/promisesモジュールを読み込む
import * as fs from "node:fs/promises";

fs.readFile("sample.md").then(file => {
    console.log(file);
}).catch(err => {
    console.error(err);
});
```

そして、次のサンプルコードは、同じく指定したファイルを読み込む`fs`モジュールの`readFileSync`メソッドの例です。
Node.jsでは非同期APIと同期APIがどちらもあるAPIには、分かりやすく`Sync`がメソッド名の末尾に含まれています。

<!-- doctest:disable -->
```js
// 同期APIを提供するfsモジュールを読み込む
import * as fs from "node:fs";

try {
    const file = fs.readFileSync("sample.md");
} catch (err) {
    // ファイルが読み込めないなどのエラーが発生したときに呼ばれる
}
```

Node.jsはシングルスレッドなので、他の処理をブロックしにくい非同期形式のAPIを選ぶことがほとんどです。
Node.jsには`fs/promises`モジュール以外にも多くの非同期APIがあるので、非同期処理に慣れておきましょう。

### readFile関数を使う {#use-readFile}

それでは`fs/promises`モジュールの`readFile`メソッドを使って`sample.md`ファイルを読み込んでみましょう。
次のように`main.js`を変更し、コマンドライン引数から取得したファイルパスを元にファイルを読み込んでコンソールに出力します。

[import title:"main.js"](src/main-1.js)

`sample.md`を引数に渡した実行結果は次のようになります。
文字列になっていないのは、コールバック関数の第二引数はファイルの中身を表す`Buffer`インスタンスだからです。
`Buffer`インスタンスはファイルの中身をバイト列として保持しています。
そのため、そのまま`console.log`メソッドに渡しても人間が読める文字列にはなりません。

```shell
$ node main.js sample.md
<Buffer 23 20 73 61 6d 70 6c 65>
```

`fs.readFile`関数は引数によってファイルの読み込み方を指定できます。
ファイルのエンコードを第二引数であらかじめ指定しておけば、自動的に文字列に変換された状態でコールバック関数に渡されます。
次のように`main.js`を変更し、読み込まれるファイルをUTF-8として変換させます。

[import title:"main.js"](src/main-2.js)

先ほどと同じコマンドをもう一度実行すると、実行結果は次のようになります。
`sample.md`ファイルの中身を文字列として出力できました。

```shell
$ node main.js sample.md
# sample
```

### エラーハンドリング {#error-handling}

ファイルの読み書きは存在の有無や権限、ファイルシステムの違いなどによって例外が発生しやすいので、必ずエラーハンドリング処理を書きましょう。

次のように`main.js`を変更し、`readFile`の返り値であるPromiseオブジェクトに対して`catch`メソッドを追加するだけのシンプルなエラーハンドリングです。
エラーが発生していたときにはエラーメッセージを表示し、`process.exit`関数に終了ステータスを指定してプロセスを終了しています。
ここでは、一般的なエラーを表す終了ステータスの`1`でプロセスを終了しています。

[import title:"main.js"](src/main-3.js)

存在しないファイルである`notfound.md`をコマンドライン引数に渡して実行すると、次のようにエラーが発生して終了します。

```shell
$ node main.js notfound.md
ENOENT: no such file or directory, open 'notfound.md'
```

これでコマンドライン引数に指定したファイルを読み込んで標準出力に表示できました。
次のセクションでは読み込んだMarkdownファイルをHTMLに変換する処理を追加していきます。

## [コラム] Node.jsのエラーファーストコールバック {#node-error-first-callbak}

Node.jsが提供する`fs`モジュールは同期APIと非同期APIを提供するという話を紹介しました。
歴史的な経緯もあり、Node.jsではPromiseとエラーファーストコールバックの2種類の非同期APIを提供しているケースもあります。

`fs/promises`モジュールでは、`readFile`メソッドは、Promiseを返す非同期APIでした。
一方で、`fs`モジュールにも`readFile`メソッドがあり、このAPIはエラーファーストコールバックを扱う非同期APIです。

<!-- doctest:disable -->
```js
// fsモジュールにはエラーファーストコールバックを扱う非同期APIも含まれる
import * as fs from "node:fs/promises";

// エラーファーストコールバックの第1引数にはエラー、第2引数 には結果が入るというルール
fs.readFile("sample.md", (err, file) => {
    if (err) {
        console.error(err.message);
        process.exit(1);
        return;
    }
    console.log(file);
});
```


[エラーファーストコールバック][]については、[非同期][]の章でも紹介しています。
エラーファーストコールバックは、PromisesがECMAScriptに入るES2015より前においては、非同期な処理を扱う方法として広く使われていました。
Node.jsの多くのモジュールは、ES2015より前に作られているため、`fs`モジュールのようにエラーファーストコールバックを扱うAPIもあります。

一方で、Promiseが非同期APIの主流となったため、Node.jsにもPromiseを扱うためのAPIが追加されました。
しかし、すでにエラーファーストコールバックを提供する同じ名前のメソッドがあったため、`fs`に対して`fs/promises`のようにモジュールとして分けて扱えるようになっています。
また、Node.jsではエラーファーストコールバックを受け取る非同期APIをPromiseを返す非同期APIへとラップする`util.promisify`というメソッドも提供しています。

Node.jsでは、歴史的な経緯からエラーファーストコールバックとPromiseのAPIがどちらも提供されていることがあります。
しかしながら、両方が提供されている場合はPromiseのAPIを利用するべきです。
Promiseを扱うAPIには、他のPromiseを扱う処理との連携のしやすさ、Async Functionという構文的なサポート、エラーハンドリングの簡潔さなどのメリットがあります。

## このセクションのチェックリスト {#section-checklist}

- `fs/promises`モジュールの`readFile`関数を使ってファイルを読み込んだ
- UTF-8形式のファイルの中身をコンソールに出力した
- `readFile`関数の呼び出しにエラーハンドリング処理を記述した

[`fs`モジュール]: https://nodejs.org/api/fs.html
[Buffer]: https://nodejs.org/api/buffer.html
[promisify]: https://nodejs.org/api/util.html#utilpromisifyoriginal
[非同期]: ../../../basic/async/README.md
[エラーファーストコールバック]: ../../../basic/async/README.md#error-first-callback
