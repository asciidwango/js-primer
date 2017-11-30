---
author: laco
---

<!-- textlint-disable eslint -->

# 非推奨の機能

JavaScriptのイディオム（慣用的な書き方）や文法のなかには、
ECMAScriptのアップデートによって不要になったり非推奨になったりした古い書き方がいくつもあります。
そのような書き方はこれから書かれるJavaScriptの中で使わないようにすべきですが、
既存の古いコードのなかで使われていたときに読めなければ困るでしょう。
この章では、そのような一般的に非推奨とされるJavaScriptの書き方を紹介します。

## 即時実行関数

- 代替方法: `let`/`const`による変数宣言

即時実行関数（**IIEF**, _Immediately-Invoked Function Expression_）は、
グローバルスコープの汚染を避けるために生まれたイディオムです。
次のように、匿名関数を宣言した直後に呼び出すことで、任意の処理を関数のスコープに閉じて実行できます。

{{book.console}}
```js
(function() {
    // 関数のスコープ内でfoo変数を宣言している
    var foo = "foo";
    console.log(foo); // => "foo"
})();
// foo変数のスコープ外
console.log(typeof foo === "undefined"); // => true
```

ECMAScript 5までは、変数を宣言する方法は`var`しか存在しません。
このイディオムは`var`によるグローバルスコープの汚染を防ぐために必要でした。
しかしECMAScript 2015で導入された`let`と`const`により、ブロックスコープに対して変数宣言できるようになりました。
そのため、即時実行関数が必要な場面はほとんどないでしょう。
先ほどの即時実行関数は次のように書き換えられます。

{{book.console}}
```js
{
    // ブロックスコープ内でfoo変数を宣言している
    const foo = "foo";
    console.log(foo); // => "foo"
}
// foo変数のスコープ外
console.log(typeof foo === "undefined"); // => true
```

## `arguments`による可変長引数

- 代替方法: Rest parameters

`arguments`変数はその関数に渡された引数が格納される特殊な変数です。
たとえば引数として渡した数値を足し合わせる`sum`関数は、`arguments`変数を使って次のように書けます。

{{book.console}}
```js
function sum() {  
    // argumentsはarray-likeなオブジェクトなのでreduceメソッドを持たない
    return Array.prototype.reduce.call(arguments, function(sum, el) {
        return sum + el;
    });
}
sum(10, 5, 2); // => 17  
```

`arguments`変数は配列のようにインデックスで要素にアクセスできますが、`Array`オブジェクトのインスタンスではありません。
そのため、`map`や`reduce`といった`Array`オブジェクトのメソッドを直接呼び出すことはできません。

ECMAScript 2015で導入された**Rest parameters**は、可変長引数を文法としてサポートします。
Rest parametersが使える環境であれば、`arguments`変数は不要です。
さきほどの`sum`関数は次のように書き直すことができます。
可変長引数を直接配列として扱えるため、こちらの新しい書き方が推奨されます。

{{book.console}}
```js
function sum(...numbers) {  
    return numbers.reduce((sum, el) => sum + el);
}
sum(10, 5, 2); // => 17  
```

<!-- textlint-enable eslint -->