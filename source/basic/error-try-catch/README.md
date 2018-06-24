---
author: laco
---

# 例外処理 {#error-handling}

この章ではJavaScriptにおける例外処理について学びます。

## try...catch構文 {#try-catch}

[try...catch][]構文は例外が発生しうるブロックをマークし、例外が発生したときの処理を記述するための構文です。
次の例のように、`try`文にはひとつの`try`ブロックがあり、`try`ブロック内で発生した例外を`catch`節でキャッチします。

`try`ブロック内で例外が発生すると、それ以降の文は実行されず`catch`節に処理が移ります。
`finally`節が存在するときには、例外がなげられたかどうかにかかわらず、かならず`try`文の最後に実行されます。

{{book.console}}
```js
try {
    console.log("この文は実行されます");
    // 未定義の関数を呼び出してReferenceError例外が発生する
    undefinedFunction();
    console.log("この文は実行されません");
} catch (error) {
    // 例外が発生したあとはこのブロックが実行される
    console.log("この文は実行されます");
    console.log(error instanceof ReferenceError); // => true
    console.log(error.message); // => "undefinedFunction is not defined"
} finally {
    // このブロックはかならず実行される
    console.log("この文は実行されます");
}
```

また、`catch`節と`finally`節のうち、片方が存在していれば、もう片方の節は省略できます。
`finally`節のみを書いた場合は例外がキャッチされないため、`finally`節を実行後に例外が発生します。

<!-- 例外が発生するので実行はしない -->
<!-- doctest:disable -->
{{book.console}}
```js
// catch節のみ
try {
    undefinedFunction();
} catch (error) {
    console.log(error);
}
// finally節のみ
try {
    undefinedFunction();
} finally {
    console.log("この文は実行されます");
}
// 上記のtry-finnalyで例外がキャッチされていないため
console.log("この文は実行されません");
```

## throw文 {#throw}

[throw][]文を使うとユーザーが例外を投げることができます。
例外として投げられたオブジェクトは、`catch`節で関数の引数のようにアクセスできます。
このオブジェクトは[例外識別子][]と呼ばれます。


{{book.console}}
```js
try {
    // 独自の例外を投げる
    throw new Error("例外が投げられました");
} catch (error) {
    // catch節のスコープでerrorにアクセスできる
    console.log(error.message); // => "例外が投げられました"
}
```

## エラーオブジェクト {#error-object}

`try`文や`throw`文ではあらゆるオブジェクトを例外識別子として扱えます。
しかし、実際の開発において例外として投げられるのは、[Error][]オブジェクトとそこから派生するエラーオブジェクトです。


### Error {#error}

`Error`オブジェクトのインスタンスは`Error`を`new`して作成します。
コンストラクタの第一引数には、エラーの内容をあらわす文字列を渡します。
渡した文字列は`Error#message`プロパティに格納されます。

次の例では、`assertPositiveNumber`関数でエラーオブジェクトを作成し、例外として`throw`しています。
投げられたオブジェクトはcatch節の例外識別子として取得され、エラーメッセージが確認できます。

{{book.console}}
```js
// 渡された数値が0未満であれば例外を投げる関数
function assertPositiveNumber(num) {
    if (num < 0) {
        throw new Error(`${num} is not positive.`);
    }
}

try {
    assertPositiveNumber(-1);
} catch (error) {
    console.log(error instanceof Error); // => true
    console.log(error.message); // => "-1 is not positive."
}
```

`throw`文はあらゆるオブジェクトを例外として投げられますが、基本的には`Error`オブジェクトのインスタンスを投げることが推奨されます。
その理由は後述する**スタックトレース**のためです。
`Error`オブジェクトはインスタンスの作成時に、そのインスタンスが作成されたファイル名や行数などのデバッグに役立つ情報をもっています。
文字列のような`Error`オブジェクトでないオブジェクトを投げてしまうと、スタックトレースが得られません。

{{book.console}}
```js
// 文字列を例外として投げるアンチパターンの例
try {
    throw "例外が投げられました";
} catch (error) {
    console.log(error); // => "例外が投げられました"
}
```

### ビルトインエラー {#built-in-error}

JavaScriptエンジンが投げる組み込みのエラーのことをビルトインエラーと呼びます。
ビルトインエラーとして投げられるエラーオブジェクトは、すべて`Error`オブジェクトから派生したオブジェクトのインスタンスです。
そのため、ユーザーが定義したエラーと同じように例外処理できます。

ビルトインエラーはいくつか種類がありますが、ここでは代表的なものを紹介します。

#### ReferenceError {#reference-error}
[ReferenceError][]は存在しない変数や関数などの識別子が参照された場合のエラーです。
たとえば次のようなコードを実行すると、`ReferenceError`例外が投げられます。

