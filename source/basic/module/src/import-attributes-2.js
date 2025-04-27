// 静的インポート
import value from "./data.json" with { type: "json" };
// 再エクスポート
export { default as data } from "./data.json" with { type: "json" };
// 動的インポート
const mod = import("./data.json", { with: { type: "json" } });
console.log(mod.default.age); // => 30
