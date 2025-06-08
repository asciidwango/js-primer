---
author: laco
description: "markedパッケージを使ってMarkdownファイルをHTMLに変換します。"
sponsors: []
---

# MarkdownをHTMLに変換する {#md-to-html}

前のセクションではコマンドライン引数で受け取ったファイルを読み込み、標準出力に表示しました。
次は読み込んだMarkdownファイルをHTMLに変換して、その結果を標準出力に表示してみましょう。

## `marked`パッケージをインストールする {#install-marked}

MarkdownをHTMLへ変換するために、今回は[marked][]というライブラリを使用します。
markedのパッケージは[npm][]で配布されているので、`npm install`コマンドを使ってインストールできます。
まだ、`package.json`を作成していない場合は、先に「[Node.jsプロジェクトのセットアップ][]」を参照してください。

それでは、`npm install`コマンドを使って`marked`パッケージをインストールします。
このコマンドの引数にはインストールするパッケージの名前とそのバージョンを`@`記号でつなげて指定できます。
バージョンを指定せずにインストールすれば、その時点での最新の安定版が自動的に選択されます。
次のコマンドを実行して、markedのバージョン15.0をインストールします。[^1]

```shell
$ npm install marked@15.0
```

インストールが完了すると、`package.json`ファイルは次のようになっています。

[import, title:"package.json"](src/package.json)

また、`npm install`をすると同時に`package-lock.json`ファイルが生成されています。
このファイルはnpmがインストールしたパッケージの、実際のバージョンを記録するためのものです。
先ほどmarkedのバージョンを`15.0`としましたが、実際にインストールされるのは`15.0.x`に一致する最新のバージョンです。
`package-lock.json`ファイルには実際にインストールされたバージョンが記録されています。
これによって、再び`npm install`を実行したときに、異なるバージョンがインストールされるのを防ぎます。

インストールが完了したら、Node.jsのスクリプトから読み込みます。
前のセクションの最後で書いたスクリプトに、`marked`モジュールの読み込み処理を追加しましょう。
次のように`main.js`を変更し、読み込んだMarkdownファイルをmarkedを使ってHTMLに変換します。
`marked`モジュールからインポートした`marked.parse`関数は、Markdown文字列を引数にとり、HTML文字列に変換して返します。

[import title:"main.js"](src/main-1.js)

## 変換オプションを作成する {#create-convert-option}

markedにはMarkdownの[変換オプション][]があり、オプションの設定によって変換後のHTMLが変化します。
そこで、アプリケーション中でオプションのデフォルト値を決め、さらにコマンドライン引数から設定を切り替えられるようにしてみましょう。

今回のアプリケーションでは、例として`gfm`というmarkedのオプションを扱います。

### gfmオプション {#gfm-option}

`gfm`オプションは、GitHubにおけるMarkdownの仕様（[GitHub Flavored Markdown][], GFM）に合わせて変換するかを決めるオプションです。
markedではこの`gfm`オプションがデフォルトで`true`になっています。GFMは標準的なMarkdownにいくつかの拡張を加えたもので、代表的な拡張がURLの自動リンク化です。
次のように`sample.md`を変更し、先ほどのスクリプトと`gfm`オプションを`false`にしたスクリプトで結果の違いを見てみましょう。

[import, title:"sample.md"](src/sample.md)

`gfm`オプションが有効のときは、URLの文字列が自動的に`<a>`タグのリンクに置き換わります。

```html
<h1>サンプルファイル</h1>
<p>これはサンプルです。
<a href="https://jsprimer.net/">https://jsprimer.net/</a></p>
<ul>
<li>サンプル1</li>
<li>サンプル2</li>
</ul>
```

一方、次のように`gfm`オプションを`false`にすると、単なる文字列として扱われ、リンクには置き換わりません。

[import title:"main.js"](src/main-2.js)

```html
<h1>サンプルファイル</h1>
<p>これはサンプルです。
https://jsprimer.net/</p>
<ul>
<li>サンプル1</li>
<li>サンプル2</li>
</ul>
```

自動リンクのほかにもいくつかの拡張がありますが、詳しくは[GitHub Flavored Markdown][]のドキュメントを参照してください。

### コマンドライン引数からオプションを受け取る {#receive-option}

