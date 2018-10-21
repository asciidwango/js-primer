# 2017-03-24 Meeting Notes
             
- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)
             
## アジェンダ

- [2017-03-24 ミーティングアジェンダ · Issue #209 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/209 "2017-03-24 ミーティング · Issue #209 · asciidwango/js-primer")

## StringのTagged Template Literalのサンプルどうするか

- @azu: Tagged Template Literalのサンプルをどうするか
- 引数が特殊すぎるのであんまり詳しくは説明したくない
- こういうパターンでタグ関数を書くことができるよということだけにしたい
- 既に[use-case/ajaxapp/display](https://github.com/asciidwango/js-primer/blob/master/source/use-case/ajaxapp/display/README.md "use-case/ajaxapp/display")で使っている
    - ここではTagged Template Literalの細かい解説はしてない
- そのため基本文法で解説が必要
- いくつか候補をだしたけど、エスケープ?
- @laco: エスケープが典型的な感じ
- インデントのやつって`${value}`は必要になる?
- @azu: いらないかも。できたほうがいいけど
- HTMLエスケープがでてきてるからかぶらないほうが良いのかな?
- @laco: 以前 URLのpathのエスケープを書いた

```js
const tagName = "空白が 混ざった 文字列";

path`/tags/${tagName}`
```

- path`https://${apiHost}/${path}`
- @azu: URLのpathnameを安全にエスケープするという話
- ajaxのAPI叩くパスでもでてきてたかも
- それの布石的なのでよさそうかも
- https://jsprimer.net/use-case/ajaxapp/promise/
- 後、[use-case/ajaxapp/display](https://github.com/asciidwango/js-primer/blob/master/source/use-case/ajaxapp/display/README.md "use-case/ajaxapp/display")の方も書き方を揃えたい
- Array#reduceがまさにこれにマッチした使い方
- `strings`が空配列にならないから`Arrry#reduce`で例外にならなくてすごい

### 結論

- URLのパスをエスケープするタグ関数を例にしてみる
- [use-case/ajaxapp/display](https://github.com/asciidwango/js-primer/blob/master/source/use-case/ajaxapp/display/README.md "use-case/ajaxapp/display")の方も書き方を揃えたい
- Stringの章が終わったら揃える
- => [String + ajaxapp: tagged template literalの書き方を揃える · Issue #214 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/214 "String + ajaxapp: tagged template literalの書き方を揃える · Issue #214 · asciidwango/js-primer")

```js
function escapeHTML(strings, ...values) {
    return strings.reduce((accumulator, string, index) => {
        return accumulator + escapeSpecialChars(values[index - 1]) + string; 
    });
}
```

##  console.logと// => の使い分け について

- @azu: `評価式; // => 評価結果` という構文を使ってる
- `console.log(評価式); // => 評価結果` というパターンもある
- [console.logと// => の使い分け · Issue #195 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/195 "console.logと// =&gt; の使い分け · Issue #195 · asciidwango/js-primer")
- できれば揃えたい
- ウェブだとあった方が便利。だけど書籍だと邪魔な可能性もある
- @kahei: 場合によって使い分けでもいいのでは
- @azu: 明確な基準ななくてむずかしいのがなやみどころ
- 一案的には評価式が変数を含んでいるならconsole.log
- @laco: `console.log(a); // => 結果` だと console.logの結果が右側っぽく見える
- あと、Node.jsだとaがオブジェクトだと"[object Object]"になって意味が違う?
- @azu: REPLで試してみたらNode.jsは`console.log({});// {} `となってた
- いつのまにかinspectした結果を出すようになってる
- @laco: ホントだ

```shell-session
$ node -v 
7.2.0
$ node
> console.log({s:1})
{ s: 1 }
undefined
> console.log({s:1})
> var object = { a : {} }
undefined
> console.log(object)
{ a: {} }
undefined
> var object = { a : { b : 1} }
undefined
> console.log(object)
{ a: { b: 1 } }
undefined
> var object = { a : { b : 33  } }

```

- @laco: `=>`の意味合いについては解説してる？
- @azu: コメントの章にかいてなかったかも

### 結論

- コメントのところに評価コメントの書式についてをちゃんと説明を書く
    - [comment: => についてを説明する · Issue #215 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/215 "comment: =&gt; についてを説明する · Issue #215 · asciidwango/js-primer")
- 不要なところについてはconsole.logは省いても良い
    - 場合によって使いわけ
    - 明確な使い分けは見えず
    
    
## ラベルの管理方法について

- @azu: ラベルを色々追加した
- [Labels · asciidwango/js-primer](https://github.com/asciidwango/js-primer/labels "Labels · asciidwango/js-primer")
- 自分しかつけてないので気にしなくていいけど
- 議論で方針が決まったIssueは`Status: Ready for PR`をつけるか閉じるかしていきたい。
- [Status: Ready for PR](https://github.com/asciidwango/js-primer/labels/Status%3A%20Ready%20for%20PR "Issues · asciidwango/js-primer")

### 結論

- 結論が出たものは[Status: Ready for PR](https://github.com/asciidwango/js-primer/labels/Status%3A%20Ready%20for%20PR "Issues · asciidwango/js-primer")を付ける
- コミットができてPRがでたら閉じる

## console.error の使い方について

- @laco: `console.error`に何を渡すか
- https://github.com/asciidwango/js-primer/pull/202/files/246a42967bfa5dc4f6724639927ae1bbe313504e#diff-e17432ce26c5c47f53bf2a852cf2f57a
- @azu: Node.jsに公式な方法ってある?
- @laco: わからない
- @azu: Nodeも最近のブラウザなら`error`オブジェクトをちゃんと出してくれる感じがする
- とりあえずスタックトレースを削るのはよくない
- @laco: `error`がErrorオブジェクトじゃない可能性もある
- `console.error`で出さない可能性も?
- @azu: `any` でしかない。`throw any`だから
- けど、APIの引数として`error`となってるなら`console.error`で良いのでは

### 結論

- `console.error(error)` に統一
- [console.errorの使い方を統一する · Issue #216 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/216 "console.errorの使い方を統一する · Issue #216 · asciidwango/js-primer")

## string: 「文字列」「部分文字列」「検索文字列」 使い分け

- @azu: [string: 「文字列」「部分文字列」「検索文字列」 · Issue #208 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/208 "string: 「文字列」「部分文字列」「検索文字列」 · Issue #208 · asciidwango/js-primer")
- `"文字列".indexOf("部分文字列")` がなんか気持ち悪い
- どうやって書くのが良いのだろうか?
- @kahei: 先人たちはあんまりきにしてなさそう。
- 「検索対象の文字列」といったような表現
- @azu: 先人の文献をさぐっていくしかなさそう
- 正規表現も同じように書き方が気になる
- あいまい検索? 柔軟な検索 なのかなど
- これも詳しい書籍を当たる必要がありそう

### 結論

- 先人の知恵を探る

## 目次のカバレッジ

- @kahei: 今どれぐらい書けている感触?
- 〜目次をみながら〜
- @azu: 半分弱ぐらい?
- @laco: 目次で被ってるものとか既に解決してるやつがありそう
- @azu: なるほど。整理必要そう
- 半分ぐらいという感じっぽい
- [目次を整理する · Issue #217 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/217 "目次を整理する · Issue #217 · asciidwango/js-primer")
- @laco: cliが終わったらビルトインオブジェクトあたりにてをつけるかも
- @azu: JSONは必須。Dateはいらないかも…
- MapとSetは欲しい感じがする
- @laco: ErrorとPromiseは別?
- @azu: Error -> Promiseの順なので連番的
- @laco: 目次を整理する必要がありそう


### 結論

- [目次を整理する · Issue #217 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/217 "目次を整理する · Issue #217 · asciidwango/js-primer")
- Assign @laco to JSON

## 新しい本

- @azu: [徹底マスター JavaScriptの教科書　プログラミングの教養から、言語仕様、開発技法までが正しく身につく | 磯 博 | インターネット・Web開発 | Kindleストア | Amazon](https://www.amazon.co.jp/dp/B06XNQCW7B/ "徹底マスター JavaScriptの教科書　プログラミングの教養から、言語仕様、開発技法までが正しく身につく | 磯 博 | インターネット・Web開発 | Kindleストア | Amazon")というのが出ている
- [SBクリエイティブ:徹底マスター JavaScriptの教科書](http://www.sbcr.jp/products/4797388640.html "SBクリエイティブ:徹底マスター JavaScriptの教科書")
- [dan4423のブログ : 磯博、『徹底マスタJavaScriptの教科書‐プログラミングの教養から、言語仕様、開発技法までが正しく身につく_Informatics_IDEA』、2017、SBクリエイティブ](http://blog.livedoor.jp/dan4423/archives/5191202.html "dan4423のブログ : 磯博、『徹底マスタJavaScriptの教科書‐プログラミングの教養から、言語仕様、開発技法までが正しく身につく_Informatics_IDEA』、2017、SBクリエイティブ")
- 目次面白い
- @laco: 第11章 バグとエラーへの対処気になる
- @azu: Screen オブジェクトとかあるのか

----

## 次回

5月26日(金曜日)
