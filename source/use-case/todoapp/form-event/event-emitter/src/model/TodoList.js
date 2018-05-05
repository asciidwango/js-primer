import { EventEmitter } from "../EventEmitter.js";

export class TodoList extends EventEmitter {
    constructor(items = []) {
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

    /**
     * Todoを追加する
     * @param {TodoItem} todo
     */
    addTodo(todo) {
        this.items.push(todo);
        this.emitChange();
    }
}
