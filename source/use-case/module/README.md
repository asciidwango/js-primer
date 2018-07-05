---
author: laco
---

# モジュール {#module}

この章では **ECMAScriptモジュール（ESモジュール、JSモジュールとも呼ばれる）** について見ていきます。
ECMAScriptモジュールは、JavaScriptファイルをモジュールとして扱うための機能です。
モジュールは、変数や関数などを外部にエクスポートします。
また、別のモジュールで宣言された変数や関数などをインポートして使うことができます。

## ESモジュール {#es-modules}

ESモジュールは、ECMAScriptの`import`、`export`構文を使って記述されるモジュールの形式です。
[export文][]によって外部にエクスポートされた変数や関数などのシンボルを、[import文][]を使って別のモジュールからインポートできます。

まずは`export`文について見ていきましょう。

### export文 {#export-syntax}

`export`文は変数や関数などのシンボルをエクスポートし、別のモジュールから参照できるようにします。
エクスポートの方法は、名前付きとデフォルトの2種類があります。
1つのモジュールにつき、名前付きの場合は複数エクスポートできますが、デフォルトエクスポートは1つしかできません。

#### 名前付きエクスポート {#named-export}

名前付きエクスポートにはいくつかの構文のパターンがあります。
次の例は、すでに宣言されている変数をエクスポートする構文です。
`export`文のあとに続けて`{}`を書き、その中にエクスポートする変数を入れます。
このエクスポート方法では、変数名がそのまま他のモジュールからインポートする際の名前になります。

[import, exportExample.js](src/export-1.js)

エクスポートする時にエイリアスをつけるには、次のような構文を使います。`as`のあとにエクスポートしたい名前を記述します。

[import, exportExample.js](src/export-2.js)

次の構文では、変数や関数、クラスなどを宣言するのと同時にエクスポートできます。
この構文では宣言された名前がそのままエクスポートされます。

[import, exportExample.js](src/export-3.js)

#### デフォルトエクスポート {#default-export}

デフォルトエクスポートにも名前付きエクスポートと同じようにいくつかの構文があります。

ひとつめは、すでに宣言されている変数をエクスポートする構文です。
`export default`文のあとに続けてエクスポートする式を記述します。

[import, exportExample.js](src/export-default-1.js)

名前付きと同じように宣言と同時にエクスポートできますが、関数とクラスに限られます。


[import, exportExample.js](src/export-default-2.js)

また、このとき関数やクラスは名前を省略できます。

[import, exportExample.js](src/export-default-3.js)

名前付きとデフォルトを同時にエクスポートする際は、次のようにデフォルトエクスポートしたいシンボルに`as default`を付与します。


[import, exportExample.js](src/export-default-4.js)

#### 再エクスポート {#re-export}

再エクスポートとは、別のモジュールからエクスポートされたものを、改めて自分自身からエクスポートしなおすことです。
再エクスポートするは次のように`export`文のあとに`from`を続けて、別のモジュール名を指定します。

[import, exportExample.js](src/re-export-invalid.js)

### import文 {#import-syntax}

`import`文は、別のモジュールからエクスポートされた変数や関数などのシンボルを自身のモジュールにインポートします。
インポートされたシンボルは、そのモジュール内で宣言された変数や関数などと同じように参照できます。

`export`文と同じように、`import`文にも名前付きとデフォルトがあり、それぞれにいくつかの構文があります。

#### 名前付きインポート {#named-import}

名前付きインポートは、指定したモジュールが名前付きでエクスポートしているシンボルを選択してインポートします。
次の例では、`./myModule.js`モジュールから名前付きエクスポートされた`foo`と`bar`をインポートしています。

[import, importExample.js](src/import-1.js)

エクスポートするときと同じように、インポートするときにもエイリアスをつけて名前を変えることができます。

[import, importExample.js](src/import-2.js)

すべての名前付きエクスポートをまとめてインポートするための、`import * as`という構文もあります。
この方法でインポートしたオブジェクトは、名前付きエクスポートされたシンボルをすべてプロパティとしてもちます。
このオブジェクトにはデフォルトエクスポートは含まれません。

[import, importExample.js](src/import-3.js)

#### デフォルトインポート {#default-import}

デフォルトエクスポートされたシンボルは専用の構文を使ってインポートします。
`import`のあとに任意の名前をつけてデフォルトエクスポートされたシンボルをインポートします。

[import, importExample.js](src/import-default-1.js)

または、デフォルトエクスポートは`default`という名前の名前付きエクスポートとして扱うこともできます。
次のように、名前付きインポートの構文で`default`を指定し、エイリアスをつけてインポートできます。
ただし、`default`は予約語なので、この方法では必ず`as`構文を使ってエイリアスをつける必要があります。

