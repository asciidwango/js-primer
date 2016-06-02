## テスト

`$ npm test` を実行するとコードや文章に対するテストを実行できます。

    npm test

`$ npm run textlint` の文章表現のエラーで疑問がある場合は、
IssueやPull Requestでやりとりしそのエラーを直すか無視するかを決定します。

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