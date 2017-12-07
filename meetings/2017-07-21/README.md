# 2017-07-21 Meeting Notes
             
- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)
             
## アジェンダ

- [2017-07-21 MTGアジェンダ · Issue #263 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/263 "2017-07-21 MTGアジェンダ · Issue #263 · asciidwango/js-primer")

## JSON

- [JSONの章 · Issue #237 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/237)
- [feat(basic): JSONの章 by lacolaco · Pull Request #259 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/259)
- @laco: JSONの章でどこまで扱うかについて
- stringify、parse

### JSON.stringify の例外的な挙動をするオブジェクトの扱い

- @laco: MapやSet、RegExpはどうするか?
- @azu: まずプリミティブとオブジェクトで別れる気がする
- プリミティブはそのままの値になる
- オブジェクトはオブジェクトと配列だけ特別?
- 列挙可能なプロパティが列挙される形
- @laco: JSON.stringifyは次のような感じ

    Symbol, 関数, undefinedは変換されない
    プリミティブかどうか
    オブジェクトかどうか
        列挙可能なプロパティを再帰的にシリアライズ

- @azu: 例外的なケースが多すぎる気がする
- 仕様のNoteが6つもある
- <https://tc39.github.io/ecma262/#sec-json.stringify>
- これはTableなどで対応をまとめて書いたほうが楽なのでは?

| 種類        | シリアライズ結果   |
| --------- | ---------- |
| 文字列       | 文字列        |
| 数値        | 数値         |
| Map,Setなど | {}         |
| 自作のクラス    | 列挙できるプロパティ |

- @laco: たしかに
- getterって列挙される?
- @azu: オブジェクトのgetterは列挙され、クラスのgetterは列挙されない…

```js
JSON.stringify({ get a(){ return 1; }})
// "{"a":1}"
```

```js
class Bar {
  get bar() { return "bar" }
}
var bar = new Bar()
JSON.stringify(bar)
// "{}"
```

- @azu: 代表的な変換についての表と、サンプルコードでまとめるのが良さそう
- @azu: 後JSONのユースケースについて書かないと何に使うものかがわからないかも
- @azu: ユースケースでAPI扱うならAPIとのやり取りやlocalStorageとか、CLIの入力など?
- 外部ものとのやりとりに使うものですって書く必要がありそう
- @laco: 以下のように書いている

>  +また、実際のアプリケーションでJSONを扱うのは、外部のプログラムとデータを交換する用途がほとんどです。 

- @laco: JSONのユースケースについてをもう少しはっきり書く
- @azu: localStorageはTODOアプリで扱うしかないかな…

#### 結論

- 代表的な変換についての表とサンプルコード
- ユースケースを明確に

### parseの第二引数を使う?

- [JSON.parse() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse "JSON.parse() - JavaScript | MDN")
- @azu: 流石に使うケースはかなりレアなのでは
- 自前でシリアライズとデシリアライズをしっかりしたいケースのように思える
- @laco: JSON.stringifyの方は第三引数を解説する都合上、第二引数についても書いた
- そうじゃないといきなり第二引数に `null` を渡すという謎のことが起きるため
- @azu: 大抵のケースはnullを渡すよってのが納得行くならよさそう
- @laco: 既に書いたのでJSON.stringifyの第二引数は残す
- @azu: JSON.parseの第二引数はいらないのでは
- 省略可能なものは重要でないなら省いてもいいと思う。
- この書籍はリファレンスの本ではないので、網羅性にこだわりすぎない

#### 結論

- JSON.stringify は第三引数まで
- JSON.parseは 第二引数にふれない
- 
### JSON.stringifyと例外

- @azu: JSON.stringifyって例外投げるんだっけ?
- @laco: 再帰的になってるときに例外を投げる
- @azu: なるほど
- やっぱりJSONは外部とのやり取りなので、例外ハンドリングはちゃんとやる必要があるというが伝わると良さそう。

------

## JSONの次はMap/Setの章

- @azu: JSONの次は?
- @laco: Map/Set/WeakMap/WeakSet
- @azu: WeakSetはユースケースがかなり限定的
- [ES6 In Depth: Collections ★ Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2015/06/es6-in-depth-collections/)
- [Actual WeakSet Use Cases](https://esdiscuss.org/topic/actual-weakset-use-cases)
- @azu: 他は使って便利
- 小さなユースケースがあると良さそう
- EventEmitterとか?
- [R1ZZU/events2: ES2015 implementation of nodejs EventEmitter](https://github.com/R1ZZU/events2 "R1ZZU/events2: ES2015 implementation of nodejs EventEmitter")
- Weakはメモリリークの対策として使いやすい
- @laco: ブラウザだとリロードして終わりなのであんまり気にされなさそう


### 結論

- @laco: JSONの次はMap/Set

----


## 関数 

- @azu: Arrayはもう少しなので次は関数
- 関数が山場
- @laco: 関数 or クラス どっちが先?
- クラスの話をして、実はこれは関数では~
- 関数の話をして、クラスでは~
- 関数の章は実はクラスの章なのでは？
- @azu: プロトタイプ的な意味合いだとクラスをベースにしていいのでは思っている
- まずはスコープの話をしたい
- プロトタイプチェーンと概念はよく似ているので
- @azu: スコープの話
- これは要は`this`の話になるのでは
- あとは`const`などのブロックスコープか
- this は多くの場合 クラスで使う。
- 関数でthisを使うケースってjQuery以外だとどんなのがある?

```
$.each(function (){
   this // <= $自体
})
```
みたいなケース。

- @laco: Vueが結構functionでthisが違う文化
- @azu: 後はmochaか
- 結局それだけあるとfunctionとthisについては外せないか
- @laco: call と apply と bind と Arrow Function は結局 this とスコープの話に
- 他にスコープ?
- @azu: 後はvarやconstのスコープか
- @azu: スコープの話をまとめると
    - 普通の値の解決
    - thisという特殊な変数の解決
    - レキシカルスコープ
        - var、const、ブロックスコープ
- @laco: レキシカル、静的、字面通り?
- 見た目どおりのthisみたいな話
- @azu: クラスの話はどうしよう?
- ユースケースベースで考えないと退屈な内容になりそう
- @laco: Javaで見るPerson、Carクラス…
- 単一で動くものがあると良さそう
- @azu: クラスは状態を持つような例が良さそう
- 状態を持たないクラスはまた違う感じ
- @laco: Counter?
- @azu: ストップウォッチとかも
- 時間が出てくるから微妙化
- Counterよさそう、`countUp`と`reset`みたいな
- stateはnumberを持っている
- 今のサンプルコードはカウンターが多いし
- @azu: 継承する例って何がいいかな?
- Counterは継承しないし
- @laco: それこそJavaっぽい
- 〜あんまりいい例がでない〜


### 結論

- まずスコープ => クラス => プロトタイプチェーン
- スコープの章
 
     普通の値の解決
     thisという特殊な変数の解決
     レキシカル

- クラス

    クラスの話
    関数とprototypeチェーン
    サンプルはカウンター
    継承の例は出てこなかった


### arguments

- @laco: argumentsに触れるなら関数の章しかない?
- argumentsについては書いてる?
- @azu: 簡単には解説済み
- argumentsはarray-likeの話でもでてくるかも。実質それだけ
- 関数ならspread operatorとの組み合わせ?
- `Max.apply`なパターンも今はspread operatorで良い
- <https://www.softel.co.jp/blogs/tech/archives/1377>

#### 結論

- argumentsは触れる

-----

### var vs. const

- @laco: サンプルコード`var`で書いてるとなんで`var`なのって突っ込まれまそう
- @azu: やっぱりそうなのかなー。
- REPLでコピペ実行が`const`などではできないのが不便なんだよなー
- ウェブサイド上の用意したREPLなら解消はできるかも
- @azu: やっぱり `var` は `const` に置き換えるか
- 基本的には var でも新しい変数に代入してるので単純に置換できるはず

#### 結論

- サンプルコードを `var` から `const` に置き換える
- [サンプルコードを `var` から `const` に置き換える · Issue #264 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/264 "サンプルコードを `var` から `const` に置き換える · Issue #264 · asciidwango/js-primer")

----

### hoisting

- @azu: hoistingは書く?
- @laco: 今ならconstとか使うのであんまり
- @azu: [サンプルコードを `var` から `const` に置き換える · Issue #264 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/264 "サンプルコードを `var` から `const` に置き換える · Issue #264 · asciidwango/js-primer")でコードがconstベースならメインとしてはいらないかも
- コラムベース?
- @laco: varが異常なだけ
- 他の言語を一応かける人向けのJS本なので、むしろvarの説明を理解してもらうのが難しそう

#### 結論

- hoistingはコラム

----

## Date

- @azu: Map/Set次は?
- @laco: Date
- @azu: Date書くのかー
- @laco: すごい基本的なことだけ、後はライブラリを使おう的な
- DateはDateオブジェクト、unix time(getTime、ISOのやつで交換可能な例をベースにする
- @laco: YYYY/MM/DD の実装例とか?
- @azu: strtimeの実装JavaScript TDD本で見た
- [テスト駆動JavaScript | Christian Johansen, 長尾高弘 |本 | 通販 | Amazon](https://www.amazon.co.jp/dp/4048707868/ "テスト駆動JavaScript | Christian Johansen, 長尾高弘 |本 | 通販 | Amazon")
- Dateはあんまり細かいメソッド触れなくてもよさそう
- i18nとの関連?
- i18n APIについては簡単には書いてる
- [Date/i18n · Issue #125 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/125 "Date/i18n · Issue #125 · asciidwango/js-primer")
- @laco: この辺だけで一冊になりそう
- @azu: 最近この辺の本あんまりない
- 最近達人出版からアプリケーションを作る英語の人が書いてた気がする
- [ソフトウェア・グローバリゼーション入門 　I18NとL10Nを理解する - 達人出版会](https://tatsu-zine.com/books/software-g11n "ソフトウェア・グローバリゼーション入門 　I18NとL10Nを理解する - 達人出版会")
- @kahei: 十年前とかはあったけど、今はさっぱり


### 結論

- @laco: Dateは簡単なデータ的な扱いで書く


----

## その他

- @laco: Symbolとかは章ではなさそう
- @azu: Reflect APIで書くのと同じぐらい難しい
- Symbolはiterableは触れるけど、それ以外はあんまり


-----

## 次回

2017-8-24(木)
