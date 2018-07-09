# Promise

## 目的

- Promiseというオブジェクトについてを理解する
- Promiseによる非同期処理を理解する
- コールバック関数との違いについて
- async/awaitについての使い方を紹介する
- for await? generator?
- 非同期処理は、今までの書いた通りの動きではなく、どのように処理されているかの動きを元にハンドリングしないといけなません。
    - 上から順ではなくなっている

## 非同期処理

- ECMAScriptには非同期処理を行うコールバックを取るものがない
- `setTimeout`関数を利用する

## 仕様

- PendingJob
- https://tc39.github.io/ecma262/#sec-enqueuejob
- https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
- ECMAScript と　DOM
     - https://html.spec.whatwg.org/multipage/webappapis.html#integration-with-the-javascript-job-queue

## 紹介する項目

- 非同期処理
- コールバック
    - try-catchできない

```
try{
  fn(callback);
} catch(error){
}
```

- Nodeスタイルのエラーキャッチ
    - 処理内でエラーが起きた場合にコールバックにどう伝えるかという
    - Promise
- イベント
- 非同期は非同期に統一
- `new Promise`
- `Promise.resolve`
- `Promise.reject`
- `Promise#then`
- `Promise#catch`
- `Promise#finally`
- promiseオブジェクト
- `Promise.all`
- `Promise.race`
- async function
    - 常にpromiseオブジェクトを返す
    - await operator

## 紹介しない項目

- Thenable
- Promise/A+
- jQuery
- Cancal/AbortController

## 調べること

- try-catchのスコープの原理
    - setTimeoutは実行コンテキストが異なる
    - thisもデフォルトではwindowになる
- ECMAScriptに非同期処理はある?
    - => ない
    - Completionで基本やり取りしてる
- JavaScriptで非同期処理が多様される理由
    - ブラウザ main threadでJavaScriptが実行されるから
    - 例えば、通信処理で、通信してデータが取得できるまでUIをブロッキングするわけにはいかないため

## 全体的な流れ

- 同期エラーはスコープチェインのように伝播する
- try-catchで止めれば、それ以上伝播しない
- 非同期エラーは実行コンテキストが異なるため伝播しない  
    - コールバック内でtry-catchしないといけない
- 非同期エラーを伝播させる技術としてエラーファーストコールバック *A
- エラーファーストコールバックはNode.jsで発展した
    - <https://www.joyent.com/node-js/production/design/errors>
- (省略) Promise/A+
- ES2015 Promise
- Promiseは非同期処理の成功と失敗の統一的なインタフェースを提供するビルトインオブジェクト *A
- エラーファーストコールバックはあくまで規約だったものをオブジェクトとしてパターン化した
- 非同期には、直列、並列的な表現などさまざまパターンがある
- => 詳細なパターンについてはPromise本を参照
- Promiseにおいてエラーは暗黙的に伝播し、明示的に伝播させる場合にはrejectを行う
- Async/Await
- Promiseはあくまでオブジェクトでそれを構文として表現したのがasync/await
- async functionは常にPromiseオブジェクトを返し、async functionにおいてはawait式が利用できる
- await式はPromiseがsettleとなるまで待ち、その実行結果を現在の実行コンテキストへと返すもの
    - Completionによって結果を伝えてる
- この時にエラーも伝播ができるため、try-catchで同期処理と同じように例外をキャッチできる *A

＊Aは同じコード例の別表現の例示

## アウトライン

- try-catchは伝播を止める
    - ネストしたエラーはtry-catchした時点でエラーがとまる
    - 握りつぶすのは悪いパターン
- 非同期処理とは
    - JavaScriptはブラウザとともに発展した
    - ブラウザではJavaScriptはシングルプロセスだった
        - 必ずしもシングルプロセスではないが、メインの処理はmain/ui threadが同居する
    - またJavaScriptで表示を変更できるため、表示と一体となっている
    - そのためJavaScriptで重たい処理を行うと表示も重たくなる(例外はあるけど)
    - JavaScriptにおける非同期処理は、マルチスレッドのように実行するプロセスそのものを分けるのではなく
    - 実行する処理を分けて細かく切り替えて実行する
    - 並行的に処理することで非同期処理をしている
        - これのメリットはロックしなくてもなんとなく動くこと
- 非同期処理では例外がキャッチできない
    - 今までやってきた処理はすべて同期処理でした
    - そのため、関数を呼び出しもtry-catchできました
    - 非同期処理のコールバックはtry-catchできない
    - try-catchは実行したタイミングでのエラーをキャッチできるもの
        - なぜなら、コールバック関数が実際に実装するときにはすでにtry-catchのマークしたエリアを抜けているためです。
    - [x] コード例: settimeout
