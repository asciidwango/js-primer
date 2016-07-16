---
author: laco
---

# HTTP通信

アプリケーションが実行できるようになったので、次はGitHubのAPIを呼び出す処理を実装していきます。
当然ですが、GitHubのAPIを呼び出すためにはHTTP通信を行う必要があります。
ウェブブラウザ上でJavaScriptからHTTP通信を行うには`XMLHttpRequest`という機能を使います。

## `XMLHttpRequest`

`XMLHttpRequest`（**XHR**）はクライアントとサーバー間でデータをやり取りするためのAPIです。
XHRを使うことで、ページ全体を再読み込みすることなくURLからデータを取得できます。

GitHubが提供している、ユーザー情報を取得するためのWebAPIを呼び出すコードは次のようになります。
リクエストを送信するためには、まず`XMLHttpRequest`クラスのインスタンスを作ります。
作成したXHRのインスタンスに、リクエストメソッドとURLを与えることで、HTTPリクエストが組み立てられます。
URLをテンプレート文字列にしているのは、変数でユーザーIDを設定するためです。
URLをオープンして組み立てられたXHRは、最後に`send`することでサーバーとの通信を開始します。

```js
const request = new XMLHttpRequest();
request.open("GET", `https://api.github.com/users/${userId}`);
request.send();
```

このように、XHRを使ったHTTP通信は基本的に3ステップで行われます。

1. XHRのインスタンスを生成
2. URLをオープン
3. リクエストを送信

## レスポンスの受け取り

GitHubのAPIに対してHTTPリクエストを送信しましたが、まだレスポンスを受け取る処理を書いていません。
次はサーバーから返却されたレスポンスのログをコンソールに出力する処理を実装します。

非同期的なXHRの場合、レスポンスはXHRが発火するイベントのコールバック内で受け取れます。
実はXHRにはHTTP通信を同期的に実行するモードも存在しますが、一般的にはXHRを同期的に行うことはありません。
なぜならWebブラウザ上で実行されるJavaScriptはシングルスレッドであり、
HTTP通信を行っている間はすべての処理がブロックされてしまうからです。
そもそも本章のテーマでもある**AJAX**の根幹はAsynchronous（非同期的）であることなので、
ここで登場するXHRはすべて非同期的とします。

送信したXHRにHTTPレスポンスが返却されると、`load`イベントが発火します。
イベントのコールバック関数では、コールバック引数の`target`プロパティでXHRのインスタンスを取得できます。
このXHRの`responseText`プロパティには、HTTPレスポンスの文字列がセットされています。
また、`status`プロパティにはHTTPレスポンスのステータスコードがセットされています。

```js
const request = new XMLHttpRequest();
request.open("GET", `https://api.github.com/users/${userId}`);
request.addEventListener("load", (event) => {
    console.log(event.target.status); // => 200
    console.log(event.target.responseText); // => {...}
});
request.send();
```

HTTPレスポンスの内容によらず、`responseText`は常に文字列としてレスポンスを読み取れます。
一方、XHRには`response`というプロパティもあり、こちらはレスポンスの内容に合わせて自動的に型が変わります。
`response`プロパティは便利なAPIなのですが、サーバー側の実装やブラウザの実装などに依存するため、本章では扱いません。
興味があれば、詳細については[XMLHttpRequest.response][]を参照してください。

## エラーハンドリング

HTTP通信にはエラーがつきものです。
もちろんXHRを使った通信においても、エラーをハンドリングする方法があります。
XHRではレスポンスの受け取りと同じように、イベントリスナによってエラーのハンドリングが可能です。
サーバーとの通信に際してエラーが発生した場合は、`error`イベントが発火されます。

```js
request.addEventListener("error", () => {
    console.log("Network Error!");
});
```

注意すべき点は、サーバーがレスポンスとして返却するエラーは、通常のレスポンスと同様に`load`イベントで受け取ることです。
レスポンスが異常である場合の処理は、次のようにレスポンスのステータスコードをもとに行う必要があります。

```js
request.addEventListener("load", (event) => {
    if (event.target.status !== 200) {
        console.log(`Error: ${event.target.status}`);
        return;
    }
});
```

ここまでの内容をまとめ、GitHubからユーザー情報を取得するの関数を`getUserInfo`という名前で定義します。

[import, index.js](src/index.js)

index.jsでは関数を定義しているだけで、呼び出しは行っていません。
ページを読み込むたびにGitHubのAPIを呼び出してしまうと、レートリミットの制限に引っかかるおそれがあります。
そこで`getUserInfo`関数を呼び出すため、HTMLドキュメント側にボタンを追加します。
ボタンのclickイベントで`getUserInfo`関数を呼び出し、固定のユーザーIDを引数として与えています。

[import, index.html](src/index.html)

準備ができたら、ローカルサーバーを立ち上げてindex.htmlにアクセスしましょう。
ボタンを押すとHTTP通信が行われ、コンソールにステータスコードとレスポンスのログが出力されます。

![XHRで取得したデータの表示](img/fig-1.png)

また、開発者ツールのネットワーク画面を開くと、確かにGitHubのサーバーに対してHTTP通信が行われていることを確認できます。

![開発者ツールでHTTP通信の記録を確認する](img/fig-2.png)

[XMLHttpRequest.response]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response