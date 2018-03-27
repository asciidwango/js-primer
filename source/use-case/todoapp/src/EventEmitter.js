/*
 *  Simple EventEmitter
 */
export class EventEmitter {
    constructor() {
        this._handlers = new Map();
    }

    on(type, handler) {
        if (!this._handlers.has(type)) {
            this._handlers.set(type, new Set());
        }
        const handlerSet = this._handlers.get(type);
        handlerSet.add(handler);
    }

    emit(type, payload) {
        const handlerSet = this._handlers.get(type);
        handlerSet.forEach(handler => {
            handler.call(this, payload);
        });
    }

    off(type, handler) {
        const handlerSet = this._handlers.get(type);
        handlerSet.forEach(ownHandler => {
            if (ownHandler === handler) {
                handlerSet.delete(handler);
            }
        });
    }
}
