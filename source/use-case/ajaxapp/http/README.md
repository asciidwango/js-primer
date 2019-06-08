---
author: laco
description: "Fetch APIを使ってHTTP通信をおこない、GitHubのAPIを呼び出します。"
---

# HTTP通信 {#http-communication}

アプリケーションが実行できるようになったので、次はGitHubのAPIを呼び出す処理を実装していきます。
当然ですが、GitHubのAPIを呼び出すためにはHTTP通信をする必要があります。
ウェブブラウザ上でJavaScriptからHTTP通信するために、[Fetch API][]という機能を使います。

## Fetch API {#fetch-api}

**Fetch API**はクライアントとサーバー間でデータをやり取りするためのAPIです。
Fetch APIを使うことで、ページ全体を再読み込みすることなくURLからデータを取得できます。

GitHubが提供している、ユーザー情報を取得するためのWebAPIを呼び出すコードは次のようになります。
リクエストを送信するためには、グローバルスコープの`fetch()`メソッドを呼び出します。
`fetch()`メソッドにURLを与えることで、HTTPリクエストが作成され、サーバーとのHTTP通信を開始します。


<!-- fetchがないため -->
<!-- doctest:disable -->
```js
fetch(`https://api.github.com/users/${userId}`);
```

## レスポンスの受け取り {#receive-response}

GitHubのAPIに対してHTTPリクエストを送信しましたが、まだレスポンスを受け取る処理を書いていません。
次はサーバーから返却されたレスポンスのログをコンソールに出力する処理を実装します。

`fetch()`メソッドはリクエストのレスポンスを表す`Response`オブジェクトの`Promise`を返します 。
送信したリクエストにレスポンスが返却されると、`then`コールバックが呼び出されます。
次のように、`Response`オブジェクトの`status`プロパティからはHTTPレスポンスのステータスコードが取得できます。
また、`json()`メソッドは HTTPレスポンスをJSONとしてパースし、そのオブジェクトを `Promise`で返します。

<!-- fetchがないため -->
<!-- doctest:disable -->
```js
fetch(`https://api.github.com/users/${userId}`)
    .then(response => {
        console.log(response.status); // => 200
        response.json().then(userInfo => {
            console.log(userInfo); // => {...}
        });
    });
```

## エラーハンドリング {#error-handling}

HTTP通信にはエラーがつきものです。
もちろんFetch APIを使った通信においても、エラーをハンドリングする方法があります。
サーバーとの通信に際してネットワークエラーが発生した場合は、`Promise`の中で例外が投げられます。
すなわち、`then`メソッドの第2引数か`catch`メソッドのコールバック関数が呼び出されます。

<!-- fetchがないため -->
<!-- doctest:disable -->
```js
fetch(`https://api.github.com/users/${userId}`)
    .then(response => {
        console.log(response.status);
        response.json().then(userInfo => {
            console.log(userInfo);
        });
    }).catch(error => {
        console.error("ネットワークエラー", error);
    });
```

一方で、リクエストがサーバーへ正常に届いたあと、ステータスコード400や500などでレスポンスされたときのサーバーエラーは、`Response`オブジェクトの`ok`プロパティで認識できます。
`ok`プロパティは、HTTPステータスコードが200番台であれば `true`を返します。
次のように、`ok`プロパティが`false`であるでサーバーエラーをハンドリングできます。

<!-- fetchがないため -->
<!-- doctest:disable -->
```js
fetch(`https://api.github.com/users/${userId}`)
    .then(response => {
        console.log(response.status); 
        // エラーレスポンスが返されたことを検知する
        if (!response.ok) {
            console.error("サーバーエラー", response);
        } else {
            response.json().then(userInfo => {
                console.log(userInfo);
            });
        }
    }).catch(error => {
        console.error("ネットワークエラー", error);
    });
```

ここまでの内容をまとめ、GitHubからユーザー情報を取得する関数を`getUserInfo`という名前で定義します。

[import, index.js](src/index.js)

index.jsでは関数を定義しているだけで、呼び出しは行っていません。
ページを読み込むたびにGitHubのAPIを呼び出してしまうと、呼び出し回数の制限を超えてしまうおそれがあります。
そこで`getUserInfo`関数を呼び出すため、HTMLドキュメント側にボタンを追加します。
ボタンのclickイベントで`getUserInfo`関数を呼び出し、固定のユーザーIDを引数として与えています。

[import, index.html](src/index.html)

準備ができたら、ローカルサーバーを立ち上げてindex.htmlにアクセスしましょう。
ボタンを押すとHTTP通信が行われ、コンソールにステータスコードとレスポンスのログが出力されます。

![Fetchで取得したデータの表示](img/fig-1.png)

また、開発者ツールのネットワーク画面を開くと、確かにGitHubのサーバーに対してHTTP通信が行われていることを確認できます。

![開発者ツールでHTTP通信の記録を確認する](img/fig-2.png)


[Fetch API]: https://developer.mozilla.org/ja/docs/Web/API/Fetch_API
