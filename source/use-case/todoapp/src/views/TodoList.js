"use strict";
import { html } from "./html-util.js";

export class TodoListItem {
    html(todoItem, { onChange: onToggle, onDelete }) {
        // 完了済み or 未完了
        const checkBox = todoItem.completed
            ? html`<li>
<input type="checkbox" checked><s>${todoItem.title}</s></input>
<button>[削除]</button>
</li>`
            : html`<li>
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

export class TodoList {
    html(todoItemList, handlers) {
        const ul = html`<ul />`;
        todoItemList.forEach(todoItem => {
            const item = new TodoListItem();
            ul.appendChild(item.html(todoItem, {
                onToggle: handlers.onToggle,
                onDelete: handlers.onDelete
            }));
        });
        return ul;
    }
}
