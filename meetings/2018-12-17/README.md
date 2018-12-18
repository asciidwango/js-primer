# 2018-12-17 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

----

## ミーティングアジェンダ

- [2018-12-17 ミーティングアジェンダ · Issue #592 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/592)

----

## Destructuring - azu


- azu: Destructuringについてを紹介する方法について
- azu: Destructuringの説明があまりないので説明をちょこちょこいれて、これがDestructuringということを理解できるようにしたい。
- Destructuringという名前を知らないと、構文を見て検索できないため
- azu: 方法としては
    - 1. Destructuringの章を作る
    - 2. それぞれの項目でちょこちょこDestructuringについて紹介する(配列、オブジェクト、関数)
    - 現在は2の方をやっている
    - <https://github.com/asciidwango/js-primer/pull/593>
- azu: Destructuringは深掘りするとaliasとかネストとかrest parameterとか色々出てくる
- azu: 正直、Destructuringがないと実現できない機能はないと思っている
- laco: aliasが必要となった時点で少し変な構造となっていることが多い
- azu: なので深掘りする必要はあまりないと思っている
- azu: 短く掛けるようになるがそれぐらいの説明で止めようと思っている

### 結論

- azu: <https://github.com/asciidwango/js-primer/pull/593> をマージする

----

## 非推奨の章 - azu

- azu: 非推奨を削除する方針について
- [\[meta\] 関数と宣言/非推奨の章: リファクタリング · Issue #590 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/590) にまとめた
    - argumentsの記述を[関数と宣言](https://jsprimer.net/basic/function-declaration/)へ移動する
    - いくつかIssueで出た内容を反映するために、関数と宣言をリファクタリングする
- azu: Blockerになるほどの問題ではないが、Array-likeの記述が配列に書かれている
    - arguments = Array-Likeなので前後してる
    - [\[コラム\] Array-likeオブジェクト ](https://jsprimer.net/basic/array/#array-like)
- azu: ただし、[関数と宣言](https://jsprimer.net/basic/function-declaration/)ではargumentsを使うのはやめようという話でArray-Likeの説明の話じゃないのでそこまで問題ないと思ってる

### 結論

- azu: [\[meta\] 関数と宣言/非推奨の章: リファクタリング · Issue #590 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/590)を書く

----

## `npm install --global`について

- laco: `npm install --global`について
- laco: そもそもグローバルって何か?
- azu: まず`npm i -g`を書く方法としては２つある
    - npxとの対比
    - ローカルインストールとの対比
- azu: `npm i`はローカルインストールがデフォルトだからその対比として`npm i -g`について話す
- azu: (`npm i -h`を打ちながら) `npm i -g` って` npm install` の globalオプションではないのか
- laco: `npm uninstall -g`とかもあるので、`npm` に対する globalオプション
- azu: そういう意味だとローカル、グローバルの対比はなんか微妙なのかも
    - この書籍だとローカルに対してのグローバルという必然性があんまりない(デフォルトがローカル、プロジェクトでグローバルを使うことがない)
- azu: ローカルの説明は逆にわかりやすい気がする。
- カレントディレクトリ以下にインストールといった感じ。
- laco: 逆にグローバルとローカルの使い分けがある言語ってなんだろ?
- azu: gem ? bundleか
- laco: goはグローバルか
- kahei: pythonはpip、だけどローカルはpipの機能じゃなくて
- azu: 初心者はあんまりローカルとグローバルの区別がついていない気がする
    - textlintの利用者とか見てると結構そういう傾向があった
    - 初心者はグローバルにインストールを選ぶ印象がある。設定が一箇所で済むし、何回もインストールしなくて済むから
    - だけど、いつかはハマるので、そういう経験者は最初から ＊envとかバージョン管理を選ぶ傾向があるのだと思う
- azu: コマンドのRAEDMEとか見るとたいてい `npm i -g` と `npx` の対比になっている気がする
- azu: そういう意味(コマンドをインストール、実行というコンテキスト)だと、`npm i -g`は`npx`との対比としては見る気がする
- azu: npxがはいったのは... ([Previous Releases | Node.js](https://nodejs.org/en/download/releases/)みながら) Node 8 LTSからnpxが入ってる
- laco: この書籍ではLTS前提なのでnpx前提でOK
- azu: 世間で見るREADMEを見て、結局は`npm i -g`は見ることになるから、コラム的に知っておけばいいという立ち位置になるのでは
- azu: この書籍では`npm i -g` は結局使わないので
- azu: なので`npx`をコマンドの実行方法として捉えて、その後にコラム的に`npm i -g`でのコマンドの実行方法について書くとか
- azu: 結局"グローバル"については説明がいるけど、コラムなのでってやるとだいぶ柔らかくなる?
- laco: グローバルインストールとは?

>  nodeコマンドと同じように、任意の場所から実行できるようにインストールされます

- azu: グローバルインストールとは?

>    Nodeコマンドやnpmコマンドと同じように絶対パスの指定をしないで、コマンドを実行できるようにすること

### 結論

- `npm i -g`はコマンド実行のコラム的な位置へ
- グローバルにインストールして実行するという説明はする
- <https://github.com/asciidwango/js-primer/pull/591

----

## 章の再構成

- azu: <https://github.com/asciidwango/js-primer/issues/592#issuecomment-447727204>
- azu: このviewerってとこで現在の状態を見られる
- <https://textstat-viewer.netlify.com/?gist=d9cd929e87cbd7b3e015eee22b864d48>
- azu: 演算子は多い
- kahei: 演算子が多くなるのはしょうがない気も
- azu: もう少し整理して削れそう
- azu: 必要になったら見てねというポジションなので、そのままで

## 章の再構成: オブジェクト

- azu: オブジェクトが少し長い
- azu: [Objectはすべての元](https://jsprimer.net/basic/object/#object-is-origin)というところが少しむずかしい感じ
- laco: 難易度が急に上がっている感じ
- azu: ここは`Object#toString`がなぜ配列とかから使えるのって原理を話したいのが目的
- laco: `Object.create(null)`が
- azu: Mapのところで話してなかった
- laco: Mapでできるからそっちに投げられていた
- azu: このプロトタイプの話がとにかく難しいし、ここで読むのを辞める気がする
- laco: プロトタイプでまとめるとか
- azu: [クラス](https://jsprimer.net/basic/class/)でしているけど、なんかObjectのプロトタイプの話とクラスの継承の話って違う感じがするんだよな
- azu: ネイティブと自分で継承をするオブジェクトを作る話かという視点の違い
- azu: class構文的な継承の観点になってるかな
- azu: プロトタイプは知らなくても書けるけど、原理を知るという意味合いが強かも
- azu: [ラッパーオブジェクト ](https://jsprimer.net/basic/wrapper-object/)と似てる?
- laco: (ラッパーオブジェクトをみながら...)切り出してみる?
- azu: わるくはないかも
- azu: Objectのプロトタイプを切り出して章にしてみる
- azu: 最悪飛ばしても良くなる
- laco: 今はObjectの中に混ざっているので異物感
- azu: タイトルはなんだろ?
- azu: プロトタイプオブジェクト?
- kahei: "プロトタイプ"とか
- azu: オブジェクトとの関係をにおわせたいので、プロトタイプオブジェクトかな
- laco: 場所はクラスの前?
- azu: オブジェクトの後

### 結論

- [オブジェクト: プロトタイプを切り出してみる · Issue #597 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/597)

----

## 章の再構成: 配列

- azu: [配列](https://jsprimer.net/basic/array/)もちょっと長い
- azu: けど必要なものばかりだから長いのはしょーがないかな
- azu: [破壊的なメソッドと非破壊的なメソッド ](https://jsprimer.net/basic/array/#mutable-immutable)はちょっといれたくて入れたのであれだけど…
- azu: 最悪、消せば終わるので大丈夫そう
- azu: 反復系もループの話と被っているけど
- kahei: でもそれはよく使うという話なので、重要なので2度という
- azu: なのでいいかな

### 結論

- アトでみて冗長だったら削る

----

## 章の再構成: 文字列

- azu: 文字列はなんか全体的にだるい。長い。
- azu: 複雑、この章の難易度が難しい
- laco: Code PointとString APIの話が混ざっているからかも
- azu: Code Pointが必要なのは、長さと比較ぐらいかな
- laco: 混ざっているから難易度が急激に変わっている
- laco: セクション1つが長い。なんどもスクロールが必要になる
- azu: APIとUnicode/文字コード的な話を分ける
- laco: 前半はAPI、後半はコラム的にUnicode....
- azu: 文字列
    - 簡単なAPI
      - String系
    - 難しい文字コードの話
      - Code Point, Unicode
- azu: あと[タグ付きテンプレート関数](https://jsprimer.net/basic/string/#tagged-template-function) ちょっとストーリーが長くて、削りたい
- laco: これはユースケースでやってることと被っている?
- azu: ([HTML文字列をエスケープする ](https://jsprimer.net/use-case/ajaxapp/display/#escape-html)をみながら)あんまり説明はしてなかった
- azu: もっと簡単な話にしたい
- laco: `String.raw`を作るまでにするとか
- azu: それでもよさそう。そうしたら半分ぐらいになりそう
- laco: あとはrawの代わりになにかを出すぐらい
- azu: rawの代わりに○で伏せ字にするとか

### 結論

- azu: [文字列: 章の再構成 · Issue #598 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/598)

----


## 章の再構成: Math

- azu: Mathはこの位置?
- azu: 依存ないのでどこでも大丈夫そう
- laco: 前回もっと後ろにとかいう話を
- azu: Dateとかその辺にという話をしてた
- laco: Map/Setはもっと前にしてもいいのでは
- azu: でもリテラルじゃないのでファーストクラスな感じではない気がする
- laco: こういう感じでいいのでは

```
    - [JavaScriptとは](./basic/introduction/README.md)
    - [コメント](./basic/comments/README.md)
    - [変数と宣言](./basic/variables/README.md)
    - [値の評価と表示](./basic/read-eval-print/README.md)
    - [データ型とリテラル](./basic/data-type/README.md)
    - [関数と宣言](./basic/function-declaration/README.md)
    - [文と式](./basic/statement-expression/README.md)
    - [条件分岐](./basic/condition/README.md)
    - [ループと反復処理](./basic/loop/README.md)
    - [演算子](./basic/operator/README.md)
    - [暗黙的な型変換](./basic/implicit-coercion/README.md)
    - [オブジェクト](./basic/object/README.md)
    - プロトタイプの話
    - [配列](./basic/array/README.md)
    - [文字列](./basic/string/README.md)
    - [ラッパーオブジェクト](./basic/wrapper-object/README.md)
    - [関数とスコープ](./basic/function-scope/README.md)
    - [関数とthis](./basic/function-this/README.md)
    - [クラス](./basic/class/README.md)
    - [例外処理](./basic/error-try-catch/README.md)
    - [非同期処理](./basic/async/README.md)
    - [Map/Set](./basic/map-and-set/README.md)
    - [JSON](./basic/json/README.md)
    - [Date](./basic/date/README.md)
    - [Math](./basic/math/README.md)
    - [ECMAScript](./basic/ecmascript/README.md)
    - [第1部: おわりに](./basic/other-parts/README.md)
```

- laco: あとMathが短すぎるので round/ceil/floorの説明を追加するほうがいいのでは
- azu: Number/Mathなんだけど、Numberはどこかいったので…

## 結論

- laco: [Math: round/ceil/floorの説明を追加する · Issue #599 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/599)
- azu: [章構成の入れ替え · Issue #600 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/600)

----

## 次回

2019年1月24日(木)
