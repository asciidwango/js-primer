"use strict";
const fn = function() {
    return this;
};
/*
    Top-Level functionにおける`this`。
    この`fn`はどのオブジェクトにも所属していないため`this`はundefinedとなる
 */
console.log(fn()); // => undefined
