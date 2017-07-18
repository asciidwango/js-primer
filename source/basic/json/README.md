---
author: laco
---

# JSON

## JSONとは {#what-is-json}

JSONはJavaScript Object Notationsの略で、JavaScriptのオブジェクト表記をベースに作られた軽量なデータフォーマットです。
JSONの仕様は[ECMA-404][]によって標準化されています。
人間にとって読み書きが容易で、マシンにとっても簡単にパースや生成を行なえる形式になっているため、
多くのプログラミング言語がJSONを扱う機能を備えています。

JSONはJavaScriptのオブジェクトリテラル、配列リテラル、各種プリミティブ型の値を組み合わせたものです。
ただしJSONとJavaScriptは一部の構文に違いがあります。
たとえばJSONでは、オブジェクトリテラルのキーを必ずダブルクオートで囲まなければいけません。
また、小数点から書き始める数値リテラルや、先頭がゼロから始まる数値リテラルも使えません。
これらは機械がパースしやすくするために仕様で定められた制約です。

```json
{
    "object": { 
        "number": 1, 
        "string": "js-primer",
        "boolean": true,
        "null": null,
        "array": [1, 2, 3]
    }
}
```

JSONの細かい仕様に関しては[json.orgの日本語ドキュメント][]にわかりやすくまとまっているので、参考にするとよいでしょう。

## `JSON`オブジェクト {#json-object}

JavaScriptでJSONを扱うには、ビルトインの[JSONオブジェクト][]を利用します。
`JSON`オブジェクトはグローバルオブジェクトなので、どのスコープからでもアクセスできます。
`JSON`オブジェクトはJSON形式の文字列とJavaScriptのオブジェクトを相互に変換するための`parse`メソッドと`stringify`メソッドを提供します。

### JSON文字列をオブジェクトに変換する {#json-parse}

[JSON.parseメソッド][]は引数に与えられた文字列をJSONとしてパースし、その結果をJavaScriptのオブジェクトとして返す関数です。
次のコードは簡単なJSON形式の文字列をJavaScriptのオブジェクトに変換する例です。

{{book.console}}
```js
var json = "{ \"id\": 1, \"name\": \"js-primer\" }";
var obj = JSON.parse(json);
console.log(obj.id); // => 1
console.log(obj.name); // => "js-primer"
```

文字列がJSONの配列を表す場合は、`JSON.parse`メソッドの返り値も配列になります。

{{book.console}}
```js
var json = "[1, 2, 3]";
console.log(JSON.parse(json)); // => [1, 2, 3]
```

与えられた文字列がJSON形式でパースできない場合は例外が投げられます。
また、実際のアプリケーションでJSONを扱うのは、外部のプログラムとデータを交換する用途がほとんどです。
外部のプログラムが送ってくるデータが常にJSONとして正しい保証はないので、`JSON.parse`メソッドは基本的にtry-catch文で例外処理をするべきです。

### オブジェクトをJSON文字列に変換する {#json-format}

[JSON.stringifyメソッド][]は第1引数に与えられたオブジェクトをJSON形式の文字列に変換して返す関数です。
次のコードはJavaScriptのオブジェクトをJSON形式の文字列に変換する例です。

{{book.console}}
```js
var obj = { id: 1, name: "js-primer", bio: null };
console.log(JSON.stringify(obj)); // => '{"id":1,"name":"js-primer","bio":null}'
```

`JSON.stringify`メソッドにはオプショナルな引数が2つあります。
第2引数はreplacer引数とも呼ばれ、変換後のJSONに含まれるプロパティ関数あるいは配列を渡せます。
関数を渡した場合は引数にプロパティのキーと値が渡され、その返り値によって文字列に変換される際の挙動をコントロールできます。
次の例は値がnullであるプロパティを除外してJSONに変換するreplacer引数の例です。
replacer引数の関数でundefinedが返されたプロパティは、変換後のJSONに含まれなくなります。

