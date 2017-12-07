# 2016-10-28 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

@ 会議室

## 進捗

- @laco: [Node.jsのCLIアプリ](https://github.com/asciidwango/js-primer/issues/7 "Node.jsのCLIアプリ · Issue #7 · asciidwango/js-primer")を書き始めた
- @azu: 進捗微妙

## Node.js

- @laco: Node.jsのCLIではNode.jsを入れる必要がある
- バージョン指定はどうする?
- @azu: LTSでよさそう
- 今だと Node.js v6 がでたのでこれ
    - [Node v6.9.0 (LTS) | Node.js](https://nodejs.org/en/blog/release/v6.9.0/)
    - [Node.js v6 Transitions to LTS](https://hackernoon.com/node-js-v6-transitions-to-lts-be7f18c17159)
- @azu: インストール方法については書く?
- 確実なインストール方法は一つは書いておかないとそこでつまづく人がいるのでケアしたい。
- 公式のインストーラー、nvm、node-brew...
- 公式のインストーラーが無難そう
- @kahei: 英語だと読めないという問い合わせが来ることがある
- @laco:[Node.js](https://nodejs.org/ja/ "Node.js")
- LTS or 7.0 どっちとなりそう
- @azu: LTSで
- LTSは2018年春までアクティブなのでよさそう
- Window, Mac, Linuxの[バイナリがある](https://nodejs.org/ja/download/)
- 逆に `apt-get` とかで入れると古いので、その辺気をつけるようなことが書いてあると良さそう
- @laco: インストールして `node --version` で確認させる

## npmとパッケージ

- @azu: npmを使うので色々触れる必要がありそう
- @laco: Node.jsに同梱されているのでインストール方法はいらない
- @azu: Node.jsの本ではないので深くは触れすぎない
- `npm install` と `package.json` というファイルについては必要
- `package.json` も深いので最低限
- `dependencies`と`devDependencies`
- 後、TODOアプリも見据えて `npm run-script` についても欲しい
- @laco: [Node.jsのCLIアプリ](https://github.com/asciidwango/js-primer/issues/7 "Node.jsのCLIアプリ · Issue #7 · asciidwango/js-primer")でMochaでのテストを書くつもり
- Mochaを実行する `npm test` と `npm run-script`について
- @azu: 公開するときの必要なモジュールは deps で、開発用のモジュールは devDepsという話
- MochaはdevDepsなのでちょうど良さそう
- Node.jsと他の言語圏で異なるポイントとしては、Node.jsだとデフォルトがローカルインストールであるとか
- Rubyのgemはいきなりグローバル
- Node.jsはローカルに入れていくのが中心
- グローバルに入れると問題が多いし、`require()`でグローバルのものって今読めったけ?
- @laco: 分からない
- @azu: 昔は読めた気がするけど、今は駄目な気がする(要調査)
- `require("module-name")` のパス解決についても触れておいたほうがいいかもしれない
- NODE_PATHの解決とかNode.js周りの特徴的な部分かもしれない
- `index.js` はどうする? これはNode.jsの世界だけのルールではあるので微妙な所
- なぜ `./foo` が `foo/index.js` として扱われるのかわからないかも
- @laco: HTMLの`index.html`と同じルールを踏襲したのでは
- @azu: なるほど
- ES modulesでは `index.js` や そもそも拡張子を省略できるというルールは明記されてないのでやっぱりNode.jsとしての話になる
- `index.js`については無理に出す必要はないかな(Node.jsの本ではないので)
- 欄が余ったら触れるぐらいな感じで
- どちらかというと一般的なディレクトリ構造については触れたほうが良さそう

```
✈ tree
project
├── README.md
├── package.json
├── bin/
├── lib/
├── src/ (これはAltJSとかES6の変換元ソース)
└── test/
```

- 上記のようなプロジェクト構造については触れておきたい
- 他の言語から来た人は一般解がわからないため単純に参考になる
- @laco: `lib`と`src`の使い分け?
- @azu: 基本的に実行できるものが libでsrcは変換元ソースという使いわけになってると思う
- @laco: [Node.jsのCLIアプリ](https://github.com/asciidwango/js-primer/issues/7 "Node.jsのCLIアプリ · Issue #7 · asciidwango/js-primer")だと`bin`、`lib`、`test`を使う
- @azu: TODOだと`src`が出てくるかもぐらい

-----

- @laco: Node.jsの正式名称?
- https://twitter.com/yosuke_furukawa/status/791983870413459456

-----


## 配列

- @azu: ためしにブログで記事を書いてみた
- [JavaScriptの配列のパターン | Web Scratch](http://efcl.info/2016/10/11/array-patterns/ "JavaScriptの配列のパターン | Web Scratch")
- StringとArrayは似ている部分が多い
- けどプリミティブとオブジェクトという異なる部分もある
- 似たような流れで説明して、後半はそれぞれの特徴というような章同士で対比できるような構造にしたい
- [String · Issue #121 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/121#issuecomment-251721984 "String · Issue #121 · asciidwango/js-primer")
- Arrayはブラウザもまだフルサポートじゃなかったりする
- `Array#values` などがない
- [Array.prototype.values() が一部の古いアプリに影響しています (取り消し) | Firefox サイト互換性情報](https://www.fxsitecompat.com/ja/docs/2016/array-prototype-values-breaks-some-legacy-apps/)
- [615873 - Exposing Array.prototype.values breaks Microsoft Dynamics CRM Lookup - chromium - Monorail](https://bugs.chromium.org/p/chromium/issues/detail?id=615873)
- @laco: [Array.prototype.values()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/values "Array.prototype.values()")はiterableを返すんだ
- @azu: Arrayは色々でかい
- [Map/Set #148](https://github.com/asciidwango/js-primer/issues/148 "Map/Set #148")とは区別できるというか、使い道が異なる点は意識したい
- @laco: Arrayで `[][0]; // undefined`なのはJavaScript特有の現象?
- 他の言語だと`IndexOutOfBoundsException` 的な例外になる。
- 存在しないindexにもアクセスできるのが他の言語から来ると引っかかるかも
- この辺は注意して扱った方がよさそう
- 長さが足りなかったときの対応方法が他の言語と異なりそう
- JavaScriptはアクセスしてから検証してる、他の言語はそれできない
- @azu: [JavaScriptの配列のパターン | Web Scratch](http://efcl.info/2016/10/11/array-patterns/ "JavaScriptの配列のパターン | Web Scratch")でもその話書いてた
- `hasOwnProperty`とかじゃにと区別できなくて難しい
- @laco: `Document#querySelectorAll` がブラウザによってIterableじゃない話はいる?
- @azu: それ自体はいらない気がするけど、Array-likeという話は必要そう
- `new Array()` もArray-likeみたいなものと言えそう
- 配列も単なる `length` だけを持ったオブジェクトと言えそう
- 疎の配列をちゃんと扱える `Array.from` というものがあるという話に繋げる感じ?

---

## 文字列

- @azu: 文字列の話悩ましい
- 文字列と文字コードの話。どこまでやるの…
- JavaScriptには Char型自体はないので少しは…
- `String#charAt` はある…
- JavaScriptでは文字列と正規表現が密接な関係
- @laco: 引数に正規表現を受け取れるStringメソッドが多い
- @azu: 文字列では正規表現についても一緒に触れる必要があるのかもしれない
- [正規表現 #21](https://github.com/asciidwango/js-primer/issues/21 "正規表現 #21")
- @kahei: 正規表現のしっかりした解説あると良いですが...
- @azu: 最近のECMAScriptは正規表現に手を入れようとしてる
- named captureとか - https://twitter.com/littledan/status/780653795546062848
- @azu: 文字列、JavaScriptは内部表現がUTF-16ということについては触れる
- 普通に日本語書けますよということ
- Twitterが全盛期なら文字の数え方の話があったかも
- `length` で返す文字列の長さは何?という話
- 深くやりすぎると正確に書くのも難しいのでほどほどを心がけたい

----

## 章、セクションの使い分け

- [表記統一: 章/節/セクション #128](https://github.com/asciidwango/js-primer/issues/128 "表記統一: 章/節/セクション #128")
- @azu: 章/節/セクションの使い分けどうすれば?
- @kahei: 大きく「基本文法」と「ユースケース」で**第一部**、**第二部**として分ける
- 基本文法の「JavaScriptとは」「コメント」「変数と宣言」それぞれが章
- 章以下の `##` とかがセクション
- @azu: なるほど
- Markdownだとセクション単位までフルのは難しいので
- 章のはじめに「この章では〜について解説します」みたいな自己参照の方法が知りたかった
- 章を使う方向で
- ユースケースは「Todoアプリ」「CLIアプリ」などが章、それ以下がセクションという建付け

---

次回: 

次のミーティング: 11月30日(水曜日)
