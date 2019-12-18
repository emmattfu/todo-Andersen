export default class Observer {
    constructor() {
        this.observers = {}
    }

    subscribe(event, callback) {
        if (!this.observers[event]) {
            this.observers[event] = [];
        }

        this.observers[event].push(callback);
    }

    unsubscribe(event, callback) {
        if (this.observers[event]) {
            this.observers[event] = this.observers[event].filter(obsCallback => obsCallback !== callback);
        }
    }

    next(event, payload) {
        if (!this.observers[event]) {
            console.warn(`This event is not supported, ${event}`);
            return
        }

        this.observers[event].forEach(callback => callback(payload))
    }
}