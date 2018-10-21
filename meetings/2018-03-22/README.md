# 2018-03-22 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

## アジェンダ

- [2018-03-22 MTGアジェンダ · Issue #420 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/420 "2018-03-22 MTGアジェンダ · Issue #420 · asciidwango/js-primer")


----

## セクションタイトルのID振り直し

- 完了: [セクションのパーマネントURLに日本語を含まないようにする #359](https://github.com/asciidwango/js-primer/issues/359 "セクションのパーマネントURLに日本語を含まないようにする #359")
- textlintルールを追加したので、これから書くときにIDを追加する
- Thanks to @nd-02110114 @yumetodo
- azu: レビューしててきになったところ
- map/setの所
    - https://jsprimer.net/basic/map-and-set/#add-and-take-out-for-map
    - deleteがタイトルにはないなーと思った
-  "要素の追加と取り出し"
- 削除がない
- CRUDみたいなget,set,has,deleteをまとめた言葉あるといい?
- laco: write/readとか
- azu: よさそう

### 結論

- `map-read-and-write`にする
- [map-and-setのlink修正 · Issue #423 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/423 "map-and-setのlink修正 · Issue #423 · asciidwango/js-primer")

----

## ECMAScript proposal

- azu: [コラム: ECMAScript/JavaScript策定プロセス · Issue #54 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/54 "コラム: ECMAScript/JavaScript策定プロセス · Issue #54 · asciidwango/js-primer")書いた
- azu: 章として独立させた
- kahei: 長くなった? 
- azu: 3-4ページ程度
    - 今は後ろの方に置くイメージで書いた。
    - クラスよりも後ろにしないと行けない依存がある
- azu: 今はまだJavaScriptとECMAScriptの明確な区別の話はあっさりとしてやってない
    - [introduction: JavaScriptとECMAScriptの区別について · Issue #123 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/123 "introduction: JavaScriptとECMAScriptの区別について · Issue #123 · asciidwango/js-primer")
- azu: このECMAScriptのコラムを合わせやるのはどうかなーと思った
- azu: けど前半にやるにはちょっと重たいかなと思った
- azu: ECMAScript Proposalの方は付録みたいな感じ
- kahei: 今のまま分けたままよさそうですね。


### 結論

- "ECMAScript/JavaScript策定プロセス" と "JavaScriptとECMAScriptの区別について" は統合しない

----

## Todoアプリについて – azu

- azu: 次にTODOアプリをやろうとしてる
- [TODOアプリ · Issue #4 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/4 "TODOアプリ · Issue #4 · asciidwango/js-primer")
- 最近やったリファクタリング
    - [refactor(todoapp): Viewをテンプレートベースに by azu · Pull Request #381 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/381)
    - [js-primer/OUTLINE.md at master · asciidwango/js-primer](https://github.com/asciidwango/js-primer/blob/master/source/use-case/todoapp/OUTLINE.md)

### Todoアプリ足りない機能    

- 機能としては 〜 [OUTLINE.md](https://github.com/asciidwango/js-primer/blob/7c573188d93b24de496b716c5483f5535f0251df/source/use-case/todoapp/OUTLINE.md) を見ながら 〜
    - TODOアイテムの追加
    - TODOアイテムの削除
    - TODOアイテムの更新(✓)
- azu: TODOMVCだと後はフィルターやタイトルの変更?
- laco: vanilla es6 がある
    - http://todomvc.com/examples/vanilla-es6/
- azu: あんまりES6って感じがしない
    - jQuery、Backboneっぽい感じになるんだなー
    - DOMを直にいじりまくってる感じがする
    - 自分が書いてるのはinnerHTML一発に逃げている感じ
    - 最近のReactとかVueとかAngularとかは大体そういう感じになるだとうと思うし
- azu: TODO足りないものはなんだろ
    - タイトル
    - フィルター
- laco: 後はクリアとかもTODOMVCにはある
- laco: フィルターはArray#filterの例としていいかも
- azu: 状態をどこにもつかか
- azu: タイトルの変更は click したら input に切り替えるみたいなハックっぽさあって嫌だな
- azu: フィルターは入れよう

### Todoとイベント駆動

- laco: イベントの扱い的なユースケース
- azu: [OUTLINE.md](https://github.com/asciidwango/js-primer/blob/7c573188d93b24de496b716c5483f5535f0251df/source/use-case/todoapp/OUTLINE.md) にも書いたけどTodoはイベント駆動のサンプルっぽい
- DOMのイベント、自作のイベント

### EventEmitter

- azu: イベントと言えばEventEmitterを使ってる
- laco: EventEmitterはWeakMapを使ってる?
- azu: あれ？そういえば使ってない
    - これクラスでも[継承のユースケース {#extends-usecase}](https://github.com/asciidwango/js-primer/blob/7c573188d93b24de496b716c5483f5535f0251df/source/basic/class/README.md#%E7%B6%99%E6%89%BF%E3%81%AE%E3%83%A6%E3%83%BC%E3%82%B9%E3%82%B1%E3%83%BC%E3%82%B9-extends-usecase "継承のユースケース {#extends-usecase}")として書いてる
    - なんか複数の実装がある
- laco: [WeakMap {#weakmap}](https://github.com/asciidwango/js-primer/tree/7c573188d93b24de496b716c5483f5535f0251df/source/basic/map-and-set "WeakMap {#weakmap}")でも何か似たようなことしてる
- azu: `EventEmitter` という言葉に一貫性がない
- => Issue: [EventEmitterの一貫性 · Issue #424 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/424 "EventEmitterの一貫性 · Issue #424 · asciidwango/js-primer")
- azu: 一貫性ある形にしないとダメそう。同じ言葉なのに実装が色々ある
- kahei: それは確かに不親切そう
- azu: 今の実装をまとめると
    - Class: https://jsprimer.net/basic/class/
    - Map/Set: https://jsprimer.net/basic/map-and-set/
    - Todo
- azu: クラスではユーザーが作ったクラスの継承の現実例として書いた
- laco: Errorとかではダメなの?
- azu: ビルトインは他にあるので、現実的なユースケースとして
    - Polygonとか継承してもうれしくないし抽象的
- laco: https://jsprimer.net/basic/class/#extends-usecase ここのEventEmitterは配列でハンドラ管理してる
- azu: たしかに
    - ここではMapがまだないから使ってなかった気がする
- azu: クラスのEventEmitterをTodoアプリの方に移動しよう
- azu: クラスでは実践的な例はTodoアプリでやるよと書く
- laco: よさそう

### UseCaseをバージョンごとにディレクトリを分ける書き方をするべきか?

- azu: 他のユースケースは書き途中の断片を置いてるけどそうした方がいい?
- laco: そうした方が分かりやすかった
- azu: Todoアプリはモジュール数が多いんだよなー
- laco: 最終形はそのままにして、断片だけを置くとか?
- azu: とりあえずそうしてみるか

### Todoアプリの結論

- Todoアプリにタイトル変更はいらない
- Todoアプリにフィルターをいれる
- Todoアプリに最低限のスタイルを当てる
- クラスのEventEmitterをTodoアプリの方に移動する
    - <https://github.com/asciidwango/js-primer/issues/424>
- Todoアプリのソースは最終形と断片を読み込んで書く

## Spread Operator???

- azu: 「Spread演算子」をどうするか
- [「スプレッド演算子」という表現を使わない - Qiita](https://qiita.com/hoo-chan/items/784f103e4d26747c89f0)
- [[meta] 用語集 · Issue #231 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/231#issuecomment-333352753)
- azu: 結局これ `...array` の正式名称がなくて困ってるから spread operatorとか書いてた記憶
- azu: `...` じたいの名前はElementだけど、それと変数名とかexpressionを含めた名前ががない
- kahei: スプレッド演算子というのはよく言われそう
- azu: 実際には演算子ではないけど、他の呼び方が「スプレッド構文」ぐらいしかない
- laco: spread operatorって使ってる?
    - いくつか使っているらしい
    - https://github.com/asciidwango/js-primer/issues/420#issuecomment-375268588
    - https://github.com/asciidwango/js-primer/issues/420#issuecomment-375268783
- laco: [Object Rest/Spread Properties for ECMAScript](https://github.com/tc39/proposal-object-rest-spread#object-restspread-properties-for-ecmascript "Object Rest/Spread Properties for ECMAScript")
- azu: objectのやつはspread propertyとか言ったりしてる。
    - ただし `...array` がなー
- azu: spread 構文というしかない気がしている
- laco: TypeScriptは言うのを諦めてる
    - <https://github.com/asciidwango/js-primer/issues/420#issuecomment-375270007>
- laco: 引数のは rest parameterか
- azu: 以下に方針にする
    - 引数: `fn(...args)` : rest/spreadパラメータ
    - 配列/文字列: `...array` : spread構文(その他)
    - オブジェクト: `{ ...obj }` : spreadプロパティ


### 結論

- spread operatorをやめる
- 引数: `fn(...args)` : restパラメータ
- 配列/文字列: `...array` : spread 構文
- オブジェクト: `{ ...obj }` : spreadプロパティ
- [spread operator -> spread syntax · Issue #425 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/425 "spread operator -&gt; spread syntax · Issue #425 · asciidwango/js-primer")


----

## 残りタスク – モジュール

- azu: projectにまだ書く必要がある章をまとめた
- [基本文法](https://github.com/asciidwango/js-primer/projects/1)
- [ユースケース](https://github.com/asciidwango/js-primer/projects/3)
- azu: 自分は次 TODOを演る予定
    - https://github.com/asciidwango/js-primer/issues/4
- azu: moduleは担当きまってたけ?
    - [モジュール(module) · Issue #329 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/329 "モジュール(module) · Issue #329 · asciidwango/js-primer")
- azu: 前回やることは大体決めた
    - [js-primer/meetings/2017-12-07 at master · asciidwango/js-primer](https://github.com/asciidwango/js-primer/tree/master/meetings/2017-12-07#%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB "js-primer/meetings/2017-12-07 at master · asciidwango/js-primer")
- azu: @laco アサインしていい?
- laco: yes
- azu: モジュールは `.js` を付けないといけないことにハマりそう
- azu: Todoアプリ書いててちょこちょこハマった
    - 通信エラーがでるだけなので開発者ツール開かないと分からない
- laco: モジュールの章でその補足?
- azu: 基本的には.jsを付けるにして、Node.jsは省略できるという拡張であるというスタンスかな
- laco: それでよさそう
- azu: 実際にES module使うのはTodoが初めてなので、そこでエラーの補足をする

### 結論

- laco: [モジュール(module) · Issue #329 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/329 "モジュール(module) · Issue #329 · asciidwango/js-primer")
- azu: TODOアプリでモジュールの読み込み失敗パターン


----

## fsとpromise

- [node-cli: util.promisifyについて触れる · Issue #311 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/311 "node-cli: util.promisifyについて触れる · Issue #311 · asciidwango/js-primer")
- laco: `fs.promise`の具体的な使い方がない
- azu: マージはされたけどNode 10だっけ?
- laco: Node 10は 5月?
- azu: https://github.com/nodejs/Release
    - そんな感じっぽい
    - LTSは10月だからもっと先
- azu: 本の出す時期のターゲットはNode 8がメインかな
- laco: fs以外にpromiseあるんだっけ?
- azu: ないはず
- laco: そこまで必要性がない話なのかも
- 書くとかえって混乱させそう。まだNode 10がメインになるのは更に先だから
- kahei: 必要になったらコラムで書くぐらいでいいのでは
- azu: そうしますか

### 結論

- `fs.promise`、NodeとPromiseは必要になったら書く
- [node-cli: util.promisifyについて触れる · Issue #311 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/311 "node-cli: util.promisifyについて触れる · Issue #311 · asciidwango/js-primer")


----

## privateについて

- azu: privateについてまた一悶着ありそう
- <https://github.com/asciidwango/js-primer/issues/422#issuecomment-375278092>
- azu: 完全に消した方が安全そうな気がする
- azu: 現時点(ES2018)にはprivateはありませんと書けば嘘ではない気がする
- kahei: たしかに


### 結論

- privateについてはクラスから消す
- 現時点ではprivate修飾子のようなものはありませんと書く
- <https://github.com/asciidwango/js-primer/issues/422#issuecomment-375278092>

-----

## エスケープシーケンス

- [無効なエスケープシーケンスについてどこかに書けないか #372](https://github.com/asciidwango/js-primer/issues/372 "無効なエスケープシーケンスについてどこかに書けないか #372")
- azu: 今エスケープシーケンスについて書いてたっけ?
- `\u{}`ぐらいかな
- laco: `\"`もエスケープシーケンスという扱いになってるらしい
- azu: それ自体は 文字列リテラルで書いてたはず
- azu: 他の日常的に書くものとしたら `\n`、`\t` とかぐらいかな
    - この辺のエスケープシーケンスについての紹介と
    - もし `\n` という文字列そのものを書きたい場合は `\\` のように `\` をエスケープしないとダメだよというのを書くのが良さそう
    - エスケープシーケンスの一覧自体はスペース的にも微妙そうなので、一覧自体はMDNかな
- azu: 正規表現のところにもエスケープ表現があったはずなので、注記を入れる

### 結論

- エスケープシーケンとは〜を簡単に
- エスケープシーケンに被る文字列そのものを出すにはを合わせて


## 次回

5月11日(金)
