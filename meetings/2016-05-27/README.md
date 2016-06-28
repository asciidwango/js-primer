# 2016-05-27 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@laco0416](https://github.com/laco0416)

@ 株式会社ドワンゴ会議室

## アジェンダ

- [2016年5月27日MTG アジェンダ #30](https://github.com/asciidwango/ES6book/issues/30 "2016年5月27日MTG アジェンダ #30")

## [CIを回す #11](https://github.com/asciidwango/ES6book/issues/11 "CIを回す #11")

- リポジトリがprivateだと使える無料サービスが限られる
    - publicに変更
- リポジトリのOwner権限がないと連携の設定ができない
    - @azu へ権限の付与
    
### 結論

- Travis CIでテストが回るようになった

## [敬体(ですます調)と常体(である調) #19](https://github.com/asciidwango/ES6book/issues/19 "敬体(ですます調)と常体(である調) #19")

- 本文の文体は敬体と常体どっちがメインとなる?
- @kahei
    - 本文: 敬体(ですます調)
    - 箇条書き: 常体(である調)
    - というのは一般にあるケース

### 結論

- 本文: 敬体(ですます調)
- 箇条書き: 常体(である調)
    
## [ES2015 or ES6 どちらを使う? #22](https://github.com/asciidwango/ES6book/issues/22 "ES2015 or ES6 どちらを使う? #22")

- ECMAScriptの歴史的なものは基本文法の前?で増える
- ES6はECMAScript 2015のエイリアスであるという話はする
- ES2015をメインとしたほうがES2016...以降の違和感がない
- 最初は違和感があるがそのうち慣れるでしょう

### 結論

ES2015をメインにする


## ES2016以降を含めるかどうか? 

- @azu: ES2016は`Array#includes`と`**`だけなので含めて違和感ない
    - 逆に含めないと違和感がある
- ES2017以降はどうする?
    - 現時点で含めるのはちょっと微妙
    - どこで策定されているかというコラム的な扱いになるかも
    
### 結論

- ES2015, 2016を含める
- ES2017は本文としては含めない

## 基本文法に細かいユースケースが必要そう

- @azu: 基本文法を書いているがダラダラ書くと面白みが欠けてしまう
    - 基本文法にも頻出パターンのような小さなユースケースを紹介した方がいいかも?
- 後半のアプリを作るユースケースと被ってしまう懸念
    - 重要なものは何度出てきてもおかしくはない
    - パターンに近いもの
    - パターンそのものは見てもよくわからないので、実際のアプリケーションでそれを知ってもらう流れが理想
    
    
### 結論

特に無し

## リンクを貼る基準

- @azu: この書籍で全てを満たすことはできないので、続きはコチラ的なURLの使い方をするべきかどうか?
- @kahei, @laco: 引用した時に引用元は入れる
    - 追加資料としての参考サイトはどれぐらい使うかどうか?
- 本文にURLは混ぜないで、脚注に収める形にする
- リンクを前提とした文章を書かない ぐらいを基準とするぐらいがちょうどいいのでは

### 結論

- リンクを前提とした文章を書かないぐらいを基準にする


## 図は何で描くのか?

- 図はどのように扱うか?
- 著者が好きに描くパターン、イラストレーターさんに依頼しテイストを合わせるパターン
- @kahei: [Graphviz](http://www.graphviz.org/ "Graphviz")を使ってるところもある
- @laco: [mermaid](https://knsv.github.io/mermaid/#mermaid "mermaid")とかどう?
- @azu: テキストから図を作るやつは融通がきかないことがある
- 好きなソフトウェアを使ってもいい
    - https://www.draw.io/
    - Omnigraffle
    - yEd
- あんまり図自体は多くならないはず
- @azu: クロージャーとかスコープみたいな話は箱の図を書くかも
- @laco: スクリーンショットが多いかも。管理が大変そう
    - 自動化したい
    - ブラウザサイズを決めたい
- @kahei: サイズはスクリーンショットによるので難しい

### 結論

- 図が出てきてから考えよう


## Ajaxユースケース
https://github.com/laco0416/plain-ajax

関連: [Ajaxで何か #9](https://github.com/asciidwango/ES6book/issues/9 "Ajaxで何か #9")

- XHR
- Promise
- addEventListener
- trim
- Template Strings
- XHR => innerHTML
    - 現在はエスケープされてない
    - セキュリティと絡めてもいいかも
- @azu: 今のReactとかAngularとか大体のやつは自動エスケープがデフォルト
- Template StringでHTMLを作るのはよくあるパターン
    - https://www.npmjs.com/package/yo-yo
- モジュールが実際にHTMLで動かないので、モジュールをどうするかという話?
   - 読者の宿題ですと丸投げするか?
   - HTMLとJavaScript一枚で収めたい(ビルドツールを使いたくない)
   - @laco: モジュール分けはnode.jsのユースケース側にまかせて、Ajaxの方はindex.js1枚で済ませる方が妥当っぽい
- リファクタリング例としてモジュール分割を見せるのはありなのかも

### 結論

- モジュールはその他のユースケースにまかせる

## Node.js CLI ユースケース
https://github.com/laco0416/plain-node-cli

関連: [Node.jsのCLIアプリ #7](https://github.com/asciidwango/ES6book/issues/7 "Node.jsのCLIアプリ #7")

- Markdownを読み込んでファイルを読みこんでHTMLを吐き出す
- commander
- Markdown to HTML
- コマンドライン引数
- オプション
- コマンダー
- 外部ライブラリの使い方
    - CommonJS
- 最終的にサンプルのコードはこのリポジトリに含める
    - Git subtreeやsub moduleで単独のリポジトリとしても使えると良い   
- Nodeの説明は少し手厚くになるかも
    - インストールらしいインストールはNode.jsだけなので
- @laco: Streamは触れるべき?
- @azu: いらないと思う。変なAPIだったり、ブラウザとまた違うものだし
- `process` とかNode.jsでの実行環境の話もユースケースの前あたりで触れる必要がある
    - @azu: ブラウザに`window`があるように実行環境で違うという話がいる
- @laco: semverについては触れるべきか
    - @azu: 欲しいけど難しそう
- package.jsonの中身はこうなってるっていうのはコラムでやるとか
- @laco: テストは?
    - @azu: テストあるといいかも
    - `assert`や`mocha`を使ってのテストの書き方とかあると良さそう
    - @azu: モジュールとして分かれてるのでテストの話はしやすそう

### 結論

- Node.jsらしい話

## Todoアプリ

関連: [TODOアプリ · Issue #4 · asciidwango/ES6book](https://github.com/asciidwango/ES6book/issues/4 "TODOアプリ · Issue #4 · asciidwango/ES6book")

- @laco: あれは完成形?
- @azu: 最近いじってない
- 結構でかい
    - ビルドしてる、モジュール多い
- この書籍の集成体的なものになってるのでは?
- @laco: Nodeとか他のユースケースとの順番はどう?
    - @azu: NodeはTodoより前にあってもいい気がする
    - ツールの使い方とかもはいるので
- Todoは最後にしてツールを使っての開発 = 実際に近いかたちにする?
    - 今のブラウザなら `import/export`以外は動く
    - bundle toolだけを専用のものを用意して使う?
    - `es6book-bundle` とか専用の名前のツール
    
### 結論

- ツールを前提としたような現実に則したようなユースケースを想定する

## その他

- @laco: ユースケースの説明の仕方
    1. 最初にソースコードを張って => 説明
    2. 徐々に組み立てて説明
    - どっち?
- ユースケースの章は、読み進めていくと出来上がるような説明の仕方をする
- 最初に作るものの要件みたいなのをまとめて、それを実現するためのパーツを少しずつ作って組み立てていく。
- @azu: Promise本では断片的に作っていくコードもテストできるようにしていた
    - https://github.com/azu/promises-book/tree/master/Appendix-Note
    - 断片に見えるのは表示用のコンパイル済みソースコードを作って出していた
    - サンプルコード自体は断片としてモジュールとなっていてテスト可能にしている
    
## 次回

2016年6月28日 @ ドワンゴ会議室