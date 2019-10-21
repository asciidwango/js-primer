# JavaScript Primer [![Build Status](https://travis-ci.org/asciidwango/js-primer.svg?branch=master)](https://travis-ci.org/asciidwango/js-primer)

この書籍はES2015以降をベースとしたJavaScriptの入門書です。

プログラミングをやったことがあるが、今のJavaScriptがよくわからないという人が、
今のJavaScriptアプリケーションを読み書きできるようになる目的の書籍です。

次のURLから閲覧できます。

- ウェブ版: <https://jsprimer.net/>

Twitterのハッシュタグは [#jsprimer](https://twitter.com/intent/tweet?hashtags=jsprimer) です。

## :warning: Status :warning:

この書籍は開発中の内容となっています。

どのような経緯で動いているかはミーティングノートを参照してください。

- [Meeting Notes](https://github.com/asciidwango/js-primer/tree/master/meetings "Meeting Notes")

リポジトリの更新を追いたい方はリポジトリをWatchしてください。

[![Watch button](./source/landing/img/repo-actions-watch.png)](https://github.com/asciidwango/js-primer/watchers)

また、下記フォームからメールアドレスを登録しておくと更新情報を受け取れます。

- [更新通知を受け取るメールアドレスを登録するフォーム](http://eepurl.com/b674IX)

## Installation

    npm install

Node.js 12.13.0以上が必要です。
`npx`コマンドが利用できることを確認してください。

## Usage

**Build**

GitBookのbuildをします

    npm run build

**Watch**

GitBookのbuildかつWatchをします。
プレビューをする場合は、ローカルサーバーを利用してください。

次のコマンドを実行後、[http://localhost:4000/](http://localhost:4000/)へアクセスすることでプレビューを見られます。

    npm run start
    # open http://localhost:4000/


## Test

このプロジェクトでは文章やコードに対してテストを実行しています。
文章中のインラインコードのテスト、特定のファイル名にもとづくテスト、コメントを使ったDocTestなどが含まれます。

以下のコマンドを実行すると全てのテストが実行されます。

    npm i -d && npm test


詳しくは [CONTRIBUTING.md](./CONTRIBUTING.md) を見てください。

## Contributing

小さなtypoでもIssueやPull Requestを歓迎しています。

コントリビュートの方法や確認方法については[CONTRIBUTING.md](./CONTRIBUTING.md)を参照してください。
また[文章の間違いに気づいたら](https://jsprimer.net/intro/feedback/)も参照してください。

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

Copyright (c) 2016-present jsprimer project

- ソースコード: MITライセンス
- 文章: [CC BY-NC 4.0](http://creativecommons.org/licenses/by-nc/4.0/)

## Project Member

jsprimerプロジェクトは次のメンバーで構成されています。

- azu([@azu](https://github.com/azu))
- Suguru Inatomi([@lacolaco](https://github.com/lacolaco))
