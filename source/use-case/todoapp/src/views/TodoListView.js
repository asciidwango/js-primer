import { element } from "./html-util.js";
export class TodoItemView {
    createElement(todoItem, { onUpdate, onDelete }) {
        // 完了済み or 未完了
        const checkBox = todoItem.completed
            ? element`<li>
<input type="checkbox" class="toggle" checked><s>${todoItem.title}</s></input>
<button class="delete">×</button>
</li>`
            : element`<li>
<input type="checkbox" class="toggle">${todoItem.title}</input>
<button class="delete">×</button>
</li>`;
        checkBox.querySelector("input").addEventListener("change", () => {
            onUpdate({
                id: todoItem.id,
                completed: !todoItem.completed
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
                onUpdate: handlers.onUpdate,
                onDelete: handlers.onDelete
            }));
        });
        return ul;
    }
}
