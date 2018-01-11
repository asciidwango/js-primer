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

const event = new EventEmitter();
// listen
event.addEventLister(() => console.log("Hi"));
event.addEventLister((...args) => console.log("Hello", ...args));
// emit
event.emit("John");
