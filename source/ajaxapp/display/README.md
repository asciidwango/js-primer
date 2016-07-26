---
author: laco
---

# データを表示する

XHRを使ってサーバーからデータを取得することができたので、データをHTMLに整形して表示してみましょう。

## レスポンスをオブジェクトに変換する

まずはGitHub APIからのデータをJavaScriptで扱うために、レスポンス文字列をオブジェクトに変換します。
GitHub APIのレスポンスはJSON形式なので、オブジェクトへの変換には[JSON.parse()][]を使います。

```js
request.addEventListener("load", (event) => {
    if (event.target.status !== 200) {
        console.log(`${event.target.status}: ${event.target.statusText}`);
        return;
    }

    const userInfo = JSON.parse(event.target.responseText);
});
```

## HTMLを組み立てる

HTML文字列の生成にはテンプレートリテラルを使います。
テンプレートリテラルは文字列中の改行が可能なため、HTMLのインデントを表現できて見通しが良くなります。
また、文字列の埋め込みも簡単なため、HTMLのテンプレートに対して動的なデータを当てはめるのに適しています。

次のコードではGitHubのユーザー情報から組み立てるHTMLのテンプレートを宣言しています。

```js
const view = `
<h4>${userInfo.name} (@${userInfo.login})</h4>
<img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
<dl>
    <dt>Location</dt>
    <dd>${userInfo.location}</dd>
    <dt>Repositries</dt>
    <dd>${userInfo.public_repos}</dd>
</dl>
`;
```

このテンプレートに`userInfo`オブジェクトを適用すると、次のようなHTML文字列になります。

```html
<h4>js-primer example (@js-primer-example)</h4>
<img src="github.com/js-primer-example.png" alt="js-primer-example" height="100">
<dl>
    <dt>Location</dt>
    <dd>Japan</dd>
    <dt>Repositries</dt>
    <dd>1</dd>
</dl>
```

## HTML文字列をDOMに追加する

次に、生成したHTML文字列をDOMツリーに追加して表示します。
まずは動的にHTMLをセットするために、目印となる要素をindex.htmlに追加します。
今回は`result`というidを持ったdiv要素（以降`div#result`と表記します）を配置します。

```html
<body>
    <h2>GitHub User Info</h2>

    <button onclick="getUserInfo('js-primer-example');">Get user info</button>

    <div id="result"></div>

    <script src="index.js"></script>
</body>
```

ここから、`div#result`要素の子要素としてHTML文字列を挿入することになります。
[document.getElementById][]メソッドを使い、id属性が設定された要素にアクセスします。
`div#result`要素が取得できたら、先ほど生成したHTML文字列を`innerHTML`プロパティにセットします。

```js
const result = document.getElementById("result");
result.innerHTML = view;
```

JavaScriptによってHTML要素をDOMに追加する方法は、大きく分けて２つあります。
ひとつは、今回のようにHTML文字列を[Element#innerHTML][]プロパティにセットする方法です。
もうひとつは、文字列ではなく[Element][]オブジェクトを生成して[手続き的にツリー構造を構築する][]方法です。
後者はセキュリティ的に安全ですが、コードは少し冗長になります。
今回は`Element#innerHTML`プロパティを使いつつ、自前でセキュリティのための処理を行うこととします。

## HTML文字列をエスケープする

`Element#innerHTML`に文字列をセットすると、その文字列はHTMLとして解釈されます。
たとえばGitHubのユーザー名に`<`記号や`>`記号が含まれていると、意図しない構造のHTMLになる可能性があります。
これを回避するために、文字列をセットする前に、特定の記号を安全な表現に置換する必要があります。
この処理を一般にHTMLのエスケープと呼びます。

厳密にHTMLのエスケープをしようとすると大変です。
今回は最低限のエスケープ処理を`escape`関数として宣言します。

```js
function escape(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
```

この`escape`関数を、HTML文字列の中で`userInfo`から値を注入しているすべての箇所で行います。
ただし、テンプレートリテラル中で挿入している部分すべてにいちいち`escape`関数を適用するのは手間ですし、メンテナンス性もよくありません。
そこで、[テンプレートリテラルをタグ付け][[]することで、明示的に`escape`関数を呼び出すことなくエスケープを行えるようにします。
タグ付けされたテンプレートリテラルは、テンプレートによる値の埋め込みを関数の呼び出しとして扱えます。

次の`escapeHTML`はテンプレートリテラルにタグ付けするための**タグ関数**です。
タグ関数は第一引数に文字列リテラルの配列、第二引数に埋め込まれる値の配列が与えられます。
`escapeHTML`関数では、文字列リテラルと値が元の順番どおりに並ぶように文字列を組み立てつつ、
値が文字列型であればエスケープするようにしています。

```js
function escapeHTML(strings, ...values) {
    return strings.map((part, i) => {
        let arg = values[i];
        if (arg) {
            if (typeof arg === "string") {
                return part + escape(arg);
            } else {
                return part + `${arg}`;
            }
        } else {
            return part;
        }
    }).join("");
}
```

`escapeHTML`関数はタグ関数なので、通常の`()`による呼び出しではなく、テンプレートリテラルに対してタグ付けして用います。
テンプレートリテラルのバッククォート記号の前に関数を書くと、関数がタグ付けされます。

```js
const view = escapeHTML`
<h4>${userInfo.name} (@${userInfo.login})</h4>
<img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
<dl>
    <dt>Location</dt>
    <dd>${userInfo.location}</dd>
    <dt>Repositries</dt>
    <dd>${userInfo.public_repos}</dd>
</dl>
`;

const result = document.getElementById("result");
result.innerHTML = view;
```

これでHTML文字列の生成とエスケープができました。
ここまでで、index.jsとindex.htmlは次のようになっています。

[import, index.js](src/index.js)

[import, index.html](src/index.html)

アプリケーションを開いてボタンを押すと、次のようにユーザー情報が表示されます。

![ユーザー情報の表示](img/fig-1.png)

[JSON.parse()]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
[document.getElementById]: https://developer.mozilla.org/ja/docs/Web/API/Document/getElementById
[Element#innerHTML]: https://developer.mozilla.org/ja/docs/Web/API/Element/innerHTML
[Element]: https://developer.mozilla.org/ja/docs/Web/API/Element
[手続き的にツリー構造を構築する]: https://developer.mozilla.org/ja/docs/Web/API/Node/appendChild
[テンプレートリテラルをタグ付け]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/template_strings#タグ付けされたTemplate_literals
