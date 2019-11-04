# 2016-09-09 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@vvakame](https://github.com/vvakame)
- [@lacolaco](https://github.com/lacolaco)

@ 会議室

## アジェンダ

- [2016-09-09 Meeting アジェンダ · Issue #139 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/139 "2016-09-09 Meeting アジェンダ · Issue #139 · asciidwango/js-primer")

## [クラスメソッド/インスタンスメソッドの表記 · Issue #110 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/110 "クラスメソッド/インスタンスメソッドの表記 · Issue #110 · asciidwango/js-primer")

## 基本文法: プチユースケースの扱い/書く場所

### 関数/メソッドの表現には カッコ なしで書く方向

- ◯ `fn`関数
- ✗ `fn()`
- @laco: `()` ありだと音声読み上げしにくそう 
- @laco: `fn()` と書いてたらLintで落とす事ができる?
- @azu: 一番最初の関す呼び出しの例以外はいけるかも?

> Array#forEachメソッド または コンテキスト的に理解できるならforEachメソッド

- 最初は `Array#forEach` その後は `forEach`メソッドでいい
- @azu: クラス・メソッド vs. 静的(static)メソッド
- @vvakame: 仕様だとどうなってる?
- @azu: ただのメソッド
- static method()と書けるので静的メソッドで良さそう
- ◯ 静的メソッド

## [プチユースケースの扱い/書く場所](https://github.com/asciidwango/js-primer/issues/139#issuecomment-245564487 "プチユースケースの扱い/書く場所")

- @azu: 書いていて基本文法だと例題を無理に出して解説できないケースが出てきそう
- コラムのような本文とは別で解説したいけど、課題が中心な話になる気がするのでコラムとはまた違った性質がある気がしている。
- セクション末尾の練習問題なようだけど、なぜそういう書き方をするのかというプチユースケースにもとづく話なのでもう少し具体的な解説が付くイメージ
- https://github.com/asciidwango/js-primer/issues/17#issuecomment-244540827
- [condition: switch文の例を追加する · Issue #135 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/135 "condition: switch文の例を追加する · Issue #135 · asciidwango/js-primer")
- 少し応用的なものなので、本文に入れた時に、その本文と混じってしまって、今後の拡張性が悪い気がしている。
- こういうプチユースケースはどう扱うのがよさそうか?
- @laco: 基本的にユースケースで消化できるものはユースケースに任せる
- @kahei: 必要ならセクション末尾に書いていく?
- @vvakame: 本文と切り離すなら後からいい例がでてきたら追加する感じでいいのでは?

具体的なプチユースケース

- switch-caseの処理
- 自由な文字列から数字だけを抜き出す処理の例 

### 結論

- 必要ならセクション末にプチユースケースを書く
- 後からいい例がでてきたら追加する

## [ajax: UserIDに相対パスが入れられる · Issue #130](https://github.com/asciidwango/js-primer/issues/130#issuecomment-245885297 "ajax: UserIDに相対パスが入れられる · Issue #130 · asciidwango/js-primer")

- @azu: XHRするパスをいじれる問題
- 「IDは英数字です」と書いて説明なく文字列を弾けばよい?
- @laco: 話が脱線しそうなのが不安

### 結論

- @laco 書いてみて脱線しないかを確認する

## [js-primer](https://github.com/js-primer "js-primer")

- @azu: [js-primer](https://github.com/js-primer "js-primer")というorganizationを作ってみた
- サンプルとかのサイトとか何かリポジトリにおきにくいものを入れておくのに使えば良さそう

## 目的

- @azu: 前段の話として
- [前回のミーティング](https://github.com/asciidwango/js-primer/tree/master/meetings/2016-07-29#%E4%BD%BF%E3%82%8F%E3%81%AA%E3%81%8F%E3%81%A6%E3%81%84%E3%81%84%E3%82%A4%E3%83%87%E3%82%A3%E3%82%AA%E3%83%A0%E6%96%87%E6%B3%95)で目的とかについて再定義した
- [Lean Canvas](https://github.com/js-primer/lean#high-level-concept)を書いてみて、「ES2015+ Good Parts」というキャッチフレーズは分かりやすいのではと思った
   - 現実的にはEffective JavaScriptに寄っている感じ
- [『JavaScript: The Good Parts』で紹介されている標準メソッドまとめ - Qiita](http://qiita.com/kenju/items/9b289567bbc359abe54f "『JavaScript: The Good Parts』で紹介されている標準メソッドまとめ - Qiita")という記事を見ていて未だにGood Partsを見ていく人もいるのが気になった
- また書いていて本文中にすべてのBad Parts(使うべきではないもの)を書くのは無理だと思った

> JavaScriptには明らかに誤用するものや悪いものというのが存在するので、
> Bad Partsはどこかでしれたほうがいいと思った。

- また前回[既に使わなくていいイディオム/文法 · Issue #108 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/108 "既に使わなくていいイディオム/文法 · Issue #108 · asciidwango/js-primer")というIssueを作った
- なので、Bad Partsをまとめたセクションが存在してもいいのではと思った

ここまでが前置き

- @laco, @kahei: あったほうがよさそう
- @azu: 範囲が広すぎたり、意見が混ざるとメンテナンスが大変そうという懸念がある
- @azu: [Annex B](http://www.ecma-international.org/ecma-262/7.0/#sec-additional-built-in-properties)のような明らかに非推奨なやつらを中心にしたほうがよさそう
- @laco: 「非推奨の章」
- @laco: ESLintの紹介ってする?
- @azu: [ESLintで学ぶプラクティス](https://github.com/asciidwango/js-primer/issues/102#issuecomment-236162759 "ESLintで学ぶプラクティス") でコラム案にしてる
- @laco: ESLint + 非推奨機能紹介 = :green_heart:

### 結論

- ESLint(Lintツール)と非推奨のものについてのセクションを考える


## [Meta(基本文法): ロードマップ · Issue #137](https://github.com/asciidwango/js-primer/issues/137 "Meta(基本文法): ロードマップ · Issue #137 · asciidwango/js-primer")

- @azu: 基本文法の基本はできてきた
- 後半はオブジェクトや関数などが出てくるのでどう書くかを整理したい
- [Meta(基本文法): ロードマップ · Issue #137 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/137 "Meta(基本文法): ロードマップ · Issue #137 · asciidwango/js-primer")
- `Number`、`Array`、`String` は各ひつようがありそうなビルトインオブジェクト
- `Boolean` は型変換以外ないのでいらない

**Object**

- `Object`がどうしようか迷っている
- `Object`はUtilてきなのとdefinePropertyなどのメタ要素が混ざっている
- Learning JavaScriptではdefinePropertyをProxyなどのメタとしてまとめていた
- @laco: オブジェクトを分けるのは賛成
- @laco: `Object.assign` はNode.jsのCLIユースケースでコマンドライン引数とデフォルトオプションのマージで使う
- アプリケーション用途寄りの話を基本文法側で述べておかないといけない 

**関数**

- @azu: 関数についてはおおまかな流れは決まった感じになりそう
- @azu: classはどうするか? JavaScriptのクラスは中途半端
- あんまり OOP 話できない気がする
- 今のところのイメージは状態を持った関数であるという説明
- @vvakame: クラスのインスタンスメソッドを書き換えできるよとかの話をすれば?
- @azu: 書き換える? 最適化がぶっ壊れる気が
- JavaScriptのMockはメソッドの実装をすり替えることで行っているとか?
- そういうダイナミックさがJavaScriptの特性であるという話に繋げる?
- @azu: ダイナミックで思い出した。polyfillについてはどうしよう
- polyfillはJavaScript独自に発展してるような文化な気がする
- @laco: feature detectionについてはどこかで欲しい気がする
- コラム?
- => [欄外/コラム · Issue #102 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/102#issuecomment-236432834 "欄外/コラム · Issue #102 · asciidwango/js-primer")

**Testing**

- @azu: 個人的にはテストについて欲しい
- けど基本ライブラリを使うので基本文法に入れにくい
- @laco: ユースケース側で頑張るしかない
- Node.jsのユースケースではテストについて書く
- @azu: Todoはどうだろ? ブラウザのテストは厳しい
- Nodeで実行できるテストとして触れる感じ?
- @laco: Todoはツールを使ったりとかモジュール分割とかする感じ?
- @azu: YES
- 現実に近いもの?
- @azu: [Elixir本](https://github.com/asciidwango/js-primer/issues/139#issuecomment-245567177 "Elixir本")を見ていて、現実に近いプロジェクト構成があると読む人(特にJavaScript初心者)はうれしいのでは?
- @laco: JavaScriptに標準ないし察してというしか
- @azu: ですよね
- Nodeとブラウザでそもそもディレクトリとか異なるだろうし

**throw**

- @laco: throwはどこに?
- @azu: Errorとtry-catchのあたり
- @laco: throwとErrorオブジェクトはセット

**非同期**

- @azu: 何か想像ではasyncという括りを作ってる

```
- Async
    - callback
    - Event
    - Promise
    - Generator
```

- @laco: Promiseは一つのセクションにあげていいのでは
- @laco: callback?
- @azu: コールバックは関数の宣言でも既に説明してた
- @laco: Asyncというくくりはいらなさそう
- @azu: Eventはユースケースで使う

```
- Promise
- Generator
```

- @azu: Generatorどうしよう?
- Generator自体はいらないけど、iterableはspread operatorやfor ofで必要
- @laco: Generator…
- 現実にまだ使わない
- @azu: 使ってるのはkoaとredux-sagaの人ぐらいしかしらない
- @laco: ライブラリ作者側の機能
- @azu: Async/Awaitが来たら解説が必要そう
- それまではGeneratorはいらない?
- Generatorは複雑
- @laco: どの言語でもyieldは複雑
- @azu: Generatorを省くと、yield, function *を無くすことができる
- なくしていく方向で
- @azu: iterableの概念的な説明は既にしてるのでそれぐらい

**modules**

- @azu: modulesが全然決まらない問題があるので、どうしようかな? 
- @vvakame, @laco: モジュール…
- @azu: ブラウザとかNode.jsで未だに動かすのが大変そう
- @vvakame: ES modules weeklyが欲しい
- @vvakame: Node.jsの方が先に入る?
- @azu: ブラウザはモジュールの後方互換性はないけど、NodeはあるからNodeの方が大変そう
- ES6といったらmoduleという部分はありそうなので省きにくい
- TODOのサンプルでも使う予定(ツールで変換)
- @vvakame: 「変換しないとうごきません」というような注記をつけて書くしかないのでは
- オンライン版は書き換えればいいけど、書籍版はそうしないと
- @kahei: 注記付きでかく方向で
- modules 現段階では、まだツールがないと動かないというような注意書きと共に基本文法を紹介する
- @azu: Babel, TypeScript, SystemJSとかでローダー部分の解釈が違う
- t_wadaさんが苦しんでた
- [Cannot load module by SystemJS: Expected object · Issue #67 · power-assert-js/power-assert](https://github.com/power-assert-js/power-assert/issues/67 "Cannot load module by SystemJS: Expected object · Issue #67 · power-assert-js/power-assert")
- @laco: SystemJSは生まれるのが早すぎたんだ
- Angular 2もwebpackの方向

## 次回

10月28日(金)

