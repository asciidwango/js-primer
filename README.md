# ECMAScript6 Book

この書籍ではJavaScriptについて扱う感じの内容になっています。

## Installation

    npm install

## Usage

**Build**

GitBookのbuildをします
    
    npm run build
    
**Watch**

GitBookのbuildかつWatchをします。
プレビューをする場合は、ローカルサーバがたつこちらの方を推奨。

    npm run watch

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