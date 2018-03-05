// LICENSE : MIT
"use strict";
import { render } from "./views/html-util.js";
import { TodoList } from "./views/TodoList.js";
import { TodoListModel } from "./models/TodoListModel.js";

// Entry Point
function onLoad() {
    // add event to DOM elements
    const form = document.getElementById("js-form");
    const inputElement = document.getElementById("js-form-input");
    const todoListElement = document.getElementById("js-todo-list");

    const rendering = new TodoList();
    const todoListModel = new TodoListModel();
    const toggleComplete = ({ id, isCompleted }) => {
        todoListModel.changeComplete({ id, isCompleted });
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
        const text = inputElement.value;
        addTodo(text);
        inputElement.value = "";
    });

    const unbindHandler = todoListModel.onChange(() => {
        const todoItemList = todoListModel.getAllTodoList();
        const html = rendering.html(todoItemList, {
            toggleComplete
        });
        render(html, todoListElement);
    });

    window.addEventListener("unload", unbindHandler);
}

window.addEventListener("load", onLoad);
