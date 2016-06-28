# [WIP] JavaScriptの入門書 [![Build Status](https://travis-ci.org/asciidwango/js-primer.svg?branch=master)](https://travis-ci.org/asciidwango/js-primer)

この書籍はES2015以降をベースとしたJavaScript入門書となる予定です。

プログラミングをやったことがあるが、今のJavaScriptがよくわからないという人が、
今のJavaScriptアプリケーションを読み書きできるようになるもの。

ハッシュタグは [#jsprimer](https://twitter.com/intent/tweet?hashtags=jsprimer) です

## :warning: Status :warning:

この書籍は開発中の内容となっています。

どのような構成になるか興味がある人は次のIssueを見てみると良いです。

- [[meta] 全体的な設計/ユースケース一覧 #6](https://github.com/asciidwango/js-primer/issues/6 "[meta] 全体的な設計/ユースケース一覧 #6")

どのような経緯で動いているかはミーティングノートを参照してください。

- [Meeting Notes](https://github.com/asciidwango/js-primer/tree/master/meetings "Meeting Notes")

リポジトリの更新を追いたい方はリポジトリをWatchしてください。

[![Watch button](./source/landing/img/repo-actions-watch.png)](https://github.com/asciidwango/js-primer/watchers)

また、下記フォームからメールアドレスを登録しておくと更新情報を受け取れます。

- [更新通知を受け取るメールアドレスを登録するフォーム](http://eepurl.com/b674IX)

## Installation

    npm install

Node.js 6.0.0以上が必要です。

## Usage

**Build**

GitBookのbuildをします
    
    npm run build
    
**Watch**

GitBookのbuildかつWatchをします。
プレビューをする場合は、ローカルサーバが立つので http://localhost:4000/ へアクセス。

    npm run watch
    # http://localhost:4000/ へアクセス

**Test**

- GitBookのビルドテスト
- [textlint](http://textlint.github.io/ "textlint")による文章のLint
- [ESLint](http://eslint.org/ "ESLint")によるコードのLint
- [ESLint](http://eslint.org/ "ESLint")によるMarkdown中のインラインコードのLint
- [Mocha](http://mochajs.org/ "Mocha")による`-test.js`ファイルのテスト実行

は以下のコマンドで行えます。

    npm test

## Contributing

詳しくは [CONTRIBUTING.md](./CONTRIBUTING.md) を見てください。

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

No define