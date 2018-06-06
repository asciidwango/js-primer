import { element } from "./html-util.js";

export class TodoItemView {
    createElement(todoItem, { onUpdate, onDelete }) {
        const checkBox = todoItem.completed
            ? element`<li>
<input type="checkbox" checked><s>${todoItem.title}</s></input>
<button class="delete">×</button>
</li>`
            : element`<li>
<input type="checkbox">${todoItem.title}</input>
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
    createElement(todoItems, handlers) {
        const listElement = element`<ul />`;
        todoItems.forEach(todoItem => {
            const item = new TodoItemView();
            const itemElement = item.createElement(todoItem, {
                onUpdate: handlers.onUpdate,
                onDelete: handlers.onDelete
            });
            listElement.appendChild(itemElement);
        });
        return listElement;
    }
}
