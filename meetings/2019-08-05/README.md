# 2019-08-05 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

----

## ミーティングアジェンダ

- [2019-08-05のミーティングアジェンダ · Issue #924 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/924)

---

## 進捗確認

- azu: 先頭からリファクタリングしてNode CLIまでPR出した
- azu: まとめとかの追加とか、エラー文の合わせとか
- azu: Todoはあんまり直すところがないので一通りという感じ
- azu: ユースケース読んでいてDiffと理解のための説明のためのコードの区別がつかないという問題がみえたきた
    - https://github.com/asciidwango/js-primer/pull/919
- azu: 説明のためのコードなのか、アプリケーションのためのコードなのか
- azu: この辺を区別するいい感じの方法が欲しい
- laco: `title:`記法って最初からありましたっけ?
- azu: 途中からだと思う
- laco: なるほど。
- laco: Nodeはタイトルを`main.js`のまますすめるのが良い気がします。
- azu: Ajaxの方はどうだっけ?
- azu: Ajaxの方は基本indexだけか
- azu: 一部抜粋的な部分があるけど、それの区別があんまりついてない
- azu: titleでつけてやるのが良い?
- azu: Todoは"〜のサンプルコード"みたいなタイトルを付けている
- laco: Angularだと`index.html (excerpt) ` みたいなタイトルがついてた
- azu: 他の方法だとDiffっぽく表示したり、Diffをハイライトしたり
- kahei: 抜粋とタイトルを付ける感じがよさそうですかね
- azu: まとめると
    - title: で"index.jsの抜粋"とつける
    - Node CLIのmain.jsのコードはずっとtitle: main.js みたいな感じにする
    - ただのサンプル(関係無いコード)はなにもタイトルを付けない or サンプルコードみたいな感じにする

### 結論

- ユースケースのソースコードのタイトル記法を統一する
- 断片には"〜の抜粋"とつける
- サンプルコードにはサンプルとわかるタイトル or なにもつけない
- https://github.com/asciidwango/js-primer/issues/927

----

## Node CLI

- azu: Node CLIのリファクタリングしてて、サンプルコードとメインコードが混ざってた
- azu: 整理したい
    - jsprimer.net/use-case/nodecli/argument-parse
    - jsprimer.net/use-case/nodecli/read-file
    - ここまでは、サンプルっぽい
    - jsprimer.net/use-case/nodecli/md-to-html からmainっぽい
- laco: read-fileのところはゴールがぶれている
- laco: argument-parseはcommanderの説明をすごいしてる。commanderの説明する本ではない
- laco: argument-parseからoptsの説明を排除し、md-to-htmlで初めて説明するのもあり?
- laco: その場合はargument-parseでcommander使う利点ってなんだろ?
- azu: argsが使えるので `args[0]` できるとか
- azu: そのままだとslice(2)になるので
- azu: `--bar <text>` の例がなくなるな
- azu: sanitizeが廃止になるなら別のオプションを入れるとか?
    - https://github.com/asciidwango/js-primer/issues/918
- azu: https://marked.js.org/#/USING_ADVANCED.md#options 別のだと〜
- azu: headingIdsPrefixとか?
- laco: 真偽値もありかな
- azu: 真偽値2つだとなんかな。
- azu: 選択肢としてはgfmのみにする、何か別のオプションをつけるがある
- laco: markdedを固定もある
- azu: けど将来のmarkedで動かなくなる。また0.6だとsecurity alertがでるのが辛い。アップデートすると動かなくなる可能性がある
- azu: マージが1つになって寂しいけど
- azu: ファイルパスを `--input`にして受け取る とかもある
- laco: オプション名をそのまま使えなくなる。markedじゃないものが混ざる
- laco: 後markedのoptionマージも止めたいな
- azu: 今そのままオプションにわたしてるんだっけ ?
- laco: yes
- laco :こんな感じに書き直せそう

    helloworld: nodeコマンドでmain.jsを実行、ログ表示
    argument-parse: commanderをインストールしてファイルパス受け取り、ログ表示
    read-file: fsモジュールを使ってファイルパスからファイルを読み込み、ログ表示
    md-to-html: markedをインストールしてmarkdownをhtmlに変換、ログ表示
    refactor-and-unittest: リファクタリングとユニットテスト

- laco: この流れならずっとmain.js使えそう
- azu: オプションは結局どうするか
- azu: sanitizeは削除しちゃうのが楽かなー
- laco: 削除で

### 結論

- Node CLIの流れを書き直す
- @laco https://github.com/asciidwango/js-primer/issues/928

----

## bundler

- azu: moduleは後bundlerとまとめ?
- https://github.com/asciidwango/js-primer/issues/644
- azu: bundlerってどんなんだっけ?
- azu: 参考リンク集にtranspilerはないんだ
- laco: transpiler, compiler?
- azu: まあどっちでも
- laco: まとめは…
- azu: うーん、これまとめ書くことなさそう
- laco : なしでよさそう
- azu: 参考リンク集にtranspilerとbundler足せば終わりか

### 結論

- 参考リンク集にtranspilerとbundler足す
- https://github.com/asciidwango/js-primer/issues/644

---

## サブタイトル

- azu: あとはサブタイトル?
- https://github.com/asciidwango/js-primer/issues/865
- kahei: 次回で大体直す所はなくなる感じですかね?
- kahei: サブタイトルはなしでも
- azu: サブタイトルはどっちでもよくて、帯?あたりに書いてアレばいいかな
- azu: 今のウェブのサブタイトルは "ECMAScript 2019時代のJavaScript入門書" か
- kahei: 年がついてるのは書籍として辛い
- azu: この辺はどういう感じにするかかな
- kahei: 次回に決めましょうか
- kahei: 色々考えてきます

----

## 次回

2019年9月9日（月）
