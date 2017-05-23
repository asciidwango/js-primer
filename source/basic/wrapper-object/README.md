# ラッパーオブジェクト

JavaScriptのデータ型は大きくプリミティブ型とオブジェクトに分けられることを説明しました。
しかし、JavaScriptではプリミティブ型の値においてもメソッドを呼び出すことができます。

```js
// String#toLocaleUpperCaseを呼び出している
"string".toLocaleUpperCase(); // => "STRING"
```

これはリテラルで書かれた文字列も`String`のインスタンスメソッドを呼び出せていることが分かります。
しかし、オブジェクトではない文字列が`String`のインスタンスメソッドを呼び出せることは一見不思議です。

この章では、プリミティブ型の値がなぜオブジェクトのメソッドを呼び出せるのかというその仕組みについて解説します。

## プリミティブ型とラッパーオブジェクト

<!--　textlint-disable preset-ja-technical-writing/max-ten -->

JavaScriptのプリミティブ型である、真偽値（Boolean）、数値（Number） 、文字列（String）、シンボル（Symbol）はそれぞれオブジェクトが存在します。たとえば、プリミティブ型の文字列のオブジェクトとして、`String`オブジェクトがあります。

この`String`コンストラクタを`new`することで文字列のインスタンスを作ることができます。

<!-- textlint-enable -->

```js
// "string"の値をラップしたStringのインスタンスを生成
var string = new String("string");
// StringのインスタンスメソッドであるtoLocaleUpperCaseを呼び出す
string.toLocaleUpperCase(); // => "STRING"
```

このように、プリミティブ型の値を包んだ（ラップした）オブジェクトといえます。
そのため、プリミティブ型の値に対しての**ラッパーオブジェクト**と呼ばれます。

ラッパーオブジェクトは次のようなものがあります。

- `Boolean` - `true`/`false`
- `Number` - `1`/`2`など
- `String` - `"文字列"`など
- `Symbol` - `Symbol("説明")`など
- `undefined`と`null`は対応するラッパーオブジェクトがない

ひとつ注意点として、ラッパーオブジェクトは名前のとおりオブジェクトです。
そのため、次のように`typeof`演算子でラッパーオブジェクトを見ると`"object"`です。

```js
var string = "string";
console.log(typeof string); // => "string";
var stringWrapper = new String("string");
console.log(typeof string); // => "object";
```

## プリミティブとラッパーオブジェクトの相互変換

プリミティブ型の値である文字列が`String`のインスタンスメソッドを呼び出せる仕組みには、先ほど紹介したラッパーオブジェクトが関係します。
JavaScriptでは、プリミティブ型の値に対してアクセスする際に自動で対応するラッパーオブジェクトに変換してから処理されます。
つまり、`"string"`という文字列へアクセスした際に自動で、`new String("string")`のようなラッパーオブジェクトへ変換されています。
これにより、プリミティブ型の値である文字列が`String`のインスタンスメソッドを呼び出すことができます。

```js
var str = "string";
str.toLocaleUpperCase(); // => "STRING";
// `str`へアクセスした際に、"string"に対応するラッパーオブジェクトへ変換される
new String(str).toLocaleUpperCase(); // => "STRING";
```

一方、ラッパーオブジェクトからプリミティブ型の値を取り出すこともできます。

`ラッパーオブジェクト.valueOf`メソッドを呼び出すことで、ラッパーオブジェクトから値を取り出せます。
たとえば、次のように文字列のラッパーオブジェクトから`valueOf`メソッドで文字列を取り出すことができます。

```js
var stringWrapper = new String("string");
// プリミティブ型の値を取得する
console.log(stringWrapper.valueOf()); // => "string"
```

しかし、実際には`valueOf`メソッドを明示的に呼び出す必要はありません。
実は、ラッパーオブジェクトからプリミティブ型の値への変換もアクセス時に自動的に行われます。
そのため、先ほどの例は`valueOf`メソッドを呼び出さなくても自動的に行われています。

```js
var stringWrapper = new String("string");
// valueOfメソッドを読んでいないのにプリミティブ型の値が評価結果となる
console.log(stringWrapper); // => "string"
```