{{book.console}}
```js
var obj = { id: 1, name: "js-primer", bio: null };
var replacer = (key, value) => {
    if (value === null) {
        return undefined;
    }
    return value;
};
console.log(JSON.stringify(obj, replacer)); // => '{"id":1,"name":"js-primer"}'
```

replacer引数に配列を渡した場合はプロパティのホワイトリストとして使われ、
その配列に含まれる名前のプロパティだけが変換されます。

{{book.console}}
```js
var obj = { id: 1, name: "js-primer", bio: null };
var replacer = ["id", "name"];
console.log(JSON.stringify(obj, replacer)); // => '{"id":1,"name":"js-primer"}'
```

第3引数はspace引数とも呼ばれ、変換後のJSON形式の文字列を読みやすくフォーマットする際のインデントを設定できます。
数値を渡すとその数値分の長さのスペースで、文字列を渡すとその文字列でインデントされます。
次のコードはスペース2個でインデントされたJSONを得る例です。

{{book.console}}
```js
var obj = { id: 1, name: "js-primer" };
// replacer引数を使わない場合はnullを渡すのが一般的です
console.log(JSON.stringify(obj, null, 2)); 
/*
{
   "id": 1,
   "name": "js-primer"
}
*/
```

また、次のコードはタブ文字でインデントされたJSONを得る例です。

{{book.console}}
```js
var obj = { id: 1, name: "js-primer" };
console.log(JSON.stringify(obj, null, "\t")); 
/*
{
   "id": 1,
   "name": "js-primer"
}
*/
```

## [コラム] JSON文字列にシリアライズできないオブジェクト

`JSON.stringify`メソッドはJSONで表現可能な値だけをシリアライズします。
そのため、値が関数や`Symbol`、あるいは`undefined`であるプロパティなどは変換されません。
ただし、配列の値としてそれらが見つかったときには例外的に`null`に置き換えられます。
またキーが`Symbol`である場合にもシリアライズの対象外になります。

さらに正規表現、Map、Setなど一部のオブジェクトは空のオブジェクトに変換されることにも注意しましょう。

{{book.console}}
```js
// 値が関数のプロパティ
console.log(JSON.stringify({ x: function() {} })); // => '{}'
// 値がSymbolのプロパティ
console.log(JSON.stringify({ x: Symbol("") })); // => '{}'
// 値がundefinedのプロパティ
console.log(JSON.stringify({ x: undefined })); // => '{}'
// 配列の場合
console.log(JSON.stringify({ x: [10, function() {}] })); // => '{"x":[10,null]}'
// キーがSymbolのプロパティ
JSON.stringify({ [Symbol("foo")]: "foo" }); // => '{}'
// 値が正規表現のプロパティ
console.log(JSON.stringify({ x: /foo/ })); // => '{"x":{}}'
```

`JSON.stringify`メソッドがシリアライズに失敗することもあります。
よくあるのは、参照が循環しているオブジェクトをシリアライズしようとしたときに例外が投げられるケースです。
たとえば次の例のように、あるオブジェクトのプロパティを再帰的に辿って自分自身が見つかるような場合はシリアライズが不可能となります。

[import circular-reference.js](src/circular-reference.js)

## [コラム] `toJSON`メソッドを使ったシリアライズ

オブジェクトが`toJSON`メソッドを持っている場合、`JSON.stringify`メソッドは既定の文字列変換ではなく`toJSON`メソッドの返り値を使います。
次の例のように、引数に直接渡されたときだけでなく引数のプロパティとして登場したときにも再帰的に処理されます。

{{book.console}}
```js
var obj = {
    foo: "foo",
    toJSON() {
        return "bar";
    }
};
console.log(JSON.stringify(obj)); // => '"bar"'
console.log(JSON.stringify({ x: obj })); // => '{"x":"bar"}'
```

`toJSON`メソッドは自作のクラスを特殊な形式でシリアライズする目的などに使われます。

[ECMA-404]: http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf
[json.orgの日本語ドキュメント]: http://www.json.org/json-ja.html
[JSONオブジェクト]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON
[JSON.parseメソッド]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
[JSON.stringifyメソッド]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
