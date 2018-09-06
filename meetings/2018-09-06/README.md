# 2018-09-06 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

## アジェンダ

- [2018-09-06 ミーティングアジャンダ · Issue #531 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/531)

## Travisが動かない

- @azu: Travis CIとか動かないのは、もう一度設定し直してなおった
- @kahei: 他のリポジトリでも同じような現象が起きていた

## 独自ドメイン

- @azu: 柔軟性のために独自ドメインに移行したい
- @laco: リダイレクトとかが間に挟めるようになる
- @azu: ドメインが有料なのと共同管理がネックとなるポイント
- @laco: Googleドメインなら共同管理できますよ
- @azu: なるほど
- ...Google Domainでドメイン検索中...
- @laco: `jsprimer.com` 以外なら空いている
- @azu: まずはドメインを使うかどうかを決めようか
- @azu: ドメインを追加するデメリットは管理費ぐらい
- @azu: 10年で1万程度なので問題なさそう
- @azu: ドメインを取るという前提でどういう作りにするか
- github.io から ドメイン へリダイレクトをどうするか
- リポジトリ名とドメイン名を揃えるか
- @laco: 全部一変にやらなくてもいいんじゃないですかね
- @azu: それもそうか


### 結論

- Googleドメインをとって共同管理する by @azu
    - GitHub Pageでドメインを設定する
- リポジトリとのズレは修正したくなったら直す
- <https://github.com/asciidwango/js-primer/issues/528>

----


## 残っているタスク

- @azu: そろそろおわりに近いので、残ってる細かいものをIssue化する
- ...Issueを見ている...
- @kahei: 付録的なものって何か書くんでしたっけ?
- @azu: [次に何をするか: 参考リンク集](https://github.com/asciidwango/js-primer/issues/510)ぐらい?
- @azu: ほかは…

    学び方
    調べ方
    実際の開発
    ライブラリの選び方
    中級者になるためには
    ...

〜 いろいろ案をだしていた〜

- @azu: 結局参考リンク集 + コメントぐらいしかないのでは…
- @azu: 参考リンクってどのようなレイヤー?
- jsdiffle的なplayground系?
- @laco: HTMLとかを置けるホスティング系
- @azu: 機能を探せるcaniuse的なもの?

### 結論

- [次に何をするか: 参考リンク集 · Issue #510 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/510)を付録する
- そのままリンク + コメントで紹介する


----

## 環境ごとのオブジェクトの章

- @laco: [wip 実行環境 by lacolaco · Pull Request #534 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/534)を書いているけど書けない
- @laco: オブジェクトの違いは書けるけどlocalhostうんぬんが異物な感じがする
- しわよせが来ている感じ
- @azu: Node.jsを中心に見直してみるとか
- Node.jsのインストールの紹介を中心に、Nodeとブラウザの違い、Nodeでの実行とする
- ローカルサーバはajaxで必要なタイミングで必要だよという話にする
- @laco: 少し見えてきた
- @azu: `node main.js` `node index.js` ` node script.js` ?
- laco: main.js
- @azu: REPLとnode main.jsどっちがいいんだろ?
- [read-eval-print: コンソールの開き方について · Issue #85 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/85)でもscriptタグで外部ファイルを中心にするから`node main.js`か

### 結論

- 環境ごとのオブジェクトの章 -> Node.js インストールの章へと変更
- [2章の序章: Node.jsのインストール · Issue #267 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/267)

----

## 次回

10/25(木)
