// LICENSE : MIT
"use strict";
import { TodoListModel } from "./models/TodoListModel.js";
import { TodoListRendering } from "./views/TodoListRendering.js";

// Entry Point
function onLoad() {
    // add event to DOM elements
    const form = document.getElementById("js-form");
    const inputTextArea = document.getElementById("js-form-input");
    const TODOListArea = document.getElementById("js-todo-list");

    const rendering = new TodoListRendering(TODOListArea);
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
        const text = inputTextArea.value;
        addTodo(text);
        inputTextArea.value = "";
    });

    const unbindHandler = todoListModel.onChange(() => {
        const todoItemList = todoListModel.getAllTodoList();
        rendering.render(todoItemList, {
            toggleComplete
        });
    });

    window.addEventListener("unload", unbindHandler);
}

window.addEventListener("load", onLoad);
