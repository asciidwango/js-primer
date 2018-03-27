import { EventEmitter } from "../EventEmitter.js";

// model
export class TodoList extends EventEmitter {
    /**
     * @param {TodoItem[]} items
     */
    constructor(items) {
        super();
        this.items = items;
    }

    /**
     * 表示できるTodoItemの配列を返す
     * @returns {TodoItem[]}
     */
    getAllTodoItems() {
        return this.items;
    }

    /**
     * TodoListの状態が更新されたときに呼び出されるハンドラを登録する
     * @param {Function} handler
     * @returns {Function}
     */
    onChange(handler) {
        this.on("change", handler);
        return () => {
            this.off("change", handler);
        };
    }

    emitChange() {
        this.emit("change");
    }

    addTodo(todo) {
        this.items.push(todo);
        this.emitChange();
    }

    /**
     * 指定したidのTodoのcompletedを更新する
     * @param {string} id
     * @param {boolean} completed
     */
    updateTodoCompleted({ id, completed }) {
        // state change
        const todoItem = this.items.find(todo => todo.id === id);
        if (!todoItem) {
            return;
        }
        todoItem.completed = completed;
        this.emitChange();
    }

    /**
     * 指定したidのTODOを削除する
     * @param {string} id
     */
    deleteTodo({ id }) {
        this.items = this.items.filter(todo => {
            return todo.id !== id;
        });
        this.emitChange();
    }
}
