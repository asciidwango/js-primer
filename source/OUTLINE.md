# OUTLINE

## [JavaScriptとは](./basic/introduction/README.md)
## [コメント](./basic/comments/README.md)
## 字句構造
## Strict mode
## [変数と宣言](./basic/variables/README.md)
## [値の評価と表示](./basic/read-eval-print/README.md)
## [データ型とリテラル](./basic/data-type/README.md)
## [関数と宣言](./basic/function-method/README.md)
## [文と式](./basic/statement-expression/README.md)
## [暗黙的な型変換](./basic/implicit-coercion/README.md)
## [条件分岐](./basic/condition/README.md)
## [ループと反復処理](./basic/loop/README.md)
## [演算子](./basic/operator/README.md)
## String
- 文字列の宣言は、リテラルを使う
	- `""`
	- `''`
	- `\`\``
	- の３つがある
- 文字列の追加には、 `string += "String"` を使う
- 文字列の検索方法は、 `String#include` や `String#indexOf`、`String#search`などがある。
- `String#search(regExp)` は正規表現を使う
- 文字列の削除は、`String#replace`を使う
- 文字列はImmutableな値であるので、削除も新しく文字列を作って返すようになってる
- Immutableであることがオブジェクトとの大きな違い
- 文字列をコピーするメソッドは必要ない
	- コピーは `var x = str` や `fn(str)` とというときにコピーされるということ
- 文字列の比較 `===` でできる
	- 文字毎に一個づつ比較して全部比較される
	- 参照の比較ではない
- 文字列の比較 `>`
	- こっちは辞書の順で比較される
	- 辞書の順は charCode という数値
	- そもそも文字は CharCode の表現があり、それを表示する側が文字として出してる
- ユニコード
	- [What every JavaScript developer should know about Unicode](https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/)
	- [Unicode のサロゲートペアとは何か - ひだまりソケットは壊れない](http://vividcode.hatenablog.com/entry/unicode/surrogate-pair)
	- Charater
		- いわゆる文字
	- Code unit
		- [ ]もっと分かりやすく調べる
	- Code point
		- Unicodeにおける
	- 2つのCode unitからなる文字のCode unitの連なりをサロゲートペアと呼ぶ
	- [String.prototype.codePointAt()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt "String.prototype.codePointAt()")
		- サロゲートペア考慮してn番目のcode pointをencodeして返してくれる
		- 言い換えるとn番目のCode unitを返す
	- [String.prototype.charAt()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/charAt "String.prototype.charAt()")
		- サロゲートペア考慮しないでn番目のcharaterを返す
		- `"string"[0]`はこれと同じ
	- [String.prototype.charCodeAt()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt "String.prototype.charCodeAt()")
		- サロゲートペア考慮しないでn番目のcharaterのcode pointを返す
## 配列 
## 未使用
- プリミティブと参照型について
	- [data-type: プリミティブと参照型についてを追加する · Issue #145 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/145 "data-type: プリミティブと参照型についてを追加する · Issue #145 · asciidwango/js-primer")
	- 値自体の特性 @done
		- プリミティブ型はImmutable
		- オブジェクトはMustable
	- 値の受け渡し `function`
	- コピー `=` (特にこれはオブジェクト側に統一した方法がないという問題がある)
	- 比較 `===` @done