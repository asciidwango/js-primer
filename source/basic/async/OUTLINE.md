<!-- textlint-disable -->

# Promise

## 目的

- Promiseというオブジェクトについてを理解する
- Promiseによる非同期処理を理解する
- コールバック関数との違いについて
- async/awaitについての使い方を紹介する
- for await? generator?
- 非同期処理は、今までの書いた通りの動きではなく、どのように処理されているかの動きを元にハンドリングしないといけなません。
    - 上から順ではなくなっている
- どういうときにどの非同期処理を使うかを考えられるようにする
    - で結局どれを使えばいいのという答えを得られるようにする

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

## Term

- 重たい処理 -> 同期的にブロックする処理
- 非同期処理 -> 非同期的なタイミングで実行する処理

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
- 非同期処理でのエラーの考え方: エラーファーストコールバック
    - 非同期処理のエラーは内部でキャッチしても外側に伝えことができないといいう話をしました
    - ここで内部で発生したエラーをそとに伝える方法としてもっと単純な仕組みがコールバック関数を使うことです。
    - コールバック関数を非同期処理が失敗（エラー）、成功したときにそれぞれ呼び出すという単純な方法です。
    - 失敗のコールバックと成功のコールバックを2つに分けて、それぞれを受け取るという方法もあります。
        - 方法としては、エラーのときに呼ばれるコールバックと正常なときのコールバックを2つ登録する方法
        - これはブラウザのイベントAPIなどがその方法をとっている
    - この方法でよく使われているのはエラーファーストコールバックという手法です
        - これはブラウザで使われるDOM APIのイベントリスナーなどでも利用されている
    - もう一つはエラーファーストコールバックというNode.jsで使われる手法
        - これはコールバック関数の最初に引数はエラーが発生したときのプレースホルダーとしておき
        - 実際にエラーが発生したときはエラーオブジェクトがはいる。
        - エラーが発生しなかったときはnullをいれるという手法
        - `(error, ...args) => { if (error){} }`
        - これについてはユースケースのNode.jsで詳細を解説しています
        - その他にも複数のコールバック関数を使う方法もあります。
        - どちらもコールバック関数というただの関数でエラーがおきたかどうか伝えるルールを決めて行っているだけに過ぎません。
