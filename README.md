# JavaScript Primer [![Actions Status](https://github.com/asciidwango/js-primer/workflows/test/badge.svg)](https://github.com/asciidwango/js-primer/actions?query=workflow%3A"test")

この書籍はECMAScript 2015以降をベースとしたJavaScriptの入門書です。

プログラミングをやったことがあるが、今のJavaScriptがよくわからないという人が、
今のJavaScriptアプリケーションを読み書きできるようになる目的の書籍です。

ウェブ版は次のURLから閲覧できます。

- ウェブ版: <https://jsprimer.net/>

書籍版は次のページから購入できます。

- 物理書籍とKindle: [JavaScript Primer 迷わないための入門書 | azu, Suguru Inatomi |本 | 通販 | Amazon](https://www.amazon.co.jp/dp/4048930737/)
- PDFとepub: [JavaScript Primer 迷わないための入門書【委託】 - 達人出版会](https://tatsu-zine.com/books/javascript-primer)

ウェブ版と書籍版の内容は基本的には同じです。
詳細は[ウェブ版と書籍版の違い](https://jsprimer.net/intro/#diff-with-print-version)を参照してください。

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

Node.js 14.15.0以上が必要です。
`npx`コマンドが利用できることを確認してください。

## Usage

**Build**

HonKitのbuildをします。

    npm run build

**Watch**

HonKitのbuildかつWatchをします。
プレビューをする場合は、ローカルサーバーを利用してください。

次のコマンドを実行後、[http://localhost:4000/](http://localhost:4000/)へアクセスすることでプレビューを見られます。

    npm run start
    # open http://localhost:4000/

**Test**

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

[CODE_OF_CONDUCT](https://github.com/asciidwango/js-primer/blob/master/.github/CODE_OF_CONDUCT.md)もあわせて参照してください。

## License

Copyright (c) 2016-present jsprimer project

- ソースコード: MITライセンス
- 文章: [CC BY-NC 4.0](http://creativecommons.org/licenses/by-nc/4.0/)

## Project Member

jsprimerプロジェクトは次のメンバーで構成されています。

- azu([@azu](https://github.com/azu))
- Suguru Inatomi([@lacolaco](https://github.com/lacolaco))

## Contact

バグ報告は次のページを参照してください。

- [文章の間違いに気づいたら · JavaScript Primer #jsprimer](https://jsprimer.net/intro/feedback/)

感想などのフィードバックには次のフォームを利用してください。

- [jsprimer.netの感想/フィードバック](https://docs.google.com/forms/d/e/1FAIpQLSc11vV1IO3dWEUDXDFE-I9IwxE-zoYWvfrJWLCHFxMcLWwdqA/viewform)

その他の連絡は次のメールアドレスに送ってください。

- info@jsprimer.net

## OSS Supporters

<a href="https://www.netlify.com">
  <img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"/>
</a>
