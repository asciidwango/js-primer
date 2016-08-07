---
author: laco
---

# Promiseを活用する

ここまでで、XHRを使ってAjax通信を行い、サーバーから取得したデータを表示できました。
最後に、**Promise**を使ってソースコードを整理することで、エラーハンドリングをしっかり行います。

## 関数の分割

まずは、大きくなりすぎた`getUserInfo`関数を整理しましょう。
この関数では、XHRを使ったデータの取得・HTML文字列の組み立て・組み立てたHTMLの表示を行っています。
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
            console.log(`${event.target.status}: ${event.target.statusText}`);
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
        <dt>Repositries</dt>
        <dd>${userInfo.public_repos}</dd>
    </dl>
    `;
}

function displayView(view) {
    const result = document.getElementById("result");
    result.innerHTML = view;
}
```

## XHRをPromiseでラップする

次に、`getUserInfo`関数で行っているXHRの処理を整理します。
これまではXHRのコールバック関数の中で処理を行っていましたが、これを**Promise**を使った処理に書き換えます。
コールバック関数を使うと、ソースコードのネストが深くなったり、例外処理が複雑になったりします。
Promiseを用いることで、可読性を保ちながらエラーハンドリングを簡単にできます。

コールバック関数を使う形式のAPIをPromiseに置き換えるのは、次のコードのように`new Promise()`を用いるのが一般的です。
Promiseのコンストラクタには、`resolve`と`reject`の2つの関数オブジェクトを引数とする関数を渡します。
ひとつめの引数は非同期処理が成功したときに呼び出す関数で、ふたつめは失敗した時に呼び出す関数です。

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

```js
function getUserInfo(userId) {
    return new Promise((resolve, reject) => {    
        const request = new XMLHttpRequest();
        request.open("GET", `https://api.github.com/users/${userId}`);
        request.addEventListener("load", (event) => {
            if (event.target.status !== 200) {
                console.log(`${event.target.status}: ${event.target.statusText}`);
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

### エラーハンドリング

このままではPromiseに置き換えた意味がないので、Promiseを使ったエラーハンドリングを行いましょう。
Promiseのコンテキスト内で発生したエラーは、`Promise#catch`を使って一箇所で受け取れます。
次のコードでは、`getUserInfo`関数から返されたPromiseオブジェクトを使い、何かのエラーが起きた時にログを出力します。
`reject`関数に渡したエラーは`catch`のコールバック関数で第1引数として受け取れます。

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

### Promiseチェーンへの置き換え

Promiseは`Promise#then`関数を使うことで、複数の処理の連鎖を表現できます。
複数の処理を`then`で分割し、連鎖させたものを、ここでは**[Promiseチェーン][]**と呼びます。
基本的に、`then`はコールバック関数の戻り値をそのまま次の`then`へ渡します。
ただし、コールバック関数の戻り値がPromiseである場合はその完了を待ち、その結果の値を次の`then`に渡します。
つまり、`then`のコールバック関数が同期処理から非同期処理に変わったとしても、その次の`then`が受け取る値の型は変わらないということです。

Promiseチェーンを使って処理を分割する利点は、同期処理と非同期処理を区別せずに連鎖できることです。
ひとつの処理として書いてしまうと、非同期処理の結果を扱うためにコードは複雑になります。
そういう場合に`then`で区切っておけば、前の処理が非同期処理であっても、値を引数として受け取るコールバック関数はまるで同期処理のように書くことができます。
それぞれの関数はどんな型の値を受け取り、どんな型の値を返すかだけに注意すればよいので、処理が簡潔になりコードの見通しがよくなるでしょう。

さて、今の`getUserInfo`関数ではloadイベントのコールバック関数でHTMLの組み立てと表示も行っています。
これをPromiseチェーンを使うように書き換えると、次のようにできます。
`getUserInfo`関数では、`resolve`関数に`userInfo`を渡し、次の`then`でコールバック関数の引数として受け取っています。
同じように、`userInfo`を受け取った関数は`createView`関数を呼び出し、その戻り値を次の`then`に渡しています。

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

## ユーザーIDを変更できるようにする

仕上げとして、今まで`js-primer-example`で固定としていたユーザーIDを変更できるようにしましょう。
index.htmlに`<input>`タグを追加し、JavaScriptから値を取得するために`userId`というIDを付与しておきます。

[import, index.html](src/index.html)

index.jsにも`<input>`タグから値を受け取るための処理を追加すると、最終的に次のようになります。

[import, index.js](src/index.js)

アプリケーションを実行すると、次のようになります。
要件を満たすことができたので、このアプリケーションはこれで完成です。

![完成したアプリケーション](img/fig-1.png)


[Promiseチェーン]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/then#%E3%83%81%E3%82%A7%E3%83%BC%E3%83%B3