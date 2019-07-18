// すべての名前付きエクスポートをmyModuleオブジェクトとしてまとめてインポートする
import * as myModule from "./myModule.js";
// fooとして名前付きエクスポートされた値にアクセスする
console.log(myModule.foo);
// defaultとしてデフォルトエクスポートされた値にアクセスする
console.log(myModule.default);
