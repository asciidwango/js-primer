// LICENSE : MIT
"use strict";
import { EventEmitter } from "../EventEmitter.js";

// model
export class TodoList extends EventEmitter {
    constructor(todoList = []) {
        super();
        this.todoList = todoList;
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

    emitChange() {
        this.emit("change");
    }

    changeComplete({ id, isCompleted }) {
        // state change
        const todoItem = this.todoList.find(todo => todo.id === id);
        if (!todoItem) {
            return;
        }
        todoItem.completed = isCompleted;
        this.emitChange();
    }

    addTodo(todo) {
        this.todoList.push(todo);
        this.emitChange();
    }

    deleteTodo({ id }) {
        this.todoList = this.todoList.filter(todoItem => {
            return todoItem.id !== id;
        });
        this.emitChange();
    }
}
