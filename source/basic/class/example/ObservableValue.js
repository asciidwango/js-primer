class EventEmitter {
    constructor() {
        this.handlers = [];
    }

    addEventLister(handler) {
        this.handlers.push(handler);
    }

    emit(...args) {
        this.handlers.forEach(handler => {
            handler(...args);
        });
    }

}

class ObservableValue extends EventEmitter {
    constructor(defaultValue) {
        // superは必ず呼ばないといけない
        // この形式は省略できる
        super();

        this._value = defaultValue;
    }

    onChange(handler) {
        this.addEventLister(handler);
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        const prevValue = this._value;
        if (prevValue === newValue) {
            return;
        }
        this._value = newValue;
        this.emit(prevValue, newValue);
    }
}


const observable = new ObservableValue(1);
observable.onChange((prevValue, newValue) => {
    console.log(prevValue); // => 1
    console.log(newValue); // => 2
});
// 新しい値変更する
observable.value = 2;
