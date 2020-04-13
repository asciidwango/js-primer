---
author: azu
---

# JavaScriptの現在 {#now-on-javascript}

「現在のJavaScript」という定義はとてもむずかしいです。
JavaScriptは変化を続けてきた言語で、今もその変化の中にいます。

そもそもなぜ定義が難しいのかというと、JavaScriptはIoTからウェブブラウザまでかなり幅広い範囲で使われているプログラミング言語です。
そのため、どの歴史を切り取ってみても、だれかの主観的な内容になってしまいます。
「ECMAScript」の章で話したように、「すべてのJavaScript」を知っている人はいないためです。

しかしながら、いままでのJavaScriptがウェブと密接な関係があり共に発展したきたことは紛れもない事実です。
そのため、いままでのJavaScriptを振り返るとウェブブラウザと関係する話が多くなります。

この付録では、なぜJavaScriptが現在のような形になっているのかを過去の出来ことを振り返りつつ見ていきます。
また、この書籍が現在のJavaScriptを扱おうとして書かれてたのかを考えてい見ます。

注意点として、歴史の出来ことをそのものを覚える必要はありません。
しかしながら、歴史から学べることがあるのは大切です。

## JavaScriptの誕生 {#born-JavaScript}

1995年12月にJavaScriptはNetscape Navigator 2.0というブラウザに搭載するスクリプト言語として開発されました。
初期のJavaScriptはアプリケーションを開発する目的の万能な言語ではなく、「Javaのような構文」であり馴染みやすい言語が開発のオーダーにありました。
そのため、Brendan Eichは10日間で、Javaを参考にスクリプト言語を開発しています。[^1]

そのスクリプト言語はLiveScriptという名前でしたが、当時のJavaを持っていたSunに許可を得てJavaScriptという名前に変更しました。

1996年6月には、MicrosoftはInternet Explorer 3.0にJScript（JavaScriptはSunの商標であったため、Microsoftはその名前を避けた）という名前で同様のスクリプト言語を実装しました。
しかし、NetscapeとInternet ExploreのJavaScriptには互換性がない部分がありました。
この実装の差を減らすためにその仕様を決めようとして取り組んだのがECMAScriptの始まりです[^2]。
(ECMAScriptという名前になったのは、JavaScriptがSunの商標であり、SunはECMAに対してそれをdonateしなかったためです。[^3])

このときのJavaScriptには既に関数を値として扱えるファーストクラスファンクション、`prototype`、ラッパーオブジェクトなど今のJavaScriptにおいても重要な仕組みが含まれていました。
また、`typeof null`が`"object"`を返す実装のバグ[^4]やDateのmonthが`0`から始まるJava由来の仕様も含まれています。

これらの仕様バグと呼ばれる仕組みもECMAScriptとして仕様化されています。[^5]
後のECMAScriptで`typeof null`などについては仕様を変更としようという試みも行われましたが、これも断念されました。
なぜなら、この仕様バグを修正してしまうと、既に`typeof null`が`"object"`を返すことが前提となっているコードが壊れてしまうという問題が起きるためです。

[学び]
このように、JavaScriptは仕様バグであっても既存の実装に依存したものがある場合には簡単には変更できません。仕様（ECMAScript）はあくまで実装（JavaScript）に対する仕様であって、仕様ありきの実装ではないためです。

これは、これから新しい機能を仕様に入れる際には、実装して十分にフォードバックを得てから仕様化するプロセスにつながっています。（詳細は「ECMAScript」の章を参照）

## JavaScriptの役割の変化 {#dynamic-JavaScript}

最初のJavaScriptは、万能な言語ではなく補助的なスクリプト言語という立ち位置でした。
そのため、おもちゃのような言語（要出典）であり、JavaScriptでアプリケーションを開発するのがメインの使われ方ではありませんでした。

[1999]
しかし、Internet Explorer 4.0のころからDHTML（Dynamic HTML）という言葉が使われるようになり、JavaScriptで動的なウェブサイトを作る方向の話がでてきました。

[2004-2005]
JavaScriptのアプリケーションを書く言語としての役割を決定づけたと言われているのが、Ajaxと呼ばれる概念の認知です。XHRなどを使ったページ遷移をせずにアプリケーションを更新する手法は、Google検索のサジェストやGoogle Mapとかで使われたことで知られるようになっていました。
その後、Jesse James Garretによる"Ajax: A New Approach to Web Applications"という記事でAjaxという名前がつけられ広く知られるようになりました。
ここでJavaScriptの役割は、おもちゃのようなスクリプト言語ではなく、ウェブアプリケーションを書く言語として使われるようになり、役割の変化を求められました。

