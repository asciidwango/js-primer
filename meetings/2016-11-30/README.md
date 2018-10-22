# 2016-11-30 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

@ 会議室

## アジェンダ

- [2016-11-30 ミーティングアジェンダ · Issue #169 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/169 "2016-11-30 ミーティングアジェンダ · Issue #169 · asciidwango/js-primer")

## 進捗

- [改訂新版JavaScript本格入門](http://gihyo.jp/book/2016/978-4-7741-8411-1 "改訂新版JavaScript本格入門")見ながら

```js
function foo() {
  return
  "foo";
}
```

- @laco: 上にみたいな自動セミコロン挿入による問題って触れてる?
- @azu: 文はセミコロンをつけろという話しか書いてない
- 書くなら、コラム的な位置か[Lint/非推奨の章](https://github.com/asciidwango/js-primer/issues/142 "Lint/非推奨の章")?
- 改行で自動セミコロンが入る問題は、関数を出さないとできない。
- セミコロンは[文と式](https://jsprimer.net/basic/statement-expression/ "文と式 · JavaScriptの入門書 #jsprimer")の段階で出てくるので、まだ関数がでてきてない場所。
- なのでコラムはちょっと厳しそうな気がする
- @laco: Lintで防げかな


## 他の章へのリンク方法


> すでに、[暗黙的な型変換](../implicit-coercion/README.md#to-string)で`String`コンストラクタ関数を使った文字列化の方法を知っています。

or

> 既に、`String`コンストラクタ関数を使った文字列化の方法を知っています。（[暗黙的な型変換](../implicit-coercion/README.md#to-string)の章を参照）


- @azu: 他の章へのリンク/参照の書き方を統一したい。
- ウェブだと前者の方法でいいけど、書籍を考えるなら後者の方が良さそうな気がする。
- @kahei: 書籍だとリンクが目立たないので、「章タイトル」というパターンが多い
- あんまり多くでてくるとうるさい感じになってしまう
- 文中でも太字にするだけでも目立たせることはできる。
- 基本的には 文末に 〜 を参照 という形
- 流れ的に必要ならば本文中に入れ込んで書く。

**結論**:

- 文末に`（〜の章を参照）`をデフォルトにする
- 必要ならば文中でも触れるパターンを使う

----


## 章内リンク

- @azu: [ヘッダーにリンク用の id を振る機能がGitBookにあるので指定していきたい](https://github.com/asciidwango/js-primer/issues/169#issuecomment-263162949 "ヘッダーにリンク用の id を振る機能がGitBookにあるので指定していきたい。")
- `# タイトル {#id-id}` でセクション内にもidを振ることができる
- プラグインはちゃんと確認してないけど、GitHubみたいなanchorも付けられそう
- 多分自動的に抜けもチェックできるようにするはず

**結論**

- 必要ならば  `# タイトル {#id-id}` でidを振る

-----

## [Node.jsのインストール](https://github.com/asciidwango/js-primer/issues/169#issuecomment-263191630 "Node.jsのインストール")

- @laco: Node.jsのインストールは[#162](https://github.com/asciidwango/js-primer/pull/162)で十分?
- 公式に丁寧なインストールガイドがあればな…
- Macだとインストーラーじゃんくてnvmとかnodebrewなどのバージョン管理ツールを使うだろうし…
- 検索中
- 公式にパッケージ管理ツールでのインストール方法のまとめがあった
  - [Installing Node.js via package manager | Node.js](https://nodejs.org/en/download/package-manager/)
  - [パッケージマネージャを利用した Node.js のインストール | Node.js](https://nodejs.org/ja/download/package-manager/)
- @azu: バージョン管理じゃなくてパッケージ管理管理の方なんだ
- 一応リンク貼るぐらいはいいかも
- @laco: 翻訳もメンテされてそう

**結論**:

- [パッケージマネージャを利用した Node.js のインストール | Node.js](https://nodejs.org/ja/download/package-manager/)のリンクを貼る

----


## Objectオブジェクトの問題

![objects](https://cloud.githubusercontent.com/assets/19714/20735513/ec5a1012-b6e3-11e6-9c5b-4ce5e609c18a.png)

- @azu: [#126](https://github.com/asciidwango/js-primer/issues/126) を書いていて、objectオブジェクトなのか、Objectインスタンスなのかとかその辺の用語が気になってきた
- すべてオブジェクトなのは正しいけど、用語がごちゃごちゃ分かりにくい
- `Object`オブジェクトと`object`オブジェクトとなってしまう
- @laco: `Object`はObjectコンストラクタで良いような気がする
- @azu: 今もそんな感じで書いてる。コンストラクタもまた別のもんだいがあるけど
- コンストラクタといえば大文字から始まるというルールが分かりやすいのでイメージはしやすい
- ただ、`Object(value)` はObject関数というのがより正確な気はするけど、`Objectコンストラクタ関数`の方が直感的
- `Symbol()`とかいうコンストラクタじゃない大文字関数がいるのが気になるけど
- @laco: `objectオブジェクト`が指したい対象を定義したい
    - 大文字: Objectコンストラクタ
    - 小文字: ???
- Objectのインスタンスかなという気がする
- @azu: JavaScriptにも `instanceof` という演算子があるので、**インスタンス**という言葉を避けることは難しそう
- @laco: `var <Objectのインスタンス> = new <Objectコンストラクタ>()`
- @azu: Objectは次の通りで良さそう
    - 大文字(Objectのこと): Objectコンストラクタ
    - 小文字(new Objectとかして作ったもの): Objectのインスタンス
- @azu: 他のオブジェクトはどうしよう?
- 配列とかは配列オブジェクトとか、言ったりしてる。ここもインスタンスに合わせる?
- `[]`で作ったものを配列インスタンスとは言わない感じがしてる。
- ここはやっぱり配列オブジェクトになるかなと思う。

**結論**:

- `var <Objectのインスタンス> = new <Objectコンストラクタ>()`
- コンストラクタがでてきたら、それに対してインスタンス。
- 他のケースでは配列オブジェクトとかそういう率直な表現にする
- インスタンスとは何?という話は別途書く


---

## [OUTLINE.md](https://github.com/asciidwango/js-primer/blob/master/source/OUTLINE.md)

- @azu: 一枚の[OUTLINE.md](https://github.com/asciidwango/js-primer/blob/master/source/OUTLINE.md)にアウトラインをだーと書いてる
- どこで何がでてきて、何が出てきてないのかを整理する方法が必要になった
- 一元管理する的な意図や使ってないものを明記するためのもの
- 本文の流れを反映し続けるメンテコストがあるけど、しょうがない感じ
- オブジェクトとか配列はこれをやって書いてる
- 既存の章も後でアウトラインに反映する
- @laco: ユースケースも使ってるものをアウトラインに反映すると良さそう
- @azu: そういう感じにしたい
- ここを検索したらとっかかりを見つけられるようにしておきたい
- 章の先頭に、章の目的を書くことで書いてる途中で趣旨がぶれないようにする目的もある

## コンソールの記号

- @laco: `$` or `>`
- @kahei: こういうのは書いてる人の環境に依存するもの
- macなら `$` ?
- @azu: `bash` は `$`だった
- 普段はzsh使ってるけど
- @laco: 最近fish使ってる

**結論**:

- bashのデフォルトである `$` を使う

## 次回

1月20日(金) 19:30~
