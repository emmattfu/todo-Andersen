import ListItem from './list-item.js';
import ListInfo from './list-info.js';
import Router from './router.js';
import Store from './store/index.js'


customElements.define('list-item', ListItem);
customElements.define('list-info', ListInfo);

const router = new Router(document.querySelector('#main'));
window.addEventListener('changeRoute', event => router.changeRoute(event.detail.route));

if (localStorage.getItem('token')) {
    Store.dispatch('move', 'todoList')
} else {
    Store.dispatch('move', 'login')
}






