import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App {
    #todoListModel = new TodoListModel();

    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");
        //! [checkbox]
        this.#todoListModel.onChange(() => {
            const todoListElement = element`<ul></ul>`;
            const todoItems = this.#todoListModel.getTodoItems();
            todoItems.forEach(item => {
                // 完了済みならchecked属性をつけ、未完了ならchecked属性を外す
                // input要素にはcheckboxクラスをつける
                const todoItemElement = item.completed
                    ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s></li>`
                    : element`<li><input type="checkbox" class="checkbox">${item.title}</li>`;
                todoListElement.appendChild(todoItemElement);
            });
            render(todoListElement, containerElement);
            todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
        });
        //! [checkbox]
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this.#todoListModel.addTodo(new TodoItemModel({
                title: inputElement.value,
                completed: false
            }));
            inputElement.value = "";
        });
    }
}
