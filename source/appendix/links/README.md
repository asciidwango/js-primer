---
author: laco
description: "ここでは本編で取り上げられなかったJavaScriptの周辺ツールやライブラリなどをいくつか紹介します。"
---

# 付録: 参考リンク集 {#reference-links}

ここでは本編で取り上げられなかったJavaScriptの周辺ツールやライブラリなどをいくつか紹介します。
これらは時流に左右されて古くなりやすい情報であるため、本編からは独立した付録としてまとめています。

## 開発を補助するツール {#developer-tools}

JavaScriptを使った開発に役立つツールをいくつか紹介します。

### コーディングスタイルの統一 {#coding-style}

複数人での開発において、改行の位置やインデントの幅など、ソースコードのフォーマットは統一します。
なぜなら、機能には関係ないスタイルの問題はレビューに余計な時間を使ってしまうためです。
また、使うべきでない古いイディオムやバグを生みやすい危険なコードの混入を防ぎ、品質を保つことも重要です。

これらのコーディングスタイルの統一は、一貫性を持って持続的におこなうことが重要です。
そのため、ツールを使って自動化することが推奨されます。

#### Prettier {#prettier}

[Prettier][]はJavaScriptをはじめとする多くの言語に対応した汎用的なコードフォーマッターです。
設定ファイルがなくても利用できるため、導入しやすいのが大きな特徴です。

#### ESLint {#eslint}

[ESLint][]はJavaScriptファイル用のLintツールです。
_Lint_ とは、ソースコードファイルを静的解析して不適切なコードやコーディングスタイルに合わないコードを検知する仕組みのことです。
Lintをおこなうことで、チーム内でのコーディングスタイルを機械的に統一できます。

### コードエディター {#code-editor}

JavaScriptやHTML、CSSなどのコーディングに適したエディターを選ぶことで、開発の生産性を高められます。

#### VSCode {#vscode}

[VSCode][]はMicrosoft社がオープンソースで開発している無料のコードエディターです。
JavaScriptによってプラグインを書くことができ、さまざまな機能を追加できます。

#### Atom {#atom}

[Atom][]はGitHub社がオープンソースで開発している無料のコードエディターです。
VSCodeと同じようにプラグインによる拡張性が高く、GitHubと連携した機能が特徴です。

### ブラウザの開発者ツール {#browser-devtools}

多くのブラウザは開発者向けの組み込みツールを提供しており、本編で紹介したコンソールもその一部です。
その他にもJavaScriptコードをステップ実行できるデバッガーや、HTTPの通信ログなど、ブラウザごとにさまざまな機能があります。

- Firefox: [開発ツール | MDN][]
- Chrome: [Chrome DevTools][]
- Safari: [Safari Developer Help][]

### パフォーマンスの改善 {#performance-improvement}

WebサイトやWebアプリケーションのパフォーマンスを計測、改善するためのツールを紹介します。

#### PageSpeed Insights {#pagespeed}

[PageSpeed Insights][]はGoogleが提供するWebパフォーマンス計測ツールです。
計測したいページのURLを入力すると読み込みにかかっている時間や、改善できる項目を提示してくれます。

#### WebPagetest {#webpagetest}

[WebPagetest][]は、ブラウザを利用したWebパフォーマンス計測ツールです。
さまざまな条件下のブラウザでウェブサイトにアクセスし、パフォーマンスを計測できます。
BSDライセンスの下でオープンソース化されており、任意のサーバーにインストールして実行することもできます。

#### Lighthouse {#lighthouse}

[Lighthouse][]はGoogleが提供するWebページの分析ツールです。
Webパフォーマンスだけでなく、アクセシビリティやSEOなどの観点からも分析し、そのスコアを表示します。
Chromeブラウザの開発者ツールとして組み込まれていますが、npmでパッケージをインストールすればCLIとしても実行できます。

## JavaScriptの実行プラットフォーム {#javascript-platform}

JavaScriptはWebサイトを作るためだけの言語ではありません。
いまでは多くのプラットフォームを超えた共通言語として、JavaScriptやその周辺のエコシステムは発展しています。
JavaScriptを使ったプログラムを実行するためのいくつかのプラットフォームについて紹介します。

