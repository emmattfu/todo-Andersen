import store from './store/index.js';
import DB from './DB-worker.js';

export default class ParentComponent {
    constructor(store, anchor) {
        this.onInit()
        this.anchor = anchor;
        this.superRender = this.render.bind(this)
        store.events.subscribe('change', this.superRender)
      
    }

    onDestroy() {
        store.events.unsubscribe('change', this.superRender);
        this.deleteListeners();
        document.querySelector('#main').innerHTML = '';
    }
}