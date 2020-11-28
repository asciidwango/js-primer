# Contribution Guide

この書籍へのコントリビュート方法についてガイドです。

## HonKit

この書籍は[HonKit](https://honkit.netlify.app/)で作成されています。
また、文章はMarkdownで書かれています。Markdownの記法についてはHonKitのヘルプを参照してください。

- [Markdown · HonKit Toolchain Documentation](https://honkit.netlify.app/syntax/markdown.html)

一部、`{{book.console}}`やHTMLコメントを使った仕組みも含まれているため、詳しくはこのガイドで紹介します。

## Issues

次のIssueを受け付けています。

- 書籍や内容に対する質問 => [こちらから質問できます](https://github.com/asciidwango/js-primer/issues/new?template=question.md)
- 内容のエラーや問題の報告 => [こちらからバグ報告できます](https://github.com/asciidwango/js-primer/issues/new?template=bug_report.md)
- 解説の改善を提案 => [こちらから提案できます](https://github.com/asciidwango/js-primer/issues/new?template=feature_request.md)
- 新しいトピックなどの提案 => [こちらから提案できます](https://github.com/asciidwango/js-primer/issues/new?template=feature_request.md)

[その他のIssue](https://github.com/asciidwango/js-primer/issues/new?template=other.md)も歓迎しています。

## Pull Request

Pull Requestはいつでも歓迎しています。

**受け入れるPull Request**

次の種類のPull Requestを受け付けています。
基本的なPull Request（特に細かいもの）は、Issueを立てずにPull Requestを送ってもらって問題ありません。

「このような修正/改善はどうでしょう？」という疑問がある場合は、Issueを立てて相談してください。

- 誤字の修正
- サンプルコードやスペルの修正
- 別の説明方法の提案や修正
- 文章をわかりやすくするように改善
- ウェブサイトの改善
- テストの改善

:memo: **Note:** Pull Requestを受け入れるとあなたの貢献が[Contributorsリスト](https://github.com/asciidwango/js-primer/graphs/contributors)に追加されます。
また、Pull Requestを送った内容はこの書籍の[ライセンス](./LICENSE)（MIT and CC BY-NC）が適応されます。
これは、あなたの貢献がこの書籍への努力的な寄付となることを意味しています。

**受け入れていないPull Request**

- [CODE OF CONDUCT](./.github/CODE_OF_CONDUCT.md)に反する内容を含むもの

## 修正の送り方

文章の誤字の修正程度なら、直接GitHub上で編集してPull Requestを送ってください。

- [Editing files in your repository - User Documentation](https://help.github.com/articles/editing-files-in-your-repository/ "Editing files in your repository - User Documentation")

ローカルで編集して送りたい場合は次の手順を試してください。

1. Forkする
2. Branchを作る: `git checkout -b my-new-feature`
3. テストする: `npm install && npm test`
3. 変更をコミットする: `git commit -am 'Add some feature'`
4. Pushする: `git push origin my-new-feature`
5. Pull Requestを送る :D

## 修正の確認方法

この書籍は[HonKit](https://honkit.netlify.app/)で作成されています。
`npm start`を実行後、[http://localhost:4000/](http://localhost:4000/)へアクセスすることで、HonKitのプレビュー表示ができます。

    npm run start
    # open http://localhost:4000/

また、Pull Requestを出した際に[Netlify](https://www.netlify.com/)上へプレビュー用のサイトが公開されます。
Pull Request下部に表示されるCI Statusからプレビュー用のサイトを見られるため、HonKit上での表示を確認できます。

![CI Status](https://user-images.githubusercontent.com/19714/41819398-ac93bcf6-77fa-11e8-9f06-173613d940e8.png)

## テスト

`$ npm test` を実行するとコードや文章に対するテストを実行できます。

    npm test

`$ npm run textlint` の文章表現のエラーで疑問がある場合は、とりあえずそのままPull Requestを送ってください。
IssueやPull Requestでやりとりしそのエラーを直すか無視するかを決定します。

### テストの種類

このプロジェクトでは次のようなテストが `npm test` で実行されています。
特定のSuffixを持つファイル名を対象にしているテストも存在しています。

- HonKitのビルドテスト
- [textlint](https://textlint.github.io/)による文章のLint
- [ESLint](http://eslint.org/ "ESLint")によるコードのLint
- [textlint](https://textlint.github.io/) + [ESLint](http://eslint.org/ "ESLint")によるMarkdown中のインラインコードブロックのLint
- Markdown中のインラインコードブロックへのDoctest
- [Mocha](http://mochajs.org/ "Mocha")による`*-test.js`ファイルのユニットテスト
- `*-example.js`がJavaScriptとして実行できるかのテスト
- `*-invalid.js`がJavaScriptとして実行できないかのテスト


Markdown中のインラインコードブロックとは次のような`js`言語指定がされたCodeBlockを示しています。

    ```js
    var foo = "string";
    ```

### textlint

CIではMarkdownの文章に対して[textlint](https://textlint.github.io/)を使ったLintが実行されます。

textlintだけのテストをしたい場合は、次のコマンドを実行してください。

    npm run textlint

#### prhでの用語統一

[prh.yml](./prh.yml)に用語統一用の辞書が定義されています。

この辞書を使ってtextlintで用語の統一しています
辞書がおかしい場合(誤検知している場合)は、[prh.yml](./prh.yml)を修正してください。

prh.ymlの書き方については次のページを参照してください。

- [prh/prh: proofreading helper](https://github.com/prh/prh)

#### textlintのエラーの無視方法

次のようにHTMLコメントで、特定の範囲のtextlintエラーを無視できます。

```
<!-- textlint-disable -->

すべてのtextlintエラーを無視する

<!-- textlint-enable -->
```

できるだけ、特定のルールのエラーを無視するようにコメントを指定してください。
`textlint-disable ルール名` で特定のルールのエラーだけを無視できます。

```
<!-- textlint-disable preset-ja-technical-writing/no-doubled-conjunction -->

二重助詞のルールのエラーだけを無視する

<!-- textlint-enable preset-ja-technical-writing/no-doubled-conjunction -->
```

コメントの詳細は次のページを参照してください。

- [textlint-filter-rule-comments](https://github.com/textlint/textlint-filter-rule-comments)

### Doctest

`*-example.js`のJavaScriptファイルとMarkdownのインラインコードブロックを対象にDoctestが実行されます。
次のように`// => 値`というコメントを書いた部分が、`assert`関数に変換されテストされます。

```js
const a = 42;
console.log(a); // => 42
```

このコードは、は次のようなテストコードに変換されます。

```js
const assert = requite("assert");
const a = 42;
assert.strictEqual(a, 42); // => 42
```

これにより、サンプルコードのコメントに書いた評価結果と実際の出力が一致するかをテストしています。

詳しい実装は次のドキュメントを参照してください。

- [@power-doctest/markdown](https://github.com/azu/power-doctest/tree/master/packages/%40power-doctest/markdown)

#### サポートする書式

```
評価したい式; // => 期待する評価結果
```

or

```
console.log(評価したい式); // => 期待する評価結果
```

基本的には、`console.log(式); // => 期待する評価結果`を利用します。
`console.log`が冗長な場合は `式; // => 期待する評価結果`と書いても良いことにしています。

#### Doctestエラーのテスト

Doctestの正常系は実行結果と期待結果が一致することです。
一方、そのコードの実行結果がエラーになることを期待する場合もあります。
エラーを期待する場合は、`doctest: 期待するエラー名`をHTMLコメントに書きます。

例) 実行結果が`ReferenceError`となることを期待するテスト

`条件式`という変数が定義されていないためエラーとなる。

    <!-- doctest: ReferenceError -->
    ```js
    if (条件式)
        実行する文;
    ```
    
個別の行がエラーとなることを期待する場合は、正常系のDoctestでも書けるためそちらを推奨します。

    ```js
    NO_DEFINE++; // => ReferenceError
    ```


#### 複数のDoctestを扱うケースケース

デフォルトでは、コード上の全てのDoctestが実行されまで結果を待ちます。
次のコードでは、3つのassertが実行されるまでテストコードの終了を待ちます。

    ```js
    1; // => 1
    2; // => 2
    3; // => 3
    ```
    
次のように条件分岐で片方のassertのみが実行されることを期待する場合は、`doctest:options:{ "runMode": "any" }`を指定してください。
一つでもassertが実行された時点でテストを終了します。

     <!-- doctest:options:{ "runMode": "any" } -->
    ```js
    if (Math.random() < 0.5 ) {
        console.log(true); // => true
    } else {
        console.log(false); // => false
    }
    ```

#### Doctest非同期のテスト

DoctestでPromiseやAsync Functionを使った非同期のテストも書けます。

非同期処理のタイムアウトを明示的に指定したい場合は`doctest:options:{ "timeout": 1000 }` をHTMLコメントに書きます。

例) 実行結果が`1000`ミリ秒以内に完了する非同期処理をテストする

    <!-- doctest:options:{ "timeout": 1000 } -->
    ```js
    function wait(ms){
        return new Promise((resolve) => {
            setTimeout(() => resolve(ms), ms)
        })
    }
    wait(1000).then(() => {
        console.log(value); // => 1000 
    });
    ```

Note: `vm`モジュールの制約からタイムアウト指定の時間が正しく指定させていることが前提となっています。
    

#### DoctestのECMAScriptバージョン

DoctestはNode.jsで実行されます。
実行するNode.jsがECMAScriptの最新のバージョンをサポートしていない場合があります。
そのため、コードのECMAScriptバージョンを指定することで、そのDoctestをスキップできます。

例) DoctestがECMAScript 2019であることを表記する

    <!-- doctest:meta:{ "ECMAScript": "2019" } -->
    ```js
    [1,[2], [3]].flat();
    ```

DoctestでサポートしてないECMAScriptバージョンのテストは実行されません。

#### Doctestの無視

CodeBlockの手前に`<!-- doctest:disable -->`というHTMLコメントがある場合はDoctestをしません。
Node.jsで実行できないビルドインオブジェクトを使うパターンや例外的なケースに利用できます。

例) 無視するケース

次の例はAPIの説明のための擬似コードであるため無視しています。

    <!-- doctest:disable -->
    ```js
    array.map(コールバック関数);
    ```


**別の手法**:

ファイル名が`*-invalid.js`のコードは実行できないことを検証できます。(エラーになるとテストが通る)
これを`[include]`することでより正確に表現できます。

- `*-invalid.js`がJavaScriptとして実行できないかのテスト

**関連**

- [console.logと// => の使い分け · Issue #195 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/195 "console.logと// =&gt; の使い分け · Issue #195 · asciidwango/js-primer")
- [power-assertを使ったDoctestツール power-doctestを書き直した | Web Scratch](http://efcl.info/2015/08/10/power-doctest1.0/)
- [JavaScriptでdoctestを行う power-doctest を作った | Web Scratch](http://efcl.info/2013/1201/res3494/)
- [25.2. doctest — 対話的な実行例をテストする — Python 2.7.x ドキュメント](http://docs.python.jp/2/library/doctest.html "25.2. doctest — 対話的な実行例をテストする — Python 2.7.x ドキュメント")

## ディレクトリ構造

`source` 下に章や節ごとにディレクトリを切り、
その下にコード(`src/`)、テスト(`test/`)、リソース(`img/`)などを配置して扱います。

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
- 2行目は空行
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

### コードのコンソールモード

次の変数をコードブロックの前に書くことで、コードがインタラクティブに実行できるコンソールモードとして表示されます。
（ウェブのみ)

    {{book.console}}
    ```js
    var interactive = "code";
    ```

importしたコードにも対応しています。

    {{book.console}}
    [import, example.js](src/example.js)


### ES6 or ES2015

ES2015は正式な名称ですが、ES6も一般によく使われている名称です。
どちらの表記をメインに利用するかは以下のIssueで議論した結果、ES2015という表記をメインとしています。
これから出てくる仕様はES2016、ES2017と年号形式であるためそちらに揃えていこうという形です。

- [ES2015 or ES6 どちらを使う? #22](https://github.com/asciidwango/ES6book/issues/22 "ES2015 or ES6 どちらを使う? #22")

### 現在のECMAScriptバージョンを参照するとき

この書籍では"最新版のECMAScript"という定義は変更される場合があります。
2017年においてはECMAScript 2017ですが、2018年では異なります。

そのため、現在のECMAScriptバージョンを扱うときは`{{book.esversion}}`という変数を利用します。

```markdown
現在のECMAScriptの最新版はECMAScript {{book.esversion}}です。
```

この変数は[`book.json`](./book.json)に定義されています。

### var vs. let/const

基本的にコードでは`let`または`const`を利用します。
`var`の機能を説明する場合においては`var`を利用します。

- [サンプルコードを `var` から `const` に置き換える · Issue #264 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/264 "サンプルコードを `var` から `const` に置き換える · Issue #264 · asciidwango/js-primer")


### 章へのリンク

別の章へのリンクを書くときは`「[章のタイトル][]」の章`という形でリンクする。
章の途中の場合は`「[章のタイトル][]」の[#付きのリンク][]`という形にする。

```
真偽値へ変換した結果が`true`となる値の種類は多いため、逆に変換した結果が`false`となる値を覚えるのが簡単です。JavaScriptでは次の値は`false`に変換され、これらの値は**falsy** と呼ばれます。（「[暗黙的な型変換][]」の章を参照）
```

- [別の章へのリンクの仕方を統一 · Issue #173 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/173)
