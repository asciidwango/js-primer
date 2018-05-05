# フォームとイベント {#form-event}

ここからはJavaScriptでTodoアプリの動作を実際に作っていきます。

まずは、先ほどHTMLに目印を付けたTodoリスト(`#js-todo-list`)に対してTodoアイテムを追加する処理を作っていきます。

## Todoアイテムの追加 {#add-todo-item}

Todoアイテムを追加するには、ユーザーが次のような操作によって追加します。

1. 入力欄にTodoアイテムのタイトルを入力する
2. 入力欄でEnterを押し送信する
3. TodoリストにTodoアイテムが追加される

これをJavaScriptで処理するには次のことが必要です。

- form要素から送信（`submit`）されたことをイベントで受け取る
- input要素（入力欄）に入力された内容を取得する
- 入力内容をタイトルにしたTodoアイテムを作成し、Todoリスト(`#js-todo-list`)にTodoアイテム要素を追加する

まずは、form要素から送信されたイベントを受け取り、入力内容をコンソールログに表示してみることから始めてみましょう。

## 入力内容をコンソールに表示 {#input-to-console}

form要素でEnterを押し送信すると`submit`イベントが発火されます。
この`submit`イベントは`addEventListener`メソッドを利用することで受け取れます。

<!-- doctest:disable -->
```js
// id="js-form`の要素を取得
const formElement = document.querySelector("#js-form");
// form要素から発火されたsubmitイベントを受け取る
formElement.addEventListener("submit", (event) => {
    // イベントが発火された時に呼ばれるコールバック関数
});
```

フォームが送信されたときに入力内容をコンソールに表示するには、
`addEventListener`コールバック関数内で入力内容をConsole APIで出力すればよいことになります。

入力内容はinput要素の`value`プロパティから取得できます。

<!-- doctest:disable -->
```js
const inputElement = document.querySelector("#js-form-input");
console.log(inputElement.value); // => "input要素の入力内容"
```

これらを組み合わせて`App.js`に「入力内容をコンソールに表示」する機能を実装してみましょう。
`App`クラスに`mount`というメソッドを定義して、次のようにform要素の`submit`イベントを受け取ります。
フォーム（`#js-form`）でEnterを押し送信すると、input要素（`#js-form-input`)に書かれていた内容が開発者ツールのコンソールに表示するという実装です。

[import, title:"src/App.js"](./prevent-event/src/App.js)

`index.js`も合わせて変更して、`App`クラスの`mount`メソッドを呼び出すようにします。

[import, title:"index.js"](./prevent-event/index.js)

これらの変更後にブラウザでページをリロードすると、`App#mount`が実行されるようになります。
`submit`イベントが監視されているので、入力欄に何か入力してEnterで送信してみるとその内容がコンソールに表示されます。

![入力内容がコンソールに表示される](./img/event-driven.png)

先ほどの`App.js`で発火されたsubmitイベントの`event.preventDefault();`を呼び出しています。
これは、`submit`イベントが発火されたフォーム本来の動作をキャンセルするメソッドです。
フォーム本来の処理とは、フォームの内容を指定したURLへ送信するといった処理です。
ここでは`form`要素に送信先が指定されていないため、現在のURLに対してフォームを送信が行われるのをキャンセルしています。

<!-- doctest:disable -->
```js
formElement.addEventListener("submit", (event) => {
    // submitイベントの本来の動作を止める
    event.preventDefault();
    console.log(`入力欄の値: ${inputElement.value}`);
});
```

現在のURLに対してフォームを送信が行われると、結果的にページがリロードされてしまいます。
これは`event.preventDefault();`をコメントアウトすると、ページがリロードされていることが確認できます。

```js
formElement.addEventListener("submit", (event) => {
    // preventDefaultしないとページがリロードされてしまう
    // event.preventDefault();
    console.log(`入力欄の値: ${inputElement.value}`);
});
```

ここまでで`todoapp`ディレクトリは次のような変更を加えました。

```
todoapp
├── index.html
├── index.js (App#mountの呼び出し)
├── package.json
└── src
    └── App.js (App#mountの実装)
```


ここまでのTodoアプリは次のURLで実際に確認できます。

