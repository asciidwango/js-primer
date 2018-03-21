// LICENSE : MIT
"use strict";
import { render } from "./views/html-util.js";
import { TodoListView } from "./views/TodoListView.js";
import { TodoItem } from "./models/TodoItem.js";
import { TodoList } from "./models/TodoList.js";

class App {
    mount() {
        const form = document.getElementById("js-form");
        const inputElement = document.getElementById("js-form-input");
        const todoListRoot = document.getElementById("js-todo-list");
        const todoListView = new TodoListView();
        const todoListModel = new TodoList();
        const toggleComplete = ({ id, isCompleted }) => {
            todoListModel.changeComplete({ id, isCompleted });
        };
        const onDeleteTodo = ({ id }) => {
            todoListModel.deleteTodo({ id });
        };
        const onAddTodo = (title) => {
            if (title.length > 0) {
                todoListModel.addTodo(new TodoItem({ title }));
            }
        };
        form.addEventListener("submit", (event) => {
            // prevent submit action
            event.preventDefault();
            // try to add
            onAddTodo(inputElement.value);
            // clear text
            inputElement.value = "";
        });

        this.unbindHandler = todoListModel.onChange(() => {
            const todoItemList = todoListModel.getAllTodoList();
            const todoListElement = todoListView.createElement(todoItemList, {
                onToggle: toggleComplete,
                onDelete: onDeleteTodo
            });
            render(todoListElement, todoListRoot);
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