- Promise
    - この問題を解決するためにES2015で導入されたのが、非同期処理を扱うオブジェクトを定義する手法です
    - Promsieとコールバックの比較
    - コールバックでは次のように非同期処理をしていました
    - 例) エラーファーストの非同期処理
    - Promiseの非同期処理
    - Promiseは非同期処理に抽象化したビルトインオブジェクトで成功、失敗時の処理を定義できます。
    - 各非同期処理はこのPromiseオブジェクトを返すことで、同じインタフェースで成功、失敗を扱うことができるようになります。
    - 非同期処理を行う関数はPromiseオブジェクトを返すだけで、利用者はその返されたPromiseオブジェクトに対して成功時、失敗時のコールバック関数を登録します。
    - エラーファーストコールバックと同じようにコールバック関数を使うのは同じですが、`then`や`catch`などのメソッドを持つビルトインオブジェクトを定義しています。
    - これによってエラーファーストコールバックではただのルール（破っても何も言われない）だったものが統一したインタフェースとして扱える（破ると正しく動かない）ものとなります。
    - Promiseオブジェクトの作成
        - `new Promise` でのPromiseオブジェクトを作成します
        - resolve => fulfilled => onFulfilledを呼び出す
        - reject => rejected => onRejectedを呼び出す
        - then = catch
    - `Promise#then`と`Promise#catch`
        - thenは２つの引数があるがどちらも省略が可能
        - 多くの場合はthenではsucessの処理をだけを書く
            - suscessの例: delay
        - 失敗の処理を書くには `then(undefined, onRejected)` としないといけない
        - この表記の代わりに `catch(onRejected)`と書ける
            - catchの例: dummyFetch
        - [=> promiseチェーン] thenとcatchはどちらも新しいPromiseインスタンスを作って変えてしている
        - そのためpromiseのメソッドチェーンが可能 => promiseチェーン
    - Promiseの状態
        - まずはPromiseの3つの状態について理解します
        - Pending
        - Fullfilled
        - Rejected
        - [未使用] また、PromiseはImmutableの特性を持っています
        - また、一度変化したPromiseの状態は2度と変化しない。つまりresolve -> rejectとしてもresolveとなます。
        - この一度PendingからFullfilled/Rejectどちらかに変化した状態はそれ以降変化しません。
        - そのためFullfilledとRejectedどちらかの状態になったことをSettleと呼びます。
        -　重要なのはこのsettleのpromiseインスタンスに対しても`then`でコールバック関数を登録できる点です。
    - Promiseの変化済み(settle)のオブジェクト作成
        - すでにfulfilled/rejected済みのオブジェクトを作ることができる
        - これらに対しても`then`や`catch`を使うことでコールバックを登録できる
        - Promiseではすでにsettleとなったオブジェクトに対して登録したコールバックも呼ばれる
        - Promise.resolve()
            - 初期化済みのPromiseオブジェクトの作成などに使われます
        - Promise.reject()
            - thenの中で返すとrejectを通知できる
        - これらに対してthenやcatchしてもコールバック関数が呼ばれる
    - [コラム] 初期化処理は同期、コールバックの呼び出しは非同期処理
        - つまりはthenは常に非同期で呼ばれるということに注意する
    - Promiseチェーン（直列処理）
        - Promiseチェーンと呼ばれる仕組みを理解する
        - Promiseでは、`then`や`catch`メソッドが新しいPromiseインスタンスを返します。
        - これによって、`then`メソッドを使ってメソッドチェーンが行えます。
        - 普通の値を返す場合
            - 自動的に**Fulfilled**なPromiseにして返される
        - promiseを返す場合
            - thenやcatchの中で新しいPromiseインスタンスを返すと、その結果に応じてPromiseチェーンの分岐が変化します。
            - thenやcatchの中では何もせずに処理が終わった場合は成功として扱われFulfilledとなります。
            - thenやcatchの中で、RejectedなPromiseをreturnすると失敗として扱われRejectedとなります。
        - Promiseチェーンのパターン
            - S -> S
            - S -> F -> S
            - F -> S -> S
            - S -> S -> F
            - F -> F
        - そのため、 A -> B という非同期処理は次のように書くことができます。
        - さらにこのA->Bのどちらかでエラーが発生したい場合にエラーハンドリングをしたい場合は、最後に`catch`メソッド追加するだけで扱えます。
        - Promiseが **Rejected**となった場合は、そのエラーがキャッチ(`catch`または`then`の第二引数)されるまで、promiseインスタンスの状態が伝搬します
        - このようにPromiseはメソッドチェーンで処理を書くことができ、また状態もチェーンを通じて伝わります。この書籍ではPromiseをメソッドチェーンでつなぐことをPromiseチェーンと呼びます。
        - thenの返り値            
            - thenの返り値は何を返してもPromise(つまりPromise.resolveされているようなもの)
            - undefinedならundefinedになる
            - つまりPromiseでラップしたものは基本的にラップしたまま扱う
            - 返した値は次のthenのコールバック関数に渡される
        - errorの返り値
            - エラーを返してもPromiseは **Rejected**となるわけではない
            -  **Rejected**なPromiseを返すことで **Rejected**となる
            - thenのコールバック関数で問題があり、エラーとしたいならば
            - Promise.rejectを返す
        - 大きな流れ
            - 正常系はすべてのthenを順番に実行する
            - 異常系が起きた場合は次のcatchまでスキップし実行し、catchの返り値は正常なPromise
            - 明示的に失敗させたい場合はthrowではなくPromise.rejectを返す
        - 非同期処理が1つだけならば、Promiseとコールバックは書き方が少し違うだけで、大きな違いはありません。
        - Promiseが非同期処理として使い勝手がよくなるのは、複数の非同期処理を扱う場合に大きなメリットがあります。
        - 次のようにAを取得し、Bを取得するといったように非同期処理を連続的に行う場合を考えてみましょう
        - コールバックでのネストとの比較
        - コールバック関数では、複数の非同期処理を順番に行うコードを単純に書くとネストがどんどん深くなってしまいます。
            - ネストが深くなるのは、工夫によって避けることができますが、それは別途非同期処理を管理する仕組みを作る必要があります
    - Promiseと例外
        - 例外: Promiseは自動的にcatchされる
        - Promiseのコンストラクタやthenのコールバック関数では自動的にtry-catchされる
        - 例外が発生すると自動的にcatchが呼ばれる
        - PromiseチェーンでPromise.rejectを使ってrejectするほうが良い
        - throwで例外を投げるとデバッガーが反応してしまうため
    - [コラム] thenやcatchは常に新しいpromiseオブジェクトを返す
    - Promise.allで同時に実行
        - まとめて実行してすべての結果を待つ
    - Promise.raceでタイムアウト
        - Promise同士を競争させて最初に終わるのを待つ
        - 特性を利用してタイムアウトを実装する
    - [未使用] Promise#finnalyで最後に実行
        - リソースを開放したい場合
        - try...finallyと同じ意図
- [未使用] コールバックの問題点
    - 非同期処理が連続する場合もあります。
    - 次のようにAが取得できたらBを取得して、Cを取得するというような直列的なものをコールバックで書くとネストしてしまいます。
    - この際にコールバック関数は必ずネストを1段作ってしまうため、工夫して書かないと簡単に複雑なコードを作ってしまいます
    - この問題はコールバックの実行順序を管理する関数を作ることで回避できますが、頻出するパターンであるため
