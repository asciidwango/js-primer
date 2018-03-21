"use strict";
import { element } from "./html-util.js";

export class TodoItemView {
    createElement(todoItem, { onToggle, onDelete }) {
        // 完了済み or 未完了
        const checkBox = todoItem.completed
            ? element`<li>
<input type="checkbox" checked><s>${todoItem.title}</s></input>
<button>[削除]</button>
</li>`
            : element`<li>
<input type="checkbox">${todoItem.title}</input>
<button>[削除]</button>
</li>`;
        checkBox.querySelector("input").addEventListener("change", () => {
            onToggle({
                id: todoItem.id,
                isCompleted: !todoItem.completed
            });
        });
        checkBox.querySelector("button").addEventListener("click", () => {
            onDelete({
                id: todoItem.id
            });
        });
        return checkBox;
    }
}

export class TodoListView {
    createElement(todoItemList, handlers) {
        const ul = element`<ul />`;
        todoItemList.forEach(todoItem => {
            const item = new TodoItemView();
            ul.appendChild(item.createElement(todoItem, {
                onToggle: handlers.onToggle,
                onDelete: handlers.onDelete
            }));
        });
        return ul;
    }
}
