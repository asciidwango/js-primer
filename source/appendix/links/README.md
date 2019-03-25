---
author: laco
---

# 付録: 参考リンク集

ここでは本篇で取り上げられなかったJavaScriptの周辺ツールやライブラリなどをいくつか紹介します。
これらは時流に左右されて古くなりやすい情報であるため、本篇からは独立した付録としてまとめています。

## 開発を助けるツール

JavaScriptを使った開発に役立つツールをいくつか紹介します。

### コーディングスタイルの統一

チーム開発において、改行の位置やインデントの幅など、ソースコードのフォーマットは統一する場合がほとんどです。
また、使うべきでない古いイディオムやバグを生みやすい危険なコードの混入を防ぎ、品質を保つことも重要です。
これらのコーディングスタイルの統一は、一貫性を持って持続的におこなうことが重要です。
そのため、ツールを使って自動化することが推奨されます。

#### Prettier

[Prettier][]はJavaScriptをはじめとする多くの言語に対応した汎用的なコードフォーマッターです。
設定ファイルがなくても利用できるため、導入しやすいのが大きな特徴です。

#### ESLint

[ESLint][]はJavaScriptファイル用のLintツールです。
_Lint_ とは、ソースコードファイルを静的解析して不適切なコードやコーディングスタイルに合わないコードを検知する仕組みのことです。
Lintをおこなうことで、チーム内でのコーディングスタイルを機械的に統一できます。

### コードエディター

JavaScriptやHTML、CSSなどのコーディングに適したエディターを選ぶことで、開発の生産性を高められます。

#### VSCode

[VSCode][]はMicrosoft社がオープンソースで開発している無料のコードエディターです。
多くの言語をサポートしており、プラグインによってさまざまな機能を追加できます。

#### Atom

[Atom][]はGitHub社がオープンソースで開発している無料のコードエディターです。
VSCodeと同じようにプラグインによる拡張性が高く、GitHubと連携した機能が特徴です。

### パフォーマンスの改善

WebサイトやWebアプリケーションのパフォーマンスを計測、改善するためのツールを紹介します。

#### PageSpeed Insights

[PageSpeed Insights][]はGoogleが提供するWebパフォーマンス計測ツールです。
計測したいページのURLを入力すると読み込みにかかっている時間や、改善できる項目を提示してくれます。

#### Lighthouse

[Lighthouse][]はGoogleが提供するWebページの分析ツールです。
Webパフォーマンスだけでなく、アクセシビリティやSEOなどの観点からも分析し、そのスコアを表示します。
Chromeブラウザの開発者ツールとして組み込まれていますが、npmでパッケージをインストールすればCLIとしても実行できます。

## JavaScriptの実行プラットフォーム

JavaScriptはWebサイトを作るためだけの言語ではありません。
いまでは多くのプラットフォームを超えた共通言語として、JavaScriptやその周辺のエコシステムは発展しています。
JavaScriptを使ったプログラムを実行するためのいくつかのプラットフォームについて紹介します。

### Webサイトを公開する

WebサイトやWebアプリケーションをインターネットに公開するためには、どこかのWebサーバーでホスティング（公開）する必要があります。
ここではホスティングを機能として提供し、簡単にWebサイトを公開できるいくつかの _ホスティングサービス_ を紹介します。

#### Firebase Hosting

[Firebase Hosting][]は、GoogleのFirebaseプラットフォームが提供するホスティングサービスです。
CLIを使ったシンプルなデプロイと、小規模の利用なら無料で利用できることが特徴です。

#### Netlify

[Netlify][]も無料で利用できるホスティングサービスです。
GitHubやBitBucketのようなGitリポジトリサービスと連携していて、リモートリポジトリにpushするだけで自動的にデプロイできるのが特徴です。

### Node.jsをサーバーレスに実行する

Node.jsのサーバーを用意しなくても関数単位でNode.jsのスクリプトを実行できる環境として、AWS LambdaやGoogle Cloud Functionsのような[Function as a Service][]（FaaS）の実行プラットフォームがあります。
FaaSにJavaScriptの関数をデプロイすると、クラウド上で管理されているNode.jsサーバーにホストされ、それぞれの関数にエンドポイントが割り当てられます。

#### AWS Lambda

[AWS Lambda][]はAmazon Web Services上で提供されるサーバーレスNode.js実行環境です。

#### Google Cloud Functions

[Google Cloud Functions][]はGoogle Cloud Platform上で提供されるサーバーレスNode.js実行環境です


### デスクトップアプリケーションを作る

JavaScriptを使ってWindowsやOSX、Linuxなどのデスクトップ環境で動作するGUIアプリケーションを作ることもできます。


#### Electron

[Electron][]はGitHub社によって開発されているオープンソースのデスクトップアプリケーションフレームワークです。
HTMLやCSS、JavaScriptを使ったWebアプリケーションをChromiumブラウザと一緒にパッケージ化して配布可能な実行ファイルを作成できます。

#### NW.js

[NW.js][]はIntel社によって開発されているオープンソースのデスクトップアプリケーションフレームワークです。
Electronと同様にChromiumブラウザをベースにしたアプリケーションを開発できますが、NW.jsはElectronよりもNode.jsの開発エコシステムに親和性が高いのが特徴です。

[ESLint]: https://eslint.org/
[Prettier]: https://prettier.io/
[stylelint]: https://stylelint.io/

[VSCode]: https://code.visualstudio.com/
[Atom]: https://atom.io/

[PageSpeed Insights]: https://developers.google.com/speed/pagespeed/insights/
[Lighthouse]: https://developers.google.com/web/tools/lighthouse/?hl=ja

[Firebase Hosting]: https://firebase.google.com/products/hosting/?hl=ja
[Netlify]: https://www.netlify.com/

[AWS Lambda]: https://aws.amazon.com/jp/lambda/
[Google Cloud Functions]: https://cloud.google.com/functions/
[Function as a Service]: https://en.wikipedia.org/wiki/Function_as_a_service

[Electron]: https://electronjs.org/
[NW.js]: https://nwjs.io/

