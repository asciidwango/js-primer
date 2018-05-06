import { render } from "./view/html-util.js";
import { TodoListView } from "./view/TodoListView.js";
import { TodoItem } from "./model/TodoItem.js";
import { TodoList } from "./model/TodoList.js";

export class App {
    constructor() {
        // ViewとModelを初期化する
        this.todoListView = new TodoListView();
        this.todoListModel = new TodoList([]);
    }

    /**
     * Todoを追加時に呼ばれるハンドラ
     * @param {string} title
     */
    handleAdd(title) {
        if (title.length === 0) {
            return;
        }
        this.todoListModel.addTodo(new TodoItem({ title, completed: false }));
    };

    /**
     * Todoの状態を更新時に呼ばれるハンドラ
     * @param {number} id
     * @param {boolean} completed
     */
    handleUpdate({ id, completed }) {
        this.todoListModel.updateTodo({ id, completed });
    };

    /**
     * Todoを削除時に呼ばれるハンドラ
     * @param {number} id
     */
    handleDelete({ id }) {
        this.todoListModel.deleteTodo({ id });
    };

    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const todoCountElement = document.querySelector("#js-todo-count");
        const todoListContainerElement = document.querySelector("#js-todo-list");
        formElement.addEventListener("submit", (event) => {
            // prevent submit action
            event.preventDefault();
            // try to add
            this.handleAdd(inputElement.value);
            // clear text
            inputElement.value = "";
        });

        this.releaseHandler = this.todoListModel.onChange(() => {
            const todoItems = this.todoListModel.getAllTodoItems();
            const todoListElement = this.todoListView.createElement(todoItems, {
                // コールバック関数の`this`が変化しないように`bind`して`this`をAppのインスタンスに固定する
                onUpdate: this.handleUpdate.bind(this),
                onDelete: this.handleDelete.bind(this)
            });
            render(todoListElement, todoListContainerElement);
            // アイテム数の表示を更新
            todoCountElement.textContent = `Todoアイテム数: ${this.todoListModel.totalCount}`;
        });
    }

    release() {
        if (typeof this.releaseHandler === "function") {
            this.releaseHandler();
        }
    }
}
