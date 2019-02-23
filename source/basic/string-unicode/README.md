---
author: azu
description: "JavaScriptが採用している文字コードであるUnicodeと関連するStringのメソッドについて紹介します。Stringのメソッドや文字列を扱う上で、UTF-16をエンコード方式として利用していることを意識する必要がある場合が登場します。"
---

# 文字列とUnicode {#string-unicode}

「[文字列][]」の章で紹介したように、JavaScriptは文字コードとしてUnicodeを採用し、エンコード方式としてUTF-16を採用しています。
この文字コードはJavaScriptの内部的に文字列を扱う際のもの（内部コード）です。
そのため、コードを書いたファイル自体の文字コード（外部コード）は、基本的にはどのような文字コードでも問題ありません。

次の図はコードを書いたファイルの文字コードがISO/IEC 646（外部コード）であった場合に、JavaScriptエンジンがどのように処理するかを表した図です。
たとえば、外部コードでは`0x41`として扱われていた`A`という文字は、JavaScriptエンジンで扱う際にはUTF-16で`A`を表すCode Unitの`0x2341`へと変換されます。そして、JavaScriptでの処理が終わったあとは、ふたたび外部コードに合わせた`0x41`という値へと変換され出力されます。

![外部コードと内部コードのやり取り](./img/extenal-code-and-internal-code.png)

この図からも分かるように、JavaScriptエンジン上で動作するJavaScriptのコードは、UTF-16で変換された文字列を扱っています。

「[文字列][]」の章ではこの文字コードは意識していなかったように、内部的にどのような文字コードで扱っているかは意識せずに文字列処理はできます。
しかし、JavaScriptのStringオブジェクトにはこの文字コード（Unicode）に特化したAPIもあります。
また、絵文字を扱う際や「文字数」を数えるということを行う場合には、内部コードを意識しないといけない場面があります。

この章では、文字列におけるUnicodeを意識しないといけない場面について見ていきます。
また、Unicode自体もECMAScriptと同じように歴史がある仕様であるため、Unicodeのすべてを紹介するには膨大な文字列が必要になります。
そのため、この章はJavaScriptにおけるUnicodeとUTF-16に話を限定しています。

Unicodeの歴史を含めた文字コード自体について詳しく知りたい方は「[プログラマのための文字コード技術入門][]」や「[文字コード「超」研究][]」等を参照してください。

## Code Point

あらためてCode Pointについての説明

- UnicodeにおけるID = Code Point
- `String.fromCodePoint`
- またUnicodeエスケープによって直接Code Pointで文字列を書ける
- Code PointとCode Unitすごく似てるけどやっぱり違う -> 1 Code Point != 1 Code Unit


## 1 Code Unit != 1 Code Point

## サロゲートペア

複数のCode Unitで1つのCode Pointを表すための仕組み。

## Code Pointの列挙

### length

実際にサロゲートペアのうむによってどのような影響があるかの例。

### 正規表現の`.`

### splitによる"Code Unit"の分割

## おわりに

[文字列]: ../string/README.md

[文字コード「超」研究]: http://www.rutles.net/products/detail.php?product_id=298
[プログラマのための文字コード技術入門]: https://gihyo.jp/book/2019/978-4-297-10291-3