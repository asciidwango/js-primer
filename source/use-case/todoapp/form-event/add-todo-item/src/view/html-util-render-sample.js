import { element, render } from "./html-util.js";
// renderの前に、要素をdocument.bodyへ追加する
const oldElement = element`<ul>
    <li>既存の要素</li>
</ul>`;
document.body.appendChild(oldElement);
// 新しい要素を作成する
const newElement = element`<ul>
    <li>新しい要素</li>
</ul>`;
// `newElement`を`document.body`の子要素として追加する
// すでに`document.body`以下にある要素は上書きされる
render(newElement, document.body);
