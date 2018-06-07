---
author: azu
---

# Todoアプリのリファクタリング {#todo-app-refactoring}

前のセクションでTodoaアプリの機能の実装ができました。
しかし、App.jsを見てみるとほとんどがHTML要素の作成処理になっています。
このようなHTML要素の作成処理は表示する内容が増えるほど行数が線形的に増えていきます。
このままTodoアプリを拡張していくとApp.jsが肥大化してコードが読みにくく、メンテナンス性が低下してしまいます。

App.jsの役割を振り返ってみましょう。
`App`というクラスを持ち、このクラスではModelの初期化やHTML要素とModel間で発生するイベントを中継する役割をもっています。
表示から発生したイベントをModelに伝え、Modelから発生した変更イベントを表示に伝えているという管理者というもいえます。

このセクションでは`App`クラスをイベントの管理者という役割に集中させるため、`App`クラスに書かれているHTML要素を作成する処理を別のクラスへ移動させるリファクタリングを行います。

## Viewクラス {#view}

`App`クラスの大部分の締めているのは`TodoItemModel`の配列を受け取り対応するTodoリストのHTML要素を作成する処理です。
このような表示のための処理をViewクラスとしてモジュールにして、`App`クラスから作成したViewモジュールを使うような形にリファクタリングをしていきます。

Todoリストの表示は次の2つの部品（コンポーネント）から成り立っています。

- Todoアイテムコンポーネント
- TodoアイテムをリストとしてまとめたTodoリストコンポーネント

この部品に対応するように次のViewのモジュールを作成していきます。

- `TodoItemView`: Todoアイテムコンポーネント
- `TodoListView`: Todoリストコンポーネント

まずは、Todoアイテムに対応する`TodoItemView`から作成しています。

`view/TodoItemView.js`ファイルを作成して、次のような`TodoItemView`クラスを`export`します。
この`TodoItemView`はTodoアイテムに対応するHTML要素を返す`createElement`メソッドを持ちます。

[import, title:"src/view/TodoItemView.js"](./create-view/src/view/TodoItemView.js)

`TodoItemView#createElement`メソッドの中身は元々`App`クラスで利用していたTodoアイテムのHTML要素を作成するコードを元にしています。
`createElement`メソッドは、`TodoItemMode`のインスタンスだけではなく`onUpdateTodo`と`onDeleteTodo`のハンドラ関数を受け取っています。
この受け取ったハンドラ関数はそれぞれ対応するイベントが発生した際に呼びだします。
このように引数としてハンドラ関数を外から受け取ることで、イベントが発生したときの具体的な処理はViewクラスの外側に定義できます。

この`TodoItemView`クラスは次のように対応する`TodoItemModel`のインスタンスとイベントハンドラのオブジェクトを受け取り、TodoアイテムのHTML要素を返します。

[import, marker:"main"](./create-view/src/view/TodoItemView.example.js)

次は`view/TodoListView.js`ファイルを作成して、次のような`TodoListView`クラスを`export`します。
この`TodoListView`は`TodoItemModel`の配列に対応するTodoリストのHTML要素を返す`createElement`メソッドを持ちます。
[import, titlt:"src/view/TodoListView.js"](./create-view/src/view/TodoListView.js)


`TodoListView#createElement`メソッドは`TodoItemView`を使いTodoアイテムのHTML要素作り、`<li>`要素に追加していきます。
この`TodoListView#createElement`メソッドも`onUpdateTodo`と`onDeleteTodo`のハンドラ関数を受け取ります。
しかし、`TodoListView`ではこのハンドラ関数は`TodoItemView`にそのまま渡しています。
なぜなら具体的なDOMイベントを発生させる要素が作られるのは`TodoItemView`の中となるためです。

## Appのリファクタリング {#app-refactoring}

最後に作成した`TodoItemView`クラスと`TodoListView`クラスを使い`App`クラスをリファクタリングしていきます。

`App.js`を次のように`TodoListView`クラスを使うように書き換えます。
`onChange`のハンドラのコールバック関数で`TodoListView`クラスを使いTodoリストのHTML要素を作るように変更します。
このとき`TodoListView#createElement`メソッドには次のようにそれぞれ対応するコールバック関数をわたします。

- `onUpdateTodo`のコールバック関数では`TodoListModelu#pdateTodo`メソッドを呼ぶ
- `onDeleteTodo`のコールバック関数では`TodoListModelu#deleteTodo`メソッドを呼ぶ

[import, title:"src/App.js"](./create-view/src/App.js)

これで`App`クラスからHTML要素の作成処理がViewクラスに移動でき、`App`クラスにはModelとView間のイベントを管理するだけになりました。

### Appのハンドラを整理する {#app-handler}

`App`クラスで登録しているイベントのハンドラを見てみると次の4種類となっています。

| イベントの流れ    | ハンドラ                                           | 役割                                    |
| ----------------- | -------------------------------------------------- | --------------------------------------- |
| `Model` -> `View` | ` this.todoListModel.onChange(handler)`            | `TodoListModel`が変更イベントを受け取る |
| `View` -> `Model` | ` formElement.addEventListener("submit", handler)` | フォームの送信イベントを受け取る        |
| `View` -> `Model` | ` onUpdateTodo: handler`                           | Todoアイテムのチェックボックスの更新イベントを受け取る    |
| `View` -> `Model` | `onDeleteTodo: handler`                            | Todoアイテムの削除イベントを受け取る    |

イベントの流れがViewからModelとなっているハンドラが3箇所あり、それぞれハンドラの処理が書かれている場所がコード上バラバラです。
また、それぞれのハンドラはTodoアプリの機能と対応していることがわかります。
そのため、このハンドラがTodo**アプリ`の扱っている機能であるということをわかりやすくするため、ハンドラを`App`クラスのメソッドとして定義してみましょう。

[import, title:"src/App.js"](./final/src/App.js)

このように`App`クラスのハンドラとして並べることで、Todoアプリがコード上の見た目としてわかりやすくなりました。

## まとめ {#conclusion}

この章では、Todoアプリというユースケースにおいてウェブアプリの開発方法についてを見ていきました。


- [x] ModelとViewをモジュールに分割した
- [x] App.jsの役割を明確にしハンドラを整理した
