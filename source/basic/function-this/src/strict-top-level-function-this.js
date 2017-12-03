"use strict";
const fn = () => {
    return this;
};
/*
   この`this`はTopLevel(enclosing environment)に書いた`this`と同じ扱いとなる
   Strict modeが`this`をundefinedのままにするのは、
   `this`がundefinedのときにグローバルオブジェクト変換するという挙動を防止しているだけ。
   グローバルスコープにおける`this`は元々グローバルオブジェクトを参照する
 */
console.log(fn()); // => global
