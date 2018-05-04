export class App {
    mount(containerElement) {
        const form = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        form.addEventListener("submit", (event) => {
            // 本来のsubmitイベントの動作を止める
            event.preventDefault();
            console.log(`入力欄の値: ${inputElement.value}`);
        });
    }
}
