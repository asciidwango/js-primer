// LICENSE : MIT
"use strict";
import { render } from "./views/html-util.js";
import { TodoList } from "./views/TodoList.js";
import { TodoListModel } from "./models/TodoListModel.js";

class App {
    mount() {
        const form = document.getElementById("js-form");
        const inputElement = document.getElementById("js-form-input");
        const todoListElement = document.getElementById("js-todo-list");
        const rendering = new TodoList();
        const todoListModel = new TodoListModel();
        const toggleComplete = ({ id, isCompleted }) => {
            todoListModel.changeComplete({ id, isCompleted });
        };
        const deleteTodo = ({ id }) => {
            todoListModel.deleteTodo({ id });
        };
        const addTodo = (title) => {
            if (title.length > 0) {
                todoListModel.addTodo({ title });
            }
        };
        form.addEventListener("submit", (event) => {
            // prevent submit action
            event.preventDefault();
            // try to add
            addTodo(inputElement.value);
            // clear text
            inputElement.value = "";
        });

        this.unbindHandler = todoListModel.onChange(() => {
            const todoItemList = todoListModel.getAllTodoList();
            const html = rendering.html(todoItemList, {
                onToggle: toggleComplete,
                onDelete: deleteTodo
            });
            render(html, todoListElement);
        });
    }

    unmount() {
        if (typeof this.unbindHandler === "function") {
            this.unbindHandler();
        }
    }
}

// entry point
const app = new App();
window.addEventListener("load", app.mount);
window.addEventListener("unload", app.unmount);
