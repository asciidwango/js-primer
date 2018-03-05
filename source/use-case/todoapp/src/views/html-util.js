"use strict";

export function escapeSpecialChars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export function htmlToElement(html) {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content;
}

export class HTML {
    constructor(htmlString) {
        this.element = htmlToElement(htmlString);
    }

    addEventListener(type, handler) {
        this.element.addEventListener(type, handler);
        return this;
    }

    toString() {
        return Array.from(this.element.childNodes, (node) => {
            return node;
        }).join("")
    }
}

/**
 * HTMLを返すタグ関数
 * @return {HTML}
 */
export function html(strings, ...values) {
    const htmlString = strings.reduce((result, string, i) => {
        const value = values[i - 1];
        if (typeof value === "string") {
            return result + escapeSpecialChars(value) + string;
        } else if (value instanceof HTML) {
            return value.toString();
        } else {
            return result + String(value) + string;
        }
    });
    return new HTML(htmlString);
}


export function render(htmlString, container) {
    container.innerHTML = htmlString;
}
