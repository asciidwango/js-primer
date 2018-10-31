import { EventEmitter } from "./EventEmitter.js";
const event = new EventEmitter();
// イベントリスナー（コールバック関数）を登録
event.addEventLister("test-event", () => console.log("One!"));
event.addEventLister("test-event", () => console.log("Two!"));
// コールバック関数をまとめて呼びだす
event.emit("test-event");
// コールバック関数がそれぞれ呼び出し、コンソールには次のように出力される
// "One!"
// "Two!"