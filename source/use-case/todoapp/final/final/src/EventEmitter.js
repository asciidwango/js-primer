export class EventEmitter {
    constructor() {
        // 登録する [イベント名, Set(ハンドラ)] を管理するMap
        this._handlers = new Map();
    }

    /**
     * 指定したイベントが実行されたときに呼び出されるハンドラを登録する
     * @param {string} type イベント名
     * @param {Function} handler イベントハンドラ
     */
    addEventLister(type, handler) {
        // 指定したイベントに対応するSetを作成しハンドラを登録する
        if (!this._handlers.has(type)) {
            this._handlers.set(type, new Set());
        }
        const handlerSet = this._handlers.get(type);
        handlerSet.add(handler);
    }

    /**
     * 指定したイベントを発火する
     * @param {string} type イベント名
     */
    emit(type) {
        // 指定したイベントに対応するSetを取り出し、すべてのハンドラを呼び出す
        const handlerSet = this._handlers.get(type);
        if (!handlerSet) {
            return;
        }
        handlerSet.forEach(handler => {
            handler.call(this);
        });
    }

    /**
     * 指定したイベントに監視するハンドラを解除する
     * @param {string} type イベント名
     * @param {Function} handler イベントハンドラ
     */
    removeEventLister(type, handler) {
        // 指定したイベントに対応するSetを取り出し、該当するハンドラを削除する
        const handlerSet = this._handlers.get(type);
        if (!handlerSet) {
            return;
        }
        handlerSet.forEach(ownHandler => {
            if (ownHandler === handler) {
                handlerSet.delete(handler);
            }
        });
    }
}
