# 関数と宣言

## アウトライン

- 関数宣言
- 引数の扱い
    - 関数のシグネチャ
    - 引数が少ないとき
    - 引数が多い時
- デフォルト引数
    - デフォルト引数と `||` の比較
    - `||` と Nullish coalescing

- 可変長引数
    - arguments
    - Rest Parameters
- 引数と分割代入
- 関数式
- Arrow Function
- コールバック関数
- メソッド
    - メソッドはプロパティの関数
    - 短縮記法
- まとめ

## 扱っていない。

オプションオブジェクトのデフォルトの値の話はパターンが多すぎて好みの問題になりそう。

- デフォルト引数とオブジェクト
    - Object.assign or Spread構文
    - デフォルト引数 + Nullish coalescing
    - Nullish coalescing演算子(`??`)とOptional chaining（`?.`）


関数の引数のデフォルト値を指定する場合にはデフォルト引数を利用することを紹介しました。

しかし、関数の引数にはオブジェクトを渡すこともできます。
デフォルト引数では、仮引数に対応する引数が指定されていなかった場合のデフォルト値です。
そのため、引数として渡されたオブジェクトのプロパティに対するデフォルト値は、デフォルト引数では実現できません。

次のコードの`wrapText`関数では`prefix`と`suffix`をオプションオブジェクトとして受け取れます。
`options`に対応するオブジェクトを渡さなかった場合のデフォルトオプションをデフォルト引数で指定しています。
`options`を渡さなかった場合は意図した結果となりますが、オプションの一部(`prefix`や`suffix`の片方)を渡した場合は意図しない結果となります。
これは、デフォルト引数は実際の引数として渡されたオブジェクトをマージをするわけではないためです。

{{book.console}}
<!-- doctest:meta:{ "ECMAScript": 2020 } -->
```js
// `options`が指定されなかったときは空のオブジェクトが入る
function wrapText(text, options = { prefix: "接頭辞:", suffix: ":接尾辞" }) {
    return options.prefix + text + options.suffix;
}
console.log(wrapText("文字列")); // => "接頭辞:デフォルト:接尾辞"
console.log(wrapText("文字列", {
    prefix: "Start:",
    suffix: ":End"
})); // => "Start:文字列:End"
// オプションの一部だけを指定した場合に意図しない結果となる
console.log(wrapText("文字列", { prefix: "カスタム:" })); // => "カスタム:デフォルトundefined"
console.log(wrapText("文字列", { suffix: ":カスタム" })); // => "undefined文字列:カスタム"
```

このときの`prefix`と`suffix`のそれぞれのデフォルト値は、デフォルト引数とNullish coalescing演算子(`??`)を使うことで実現できます。
次のように、`options`オブジェクトそのものが渡されなかった場合のデフォルト引数として空オブジェクト（`{}`）を指定します。
そして、`options`の`prefix`と`suffix`プロパティそれぞれに対してNullish coalescing演算子(`??`)を使いデフォルト値を指定しています。

{{book.console}}
<!-- doctest:meta:{ "ECMAScript": 2020 } -->
```js
// `options`が指定されなかったときは空のオブジェクトが入る
function wrapText(text, options = {}) {
    const prefix = options.prefix ?? "接頭辞:";
    const suffix = options.suffix ?? ":接尾辞";
    return prefix + text + suffix;
}
// falsyな値を渡してもデフォルト値は代入されない
console.log(wrapText("文字列")); // => "接頭辞:文字列:接尾辞"
console.log(wrapText("文字列", {
    prefix: "Start:",
    suffix: ":End"
})); // => "Start:文字列:End"
// オプションの一部だけを指定した場合は、それぞれのデフォルト値が採用される
console.log(wrapText("文字列", { prefix: "カスタム:" })); // => "カスタム:文字列:接尾辞"
console.log(wrapText("文字列", { suffix: ":カスタム" })); // => "接頭辞:文字列:カスタム"
```

Optional chaining（`?.`）を利用することで、デフォルト引数の指定は次のように書き換えることもできます。

<!-- doctest:meta:{ "ECMAScript": 2020 } -->
```js
function wrapText(text, options) {
    // `options`がundefinedまたはnullの時点で右辺を評価する
    const prefix = options?.prefix ?? "接頭辞:";
    const suffix = options?.suffix ?? ":接尾辞";
    return prefix + text + suffix;
}
// falsyな値を渡してもデフォルト値は代入されない
console.log(wrapText("文字列")); // => "接頭辞:文字列:接尾辞"
console.log(wrapText("文字列", {
    prefix: "Start:",
    suffix: ":End"
})); // => "Start:文字列:End"
// オプションの一部だけを指定した場合は、それぞれのデフォルト値が採用される
console.log(wrapText("文字列", { prefix: "カスタム:" })); // => "カスタム:文字列:接尾辞"
console.log(wrapText("文字列", { suffix: ":カスタム" })); // => "接頭辞:文字列:カスタム"
```

さらにDestructuring + デフォルト引数で次のようにも書けます。

```js
function wrapText(text, { prefix = "接頭辞:", suffix = ":接尾辞" }) {
    return prefix + text + suffix;
}
console.log(wrapText("文字列")); // => "接頭辞:デフォルト:接尾辞"
console.log(wrapText("文字列", {
    prefix: "Start:",
    suffix: ":End"
})); // => "Start:文字列:End"
// オプションの一部だけを指定した場合に意図しない結果となる
console.log(wrapText("文字列", { prefix: "カスタム:" })); // => "カスタム:デフォルトundefined"
console.log(wrapText("文字列", { suffix: ":カスタム" })); // => "undefined文字列:カスタム"
```


さらにオブジェクトマージを使うと次のような書き方もあります。

```js
const DefaultOptions = { prefix: "接頭辞:", suffix: ":接尾辞" }
function wrapText(text, options) {
    const optionsWithDefault = {
        ...DefaultOptions,
        ...options
    }
    return optionsWithDefault.prefix + text + optionsWithDefault.suffix;
}
console.log(wrapText("文字列")); // => "接頭辞:デフォルト:接尾辞"
console.log(wrapText("文字列", {
    prefix: "Start:",
    suffix: ":End"
})); // => "Start:文字列:End"
// オプションの一部だけを指定した場合に意図しない結果となる
console.log(wrapText("文字列", { prefix: "カスタム:" })); // => "カスタム:デフォルトundefined"
console.log(wrapText("文字列", { suffix: ":カスタム" })); // => "undefined文字列:カスタム"
```


## Issues

* [Destructuring · Issue #113 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/113 "Destructuring · Issue #113 · asciidwango/js-primer")
* [関数と宣言: 引数の個数について · Issue #588 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/588 "関数と宣言: 引数の個数について · Issue #588 · asciidwango/js-primer")
* [非推奨の章: arguments を削除する · Issue #590 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/590 "非推奨の章: arguments を削除する · Issue #590 · asciidwango/js-primer")
