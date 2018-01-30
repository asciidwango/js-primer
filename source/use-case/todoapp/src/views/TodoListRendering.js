"use strict";
// Rendering Todo List
export class TodoListRendering {
    constructor(containerNode) {
        this.containerNode = containerNode;
    }

    _createTodoElement(todo, toggleComplete) {
        const todoItemList = document.createElement("li");
        const text = document.createTextNode(todo.title);
        const todoItemCheckBox = document.createElement("input");
        todoItemCheckBox.type = "checkbox";
        todoItemCheckBox.checked = todo.isCompleted;
        todoItemCheckBox.addEventListener("change", (event) => {
            const isCompleted = event.target.checked;
            toggleComplete({
                id: todo.id,
                isCompleted
            });
        });
        todoItemList.appendChild(todoItemCheckBox);
        todoItemList.appendChild(text);
        return todoItemList;
    }

    render(todoItemList, { toggleComplete }) {
        const listTags = todoItemList.map(todoItem => {
            return this._createTodoElement(todoItem, toggleComplete);
        });
        const orderListTag = document.createElement("ul");
        listTags.forEach(listTag => orderListTag.appendChild(listTag));
        // clean up
        const range = document.createRange();
        range.selectNodeContents(this.containerNode);
        range.deleteContents();
        // render
        this.containerNode.appendChild(orderListTag);
    }
}
