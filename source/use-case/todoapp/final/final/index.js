import { App } from "./src/App.js";

const app = new App();
window.addEventListener("load", () => {
    const container = document.querySelector("#js-todo-list");
    app.mount(container);
});
window.addEventListener("unload", () => {
    app.release();
});
