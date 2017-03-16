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

[marked]: https://github.com/chjj/marked