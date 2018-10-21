---
author: azu
---

# Todoアプリのリファクタリング {#todo-app-refactoring}

前のセクションでTodoアプリの機能の実装できました。
しかし、App.jsを見てみるとほとんどがHTML要素の作成処理になっています。
このようなHTML要素の作成処理は表示する内容が増えるほど行数が線形的に増えていきます。
このままTodoアプリを拡張していくとApp.jsが肥大化してコードが読みにくく、メンテナンス性が低下してしまいます。

App.jsの役割を振り返ってみましょう。
`App`というクラスを持ち、このクラスではModelの初期化やHTML要素とModel間で発生するイベントを中継する役割をもっています。
表示から発生したイベントをModelに伝え、Modelから発生した変更イベントを表示に伝えているという管理者といえます。

このセクションでは`App`クラスをイベントの管理者という役割に集中させるため、`App`クラスに書かれているHTML要素を作成する処理を別のクラスへ移動させるリファクタリングを行います。

## Viewクラス {#view}

`App`クラスの大部分の占めているのは`TodoItemModel`の配列に対応するTodoリストのHTML要素を作成する処理です。
このような表示のための処理をViewクラスとしてモジュールにして、`App`クラスから作成したViewモジュールを使うような形にリファクタリングをしていきます。

Todoリストの表示は次の2つの部品（コンポーネント）から成り立っています。

- Todoアイテムコンポーネント
- TodoアイテムをリストとしてまとめたTodoリストコンポーネント

この部品に対応するように次のViewのモジュールを作成していきます。

- `TodoItemView`: Todoアイテムコンポーネント
- `TodoListView`: Todoリストコンポーネント

### TodoItemViewを作成する {#TodoItemView}

まずは、Todoアイテムに対応する`TodoItemView`から作成しています。

`view/TodoItemView.js`ファイルを作成して、次のような`TodoItemView`クラスを`export`します。
この`TodoItemView`はTodoアイテムに対応するHTML要素を返す`createElement`メソッドを持ちます。

[import, title:"src/view/TodoItemView.js"](./create-view/src/view/TodoItemView.js)

`TodoItemView#createElement`メソッドの中身は元々`App`クラスでのHTML要素を作成する部分を元にしています。
`createElement`メソッドは、`TodoItemModel`のインスタンスだけではなく`onUpdateTodo`と`onDeleteTodo`のリスナー関数を受け取っています。
この受け取ったリスナー関数はそれぞれ対応するイベントが発生した際に呼びだします。

このように引数としてリスナー関数を外から受け取ることで、イベントが発生したときの具体的な処理はViewクラスの外側に定義できます。

たとえば、この`TodoItemView`クラスは次のように利用できます。
`TodoItemModel`のインスタンスとイベントリスナーのオブジェクトを受け取り、TodoアイテムのHTML要素を返します。

[import, marker:"main"](./create-view/src/view/TodoItemView.example.js)

### TodoListViewを作成する {#TodoListView}

次はTodoリストに対応する`TodoListView`を作成します。

`view/TodoListView.js`には次のような`TodoListView`クラスを`export`します。
この`TodoListView`は`TodoItemModel`の配列に対応するTodoリストのHTML要素を返す`createElement`メソッドを持ちます。
[import, title:"src/view/TodoListView.js"](./create-view/src/view/TodoListView.js)


`TodoListView#createElement`メソッドは`TodoItemView`を使いTodoアイテムのHTML要素作り、`<li>`要素に追加していきます。
この`TodoListView#createElement`メソッドも`onUpdateTodo`と`onDeleteTodo`のリスナー関数を受け取ります。
しかし、`TodoListView`ではこのリスナー関数を`TodoItemView`にそのまま渡しています。
なぜなら具体的なDOMイベントを発生させる要素が作られるのは`TodoItemView`の中となるためです。

## Appのリファクタリング {#app-refactoring}

最後に作成した`TodoItemView`クラスと`TodoListView`クラスを使い`App`クラスをリファクタリングしていきます。

`App.js`を次のように`TodoListView`クラスを使うように書き換えます。
`onChange`のリスナー関数で`TodoListView`クラスを使いTodoリストのHTML要素を作るように変更します。
このとき`TodoListView#createElement`メソッドには次のようにそれぞれ対応するコールバック関数をわたします。

