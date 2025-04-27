// [ES2025] JSONモジュールをインポート
import userData from "./data.json" with { type: "json" };
console.log(userData.name); // => "John"
console.log(userData.age); // => 30
