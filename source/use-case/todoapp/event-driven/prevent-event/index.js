import { App } from "./src/App.js";
const app = new App();
const container = document.querySelector("#js-todo-list");
app.mount(container);
