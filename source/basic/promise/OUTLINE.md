# Promise

## 目的

- Promiseというオブジェクトについてを理解する
- Promiseによる非同期処理を理解する
- コールバック関数との違いについて
- async/awaitについての使い方を紹介する
- for await? generator?

## 非同期処理

- ECMAScriptには非同期処理を行うコールバックを取るものがない
- `setTimeout`関数を利用する

## 紹介する項目

- `new Promise`
- `Promise.resolve`
- `Promise.reject`
- `Promise#then`
- `Promise#catch`
- `Promise#finally`
- promiseオブジェクト
- `Promise.all`
- `Promise.race`
- async function
    - 常にpromiseオブジェクトを返す
    - await operator

## 紹介しない項目

- Thenable
- Promise/A+
- jQuery
- Cancal/AbortController