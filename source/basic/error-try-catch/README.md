---
author: laco
---

# 例外処理

この章ではJavaScriptにおける例外処理について学びます。

## try...catch構文とthrow文

[try...catch][]構文は例外が発生しうるブロックをマークし、例外が発生したときの処理を記述するための構文です。
次の例のように、`try`文にはひとつの`try`ブロックがあり、`try`ブロック内で発生した例外を`catch`節でキャッチします。
`try`ブロック内で例外が発生すると、それ以降の文は実行されず`catch`節に処理が移ります。
`finally`節が存在するときには、例外が発生してもしなくてもかならず`try`文の最後に実行されます。
`catch`節は必須ですが、`finally`節は省略可能です。

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
} finally {
    // このブロックはかならず実行される
    console.log("この文は実行されます");
}
```

[throw][]文を使うとユーザーが例外を投げることができます。
例外として投げられたオブジェクトは、`catch`節で関数の引数のようにアクセスできます。
このオブジェクトは[例外識別子][]と呼ばれます


{{book.console}}
```js
try {
    // 独自の例外を投げる
    throw "例外が投げられました";
} catch (error) {
    // catch節のスコープで
    console.log(error); // => "例外が投げられました"
}
```

## エラーオブジェクト

`try`文や`throw`文ではあらゆるオブジェクトが例外として扱われますが、
ほとんどの場合において実際に例外として使われるのは[Error][]オブジェクトとそこから派生するエラーオブジェクトです。

### ビルトインエラー

WebブラウザのJavaScriptエンジンが投げる組み込みのエラーのことをビルトインエラーと呼びます。

### 独自エラー

エラーオブジェクトはユーザーが独自に作成することもできます。

## エラーとデバッグ

JavaScript開発においてデバッグ中に発生したエラーを理解することは非常に重要です。
エラーには**種類**と**メッセージ**と**スタックトレース**があり、これらを活用することで、
ソースコードのどこでどのようなエラーが発生したのか知ることができます。


[try...catch]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/try...catch
[throw]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/throw
[例外識別子]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/try...catch#.E4.BE.8B.E5.A4.96.E8.AD.98.E5.88.A5.E5.AD.90
[Error]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Error