---
author: azu
description: "1つのファイルに処理が集中するとメンテナンス性が低下するため、Todoアプリの表示要素をコンポーネントという単位に分割するリファクタリングをしていきます。"
---

# Todoアプリのリファクタリング {#todo-app-refactoring}

前のセクションで、予定していたTodoアプリの機能はすべて実装できました。
しかし、`App.js`を見てみるとほとんどがHTML要素の処理になっています。
このようなHTML要素の作成処理は表示する内容が増えるほど、コードの行数が線形的に増えていきます。
このままTodoアプリを拡張していくと`App.js`が肥大化してコードが読みにくく、メンテナンス性が低下してしまいます。

ここで、`App.js`の役割を振り返ってみましょう。
`App`というクラスを持ち、このクラスではModelの初期化やHTML要素とModel間で発生するイベントを中継する役割をもっています。
表示から発生したイベントをModelに伝え、Modelから発生した変更イベントを表示に伝えているという管理者といえます。

このセクションでは`App`クラスをイベントの管理者という役割に集中させるため、`App`クラスに書かれているHTML要素を作成する処理を別のクラスへ切り出すリファクタリングを行います。

## コンポーネント {#component}

`App`クラスの大部分を占めているのは`TodoItemModel`の配列に対応するTodoリストのHTML要素を作成する処理です。
このような表示のための処理を部品ごとのモジュールに分け、`App`クラスから作成したViewモジュールを使うような形にリファクタリングをしていきます。
ここでは、表示のための処理を扱うクラスをコンポーネントと呼び、ここでは`View`をファイル名の末尾につけることで区別します。

Todoリストの表示は次の2つの部品（コンポーネント）から成り立っています。

- Todoアイテムコンポーネント
- TodoアイテムをリストとしてまとめたTodoリストコンポーネント

この部品に対応するように次のViewのモジュールを作成していきます。
これらのViewのモジュールは、`src/view/`ディレクトリに作成していきます。

- `TodoItemView`: Todoアイテムコンポーネント
- `TodoListView`: Todoリストコンポーネント

### TodoItemViewを作成する {#TodoItemView}

まずは、Todoアイテムに対応する`TodoItemView`から作成しています。

`src/view/TodoItemView.js`ファイルを作成して、次のような`TodoItemView`クラスを`export`します。
この`TodoItemView`は、Todoアイテムに対応するHTML要素を返す`createElement`メソッドを持ちます。

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

`src/view/TodoListView.js`ファイルを作成し、次のような`TodoListView`クラスを`export`します。
この`TodoListView`は`TodoItemModel`の配列に対応するTodoリストのHTML要素を返す`createElement`メソッドを持ちます。

[import, title:"src/view/TodoListView.js"](./create-view/src/view/TodoListView.js)

`TodoListView#createElement`メソッドは`TodoItemView`を使いTodoアイテムのHTML要素を作り、`<li>`要素に追加していきます。
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
| `Model` -> `View` | `this.todoListModel.onChange(listener)`            | `TodoListModel`が変更イベントを受け取る |
| `View` -> `Model` | `formElement.addEventListener("submit", listener)` | フォームの送信イベントを受け取る        |
| `View` -> `Model` | `onUpdateTodo: listener`                           | Todoアイテムのチェックボックスの更新イベントを受け取る    |
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

実はこのTodoアプリはまだいくつかアプリケーションとして、完成していない部分があります。

入力欄でEnterキーを連打すると、空のTodoアイテムが追加されてしまうのは意図しない挙動です。
また、`App#mount`で`TodoListModel#onChange`などのイベントリスナーを登録していますが、そのイベントリスナーを解除していません。
このTodoアプリではあまり問題にはなりませんが、イベントリスナーは登録したままだとメモリリークに繋がる場合もあります。

余力がある人は、次の残ったTodoを完成させてみてください。

- [ ] タイトルが空の場合は、フォームを送信してもTodoアイテムを追加できないようにする
- [ ] `App#mount`でイベントリスナーを登録に対応して、`App#unmout`を追加しイベントリスナーを解除する

`App#mount`と対応する`App#unmount`を作成するというTodoは、アプリケーションのライフサイクルを意識するという課題になります。
ウェブページにはページ読み込みが完了した時に発生する`load`イベントと、読み込んだページを破棄した時に発生する`unload`イベントがあります。
Todoアプリも`mount`と`unmount`を実装し、次のようにウェブページのライフサイクルに合わせられます。

<!-- doctest:disable -->
```js
const app = new App();
// ページのロードが完了したときのイベント
window.addEventListener("load", () => {
    app.mount();
});
// ページがアンロードされたときのイベント
window.addEventListener("unload", () => {
    app.unmount();
});
```

残ったTodoも実装したものは、次のURLで確認できます。
ぜひ、自分で実装してみてウェブページやアプリの動きについて考えてみて下さい。

- <https://jsprimer.net/use-case/todoapp/final/more/>

## Todoアプリのまとめ {#todo-conclusion}

今回は、Todoアプリを構成する要素をModelとViewという単位でモジュールに分けていました。
モジュールを分けることでコードの見通しを良くしたり、Todoアプリにさらなる機能を追加しやすい形にしました。
このようなモジュールの分け方などの設計には正解はなくさまざまな考え方があります。

今回Todoアプリという題材をユースケースに選んだのは、JavaScriptのウェブアプリケーションではよく利用されている題材であるためです。
さまざまなライブラリを使ったTodoアプリの実装が[TodoMVC][]と呼ばれるサイトにまとめられています。
今回作成したTodoアプリは、TodoMVCからフィルター機能などを削ったものをライブラリを使わずに実装したものです。[^vanilajs]

現実では、ライブラリを全く使わずウェブアプリケーションを実装することは殆どありません。
ライブラリを使うことで、`html-util.js`のようなものは自分で書く必要はなくなったり、最後の課題として残ったライフサイクルの問題などは解決しやすくなります。

しかし、ライブラリを使って開発する場合でも、第一部の基本文法や第二部のユースケースで紹介したようなJavaScriptの基礎は重要です。
なぜならライブラリも、これらの基礎の上に実装されているためです。

また、作るアプリケーションの種類や目的によって適切なライブラリは異なります。
ライブラリによっては魔法のような機能を提供しているものもありますが、それらも何かしらの基礎となる技術があることは覚えておいてください。

この書籍ではJavaScriptの基礎を中心に紹介しましたが、「[ECMAScript][]」の章で紹介したようにJavaScriptの基礎も年々更新されています。
基礎が更新されると応用であるライブラリも新しいものが登場し、定番だったものも徐々に変化していきます。
そのため知らなかったものが出てくるのはJavaScript自体が成長しているということです。

この書籍を読んでまだ理解できなかったことや知らなかったことがあるのは問題ありません。
知らなかったことを見つけたときにそれが何かを必要に応じて調べられるということが、
JavaScriptという変化していく言語やそれを利用する環境においては重要です。


[TodoMVC]: http://todomvc.com/
[ECMAScript]: ../../../basic/ecmascript/README.md

[^vanilajs]: ライブラリやフレームワークをつかわずに実装したJavaScriptをVanilla JSと呼ぶことがあります。
