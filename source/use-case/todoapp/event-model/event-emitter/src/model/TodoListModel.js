import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
    /**
     * @param {TodoItemModel[]} [items] 初期アイテム一覧（デフォルトは空の配列）
     */
    constructor(items = []) {
        super();
        this.items = items;
    }

    /**
     * TodoItemの合計数を返す
     * @returns {number}
     */
    get totalCount() {
        return this.items.length;
    }

    /**
     * 表示できるTodoItemの配列を返す
     * @returns {TodoItemModel[]}
     */
    getTodoItems() {
        return this.items;
    }

    /**
     * TodoListの状態が更新されたときに呼び出されるハンドラを登録する
     * @param {Function} handler
     * @returns {Function} イベントハンドラの登録を解除する関数を返す
     */
    onChange(handler) {
        this.addEventLister("change", handler);
        return () => {
            this.removeEventLister("change", handler);
        };
    }

    /**
     * 状態が変更されたときに呼ぶ。登録済みのハンドラを呼び出す
     */
    emitChange() {
        this.emit("change");
    }

    /**
     * TodoItemを追加する
     * @param {TodoItemModel} todoItem
     */
    addTodo(todoItem) {
        this.items.push(todoItem);
        this.emitChange();
    }
}
