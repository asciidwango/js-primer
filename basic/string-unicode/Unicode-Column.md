---
author: azu
description: "[コラム] Unicodeにまつわる問題"
sponsors: []
---

<!-- このコラムは本文に含めていないけど、メモ的においておく -->

### [コラム] Unicodeにまつわる問題 {#unicode-issues}

この章では、最初に述べたようにUnicodeのUTF-16に関する一部分だけを紹介しています。
この章で紹介していたのは、Code UnitとCode Pointに関する問題の一部分のみです。

Unicodeにまつわる問題は、この他にもさまざまなものがありますが、それらはJavaScript以外の言語でも発生します。
それらについてすべてを詳細に紹介することは難しいため、関連するキーワードを一部紹介します。

- 書記素クラスタにまつわる問題: 書記素クラスタはUnicodeにおける自然な1文字を表す単位
    - 書記素クラスタにおける「1文字」は複数のCode Pointで表現されることがあります
    - JavaScriptには書記素クラスタの判定（「1文字」の判定）をする標準APIはありません
    - 関連する仕様の提案としてECMA i18n APIに[Intl.Segmenter](https://github.com/tc39/proposal-intl-segmenter)があります
- Emoji ZWJ（Zero Width Joiner）Sequences: 絵文字の肌の色などを複数のCode Pointで表現するための仕様
    - 表示（グリフ）としては1文字として扱いたいケースが多くなるため、書記素クラスタの判定の問題につながる
    - カーソルの移動などは、書記素クラスタ単位での移動として扱いたい場合があります
- 結合文字列と正規化の問題: macOSで濁点が分離した文字として扱われる問題などが有名
    -`String`の`normalize`メソッドが正規化に関連します
- East Asian Width（東アジアの文字幅）の問題: ターミナルで日本語が表示される場合に位置がずれる問題などが有名
    - それぞれの文字（Code Point）の文字幅の違いから表示のずれが発生しています
