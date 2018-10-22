# 2017-08-24 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@vvakame](https://github.com/vvakame)
- [@lacolaco](https://github.com/lacolaco)

## アジェンダ

- [2017-08-24 ミーティングアジェンダ · Issue #275 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/275 "2017-08-24 ミーティングアジェンダ · Issue #275 · asciidwango/js-primer")

## 非同期処理のイベント @azu

> 非同期処理というのはJavaScriptだと結構特徴的で今はPromiseがあるからそこだけでもいいのかなと思ったけど、イベント駆動な非同期処理については基本文法だと抜けているなという 📝

- @azu: Promiseの非同期処理は説明する予定
- だけどイベントの非同期処理は入れる場所がない
- いきなりユースケースにでてくる感じになってしまうのでは、非同期処理慣れてない言語の人は読めないのでは?
- 実際はユースケースだけどイベント駆動は結構基本に近いので基本文法に必要?
- コラムより大きく節ぐらいの説明がひつようになるような気がする
- @laco: どこが適切だろ？
- @azu: DOM APIの説明に混ぜてしまう?
- DOMなどのホスト環境依存のAPIについて2部のユースケース直前で軽く触れたい
- ブラウザにはDOMがあり、NodeにはCoreAPIがあるという簡単な概要
- [2章: ユースケース · Issue #267 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/267 "2章: ユースケース · Issue #267 · asciidwango/js-primer")
- ここにイベントをまぜる?
- @laco: https://jsprimer.net/basic/function-declaration/#コールバック関数

>  非同期処理ではコールバック関数がとてもよく利用されます

- この後に簡単な例があればユースケースまでのつなぎはできそう
- @azu: この関数と宣言の章は関数の構文的な宣言に絞っているからなー
- @laco: 関数のところに節 or コラムとして`イベント`というもの説明？

...議論発散...

### 結論

- ユースケース寄り?
- 結論は出なかった

## スコープ 

- @azu: スコープについては書くことが大体決まっている
- 最終的にクロージャーが理解できるようになるという目標で書く
- @azu: `this`はどこにかくのかを迷っている
- 関数やオブジェクトの中でthisって普通は使わないから
- https://github.com/asciidwango/js-primer/issues/275#issuecomment-324397122
- @laco: 非推奨の章？
- @vvakame: `this`はオブジェクトの中使うケースも見かけるので説明はしないとダメそう
- @azu: `this`の説明は必要ではあるけど、基本的にはクラスで使うものという印象
- Vueとかはオブジェクト + thisのスタイル
- これは[前回に話した内容](../2017-07-21/README.md)だけど
- @kahei: スコープの説明した後に`this`の説明するパターンが多いのでは
- @azu: たしかに
- スコープは静的に決まる、`this`は動的に決まるという形になりそう
- スコープ => `this`でよさそう
- @azu: `call`/`apply`/`bind`っているかな?
-  `call`/`apply`はライブラリ書く人しか使わない気がする
- @laco: Functionオブジェクトでまとめるのはどう？
- `name`/`call`/`apply`/`bind`とか
- @azu: よさそう
- スコープ -> `this` -> 関数オブジェクト
    - `super`もクラスだと`this`の同類か
- @laco: スコープ -> `this` -> 関数オブジェクト -> クラス
- クラスのほうでもう一度`this`について扱う
- クラスのインスタンスが入るということを改めて説明すればいいかも？

### 結論

- 次のような流れで書く
    1. スコープ
        - 静的な決定
    2. スコープの中でも特殊な`this`
        - 動的な決定
    3. 関数オブジェクト
        -  `call`/`apply`/`bind`/`name`
    4. クラス

-----

## FP

- @azu: クラスは書くけど、どちらかというOOPぽさはある。
- FPの説明もするのは最近は増えているけどどうなんだろ?
- http://refactoringjs.com/ や初めてのJavaScript
- @laco: いらないのでは
- @azu: あってもコラムレベルか
- JavaScriptだとそういう流派もあるよ
- あんまり言語で決まってないから

### 結論

- FPはあってもコラム

----

## スコープの説明の仕方

- @azu: いくつか書籍を読んででパターンは次の3つぐらいがありそう
- コードで説明する
	- 初めてのJavaScript

```js

const x = 3; function f() {
console.log(x); // 3 (これは動く)
console.log(y); // ReferenceError: y is not defined (エラーになる) }
f();
const y = 3;
```

こういう実行例からスコープを解釈するパターン

- 図で説明する
	- JavaScript本格入門
	- [You-Dont-Know-JS/ch1.md at 31e1d4ff600d88cc2ce243903ab8a3a9d15cce15 · getify/You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS/blob/31e1d4ff600d88cc2ce243903ab8a3a9d15cce15/scope%20%26%20closures/ch1.md "You-Dont-Know-JS/ch1.md at 31e1d4ff600d88cc2ce243903ab8a3a9d15cce15 · getify/You-Dont-Know-JS")

図でこの領域はここ、この領域はここみたいな図解

- 擬似コードで説明する
	- 仕様をコードにする
        - https://gist.github.com/azu/53c3a60e0392e2b3773c8a9c8a7b5d3d

- @azu: どういうパターンで解説するのがいいんだろ？
- 擬似コードで書くと結果から理解するよりは深まるけど、簡単ではない
- 結果だけだと完全に覚えゲーになってしまうのが良くない気がした
- 経験として`new`の動きは擬似コードで理解した記憶がある
- [JavaScript の new 演算子の意味: Days on the Moon](http://nanto.asablo.jp/blog/2005/10/24/118564 "JavaScript の new 演算子の意味: Days on the Moon")
- @kahei: コードで説明して、最後に擬似コードだとこう表現できますよって形がいいのでは？


### 結論

- コードで動きを説明
- 最後に擬似コード

----

## Map/Set [#270](https://github.com/asciidwango/js-primer/pull/270)

- @laco: 抽象データ型としてのマップ・セットの説明の加減
- WeakSetのユースケース
- 全体的にふわふわしてて、どう書くと良いのかいい塩梅にならない
- @azu: WeakSetは実際使ってる人がほとんどいない
- SetのWeak版ですぐらいの気持ちでいいのでは？
- @laco: MapがAPIの説明チックという指摘
- @azu: Mapは実用的で色々な用法があるのでそちらに厚みを出したほうがよさそう
- オブジェクトをキーにできるケースとか、イベントとか
- Setは配列をUniqueにするとか
- @laco : MapとWeakMapを重点的に説明して、実際の使いみちみたいなのが浮かぶような説明をする
- @laco same-valueについては?
- https://github.com/asciidwango/js-primer/pull/270/files#r134085301
- @azu: Mapだと`===`と比較方法が違うよということが分かれば良さそう。
- なので今の説明(NaNの挙動は違う)でいいのでは、その比較アルゴリズムはsame-valueですという感じ
- @laco: MDNの個別の説明間違ってる?
- Mapはsame-value-zeroだ
- [等価性の比較とその使いどころ - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Equality_comparisons_and_when_to_use_them#Same-value_equality "等価性の比較とその使いどころ - JavaScript | MDN")
- @laco: Map -> Set -> WeakMap -> WeakSet?
- @azu: オライリーの始めてのJavaScriptだとMap -> WeakMap -> Set -> WeakSetだった
- @laco Mapに厚みを持たせるなら後者のほうがいいか

### 結論

- Mapはもっと実用よりの説明
- WeakSetにはもっと軽く
- Map -> WeakMap -> Set -> WeakSetの順

----

## ガーベッジコレクション

- @azu: WeakMapでガーベッジコレクションの説明する?
- @laco: 言葉は出すけどそれ以上ではない
- @azu: スコープでもガーベッジコレクションは簡単に触れる
- スコープと変数の寿命は一緒じゃなくて、スコープを抜けた後に参照されなくなったらGCで回収されるよって話

### 結論

- ガーベッジコレクションについてはスコープでものすごく簡単にする

-----

## 次回

2017年9月28日（木）

