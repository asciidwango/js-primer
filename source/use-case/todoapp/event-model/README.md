---
author: azu
---

# イベントとモデル {#event-model}

Todoアイテムを追加する機能を実装しましたが、イベントを受け取り直接DOMを更新する方法は柔軟性がなくなるという問題があります。
また「Todoアイテムの更新」という機能を実装するには追加したTodoアイテム要素を識別する方法が必要です。
具体的には`id`属性などユニークな識別子などがどこにもないため、特定のアイテムを指定する更新や削除が実装できません。

まずはどのような点で柔軟性の問題が起きやすかについてを見ていきます。
その後、柔軟性や識別子の問題を解決するために**モデル**という概念を導入し、あらためて「Todoアイテムの追加」の機能を見ていきます。

## 直接DOMを更新する問題 {#direct-dom-modification-issue}

[前回のセクション][]では、操作した結果発生したイベントの発火という入力に対して、DOM（表示）の更新という出力が1対1でおこなわれていました。
つまりTodoリストにTodoアイテムが何個あるか、どのようなアイテムがあるかという状態がDOM上にしか存在しないことになります。

そのため、Todoアイテムの状態を更新するには、HTML要素にTodoアイテムの情報（タイトルや識別子となるidなど）をすべて埋め込む必要があります。
しかし、HTML要素に対して文字列しか埋め込めないため、Todoアイテムのデータを文字列にしないといけないという制限が発生します。

また操作と表示が1対1で更新される場合、1つの操作に対して複数の箇所の表示が更新されることもあります。
今回のTodoアプリでもTodoリスト(`#js-todo-list`)とTodoアイテム数（`#js-todo-count`)の2箇所を更新する必要があることからも分かります。

次の表に**操作**に対して更新する**表示**をまとめてみます。

| 機能               | 操作                       | 表示                                                                                                                   |
| ------------------ | -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Todoアイテムの追加 | フォームを入力し送信       | Todoリスト(`#js-todo-list`)にTodoアイテム要素を作成し子要素として追加。合わせてTodoアイテム数（`#js-todo-count`)を更新 |
| Todoアイテムの更新 | チェックボックスをクリック | Todoリスト(`#js-todo-list`)にある指定したTodoアイテム要素のチェック状態を更新                                          |
| Todoアイテムの削除 | 削除ボタンをクリック       | Todoリスト(`#js-todo-list`)にある指定したTodoアイテム要素を削除。合わせてTodoアイテム数（`#js-todo-count`)を更新       |

これは表示を更新しなければいけない箇所が増えるほど、操作に対する処理が複雑化していくことが予想できます。

ここでは次の2つの問題が見つかりました。

- Todoリストの状態がDOM上にしか存在しないため、状態をすべてDOM上に文字列で埋め込まないといけない
- 操作に対して更新する表示箇所が増えてくると、表示の処理が複雑化する

## モデルを導入する {#introduce-model}

この問題を避けるために、Todoアイテムという情報をJavaScriptクラスとしてモデル化します。
ここでのモデルとはTodoアイテムやTodoリストといった**もの**を表現し、操作や状態をもたせたオブジェクトという意味です。
クラスでは操作はメソッドとして実装し、状態はインスタンスにプロパティの値で管理できるため、今回はクラスでモデルを表現します。

たとえば、Todoリストを表現するモデルとして`TodoListModel`クラスを考えます。
TodoリストにはTodoアイテムを追加できるので`TodoListModel#addItem`メソッドを実装する必要があります。
また、Todoリストからアイテムの一覧を取得できる必要もあるので`TodoListModel#getAllItems`メソッドも必要です。
このようにTodoリストをクラスで表現する際にオブジェクトがどのような処理や状態をもつかを考え実装します。

このようにモデルを考え、先ほどの操作と表示の間にモデルを入れることを考えてみます。
「フォームを入力し送信」という**操作**を行った場合、`TodoListModel`という**モデル**に対して`TodoItemModel`を追加します。
そして、`TodoListModel`からアイテムの一覧を取得し、DOMを組み立て**表示**を更新します。

先ほどの表にモデルをいれてみます。
**操作**に対する**モデルの処理**はさまざまですが、**操作**に対する**表示**の処理はどの場合も同じになります。
これは表示箇所が増えた場合も**表示**の処理の複雑さが一定に保てることを意味しています。

