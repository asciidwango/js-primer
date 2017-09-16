---
author: laco
---

# Date

この章では、JavaScriptで日付や時刻を扱うための[Date][]について学びます。

## Dateオブジェクト

`Date`オブジェクトは`String`や`Array`などと同じく、ビルトインのグローバルオブジェクトです。
そのため、スクリプト中のどこからでも呼び出して使えます。

`Date`オブジェクトをインスタンス化することで、ある特定の日付や時刻を表すオブジェクトが得られます。
それぞれのインスタンスオブジェクトはUTCにおける1970年1月1日を基準としたミリ秒値をもち、
その時刻値をもとに日付や時刻を計算するメソッドを提供します。

### インスタンスの作成

`Date`オブジェクトのインスタンスは、new演算子を使って作成します。
引数を与えずにコンストラクタ関数を呼び出すと、呼び出された瞬間の現在時刻を表すインスタンスを作成します。
作成した`Date`オブジェクトのインスタンスが表す時刻は、`getTime`メソッドを使って取得できます。
また、`toISOString`メソッドを使うと、その時刻をUTC（協定世界時）における[ISO 8601][]形式の文字列に変換できます。

{{book.console}}
```js
const now = new Date();
console.log(now.getTime());
console.log(now.toISOString());
```

現在ではない、ある特定の時刻を表すインスタンスを作成するにはコンストラクタ関数に引数を渡します。
`Date`オブジェクトのコンストラクタ関数はいくつかのオーバーロードがあり、
時刻をどう表現するかによって使い分けることができます。

もっとも単純で確実なのは、ミリ秒値を渡してインスタンスを作成する方法です。
次のようにコンストラクタに時刻のミリ秒値を数値型で渡します。
後述するタイムゾーンの問題を回避できるため、多くの場合はこの方法を使うことが推奨されます。

{{book.console}}
```js
// 時刻のミリ秒値を直接指定する形式
// 1136214245999はUTCで2006年1月2日15時04分05秒999を表す
const date = new Date(1136214245999);
console.log(date.toISOString()); // => "2006-01-02T15:04:05.999Z"
```

現在時刻のミリ秒値を返す[Date.now][]メソッドと併用すると、引数なしの場合と同じ結果になります。
つまり、次のコードは同じ意味をもちます。

{{book.console}}
```js
// 1. 引数なしでnewする
const now = new Date();
// 2. 現在時刻をDate.nowメソッドで取得してから渡す
const ms = Date.now();
const fromMs = new Date(ms);
```

2つめは、時刻を文字列として渡してインスタンスを作成する方法です。
[RFC2822][]や[ISO 8601][]の形式にしたがった文字列を渡すことができます。
ただし、渡された文字列のパースはブラウザごとに動作が異なることに注意しましょう。
また、文字列からタイムゾーンが読み取れないとき、自動的に実行環境のタイムゾーンによって計算されることにも注意が必要です。

{{book.console}}
```js
// ISO 8601形式の文字列

// UTCで2006年1月2日15時04分05秒999を表す文字列
const inUTC = new Date("2006-01-02T15:04:05.999Z");
console.log(inUTC.toISOString()); // => "2006-01-02T15:04:05.999Z"
// タイムゾーンの記述がないと実行環境のタイムゾーンを使う
// Asia/Tokyoで実行すると9時間分ずれる
const inLocal = new Date("2006-01-02T15:04:05.999");
console.log(inLocal.toISOString()); // "2006-01-02T06:04:05.999Z" (Asia/Tokyoの場合)
```

このコンストラクタにおける文字列から時刻へのパース処理は、[Date.parse][]メソッドと共通しています。
`Date.parse`メソッドは渡された文字列をパースし、ミリ秒値に変換して返します。
つまり、次のコードは同じ意味をもちます。

{{book.console}}
```js
// 1. 文字列から直接Dateオブジェクトのインスタンスを得る
const fromString = new Date("2006-01-02T15:04:05.999Z");
// 2. Date.parseメソッドを使って文字列をミリ秒値に変換してから渡す
const ms = Date.parse("2006-01-02T15:04:05.999Z");
const fromMs = new Date(ms);
```