- `onUpdateTodo`のコールバック関数では`TodoListModel#updateTodo`メソッドを呼ぶ
- `onDeleteTodo`のコールバック関数では`TodoListModel#deleteTodo`メソッドを呼ぶ

[import, title:"src/App.js"](./create-view/src/App.js)

これで`App`クラスからHTML要素の作成処理がViewクラスに移動でき、`App`クラスにはModelとView間のイベントを管理するだけになりました。

### Appのイベントリスナーを整理する {#app-event-listener}

`App`クラスで登録しているイベントのリスナー関数を見てみると次の4種類となっています。

| イベントの流れ    | リスナー関数                                           | 役割                                    |
| ----------------- | -------------------------------------------------- | --------------------------------------- |
| `Model` -> `View` | ` this.todoListModel.onChange(listener)`            | `TodoListModel`が変更イベントを受け取る |
| `View` -> `Model` | ` formElement.addEventListener("submit", listener)` | フォームの送信イベントを受け取る        |
| `View` -> `Model` | ` onUpdateTodo: listener`                           | Todoアイテムのチェックボックスの更新イベントを受け取る    |
| `View` -> `Model` | `onDeleteTodo: listener`                            | Todoアイテムの削除イベントを受け取る    |

イベントの流れがViewからModelとなっているリスナー関数が3箇所あり、それぞれリスナー関数はコード上バラバラな位置に書かれています。
また、それぞれのリスナー関数はTodoアプリの機能と対応していることがわかります。
これらのリスナー関数がTodoアプリの扱っている機能であるということをわかりやすくするため、リスナー関数を`App`クラスのメソッドとして定義しなおしてみましょう。

[import, title:"src/App.js"](./final/src/App.js)

このように`App`クラスのメソッドとしてリスナー関数を並べることで、Todoアプリの機能がコード上の見た目としてわかりやすくなりました。

## セクションのまとめ {#section-conclusion}

このセクションでは、次のことを行いました。

- [x] ModelとViewをモジュールに分割した
- [x] Todoアプリの機能と対応するリスナー関数を`App`クラスのメソッドへ移動した
- [x] Todoアプリを完成させた

完成したTodoアプリは次のURLで確認できます。

- <https://jsprimer.net/use-case/todoapp/final/final/>

## Todoアプリのまとめ {#todo-conclusion}

今回は、Todoアプリを構成する要素をModelとViewという単位でモジュールに分けていました。
モジュールを分けることでコードの見通しを良くしたり、Todoアプリにさらなる機能を追加しやすい形にしました。
このようなモジュールの分け方などの設計には正解はなくさまざまな考え方があります。

今回Todoアプリという題材をユースケースに選んだのは、JavaScriptのウェブアプリケーションではよく利用されている題材であるためです。
さまざまなライブラリを使ったTodoアプリの実装が[TodoMVC][]と呼ばれるサイトにまとめられています。
今回作成したTodoアプリはTodoMVCからフィルター機能などを削ったものをライブラリを使わずに実装しました。[^vanilajs]

現実ではライブラリを使わずウェブアプリケーションを実装することは少なくなってきています。
しかし、ライブラリを使って開発する場合でも、第一部の基本文法や第二部のユースケースで紹介したようなJavaScriptの基礎は重要です。
なぜならライブラリもこれらの基礎の上に実装されているためです。

また作るアプリケーションの種類や目的によって適切なライブラリは異なります。
ライブラリによっては魔法のような機能を提供しているものもありますが、それらも何かしらの基礎となる技術があることは覚えておいてください。

この書籍ではJavaScriptの基礎を中心に紹介しましたが、「[ECMAScript][]」の章で紹介したようにJavaScriptの基礎も年々更新されています。
基礎が更新されると応用であるライブラリも新しいものが登場し、定番だったものも徐々に変化していきます。
そのため知らなかったものが出てくるのはJavaScript自体が成長しているということです。

この書籍を読んでもまだ理解できなかったことや知らなかったことがあるのは問題ありません。
知らなかったことを見つけたときにそれが何かを必要に応じて調べられるということが、
JavaScriptという変化していく言語やそれを利用する環境においては重要です。


[TodoMVC]: http://todomvc.com/
[ECMAScript]: ../../../basic/ecmascript/README.md

[^vanilajs]: ライブラリやフレームワークをつかわずに実装したJavaScriptをVanilla JSと呼ぶことがあります。