| 機能               | 操作                       | モデルの処理                                                                            | 表示                            |
| ------------------ | -------------------------- | --------------------------------------------------------------------------------------- | ------------------------------- |
| Todoアイテムの追加 | フォームを入力し送信       | `TodoListModel`へ新しい`TodoItemModel`を追加                                            | `TodoListModel`を元に表示を更新 |
| Todoアイテムの更新 | チェックボックスをクリック | `TodoListModel`の指定した`TodoItemModel`の状態を更新                                    | `TodoListModel`を元に表示を更新 |
| Todoアイテムの削除 | 削除ボタンをクリック       | `TodoListModel`から指定の`TodoItemModel`を削除                                          | `TodoListModel`を元に表示を更新 |

この表を元にあらためて先ほどの問題点を見ていきましょう。

> Todoリストの状態がDOM上にしか存在しないため、状態をすべてDOM上に文字列で埋め込まないといけない

モデルであるクラスのインスタンスを参照すれば情報が手に入ります。
またモデルはただのJavaScriptクラスであるため、文字列ではない情報も保持できます。
そのため、DOMにすべての情報を埋め込む必要はありません。

> 操作に対して更新する表示箇所が増えてくると、表示の処理が複雑化する

表示はモデルの状態を元にしてHTML要素を作成し表示を更新します。
モデルの状態が変化していなければ、表示は変わらなくても問題ありません。

そのため操作したタイミングではなく、モデルの状態が変化したタイミングで表示を更新すればよいはずです。
具体的には「フォームを入力し送信」されたから表示を更新するのではなく、
「`TodoListModel`というモデルの状態が変化」したから表示を更新すればいいはずです。

そのためには、`TodoListModel`というモデルの状態が変化したことを表示側から知る必要があります。
ここで再び出てくるのがイベントです。

## モデルの変化を伝えるイベント {#model-and-event}

フォームを送信したらform要素から`submit`イベントが発火されます。
これと同じように`TodoListModel`の状態が変化したら`change`イベントを発火し、
表示側はそのイベントを監視してイベントが発火したら表示を更新すればよいはずです。

`TodoListModel`の状態の変化とは、「`TodoListModel`に新しい`TodoItemModel`が追加される」などが該当します。
先ほど表の「モデルの処理」は何かしら状態が変化しているので、表示を更新する必要があるわけです。

DOM APIのイベントの仕組みをモデルでも利用できれば、モデルが更新されたら表示を更新する仕組みを作れそうです。
ブラウザのDOM APIではこのようなイベント仕組みをDOM Eventsと呼びます。
Node.jsでは`events`と呼ばれるモジュールでAPIは異なりますが同様のイベントの仕組みが利用できます。
ここではイベントの仕組みを理解するために、イベントの発火と監視する機能をもつクラスを作ってみましょう。

とても難しく聞こえますが、今まで学んだクラスやコールバック関数などを使えば実現できます。

## EventEmitter {#event-emitter}

イベントの仕組みとは「イベントを発火する側」と「イベントを監視する側」の2つの面から成り立ちます。
場合によっては自分自身へイベントを発火し、自分自身でイベントを監視することもあります。

このイベントの仕組みをコード的に表現してみると「特定の関数を呼び出した（イベントを発火）ときに登録されている（イベントを監視側の）コールバック関数を呼び出す」となります。

モデルが更新されたら表示を更新するには「`TodoListModel`が更新したときに指定したコールバック関数を呼び出すクラス」を作れば目的は達成できます。
しかし、「`TodoListModel`が更新されたとき」というのはとても具体的な処理であるため、モデルを増やすたびに同じ処理をそれぞれのモデルへ実装する必要があります。

そのため、先ほどのイベントの仕組みを持った概念として`EventEmitter`というクラスを作成します。
そして`TodoListModel`は作成した`EventEmitter`を継承することでイベントの仕組みを導入していきます。

- 親クラス（`EventEmitter`）: イベントを発火した時、登録されているコールバック関数を呼び出すクラス
- 子クラス（`TodoListModel`）: 値を更新した時、登録されているコールバック関数を呼び出すクラス

まずは、親クラスとなる`EventEmitter`を作成していきます。

`EventEmitter`はイベントの仕組みで書いた発火側と監視側の機能を持ったクラスとなります。

