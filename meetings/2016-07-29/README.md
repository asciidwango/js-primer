# 2016-07-29 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

@ 株式会社ドワンゴ会議室

## アジェンダ

- [2016年7月29日 MTG アジェンダ · Issue #96 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/96 "2016年7月29日 MTG アジェンダ · Issue #96 · asciidwango/js-primer")

## 吉野家問題 - @azu

- @azu: https://github.com/asciidwango/js-primer/pull/95#discussion_r71451112
- "吉野家" じゃないサロゲートペアな文字列が欲しい
- 商標などで問題が起きたりしないか不安
- @kahei: 多分問題ないと思う
- @azu: "吉野家"以外だと"𩸽定食"など
- 国際的にも"吉"はよく例として使われているのを見る
- そもそも[ここの記述が間違っている](https://github.com/asciidwango/js-primer/issues/106)のfor...ofの話ではないかも
- ただし、ES2015ではコードポイントの話はでてくるのでサロゲートペアは触れる必要がある
- とりあえず、"吉野家"を例に使うで問題なさそう

### 結論

- サロゲートペアには"吉野家"を使う

## 脚注/コラムの使い所 - @laco

- @laco: 脚注の運用方法みたいなところどうすればいいか?
- どのくらいからコラムに逃がすべきか、本文＋リンクにすべきか?
- @kahei: 脚注や参照リンクを多用する書き方をひる人はいるが微妙なやり方
- 脚注は読まなくてもよい物を書く場所
- 必要な人は脚注を読むというもの
- コラムは本文とは異なってるものがまとまってある場合に作るもの
- @laco: コラムはどのように場所に書く感じ?
- @kahei: コラムのマークがついていれば大丈夫。
- 後で調整する形になる

### 結論

- 本文中に必要ではないなら脚注
- 脚注は多用し過ぎない
- コラムは`[コラム]`のようなマークをつけておく

## ローカルサーバ - @laco

- [ブラウザアプリユースケース用の開発サーバ · Issue #79 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/79 "ブラウザアプリユースケース用の開発サーバ · Issue #79 · asciidwango/js-primer")
- @laco: ローカルサーバ何を使うかは決定してないが、とりあえず[node-static](https://github.com/cloudhead/node-static "node-static")を使っている
- @azu: 次に書いた要件を満たせるなら何でもいい


-----

### 機能要件

- [x] http:// でアクセスできるURLを作る
- [x] 起動した時にアクセスする URLが表示される
- [x] メンテンスされている
- [x] Node.js 6以降で動作する

### 非機能要件

- [x] アクセスされてるリソースのログがでる
- [x] インストールした時に余計な警告がでない
- `npm start` で叩くのでコマンドとしての使いやすさはやや置いておいてもいい

----

- [node-static](https://github.com/cloudhead/node-static "node-static")はこれを満たしている

### 結論

- ローカルサーバは[node-static](https://github.com/cloudhead/node-static "node-static")を使う
- 困ったら別途考える

## この書籍の目的の確認 - @azu

- [はじめに/本書の目的 · Issue #103 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/103 "はじめに/本書の目的 · Issue #103 · asciidwango/js-primer")
- @azu: このIssueに自分なりの目的や読者対象をまとめた
- 完全なプログラミング初心者は対象ではない という点は明記したい
- JavaScriptは色々取り入れて変化していく言語
- JavaScriptの変化に対して対応できる基礎をつけていくの目的
- 何かを作るという明確なゴールは設定しない方向
    - コードは読めるようにしたい
    - 謎のイディオムはできれば読めるようにしたい
    - 「何かを作る」というのがその人のプロジェクトで決まった時に、それの作り方を調べて作れるようになるのが目標
- リファレンスを目指すのではなく、実際にその構文や機能がどのように使われるのかに焦点を当てる
- ユースケースも実際の使われ方を見ることができるような内容にしたい

### 結論

- [はじめに/本書の目的 · Issue #103 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/103 "はじめに/本書の目的 · Issue #103 · asciidwango/js-primer")
- ひとまずまとめて文章として参照できるようにする
- "はじめに"は多分本が書き終わってから書くようなもの

###  スクリーンショットのサイズと枠線について

- @laco: 現状は1280 x 720 - https://github.com/asciidwango/js-primer/blob/cd5f4b34c6bb233b828e365dd7326c433fdc93d3/source/ajaxapp/firefox-launch.applescript
- 画面全体(コンソールを含めて)のスクリーンショットのサイズをどうするか
- @kahei: 図版の中の文字サイズが大きさが一定となるように調整できるとベスト
- 現実的には難しい
- 必要な部分だけをトリミングすることもある
- 全体を見せるときは、何を映しているのかが分かれば文字が読めなくてもいい
- また、書籍の場合は基本白黒なので、グラデーションなどに気をつける必要がある
- @laco: 一応文字だけ分かるように書いていて、スクリーンショットは補助的
- @azu: 画像の枠線はどうする?
- @kahei: 書籍の方はTexとかで処理できる
- @azu: ウェブはCSSを書けば付けられる
- 枠線はなしのスクリーンショットを取って、枠線は表示側で実装する方向で
- @laco: スクリーンショットはできるだけ再現できるようにAppleScriptにしてる

### 結論

- スクリーンショットのサイズは特に決定せず
- スクリーンショットの画像は枠線や影を含めない

## [Promise #94](https://github.com/asciidwango/js-primer/issues/94 "Promise #94") - @laco

- @laco: ユースケースでPromiseを扱うが基本文法ではどこまで?
- @azu: ユースケースで書かれてるものをカバーできるように書く

### 結論

- ユースケース -> 基本文法 という作業の流れで問題なし

## Tagged Template - @laco

- @laco: [Ajax](https://github.com/asciidwango/js-primer/issues/9 "Ajax")でTagged Templateを使ってる
- エスケープの例として使ってる
- @azu: Tagged Templateの定番はまだいまいち決まってない
- Tagged Templateの使い方としてエスケープの使い方はよくある使い方としてはありそう
- https://github.com/declandewet/common-tags
- ただ、Tagged Templateの解説を基本文法でまだしてない
- 紹介するタイミングが結構むずかしそう…

### 結論

- Tagged Templateの使い方としてエスケープは良さそう


## XSSについて - @laco

- @laco: エスケープの話をajaxで出している
- DOM-based XSSの話をどこまでするか、どうするかの件 せめてリンクは出してあげたいが参考リンクがない
- @azu: 海外だとOWASP
- MDNも簡単な解説しかない
- [クロスサイトスクリプティング - 用語集 | MDN](https://developer.mozilla.org/ja/docs/Glossary/Cross-site_scripting "クロスサイトスクリプティング - 用語集 | MDN")
- hasegawaさんが最近連載してる
- [JavaScriptセキュリティの基礎知識：連載｜gihyo.jp … 技術評論社](http://gihyo.jp/dev/serial/01/javascript-security "JavaScriptセキュリティの基礎知識：連載｜gihyo.jp … 技術評論社")
- hasegawaさんが本とか書いてくれると…
- [安全なウェブサイトの作り方：IPA 独立行政法人 情報処理推進機構](https://www.ipa.go.jp/security/vuln/websecurity.html "安全なウェブサイトの作り方：IPA 独立行政法人 情報処理推進機構")

### 結論

- いいリンクを募集中

## 使わなくていいイディオム/文法

- [はじめに/本書の目的 · Issue #103 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/103 "はじめに/本書の目的 · Issue #103 · asciidwango/js-primer")で使わなくていい表現は使わなくていいことを学ぶ必要があるという話
- 使わなくていいものをとりあえずまとめておきたい
- => [既に使わなくていいイディオム/文法 · Issue #108 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/108 "既に使わなくていいイディオム/文法 · Issue #108 · asciidwango/js-primer")
    - ここに書いていく
- これについて話す場合は
- 「何故使われていたのか」
- 「何故使わなくて良くなったか」
- を一緒に書く

## JavaScriptは変化している言語

- `== null` は人によって許容される `==` の使い方
- ESLintのルールを見ていると、ある程度許容される使い方などが発見できる
- @azu: 古いベストプラクティスは今ベストでない事が多い
- ESLintのドキュメントを見たりするとそういうのも見ていけるかも
- 更新されているプラクティスなドキュメントは少ない
- @kahei: そういう話があると面白いかも
- @azu: => [ESLintで学ぶプラクティス](https://github.com/asciidwango/js-primer/issues/102#issuecomment-236162759 "ESLintで学ぶプラクティス")

## 次回

- https://github.com/asciidwango/js-primer/milestone/3

2016年9月9日 @ 株式会社ドワンゴ
