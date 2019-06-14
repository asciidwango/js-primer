---
author: laco
description: "Promiseを活用し、ソースコードの整理とエラーハンドリングを行います。"
---

# Promiseを活用する {#use-promise}

> このページは改修作業中です

ここまでで、XHRを使ってAjax通信を行い、サーバーから取得したデータを表示できました。
最後に、**Promise**を使ってソースコードを整理することで、エラーハンドリングをしっかり行います。

## 関数の分割 {#split-function}

まずは、大きくなりすぎた`getUserInfo`関数を整理しましょう。
この関数では、XHRを使ったデータの取得・HTML文字列の組み立て・組み立てたHTMLの表示をしています。
そこで、HTML文字列を組み立てる`createView`関数とHTMLを表示する`displayView`関数を作り、処理を分割します。

また、後述するエラーハンドリングを行いやすくするため、アプリケーションにエントリポイントを設けます。
index.jsに新しく`main`関数を作り、その中で`getUserInfo`関数を呼び出すようにします。

```js
function main() {
    getUserInfo("js-primer-example");
}

function getUserInfo(userId) {
    const request = new XMLHttpRequest();
    request.open("GET", `https://api.github.com/users/${userId}`);
    request.addEventListener("load", (event) => {
        if (event.target.status !== 200) {
            console.error(`${event.target.status}: ${event.target.statusText}`);
            return;
        }

        const userInfo = JSON.parse(event.target.responseText);

        const view = createView(userInfo);
        displayView(view);
    });
    request.addEventListener("error", () => {
        console.error("Network Error");
    });
    request.send();
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

## XHRをPromiseでラップする {#wrap-xhr}

次に、`getUserInfo`関数で行っているXHRの処理を整理します。
これまではXHRのコールバック関数の中で処理していましたが、これを**Promise**を使った処理に書き換えます。
コールバック関数を使うと、ソースコードのネストが深くなったり、例外処理が複雑になったりします。
Promiseを用いることで、可読性を保ちながらエラーハンドリングを簡単に行えます。

<!-- textlint-disable no-js-function-paren -->

コールバック関数を使う形式のAPIをPromiseに置き換えるのは、次のコードのように`new Promise()`を用いるのが一般的です。
Promiseのコンストラクタには、`resolve`と`reject`の2つの関数オブジェクトを引数とする関数を渡します。
ひとつめの引数は非同期処理が成功したときに呼び出す関数で、ふたつめは失敗した時に呼び出す関数です。

<!-- textlint-enable no-js-function-paren -->

<!-- doctest:async:16 -->
```js
new Promise((resolve, reject) => {
    // ここで非同期処理を行う
});
```

Promiseのコンストラクタに渡す関数で、XHRの処理を行います。
作成されたPromiseは成功か失敗のどちらかで完了させなければなりません。
非同期処理が成功したら第1引数の`resolve`関数を、失敗なら第2引数の`reject`関数を呼び出します。

作成したPromiseのオブジェクトを`return`することで、`getUserInfo`関数はPromiseを返す関数になりました。
`getUserInfo`関数がPromiseを返すことで、それを呼び出す`main`関数の方で非同期処理の結果を扱えるようになります。

<!-- doctest:async:16 -->
```js
function getUserInfo(userId) {
    return new Promise((resolve, reject) => {    
        const request = new XMLHttpRequest();
        request.open("GET", `https://api.github.com/users/${userId}`);
        request.addEventListener("load", (event) => {
            if (event.target.status !== 200) {
                console.error(`${event.target.status}: ${event.target.statusText}`);
                reject(); // ステータスコードが200じゃないので失敗
            }

            const userInfo = JSON.parse(event.target.responseText);

            const view = createView(userInfo);
            displayView(view);
            resolve(); // 完了
        });
        request.addEventListener("error", () => {
            console.error("Network Error");
            reject(); // 通信エラーが発生したので失敗
        });
        request.send();
    });
}
```

### エラーハンドリング {#error-handling}

このままではPromiseに置き換えた意味がないので、Promiseを使ったエラーハンドリングを行いましょう。
Promiseのコンテキスト内で発生したエラーは、`Promise#catch`メソッドを使って一箇所で受け取れます。
次のコードでは、`getUserInfo`関数から返されたPromiseオブジェクトを使い、エラーが起きた時にログを出力します。
`reject`関数に渡したエラーは`catch`のコールバック関数で第1引数として受け取れます。

