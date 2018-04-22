import { render } from "./views/html-util.js";
import { TodoListView } from "./views/TodoListView.js";
import { TodoItem } from "./models/TodoItem.js";
import { TodoList } from "./models/TodoList.js";

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
     * @param {string} id
     * @param {boolean} completed
     */
    handleUpdate({ id, completed }) {
        this.todoListModel.updateTodo({ id, completed });
    };

    /**
     * Todoを削除時に呼ばれるハンドラ
     * @param {string} id
     */
    handleDelete({ id }) {
        this.todoListModel.deleteTodo({ id });
    };

    /**
     * `containerElement`に対してTodoListを描画する
     * @param {HTMLElement} containerElement
     */
    render(containerElement) {
        const form = document.getElementById("js-form");
        const inputElement = document.getElementById("js-form-input");
        form.addEventListener("submit", (event) => {
            // prevent submit action
            event.preventDefault();
            // try to add
            this.handleAdd(inputElement.value);
            // clear text
            inputElement.value = "";
        });

        this.releaseHandler = this.todoListModel.onChange(() => {
            const todoItemList = this.todoListModel.getAllTodoItems();
            const todoListElement = this.todoListView.createElement(todoItemList, {
                // コールバック関数の`this`が変化しないように`bind`して`this`をAppのインスタンスに固定する
                onUpdate: this.handleUpdate.bind(this),
                onDelete: this.handleDelete.bind(this)
            });
            render(todoListElement, containerElement);
        });
    }

    release() {
        if (typeof this.releaseHandler === "function") {
            this.releaseHandler();
        }
    }
}
