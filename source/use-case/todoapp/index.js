import { App } from "./src/App.js";

const app = new App();
window.addEventListener("load", () => {
    const container = document.getElementById("js-todo-list");
    app.render(container);
});
window.addEventListener("unload", () => {
    app.release();
});
