---
author: azu
---

# エントリポイント {#entrypoint}

エントリポイントとは、アプリケーションの中で一番最初に呼び出される部分のことです。
アプリケーションを作成するにあたり、まずはエントリポイントを用意しなければなりません。

Webアプリケーションにおいては、常にHTMLドキュメントがエントリポイントとなります。
ウェブブラウザによりHTMLドキュメントが読み込まれたあとに、HTMLドキュメント中で読み込まれたJavaScriptが実行されます。

また、今回作成するTodoアプリは処理をモジュール化し、それぞれのモジュールを別々のJavaScriptとして作成していきます。
それぞれのJavaScriptモジュールをHTMLから別々に読み込むこともできます。
しかし、多くの場合はエントリポイントとなる1つのJavaScriptモジュールを読み込み、
そのJavaScriptから他のモジュールを読み込み利用します。

つまり、今回作成するTodoアプリでは、すべてのエントリポイントとなるHTMLとモジュールをにおけるエントリポイントとなるJavaScriptの2つを用意します。
このセクションでは、この2つのエントリポイントを作成し読み込むところまでを確認します。

## プロジェクトディレクトリを作成 {#project-directory}

今回作成するアプリにはHTMLやCSS、JavaScriptなど複数のファイル必要となります。
そのため、まずそれらを配置するディレクトリを作成します。

任意の名前で問題ありませんが、ここでは`todoapp`という名前のディレクトリを作成します。

## HTMLファイルの用意 {#preparing-html}

エントリポイントとして、まずは最低限の要素だけを配置したHTMLファイルを作成しましょう。
エントリポイントとなるHTMLとして`index.html`を作成し、次のような内容にします。
`body`要素の一番下で`<script>`タグを使い読み込んでいる`index.js`が、今回のアプリケーションの処理を記述するJavaScriptファイルです。

[import index.html](./index.html)

`index.js`には、スクリプトが正しく読み込まれたことを確認できるように、コンソールにログを出力する処理だけを書いておきます。

[import src/index.js](./src/index.js)

次はこのHTMLをブラウザで開きコンソールにログが出力されることを確認していきます。

## ローカルサーバでHTMLを確認する {#local-server}

ウェブブラウザで`index.html`を開くために開発用のローカルサーバーを準備します。
ローカルサーバーを立ち上げずに直接HTMLファイルを開くこともできますが、その場合`file:///`から始まるURLになります。
`file`スキーマでは[Same Origin Policy][]により、JavaScriptモジュールを始め多くのAPIに制限がありアプリケーションは正しく動作しません。
本章はローカルサーバーを立ち上げた上で、`http`スキーマのURLでアクセスすることを前提としています。

コマンドラインで`todoapp`プロジェクトのディレクトリを開き、`npm init`コマンドで`package.json`を作成します。

```shell-session
$ npm init --yes
```

`pacakge.json`ファイルが作成できたら、次はローカルサーバを立ち上げるために`node-static`をインストールします。

<!-- TODO: node-staticのバージョン指定か別モジュールの検討 -->

```
$ npm install --save-dev node-static
```

インストールが完了したら、`package.json`の`scripts`プロパティにローカルサーバを起動するための`start`スクリプトを追加します。
次のような記述をすることで、`npm start`というコマンドを実行時に`node-static`が現在ディレクトリ(`./`)をベースにしたローカルサーバを起動します。

```json
{
    ...
    "scripts": {
        "start": "static ./"
    },
    ...
}
```

`start`スクリプトを追加したら、`npm start`コマンドを実行してローカルサーバを起動してみましょう。

```
$ npm start

> todoapp@1.0.0 start /Users/project/todoapp
> static . -p 3030

serving "." at http://127.0.0.1:3030
```

最後にローカルサーバのURL（`http://127.0.0.1:3030`）にブラウザでアクセスしてみましょう。
ブラウザには`index.html`の内容が表示され、開発者ツールのコンソールに`index.js: loaded`とというログが出力されています。

<!-- ![ログが表示されているWebコンソール](img/fig-1.png) -->

----

### 開発者ツールでのコンソールログの確認方法 {#view-console-log-in-dev-tools}

Console APIで出力したログを確認するには、ウェブブラウザの開発者ツールを開く必要があります。
ほとんどのブラウザで開発者ツールが同梱されていますが、本章ではFirefoxを使って確認します。
開発者ツールの**コンソール**タブを開くと`index.js: loaded`というログが出ていることが確認できれば、`index.js`が正しく読み込まれています。

Firefoxの開発者ツールは次のいずれかの方法で開きます。

- Firefox メニュー（メニューバーがある場合やmacOSでは、ツールメニュー）の Web 開発サブメニューで "Web コンソール" を選択する
- キーボードショートカット`Ctrl+Shift+K`（macOSでは`Command+Option+K`）を押下する

詳細は"[Webコンソールを開く][]"を参照してください。

----

[Same Origin Policy]: https://developer.mozilla.org/ja/docs/Web/Security/Same-origin_policy 
[Webコンソールを開く]: https://developer.mozilla.org/ja/docs/Tools/Web_Console/Opening_the_Web_Console
[npmを使ってパッケージをインストールする]: ../../nodecli/argument-parse/README.md#use-npm
