---
author: azu
---

# 値の評価と表示 {#read-eval-print}

変数宣言を使うことで値に名前をつける方法を学びました。
次はその値をどのように評価するかについてです。

値の評価とは、次のような入力を評価して結果を返すことを示しています。

- `1 + 1` という式を評価したら `2` という結果を返す
- `bookTitle` という変数を評価したら、変数に代入されている値を返す

この値の評価方法を見ていくため、実行環境でJavaScriptを実行する方法を見ていきます。

## ブラウザでJavaScriptを実行する {#execute-js-on-browser}

まずはブラウザ上でJavaScriptのコードを実行してみましょう。
この書籍ではブラウザとして[Firefox][]を利用します。
次のURLからFirefoxをダウンロードし、インストールしてください。

- Firefox: <https://www.mozilla.org/ja/firefox/>

ブラウザでJavaScriptを実行する方法としては大きく分けて2つあります。
1つ目はブラウザの開発者ツールのコンソール上でJavaScriptコードを評価する方法です。
2つ目はHTMLファイルを作成しJavaScriptコードを読み込む方法です。

### ブラウザの開発者ツールのコンソール上でJavaScriptコードを評価する方法 {#repl-on-browser}

ブラウザやNode.jsなど多くの実行環境には、コードを評価してその結果を表示するREPL（read–eval–print loop）と呼ばれる機能があります。
Firefoxでは開発者ツールの**Webコンソール**と呼ばれる機能にREPL機能が含まれています。

Firefoxの開発者ツールは次のいずれかの方法で開きます。

- Firefox メニュー（メニューバーがある場合や macOS では、ツールメニュー）の Web 開発サブメニューで "Web コンソール" を選択する
- キーボードショートカット Ctrl+Shift+K（macOS では Command+Option+K）を押下する

詳細は"[Webコンソールを開く][]"を参照してください。

- [ ] スクリーンショット

"コンソール"を選択すると、コマンドライン（二重山かっこ`»`から始まる欄）に任意のコードを入力し評価できます。
このコマンドラインがブラウザにおけるREPL機能です。

REPLに`1`という値を入力すると、その評価結果である`1`が次の行に表示されます。

```
» 1
1
```

`1 + 1` という式を入力すると、その評価結果である`2`が次の行に表示されます。

```
» 1 + 1
2
```

次に`const`キーワードを使って`bookTitle`という変数を宣言してみると、`undefined`という結果が次の行に表示されます。
変数宣言は変数名と値を関連づけるだけであるため、変数宣言自体は何も値を返さないという意味で`undefined`が結果になります。
REPLではそのまま次の入力ができるため、`bookTitle`という入力をすると、先ほど変数に入れた`"JavaScriptの本"`という結果が次の行に表示されます。

```
» const bookTitle = "JavaScriptの本";
undefined
» bookTitle
"JavaScriptの本"
```

このようにコマンドラインのREPL機能では、JavaScriptのコードを1行ごとに実行できます。
Shift + Enterで改行もできるため、まとめて複数行の入力もできます。
好きな単位でJavaScriptのコードを評価できるため、コードの動きを簡単に試したい場合などに利用できます。

注意点としては、REPLではそのREPLを終了するまで`const`キーワードなどで宣言した変数が残り続けます。
たとえば、`const`での変数宣言は同じ変数名を二度定義できないというルールでした。
そのため、1行づつ実行しても同じ変数名の定義を行うとSyntaxErrorとなります。

```
» const bookTitle = "JavaScriptの本";
undefined
» const bookTitle = "JavaScriptの本";
SyntaxError: redeclaration of const bookTitle
```

ブラウザでは、ページをリロードするとREPLの実行状態もリセットできます。
そのため、`redeclaration`（再定義）といったエラーメッセージが出た際にはページをリロードしてみてください。

### HTMLファイルを作成しJavaScriptコードを読み込む方法 {#js-in-html}

REPLなどは自動で評価結果のコンソール表示まで行いますが、アプリケーションコードで勝手に評価結果を表示されることはありません。
あくまで自動表示はREPLの機能なので、アプリケーションコードでは**コンソール表示**するためのAPIが存在しています。

## Console API {#console-api}

JavaScriptの多くの実行環境では、Console APIが**コンソール表示**を行うAPIとなっています。
`console.log(引数)`の引数にコンソール表示したい値を入れることで、評価結果がコンソールに表示されます。
次の例では `"JavaScript"` という文字列を評価した結果がコンソールに表示されます。

{{book.console}}
[import, console-example.js](./src/console-example.js)

文字列の表示結果はそのままの文字列です。

次のように引数に式を書いた場合は、先に値を評価してから、その結果をコンソールに表示します。
そのため、`1 + 1` の評価結果として `2` がコンソールに表示されます。

{{book.console}}
[import, console-expression-example.js](./src/console-expression-example.js)

同じように引数に変数を渡すこともできます。
この場合も、まず先に引数である変数を評価してから、その結果をコンソールに表示します。

{{book.console}}
[import, console-variable-example.js](./src/console-variable-example.js)

Console APIは原始的なプリントデバッグとして利用できるので、
「この値は何だろう」と思ったらコンソールに表示してみることで解決する問題は多いです。

また、JavaScriptの開発環境は高機能化が進んでいるため、デバッガーを使うことで、
コードに`console.log`メソッドを書かなくても値を見ることができます。

この書籍では、コード例において評価結果を表示する場合はConsole APIを利用していきます。

また、すでに何度も登場していますがコメントで`// => 評価結果`と書いている場合があります。
このコメントは、その左辺にある値を評価した結果またはConsole APIで表示した結果を掲載しています。

{{book.console}}
```js
const total = 42 + 42;
// totalの評価結果は84
total; // => 84
// Console APIの表示結果は"JavaScript"
console.log("JavaScript"); // => "JavaScript"
```

[Firefox]: https://www.mozilla.org/ja/firefox/
[Webコンソールを開く]: https://developer.mozilla.org/ja/docs/Tools/Web_Console/Opening_the_Web_Console