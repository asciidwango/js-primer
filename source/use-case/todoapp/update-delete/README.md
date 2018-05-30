---
author: azu
---

# Todoアイテムの更新と削除を実装する {#todo-item-update-and-delete}

このセクションではTodoアプリの残りの機能である「Todoアイテムの更新」と「Todoアイテムの削除」を実装していきます。

Todoアイテムにはアイテムごとに完了済みかの状態があります。
「Todoアイテムの更新」とは、未完了だったらチェックを付けて完了済みに、逆完了済みのアイテムを未完了へとトグルする機能のことです。

「Todoアイテムの削除」はそのままの意味でTodoアイテムを削除する機能です。

まずは「Todoアイテムの更新」から実装していき、その後「Todoアイテムの削除」を実装していきます。

## Todoアイテムの更新 {#todo-item-update}

まずはTodoアイテムの完了済みかの状態を表示してみましょう。
HTMLの[`<input type="checkbox">`](https://developer.mozilla.org/ja/docs/Web/HTML/Element/Input/checkbox)要素を使いチェックボックスとして完了状態を表現します。

`<input type="checkbox">`要素は`checked`属性がない場合はチェックが外れ、
`<input type="checkbox" checked>`のように`checked`属性がある場合はチェックが付きます。

![input要素のchecked属性の違い](./img/input-checkbox.png)

Todoアイテム要素である`<li>`要素中に次のように`<input>`要素を追加しチェックボックスを表示に追加します。
合わせて完了済みの場合は`<s>`要素を使い打ち消し線を表示しています。

[import marker:"checkbox",unindent:"true"](./add-checkbox/src/App.js)

`<input type="checkbox">`要素はクリックすると自動でチェックの表示が切り替わりますが、
このままでは表示とモデルの状態にずれが発生してしまいます。
例えば、表示上はチェックが付いているのに、モデルの`TodoItemModel`の`completed`プロパティが`false`となるようなバグが発生してしまいます。

そのため、`<input type="checkbox">`要素がチェックされたらモデルの状態を更新する処理を追加する必要があります。
`<input type="checkbox">`要素はチェックされたときに`change`イベントを発火します。
この`change`イベントを監視して、TodoItemモデルの状態を更新すればモデルと表示の状態が同期できます。

`input`要素の`change`イベントを監視は次のようにかけます。
`input`要素は`todoItemElement`要素の中にあるため、`querySelector`メソッドを使って`input`要素を指定します。
`querySelector`メソッドの返り値は見つけた要素となり、見つけた`input`要素に対して`change`イベントハンドラを登録します。

<!-- doctest:disable -->
```js
const todoItemElement = element`<li><input type="checkbox">${item.title}</input></li>`
todoItemElement.querySelector("input").addEventListener("change", () => {
    // チェックボックスの表示が変わったタイミングで呼び出される処理
});
```

ここまでをまとめると、Todoアイテムの更新は次の2つのステップで実装できます。

1. `TodoListModel`に指定したTodoアイテムの更新処理を追加する
2. チェックボックスの`change`イベントが発生したら、モデルの状態を更新する

###  `TodoListModel`に指定したTodoアイテムの更新処理を追加する {#TodoListModel-updateTodo}

まずは、モデルの状態を更新するメソッドを`TodoListModel`に実装します。
次のように、`TodoListModel`に`updateTodo`メソッドを追加します。
`TodoListModel#updateTodo`メソッドは、指定したidと一致するTodoアイテムの完了状態(`completed`プロパティ)を更新します。

[import, marker:"add-point",unindent:"true"](./update-feature/src/model/TodoListModel.js)

### チェックボックスの`change`イベントが発生したら、モデルの状態を更新する {#onChange-update-model}

そして次に`input`要素の`change`イベントのイベントハンドラにモデルの更新処理を登録します。
次のように`App.js`で`input`要素の`change`イベントが呼び出されたら、`TodoListModel#updateTodo`メソッドを呼び出すようにします。
チェックをつけたり外したりするたびに呼び出されるので、`completed`には現在の状態を反転（トグル）した値を渡します。

[import, marker:"checkbox",unindent:"true"](./update-feature/src/App.js)

これで、表示とモデルが同期することができ「Todoアイテムの更新処理」が実装できました。

## 削除機能 {#delete}