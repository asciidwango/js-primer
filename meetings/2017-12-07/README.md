# 2017-12-07 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@vvakame](https://github.com/vvakame)
- [@laco0416](https://github.com/laco0416)

## アジェンダ

- [2017-12-07のミーティングアジェンダ · Issue #328 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/328 "2017-12-07のミーティングアジェンダ · Issue #328 · asciidwango/js-primer")

## `this`の章 - azu

- [[WIP] 関数とthis by azu · Pull Request #324 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/324)
- [関数とthis · Issue #316 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/316)
- @azu: thisについて書いている
- メソッドではない関数の`this`はやたら複雑でバグ多い
- ChromeもModule Context + Arrow Functionでバグってる
    - [791334 - `this` in top level Arrow Function in Module Context should be `undefined` - chromium - Monorail](https://bugs.chromium.org/p/chromium/issues/detail?id=791334&q=Module%20Arrow%20Function%20this&colspec=ID%20Pri%20M%20Stars%20ReleaseBlock%20Component%20Status%20Owner%20Summary%20OS%20Modified "791334 - `this` in top level Arrow Function in Module Context should be `undefined` - chromium - Monorail")
- Nodeもグローバルでの`this`の値が不思議なことになる
- Allenさんも[メソッドだけで使うべきだ](https://twitter.com/awbjs/status/938272440085446657)といってたので、メソッドだけに限定したバージョンに削ったバージョンにする
- 今書いてるものは資料的な感じで保存しておく
- 実際に、ここまで関数と`this`について書いてる書籍はなかった
- @kahei: thisの章にするんですね
- @azu: まあしょうがないかなという印象
- 関数とオブジェクトについてだとまだgetter/setterについて触れてない
- オブジェクトのgetter/setterって使う機会があんまりない
- @laco: thisはクラスの前?
- クラスの後にthisだとどうだろ…
- @azu: thisがないとクラスのコンストラクタすら書けない…
- @laco: クラスの前が妥当そう
- getter/setterはクラスっぽさがある
- 他のプロパティを触るので`this`を使う必要がある
- @azu: あとはcomputed的な感じに使う
- オブジェクトでもできるんだけど、オブジェクトならプロパティに値を代入すればという感じに
- @laco: あとはread onlyの値か
- `Object.defineProperty`を使う?
- @azu: オブジェクトならたしかにそっちも関係あるか
- `Object.defineProperty`とかはやっぱりメタプログラミングっぽいなー

### 結論

- [[WIP] 関数とthis by azu · Pull Request #324 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/324)
- [関数とthis · Issue #316 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/316)
- メソッドに絞った内容にする
- this -> クラスの順

----

## 高度なAPI

- @azu: `Object.defineProperty`とかは結局ふれてないなー
- @laco: `Object.keys`と`Object.assign`とかは触れてるか
- @azu: いわゆるメタプログラミングっぽいの
- Reflect、Proxy
- `Object.defineProperty`とかもこの仲間に入るのでは
- @laco: `Object.freeze`とか
- @azu: ES2017?だとdescriptorを取るAPIとか追加されたので
- もっとメタプログラミングっぽい
- 高度なAPI
- 余力があるならそういうまとめかたもありかも
- @laco: Well-Known Symbolsも高度なAPIか

### 結論

- `Object.defineProperty`などはメタプログラミング的な扱い
- 余力があるなら高度なAPIとしてまとめる

----

## Iterator、Generator、Well-Known Symbols

<https://github.com/asciidwango/js-primer/blob/master/source/README.md>を見ながら

- @laco: クラス、プロミス、TODO(ユースケース)
- @laco: 残りはIteratorとGeneratorか
- IteratorでSymbolがでてくるのでは?
- @azu: たしかに
- そこでコラム的にWell-Known Symbolとはみたいな触れ方良さそう
- そもそもIterator、Generatorをやるか決めてないな
- Issueない…
- @laco: 「新人研修で配ったときにこの本はジェネレーター、イテレータが書いてないからダメ」 ということはない気がする
- @azu: たしかに
- 高度なAPIだな
- @laco: そう考えると省いてもいいのでは
- @azu: (途中からきた@vvakameさんへ)「ジェネレーター、イテレータって初心者にいると思います?」
- @vvakame: 繰り返し行うという表現としては説明はあってもいいけど、メインではない気もする。
- Appendixとか
- @azu: とりあえず基本文法としては必須ではなさそう


### 結論

- Iterator、Generatorは省く
- 必要になったら再考する

-----

## Bad Parts - laco

- @laco: [非推奨の機能 · JavaScriptの入門書 #jsprimer](https://jsprimer.net/basic/bad-parts/ "非推奨の機能 · JavaScriptの入門書 #jsprimer")を作った
- @laco: `Array.from` の話も欲しいかも
- @azu: sliceするやつ?
- @laco: それ
- @azu: concatとslice派がいて、どちらも配列ライクなものから配列を作るのに使われる
- @azu: `Array.from`自体のは紹介してるけど、昔の方法はだしてない
- @laco: 非推奨の章は代替方法があって、今も使われてるものを対象にしたい
- 昔はよかったけどいまはダメみたいなのを集めたい。昔から良くないコードはあえて取りあげなくてよさそう

### 結論

- [Bad Partsの章 · Issue #142 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/142#issuecomment-348702858 "Bad Partsの章 · Issue #142 · asciidwango/js-primer")

----

## Lint

- @laco: 非推奨の章にLintは?
- @azu: 知ってれば得する知識としては欲しいかも
- ESLintのドキュメントよくあるBad Partsまとまってるしなー
- @laco : 使い方も入れる?
- @azu: そうすると大変そう。
- あくまで知っておくといい系
- @laco: 変に本の寿命を縮めそう
- 翻訳があるといいのだけど

### 結論

- いったんLintはなしで
- あってもいいけど、必須ではない

-----

## ユースケース序章

- @laco: あと残りは...
- 読んでいってIssueを拾っていく感じ?
- @azu: そんな感じかも?
- 後は環境の章か
- [2章の序章: 環境ごとのオブジェクト · Issue #267 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/267 "2章の序章: 環境ごとのオブジェクト · Issue #267 · asciidwango/js-primer")

----

## モジュール

- @azu: あ、モジュール!
- @laco: たしかに
- @azu: ユースケースのTODOで使うけど文法としてない
- 基本文法のなかに増やす?
- うーん、基本と言うには環境によって違って難しい
- ユースケースの中?
- 環境の章で軽くNodeとブラウザでCommonJSとES moduleについて触れて
- Node.js CLIではCommonJSについて
- TODOではES moduleについてとするとか?
- @laco: モジュールは広い
- @azu: 必須なモジュールの仕組みだけに絞りたい
- 〜MDNを見ながら〜
- importはdefaultとnamed

```
import defaultExport from "module-name";
import { export } from "module-name";
```

- exportは以下ぐらい?

```
// named
export { name1, name2, …, nameN };
// 宣言と同時
export let name1, name2, …, nameN; // also var, function
// default
export default
```

- @laco: named exportの場合はconstとか書くとか
- 逆にdefaultの場合はいきなり値から始まる
- これってなんでだろ?
- @azu: なんかES discussで見た気がする
- @azu: あとは `import()` ダイナミック?
- @laco: 必須?
- @azu: まだ必須感がないかも
- ES moduleは静的という話は必要で、動的なやつはまだ仕様が中途半端
- `import.meta`とか

### 結論

- [モジュール · Issue #329 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/329 "モジュール · Issue #329 · asciidwango/js-primer")
- モジュールはユースケースで使うものを中心に説明
- ユースケースの章で混ぜてススメていく

----

次回は2018年1月25日(木曜日)
