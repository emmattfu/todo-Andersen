import Observer from './observer.js';

export default class Store {
    constructor(redusers) {
        this.redusers = redusers
        this.state = {
            todos: [],
            userInfo: {},
        }
        this.events = new Observer();

    }

    dispatch(actionType, payload) {
        if (this.redusers[actionType]) {
            this.state = this.redusers[actionType](payload, this.state);
            this.events.next('change', this.state)
        }
    }
}