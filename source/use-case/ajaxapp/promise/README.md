---
author: laco
description: "Promiseを活用し、ソースコードの整理とエラーハンドリングを行います。"
---

# Promiseを活用する {#use-promise}

ここまでのセクションで、Fetch APIを使ってAjax通信を行い、サーバーから取得したデータを表示できました。
最後に、Fetch APIの戻り値でもある**Promise**を活用してソースコードを整理することで、エラーハンドリングをしっかり行います。

## 関数の分割 {#split-function}

まずは、大きくなりすぎた`getUserInfo`関数を整理しましょう。
この関数では、Fetch APIを使ったデータの取得・HTML文字列の組み立て・組み立てたHTMLの表示をしています。
そこで、HTML文字列を組み立てる`createView`関数とHTMLを表示する`displayView`関数を作り、処理を分割します。

また、後述するエラーハンドリングを行いやすくするため、アプリケーションにエントリポイントを設けます。
index.jsに新しく`main`関数を作り、その中で`getUserInfo`関数を呼び出すようにします。

<!-- doctest:async:16 -->
```js
function main() {
    getUserInfo("js-primer-example");
}

function getUserInfo(userId) {
    fetch(`https://api.github.com/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                console.error("サーバーエラー", response);
            } else {
                return response.json().then(userInfo => {
                    // HTMLの組み立て
                    const view = createView(userInfo);
                    // HTMLの挿入
                    displayView(view);
                });
            }
        }).catch(error => {
            console.error("ネットワークエラー", error);
        });
}

function createView(userInfo) {
    return escapeHTML`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
    <dl>
        <dt>Location</dt>
        <dd>${userInfo.location}</dd>
        <dt>Repositories</dt>
        <dd>${userInfo.public_repos}</dd>
    </dl>
    `;
}

function displayView(view) {
    const result = document.getElementById("result");
    result.innerHTML = view;
}
```

ボタンのclickイベントで呼び出す関数もこれまでの`getUserInfo`関数から`main`関数に変更します。

```html
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>Ajax Example</title>
  </head>
  <body>
    <h2>GitHub User Info</h2>
    <button onclick="main();">Get user info</button>
    <div id="result"></div>
    <script src="index.js"></script>
  </body>
</html>
```

## Promiseのエラーハンドリング {#error-handling}

`getUserInfo`関数で作成したPromiseのオブジェクトをreturnすると、それを呼び出す`main`関数の方で非同期処理の結果を扱えるようになります。
Promiseのコンテキスト内で投げられたエラーは、`Promise#catch`メソッドを使って一箇所で受け取れます。

次のコードでは、`getUserInfo`関数から返されたPromiseオブジェクトを、`main`関数でエラーハンドリングしてログを出力します。
`getUserInfo`関数ではネットワークエラーとサーバーエラーを投げています。
投げられたエラーは`catch`のコールバック関数で第1引数として受け取れます。

<!-- doctest:async:16 -->
```js
function main() {
    getUserInfo("js-primer-example")
        .catch((error) => {
            // Promiseのコンテキスト内で発生したエラーを受け取る
            console.error(`エラーが発生しました (${error})`);
        });
}

function getUserInfo(userId) {
    return fetch(`https://api.github.com/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                // サーバーエラーを投げる
                throw new Error(`${event.target.status}: ${event.target.statusText}`);
            } else {
                return response.json().then(userInfo => {
                    // HTMLの組み立て
                    const view = createView(userInfo);
                    // HTMLの挿入
                    displayView(view);
                });
            }
        }).catch(error => {
            // ネットワークエラーを投げる
            throw new Error("ネットワークエラー");
        });
}
```

### Promiseチェーンへの置き換え {#rewrite-to-promise-chain}

Promiseは`Promise#then`メソッドを使うことで、複数の処理の連鎖を表現できます。
複数の処理を`then`で分割し、連鎖させたものを、ここでは**[Promiseチェーン][]**と呼びます。
基本的に、`then`はコールバック関数の戻り値をそのまま次の`then`へ渡します。
ただし、コールバック関数の戻り値がPromiseである場合はその完了を待ち、Promiseの結果の値を次の`then`に渡します。
つまり、`then`のコールバック関数が同期処理から非同期処理に変わったとしても、次の`then`が受け取る値の型は変わらないということです。

Promiseチェーンを使って処理を分割する利点は、同期処理と非同期処理を区別せずに連鎖できることです。
一般に、同期的に書かれた処理を後から非同期処理へと変更することは、全体を書き換える必要があるため難しいです。
そのため、最初から処理を分けておき、処理を`then`を使って繋ぐことで、変更に強いコードを書くことができます。
どのように処理を区切るかは、それぞれの関数が受け取る値の型と、返す値の型に注目するのがよいでしょう。
Promiseチェーンで処理を分けることで、それぞれの処理が簡潔になりコードの見通しがよくなります。

