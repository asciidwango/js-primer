# 2018-02-01 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

## アジェンダ

- [2018-02-01 ミーティングアジェンダ · Issue #343 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/343 "2018-02-01 ミーティングアジェンダ · Issue #343 · asciidwango/js-primer")

## 進捗(azu)

残りの章は次のような感じ

-----

- [ ] REPL/コンソール 開き方 #276 #85 
- [ ] クラス #39 
- [ ] SetでのPrivate #39 #148 
- [ ] Promise #94 
- [ ] Bad Parts #142 
- [ ] 2章の序章: 環境ごとのオブジェクト #267 
- [ ] module #329
- [ ] TODOアプリ #4 #344

付録

- [ ] ECMAScript 策定プロセス #54 

-----

- azu: 今クラスを書いている
- プロトタイプのところが乗り切れば大丈夫そう。
- プロトタイプは実際に見えるオブジェクトなので、どう説明するのかが悩ましい
- 後、クラスを書いててsoft privateの話をふれた

> 現時点（ES2018）には外から原理的に見ることができないプライベートプロパティ（hard private）を定義する構文はありません。 プライベートプロパティについてはECMAScriptの提案が行われており導入が検討Proposalされています。 また、現時点でもWeakSetなどを使うことで擬似的なプライベートプロパティ（soft private）を実現できます。 擬似的なプライベートプロパティ（soft private）については「Map/Set」の章について解説しま

- [WeakSetを使ったsoft private · Issue #347 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/347 "WeakSetを使ったsoft private · Issue #347 · asciidwango/js-primer")というIssueを作った
- 将来的にprivateがくるとprototypeオブジェクトってますます意識しにくい(クラスでしかできないことが増える?)ものになる気がする
- なのでバランスが難しいけど、そこまで大きくはprototypeの詳細にふれない
- 継承の仕組みとしてのprototypeを上手くやっていきたい

## Promise

- azu: Promiseについて
- Promiseはasync awaitのバランスが悩ましい
- async awaitはユースケースないとあまり意味が分からない気がする
- laco: Promiseはajaxのところで使ってる
- asyncにするべき？
- azu: １つだけならasyncにするかというと微妙そう
- 複数のリクエストが直列的にするパターンとか
- laco: async/awaitのエラーハンドリングのパターンが良くわからない
- try-catchを使う場面とか
- azu: async awaitをちゃんと紹介すると結構長くなりそうだなー
- laco: try-catchと並べる感じにしてみるとか
- azu: ES2018にPromise#finallyが入るので並べるの良さそう
- 対比
    - try - catch - finally
    - Promiseのthen-catch-finally
    - Async/Awaitでのtry-catch-finally
- みたいな並びを意識した紹介    
- あまり細かいユースケースまでは触れるのが難しい気がする
- Promise本に投げたい感じがする
    - こっちも2.0に更新しないといけない
    
## Bad parts

- azu: Bad Partsはどうなんだっけ?
- laco: テンプレと2個ぐらい追加した
- https://jsprimer.net/basic/bad-parts/
- azu: あとは気になったものを追加していく感じ

### 結論

- 気になったものを [Bad Partsの章 · Issue #142 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/142 "Bad Partsの章 · Issue #142 · asciidwango/js-primer") に追加する

-----

##  2章の序章: 環境ごとのオブジェクト #267 

- azu: [2章の序章: 環境ごとのオブジェクト · Issue #267 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/267 "2章の序章: 環境ごとのオブジェクト · Issue #267 · asciidwango/js-primer")はどうなんっけ?
- laco: 今回忙しくてやれない
- azu: ココは雰囲気的には扉ページのような説明なので、フワッとしてる

## 高度なAPI

- azu: 結局前回話した「高度なAPI」ってどうするんだっけ?
- <https://github.com/asciidwango/js-primer/tree/master/meetings/2017-12-07#%E9%AB%98%E5%BA%A6%E3%81%AAapi>
- ObjectとかProxyとかメタ的なもの
- laco: 特に
- azu: 雰囲気的には、ここで紹介したJavaScriptの基本文法がJavaScriptの全てではありませんってことが伝わればいいかなと思ってる
- 細かいところはMDNとかサイトを見るとわかるよとか
- azu: 1章の末尾にそういうあとがきみたいのを書くといいのも
- 「ここで紹介した基本文法はJavaScriptのすべてではありません。他にも〜〜みたいないのがあり、このサイトを見たり調べてみたりすることで分かります」
- azu: そうしたら、2章の序章: 環境ごとのオブジェクト とのつながりもあって良さそうかも


### 結論

- 1章の末尾にあとがき的な「その他のAPI」についてを書く
- [1章の終章: その他の高度なAPI · Issue #348 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/348 "1章の終章: その他の高度なAPI · Issue #348 · asciidwango/js-primer")

----


## ES2018

- azu: ES2018 Firefox大丈夫だっけ?
- moduleは最近有効化されたので間に合いそう
- [1428002 - Enable <script type="module"> in nightly builds](https://bugzilla.mozilla.org/show_bug.cgi?id=1428002 "1428002 - Enable &lt;script type=&#34;module&#34;&gt; in nightly builds")
- laco: 正規表現以外はES2018大丈夫そう
- <http://kangax.github.io/compat-table/es2016plus/#firefox58>
- laco: `Object.assign`ってspread にした方がよい?
- azu: そうした方がよさそう

### 結論

- azu: [オブジェクト: spread operatorについてを追加する · Issue #349 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/349 "オブジェクト: spread operatorについてを追加する · Issue #349 · asciidwango/js-primer")
- laco: [Node.jsのCLIアプリ · Issue #7 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/7#issuecomment-362233264 "Node.jsのCLIアプリ · Issue #7 · asciidwango/js-primer")の修正

----

## TODOアプリ

- azu: TODOアプリの目的がまだ曖昧
- この間moduleに書き換えてbabelとかを消した
- [refactor(todoapp): Refactor to plain ES module by azu · Pull Request #344 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/344 "refactor(todoapp): Refactor to plain ES module by azu · Pull Request #344 · asciidwango/js-primer")
- laco: クラスとモジュールの使い方的な
- オブジェクト指向的なアプリケーションの作り方ユースケース
- azu: たしかにモジュールの使い方的なところは大きそう
- 今中ではnamed export importしか使ってない
- defaultは合ったほうがいい?
- laco: うーん
- azu: `import()`だとすべてnamedだし、defaultは単なるaliasだからなー
- laco: namedだけでもよさそう

### 結論

- TODOアプリはモジュールとクラスの実践例

----

## モジュール

- azu: モジュールはどこまで説明するかが難しそう
- commonjsとのinteropまでいくと無限にある
- なので基本的な文法 + HTMLのスクリプトタグで動かしましょうぐらいかなー
- 実際の使ってるはTODOアプリでよさそう
- azu: dynamic importはどうなだっけ?
- laco: まだStage 3
- azu: `import.meta`の話もあるし今回はスキップで

### 結論

- モジュールは文法より
- dynamic importは省く
- [モジュール · Issue #329 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/329 "モジュール · Issue #329 · asciidwango/js-primer")

----

## 次回

2018年3月8日(木)
