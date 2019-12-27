# 2018-05-17 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

## アジェンダ

- [2018-05-17: ミーティングアジェンダ · Issue #454 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/454)


----

## [TODOアプリ #4](https://github.com/asciidwango/js-primer/issues/4) - azu

- azu: 今6-7割ぐらいは書き終わった
- 各セクションで完動品となってるサンプルで進めてる
- <https://github.com/asciidwango/js-primer/blob/master/source/use-case/todoapp/event-model/README.md#%E3%81%BE%E3%81%A8%E3%82%81-conclusion>
- 各セクションの末尾にディレクトリとURLを貼ってる
- これが紙面だとちょっとノイズかもと思った
- laco: ディレクトリだけ貼られてもたしかにわからないかも
- 箇条書きでそのセクションでやったことを書くとか
- <https://angular.io/tutorial/toh-pt2#summary>
- kahei: チュートリアルは順番に読む前提になっている
- kahei: 最後まで書かないと動かないものはつらいといわれる
- azu: Todoアプリは変更するファイルが多くて、多くの人は全部を一気にやる気力がないのではと思ってる
- なので各セクションは動くもので区切っている
- Todoアプリなので各セクションでチェックボックスの箇条書きでまとめるといいかも
- 機能ごととか?
    - [ ] HTMLとCSSの準備
    - [ ] Todoアイテムの追加機能
    - [ ] Todoアイテムの更新機能
    - [ ] Todoアイテムの削除機能
- イベントとかモデルのセクションじゃないので機能だとまとまらないかも
- laco: できたこととか
    - [x] HTMLからエントリーポイントのJSを読み込めた
    - [x] App.jsをxxxして~できるようになった
    - [ ] mode/TodoList.jsを作り、モデルで状態を管理できるようになった
- azu: よさそう
- 最初から箇条書きの内容は全部書いてあってチェックボックスを埋めていくメタファ

EventEmitter

- azu: EventEmitterはクラスからTodoの方へ移動させた #424
- laco: firefoxは60からmodule?
- azu: yes
- 後でスクリーンショットを取り直さないと


### 結論

- Todoアプリの各セクションのまとめはチェックボックス的な箇条書きを入れる
- ディレクトリ構造は消す
- スクリーンショットを取り直す


----


## [ ajax: fetchの利用について #434 ](https://github.com/asciidwango/js-primer/issues/434)

- laco: 最初からfetchでもよさそう
- azu: でも古典的なイベントとコールバック、Promiseがでてくるユースケースとして成立してる
- 新しい書き方だけじゃないで実際に対処できるようにしたい
- fetchを使えばたしかに短くスキッリするけど
- laco: JSON.parseのエラーハンドリングとかもなくなるか
- azu: コールバック -> Promiseへの書き直し的なこともなくなるからfetchはコラム程度で良い気がする
- laco: なんでfetchについて触れてないのと言うもの対処するコラム

### 結論

- fetch apiについてのコラムを追加する
- [ajax: fetchの利用について · Issue #434 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/434)

-----

## [ajax: ローカルサーバの立て方について · Issue #433 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/433)

- azu: Todoを書いていてajaxではローカルサーバについては触れてないのに突然でてきた
- <https://github.com/asciidwango/js-primer/issues/433>
- ローカルサーバの使い方については触れたほうがよさそう
- azu: Todoではかいてあるけど、どこに書くべきか(同じならまとめたい)
- そもそもpackage.jsonに書いてstartするかという話もある
- その場合はajax -> Node.js -> todoとなってるのを順番変えたほうがよさそう
- 〜<https://github.com/asciidwango/js-primer/issues/433>をみながら〜
- azu: staticは0.x系だった
- laco: ローカルサーバのバージョンがイマイチ安定したものがない
- azu: 機能殆ど必要ないし作ってしまうのもあり
- 以前必須要件は書いた
- <https://github.com/asciidwango/js-primer/blob/3d9e4e84ab83d36c9f2dec4a169da07b8f07b82c/meetings/2016-07-29/README.md#%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%AB%E3%82%B5%E3%83%BC%E3%83%90---laco>
- laco: npx でいれるとか
- scoped moduleで
- azu: `npx @js-primer/server` ?
- laco: `npx @js-primer/local-server`とか
- azu: ajaxはnpm startする必要性がないからそれでよさそう
- Todoの方はどうだろ?
- npm startという共通コマンドがあることについてはしっておいてもよさそう
- 他のだとnpm test
- laco: Todoはtestするの?
- azu: 書いてはあるけど、説明はしないつもり
- laco: ならnpxでよさそう
- azu: そうするか
- `npx @js-primer/local-server` だけでいいならpacakge.json自体いらない
- ajaxとtodoappからpacakge.jsonのステップが消える
- laco: 余計なものは減らしたほうが集中できる
- azu: binは `js-primer-local-server` でいいかな
- 直接たたかないだろうし、local-serverだと被りそう

### 結論

- `@js-primer/local-server` を作る
- <https://github.com/asciidwango/js-primer/issues/462>
- https://github.com/js-primer/ へ置く
- `npx @js-primer/local-server`で入るようにする
- binは `js-primer-local-server`
- ajaxとtodoappはこれを使う
- pacakge.jsonはajaxとtodoappから削除する

## npxの使い方について

- laco: npxの説明は?
- azu: Node.jsが入ってないと使えない
- Node.js 8.2.0で同梱されたnpmが入ってる
- laco: LTSは8.x
- インストールの説明ではnode 8.9+を指定する。(npm 5.2以上を保証したい）
- npxコマンドの簡単な説明を追加する
- [2章の序章: 環境ごとのオブジェクト · Issue #267 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/267)でこれを含めるとか
- azu: [2章の序章: 環境ごとのオブジェクト · Issue #267 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/267)に
    - ブラウザのバージョン
    - Node.jsのバージョン
    - npxのバージョン
- についてのインストールと確認方法をいれる
- そうしたら各ユースケースは詳しくはここって感じで進められる

### 結論

- 以下を追加する
- [2章の序章: 環境ごとのオブジェクト · Issue #267 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/267)
    - ブラウザのバージョン
    - Node.jsのバージョン
    - npxのバージョン
- ajaxとtodoアプリにnpxでローカルサーバを起動できるようにする
- <https://github.com/asciidwango/js-primer/issues/462>


----

## ES2018 

- azu: そろそろES2018がでる
- 確認しておく
- ....確認中...
- 大体問題なさそう
- `async` は紹介する
- けどAsyncGenerator http://2ality.com/2016/10/asynchronous-iteration.html は?
- laco: generatorはやらないはず
- azu: async generatorもそこまで使うケースにならないからいいか

### 結論

- AsyncGeneratorは紹介しない

----

## [用語: イベントを~する · Issue #455 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/455)

- azu: イベントを??する?
- 今は発火とか
- laco: ディスパッチする?
- kaheiさんカタカナでいうのってみたことあります?
- kahei: ないかも
- laco: Googleのドキュメントとかは結構使ってる
- azu: 受け取る側は?
- 監視するとか、購読する
- azu: 購読だとpub/subっぽいのでなんか違う
- laco: 監視も何か変
- イベントをリッスンする
- リッスンするという文字列が間が悪い
- kahei: 口語だと言うことはあるけど
- laco: APIと揃ってるからカタカナ?
- azu: ブラウザはディスパッチとリッスンなAPI
- node.jsのemitはどういう違いなんだろ
- ディスパッチはA -> B -> Cとなって途中で止められるのか
- emitは同列に投げるから止められない
- DOMはバブリングあるしディスパッチ、Nodeは止まらないのでemit
- [用語: イベントを~する · Issue #455 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/455)
- Dispatchの訳語とか思い浮かばない
- azu: カタカナでいくか

### 結論

- ディスパッチ
- リッスン
- イベントハンドラ
- <https://github.com/asciidwango/js-primer/issues/454>
- カタカナで統一する

----

## moduleとスコープ

- azu: moduleのscopeについて
- モジュールの章で触れるかについて
- ajaxのコードはscriptでしか動かない書き方になってる
- <https://github.com/asciidwango/js-primer/issues/454#issuecomment-389838487>
- これを統一するか、モジュールのスコープについての説明をするか
- 今はtodoappのエントリーポイントで説明を書いてる
- laco: `as` のところ同じ識別がモジュール間で重複しない話をする


```
import { foo as fooA } from './module-a.js';
import { foo as fooB } from './module-b.js';
```

みたいなユースケース。それぞれのモジュール内でスコープがあるから同じ名前のfoo変数が存在できる

- A.js と B.jsで同じ名前の変数は定義できる => モジュールのスコープが分かれてるから
- けどimportした時は同じ名前になるから衝突しないように `as` でリネームする
- という話をモジュールのセクションで行う
- azu: なるほど
- これがあれば、todoappの方の説明は省けそう

### 結論

- <https://github.com/asciidwango/js-primer/issues/329>
- モジュールの章にはモジュールのスコープの話を含める
- Todoappでの説明は簡略化

----

## [読者対象 · Issue #461 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/461)

- azu: [読者対象 · Issue #461 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/461)について
- 序章に入れる

----

## [getElementByIdとquerySelector · Issue #437 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/437)

- azu: ajaxとtodoappでそれぞれ違う
- laco: 揃える?
- azu: CSSセレクタのは話しないといけないし無理にやるひつようなし

### 結論

- 現状維持

----

## 次回

6月20日
