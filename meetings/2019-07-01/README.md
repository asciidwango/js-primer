# 2019-07-01 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

----

## ミーティングアジェンダ

- [2019-07-01のミーティングアジェンダ · Issue #860 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/860)

---

## 進捗確認

- azu: 前回のミーティングのレビューフィードバックのIssueを修正している。
- [x] [all: typeof 演算子の結果とか被る変数名は避ける · Issue #804 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/804)
- [ ] [モジュールの章を移動する · Issue #644 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/644)
- [ ] [アプリケーション開発の準備 に ローカルサーバの立ち上げ方法を追加する · Issue #805 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/805) 
  - => #845 
- [x] [変数と宣言: const, let, varの順番で解説を書きなおす · Issue #806 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/806)
- [ ] [strict modeについて補足/リンクを入れる · Issue #807 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/807)
  - ちょっと補足いれたけど
- [x] [プロトタイプオブジェクト: 章の最初に目的を入れる · Issue #809 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/809)
- [x] [暗黙的な型変換: 章の最初に目的を入れる · Issue #808 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/808)
- [ ] [GCについての図がほしい · Issue #810 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/810)
- [x] [非同期処理: タイトルの変更 · Issue #811 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/811)
- [x] [Ajax: Fetch APIベースに書き換える · Issue #812 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/812)
- [ ] [All: 章の末尾をチェックリストで統一する · Issue #813 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/813)
  - 進行中(↓と一緒に進んでる)
- [ ] [All: エラーの表記を統一する · Issue #814 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/814)
  - 進行中

---

## モジュール

- azu: モジュールの移動って結局どうするんだっけ?
- [モジュールの章を移動する · Issue #644 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/644)
- azu: モジュールを基本文法に持ってくるという話
- azu: 動作を確認できない基本文法の章って初めてなので、どうにかしないといけない
- azu: モジュールの章 単独だとどうしてもイメージがつかみにくい
- laco: 実際の動かし方はTodoでという感じ
- azu: モジュールの章 自体が少しふわっとしてる
- azu: named export、default export, named import, default importと並んでる
- azu: named 同士を並べて、side by sideの図をイメージできるように並び替えるとか
- azu: これは並び替えるだけでできる?
- laco: 並び替えるだけだとちょっと厳しいかも
- azu: 書き換えは必要かー
- azu: モジュールの章 2つの選択肢がある
    - モジュールの章は単独だと動かないよと説明して概念を理解してもらう + Todoを一緒に読み合わせてもらう
    - ローカルサーバの起動を方法も含めて実際に確認できような作りにする
- kahei: 後者は結構な書き直しが必要?
- azu: おそらく
- kahei: 前者のパターンですかね
- azu: 今はふわっとしてるのでもう少しモジュールをイメージしやすいよう説明のまとまり感は必要そう。
- laco: こんな感じ
    - 名前付き
      - エクスポート
      - インポート
    - デフォルト
      - エクスポート
      - インポート
    - すべてをインポート
    - 再エクスポート
    - 副作用インポート
- azu: あとこの章って読み飛ばしても良い章?
- laco: 一応そう
- azu: あ、CommonJSってNode CLIで説明してる?
- laco: してないかも…
- azu: 読み飛ばすとCommonJSの話が見えないかも(npm)
- azu: これモジュールからNode CLIに移動してもいいかも?
- laco: 後のモジュールバンドラーがCommonJSに依存してる
- azu:: うーん
- azu: モジュールからCommonJSをNode CLIへ、モジュールからモジュールバンドラーを参考リンク集に移動でどう?
- azu: モジュールバンドラーは参考リンク集に移動してwebpackとrollupの具体を追加すれば良い気がする
- laco: よさそう
- azu: 後は章の先頭で先頭にTodoアプリで実際に動かしながら学ぶため、ここでは構文の説明とモジュールのイメージを掴むのが目的です。
    - モジュールを実際に動かすためには色々準備が必要なので読み飛ばして大丈夫です。
    - みたいな導入をしっかりいれてやる
    
## 結論

- laco: [モジュールの章を移動する · Issue #644 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/644)
- タイトルをモジュールから"ES Module"に変更
- モジュールの章の導入に注釈(ここでは動作が確認できないのでイメージを掴むことが目的)
- モジュールの章の内部で並び替え #860 (comment)
- モジュールをCommonJSをNodejs CLIの方に移動
- モジュールバンドラーを参考リンク集に移動して + webpack + rollup へのリンクを入れる

----

## ES2019

- azu: ES2019がリリースされた
- azu: ECMAScript 2019はマイナーアップデートばかりだから、"ECMAScript 2019時代のJavaScript入門書"といってるのに2019要素がない
- azu: なのでArray#flat, flatMapあたりを検討してる
- azu: ネーミングでめっちゃ揉めたAPIだし
- laco: 今ArrayのAPIは全部説明してる?
- azu: してない。そういうのは避けようとしてるからいれるの迷ってる
- azu: 他のAPIはあんまり実際に使うかと聞かれるとうーんって感じ
- laco: Array#flatだけを入れるとか?
- azu: flatMapは?
- azu: やっぱり応用的かな。flatでmapだし
- laco: mapしてflatか
- azu: Array#flatだけなら数行でいけるかな
- azu: これdepthがあるはじめてのAPIなんだよなー
- azu: cloneのところでdepthみたいのは入れないという話書いてた
- azu: なんでdepthをいれたんだろなー
- laco: ほんとだ
- azu: depthあり、なし、`[].flat()`は`[]`ぐらいかな
- azu: 場所は追加、結合 あたり
- kahei: 結合 -> フラット化
- azu: flatって日本語でなんだろ?
- laco: 平坦化?
- azu: フラットとしか言いようがない
- azu: ほかはES2019?
- azu: ECMAScriptの章の表を更新必要かも
- laco: 2017以降は省略でよさそう 2つぐらいあれば

## 結論

- azu: Array#flatを入れる
- https://github.com/asciidwango/js-primer/issues/847
- azu: ECMAScriptの表を更新 
- https://github.com/asciidwango/js-primer/issues/861

----

## タイトル

- kahei: あとタイトルを決めるという話が
- azu: そういえばそんなのが
- kahei: タイトルは「JavaScript Primer」でいいですかね?
- azu, laco: 問題なさそう
- azu: サブタイトルが難しい
- kahei: サブタイトルをいくつか考えてきたのですが、ごちゃごちゃしてないので「スッキリ学べる」とか「迷わないための入門書」とか
- azu: 逆に入れたくないワードは「モダン」「仕様」とか
- kahei: サブタイトルは次回で
- azu: メインタイトルはウェブの方に反映しておきますね。

----

## 次回

2019年8月5日（月）
