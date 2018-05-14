import { TodoItem } from "./TodoItem";
import { TodoList } from "./TodoList";
// 新しいTodoリストを作成する
const todoList = new TodoList();
// 現在のTodoアイテム数は0
console.log(todoList.totalCount); // => 0
// Todoリストが変更されたら呼ばれるイベントハンドラを登録する
todoList.onChange(() => {
    console.log("TodoListの状態が変わりました");
});
// 新しいTodoアイテムを追加する
// => `onChange`で登録したイベントハンドラが呼び出される
todoList.addTodo(new TodoItem({
    title: "新しいTodoアイテム",
    completed: false
}));
// Todoリストにアイテムが増える
console.log(todoList.totalCount); // => 1;