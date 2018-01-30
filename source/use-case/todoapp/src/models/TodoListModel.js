// LICENSE : MIT
"use strict";
import { EventEmitter } from "../EventEmitter.js";
// unique id
let todoIdx = 0;

export class TodoItemModel {
    constructor({ title, completed = false } = {}) {
        this.id = todoIdx++;
        this.title = title;
        this.completed = completed;
    }

    get isCompleted() {
        return this.completed;
    }
}

// model
export class TodoListModel extends EventEmitter {
    constructor(todoList = []) {
        super();
        this.todoList = todoList.map(todoItem => new TodoItemModel(todoItem));
    }

    getAllTodoList() {
        return this.todoList;
    }

    onChange(handler) {
        this.on("change", handler);
        return () => {
            this.off("change", handler);
        };
    }

    changeComplete({ id, isCompleted }) {
        // state change
        const todoItem = this.todoList.find(todo => todo.id === id);
        if (!todoItem) {
            return;
        }
        todoItem.completed = isCompleted;
        this.emit("change");
    }

    addTodo(todo) {
        this.todoList.push(new TodoItemModel(todo));
        // emit change
        this.emit("change");
    }
}
