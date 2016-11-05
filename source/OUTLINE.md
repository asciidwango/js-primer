# OUTLINE

## [JavaScriptとは](basic/introduction/README.md)
## [コメント](basic/comments/README.md)
## 字句構造
## Strict mode
## [変数と宣言](basic/variables/README.md)
## [値の評価と表示](basic/read-eval-print/README.md)
## [データ型とリテラル](basic/data-type/README.md)
## [関数と宣言](basic/function-method/README.md)
## [文と式](basic/statement-expression/README.md)
## [暗黙的な型変換](basic/implicit-coercion/README.md)
## [条件分岐](basic/condition/README.md)
## [ループと反復処理](basic/loop/README.md)
## [演算子](basic/operator/README.md)
## String
- 文字列のコピーはいらない。
- 文字列はデフォルトでコピーな動作をする
	- コピーは `var x = str` や `fn(str)` とというときにコピーされるということ
	- これはImmutableであるというのが一般的な感じ
- 文字列の比較 `===`
	- 文字毎に一個づつ比較して全部比較される
	- 参照の比較ではないよ
- 文字列の比較 `>`
	- こっちは辞書の順で比較される
	- 辞書の順は charCode という数値
	- そもそも文字は CharCode の表現があり、それを表示する側が文字として出してる
- ユニコード