- Async await
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

----

## Promise

Promise本から抽出した内容

- [1.1. What Is Promise](http://azu.github.io/promises-book/#what-is-promise)
    - Promiseは非同期処理を抽象化したオブジェクトとそれを操作する仕組みのことをいいます
    - コールバックとPromiseを使った書き方の違い
    - Promiseは統一したインタフェースがあることについて
- [1.2. Promise Overview](http://azu.github.io/promises-book/#promises-overview)
    - コンストラクタ、インスタンスメソッド、静的メソッド
    - Promiseの3つの状態 [`[[PromiseState]]`](https://tc39.github.io/ecma262/#table-59)
        - fulfilled => onFulfilled
        - rejected => onRejectedの対応
        - Pending
- [1.3. Promiseの書き方](http://azu.github.io/promises-book/#how-to-write-promise)
    - `new Promise`
- [2.1. Promise.resolve](http://azu.github.io/promises-book/#ch2-promise-resolve)
    - `Promise.resolve`
- [2.2. Promise.reject](http://azu.github.io/promises-book/#ch2-promise-reject)
    - reject insteadof throw
    - [4.3. throwしないで、rejectしよう](http://azu.github.io/promises-book/#not-throw-use-reject)
- [2.3. コラム: Promiseは常に非同期?](http://azu.github.io/promises-book/#promise-is-always-async)
    - 自動的にresolveされることについて
- [2.4. Promise#then](http://azu.github.io/promises-book/#ch2-promise.then)
- [2.5. Promise#catch](http://azu.github.io/promises-book/#ch2-promise-catch)
    - [2.10. then or catch?](http://azu.github.io/promises-book/#then-or-catch)
    - catchを書く場所
- - Promise#finally
- [2.6. コラム: thenは常に新しいpromiseオブジェクトを返す](http://azu.github.io/promises-book/#then-return-new-promise)
    - メソッドチェーンの仕組み
    - [4.7. Promiseとメソッドチェーン](http://azu.github.io/promises-book/#promise-and-method-chain)
- [2.8. Promise.all](http://azu.github.io/promises-book/#ch2-promise-all)
    - 並列処理
    - 直列処理 [4.8. Promiseによる逐次処理](http://azu.github.io/promises-book/#promise-sequence)
- [2.9. Promise.race](http://azu.github.io/promises-book/#ch2-promise-race)
    - タイムアウト処理
    - [4.5. Promise.raceとdelayによるXHRのキャンセル](http://azu.github.io/promises-book/#race-delay-timeout)
- 省略
    - Promise/A+、thenable

## [例外処理 · JavaScriptの入門書 #jsprimer](https://asciidwango.github.io/js-primer/basic/error-try-catch/)

- 例外とは?
    - 例外とは、この書籍での定義
    - エラーが発生する
    - エラーは伝播すること
    - [Chapter 14. Exception Handling](http://speakingjs.com/es5/ch14.html)にあたるもの
- try
- catch
- finnally
- Error
- throw
- エラースタック

## 関連

- コールバックをPromiseに変換
    - [Promiseを活用する · JavaScriptの入門書 #jsprimer](https://asciidwango.github.io/js-primer/use-case/ajaxapp/promise/)
- try-catchの例
    - JSON.parse
- async await
    -　ない => Promise本


----

https://classroom.udacity.com/courses/ud898

- Status
- new Promise
    - resolve二回はできない
- Promiseはtry-catchされている
- resolve, reject
- then, catch
- Fetchを使った例
- then.catchは両方の可能性、thenの場合は片方だけ
- コントールフロー
- 直列、Concurrent

---

## async

- 定義
    - 関数宣言
    - 関数式
    - メソッド
    - arraow function
- async function return promise
- awaitはunwrapする
- async await
    - async promise
    - If the Promise is fulfilled, the result of await is the fulfillment value.
    - If the Promise is rejected, await throws the rejection value.
    - Promiseで書いた例
    - あくまでasync functionの中でのみ利用できる
- try catch
- callback と async
    - asyncはかくまでasyncの直下じゃないと使えない
    - mapとの組み合わせについて
    - http://exploringjs.com/es2016-es2017/ch_async-functions.html#_async-functions-and-callbacks
- asyncはpromiseがコアの概念であくまでシンタックスにちかい
- async function内でのthrow

```js
async function foo() {
    throw new Error('Problem!');
}
foo().catch(error => console.log("catch", 

error));
```

- Promiseは1つの非同期処理の結果を表現するオブジェクト
    - <https://www.w3.org/2001/tag/doc/promises-guide>