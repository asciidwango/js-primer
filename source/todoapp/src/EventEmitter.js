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
        if (typeof this._handlers[type] === 'undefined') {
            this._handlers[type] = [];
        }

        this._handlers[type].push(handler);
    }

    emit(type, data) {
        var handlers = this._handlers[type] || [];
        for (var i = 0; i < handlers.length; i++) {
            var handler = handlers[i];
            handler.call(this, data);
        }
    }

    off(type, handler) {
        var handlers = this._handlers[type] || [];
        for (var i = 0; i < handlers.length; i++) {
            var ownHandler = handlers[i];
            if (ownHandler === handler) {
                handlers.splice(i, 1);
            }
        }
    }
}
