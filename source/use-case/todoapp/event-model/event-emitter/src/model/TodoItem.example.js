import { TodoItem } from "./TodoItem.js";
const item = new TodoItem({
    title: "未完了のTodoアイテム",
    completed: false
});
const completedItem = new TodoItem({
    title: "完了済みのTodoアイテム",
    completed: true
});
// それぞれの`id`は異なる
console.log(item.id !== completedItem.id); // => true