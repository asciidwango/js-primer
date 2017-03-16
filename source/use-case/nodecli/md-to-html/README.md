---
author: laco 
---

# MarkdownをHTMLに変換する

前のセクションではコマンドライン引数で受け取ったファイルを読み込み、標準出力に表示しました。
次は読み込んだMarkdownファイルをHTMLに変換して、その結果を標準出力に表示してみましょう。

## markedパッケージを使う

JavaScriptでMarkdownをHTMLに変換するために、今回は[marked][]というライブラリを使用します。
markedのパッケージはnpmで配布されているので、commanderと同様に`npm install`コマンドでパッケージをインストールしましょう。

```shell-session
$ npm install --save marked
```

インストールが完了したら、Node.jsのスクリプトから読み込みます。
前のセクションの最後に書いたスクリプトに、markedパッケージの読み込み処理を追加します。

[import main.js](src/main-0.js)


## 変換オプションを作成する

[marked]: https://github.com/chjj/marked