[import, importExample.js](src/import-default-2.js)

デフォルトインポートと名前付きインポートは同時に記述できます。
次のようにデフォルトインポートの構文と名前付きインポートを構文をカンマでつなげます。

[import, importExample.js](src/import-default-3.js)

#### 付随効果のためのインポート {#import-for-side-effect}

モジュールの中には、グローバルを実行するだけで何もエクスポートしないものがあります。
そのようなモジュールをインポートするには、付随効果のためのインポート構文を使います。
この構文では、モジュールのグローバルコードを実行するだけで、シンボルを何もインポートしません。

[import, importExample.js](src/import-side-effects.js)

## ESモジュールを実行する {#run-es-modules}

作成したESモジュールを実行するためには、起点となるJavaScriptファイルをESモジュールとしてWebブラウザに読み込ませる必要があります。
Webブラウザは`script`タグによってJavaScriptファイルを読み込み、実行します。
次のように`script`タグに`type="module"`という属性を付与すると、WeブラウザはJavaScriptファイルをESモジュールとして読み込みます。

```html
<!-- myModule.jsをECMAScriptモジュールとして読み込む -->
<script type="module" src="./myModule.js"></script>
<!-- インラインでも同じ -->
<script type="module">
import { foo } from "./myModule.js";
</script>
```

`type="module"`属性が付与されない場合は通常のスクリプトとして扱われ、ECMAScriptモジュールの機能は使えません。
スクリプトとして読み込まれたJavaScriptで`import`文や`export`文を使用すると、シンタックスエラーが発生します。

また、インポートされるモジュールの取得はネットワーク経由で解決されます。
そのため、モジュール名はJavaScriptファイルの絶対URLあるいは相対URLを指定します。

## CommonJSモジュール {#commonjs-module}

[CommonJSモジュール][]とは、[Node.js][]環境で利用されているモジュール化の仕組みです。
ESモジュールの仕様が策定されるよりもずっと古くから使われており、Node.jsの標準パッケージや[NPM][]で配布されるサードパーティパッケージは、ほぼすべてCommonJSモジュールとして提供されています。

CommonJSモジュールはNode.jsのグローバル変数である`module`変数を使ってシンボルをエクスポートします。
次のように`module.exports`プロパティに代入されたオブジェクトが、そのJavaScriptファイルからエクスポートされます。
複数のシンボルをエクスポートできるESモジュールと違い、CommonJSでは`module.exports`プロパティに代入されたオブジェクトだけがエクスポートの対象です。

[import, commonjsExport.js](src/cjs-export.js)

モジュールをインポートするには、`require`グローバル関数を使います。
次のように`require`関数にモジュール名を渡し、戻り値としてエクスポートされたオブジェクトを受け取ります。

[import, commonjsImport.js](src/cjs-import.js)

Node.jsではESモジュールもサポートする予定ですが、現在はまだ安定した機能としてサポートされていません。

## [コラム] モジュールバンドラー {#module-bundler}

**モジュールバンドラー**とは、JavaScriptのモジュール依存関係を解決し、複数のモジュールをひとつのJavaScriptファイルに結合するツールのことです。
モジュールバンドラーは起点となるモジュールが依存するモジュールを次々にたどり、適切な順序になるように結合（**バンドル**）します。

NPMによって多くのJavaScriptライブラリがNode.js向けに配布されていますが、これらはほぼすべてCommonJSモジュールです。
それらのライブラリを使ったアプリケーションをWebブラウザで実行するためには、CommonJSモジュールを解決し、ひとつのJavaScriptファイルに結合する必要がありました。
結果として、Node.js向けでないアプリケーションのソースコードもモジュール化することが一般的になり、
モジュールバンドラーはJavaScript開発において無くてはならないものになりました。

現在では、CommonJSだけでなくESモジュールにも対応したモジュールバンドラーがいくつも登場しています。
さらに、バンドルする際にJavaScriptコードの最適化や軽量化をおこなう機能をもったものもあります。
[JavaScriptモジュールについてのドキュメント][]では、
WebにおけるJavaScriptのモジュールと、バンドルする目的などについて詳しくまとめられています。

[export文]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/export
[import文]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import
[CommonJSモジュール]: https://nodejs.org/docs/latest/api/modules.html
[Node.js]: https://nodejs.org/ja/
[NPM]: https://www.npmjs.com
[JavaScriptモジュールについてのドキュメント]: https://developers.google.com/web/fundamentals/primers/modules
