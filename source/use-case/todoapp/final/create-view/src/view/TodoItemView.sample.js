import { render } from "./html-util.js";
import { TodoItemModel } from "../model/TodoItemModel.js";
import { TodoItemView } from "./TodoItemView.js";

// TodoItemViewをインスタンス化
const todoItemView = new TodoItemView();
// 対応するTodoItemModelを作成する
const todoItemModel = new TodoItemModel({
    title: "あたらしいTodo",
    completed: false
});
// TodoItemModelからHTML要素を作成する
const todoItemElement = todoItemView.createElement(todoItemModel, {
    onUpdateTodo: () => {
        console.log("チェックボックスが更新されたときに呼ばれるリスナー関数");
    },
    onDeleteTodo: () => {
        console.log("削除ボタンがクリックされたときに呼ばれるリスナー関数");
    }
});
render(todoItemElement, document.body); // <li>要素をdocument.bodyへレンダリング