### Webサイトを公開する {#publishing-website}

WebサイトやWebアプリケーションをインターネットに公開するためには、どこかのWebサーバーでホスティング（公開）する必要があります。
ここではホスティングを機能として提供し、簡単にWebサイトを公開できるいくつかの _ホスティングサービス_ を紹介します。

#### GitHub Pages {#github-pages}

[GitHub Pages][]は、GitHubが提供する無料のホスティングサービスです。
GitHubのリポジトリをWebページとして公開して、リポジトリ内に配置したHTMLやCSS、JavaScriptなどの静的ファイルを配信できます。

#### Firebase Hosting {#firebase-hosting}

[Firebase Hosting][]は、GoogleのFirebaseプラットフォームが提供するホスティングサービスです。
CLIを使ったシンプルなデプロイと、小規模の利用なら無料で利用できることが特徴です。

#### Netlify {#netlify}

[Netlify][]も無料で利用できるホスティングサービスです。
GitHubやBitBucketのようなGitリポジトリサービスと連携していて、リモートリポジトリにpushするだけで自動的にデプロイできるのが特徴です。

### Node.jsをサーバーレスに実行する {#serverless}

Node.jsのサーバーを用意しなくても関数単位でNode.jsのスクリプトを実行できる環境として、AWS LambdaやGoogle Cloud Functionsのような[Function as a Service][]（FaaS）の実行プラットフォームがあります。
FaaSにJavaScriptの関数をデプロイすると、クラウド上で管理されているNode.jsサーバーにホストされ、それぞれの関数にエンドポイントが割り当てられます。

#### AWS Lambda {#aws-lambda}

[AWS Lambda][]はAmazon Web Services上で提供されるサーバーレスNode.js実行環境です。

#### Google Cloud Functions {#google-cloud-functions}

[Google Cloud Functions][]はGoogle Cloud Platform上で提供されるサーバーレスNode.js実行環境です


### デスクトップアプリケーションを作る {#desktop-app}

JavaScriptを使ってWindowsやOSX、Linuxなどのデスクトップ環境で動作するGUIアプリケーションを作ることもできます。


#### Electron {#electron}

[Electron][]はGitHub社によって開発されているオープンソースのデスクトップアプリケーションフレームワークです。
HTMLやCSS、JavaScriptを使ったWebアプリケーションをChromiumブラウザと一緒にパッケージ化して配布可能な実行ファイルを作成できます。

#### NW.js {#nwjs}

[NW.js][]はIntel社によって開発されているオープンソースのデスクトップアプリケーションフレームワークです。
Electronと同様にChromiumブラウザをベースにしたアプリケーションを開発できます。
NW.jsはブラウザの中からNode.jsの開発エコシステムを直接利用できるようにしているのが特徴です。

[ESLint]: https://eslint.org/
[Prettier]: https://prettier.io/
[stylelint]: https://stylelint.io/

[VSCode]: https://code.visualstudio.com/
[Atom]: https://atom.io/

[開発ツール | MDN]: https://developer.mozilla.org/ja/docs/Tools
[Chrome DevTools]: https://developers.google.com/web/tools/chrome-devtools/?hl=ja
[Safari Developer Help]: https://support.apple.com/ja-jp/guide/safari-developer/welcome/mac

[PageSpeed Insights]: https://developers.google.com/speed/pagespeed/insights/
[WebPagetest]: https://www.webpagetest.org/
[Lighthouse]: https://developers.google.com/web/tools/lighthouse/?hl=ja

[GitHub Pages]: https://pages.github.com/
[Firebase Hosting]: https://firebase.google.com/products/hosting/?hl=ja
[Netlify]: https://www.netlify.com/

[AWS Lambda]: https://aws.amazon.com/jp/lambda/
[Google Cloud Functions]: https://cloud.google.com/functions/
[Function as a Service]: https://en.wikipedia.org/wiki/Function_as_a_service

[Electron]: https://electronjs.org/
[NW.js]: https://nwjs.io/

