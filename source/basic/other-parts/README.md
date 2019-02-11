---
author: azu
---

# 第一部: おわりに {#end-of-basic-grammer}

第一部 基本文法では、ECMAScriptという仕様の範囲でのJavaScriptの文法や使い方について見てきました。
第二部 ユースケースでは、第一部で学んだ基本文法を応用した小さなアプリケーションを実装しながらJavaScriptについて理解を深めていきます。
また第二部からはNode.jsやブラウザといった実行環境の固有なAPIの利用やライブラリの利用方法についても見ていきます。

一方で、第一部ではECMAScriptのすべての文法やビルトインオブジェクトを紹介したわけではありません。紹介してない文法やビルトインオブジェクトにもとても有用なものが数多くあります。

たとえば[Proxy][]や[Reflect][]といったビルトインオブジェクトは、オブジェクトの基本的な操作（プロパティの取得や代入など）に対して独自の動作を定義できます。
また、ビルトインオブジェクトの`Object`にも[Object.defineProperty][]メソッドという、オブジェクトの記述子（descriptor）を変更できるものがあります。
オブジェクトの記述子（descriptor）を変更することで、オブジェクトのプロパティを変更できなくなるといったオブジェクトのメタ的な動作を設定できます。

その他にもありますが、これらのAPIはアプリケーションよりもライブラリを作成する際に利用することが多いです。また第二部のユースケースでも登場しないため、この書籍では省略させていただきました。
これらのAPIは必要となった際に使い方を調べて覚えていくのがよいです。

JavaScriptのほとんどのAPIについては何度も登場している[MDN Web Docs][]というリファレンスに大部分が記載されています。
MDNにはECMAScriptの機能だけではなく、ブラウザ固有の機能であるDOM APIと呼ばれるものについても含まれています。
そのため、MDNは実質的にJavaScriptの公式リファレンスと考えられます。

第二部ではNode.jsやブラウザ固有のDOM APIについても触れていきます。
これらの実行環境に依存するAPIはかなりの数が存在するため、APIの調べ方を知ることが重要です。

たとえば、Node.jsには公式のリファレンスガイドとして[Node.js Documentation][]があります。ブラウザならば先ほども紹介した[MDN Web Docs][]が実質的な公式のリファレンスガイドです。まずは使い方を知るためにも公式のリファレンスガイドを参照してみてください。

また利用しているライブラリやツールの使い方について調べる場合には、そのライブラリなどの公式サイトやリポジトリを見てみることが大切です。
これは「[ECMAScript][]の章」でも紹介していますが、ECMAScriptやJavaScriptは常に変化しています。そのため、ライブラリによってはいつのまにかDeprecated（非推奨）となっている場合もあるため、まずは元となるものをみることが重要です。

調べ方に正解はありません。しかし、調べたいと思ったときに調べることができるように、調べ方を知っておくことが重要です。

[ECMAScript]: ../ECMAScript/README.md
[Proxy]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Proxy
[Reflect]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Reflect
[Object.defineProperty]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
[TypedArray]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
[MDN Web Docs]: https://developer.mozilla.org/ja/  "MDN Web Docs"
[Node.js Documentation]: https://nodejs.org/api/
