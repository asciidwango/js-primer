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
## オブジェクト
- オブジェクトとハッシュ
- Objectとprototype
- すべては`Object`に通じる
- 関数、正規表現、文字列オブジェクト、数値オブジェクト、真偽値オブジェクト、配列、Map、Setとにかく何でも
	- プリミティブ値はオブジェクトではないけど、プリミティブ値にもラッパーオブジェクトというオブジェクト版がややこしい。
	- ラッパーオブジェクトについては基本的に使い道がほぼないので気にしなくて良い。
	- プリミティブのラッパーオブジェクトは型変換ぐらいしか利用しない。
- `Object.assign({})`でコピー
- `Object.keys`、`Object.values`、`Object.entries`
	- こいつらはIterableじゃなくて普通に配列を返す
- 殆どのオブジェクトが文字列にできるのも`Object#toString()`が継承されているから
- この継承の仕組みがprototypeチェーンであり、それについてはFunctionで詳しくやるのでココでは解説しませんが、クラス継承をJavaScriptではどのようなしくみでうごいているかという点について

## 配列
- この章では、配列の基本的な操作と配列を扱う場合においてのパターンについて学びます。
- 配列の作り方、取り出し方、データ探索、削除について学んでいきます。
- サマリ
	- 配列は特別なオブジェクトです。まずは配列の作り方と配列への要素の追加方法、配列から値を取り出す方法、配列に値がはいってるかを確認する方法を見ていきます。
	- また配列は`length`が特別な動きをするため、`length`を変更することで値を削除することもできますが、`splice`などの削除方法について見ていきましょう。
	- そして、配列は破壊的な操作と非破壊的な操作が混在する分かりにくい部分を持ち合わせています。そのため、非破壊的に扱う方法を学ぶことでより安全な配列を利用できます。
	- また配列は 0以上の値を扱うことができるため、空の配列を使うことで値が無い場合とある場合にも同じ操作ができるためパターンとして優れています。
	- そのためには色々なものを配列にする方法を見ていきましょう
- アウトラインの流れ
	- 配列の基礎
		- 読み込み
		- 書き込み
	- 配列の応用
		- 配列と他のオブジェクトでのやり取り
- アウトライン
	- 配列は特殊なオブジェクト
		- 配列とは値に順序つけて格納したもの
		- 配列の中身の値のことを**要素**、それぞれの要素の位置のことを**インデックス**という
		- 配列は可変な配列のみ
		- `length`は自動的に追従する
		- typeof をすると "object"
			- 分類としてはオブジェクト
		- 配列かどうかを判定 `Array.isArray` を使う
		- 密な配列とは限らない
	- [コラム] TypedArray
		- TypedArrayとは
		- Arrayとの違い
	- 配列の作成とアクセス
		- 配列の宣言には `[]` リテラルが使える
		- `array[num]` でアクセスできる
		- arrayのインデックスは `0` から開始されます
		- 配列の末尾の要素へのアクセスは `length - 1` を使う
		- 存在しないインデックスへのアクセスは`undefined`が返される
		- オブジェクトで存在しないプロパティへアクセスしたのと同じ
	- 配列から要素を検索
		- 配列に含まれているかは`Array#includes` で見つけられる
		- 配列から取り出す場合は `Array#find` や `Array#findIndex` や `Array#indexOf` を使うことで実体やindexを取ることができる
	- 配列へ要素を追加と削除
		- 末尾
			- `Array#push`
			- `Array#pop`
		- 先頭
			- `Array#unshift`
			- `Array#shift`
	- 配列から要素を削除
		- 配列から要素を削除する方法も色々ある。
		- 基本的には`Array#splice`を使うのが簡単だけど、これは破壊的な操作
			- 削除と追加を同時に行うという特殊な感じのメソッド
		- 空の配列を作りたいなら `.length = 0`を使うこともある
		- けど、普通は新しい配列を作って変数を上書きしちゃうのが楽です。
	- 配列を使ってLRU
		- 判定、追加、削除
	- 疎の配列を作る
		- `new Array` は`length`を指定した配列を作る
			- 疎の配列は基本的に扱いにくく誤解の元となるため避ける
			- パフォーマンス的にも問題になりやすい
	- Array-likeとは何か
		- `length`と順番をもったオブジェクトのこと
		- ただし `length` が配列のように自動的に更新されない
		- また、Array.prototypeではないのでArrayのメソッドをもっていない
		- Arrayのようなオブジェクトのこと
		- DOM Node、arugmnent
		- `Array#from`で配列にできる
	- 配列をコピー
		- 配列は参照型
			- 配列はオブジェクトであるため参照型
			- 破壊的な変更は参照先にも影響を与えしまう
			- 配列は基本的に破壊的な操作になってることが多い
		- `Array#slice`または`Array#concat`
		- `Array#copy`はない
		- 破壊せずに扱うならコピーするか破棄せずに変更を加える事ができるメソッドを使う
	- 高階関数とメソッドチェーン
		- これについてはLoopのところで少しやっているが、基本的に配列の中身をすべて走査するため一見処理コストはあるが、膨大な数にやセンシティブな状況でなければこれらの高階関数で配列を扱ったほうが安全で読みやすいコードになる。
		- なぜ読みやすいコードになるかというと、手続きではなく、処理を関数(大体は無名関数だが)にして扱うため処理のまとまりが生まれやすい。
	- パターン: nullを返さずに配列を返す
		- また null を返すパターンなどが減るため、常に配列を受け取り/必要なら配列を返すというパターンが出来上がるところが良いところ。
		- nullを渡すな空の配列を渡せ、nullを返すな空の配列を返せ
