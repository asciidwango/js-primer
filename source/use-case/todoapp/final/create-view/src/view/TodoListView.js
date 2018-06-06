// MIT © 2018 azu
import { element } from "./html-util.js";
import { TodoItemView } from "./TodoItemView.js";

export class TodoListView {
    /**
     * `todoItems`に対応するTodoリストのHTML要素を作成して返す
     * @param {TodoItemModel[]} todoItems
     * @param {function({id:string, completed: boolean})} onUpdateTodo チェックボックスが更新されたときに呼ばれるコールバック関数
     * @param {function({id:string)}} onDeleteTodo 削除ボタンがクリックされたときに呼ばれるコールバック関数
     * @returns {HTMLElement}
     */
    createElement(todoItems, { onUpdateTodo, onDeleteTodo }) {
        const todoListElement = element`<ul />`;
        // todoItemsは引数として受け取る
        todoItems.forEach(todoItem => {
            const todoItemView = new TodoItemView();
            // todoItemに対応したHTML要素を作成する
            const todoItemElement = todoItemView.createElement(todoItem, {
                onDeleteTodo,
                onUpdateTodo
            });
            todoListElement.appendChild(todoItemElement)
        });
        // todoListElementを返す
        return todoListElement;
    }
}
