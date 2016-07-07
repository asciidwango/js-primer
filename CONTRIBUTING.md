## Pull Requestの送り方

文章のtypoの修正程度なら、直接GitHub上で編集してPull Requestを送ってください。

- [Editing files in your repository - User Documentation](https://help.github.com/articles/editing-files-in-your-repository/ "Editing files in your repository - User Documentation")

ローカルで編集して送りたい場合は次の手順を試してください。

1. Forkする
2. Branchを作る: `git checkout -b my-new-feature`
3. テストする: `npm test`
3. 変更をコミットする: `git commit -am 'Add some feature'`
4. Pushする: `git push origin my-new-feature`
5. Pull Requestを送る :D

## 確認方法

`npm start`を実行後、 [http://localhost:4000/](http://localhost:4000/) へアクセスすることでプレビューを見られます。

    npm run start
    # open http://localhost:4000/

また、Pull Requestを出した際にGitBook.com上でプレビュー用のビルドが公開されます。
Pull Request下部に表示されるCI Statusからそれぞれプレビュービルドひらくことができます。

![CI Status](https://cloud.githubusercontent.com/assets/19714/16651848/a221c226-4481-11e6-806f-65880da93422.png)

- [プレビュー用 #jsprimer - GitBook](https://www.gitbook.com/book/azu/js-primer/details "プレビュー用 #jsprimer - GitBook")
    - プレビュー以外には利用しないでください

## テスト

`$ npm test` を実行するとコードや文章に対するテストを実行できます。

    npm test

`$ npm run textlint` の文章表現のエラーで疑問がある場合は、とりあえずそのままPull Requestを送ってください。
IssueやPull Requestでやりとりしそのエラーを直すか無視するかを決定します。

### テストの種類

このプロジェクトでは次のようなテストが `npm test` で実行されています。
特定のSuffixを持つファイル名を対象にしているテストも存在しています。

- GitBookのビルドテスト
- [textlint](https://textlint.github.io/)による文章のLint
- [ESLint](http://eslint.org/ "ESLint")によるコードのLint
- [textlint](https://textlint.github.io/) + [ESLint](http://eslint.org/ "ESLint")によるMarkdown中のインラインコードブロックのLint
- Markdown中のインラインコードブロックへのDocTest
- [Mocha](http://mochajs.org/ "Mocha")による`*-test.js`ファイルのユニットテスト
- `*-example.js`がJavaScriptとして実行できるかのテスト
- `*-invalid.js`がJavaScriptとして実行できないかのテスト


Markdown中のインラインコードブロックとは次のような`js`言語指定がされたCodeBlockを示しています。

    ```js
    var foo = "string";
    ```

### DocTest

`*-example.js`のJavaScriptファイルとMarkdownのインラインコードブロックを対象にDocTestが実行されます。

次のように`// => 値`というコメントを書いた部分に対してDocTestが実行されます。

```js
let a = 42;
console.log(42); // => 42
```

これにより、サンプルコードのコメントに書いた評価結果と実際の出力が一致するかをテストしています。

#### サポートする形式

```
評価したい式; // => 期待する評価結果
```

or

```
console.log(評価したい式); // => 期待する評価結果
```

**関連**

- [power-assertを使ったDoctestツール power-doctestを書き直した | Web Scratch](http://efcl.info/2015/08/10/power-doctest1.0/)
- [JavaScriptでdoctestを行う power-doctest を作った | Web Scratch](http://efcl.info/2013/1201/res3494/)
- [25.2. doctest — 対話的な実行例をテストする — Python 2.7.x ドキュメント](http://docs.python.jp/2/library/doctest.html "25.2. doctest — 対話的な実行例をテストする — Python 2.7.x ドキュメント")


## ディレクトリ構造

`source` 下に章や節ごとにディレクトリを切り、
その下にコード(`src`)、テスト(`test`)、リソース(`img/`)などを配置して扱います。

```
└── source
    └── ch1
        ├── basic
        │   └── README.md
        ├── comments
        │   ├── README.md
        │   └── src
        │       └── html-like-comments-example.js
        └── hello
            ├── README.md
            ├── img
            ├── src
            │   └── hello-world.js
            └── test
                └── hello-world-test.js
```

## コミットメッセージ規約


AngularJSのGit Commit Guidelinesをベースとしています。

- [conventional-changelog-angular/convention.md](https://github.com/conventional-changelog/conventional-changelog-angular/blob/master/convention.md "conventional-changelog-angular/convention.md at master · conventional-changelog/conventional-changelog-angular")

以下のような形で

- 1行目に概要
- 2行目はから改行
- 3行目から本文

最後に関連するIssue(任意)を書きます。

```
feat(ngInclude): add template url parameter to events

The `src` (i.e. the url of the template to load) is now provided to the
`$includeContentRequested`, `$includeContentLoaded` and `$includeContentError`
events.

Closes #8453
Closes #8454
```


```
                         scope        commit title

        commit type       /                /      
                \        |                |
                 feat(ngInclude): add template url parameter to events

        body ->  The 'src` (i.e. the url of the template to load) is now provided to the
                 `$includeContentRequested`, `$includeContentLoaded` and `$includeContentError`
                 events.

 referenced  ->  Closes #8453
 issues          Closes #8454
```

`commit type` としては次のようなものがあります。

- feat
    - 新しい機能、章、節の追加など
    - 更新履歴に載るような新しいページを追加
- fix
    - 意味が変わる修正
    - 更新履歴に載るような修正
- docs
    - 基本的には使わない
    - README.mdやCONTRIBUTING.mdや本体のプロジェクト全体のドキュメントについて
- refactor
    - 意味が変わらない修正
    - 更新履歴に載らないような修正
- style
    - スペースやインデントの調整
    - Lintエラーの修正など
- perf
    - パフォーマンス改善
- test
    - テストに関して
- chore
    - その他
    - typoの修正など


`commit type`は、迷ったらとりあえず`chore`と書きます。
`scope`も省略して問題ないので以下のような形でも問題ありません。

```
chore: コミットメッセージ
```

## 書き方の色々

書き方に関するルールや表記統一について

### 「次の」 or 「上記の」 or 「下記の」

文章に対する相対的な位置の指し示す場合は、
できるかぎり「次のコード」というように事前に説明する。

読んでいる人がサンプルコードのどこに注目すればいいかが事前にわかるように書く。

-----

次のコードは xxx について説明しています。

```
code
```

----

### コードの参照方法

事前に説明した特定のコードを参照したい場合は、
サンプルコードのファイル名を参照に利用する。

```markdown
[import, example.js](src/example.js)

色々文章...

[example.js](#example.js)では、 ....

```

### ES6 or ES2015

ES2015は正式な名称ですが、ES6も一般によく使われている名称です。
どちらの表記をメインに利用するかは以下のIssueで議論した結果、ES2015という表記をメインとしています。
これから出てくる仕様はES2016、ES2017と年号形式であるためそちらに揃えていこうという形です。

- [ES2015 or ES6 どちらを使う? #22](https://github.com/asciidwango/ES6book/issues/22 "ES2015 or ES6 どちらを使う? #22")