<!-- doctest:async:16 -->
```js
function main() {
    getUserInfo("js-primer-example")
        .catch((error) => {
            console.error(`エラーが発生しました (${error})`);
        });
}

function getUserInfo(userId) {
    return new Promise((resolve, reject) => {    
        const request = new XMLHttpRequest();
        request.open("GET", `https://api.github.com/users/${userId}`);
        request.addEventListener("load", (event) => {
            if (event.target.status !== 200) {
                reject(new Error(`${event.target.status}: ${event.target.statusText}`));
            }

            const userInfo = JSON.parse(event.target.responseText);

            const view = createView(userInfo);
            displayView(view);
            resolve();
        });
        request.addEventListener("error", () => {
            reject(new Error("ネットワークエラー"));
        });
        request.send();
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
これをPromiseチェーンを使うように書き換えると、次のようにできます。
`getUserInfo`関数では、`resolve`関数に`userInfo`を渡し、次の`then`でコールバック関数の引数として受け取っています。
同じように、`userInfo`を受け取った関数は`createView`関数を呼び出し、その戻り値を次の`then`に渡しています。

<!-- doctest:async:16 -->
```js
function main() {
    getUserInfo("js-primer-example")
        .then((userInfo) => createView(userInfo))
        .then((view) => displayView(view))
        .catch((error) => {
            console.error(`エラーが発生しました (${error})`);
        });
}

function getUserInfo(userId) {
    return new Promise((resolve, reject) => {    
        const request = new XMLHttpRequest();
        request.open("GET", `https://api.github.com/users/${userId}`);
        request.addEventListener("load", (event) => {
            if (event.target.status !== 200) {
                reject(new Error(`${event.target.status}: ${event.target.statusText}`));
            }

            const userInfo = JSON.parse(event.target.responseText);
            resolve(userInfo);
        });
        request.addEventListener("error", () => {
            reject(new Error("ネットワークエラー"));
        });
        request.send();
    });
}
```

## [コラム] Fetch API {#fetch-api}

[Fetch API][]とは、ページの外部からリソースを取得するためのインターフェースを定義した、Webブラウザの標準APIです。
Fetch APIは`fetch`関数など、リソースを取得するためのAPIを定義しています。
`fetch`関数はPromiseを返すのが特徴です。
たとえば、本章で扱ったXHRによる`getUserInfo`関数は、`fetch`関数を使うと次のようになります。

<!-- doctest:async:16 -->
```js
function getUserInfo(userId) {
    // 暗黙にGETリクエストとなる
    // Responseオブジェクトがthenに渡される
    return fetch(`https://api.github.com/users/${userId}`)
        .then(response => {
            if (!response.status !== 200) {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
            // jsonメソッドは、レスポンスボディをJSONとしてパースしたPromiseオブジェクトを返す
            return response.json();
        }, error => {
            throw new Error("ネットワークエラー");
        });
}
```

今回のユースケースではFetchへの置き換えが可能ですが、コールバック関数をPromiseでラップする手法を学ぶために、あえてXHRを利用しています。
また、プログレスイベントやリクエストの中断などXHRでしか使えない機能もあるため、常にFetchで置き換えられるわけではありません。

Fetchの詳しい使い方については[Fetchに関するドキュメント][]を参照してください。


## ユーザーIDを変更できるようにする {#changeable-userid}

仕上げとして、今まで`js-primer-example`で固定としていたユーザーIDを変更できるようにしましょう。
index.htmlに`<input>`タグを追加し、JavaScriptから値を取得するために`userId`というIDを付与しておきます。

[import, index.html](src/index.html)

index.jsにも`<input>`タグから値を受け取るための処理を追加すると、最終的に次のようになります。

[import, index.js](src/index.js)

アプリケーションを実行すると、次のようになります。
要件を満たすことができたので、このアプリケーションはこれで完成です。

![完成したアプリケーション](img/fig-1.png)


[Promiseチェーン]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/then#%E3%83%81%E3%82%A7%E3%83%BC%E3%83%B3
[Fetch API]: https://developer.mozilla.org/ja/docs/Web/API/Fetch_API
[Fetchに関するドキュメント]: https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch
