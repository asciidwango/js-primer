---
author: laco
description: "Fetch APIを使って取得したデータをもとにHTMLを組み立ててブラウザ上で表示します。"
sponsors: []
---

# データを表示する {#display-data}

前のセクションでは、Fetch APIを使ってGitHubのAPIからユーザー情報を取得しました。
このセクションでは取得したデータをHTMLに整形して、アプリケーションにユーザー情報を表示してみましょう。

## HTMLを組み立てる {#markup-html}

HTML文字列の生成にはテンプレートリテラルを使います。
テンプレートリテラルは文字列中の改行が可能なため、HTMLのインデントを表現できて見通しが良くなります。
また、変数の埋め込みも簡単なため、HTMLのテンプレートに対して動的なデータをあてはめるのに適しています。

次のコードではGitHubのユーザー情報から組み立てるHTMLのテンプレートを宣言しています。

<!-- 差分コードなので -->
<!-- doctest:disable -->
```js
const view = `
<h4>${userInfo.name} (@${userInfo.login})</h4>
<img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
<dl>
    <dt>Location</dt>
    <dd>${userInfo.location}</dd>
    <dt>Repositories</dt>
    <dd>${userInfo.public_repos}</dd>
</dl>
`;
```

このテンプレートに`userInfo`オブジェクトの値をあてはめると、次のようなHTML文字列になります。

```html
<h4>js-primer example (@js-primer-example)</h4>
<img src="https://github.com/js-primer-example.png" alt="js-primer-example" height="100">
<dl>
    <dt>Location</dt>
    <dd>Japan</dd>
    <dt>Repositories</dt>
    <dd>1</dd>
</dl>
```

## HTML文字列をDOMに追加する {#html-to-dom}

次に、生成したHTML文字列をDOMツリーに追加して表示します。
まずは動的にHTMLをセットするために、目印となる要素を`index.html`に追加します。
今回は`result`というidを持ったdiv要素（以降`div#result`要素と表記します）を配置します。

<!-- `div#result` についてはno-use-prototype-hashのオプションで許可している。 -->

[import, title:"index.html"](example/index.html)

ここから、`div#result`要素の子要素としてHTML文字列を挿入することになります。
[document.getElementById][]メソッドを使い、id属性が設定された要素にアクセスします。
`div#result`要素が取得できたら、先ほど生成したHTML文字列を`innerHTML`プロパティにセットします。

<!-- 差分コードなので -->
<!-- doctest:disable -->
```js
const result = document.getElementById("result");
result.innerHTML = view;
```

JavaScriptによってHTML要素をDOMに追加する方法には、大きく分けて２つあります。
1つは、今回のようにHTML文字列を[ElementのinnerHTML][]プロパティにセットする方法です。
もう1つは、文字列ではなく[Element][]オブジェクトを生成して[手続き的にツリー構造を構築する][]方法です。
後者はセキュリティ的に安全ですが、コードは少し冗長になります。
今回はElementの`innerHTML`プロパティを使いつつ、セキュリティのためのエスケープ処理を行います。

## HTML文字列をエスケープする {#escape-html}

Elementの`innerHTML`プロパティに文字列をセットすると、その文字列はHTMLとして解釈されます。
たとえばGitHubのユーザー名に`<`記号や`>`記号が含まれていると、意図しない構造のHTMLになる可能性があります。
これを回避するために、文字列をセットする前に、特定の記号を安全な表現に置換する必要があります。
この処理を一般にHTMLのエスケープと呼びます。

多くのViewライブラリは内部にエスケープ機構を持っていて、動的にHTMLを組み立てるときにはデフォルトでエスケープをしてくれます。
または、[HTMLエスケープ用のライブラリ][]を利用するケースも多いでしょう。
今回のように独自実装するのは特別なケースで、一般的にはライブラリが提供する機能を使うのがほとんどです。

次のように、特殊な記号に対するエスケープ処理を`escapeSpecialChars`関数として宣言します。

```js
function escapeSpecialChars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
```

この`escapeSpecialChars`関数を、HTML文字列の中で`userInfo`から値を注入しているすべての箇所で呼び出します。
ただし、テンプレートリテラル中で挿入している部分すべてに関数を適用するのは手間ですし、メンテナンス性もよくありません。
そこで、[タグつきテンプレート関数][]を利用することで、明示的にエスケープ用の関数を呼び出す必要がないようにします。
タグつきテンプレート関数は、テンプレートによる値の埋め込み時に呼ばれる関数を扱えます。