- 非同期処理でのエラーの考え方
    - setTimeoutは非同期処理ですが、それ自体は必ずコールバック関数を呼び出す(成功するため)、
    - 確率的に失敗する次のような非同期関数を例に考えていきましょう。
    - [ ] 処理時間に依存したエラー処理
- 非同期処理のエラーハンドリング
    - この問題を解決するために、非同期処理内でエラーがおきた場合にコールバックを呼ぶときにどのようにエラーがおきたかを伝える必要がでてきた
    - 方法としては、エラーのときに呼ばれるコールバックと正常なときのコールバックを2つ登録する方法
        - これはブラウザで使われるDOM APIのイベントリスナーなどでも利用されている
    - もう一つはエラーファーストコールバックというNode.jsで使われる手法
        - これはコールバック関数の最初に引数はエラーが発生したときのプレースホルダーとしておき
        - 実際にエラーが発生したときはエラーオブジェクトがはいる。
        - エラーが発生しなかったときはnullをいれるという手法
        - `(error, ...args) => { if (error){} }`
        - これについてはユースケースのNode.jsで詳細を解説しています
    - どちらもコールバック関数というただの関数でエラーがおきたかどうか伝えるルールを決めて行っているだけに過ぎません。
    - また、非同期処理はネストするように呼ばれることがあり、
    - この際にコールバック関数は必ずネストを1段作ってしまうため、工夫して書かないと簡単に複雑なコードを作ってしまいます
- Promise
    - この問題を解決するためにES2015で導入されたのが、非同期処理を扱うオブジェクトを定義する手法です
    - Promiseは非同期処理における成功、失敗時の処理を定義したオブジェクトです
    - 各非同期処理はこのPromiseオブジェクトを返すことで、同じインタフェースで成功、失敗を扱うことができるようになります。
    - 非同期処理を行う関数はPromiseオブジェクトを返すだけで、利用者はその返されたPromiseオブジェクトに対して成功時、失敗時のコールバック関数を登録します。
    - それぞれの非同期処理がPromiseオブジェクトで表現できます。
    - これによって非同期処理のパターンが形成されます => promise本を参照
    - ~ Promiseの解説 ~
    - [ ] この辺なんか根本っぽくない書き方してるやりなおし
- async await
    - Promiseが導入されたことで、非同期処理をPromiseという単位で扱えるようになりました。
    - しかし、Promiseは実際にはただのオブジェクトです。
    - JavaScriptで現実的なプログラミングをすると高頻度で非同期処理がでてきます。
    - また、Promiseでそれぞれの非同期処理を書くことは簡潔になりましたが、非同期処理のコントロールフローはメソッドチェーンでつないで行く必要がありました
    - そのためES2017で構文として非同期処理をコントロールフローを管理できるasync functionが導入されました
    - async functionはPromiseとGeneratorを使ったシンタックスシュガーであるともいえます。
    - async functionはawait式を使うことでPromiseが解決されるまで、その式でまつことができます
    - これによって、非同期処理が見た目どおり上から下へとコードと同じ似ため通りのコントロールフローで書くことができます。
    - 注意点: async functionの中だけでしか適応されないので、async functionの中でコールバック関数を使った場合は問題が..
    - これはasync functionが必ずPromiseを返すという非同期処理として定義されており、その非同期処理の中においてはどのようなコントロールフローであっても、
    - 最終的にPromiseを返すという結果が同じだから実現できています。
    - なのでasync functionは非同期処理のコントロールフローをまとめる処理と言えるでしょう
    - 見た目も同期的に書けるのに加えて、async function内ではPromiseの非同期処理に対してtry-catchが行えます。
    - これはawait式がPromiseが解決されるまで待ち、resolvedの場合は値を返し、rejectの場合は例外をthrowし直すためです。
    - そのため、await式はPromiseをunwrapする構文と言えるでしょう
- 未使用
    - TODO: AgentとJob Queueと実行コンテキスト解説
    - <https://twitter.com/azu_re/status/1009093690172715009>
    - async/awaitはgeneratorによって現在の実行コンテキスっとのスタックを置き換える
    - なので実行コンテキスト的には継続しているためtry-catchできる?
    - [ ] Generatorを使ったJob Queuesの解説

```
{signal: [
  {
    name: "main Agent job queue",
    wave: "=.l.=.l.=.",
    period:0.5,
    data:["taskA", "setTimout(TaskB, 2000)", "TaskC"]
  },
  {
    name: "worker Agent job queue",
    wave: "=.l..=...",
    period:0.5,
    data:["taskD", "TaskE"]
  }
],
  foot:{
   text: "時間(秒)",
   tick: 0
  },
  config: {
    hscale: 5
  }
}
```