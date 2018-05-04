import { element } from "./view/html-util.js";

export class App {
    mount(containerElement) {
        const form = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        form.addEventListener("submit", (event) => {
            // 本来のsubmitイベントの動作を止める
            event.preventDefault();
            // Todoアイテム追加の処理を行う
            // Todoアイテムをcontainerに追加する
            const todoItemElement = element`<li>${title}</li>`;
            containerElement.appendChild(todoItemElement);
            // 入力欄を空文字にしてリセットする
            inputElement.value = "";
        });
    }
}
