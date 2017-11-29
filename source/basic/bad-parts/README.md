---
author: laco
---

# 非推奨の機能

JavaScriptにはイディオム（慣用的な書き方）や文法のなかには、
ECMAScriptのアップデートによって不要になったり非推奨になったりした古い書き方がいくつもあります。
そのような書き方はこれから書かれるJavaScriptの中で使わないようにすべきですが、
既存の古いコードのなかで使われていたときに読めなければ困るでしょう。
この章では、そのような一般的に非推奨とされるJavaScriptの書き方を紹介します。

## `arguments`による可変長引数

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