// LICENSE : MIT
"use strict";
/*
    Simple EventEmitter
 */
export default class EventEmitter {
    constructor() {
        this._handlers = {};
    }

    on(type, handler) {
        if (typeof this._handlers[type] === "undefined") {
            this._handlers[type] = [];
        }

        this._handlers[type].push(handler);
    }

    emit(type, data) {
        const handlers = this._handlers[type] || [];
        for (let i = 0; i < handlers.length; i++) {
            const handler = handlers[i];
            handler.call(this, data);
        }
    }

    off(type, handler) {
        const handlers = this._handlers[type] || [];
        for (let i = 0; i < handlers.length; i++) {
            const ownHandler = handlers[i];
            if (ownHandler === handler) {
                handlers.splice(i, 1);
            }
        }
    }
}
