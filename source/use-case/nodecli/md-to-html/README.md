---
author: laco 
---

# MarkdownをHTMLに変換する

前のセクションではコマンドライン引数で受け取ったファイルを読み込み、標準出力に表示しました。
次は読み込んだMarkdownファイルをHTMLに変換して、その結果を標準出力に表示してみましょう。

## markedパッケージを使う

JavaScriptでMarkdownをHTMLへ変換するために、今回は[marked][]というライブラリを使用します。
markedのパッケージはnpmで配布されているので、commanderと同様に`npm install`コマンドでパッケージをインストールしましょう。

```shell-session
$ npm install --save marked
```

インストールが完了したら、Node.jsのスクリプトから読み込みます。
前のセクションの最後で書いたスクリプトに、markedパッケージの読み込み処理を追加します。

[import main.js](src/main-0.js)

markedパッケージから取得した`marked`オブジェクトは、Markdown文字列を引数に取りHTML文字列を返す関数です。
次のように`readFile`関数で読み込んだファイルの文字列を引数として渡せば、HTMLに変換できます。

[import main.js](src/main-1.js)

## 変換オプションを作成する

markedにはMarkdownの[変換オプション][]があり、オプションの設定によって変換後のHTMLが変化します。
いくつかのオプションについてアプリケーション中でのデフォルトの設定を決め、さらにコマンドライン引数から設定を切り替えられるようにしてみましょう。
今回扱うオプションは次の2つです。

* gfm
* sanitize

### gfmオプション

`gfm`オプションは、GitHubにおけるMarkdownの仕様([GitHub Flavored Markdown][], GFM)に合わせて変換するかを決めるオプションです。
markedのデフォルトでは`true`になっています。GFMは標準的なMarkdownにいくつかの拡張を加えたもので、代表的な拡張がURLの自動リンク化です。
例として、次のようなMarkdownファイルを用意し、先ほどのスクリプトと、`gfm`オプションを`false`にしたスクリプトで結果の違いを見てみましょう。

[import sample.md](src/sample.md)

`gfm`オプションが有効のときは、URLの文字列が自動的に`<a>`タグのリンクに置き換わります。

```html
<h1 id="-">サンプルファイル</h1>
<p>これはサンプルです。
<a href="https://asciidwango.github.io/js-primer/">https://asciidwango.github.io/js-primer/</a></p>
<ul>
<li>サンプル1</li>
<li>サンプル2</li>
</ul>
```

一方、次のように`gfm`オプションを`false`にすると、単なる文字列として扱われ、リンクには置き換わりません。

[import gfmオプションを無効にする](src/main-2.js)

```html
<h1 id="-">サンプルファイル</h1>
<p>これはサンプルです。
https://asciidwango.github.io/js-primer/</p>
<ul>
<li>サンプル1</li>
<li>サンプル2</li>
</ul>
```

自動リンクの他にもいくつかの拡張がありますが、詳しくは[GitHub Flavored Markdown][]のドキュメンテーションを参照してください。

### sanitizeオプション

`sanitize`オプションは出力されるHTMLを安全な形にサニタイズするためのオプションです。
`sanitize`オプションが有効なとき、Markdownファイル中に書かれたHTMLタグはエスケープされ、単なる文字列として出力されます。
例として次のようなMarkdownファイルの変換が`sanitize`オプションによってどう変わるかを見てみましょう。

[import sample.md](src/sample-1.md)

`sanitize`オプションのデフォルト値は`false`なので、何も指定しなければMarkdownファイル中のHTMLはそのまま出力されるHTML中でもタグとして残ります。

```html
<h1 id="-">サンプルファイル</h1>
<p>これはサンプルです。
https://asciidwango.github.io/js-primer/</p>
<p>これはHTMLです</p>

<ul>
<li>サンプル1</li>
<li>サンプル2</li>
</ul>
```

ここで次のように`sanitize`オプションを有効にすると、`<`と`>`がエスケープされてHTMLタグとして機能しなくなります。
自由なHTMLを書かれては困る場合に有用なオプションです。

[import sanitizeオプションを有効にする](src/main-3.js)

```html
<h1 id="-">サンプルファイル</h1>
<p>これはサンプルです。
https://asciidwango.github.io/js-primer/</p>
<p>&lt;p&gt;これはHTMLです&lt;/p&gt;

</p>
<ul>
<li>サンプル1</li>
<li>サンプル2</li>
</ul>
```

### コマンドライン引数からオプションを受け取る

それぞれの変換オプションについて、コマンドライン引数で制御できるようにします。
`gfm`オプションは`--gfm`、`sanitize`オプションは`--sanitize`と`-S`でコマンドラインから設定できるようにします。

<!-- 差分コードなので -->
<!-- doctest:disable -->
```js
program
    .option("--gfm <flag>", "GFMを有効にする")
    .option("-S, --sanitize <flag>", "サニタイズを行う");

program.parse(process.argv);
```

### デフォルト設定を定義する

毎回すべての設定を明示的に入力させるのは不便なので、それぞれの変換オプションのデフォルト設定を定義します。
今回は`gfm`オプションを`true`、`sanitize`オプションを`false`にします。
markedのデフォルト設定と同じですが、アプリケーション側でデフォルト設定を持っておくことで、将来的にmarkedの挙動が変わったときにも影響を受けにくくなります。

markedのオプションはオブジェクトを渡す形式です。
オブジェクトのデフォルト値を明示的な値で上書きするときにはRest/Spreadプロパティを使うと便利です。([オブジェクトのコピー・マージ](../../../basic/object/README.md)を参照)
次のようにデフォルトのオプションを表現したオブジェクトに対して、コマンドライン引数をパースして得られたオブジェクトを上書きします。

<!-- 差分コードなので -->
<!-- doctest:disable -->
```js
const markedOptions = {
    gfm: true,
    sanitize: false,
    ...program
};
```

あとは`markedOptions`オブジェクトからmarkedにオプションを渡すだけです。
スクリプト全体は次のようになります。

[import main.js](src/main-4.js)

定義したコマンドライン引数を使って、Markdownファイルを変換してみましょう。

```shell-session
$ node main.js --gfm false sample.md
$ node main.js -S true sample.md
```

これでMarkdown変換の設定をコマンドライン引数でオプションとして与えられるようになりました。

[marked]: https://github.com/chjj/marked
[変換オプション]: https://github.com/chjj/marked#options-1
[GitHub Flavored Markdown]: https://github.github.com/gfm/