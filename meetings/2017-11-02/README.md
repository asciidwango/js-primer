# 2017-09-28 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

## アジェンダ

- [2017-11-02 ミーティングアジェンダ · Issue #301 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/301 "2017-11-02 ミーティングアジェンダ · Issue #301 · asciidwango/js-primer")

## Node.jsとPromise

- @azu: Node CLIでcallbackだけになっている
- けど最近のNode.jsは`util.promisify`を持っている
- そのためcallback -> promiseとする方法について触れておくといいのでは?
- https://jsprimer.net/use-case/nodecli/
- 全体を書き換えるというイメージよりはNodeスタイルのコールバックはこうやってPromiseに書き換えできるよ、さらにutil.promisifyというよという1行程度で終わるような説明
- @laco: コールバックを使っているのは fs の部分だけ
- https://jsprimer.net/use-case/nodecli/read-file/
- @laco: `util`ってユーザーが使っていいものなんでしたっけ?
- @azu: 公式ではStability: 2 - Stableとなっているので使っていいものとして公開してそう
- [Util | Node.js v9.0.0 Documentation](https://nodejs.org/api/util.html "Util | Node.js v9.0.0 Documentation")
- @laco: なるほど
- @azu: あんまりutilは積極的に使ってほしくはないけど
- 最近だと`assert.deepStrictEqual`のロジックとして[util.isDeepStrictEqual(val1, val2)](https://nodejs.org/api/util.html#util_util_isdeepstrictequal_val1_val2 "util.isDeepStrictEqual(val1, val2)")が公開された
- @azu: 1行程度で`util.promisify`というものがあるよ = Node.js公式にもPromise化する方法があるよという導線がアレばよさそう
- 公式のAPIがPromiseになってないのはパフォーマンス要因が多いので、あんまり深入りはしなくていいかな

### 結論

- https://jsprimer.net/use-case/nodecli/read-file/
- fsのreadFileの紹介のところでさくっと util/promisify を紹介しておいて、NodeにもPromiseがあることを述べておく
- [node-cli: util.promisifyについて触れる · Issue #311 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/311 "node-cli: util.promisifyについて触れる · Issue #311 · asciidwango/js-primer")
- Assign: @laco


## Node 8.x LTS

- @azu: そういえばNode.js 8.xのLTSが出てた
- [NEWS: Node.js 8 Moves into Long-Term Support and Node.js 9 Becomes the New Current Release Line](https://medium.com/the-node-js-collection/news-node-js-8-moves-into-long-term-support-and-node-js-9-becomes-the-new-current-release-line-74cf754a10a0 "NEWS: Node.js 8 Moves into Long-Term Support and Node.js 9 Becomes the New Current Release Line")
- 今のLTSは4,6,8
- @laco: 4はすぐ切れそう
- [nodejs/Release: Node.js Foundation Release Working Group](https://github.com/nodejs/Release "nodejs/Release: Node.js Foundation Release Working Group")

![lts](./img/lts-schedule.png)

- @azu: 2018年の4月で4のLTSが切れる
- @laco: Travis CIは今どれ?
- @azu: `stable`と`lts/*` なので8 と 9
- 6と8でよさそう?
- @laco: 9も入れる?

### 結論

- Travis CIのnode_jsを6,8,stableにする
- [Travis CIのnode_jsを6,8,stableにする · Issue #312 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/312 "Travis CIのnode_jsを6,8,stableにする · Issue #312 · asciidwango/js-primer")


## npm v5

- @azu: Node.js 8だとnpmも5系になる
- package-lock.jsonが自動生成される
- どこかで出力されるファイルを触れていたっけ?
- @laco: npm使う所でpackage.jsonが出てきてる
- [コマンドライン引数を処理する · JavaScriptの入門書 #jsprimer](https://jsprimer.net/use-case/nodecli/argument-parse/ "コマンドライン引数を処理する · JavaScriptの入門書 #jsprimer")
- @azu: package-lock.jsonもできるかもという追加が必要そう
- なにこれ?って思われると思うので、
- バージョンを固定するためのファイルです的な説明
- @laco: `--save`も不要になった
- これも外す?
- @azu: いや、互換性や`--save-dev`との対称性のため残しておいたほうが良さそう

### 結論

- package-lock.jsonについてを簡単に触れる
    - [node-cli: npm v5のpackage-lock.jsonについて · Issue #313 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/313 "node-cli: npm v5のpackage-lock.jsonについて · Issue #313 · asciidwango/js-primer")
- `--save`は残す

## サンプルコードの間違い問題

- https://github.com/asciidwango/js-primer/issues/301#issuecomment-341352061
- @azu: サンプルコードでたまに間違ってるコードがある
- 自動テストは実行しているけど`ReferenceError`は無視している
- そのため変数名の間違いとかが拾えていない
- なんらかの特殊ルールとかを入れて解決したい
- 特定の言語なら`ReferenceError`を許可する(今はすべての`js`で許可されている)
- @laco: CodeBlockをjsじゃないなにかにするとか
- `js:invalid`はいける?
- @azu: GitHubは`js:invalid`という言語になってしまうっぽい
- シンタックスハイライトはつかなかった
- @laco: `js invalid` なら?
- @azu: GitHubは`js`になった！
- GitBookはどうなってるんだろ。
- 後で調べる
- GitBookは最悪プラグインを書くことでどうにかなる

### 結論

- GitBookではどうなるかを確かめる
- [langがついていないCodeBlock · Issue #309 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/309 "langがついていないCodeBlock · Issue #309 · asciidwango/js-primer")
- もし大丈夫なら、`js noerror`というlangは無視するテストを作る
- すべてのコードを確認する => ユースケースが多そう

## エラーの話

- @laco: エラーの話を次に書く予定
- エラーがおもったより難しい
- [Error/try...catch文 · Issue #93 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/93 "Error/try...catch文 · Issue #93 · asciidwango/js-primer")
- @azu: エラーハンドリングになると深そう
- @laco: できるだけライトな感じにしないと深くなる
- 構文、エラーの種類、エラーの読み方
- @azu: エラーメッセージはここがTypeで、ここがメッセージでみたいな読み方があると良さそう
- エラーが詰まったときにココ読んでどこを検索すれば正解にたどり着けるかみたいな
- いっそ開発者ツールのスクショもありか
- エラーが出て困ったときに読むと足がかりになる章がいい
- @laco: とかかな

```
    try-catch-finallyとthrowの構文の話
    ビルトインErrorの話
        スタックトレースの読み方
        Firefoxのスクリーンショットで説明する
    Errorコンストラクタの話
```

- @azu: エラーの読み方は最初のコンソールのところでもいるのかなー
- https://jsprimer.net/basic/read-eval-print/
- エラーで詰まったときにエラーの章を読みますって人がどれくらいいるのか?
- @kahei: うーん
- @azu: なので、コンソールのところにエラーの章への誘導みたいのはいるのかもしれない
- 今のFirefoxは開発者ツールにエラーの説明の `[詳細]` リンクがでる
    - <https://github.com/asciidwango/js-primer/issues/301#issuecomment-341387593>
- [JavaScript エラーリファレンス - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Errors "JavaScript エラーリファレンス - JavaScript | MDN")
- これを説明すると結構手がかりとして良さそう

### 結論

- エラーの章は深く書くと深みがあるので表面的に
- 一方、エラーが出て困ったときに読むと足がかりになる章となることを目指す
- [Error/try...catch文 · Issue #93 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/93 "Error/try...catch文 · Issue #93 · asciidwango/js-primer")

## 関数オブジェクトとthis

- @azu: 今関数オブジェクトとthisを書いている。
- スコープは後は整えたら終わり
- 関数オブジェクトの章は半分は`this`についてなりそう

〜 <https://github.com/asciidwango/js-primer/issues/301#issuecomment-341387807>を見ながら 〜

- @azu: `Function`自体が持つメソッドやプロパティは殆どデバッグ用
- `this`が中心となってしまう
- 初心者は`this`の解釈が色々起きてしまうけど基本的なルールは呼び出し元で変わるよという話
- thisはarguments に近いみたいな。呼び出し元によって変わる特殊なものだよという話をしたい
- `this`の章と割り切ってもいいかも
- @kahei: `this`の章…
- @azu: たしか開眼JavaScriptとかも`this`の章があったはず
    - <https://github.com/asciidwango/js-primer/issues/301#issuecomment-341390041>
- @kahei: なるほど
- @azu: thisの例はなにがいいのか難しい(classじゃないthis)
- thisを使うのVueぐらいしか思いつかない
- @laco: あえてjQueryとか?
- @kahei: jQueryを出すとjQueryの説明をしないとダメなのでは
- @azu: たしかに
- @laco: ['this' in TypeScript · Microsoft/TypeScript Wiki](https://github.com/Microsoft/TypeScript/wiki/'this'-in-TypeScript "&#39;this&#39; in TypeScript · Microsoft/TypeScript Wiki")というやつが面白い
- `this`のBadPatternとかを紹介してる
- @azu: TypeScriptのWikiなのか
- @azu: [Red Flags for this](https://github.com/Microsoft/TypeScript/wiki/'this'-in-TypeScript#red-flags-for-this "Red Flags for this")は面白そう
- メソッドを変数にいれてダメになるパターン
- とにかくパターンを出す感じなのかなー
- 関数オブジェクトの章は最初に関数の宣言の仕方についても振り返りたい
- 本来は宣言とまとめていい章だけど、宣言はできるだけ先に出したかった
- なので別れちゃってるだけ
- 関数宣言の例として`this`の伏線を貼っていく感じにするのがいいのかも
- `this`から先に書いてみると何が必要かわかるかな
- とりあえず、関数オブジェクトと`this`は分けて書くイメージで書いて統合

### 結論

- 関数オブジェクトは半分`this`の章

## その他

- @azu: 結局、即時実行関数はふれてないんだよなー
- 無理にふれにくいというか
- @laco: 最近async/awaitで即時実行関数を見る
- @azu: Top-Level awaitが書けない問題かー
- 即時実行関数は完全な代替がまだあるわけじゃないんだよなー
- @laco: ユーザーランドだと殆どもう書くことはない?
- @azu: モジュールあるし、ブロックスコープあるから書くケースはかなり減った
- ファクトリも普通に実行すればいいし
- @laco: そのスコープをどうしても汚したくない時ぐらい
- 即時実行関数も非推奨の章?
- @azu: そうかも
- @kahei: 非推奨の章が膨らんでいる気が
- @azu: まだ実際に何も書いてない
- @laco: 非推奨の章は書くべきではないけど読めるべきという章
- @azu: Bad Parts?
- @laco: たしかに
- @azu: リネームしておこ
- [Bad Partsの章 · Issue #142 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/142#issuecomment-341391004 "Bad Partsの章 · Issue #142 · asciidwango/js-primer")
- @laco: エラーが終わると次にやることがないから非推奨の章をやる?
- @azu: Effective系みたいに項目ごとに全く別な事を書くような章だと思う
- そのテンプレートがあるといいのでは?
- @laco: なるほど

## 次回

- 12月7日(木)
