# gitbook-starter-kit

[GitBook](https://www.gitbook.com/)のスターターキット。

以下のスライドでこの構成がどのように使われているかを解説しています。

- [Markdownで書く電子書籍開発環境](http://azu.github.io/slide/niku_sushi/ebook_development.html "Markdownで書く電子書籍開発環境")

実際にこの構成を利用しているプロジェクトとして以下のものがあります。

- [azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture "azu/JavaScript-Plugin-Architecture")

## インストール

GitBookを使った書籍を以下のようにするだけで書き始めることができます。

```
git clone https://github.com/azu/gitbook-starter-kit.git your-book-name
cd your-book-name
npm install
```

## 使い方

    npm start
    
GitBookのローカルサーバが立ち上がり、 http://localhost:4000/ にアクセスすることでプレビューできます。

    npm run build

単純にビルドだけをしたい場合は、`npm run build`で行うことができます。
(`_book/`にHTMLファイルが生成されます。)

### 文章を追加する

gitbook-starter-kitでは以下のようなディレクトリ構造になっています。

```
.
├── README.md
├── SUMMARY.md <= 目次
├── ja/ <= .mdの文章を追加する
├── prh.yml
├── src/ <= サンプルコード
└── test/ <= サンプルコードのテスト
```

文章を追加する`ja/`というディレクトリ名には独別な意味はないため好きな名前に変更して問題ありません。

文章を追加する場合は以下の手順で行うことができます。

1. `ja/` 以下にMarkdownファイルで文章を追加する
2. `SUMMARY.md` に追加したMarkdownファイルへのリンクを書く

追加した後は`npm start`などでGitBookでプレビューすれば表示を確認することができます。
(デフォルトで自動的にリロードされるようになっています。)


## テスト


    npm test


npm testで以下のテストが実行されます。

- [ESLint](http://eslint.org/ "ESLint")でのコードチェック
- [textlint](https://github.com/azu/textlint "textlint")での文章チェック
- [Mocha](http://mochajs.org/ "Mocha")でのサンプルコードのテスト

並列でテストを実行できるように[npm-run-all](https://github.com/mysticatea/npm-run-all "npm-run-all")を利用しています。
テスト結果の表示が混ざるのが気になる場合は、`--parallel`オプションを外してみてください。

## 表記揺れ

[prh.yml](./prh.yml)に辞書を追加することで表記揺れをチェックすることができます。
詳しい設定方法については以下を参照して下さい。

- [textlint + prhで表記ゆれを検出する | Web Scratch](http://efcl.info/2015/09/14/textlint-rule-prh/ "textlint + prhで表記ゆれを検出する | Web Scratch")
- [textlintで日本語の文章をチェックする | Web Scratch](http://efcl.info/2015/09/10/introduce-textlint/ "textlintで日本語の文章をチェックする | Web Scratch")

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
