"use strict";
import { html } from "./html-util.js";

export class TodoListItem {
    html(todoItem, handlers) {
        const checked = todoItem.completed ? "checked" : "";
        const checkBox = html`
<input type="checkbox" ${checked}>${todoItem.title}</input>
`.addEventListener("change", (event) => {
            console.log(event);
        });
        return html`<li>
    ${checkBox}
    </li>`
    }
}

export class TodoList {
    html(todoItemList, handlers) {
        const listTags = todoItemList.map(todoItem => {
            const item = new TodoListItem();
            return item.html(todoItem, handlers);
        });

        return html`
            <ul>
            ${listTags}
            </ul>
        `;
    }
}
