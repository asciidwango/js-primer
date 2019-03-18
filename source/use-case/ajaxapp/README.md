---
author: laco 
description: "ウェブブラウザ上でAjax通信をするユースケースとして、GitHubのユーザーIDからプロフィール情報を取得するアプリケーションを作成しながら、非同期処理について紹介します。"
---

# ユースケース: Ajax通信 {#usecase-ajax}

ここではウェブブラウザ上でAjax通信をするユースケースとして、GitHubのユーザーIDからプロフィール情報を取得するアプリケーションを作成します。

作成するアプリケーションは次の要件を満たすものとします。

- GitHubのユーザーIDをテキストボックスに入力できる
- 入力されたユーザーIDを元にGitHubからユーザー情報を取得する
- 取得したユーザー情報をアプリケーション上で表示する

## 目次 {#summary}

### [エントリポイント](./entrypoint/README.md) {#entrypoint}

アプリケーションの中で一番最初に呼び出されるエントリポイントを作成します。

### [HTTP通信](./xhr/README.md) {#xhr}

XMLHttpRequestを使ってHTTP通信をおこない、GitHubのAPIを呼び出します。

### [データを表示する](./display/README.md) {#display}

XMLHttpRequestを使って取得したデータをもとにHTMLを組み立ててブラウザ上で表示します。

### [Promiseを活用する](./promise/README.md) {#promise}

Promiseを活用し、ソースコードの整理とエラーハンドリングを行います。