## JavaScriptの停滞と混乱 {#stagnant-JavaScript}

Ajaxの騒ぎでJavaScriptが「広く」「使われる」のようになる少し前に戻ってみます。
1999年12月にはECMAScript 3が公開され、RegExpやtry...catch文のプログラミング言語として最低限必要な機能は含まれていました。

しかしながら、プログラミング言語としての書きやすさや大規模なアプリケーションを書く上で必要になる規律となるようなものはまだ不足しているといました。(クラスとか型とか、自由に書くことができすぎた)

> JavaScriptのルールをもたせることが目的ではなかった
> -- Effective JavaScript

そのため、1999年からECMAScript 4という後に策定を諦めざるおえない次期バージョンの仕様も策定を進めていました。
ECMAScript 4は、ECMAScriptと名前が付きますが別の言語と言えるほど大きな変更が含まれており、次のような機能を含んだ仕様でした。

- 型
- interface
- パッケージ
- クラス
- ジェネレータ

このECMAScript 4を参考にJScript.NETやActionScript 3として実装はされていましたが、これらの実装には互換性がありませんでした。
仕様ありきで進んでしまったところもあり、ECMAScriptという仕様に対する相互運用性がある実装が存在しなかったのも、後に廃止となった理由の一つといえます。

また、1999年頃にはInternet Explorerはブラウザシェアの8割以上を持っていました。
また2001年にInternet Explorer 6がリリースされてから、次のバージョンであるInternet Explorer 7がリリースされたのが2006年と5年もの間メジャーアップデートがなかったことも停滞の様子を表しています。

2000年代前半にはSafari 、Opera、FirefoxなどのブラウザもリリースされIEが独占状態だったブラウザの状態にも競争が生まれるようになってきました。
一方で、このときのブラウザには独自の機能や独自の挙動が多くあり、特にDOM APIに関してはIEとその他で実装が違う状況がありました。たとえば、非同期通信にはIEではActiveObjectを使い、FirefoxはOperaではXHRを使うという状況でした。

このブラウザ間の互換性を補うためにprototype.js、Dojo、jQueryなどの互換レイヤーとなるライブラリが誕生しました。特にjQueryはブラウザのバグを回避するようなコードが含まれており、ブラウザ間の互換性を補うことができ、プラグインの仕組みもあったため広く使われるようになりました。

また、先ほどのAjaxの発見もJavaScriptという言語も発展を続ける需要が発生し、停滞していたECMAScriptの仕様策定やブラウザ競争も再熱し、停滞から抜けようという動きが多く見られるようになりました。

特にECMAScript 4については、ブラウザ間で相互運用性がある実装が少なく、あまりにも巨大な仕様となり、コンセンサスが取れない状態となっていました。
そのため、MicrosoftのAllen Wirfs-Brock(後のECMAScrip 2015のEditor)とYahoo!のダグラスクロックフォワードが連盟で、ECMAScript HarmonyというプランをTC39で提案しました。
ECMAScript Harmonyはその時のStableだったECMAScript 3を3.1のようにマイナーアップデートしていくという、ECMAScript 4のような大きなジャンプアップとは別の道を模索する動きでした。
最終的にはこのECMAScript Harmonyの流れにTC39全体が乗ることになり、ECMAScript 4は2008年に正式に策定を断念する発表が行われました。

ECMAScript 3.1はECMAScript 5とバージョンこそ大きいですが、マイナアップデートが中心で、Strict modeの導入などを行いました

[学び]

ブラウザの発展は一時期停滞していましたが、さまざまな理由によりその停滞から抜けようとしていました。
その混乱の中でライブラリは発達し、、、


[^1]: https://brendaneich.com/2008/04/popularity/
[^2]: https://web.archive.org/web/19981203070212/http://cgi.netscape.com/newsref/pr/newsrelease289.html
[^3]: https://twitter.com/BrendanEich/status/905677632225763328
[^4]: https://2ality.com/2013/10/typeof-null.html
[^5]: https://twitter.com/awbjs/status/902306207335038976
[^6]: https://web.archive.org/web/20181231094556/https://www.adaptivepath.com/ideas/ajax-new-approach-web-applications/