- 監視側: `addEventLister`メソッドは、指定した`イベント名`に任意のコールバック関数を登録できる
- 発火側: `emit`メソッドは、指定された`イベント名`に登録済みのすべてのコールバック関数を呼び出す

これによって、`emit`メソッドを呼び出すと指定したイベントに関係する登録済みのコールバック関数を呼び出せます。
このようなパターンはObserverパターンとも呼ばれ、ブラウザやNode.jsなど多くの実行環境で類似するAPIが存在します。

次のように`src/EventEmitter.js`へ`EventEmitter`クラスを定義します。

[import, title:"src/EventEmitter.js"](./event-emitter/src/EventEmitter.js)

この`EventEmitter`は次のようにイベントの監視とイベントの発火の機能が利用できます。
監視側は`addEventLister`メソッドでイベントの種類（`type`）に対するイベントハンドラ（`handler`）を登録します。
発火側は`emit`メソッドでイベントを発火し、イベントハンドラを呼び出します。

<!-- doctest:disable -->
```js
import { EventEmitter } from "./src/EventEmitter.js";
const event = new EventEmitter();
// コールバック関数を登録
event.addEventLister(() => console.log("One!"));
event.addEventLister(() => console.log("Two!"));
// コールバック関数をまとめて呼びだす
event.emit();
// コールバック関数がそれぞれ呼び出し、コンソールには次のように出力される
// "One!"
// "Two!"
```

## EventEmitterを継承したTodoListモデル {#event-emitter-todolist-model}

次は作成した`EventEmitter`クラスを継承した`TodoListModel`クラスを作成しています。
`src/model/`ディレクトリを新たに作成し、このディレクトリに各モデルクラスを実装したファイルを作成します。

作成するモデルは、Todoリストを表現する`TodoListModel`と各Todoアイテムを表現する`TodoItemModel`です。
`TodoListModel`が複数の`TodoItemModel`を保持することでTodoリストを表現することになります。

- `TodoListModel`: Todoリストを表現するモデル
- `TodoItemModel`: Todoアイテムを表現するモデル

まずは`TodoItemModel`を`src/model/TodoItemModel.js`へ作成します。

`TodoItemModel`クラスは各Todoアイテムに必要な情報を定義します。
各Todoアイテムにはタイトル（`title`)、アイテムの完了状態（`completed`)、アイテムごとにユニークな識別子（`id`）をもたせます。
ただのデータの集合であるため、クラスではなくオブジェクトでも問題はありませんが、今回はクラスとして作成します。

次のように`src/model/TodoItemModel.js`へ`TodoItemModel`クラスを定義します。

[import, title:"src/model/TodoItemModel.js"](./event-emitter/src/model/TodoItemModel.js)

次のコードでは`TodoItemModel`クラスはインスタンス化でき、それぞれの`id`が自動的に異なる値となっていることが確認できます。
この`id`は後ほど特定のTodoアイテムを指定した更新する処理ときに、アイテムを区別する識別子として利用します。

[import src/model/TodoItemModel.example.js](./event-emitter/src/model/TodoItemModel.example.js)

次に`TodoListModel`を`src/model/TodoListModel.js`へ作成します。

`TodoListModel`クラスは、先ほど作成した`EventEmitter`クラスを継承します。
`TodoListModel`クラスは`TodoItemModel`の配列を保持し、新しいTodoアイテムを追加する際はその配列に追加します。
このとき`TodoListModel`の状態が変更したことを通知するために自分自身へ`change`イベントを発火します。

[import, title:"src/model/TodoListModel.js"](./event-emitter/src/model/TodoListModel.js)

次のコードは`TodoListModel`クラスを取り込み、新しい`TodoItemModel`を追加するサンプルコードです。
`TodoListModel#addTodo`メソッドで新しいTodoアイテムを追加した時に、`TodoListModel#onChange`で登録したイベントハンドラが呼び出されます。

[import, "src/model/TodoListModel.example.js"](./event-emitter/src/model/TodoListModel.example.js)

これでTodoリストに必要なそれぞれのモデルクラスが作成できました。
次はこれらのモデルを使い表示の更新を行ってみましょう。

## モデルを使って表示を更新する {#model-update-view}

さきほど作成した`TodoListModel`と`TodoItemModel`クラスを使い、「Todoアイテムの追加」を書き直してみます。

