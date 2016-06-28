# 2016-06-28 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@laco0416](https://github.com/laco0416)
- [@vvakame](https://github.com/vvakame)

@ 株式会社ドワンゴ会議室

## アジェンダ

- [2016-06-28 ミーティングアジェンダ · Issue #55 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/55 "2016-06-28 ミーティングアジェンダ · Issue #55 · asciidwango/js-primer")

## 前回のミーティングからの変更点 @ azu

- [ランディングページを用意する · Issue #42 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/42)
- [リリース時に通知を受け取れるフォーム · Issue #33 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/33)

Travis CIでビルドしてGitBookをgh-pagesとして公開するようになった。

- [https://asciidwango.github.io/js-primer/](https://asciidwango.github.io/js-primer/) で参照可能

masterにマージされると自動的にgh-pagesへデプロイされる。

- [リポジトリ名をjs-primerにリネーム · Issue #50 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/50)

年号や大文字を入れたくないため `js-primer` にリポジトリをリネームした

- [Docテストの追加 · Issue #41 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/41)

```js
a; // => 1
```

`a`の評価結果は`1`という事を実際にテストとして実行できるようになった。

- `*-example.js`
- インラインのCodeBlock

がそれぞれ対象となって自動的にテストされる。
コードとコメントの齟齬や、動かないコードを減らすため。

## [基本文法では`var`を使う #46](https://github.com/asciidwango/js-primer/issues/46 "基本文法では`var`を使う #46")

@azu: 基本文法などREPLで繰り返し実行するコードは、`let`や`const`よりも`var`の方が柔軟となる。
そのため、基本文法では`var`を使いたいという話

### 結論

- 基本文法では`var`を使う
- 書籍の最初にコードの読み方的な説明を入れる
    - なぜ `var` を使うのか
- ユースケースでは`const`を利用


## [ライセンス #37Open](https://github.com/asciidwango/js-primer/issues/37 "ライセンス #37Open")

- @azu: Pull Requestを受け入れるあたってライセンスについて明記したい
- 取り込まれたものはどういう扱いになるのかを明記したい
- @kahei: CCライセンスで良いのでは
- CCライセンスは法的には根拠が日本ではあんまりないという話
- @azu: [Promise本](https://github.com/azu/promises-book)の時はMIT + CC-BY-NC
    - 中国語と韓国語の翻訳もちゃんとライセンスを継承してくれた。
- GPLなど他のライセンスについて

### 結論

- MIT + CC-BY-NCの方向で
- 出版する際は特別な契約を結んだという形になる(CC-BY-NCでは商用利用がダメであるため)

## CHANGELOG @ laco

- @laco: CHANGELOGは出す?
- @azu: 最初のリリースまではタグを貼るタイミングが難しい
- 1.0.0以降は変更毎にタグを張ってCHANGELOGを出す方向で
- [CONTRIBUTING.md](../../CONTRIBUTING.md)に書いてあるコミットメッセージのルールに従う
    - 自動的にある程度出せるため

### 結論

- 1.0.0以降は出す
- [CONTRIBUTING.md](../../CONTRIBUTING.md)に従った書き方でコミットメッセージを書く
- FFマージかSquashかは自由

## スケジュール

- @kahei: スケジュールを決めたい
- 9月末をとりあえずの〆切としたい
- @azu: 時間が足りるかは微妙
- ユースケースの部分がまだ何もないので基本文法でどう書くか迷ってる
- 関数などはユースケース寄りの記述を入れていきたい
- @laco: 来月からとりかかれそう
- @laco: 7月でAjaxのユースケースの章をざっくり作って指標とする

### 結論

- 9月末をひとまずの区切りにする

## ディレクトリ構造

- @laco: ユースケースのディレクトリ構造はどうする?
- @azu: `<ユースケース名>/{src, test, img}` という感じ?
- @laco: 連番を入れてソートしたい
- @kahei: 01, 02 みたいのをディレクトリのprefixに入れる?
- @azu: GitBookだとディレクトリ名がURLにでてくる
- `source`というのがURLにでてくるのはよくなさそう
    - [sourceディレクトリをrootディレクトリにする #57](https://github.com/asciidwango/js-primer/issues/57 "sourceディレクトリをrootディレクトリにする #57")

### [Front Matterにメタ情報を入れる #40](https://github.com/asciidwango/js-primer/issues/40 "Front Matterにメタ情報を入れる #40")

- @azu: Front MatterというYAMLでメタ情報をmdに書ける
- 何か入れたい情報がある?
- tag, description, title … あんまりなさそう
- @laco: author を入れるとよさそう
- コントリビューターの名前をどんどん追加していく感じ
- Jekyllみたいにpermanent linkをFront Matterで指定できない?

### 結論

- [sourceディレクトリをrootディレクトリにする #57](https://github.com/asciidwango/js-primer/issues/57 "sourceディレクトリをrootディレクトリにする #57")
- `author` をメタ情報として入れる

## 次回

2016年7月29日 @ ドワンゴ会議室