さて、今の`getUserInfo`関数ではloadイベントのコールバック関数でHTMLの組み立てと表示も行っています。
これをPromiseチェーンで次のように書き換えてみましょう。
`getUserInfo`関数では、`fetch`関数が返すPromiseの`then`メソッドで、`Reponse#json`メソッドの戻り値を返しています。
`Reponse#json`メソッドの戻り値はPromiseなので、次の`then`ではユーザー情報のJSONオブジェクトが渡されます。
同じように、`userInfo`を受け取った関数は`createView`関数を呼び出し、その戻り値を次の`then`に渡しています。

<!-- doctest:async:16 -->
```js
function main() {
    getUserInfo("js-primer-example")
        // ここではJSONオブジェクトで解決されるPromise
        .then((userInfo) => createView(userInfo))
        // ここではHTML文字列で解決されるPromise
        .then((view) => displayView(view))
        .catch((error) => {
            console.error(`エラーが発生しました (${error})`);
        });
}

function getUserInfo(userId) {
    return fetch(`https://api.github.com/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`${event.target.status}: ${event.target.statusText}`);
            } else {
                // userInfoを解決するPromiseを返す
                return response.json();
            }
        }).catch(error => {
            throw new Error("ネットワークエラー");
        });
}
```

### Async Functionへの置き換え {#rewrite-to-async-function}

Promiseチェーンによって、Promiseの非同期処理と同じインターフェースで同期処理を記述できるようになりました。
一方でAsync Functionを使うと、同期処理と同じインターフェースでPromiseの非同期処理を記述できるようになります。
Promiseの`then`を使うよりも関数の入れ子が少なく、手続き的で可読性が高いコードになります。
また、エラーハンドリングも同期処理と同じくtry-catch文を使うことができます。

次のように`main`関数の前に`async`をつけると、関数はAsync Functionになります。
そして`fetchUserInfo`関数の呼び出しに`await`をつけると、Promiseに解決されたJSONオブジェクトを`userInfo`変数に代入できます。
`fetchUserInfo`関数の中で投げられた例外は、try-catch文で同期処理と同じようにエラーハンドリングできます。
`main`関数以外の部分は何も変更する必要はありません。あらかじめ非同期処理の関数がPromiseを返すようにしておくと、Async Functionを適用しやすくなります。

<!-- doctest:async:16 -->
```js
async function main() {
    try {
        const userInfo = await fetchUserInfo("js-primer-example");
        const view = createView(userInfo);
        displayView(view);
    } catch (error) {
        console.error(`エラーが発生しました (${error})`);
    }
}
```

## ユーザーIDを変更できるようにする {#changeable-userid}

仕上げとして、今まで`js-primer-example`で固定としていたユーザーIDを変更できるようにしましょう。
index.htmlに`<input>`タグを追加し、JavaScriptから値を取得するために`userId`というIDを付与しておきます。

[import, index.html](src/index.html)

index.jsにも`<input>`タグから値を受け取るための処理を追加すると、最終的に次のようになります。

[import, index.js](src/index.js)

アプリケーションを実行すると、次のようになります。
要件を満たすことができたので、このアプリケーションはこれで完成です。

![完成したアプリケーション](img/fig-1.png)

## [コラム] XMLHttpRequest {#xhr}

[XMLHttpRequest][]（**XHR**）はFetch APIと同じくHTTP通信を行うためのAPIです。
Fetch APIが標準化される以前は、ブラウザとサーバーの間で通信を行うにはXHRを使うのが一般的でした。
Fetch APIはXHRを置き換えるために作られたもので、多くのユースケースではXHRを使う必要はなくなっています。
たとえば、本章で扱ったFetch APIによる`getUserInfo`関数は、XHRを使うと次のようになります。

<!-- doctest:async:16 -->
```js
function getUserInfo(userId) {
    // XHRはPromiseを返さないのでラップする
    return new Promise((resolve, reject) => {
        // リクエストを作成する
        const request = new XMLHttpRequest();
        request.open("GET", `https://api.github.com/users/${userId}`);
        request.addEventListener("load", (event) => {
            // ステータス4XXと5XXをサーバーエラーとする
            if (event.target.status >= 400 || event.target.status <= 599) {
                reject(new Error(`${event.target.status}: ${event.target.statusText}`));
            }
            // レスポンス文字列をJSONオブジェクトにパースする
            const userInfo = JSON.parse(event.target.responseText);
            // Promiseを解決する
            resolve(userInfo);
        });
        request.addEventListener("error", () => {
            reject(new Error("ネットワークエラー"));
        });
        // リクエストを送信する
        request.send();
    });
}
```

ただし、Fetch APIはまだ標準化できていない機能もあり、次のようなケースをサポートしているのはXHRだけです。

* 送信したリクエストを中断する（[XMLHttpRequest#abort][]）
* リクエスト中の[プログレスイベント][]を受け取る（）

XHRの詳しい使い方については、[XHRの利用についてのドキュメント][]を参照してください。


[Promiseチェーン]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/then#%E3%83%81%E3%82%A7%E3%83%BC%E3%83%B3
[XMLHttpRequest]: https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest
[XMLHttpRequest#abort]: https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest/abort
[プログレスイベント]: https://developer.mozilla.org/ja/docs/Web/API/ProgressEvent
[XHRの利用についてのドキュメント]: https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
