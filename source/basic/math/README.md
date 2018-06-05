---
author: laco
---

# Math {#math}

この章では、JavaScriptで数学的な定数と関数を提供する組み込みのオブジェクトである[Math][]について学びます。

## Mathオブジェクト {#math-object}

`Math`オブジェクトはビルトインのグローバルオブジェクトですが、コンストラクタではありません。
つまり`Math`オブジェクトはインスタンスを作らず、
すべての定数や関数は`Math`オブジェクトの静的なプロパティやメソッドとして提供されています。
たとえば、`Math.PI`プロパティは円周率πをあらわす定数であり、`Math.sin`メソッドはラジアン値から正弦を計算する関数です。
次の例では、90度における正弦を計算しています。90度の正弦は1なので、`sin90`変数は1を返します。

{{book.console}}
```js
const rad90 = Math.PI * 90 / 180;
const sin90 = Math.sin(rad90);
console.log(sin90); // => 1
```

三角関数をはじめとした多くの関数や定数が`Math`オブジェクトから提供されています。
この章ではそれらのうちよく使われるものについてユースケースを交えて紹介します。
網羅的な解説については[MDNのリファレンス][]を参照してください。

### 乱数を生成する {#create-random-number}

`Math`オブジェクトの主な用途のひとつは、[Math.random][]メソッドによる乱数の生成です。
`Math.random`メソッドは、0以上1未満の範囲内で、疑似ランダムな浮動小数点数を返します。
乱数生成のシードには現在時刻が使われます。

{{book.console}}
```js
for (let i = 0; i < 5; i++) {
    // 毎回ランダムな浮動小数点数を返す
    console.log(Math.random());
}
```

次の例では、`Math.random`メソッドを使って、任意の範囲で乱数を生成しています。

{{book.console}}
```js
// minからmaxまでの乱数を返す関数
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
// 1以上5未満の浮動小数点数を返す
console.log(getRandom(1, 5));
```

### 数値の大小を比較する {#compare-number}

[Math.max][]メソッドは引数として渡された複数の数値のうち、最大のものを返します。
同様に、[Math.min][]メソッドは引数として渡された複数の数値のうち、最小のものを返します。

{{book.console}}
```js
console.log(Math.max(1, 10)); // => 10
console.log(Math.min(1, 10)); // => 1
```

これらのメソッドは可変長の引数を取るため、任意の個数の数値を比較できます。
数値の配列の中から最大・最小の値を取り出す際には、`...`演算子（spread構文）を使うと簡潔に記述できます。

{{book.console}}
```js
const numbers = [1, 2, 3, 4, 5];
console.log(Math.max(...numbers)); // => 5
console.log(Math.min(...numbers)); // => 1
```

[Math]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math
[MDNのリファレンス]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math
[Math.random]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/random
[Math.max]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/max
[Math.min]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/min