{{book.console}}
```js
try {
    // 存在しない変数を参照する
    console.log(x);
} catch (error) {
    console.log(error instanceof ReferenceError); // => true
    console.log(error.name); // => "ReferenceError"
    console.log(error.message); // エラーの内容が表示される
}
```

#### SyntaxError {#syntax-error}
[SyntaxError][]は構文的に不正なコードを解釈しようとした場合のエラーです。
たとえば次のようなコードを実行すると、`SyntaxError`例外が投げられます。
`SyntaxError`例外はJavaScriptを実行する前のパース段階で発生するので、
実行されているスクリプト自身の構文エラーを`try...catch`構文でcatchすることはできません。
ここでは`eval`関数を使って動的にJavaScriptを解釈することで、実行時に`SyntaxError`を発生させています。

{{book.console}}
```js
try {
    // eval関数は渡した文字列をJavaScriptとして実行する関数
    // 正しくない構文を解釈する
    eval("foo bar");
} catch (error) {
    console.log(error instanceof SyntaxError); // => true
    console.log(error.name); // => "SyntaxError"
    console.log(error.message); // エラーの内容が表示される
}
```

#### TypeError {#type-error}
[TypeError][]は値が期待される型でない場合のエラーです。
たとえば次のようなコードを実行すると、`TypeError`例外が投げられます。

{{book.console}}
```js
try {
    // 関数でないオブジェクトを関数として呼び出す
    const fn = {};
    fn();
} catch (error) {
    console.log(error instanceof TypeError); // => true
    console.log(error.name); // => "TypeError"
    console.log(error.message); // エラーの内容が表示される
}
```

### ビルトインエラーを投げる {#throw-built-in-error}

ユーザーがビルトインエラーのインスタンスを作成することもできます。
通常の`Error`オブジェクトと同じように、それぞれのオブジェクトをnewします。
たとえば関数の引数を数値に限定したい場合は、次のように`TypeError`例外を投げるとよいでしょう。
メッセージを確認しなくても、エラーの名前だけで型に関する例外だとすぐにわかります。

{{book.console}}
```js
// 文字列を反転する関数
function reverseString(str) {
    if (typeof str !== "string") {
        throw new TypeError(`${str} is not a string`);
    }
    return str.split("").reverse().join("");
}

try {
    // 数値を渡す
    reverseString(100);
} catch (error) {
    console.log(error instanceof TypeError); // => true
    console.log(error.name); // => "TypeError"
    console.log(error.message); // "100 is not a string"
}
```

## エラーとデバッグ {#error-and-debug}

JavaScript開発においてデバッグ中に発生したエラーを理解することは非常に重要です。
エラーがもつ情報を活用することで、ソースコードのどこでどのような例外が投げられたのか知ることができます。

エラーはすべて`Error`オブジェクトを拡張したオブジェクトで宣言されています。
つまり、エラーの名前をあらわす`name`プロパティと内容をあらわす`message`プロパティをもっています。
この2つのプロパティを確認することで、多くの場面で開発の助けとなるでしょう。

次のコードではtry文で囲っていない部分で例外を投げています。

[import, error.js](src/error.js)

このスクリプトを読み込むと、投げられた例外についてのログがコンソールに出力されます。
ここではFirefoxにおける実行例を示します。

![コンソールでのエラー表示（Firefox）](images/error.png)

このエラーログには次の情報が含まれています。

| メッセージ | 意味 |
| -- | -- |
| `ReferenceError: x is not defined` | エラーの種類は`ReferenceError`で、`x`が未定義であること |
| `error.js:3:5` | 例外が`error.js`の3行目5列目で発生したこと。つまり`x++;`であること。 |

また、メッセージの後には例外のスタックトレースが表示されています。

- スタックトレースの最初の行が実際に例外が発生した場所です。つまり、3行目の `x++;` で例外が発生しています
- 次の行には、そのコードの呼び出し元が記録されています。つまり、3行目のコードを実行したのは5行目の`fn`関数の呼び出しです

このように、スタックトレースは上から下へ呼び出し元を辿れるように記録されています。

コンソールに表示されるエラーログには多くの情報が含まれています。
MDNの[JavaScriptエラーリファレンス][]には、ブラウザが投げるビルトインのエラーについて種類とメッセージが網羅されています。
開発中にビルトインエラーが発生したときには、リファレンスを見て解決方法を探すとよいでしょう。


[try...catch]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/try...catch
[throw]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/throw
[例外識別子]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/try...catch#.E4.BE.8B.E5.A4.96.E8.AD.98.E5.88.A5.E5.AD.90
[Error]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Error
[SyntaxError]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError
[ReferenceError]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError
[TypeError]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/TypeError
[JavaScriptエラーリファレンス]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Errors