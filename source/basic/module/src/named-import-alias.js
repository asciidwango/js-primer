// fooとして名前付きエクスポートされた変数をmyFooとしてインポートする
import { foo as myFoo } from "./my-module.js";
console.log(myFoo); // => "foo"
