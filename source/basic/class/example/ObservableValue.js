class EventEmitter {
    constructor() {
        this.eventHandlers = [];
    }

    addEventLister(handler) {
        this.eventHandlers.push(handler);
    }

    emit(...args) {
        this.eventHandlers.forEach(handler => {
            handler(...args);
        });
    }
}

class ObservableValue extends EventEmitter {
    constructor(...args) {
        super(...args);
    }

    onChange(onChangeHandler) {
        this.addEventLister(onChangeHandler);
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


const observable = new ObservableValue();
observable.onChange((prevValue, newValue) => {
    console.log(prevValue); // => undefined
    console.log(newValue); // => 2
});
// 新しい値変更する
observable.value = 2;
console.log(observable.value); // => 2
