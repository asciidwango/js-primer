---
author: laco
---

# JSON

## JSONとは {#what-is-json}

JSONはJavaScript Object Notationsの略で、JavaScriptのオブジェクト表記をベースに作られた軽量なデータフォーマットです。
その実体は[ECMA-404][]によって標準化されたフォーマットで記述されたテキストデータです。
名前にJavaScriptが含まれていますが、JavaScriptには依存していません。
人間にとって読み書きが容易で、マシンにとっても簡単にパースや生成を行なえる形式になっているため、
多くのプログラミング言語がJSONを扱う機能を備えています。


JSONの構造はオブジェクトと配列を組み合わせたものを基にしています。
JSONのオブジェクトは次のようにキー（名前）と値のペアの集まりを`{}`記号で囲ったものです。
JavaScriptのオブジェクトリテラルと似ていますが、キーにもダブルクオートが必須です。

```json
{ "id": 1, "name": "js-primer" }
```

JSONの配列は次のように順序付けられた値をカンマで区切り、`[]`記号で囲ったものです。
こちらはJavaScriptの配列リテラルとほとんど同じですが、末尾のカンマは認められません。

```json
[ 1, 2, 3 ]
```

オブジェクトと配列は次のように自由に組み合わせることができます。

```json
{
    "items": [
        { "id": 1 },
        { "id": 2 }
    ]
}
```

JSONの細かい仕様に関しては[json.orgの日本語ドキュメント][]にわかりやすくまとまっているので、参考にするとよいでしょう。

## JSONオブジェクト {#json-object}

### JSON文字列をオブジェクトに変換する {#json-parse}

### オブジェクトをJSON文字列に変換する {#json-format}

#### JSON文字列にフォーマットできないオブジェクト

[ECMA-404]: http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf
[json.orgの日本語ドキュメント]: http://www.json.org/json-ja.html
