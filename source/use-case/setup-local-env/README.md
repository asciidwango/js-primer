---
author: laco
---

# アプリケーション開発の準備 {#setup-local-env}

これまでに学んだJavaScriptの基本構文は、実行環境を問わずに使えるものです。
しかしこの後に続くユースケースの章では、具体的な実行環境としてWebブラウザと[Node.js][]の2つを扱います。
また、ブラウザで実行するアプリケーションであっても、その開発にはツールとしてのNode.jsが欠かせません。
このセクションではユースケースの学習へ進むために必要なアプリケーション開発環境の準備をおこないます。

## Node.jsのインストール {#install-nodejs}

[Node.js][]はサーバーサイドJavaScript実行環境のひとつで、次のような特徴があります。

- WebブラウザのChromeと同じ[V8][] JavaScriptエンジンで動作する
- オープンソースで開発されている
- OSを問わずクロスプラットフォームで動作する

Node.jsはサーバーサイドで使うために開発されました。
しかし今ではコマンドラインツールや[Electron][]などにも利用されています。
そのため、Node.jsはサーバーサイドに限らずクライアントサイドのJavaScript実行環境としても幅広く使われています。

Node.jsは多くの他のプログラミング言語と同じように、実行環境をマシンにインストールすることで使用できます。
公式の[ダウンロードページ][]から、開発用のマシンに合わせたインストーラをダウンロードして、インストールしましょう。

Node.jsには**LTS（Long-Term Support）**版と最新版の2つのリリース版が常に存在します。
**LTS（Long-Term Support）**版は2年間のメンテナンスとサポートが宣言されたバージョンです。
具体的には、後方互換性を壊さない範囲でのアップデートと、継続的なセキュリティパッチの提供が行われます。
一方で、最新版はNode.jsの最新の機能を使用できますが、常に最新のバージョンしかメンテナンスされません。
ほとんどのユーザーは、LTS版を用いることが推奨されます。Node.jsでの開発が初めてであれば、迷わずにLTS版のインストーラをダウンロードしましょう。
この章では執筆時点の最新LTS版であるバージョン8.12系で動作するように開発します。

インストールが完了すると、コマンドラインで`node`コマンドが使用可能になっているはずです。
次のコマンドを実行して、インストールされたNode.jsのバージョンを確認しましょう。

```
$ node -v 
v8.12.0
```

また、Node.jsには[npm][]というパッケージマネージャーが同梱されています。
Node.jsをインストールすると、`node`コマンドだけでなくnpmを扱うための`npm`コマンドも使えるようになっています。
次のコマンドを実行して、インストールされたnpmのバージョンを確認しましょう。

```
$ npm -v 
6.4.1
```

npmや`npm`コマンドについての詳細は[公式ドキュメント](https://docs.npmjs.com/)や[npmのGitHubリポジトリ][]を参照してください。
Node.jsのライブラリのほとんどはnpmを使ってインストールできます。
実際に、ユースケースの章ではnpmを使ってライブラリをインストールして利用します。

## npxコマンドによるNPMパッケージの実行 {#npx-execution}

Node.jsのインストールにより、[npx][]というコマンドも使えるようになっています。
`npx`コマンドを使うと、npmのパッケージレジストリで公開されている実行可能なパッケージを、インストール作業なしにコマンドひとつで実行できます。
例として、[@js-primer/hello-world][]というサンプル用のパッケージを`npx`コマンドで実行します。

```
$ npx @js-primer/local-server
npx: 1個のパッケージを7.921秒でインストールしました。
Hello World!
```

ユースケースの章では、アプリケーションをWebブラウザで実行するために必要なローカルサーバーを次のように起動します。
詳しくは[@js-primer/local-serverパッケージ][]を参照してください。

```
$ npx @js-primer/local-server --port 8080
npx: 83個のパッケージを4.379秒でインストールしました。

js-primerのローカルサーバを起動しました。
次のURLをブラウザで開いてください。

  URL: http://localhost:8080
```


[Node.js]: https://nodejs.org/ja/
[V8]: https://developers.google.com/v8/
[Electron]: http://electron.atom.io/
[ダウンロードページ]: https://nodejs.org/ja/download/
[npm]: https://www.npmjs.com/
[npmのGitHubリポジトリ]: https://github.com/npm/npm
[npx]: https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner
[@js-primer/hello-world]: https://github.com/js-primer/hello-world
[@js-primer/local-serverパッケージ]: https://github.com/js-primer/local-server