前回のセクションでは、フォームを送信すると直接DOMへ要素を追加しています。
今回のセクションでは、フォームを送信すると`TodoListModel`へ`TodoItemModel`を追加します。
`TodoListModel`に新しいTodoアイテムが増えると、`onChange`に登録したイベントハンドラが呼び出されるため、
そのハンドラ内でDOM（表示）を更新します。

まずは書き換え後の`App.js`を見ていきます。

[import, "src/App.js"](./event-emitter/src/App.js)

変更後の`App.js`では大きく分けて3つの部分が変更されているので順番に見ていきます。

### 1. TodoListの初期化 {#app-todolist-initialize}

作成した`TodoListModel`と`TodoItemModel`を取り込んでいます。

<!-- doctest:disable -->
```js
import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
```

そして、`App`クラスのコンストラクタ内で`TodoListModel`を初期化しています。
`App`のコンストラクタで`TodoListModel`を初期化しているのは、
このTodoアプリでは開始時にTodoリストの中身が空の状態で開始されるのに合わせるためです。

<!-- doctest:disable -->
```js
class App {
    constructor() {
        // 1. TodoListの初期化
        this.todoListModel = new TodoListModel();
    }
    // ...省略..
}
```

### 2. TodoListModelの状態が更新されたら表示を更新する {#app-todolist-onchange}

`mount`メソッド内で`TodoListModel`が更新されたら表示を更新するという処理を実装します。
`TodoListModel#onChange`で登録したハンドラは、`TodoListModel`の状態が更新されたら呼び出されます。

このハンドラ内では`TodoListModel#getTodoItems`でTodoアイテムを取得し、
この一覧から次のような要素（`todoListElement`）を作成しています。

```html
<!-- todoListElementの実質的な中身 -->
<ul>
    <li>Todoアイテム 1のタイトル</li>
    <li>Todoアイテム 2のタイトル</li>
</ul>
```

この作成した`todoListElement`要素を前回作成した、`html-util.js`の`render`関数を使い`containerElement`の中身を上書きしてます。
また、アイテム数は`TodoListModel#totalCount`で取得できるため、アイテム数だけを管理していた`todoItemCount`という変数は削除できます。

<!-- doctest:disable -->
```js
// render関数をimportに追加する
import { element, render } from "./view/html-util.js";
// ...省略...
// `containerElement`の中身を`todoListElement`で上書きして表示を更新
render(todoListElement, containerElement);
// アイテム数の表示を更新
todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.totalCount}`;
```

### 3. フォームを送信したら、新しいTodoItemを追加する {#app-add-new-todoitem}

前回のセクションでは、フォームを送信（`submit`）が行われると直接DOMへ要素を追加していました。
今回のセクションでは、`TodoListModel`の状態が更新されたら表示を更新する仕組みがすでにできています。

そのため、`submit`イベントのハンドラ内では`TodoListModel`に対して新しい`TodoItemModel`を追加するだけで表示が更新されます。
直接DOMへ`appendChild`していた部分を`TodoListModel#addTodo`メソッドを使いモデルを更新する処理へ置き換えるだけです。

## まとめ {#conclusion}

今回のセクションでは、[前回のセクション][]と同等の機能をモデルとイベントの仕組みを使うようにリファクタリングしました。
コード量は増えましたが、次に実装する「Todoアイテムの更新」や「Todoアイテムの削除」も同様の仕組みで実装できます。
前回のセクションのように操作に対してDOMを直接更新した場合、追加は簡単ですが既存の要素を指定する必要がある更新や削除は難しくなります。

次のセクションでは、今回のモデルと同じように「表示」に関しても整理を行い、残りの「Todoアイテムの更新」や「Todoアイテムの削除」の機能を実装しています。

## このセクションのチェックボックス {#section-checkbox}

- [x] 直接DOMを更新する問題について理解した
- [x] `EventEmitter`クラスでイベントの仕組みを実装した
- [x] `TodoListModel`を`EventEmitter`クラスを継承して実装した 
- [x] Todoアイテムの追加の機能をモデルを使ってリファクタリングした

ここまでのTodoアプリは次のURLで確認できます。

<a href="./event-emitter/" target="_blank">https://asciidwango.github.io/js-primer/use-case/todoapp/event-model/event-emitter/</a>

[前回のセクション]: ../form-event/README.md
