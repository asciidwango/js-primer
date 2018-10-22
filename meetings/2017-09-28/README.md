# 2017-09-28 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

## アジェンダ

- [2017-09-28ミーティングアジェンダ · Issue #299 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/299 "2017-09-28ミーティングアジェンダ · Issue #299 · asciidwango/js-primer")

-----

## PRのプレビュービルド

- @azu: netlify連携を追加した
- PR出すとプレビューできる環境が立つようになった
- <https://github.com/asciidwango/js-primer/pull/298#issuecomment-331711441>

-----

## [スコープの進捗] - @azu

- @azu: スコープの進捗
- <https://github.com/asciidwango/js-primer/issues/299#issuecomment-332694750>
- スコープ自体の説明は大体おわり
- 後はクロージャーの解説をする
- クロージャーの分かりやすい解説が難しい
- 変数の生存期間と関数の実行の違いが分かれば何となく理解できるのではと思ってる
- スコープが終わったらクラスの予定
- その前にFunctionオブジェクトか
- スコープ -> 関数オブジェクト -> class

### 結論

- スコープの次は関数オブジェクトとthis

----

## Math

- @laco: 他に残っているビルトインオブジェクトは
- – <https://jsprimer.net/> をみながら –
- Promise、エラーハンドリング、Math/Number
- [Math · Issue #100 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/100 "Math · Issue #100 · asciidwango/js-primer")
- Mathはどうします?
- @azu: うーん
- @laco: Dateみたいに概要だけの説明をするとか
- @azu: Dateのときってどういう形で紹介するユースケースを決めていたっけ?
- @laco: 基本的にユースケースがベースで紹介してる
- `getTime`とかは例外的だけど、ユースケースが基準
- @azu: Mathも同じ感じだと、ユースケース
- random, min, max…
- この辺でユースケースとMathの概要かな?
- Numberはどうする?
- <https://github.com/getify/You-Dont-Know-JS/blob/master/types%20&%20grammar/ch2.md>はNumberで浮動小数点数の説明をしてて面白かった
- あとは `Number.EPSILON` を使ったほぼ一致の判定とかか
- @laco: Numberは…
- @azu: NumberはNaNとか別途紹介してるのでいらなさそう
- @laco: Numberはいらないかな
- @laco: Mathの章やります

### 結論

- @laco: Mathの章を各
- [Math · Issue #100 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/100 "Math · Issue #100 · asciidwango/js-primer")


-----

## ビルトインオブジェクトの全体像

- @laco: Symbolとかって単独の章になります?
- @azu: Well-known Symbolとか触れないと章にはできないんじゃないかな
- 正直いらない気はする
- [Symbolの章 · Issue #290 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/290 "Symbolの章 · Issue #290 · asciidwango/js-primer")
- @laco: 紹介してないビルトインオブジェクトをまとめる場所が欲しい
- タイミングが難しそう
- @azu: ビルトインオブジェクトの概要と名前をテーブルにするとか
- <https://github.com/asciidwango/js-primer/issues/299#issuecomment-332801889>
- ECMAScriptのビルトインオブジェクト、ブラウザ、Nodeなどの環境ごとのビルトインオブジェクトをまとめるとか
- @laco: よさそう
- @azu: 紹介のタイミングが"オブジェクト"の章の前とか
- @laco: うーん
- @azu: 後はユースケースの始まる2部の手前とかかな
- 1部と2部の間?1部の最後、2部の最初どこだろ
- @kahei: 間にappendxがあるのは聞いたことない
- @azu: じゃあ2部の最初かな
- 以前2部序章のIssueを建てたのでそこにまとめよう
- [2章の序章: 環境ごとのオブジェクト · Issue #267 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/267 "2章の序章: 環境ごとのオブジェクト · Issue #267 · asciidwango/js-primer")
- @azu: 自分のアサインする
- ここにAtomics、Math, Symbol, Proxy, Reflect、TypedArrayとかの概要を入れる


### 結論

- [2章の序章: 環境ごとのオブジェクト · Issue #267 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/267 "2章の序章: 環境ごとのオブジェクト · Issue #267 · asciidwango/js-primer")
- ここで基本文法では紹介しなかったビルトインオブジェクトや環境ごとの違いについてを書く
- @azu 担当

-----

## [Lint/非推奨の章 · Issue #142](https://github.com/asciidwango/js-primer/issues/142 "Lint/非推奨の章 · Issue #142 · asciidwango/js-primer")

- @azu: やっぱり初心者ほどコーディングスタイルとか文化的なものがよくわからない問題がある
- [Lint/非推奨の章 · Issue #142 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/142 "Lint/非推奨の章 · Issue #142 · asciidwango/js-primer")はやっぱり必要な気がする
- コーディングとかの環境
- @kahei: プログラミング環境の章
- @laco : Lintとか
- @azu: ツールとかそもそもJavaScriptに決まったスタイルがないとか
- JavaScript作者もそういう制限は入れなかったという話とか

### 結論

- 特になし

## エラー 

- @laco: 他はtry-catch/エラー/Promise非同期か
- ここはセットです?
- @azu: Promiseの前提知識としてエラーがある
- 最近Promise#finallyとかが追加されたり、これはtry-finallyの対応を意識してる
- なので エラー -> Promiseだけど、直接の関係はないかな
- @laco: Promiseやります?
- @azu: どっちでもいいけど細かいユースケースはPromise本に飛ばしたいな
- 大体普通のユースケースの8割ぐらいは書いてあるはず
- @laco: じゃあ@azuがPromise担当で
- try-catch-finally構文の説明とErrorオブジェクト、throwについて
- catch節の省略はいります?
- @azu: なくてもいいんじゃない
- 省略できてもまあそうですねという感じでしかないし
- @azu: エラーの章は構文説明とエラーへの対応方法という形
- 初心者ほどエラーはちゃんと見ないし、なぜそのエラーが置きてるのか分からない
- なのでそこをサポートできる章になっているとよさおう
- MDNのエラー文とその意味の解説はとても良い
- [JavaScript エラーリファレンス - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Errors "JavaScript エラーリファレンス - JavaScript | MDN")
- @laco: エラーオブジェクエト。stackは標準化されている?
- @azu: まだ
- [tc39/proposal-error-stacks: ECMAScript Proposal, specs, and reference implementation for Error.prototype.stack / System.getStack](https://github.com/tc39/proposal-error-stacks "tc39/proposal-error-stacks: ECMAScript Proposal, specs, and reference implementation for Error.prototype.stack / System.getStack")
- まあstack自体はNodeでも触れていたので非標準だけどという形でスタックトレースの読み方を触れるのもありそう
- @laco: 開発者ツールの読み方とか
- @azu: 悩ましい
- スコープも開発者のスコープを見れば一発じゃんという気がするので、紹介するのはありそうだけど大変そう。
- @azu: 「エラー」「例外」とかの定義がよくわからないのであんまり書きたくない
- [例外、エラー、異常、そして - Qiita](https://qiita.com/yugui/items/28085697041966726964 "例外、エラー、異常、そして - Qiita")
- @laco: `TypError`例外を投げる?
- ECMAScriptに定義されてる? -> 見ながら -> exceptionという単語沢山でてくる
- JavaはErrorとExceptionは明確に別
- JavaScriptだと
- throw = 例外を発生させる構文
- Error = エラーを表現するために標準化されているオブジェクト
- @azu: この章ではこういう定義ですという形でやらないとダメそう。
- @azu: あとはdebugger; https://tc39.github.io/ecma262/#sec-debugger-statement か
- これECMAScriptの仕様にあるんだな。
- Promiseと同じでイベントは飛ぶから後は実行環境で何かしてみたいな感じ
- 省いても良さそう。
- @laco: 実際やるならユースケースで実際のデバッグをするとか

### 結論

- @laco: エラー/try/catchの担当
- @azu: Promise/async/awaitの担当

## その他

- ジェネレーターについては次回考えよう

## 次回

2017年10月2日（木）