- 未整理
	- Arrayの要素がないことは `hasOwnProperty`を使うことで判定できます。
	- 配列は特殊なオブジェクトです。
	- 格納した要素はキーに数字を使って取り出せます。
		- `Array#from` で正しく配列にできる
		- そもそもなんでArray-likeというのか。配列の`length`は特殊な性質を持っているため。
		- 配列の中身に対して動的に返す値が切り替わる
		- 存在しない配列の添字に代入できるという点
		- [How ECMAScript 5 still does not allow to subclass array — Perfection Kills](http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/ "How ECMAScript 5 still does not allow to subclass array — Perfection Kills")
	- - `Array#concat` = 新しい配列
	- とにかく配列メソッド(操作)には一貫性がないような感じなので、自分で一貫性を持った扱い方を決めた方が良い。
			- [Array methods - Immutable or Mutable](https://gist.github.com/azu/30b1ff6831c3bbf7fbd5501d6a2bdfb0 "Array methods - Immutable or Mutable")
	- Arrayと高階関数
	- 配列から他のデータ型にする場合で考えるのは、ほぼ文字列ぐらいなので`Array#join`と`Array#map`を使うなどが定番のやり方
	- Arrayのパターン
		- Array -> Array
			- slice、concat、mapなどに代表されるコピーを作って返す操作
		- Array -> void(破壊的)
			- pushやshiftに代表されるArrayに破壊的な操作
		- Array -> String
			- joinなどの文字列
		- Array -> Boolean
			- indexOfやincludes等の操作
			- `Array.isArray`は特殊なものでArrayかどうかを判定できる
				- Realmが異なるとArrayはinstanceofでも一致しなくなるため
		- Array -> any
			- findなどのArrayからものを取り出す操作
			- 探索処理を書く際には必須だが
			- JavaScriptのデフォルトは大体が線形探索担ってる
		- Other -> Array
			- `Array#from`、`Array#of`
			- Array-likeという概念がある
			- これもやっぱりArrayは特殊なオブジェクトであるから
			- exitic objectについて

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

## 未使用
- instanceof
	- instanceofは同一性に近いチェック
- プリミティブと参照型について
	- [data-type: プリミティブと参照型についてを追加する · Issue #145 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/145 "data-type: プリミティブと参照型についてを追加する · Issue #145 · asciidwango/js-primer")
	- 値自体の特性 @done
		- プリミティブ型はImmutable
		- オブジェクトはMustable
	- 値の受け渡し `function`
	- コピー `=` (特にこれはオブジェクト側に統一した方法がないという問題がある)
	- 比較 `===` @done