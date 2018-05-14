import { element, render } from "./view/html-util.js";
import { TodoList } from "./model/TodoList.js";
import { TodoItem } from "./model/TodoItem.js";

export class App {
    constructor() {
        // TodoListの初期化
        this.todoList = new TodoList();
    }
    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");
        formElement.addEventListener("submit", (event) => {
            // 本来のsubmitイベントの動作を止める
            event.preventDefault();
            // 新しいTodoItemをTodoListへ追加する
            this.todoList.addTodo(new TodoItem({
                title: inputElement.value,
                completed: false
            }));
            // 入力欄を空文字にしてリセットする
            inputElement.value = "";
        });
        // TodoListの状態が更新されたら表示を更新する
        this.todoListModel.onChange(() => {
            // TodoListをまとめるList要素
            const todoListElement = element`<ul />`;
            // それぞれのTodoItem用をtodoListElement以下へ追加する
            const todoItems = this.todoListModel.getTodoItems();
            todoItems.forEach(item => {
                const todoItemElement = element`<li>${item.title}</li>`;
                todoListElement.appendChild(todoItemElement);
            });
            // containerElementの中身をtodoListElementで上書きする
            render(todoListElement, containerElement);
            // アイテム数の表示を更新
            todoCountElement.textContent = `Todoアイテム数: ${this.todoListModel.totalCount}`;
        });
    }
}
