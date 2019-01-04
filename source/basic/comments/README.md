---
author: azu
---

# コメント {#comment}

コメントはプログラムとして評価されないため、ソースコードの説明を書くために利用されています。

JavaScriptには、大きく分けて2種類のコメントがあります。

## 一行コメント {#single-line-comment}

一行コメントは名前のとおり、一行づつコメントを書く際に利用します。
`//` 以降がコメントとして扱われるため、プログラムとして評価されません。

```js
// 一行コメント
// この部分は評価されない
```

## 複数行コメント {#multi-line-comment}

複数行コメントは、複数行のコメントや[JSDoc][]のようなツールのためのアノテーションに利用します。
`/*` と `*/`で囲まれた範囲がコメントとして扱われるため、プログラムとして評価されません。

 
```js
/* 複数行コメント
   囲まれている範囲が評価されない
 */
```

複数行コメントの中に複数行コメントを書くことはできません。
そのため、次のようなケースは構文エラーとなります。

```
/* ネストされた /* 複数行コメント */ はかけない */
```

### [ES2015] HTML-likeコメント {#html-like-comment}

ECMAScript 2015（ES2015）から後方互換性のための仕様として**HTML-likeコメント**が追加されています。
このHTML-likeコメントは、ブラウザの実装に合わせた後方互換性のための仕様として定義されています。

HTML-likeコメントは名前のとおり、HTMLのコメントと同じ表記です。

[import, html-like-comments-example.js](src/html-like-comments-example.js)

ここでは、 `<!--` と `-->` がそれぞれ一行コメントとして認識されます。

JavaScriptをサポートしていないブラウザでは、`<script>`タグを正しく認識できないために書かれたコードが表示されていました。
それを避けるために`<script>`の中をHTMLコメントで囲み、表示はされないが実行されるという回避策が取られていました。
今は`<script>`タグをサポートしていないブラウザはないため、この回避策は不要です。

```html
<script language="javascript">
<!--
  document.bgColor = "brown";
// -->
</script>
```

一方、`<script>`タグ内、つまりJavaScript内にHTMLコメントが書かれているサイトは残っています。
このようなサイトでもJavaScriptが動作するという、後方互換性のための仕様として追加されています。

[歴史的経緯][ES6 In Depth: Arrow functions]は別として、ECMAScriptではこのように後方互換性が慎重に取り扱われます。
ECMAScriptは一度入った仕様が使えなくなることは殆どないため、基本文法で覚えたことが使えなくなることはありません。
一方、新しく入った仕様でよりよい機能が増え、それを学び続けることには変わりありません。

[Annex B (normative)]: http://www.ecma-international.org/ecma-262/6.0/#sec-additional-ecmascript-features-for-web-browsers
[ES6 In Depth: Arrow functions]: https://dev.mozilla.jp/2016/03/es6-in-depth-arrow-functions/ "ES6 In Depth: Arrow functions | Mozilla Developer Street (modest)"
[JSDoc]: https://ja.wikipedia.org/wiki/JSDoc
