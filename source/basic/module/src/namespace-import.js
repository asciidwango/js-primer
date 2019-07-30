// すべての名前付きエクスポートをmyModuleオブジェクトとしてまとめてインポートする
import * as myModule from "./my-module.js";
// fooとして名前付きエクスポートされた値にアクセスする
console.log(myModule.foo); // => "foo"
// defaultとしてデフォルトエクスポートされた値にアクセスする
console.log(myModule.default); // => { baz: "baz" }
