class EventEmitter {
    constructor() {
        this.eventHandlers = [];
    }

    addEventLister(eventHandler) {
        this.eventHandlers.push(eventHandler);
    }

    emit(...args) {
        this.eventHandlers.forEach(handler => {
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
