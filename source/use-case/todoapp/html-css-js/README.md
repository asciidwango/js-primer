---
author: azu
---

# アプリの構成要素 {#app-structure}

HTMLとJavaScriptの[エントリポイント][]を作成しましたが、次のはこのTodoアプリの構成要素をあらためて見ていきましょう。
Todoアプリは、次のような機能を実装していくため複数の機能を実装していく必要があります。

- Todoを追加する
- Todoを更新する
- Todoを削除する

また、アプリと呼ぶからには見た目もちょっとしたものにしないと雰囲気が出ません。
このセクションでは、多くのウェブアプリケーションを構成するHTML、CSS、JavaScriptの役割について見ていきます。
このセクションで見た目だけで機能がないハリボテのTodoアプリは完成させ、次のセクションから実際にJavaScriptを使ってTodoアプリを実装していきます。

## ユーザー・インタフェース {#ui}

Todoアプリはブラウザで実行する向けに書いていきますが、ウェブアプリを作成するにはHTMLやCSS、JavaScriptを組み合わせて書いていきます。

- HTML: コンテンツの構造を記述するためのマークアップ言語
- CSS: HTMLの見た目を装飾するスタイルシート言語
- JavaScript: インタラクションといった動作を扱うプログラミング言語

多くのウェブアプリケーションはHTMLでコンテンツの構造を定義し、CSSで見た目を装飾し、JavaScriptで動作を付けることで実装されます。
JavaScriptは動的にHTMLやCSSを定義できるため、役割が明確に見えない場合もありますがこれらを組み合わせていることには代わりません。

一方、ブラウザにはiOSやAndroidのようにOSが提供するようなUIフレームワークの標準はありません。
そのためユーザーの実装したさまざまなUIフレームワークがあります。
それらのフレームワークを使うかや自分でアプリごとに定義してユーザーインターフェースを作成します。
これは１つのTodoアプリをとっても書き方が人によって全く異なる場合があるということでもあります。

今回のTodoアプリは特別なフレームワークを使わずに、そのままのHTML、CSS、JavaScriptを組み合わせて書いていきます。

## Todoアプリの構造をHTMLで定義する {#todo-html}


最初に今回作成するTodoアプリの最終的なHTMLの構造を見ていきます。
`todoapp`ディレクトリの`index.html`を次の内容に変更します。

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Todo App</title>
    <link href="./index.css" rel="stylesheet"/>
</head>
<body>
<main class="todoapp">
    <form id="js-form">
        <input id="js-form-input" class="new-todo" type="text" placeholder="What need to be done?" autocomplete="off">
    </form>
    <div id="js-todo-list" class="todo-list">
        <!-- 動的に更新されるTodoリスト -->
    </div>
</main>
<script src="./index.js" type="module"></script>
</body>
</html>
```


[エントリポイント]: ../entrypoint/README.md