3つめは、時刻を年・月・日などの部分ごとに数値で指定する方法です。
コンストラクタ関数に2つ以上の引数を渡すとこの方法が使われます。
日を表す第3引数から後ろの引数は省略可能ですが、日付だけはデフォルトで1が設定され、その他は0が設定されます。
また、月を表す第2引数は0から11までの数値で指定することにも注意しましょう。

この方法では、タイムゾーンを指定できません。
渡した数値は常にローカルのタイムゾーンにおける時刻とみなされます。
タイムゾーンを考慮するときには、あらかじめ計算済みの数値を渡す必要があります。

{{book.console}}
```js
// 実行環境に置ける2006年1月2日15時04分05秒999を表す
// タイムゾーンを指定することはできない
const date = new Date(2006, 0, 2, 15, 4, 5, 999);
console.log(date.toISOString()); // "2006-01-02T06:04:05.999Z" (Asia/Tokyoの場合)
```

このコンストラクタと似たメソッドとして、[Date.UTC][]があります。
渡す引数の形式はコンストラクタと同じですが、`Date.UTC`メソッドは渡された数値をUTCにおける時刻として扱い、その時刻のミリ秒値を返します。
つまり、次のコードは同じ意味をもちます。

{{book.console}}
```js
// 1. 文字列から直接Dateオブジェクトのインスタンスを得る
const fromString = new Date("2006-01-02T15:04:05.999Z");
// 2. Date.UTCを使ってUTCの時刻をミリ秒値に変換してから渡す
const ms = Date.UTC(2006, 0, 2, 15, 4, 5, 999);
const fromMs = new Date(ms);
```

### Dateのインスタンスメソッド

`Date`オブジェクトのインスタンスは多くのメソッドをもっていますが、
ほとんどは`getHours`と`setHours`のような、時刻の各部分についてのゲッターとセッターです。

次の例は、日付を決まった形式の文字列に変換しています。
`getMonth`メソッドや`setMonth`メソッドのように月を数値で扱うメソッドは、0から11の数値で指定することに注意しましょう。ある`Date`のインスタンスの時刻が何月かを表示するには、`getMonth`メソッドの戻り値に1を足す必要があります。

{{book.console}}
```js
// YYYY/MM/DD形式の文字列に変換する関数
function formatDate(date) {
    const yyyy = new String(date.getFullYear());
    // String#padStartメソッドで2桁に0埋めする
    const mm = new String(date.getMonth() + 1).padStart(2, "0");
    const dd = new String(date.getDay()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd}`;
}

const date = new Date("2006-01-02T15:04:05.999Z");
console.log(formatDate(date)); // => "2006/01/02"
```

`getTimezoneOffset`メソッドは、実行環境のタイムゾーンのUTC**からの**オフセット値を**分**単位の数値で返します。
たとえばAsia/TokyoタイムゾーンはUTC+9時間なのでオフセット値は-9時間となり、`getTimezoneOffset`メソッドの戻り値は`-540`です。

{{book.console}}
```js
// getTimezoneOffsetはインスタンスメソッドなので、インスタンスが必要
const now = new Date();
// 時間単位のタイムゾーンオフセット
const timezoneOffsetInHours = now.getTimezoneOffset() / 60;
// UTCの現在の時間を計算できる
console.log(`Hours in UTC: ${now.getHours() + timezoneOffsetInHours}`);
```

## 現実のユースケースとDate

ここまで`Date`オブジェクトとインスタンスメソッドについて述べましたが、
多くのユースケースにおいては機能が不十分です。
たとえば次のような場合に、`Date`では直感的に記述できません。

- 例を挙げる

- moment.jsやdate-fnsなど、日付を便利に扱うためのライブラリを使うのが一般的


[Date]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date
[Date.parse]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
[Date.now]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/now
[Date.UTC]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC
[RFC2822]: https://tools.ietf.org/html/rfc2822#section-3.3
[ISO 8601]: https://ja.wikipedia.org/wiki/ISO_8601