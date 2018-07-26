# 2018-07-26 Meeting Notes

- [@azu](https://github.com/azu)
- [@kahei](https://github.com/kahei)
- [@lacolaco](https://github.com/lacolaco)

## アジェンダ

- [2018-07-26 ミーティングアジェンダ · Issue #525 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/525)

----

## ES2018

- azu: ES2018がリリースされた
- kahei: 何か対応が必要になる?
- azu: もう既にふくまれているのであまり問題なし

### 結論

- 特に変更なし

-----

## 非同期処理の進捗
   
- [x] 非同期処理とは #503 
- [x] エラーファーストコールバック #509
- [ ] Promise #524 
- [ ] Async Function
- azu: 非同期処理は今Promiseについてを書いている
- やっぱりちょっとながそう
- 詳細はPromise本に投げるのでまあ書けるとは思う
- Async Functionはどこまでかくのかがちょっと決まってない
- 詳細な仕組みを出すならGeneratorは避けられないから、全体像にとどまるように見える
- 特にユースケースで出てくるわけでもないのであんまり深くは掘り下げにくい感じがする
- 書きそうなことととしては
  - thenの直列処理awaitで書く
  - 並列をpromise.allする例
  - コールバック関数にはasyncをつけないといけない、関数に閉じてるよという説明
  - エラーハンドリング
- laco: Promiseを返す標準な関数があればいいのだけど
- Top level awaitは`import()`を中心にしてる
- azu: ECMAScriptにはないのでdummyFetchという関数でやっている
- laco: aを取得してbを取得するみたいなパターンの表現
- azu: thenの直列とPromise.allの並列はそんなイメージ
- あとはコールバックもasyncをつけないとダメだよという話
- laco: asyncは関数スコープに閉じているという話が必要
- azu: async functionは必ずpromiseを返すという説明のために、async functionだけ(awaitなし)をだすとか?
- laco: それって通常のfunctionとの挙動は違うんでしたっけ?
- azu: 同じはず。async function自体はnew Promiseのコンストラクタと同じで同期的に処理される
- laco: async functionでawaitかreturnするべきかという話もありそう
- azu: イマイチどっちがいいのかわかってないけどasync functionはpromiseを必ず返すという性質
    - voidを返したいかによって違うっぽい

```
async function a(){ return 1 }
a().then(r => console.log("result", r))

async function a(){ await 1 }
a().then(r => console.log("result", r))
```

- azu: あとはasync awaitでのエラーハンドリングぐらいかな
- あんまり詳細な仕組み立ち入るのが難しいかなと思ってる

### 結論

- thenの直列処理awaitで書く
- 並列をpromise.allする例
- コールバック関数にはasyncをつけないといけない、関数に閉じてるよという説明
- エラーハンドリング
- return or awaitについて

----

## 環境の章

- azu: ユースケースはmoduleが終わると環境の章ぐらい?
- laco: yes
- 環境の章のローカルサーバって結局?
- auz: [ `npx @js-primer/local-server` #462 ](https://github.com/asciidwango/js-primer/issues/462)を使う
- laco: なるほど


### 結論

- laco: [2章の序章: 環境ごとのオブジェクト · Issue #267 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/267#issuecomment-389861593)を書く

----

## npmのアップデート

- azu: npmってアップデート通知でるけどあれどうしよう?
- laco: 今はそのバージョンで一度しかでない
- azu: なにかしら注意を入れたほうがいいのかな?
- そんな壊れないから大丈夫なのかな
- laco: 注意を入れても「アップデート通知がでることがあります」としてどう対処するからまかせるとか?
- azu: それで良さそう


### 結論

- [2章の序章: 環境ごとのオブジェクト · Issue #267 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/267#issuecomment-389861593)のnpmには「アップデート通知がでることがあります」という注記を入れる

----


## Issue整理

- laco: Issueを整理しましょう
- 〜整理中〜
- laco: Issueが減った
- azu: 残りは細かいやつなので実際にやりながら閉じていく


----

## 次回


2018年8月24日(金)
