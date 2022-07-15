# 2022-07-14 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

----

## ミーティングアジェンダ

[2022-07-14のミーティングアジェンダ · Discussion #1449 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/discussions/1449)

----

## スケジュール

- kahei: 原稿のfixは前回言ってたように10月末が目処で
- azu: 10月25日にNode.js 18のLTSが開始される
  - [Releases | Node.js](https://nodejs.org/en/about/releases/)
- azu: なので10月ギリギリ
- azu: まあ、事前に用意しておいてマージすれば問題なさそう

----

## [非同期の章の改善案を募集 #1444](https://github.com/asciidwango/js-primer/discussions/1444)

- azu: フィードバック募集して非同期まわりの話
- azu: 並列と並行の話は、"非同期"というと他の言語だとプロセス的に分かれてるのを想像してしまう人がいるので、それを回避するために入れてた
- azu: ここはもうちょっとシンプルにしたい。後ろのセクションには影響ないはず
- laco: PromiseとAsyncを知りたいという需要とか考えるとコールバック周りの話が多い
  - 具体的には次のあたり
  - 非同期処理と例外処理
  - エラーファーストコールバック
- laco: エラーファーストコールバックは今は別にそこまでは必須じゃないので
- laco: Promiseは新しいものではなくなったので、最初にある方がいい
- azu: fs/promisesとか
- azu: Nodeのfsだとどっち優先だろ?
- https://nodejs.org/api/fs.html
- laco: 一応Promise方が先に出てる
- laco: callbackの方がパフォーマンスメリットがあるという話はある
- https://nodejs.org/api/fs.html#performance-considerations
- azu: まあコールバックがなくなることはない気がする
- azu: `.promise`と`*/promises`はどっちだろ?
- laco: promiseは`fs/promises`の方がexampleになってる
- azu: エラーファーストコールバックが本文にあるのは、CLIのユースケースのためなので
- azu: ユースケースのCLIをPromiseにできれば、非同期のエラーファーストコールバックも本文から外してコラムにできるかも
- azu: ただ、エラーファーストコールバックは必ず遭遇するので、コラムなのかは迷う
- laco: express触った瞬間出てくる
- azu: 整理すると次のようなイメージ
  - 非同期の章
    - Promise
    - [コラム] エラーファーストコールバック
    - Async
  - ユースケース CLI
    - fs/promisesを基本にして
        - `*/promises`
    - コラムでエラーファーストコールバック
- azu: これで一回やってみるとどれぐらい綺麗になるかな
- laco: あとタイトルからコールバックを外すと
- azu: "非同期処理: Promise/Async Function"になる

### 結論

- 非同期の章とCLIを書き直してみる
- 非同期の章 @azu
  - Promise
  - [コラム] エラーファーストコールバック
  - Async
- ユースケース CLI @laco
  - fs/promisesを基本にして
      - `*/promises`
  - コラムでエラーファーストコールバックへfs.readとコラムへのリンク


----

## node:* prefixのモジュール名を使うようにしたい

- azu: Node 18のLTSは10月25日に
- azu: Node 16から `node:assert` とか使えるので、こっちに切り替えたり。
- azu: おそらくデファクトになるはず
- azu: `node:test` も使う?
- laco: mochaを置き換える?
  - [ユニットテストを記述する · JavaScript Primer #jsprimer](https://jsprimer.net/use-case/nodecli/refactor-and-unittest/#create-env)
- azu: あー、devDependenciesの例がなくなるのか
- laco: `node:test`はまだexperimental
- azu: 置き換えるほどでもないか。
- azu: Mochaのアップデートとかするぐらい

### 結論

- `node:assert`などに置き換える
  - https://github.com/asciidwango/js-primer/issues/1451
- Mochaはそのまま、アップデートする

----

## function キーワードと関数式

- function キーワードと関数式のうち推奨はどっち?
- https://github.com/asciidwango/js-primer/discussions/1449#discussioncomment-3145099
- azu: 実用は `const` だけど、表記は `function` の方がわかりやすい
- laco: `const fn = () => {}`は記号が多くなってちょっと読みにくい
- laco: 今のところどっちに統一されてるんだっけ?
- azu: TODOだとclassなのでほとんどないかも
- laco: ajaxはfunction、mathもfunctionっぽい
- azu: 今はfunctionに統一されてるのか
- laco: 書籍としては統一されていればいいかな。

### 結論

- functionに統一する?

----

## ajaxのevent listener

- azu: constとfunctionの話、ajaxはfunctionを使ってる
- azu: これってconstだとglobalに出ないからだっけ?
- azu: いっそajaxをESMにするとかありそう?
- azu: いやESMかどうかはあんまり関係ないか。
- azu: まあ次回でいいや

## 次回

- 8月18日(木) 19:00
