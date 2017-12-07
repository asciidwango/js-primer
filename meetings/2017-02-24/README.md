# 2017-02-24 Meeting Notes
             
- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)
             
## アジェンダ

- [2017-02-24 ミーティングアジェンダ · Issue #191 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/191 "2017-02-24 ミーティングアジェンダ · Issue #191 · asciidwango/js-primer")

## String

- @azu: [String #121](https://github.com/asciidwango/js-primer/issues/121 "String #121")の難所は書けた
    - [feat(string): 文字列の長さ by azu · Pull Request #190 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/190)
    - [feat(string): 文字列と文字とCode PointとCode Unitについて by azu · Pull Request #188 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/188)
- 後は書いていくだけ

## ファイルI/O周りの用語 読み書きとI/Oの使い分け

- @azu: 読み書きの方が具体的でわかりやすそう
- @laco: I/Oとかの表記とか色々考えるところがある
- @kahei: 読み書きでいいなら読み書きの方が良さそう

### 結論

- 読み書き

## Buffer

> Bufferどこまで説明するか : Bufferインスタンスはファイルの中身をバイト列として保持していて、そのままconsole.log関数に渡しても人間が読める文字列にはなりません。 としか書いてない

- @azu: 文字コード指定すればBuffer自体を扱うことって少なくない?
- @laco: たしかに

## `console.error`

- @laco: console.error使っていいものかどうか?
- そもそも仕様ってある?
- @azu: [Console Standard](https://console.spec.whatwg.org/ "Console Standard") WHATWGになってた
- でもどう出すかは決まってなさそう
- あくまで `info`とか`error`は`Logger(logLevel, args)` ログレベルと考える人と
- エラーオブジェクトは`error`で出すと考える人がいそう
- @azu: Node.jsだと`console.error`って`stderr`に出力するんだっけ?
- @laco: そうっぽい
- [Console | Node.js v6.10.0 Documentation](https://nodejs.org/dist/latest-v6.x/docs/api/console.html#console_console_error_data_args "Console | Node.js v6.10.0 Documentation")
- @azu: なるほど。
- ならエラーは`stderr`にだすという意味で`console.error`使うのありそう
- Console APIについては最初に解説入れるつもり
- Console APIには `console.log`、`console.error`などのメソッドがあり、基本的には`log`を使う〜〜的な話

### 結論

- `console.error`使う

## falsyを使う?

```
`err`オブジェクトが`null`または`undefined`ではないことだけをチェックする
or 
`err`オブジェクトがfalsyでないことだけをチェックする
```

- @laco: 表現に迷ってる
- @azu: falsy自体の説明はしてある
- そもそも否定の否定は文章として読みにくい気がする。
- 値があるかどうかをチェックするとか?
- あと、厳密にはfalsyではないのでfalsyって言わなくていい気がする。
- `0`とかはこない
- @laco: `undefined` または `null` が来るらしい
- [File System | Node.js v7.6.0 Documentation](https://nodejs.org/api/fs.html "File System | Node.js v7.6.0 Documentation")
- @azu: 2つのパターンがあるだけなら、そのまま2つのパターンを並べて説明すればいいのでは?
- `!v` の動作については説明してあるので、コード的には `if(!error) { }` とかで十分そう

### 結論

- 説明としてはそのまま`undefined` または `null`ではないことを〜的に書いてしまう

## Node.js 非同期APIをPromiseでラップ

- @laco: fsの非同期APIをPromiseにラップする必要性(XHRのときはやったけど、fsの場合はどうしようか) 
- @azu: どちらでもよさそう
- Node.jsのコアは相変わらずコールバック
- 自分はPromiseでラップする派ではある
- コードスペース的にコールバックの方が短いならそれはそれで良さそう。なれるという意味合いでも
- でも最近Node.jsなライブラリではPromiseが多い気がする
- @laco: コアでPromiseつかってるものってありましたっけ?
- @azu: ないはず。
- 過去にコアをPromiseにするPRがでてたはず
- [Adding Core support for Promises by chrisdickinson · Pull Request #5020 · nodejs/node](https://github.com/nodejs/node/pull/5020 "Adding Core support for Promises by chrisdickinson · Pull Request #5020 · nodejs/node")
- 止まってるらしい

### 結論

- とりあえずコールバックのまま書く

## testing framework何にする問題

- @laco: testing framework何にするか?
- mocha + assert?
- @azu: assertだけのスタイル?
- mochaそんな難しくもないしmochaでもよさそう
- [JavaScript Promiseの本](http://azu.github.io/promises-book/#chapter3-promise-testing "JavaScript Promiseの本")でもサラッと使った
- よくあるBDDフレームワークですみたいな
- @laco: `describe`とか`it`の説明どうするか
- @azu: さらっと流す感じでいいじゃないかなー
- `describe`にはテスト対象の名前を書きますとか
- @laco: devDepsの話も必要そう

### 結論

- Mocha使う方向で Promise本を参考にさくっと説明する
- devDepsの説明をする

## Node.jsの動かないサンプル

- @laco: Node.jsのfsのサンプル 実際にファイルがないと動かない.
- https://github.com/asciidwango/js-primer/blob/master/test/markdown-doc-test.js のテストが落ちる
- @azu: globでファイル指定してるから除外をしてしまうとか?
- コードブロックを `node` にするとか回避方法がありそう
- @laco: `node`はGitBookだと効かないっぽい

### 結論

- 辛かったら除外する
- もしくはファイルとして分ける

## 次回

2017-3-24
