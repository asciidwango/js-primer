import { element } from "./view/html-util.js";

export class App {
    mount(containerElement) {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        formElement.addEventListener("submit", (event) => {
            // 本来のsubmitイベントの動作を止める
            event.preventDefault();
            // 追加するTodoアイテムの要素を作成する
            const title = inputElement.value;
            const todoItemElement = element`<li>
<!-- Todoアイテムの完了状態を表すチェックボックス -->
<input type="checkbox" class="toggle">${title}addEventListener</input>
<!-- 削除ボタン-->
<button class="delete">x</button>
</li>`;
            // Todoアイテムをcontainerに追加する
            containerElement.appendChild(todoItemElement);
            // 入力欄を空文字にしてリセットする
            inputElement.value = "";
        });
    }
}