- [https://asciidwango.github.io/js-primer/use-case/todoapp/form-event/prevent-event/](./prevent-event/)


## 入力内容をTodoリストに表示 {#input-to-todolist}

フォーム送信時に入力内容を取得する方法が分かったので、次はその入力内容をTodoリスト(`#js-todo-list`)に表示します。
HTMLではリストのアイテムを記述する際には`<li>`タグを使います。
またTodoリストに表示するTodoアイテムには、完了状態を表すチェックボックスや削除ボタンなども含めたいです。

直接DOM APIで複雑な要素を作成すると見通しが悪くなるため、HTML文字列からHTML要素を生成するユーティリティモジュールを作成しましょう。

次の`html-util.js`を`src/view/html-util.js`というパスに作成します。

この`html-util.js`は「[ajaxapp: HTML文字列をDOMに追加する][]」でも利用した`escapeSpecialChars`をベースにしています。
ajaxappでの`escapeHTML`タグ関数では出力は**HTML文字列**でしたが、今回作成する`element`タグ関数の出力は**HTML要素**（Element）です。

これはTodoリスト(`#js-todo-list`)というすでに存在する要素に対して要素を**追加**するには、HTML文字列ではなく要素が必要になります。
また、HTML文字列に対しては`addEventListener`でイベントを監視するということはできません。
そのため、チェックボックスの状態が変わったことや削除ボタンが押されたことを知る必要があるTodoアプリでは要素が必要になります。

[import, title:"src/view/html-util.js"](./add-todo-item/src/view/html-util.js)

`element`タグ関数では、同じファイルに定義した`htmlToElement`関数を使ってHTML文字列からHTML要素を作成しています。
`htmlToElement`関数の中で利用している[template要素][]はHTML5で追加された、HTML文字列の断片からHTML要素を作成できる要素です。

この`element`タグ関数を使うことで、次のようにHTML文字列からHTML要素を作成できます。
作成した要素は、`appendChild`メソッドなどで既存の要素に子要素として追加できます。

<!-- doctest:disable -->
```js
// HTML文字列からHTML要素を作成
const newElement = element`<ul>
    <li>新しい要素</li>
</ul>`;
// 作成した要素を既存の要素に追加（appendChild）する
document.body.appendChild(newElement);
```

次に、この`element`タグ関数を使い`App.js`で送信された入力内容をTodoリストに要素として追加してみます。

先ほどの`html-util.js`から`element`タグ関数を`App.js`に`import`します。
そして、`submit`イベントのコールバックでTodoアイテムを表現する要素を作成し、Todoリスト(`#js-todo-list`)に対して追加します。

[import, title:"src/App.js"](./add-todo-item/src/App.js)

これらの変更後にブラウザでページをリロードすると、入力内容を送信するたびにTodoリスト下へTodoアイテムが追加されます。

このセクションでの変更点は次のとおりです。

```
todoapp
├── index.html
├── index.js
├── package.json
└── src
    ├── App.js(Todoアイテムの表示の実装)
    └── view
        └── html-util.js(追加)
```


現在のTodoアプリは次のURLで実際に確認できます。

- [https://asciidwango.github.io/js-primer/use-case/todoapp/form-event/add-todo-item/](./add-todo-item/)

## まとめ {#conclusion}

このセクションではform要素の`submit`イベントを監視し、入力内容を元にTodoアイテムをTodoリストの追加を実装しました。
今回のTodoアイテムの追加のように多くのウェブアプリは、何らかのイベントが発生うぃ、そのイベントを監視してJavaScriptで処理し表示を更新します。
このようなイベントが発生したことを元に処理を進める方法を**イベント駆動**（イベントドリブン）と呼びます。

今回のTodoアイテムの追加では、`submit`イベントを入力にして、**直接**Todoリスト要素の内容を更新という出力をしていました。
このような直接DOMを更新するという方法はコードが短くなりますが、柔軟性になくなるという問題があります。
次のセクションではこの問題点を解消するために、今回扱ったイベントの仕組みをより深く見ていきます。

[ajaxapp: HTML文字列をDOMに追加する]: ../../ajaxapp/display/README.md#html-to-dom
[template要素]: https://developer.mozilla.org/ja/docs/Web/HTML/Element/template