次の`escapeHTML`関数は**タグ関数**です（詳細は「[文字列][]」の章の「[タグつきテンプレート関数][]」を参照）。
タグ関数には、第一引数に文字列リテラルの配列、第二引数に埋め込まれる値の配列が与えられます。
`escapeHTML`関数では、文字列リテラルと値が元の順番どおりに並ぶように文字列を組み立てつつ、
値が文字列型であればエスケープするようにしています。

```js
function escapeHTML(strings, ...values) {
    return strings.reduce((result, str, i) => {
        const value = values[i - 1];
        if (typeof value === "string") {
            return result + escapeSpecialChars(value) + str;
        } else {
            return result + String(value) + str;
        }
    });
}
```

`escapeHTML`関数はタグ関数なので、通常の`()`による呼び出しではなく、テンプレートリテラルに対してタグづけして使います。
テンプレートリテラルのバッククォート記号の前に関数を書くと、関数をタグ関数として呼び出せます。

<!-- 差分コードなので -->
<!-- doctest:disable -->
```js
const view = escapeHTML`
<h4>${userInfo.name} (@${userInfo.login})</h4>
<img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
<dl>
    <dt>Location</dt>
    <dd>${userInfo.location}</dd>
    <dt>Repositories</dt>
    <dd>${userInfo.public_repos}</dd>
</dl>
`;

const result = document.getElementById("result");
result.innerHTML = view;
```

これでHTML文字列の生成とエスケープができました。
これらの処理を前のセクションで作成した `fetchUserInfo` 関数の中で呼び出します。
ここまでで、index.jsとindex.htmlは次のようになっています。

[import, title:"index.js"](example/index.js)

[import, title:"index.html"](example/index.html)

アプリケーションを開いてボタンを押すと、次のようにユーザー情報が表示されます。

![ユーザー情報の表示](img/fig-1.png)

## このセクションのチェックリスト {#section-checklist}

- [テンプレートリテラル][]を使ってHTML文字列を組み立てた
- `innerHTML`プロパティを使ってHTML文字列をDOMに追加した
- [タグつきテンプレート関数][]を使ってHTML文字列をエスケープした
- `fetchUserInfo`関数を呼び出し、HTMLにユーザー情報が表示されることを確認した

ここまでのアプリは次のURLで確認できます。

- <https://jsprimer.net/use-case/ajaxapp/display/example/>

<!-- sandpackの問題でindex.jsがscriptタグとは異なる読み方がされ、globalに関数が追加されない。そのためappendCodeでglobalThisに関数を追加する -->

<!-- sandpack:{
  "files": {
    "/index.js": {
      "path": "example/index.js",
      "appendCode": "/* この行は本編とは無関係であるため無視してください。 */ window.fetchUserInfo = fetchUserInfo;"
    },
    "/index.html": {
      "path": "example/index.html",
      "active": true
    },
    "/example/index.js": {
      "code": "/* このファイルは本編とは無関係のファイルなので無視してください。 本編のindex.jsは一つ上のディレクトリにあります */",
      "hidden": true
    }
  },
  "entry": "/index.js",
  "main": "/index.js",
  "environment": "static",
  "template": "vanilla",
  "options": {
    "showLineNumbers": true,
    "editorHeight": 550,
    "showConsole": true, 
    "showConsoleButton": true
  },
  "honkitSettings": {
    "isOpen": true,
    "hideExitButton": true
  }
} -->


[document.getElementById]: https://developer.mozilla.org/ja/docs/Web/API/Document/getElementById
[ElementのinnerHTML]: https://developer.mozilla.org/ja/docs/Web/API/Element/innerHTML
[Element]: https://developer.mozilla.org/ja/docs/Web/API/Element
[手続き的にツリー構造を構築する]: https://developer.mozilla.org/ja/docs/Web/API/Node/appendChild
[HTMLエスケープ用のライブラリ]: https://github.com/teppeis/htmlspecialchars
[文字列]: ../../../basic/string/README.md
[タグつきテンプレート関数]: ../../../basic/string/README.md#tagged-template-function
[テンプレートリテラル]: ../../../basic/string/README.md#create
