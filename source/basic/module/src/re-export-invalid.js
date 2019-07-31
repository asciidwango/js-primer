// ./my-module.jsのすべての名前付きエクスポートを再エクスポートする
export * from "./my-module.js";
// ./my-module.jsの名前付きエクスポートを選んで再エクスポートする
export { foo, bar } from "./my-module.js";
// ./my-module.jsの名前付きエクスポートにエイリアスをつけて再エクスポートする
export { foo as myModuleFoo, bar as myModuleBar } from "./my-module.js";
// ./my-module.jsのデフォルトエクスポートをデフォルトエクスポートとして再エクスポートする
export { default } from "./my-module.js";
// ./my-module.jsのデフォルトエクスポートを名前付きエクスポートとして再エクスポートする
export { default as myModuleDefault } from "./my-module.js";
// ./my-module.jsの名前付きエクスポートをデフォルトエクスポートとして再エクスポートする
export { foo as default } from "./my-module.js";