次に、`gfm`オプションをコマンドライン引数で制御できるようにしましょう。
アプリケーションのデフォルトでは`gfm`オプションを無効にした上で、次のように`--gfm`フラグを付与してコマンドを実行できるようにします。

```shell
$ node main.js --gfm sample.md
```

コマンドライン引数で`--gfm`のようなフラグを扱いたいときには、`parseArg`関数の`options`オブジェクトに定義します。
`options`オブジェクトでは、`--key=value`のようなオプションを扱う`type: "string"`と、`--flag`のようなフラグを扱う`type: "boolean"`を定義できます。
今回の`--gfm`フラグは`type: "boolean"`で定義し、`--gfm`フラグがない場合のデフォルト値を`false`に設定します。

次のように`gfm`フラグを定義してからコマンドライン引数をパースすると、返り値の`values`でパース結果のオブジェクトを取得できます。

<!-- 差分コードなので -->
<!-- doctest:disable -->
```js
const {
    values,
    positionals
} = util.parseArgs({
    allowPositionals: true,
    options: {
        // gfmフラグを定義する
        gfm: {
            // オプションの型をbooleanに指定
            type: "boolean",
            // --gfmフラグがない場合のデフォルト値をfalseにする
            default: false,
        }
    }
});
// valuesにはオプションのパース結果がオブジェクトとして格納される
console.log(values.gfm); // --gfmフラグがあればtrue、なければfalseとなる
```

`--gfm`フラグは、ファイルパスを指定する`sample.md`の前後のどちらについていても動作します。
なぜなら`positionals`配列には、`options`オブジェクトで定義したオプションのパース結果は含まれないためです。
`process.argv`配列を直接使っているとこのようなオプションの処理が面倒なので、`parseArg`関数のようなパース処理を挟むのが一般的です。

最後に、`main.js`を次のように変更して、`--gfm`フラグを使って`gfm`オプションを切り替えられるようにします。

[import title:"main.js"](src/main-3.js)

実際にMarkdownファイルを渡して、動作を確認してみましょう。

```shell
$ node main.js sample.md
<h1>サンプルファイル</h1>
<p>これはサンプルです。
https://jsprimer.net/</p>
<ul>
<li>サンプル1</li>
<li>サンプル2</li>
</ul>
```

また、`--gfm`フラグを付与して実行すると次のように出力されるはずです。
GFMオプションが有効になっているため、URLがリンクに変換されていることが確認できます。

```shell
$ node main.js --gfm sample.md
<h1>サンプルファイル</h1>
<p>これはサンプルです。
<a href="https://jsprimer.net/">https://jsprimer.net/</a></p>
<ul>
<li>サンプル1</li>
<li>サンプル2</li>
</ul>
```

これでMarkdown変換の設定をコマンドライン引数で与えられるようになりました。
次のセクションではアプリケーションのコードを整理し、最後にユニットテストを導入します。

### [コラム] `node:` プリフィックス {#node-prefix}

Node.jsの標準モジュールは、`node:util`や`node:fs`のように`node:`というプリフィックスがモジュール名についています。
この`node:`プリフィックスは後から導入された仕組みであるため、`util`や`fs`のようにプリフィックスなしでもモジュールを読み込むことができます。

しかしながら、`node:`プリフィックスがあることでnpmからインストールしたサードパーティ製のモジュールとの区別が明確になるため、付けておくことが推奨されます。

## このセクションのチェックリスト {#section-checklist}

- markedパッケージを使ってMarkdown文字列をHTML文字列に変換した
- コマンドライン引数でmarkedの変換オプションを設定した
- `--gfm`フラグを使って、Markdownの変換結果が変わることを確認した

[npm]: https://www.npmjs.com/
[marked]: https://github.com/markedjs/marked
[変換オプション]: https://marked.js.org/#/USING_ADVANCED.md#options
[GitHub Flavored Markdown]: https://github.github.com/gfm/
[Nullish coalescing演算子]: ../../../basic/operator/README.md#nullish-coalescing-operator
[オブジェクト]: ../../../basic/object/README.md
[Node.jsプロジェクトのセットアップ]: ../helloworld/README.md#setup-nodejs-project
[^1]: --saveオプションをつけてインストールしたのと同じ意味。npm 5.0.0からは--saveがデフォルトオプションとなりました。
