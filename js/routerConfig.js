import ListComponent from './ListComponent.js';
import LoginComponent from './LoginComponent.js';
import Store from './store/index.js';

export default {
    'login': {
        'data': {'route': 'login'},
        'url': 'login',
        'component': LoginComponent,
        
    },
    'todoList': {
        'data': {'route': 'todoList'},
        'url': 'todoList',
        'component': ListComponent
    }
}