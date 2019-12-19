import store from './store/index.js';


export default class ParentComponent {
    constructor(store, anchor) {
        
        this.anchor = anchor;
        this.superRender = this.render.bind(this)
        console.log(1)
        store.events.subscribe('change', this.superRender)
    }

    onDestroy() {
        store.events.unsubscribe('change', this.superRender);
        this.deleteListeners();
        document.querySelector('#main').innerHTML = '';
    }
}