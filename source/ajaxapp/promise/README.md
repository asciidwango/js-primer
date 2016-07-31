---
author: laco
---

# Promiseを活用する

ここまでで、XHRを使ってAjax通信を行い、サーバーから取得したデータを表示できました。
最後に、**Promise**を使ってソースコードを整理することで、エラーハンドリングをしっかり行います。

## 関数の分割

まずは、大きくなりすぎた`getUserInfo`関数を整理しましょう。
この関数では、XHRを使ったデータの取得・HTML文字列の組み立て・組み立てたHTMLの表示を行っています。
そこで、HTML文字列を組み立てる`createView`関数とHTMLを表示する`displayView`関数を作り、
処理を分割します。

```js
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
**Promise**を用いることで、可読性を保ちながらエラーハンドリングを簡単にできます。

コールバック関数を使う形式のAPIをPromiseに置き換えるのは、次のコードのように`new Promise()`を用いるのが一般的です。
Promiseのコンストラクタには、`resolve`と`reject`の2つの関数オブジェクトを引数とする関数を渡します。
ひとつめの引数は非同期処理が成功したときに呼び出す関数で、ふたつめは失敗した時に呼び出す関数です。

```js
new Promise((resolve, reject) => {
    // ここで非同期処理を行う
});
```

作成したPromiseの中でXHRの処理を行います。
Promiseを完了させるために、非同期処理が成功したら`resolve`を、失敗なら`reject`を呼び出します。

```js
function getUserInfo(userId) {
    
    new Promise((resolve, reject) => {    
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

このままではPromiseに置き換えた意味がないので、エラーハンドリングを行いましょう。
Promiseのコンテキスト内で発生したエラーは、`Promise.catch`を使って一箇所で受け取れます。
次のコードでは、XHR処理からデータの表示までに何かのエラーが起きた時にログを出力します。
`reject`関数に渡したエラーは`catch`のコールバック関数で第1引数として受け取れます。

```js
function getUserInfo(userId) {
    
    new Promise((resolve, reject) => {    
        const request = new XMLHttpRequest();
        request.open("GET", `https://api.github.com/users/${userId}`);
        request.addEventListener("load", (event) => {
            if (event.target.status !== 200) {
                reject(`${event.target.status}: ${event.target.statusText}`);
            }

            const userInfo = JSON.parse(event.target.responseText);
            
            const view = createView(userInfo);
            displayView(view); 
            resolve();
        });
        request.addEventListener("error", () => {
            reject("ネットワークエラー");
        });
        request.send();
    })
        .catch((error) => {
            console.error(`エラーが発生しました (${error})`);
        });
}
```

### Promiseチェーン

Promiseは`then`関数を使うことで、複数の非同期処理の連鎖を表現できます。
たとえ1つのPromiseで済んでしまう処理でも、`then`を使って分けることで見通しが良くなります。

今の`getUserInfo`ではloadイベントのコールバック関数でHTMLの組み立てと表示も行っています。
これを`then`を使ったPromiseチェーンに置き換えると次のようになります。
`resolve`関数に`userInfo`変数を渡し、次の`then`でコールバック関数の引数として受け取っています。
また、それぞれの処理を別のスコープに分割することで、より詳細なエラーハンドリングを簡潔に書けます。

```js
function getUserInfo(userId) {
    
    new Promise((resolve, reject) => {    
        const request = new XMLHttpRequest();
        request.open("GET", `https://api.github.com/users/${userId}`);
        request.addEventListener("load", (event) => {
            if (event.target.status !== 200) {
                reject(`${event.target.status}: ${event.target.statusText}`);
            }

            const userInfo = JSON.parse(event.target.responseText);
            resolve(userInfo);
        });
        request.addEventListener("error", () => {
            reject("ネットワークエラー");
        });
        request.send();
    })
        .then((userInfo) => {
            try {
                return createView(userInfo);
            } catch (error) {
                throw new Error(`HTML組み立てエラー: ${error}`);
            }
        })
        .then((view) => {
            try {
                displayView(view);
            } catch (error) {
                throw new Error(`HTML表示エラー: ${error}`);
            }
        })
        .catch((error) => {
            console.error(`エラーが発生しました (${error})`);
        });
}
```

## 仕上げ

仕上げとして、今まで`js-primer-example`で固定としていたユーザーIDを変更できるようにしましょう。
index.htmlに`<input>`タグを追加し、`userId`というIDを付与しておきます。

[import, index.html](src/index.html)

index.jsにも`#userId`要素から値を受け取るための処理を追加すると、最終的に次のようになります。

[import, index.js](src/index.js)

アプリケーションを実行すると、次のようになります。
要件を満たすことができたので、このアプリケーションはこれで完成です。

![完成したアプリケーション](img/fig-1.png)

