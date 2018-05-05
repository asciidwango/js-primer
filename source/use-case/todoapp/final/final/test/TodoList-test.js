// LICENSE : MIT
"use strict";
const assert = require("assert");
import { TodoItem } from "../src/model/TodoItem.js";
import { TodoList } from "../src/model/TodoList.js";

const assertTodo = (todo) => {
    assert.ok(typeof todo.id === "number");
    assert.ok(typeof todo.title === "string");
    assert.ok(todo.title.length > 0);
    assert.ok(typeof todo.completed === "boolean");
};
describe("TodoList", function() {
    describe("#add", () => {
        it("should add new Todo Item", () => {
            const list = new TodoList();
            list.addTodo(new TodoItem({ title: "test", completed: false }));
            const todoItems = list.getAllTodoItems();
            assert.strictEqual(todoItems.length, 1);
            assertTodo(todoItems[0]);
        });
    });
    describe("#update", () => {
        it("should update new Todo Item", () => {
            const list = new TodoList();
            const todoItem = new TodoItem({ title: "test", completed: false });
            list.addTodo(todoItem);
            list.updateTodo({ id: todoItem.id, completed: true });
            const todoItems = list.getAllTodoItems();
            assert.strictEqual(todoItems[0].completed, true);
        });
    });
    describe("#delete", () => {
        it("should remove new Todo Item", () => {
            const list = new TodoList();
            const todoItem = new TodoItem({ title: "test", completed: false });
            list.addTodo(todoItem);
            list.deleteTodo({ id: todoItem.id });
            const todoItems = list.getAllTodoItems();
            assert.ok(todoItems.length === 0);
        });
    });
});
