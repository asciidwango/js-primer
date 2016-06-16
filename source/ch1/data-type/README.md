# データ型とリテラル

JavaScriptは動的型付け言語に分類される言語であるため、
静的型付け言語のように変数に型の指定をすることはなく、実行時に型が決定されます。

JavaScriptでは次の6つのプリミティブなデータ型とオブジェクトによって成り立っています。

- プリミティブ型のデータ
    - 真偽値（Boolean）: `true` or `false`
    - 数値（Number）: `42` や `3.14159` など
    - 文字列（String）: `"JavaScript"` など
    - シンボル（Symbol）: インスタンスが固有で不変となるデータ型
    - undefined: 値が未定義であるデータ型
    - null: null 値を意味する特殊なデータ型
- オブジェクト（Object)

JavaScriptでは`typeof`演算子を使うことで、次のように値のデータ型を調べる事ができます。

![import, typeof-example.js](src/typeof-example.js)

