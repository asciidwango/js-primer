# 2.0.0

[JavaScript Primer](https://jsprimer.net/) 2.0.0ではECMAScript 2020に対応しています。

- サマリIssue: [ECMAScript 2020の対応 · Issue #1145 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1145)

## for-in mechanics

- 対象ページ: [配列](https://jsprimer.net/basic/array/)
- Issue: https://github.com/asciidwango/js-primer/issues/1180
- PR: https://github.com/asciidwango/js-primer/issues/1180

`for...in`文がプロパティを列挙する順番はES2019までは実装依存だった。
これがES2020では仕様として列挙する順番が規程されたので、異なる列挙をするブラウザは基本的になくなる。（現時点ではすでにどのブラウザも同じ順番）
背景としては、`Reflect.ownKeys`（ES2015）が入った際に大体の実装が同じ列挙順に統一されていた。
そのため実装依存だった順序の仕様を定義するように修正された。

**詳細**

- https://github.com/tc39/proposal-for-in-order
- https://github.com/tc39/proposal-for-in-order/blob/master/exploration/README.md
- https://github.com/tc39/ecma262/pull/1791 仕様の修正
- https://github.com/tc39/test262/pull/2432 テストの実装

## `export * as ns from "mod";`

- 対象ページ [ECMAScriptモジュール](https://jsprimer.net/basic/module/)
- Issue: <https://github.com/asciidwango/js-primer/issues/1177>
- PR: <https://github.com/asciidwango/js-primer/pull/1203>

ES2020では、`export * as ns from "mod"; `という再エクスポートの構文が追加された。

- https://github.com/tc39/proposal-export-ns-from
- [Normative: Add `export * as ns from "mod”` to Export production and Module Semantic by spectranaut · Pull Request #1174 · tc39/ecma262](https://github.com/tc39/ecma262/pull/1174)

ES2015での見落とし的な構文で、ES2015では次のように書く必要があった。

```js
import * as ns from "./module.js";
export { ns };
```

これを次のように1行で書けるように追加された構文。

```js
export * as ns from "./module.js";
```

## `String.prototype.matchAll`

- 対象ページ: [文字列](https://jsprimer.net/basic/string/)
- Issue: <https://github.com/asciidwango/js-primer/issues/1182>
- PR: <https://github.com/asciidwango/js-primer/pull/1250>

ES2020では `String.prototype.matchAll` という正規表現の`g`フラグを使った繰り返しマッチに対応したメソッドが追加された。
今までは`RegExp.prototype.exec`メソッドで繰り返しマッチを表現していたが、`String.prototype.matchAll`メソッドというIteratorを返すメソッドに置き換えることができる。

**変更点**

- マッチした文字列の取得を書き直し
  - `Sttring#match` と `String#matchAll` をベースに変更
- `RegExp#exec` は `String#matchAll` が利用できる場合に使う状況がないため、コラムに変更
  - `RegExp#exec`  は 基本的には利用することはなくなったメソッドであるため
  - 既存のコードを読むと出てくる可能性はあるので、コラムとして残している(結構なトリッキーなコードでもある)
- 基本は `Sttring#match` と `String#matchAll` の対比で話を進めた

## globalThis

- 対象ページ: [関数とthis](https://jsprimer.net/basic/function-this/)
- Issue: <https://github.com/asciidwango/js-primer/issues/1181>
- PR: <https://github.com/asciidwango/js-primer/pull/1187>

実行環境で`window`や`global`などグローバルオブジェクトの参照方法がバラバラだった。
これをまとめた概念として`globalThis`がES2020で追加された。

## BigInt

- 対象ページ: [データ型とリテラル](https://jsprimer.net/basic/data-type/)
- Issue: <https://github.com/asciidwango/js-primer/issues/445>
- PR: <https://github.com/asciidwango/js-primer/pull/1184>

新しいデータ型として`BigInt`が追加された。

- BigIntとは巨大な整数を表現するための新しいリテラル
- `1n` のように `n` というsuffixをつけるリテラル
- 数値リテラルでは`2^53-1`よりも大きな値は精度が足りずに正確に表現できない
- BigInt自体は7番目の新しいプリミティブ型として定義されている
- そのため、typeofに"bigint"が追加されている
- 浮動小数点表現に`n`をつけた場合は構文エラーとなる
- BigIntの `0n` も falsy に追加 #445 

## Nullish coalescing演算子(`??`)とOptional chaining（`?.`）

- 対象ページ:
  - [演算子](https://jsprimer.net/basic/operator/)
  - [関数と宣言](https://jsprimer.net/basic/function-declaration/)
  - [オブジェクト](https://jsprimer.net/basic/object/)
- Issue:
  - [ES2020: Nullish coalescing Operator · Issue #1178 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1178)
  - [ES2020: Optional chaining · Issue #1179 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1179)
- PR: <https://github.com/asciidwango/js-primer/pull/1205>


Nullish coalescing演算子(`??`)は、左辺の値がnulishであるならば、右辺の評価結果を返す。 
nulishとは、評価結果がnullまたはundefinedとなる値のこと。

Optional chaining演算子（`?.`）は、左辺のオペランドがnullish（nullまたはundefined）の場合は、それ以上評価せずにundefinedを返す。
一方で、プロパティが存在する場合は、そのプロパティの評価結果を返す。

どちらもNullishを扱うため、まとめて対応。

どちらの演算子も利用できる場所が広いため、かなり幅広いページを書き換えている。

**変更点**

- **falsy**の説明を演算子の章に移動
  - falsyの対応としてnullishを演算子の章で解説するため
- Optional chaining演算子の（`?.`）の解説を"オブジェクト"の章に追加
- Nullish coalescing演算子(`??`)とOptional chaining（`?.`）の組み合わせを説明
- Nullish coalescing演算子(`??`)の解説を"演算子"の章に追加
- 一部のコードを `||` を `??` に置き換え
  - 例としては問題ないけど、`??` 推奨気味に変更

## チートシートのES2020の対応

- 対象ページ: [付録: JavaScriptチートシート](https://jsprimer.net/cheetsheet/)
- Issue: https://github.com/asciidwango/js-primer/issues/1204
- PR: https://github.com/asciidwango/js-primer/pull/1247

チートシートにES2020で増えた構文を追加。

- Nullish coalescing演算子(`??`)
- Optional chaining（`?.`）
- BigInt(`42n`)
- `export * as ns from "./x.js"`

## 含まれなかったES2020の変更点

次のES2020の変更は、現時点のJavaScript Primerでは含まれていません。

- `Promise.allSettled`
- `import()`
- `import.meta`

詳細は[ECMAScript 2020の対応 · Issue #1145 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1145)を参照してください。

# 1.0.0

出版に合わせた初回のリリース。

- [Release 1.0.0 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/releases/tag/1.0.0)