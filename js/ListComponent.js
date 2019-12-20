import Store from "./store/index.js";
import ParentComponent from './ParentComponent.js';
import DB from './DB-worker.js';
import Modal from './modal.js'


export default class ListComponent extends ParentComponent {
    constructor(anchor) {
        super(Store, anchor)
        this.setupListeners()
        this.filter = 'all';
    }

    onInit() {
        DB.checkAuth(localStorage.getItem('token'))
        document.querySelector('.logout').classList.remove('d-none')
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if (this.filter === btn.getAttribute('data')) {
                btn.classList.add('active')
            } else {
                btn.classList.remove('active')
            }
        })

        
    }

    deleteListeners() {
        this.anchor.removeEventListener('submit', this.addTodo)
        document.querySelector('.logout').removeEventListener('click', this.logout)
        window.removeEventListener('click', this.changeStatus)
    }

    render() {
     
        document.querySelector('#main').innerHTML = `
        <div class="todo-list">
        <div class="container">
            <div class="todo-list-inner">
                <div class="todo">
                    <h2 class="greating">Lets do them all!</h2>
                    <form class="add-todo-form">
                        <input class="form-control big" type="text" placeholder="New task">
                        <input class="form-control todo-form-submit" type="submit" value="Add task">
                    </form>
                    <button class="filter-btn" data="all">All todos</button>
                    <button class="filter-btn" data="finished">Finished</button>
                    <button class="filter-btn" data="in-progres">In progres</button>
                    ${Store.state.todos.length > 0 && this.filter === 'all' ? Store.state.todos.map(todo => `<list-item text="${todo.text}" completed="${todo.completed}" id="${todo._id}">
                       <span slot="done"><i class="far fa-check-circle done"></i></span>
                       <span slot="delete"><i class="far fa-times-circle delete"></i></i></span>
                   </list-item>`).reverse() :  
                   Store.state.todos.length > 0 && this.filter === 'finished' ?
                   Store.state.todos.filter(todo => todo.completed).map(todo => `<list-item text="${todo.text}" completed="${todo.completed}" id="${todo._id}">
                   <span slot="done"><i class="far fa-check-circle done"></i></span>
                   <span slot="delete"><i class="far fa-times-circle delete"></i></i></span>
                   </list-item>`).reverse() : Store.state.todos.length > 0 && this.filter === 'in-progres' ? 
                    Store.state.todos.filter(todo => !todo.completed).map(todo => `<list-item text="${todo.text}" completed="${todo.completed}" id="${todo._id}">
                    <span slot="done"><i class="far fa-check-circle done"></i></span>
                    <span slot="delete"><i class="far fa-times-circle delete"></i></i></span>
                </list-item>`).reverse(): `<h2 class="no-todos">There is no todos</h2>`}
                </div>
                <list-info></list-info>
            </div>
        </div>
    </div> 
    ` 
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            this.filter = e.target.getAttribute('data')
            this.render()
        })

        if (this.filter === btn.getAttribute('data')) {
            btn.classList.add('active')
        } else {
            btn.classList.remove('active')
        }
    })

    }

    addTodo() {
        event.preventDefault();
        if (event.target.elements[0].value.length < 5) {
            Modal.render('Text must be longer than 5 letters')
            event.target.elements[0].value = ''
            return
        }
        if (Store.state.todos.some(todo =>  todo.text === event.target.elements[0].value)) {
            Modal.render('We have this task!');
            event.target.elements[0].value = ''
            return
        }

        const todo = {text: event.target.elements[0].value}
        DB.addTodo(todo)
        
    }

    changeStatus() {
        if (event.target.classList.contains('delete')) {
            let id = event.target.closest('list-item').getAttribute('id');
            DB.removeTodo(id);
        } else if (event.target.classList.contains('done')) {
            const data = {
                id: event.target.closest('list-item').getAttribute('id'),
                text: event.target.closest('list-item').getAttribute('text'),
                completed: event.target.closest('list-item').getAttribute('completed') === 'false' ? 'true' : 'false'
            }

            DB.updateTodo(data, 'changeStatus')
      
        }
    }

    logout() {
       Store.dispatch('logout', null);
       document.querySelector('.logout').classList.add('d-none')
       localStorage.removeItem('token')
       window.dispatchEvent(new CustomEvent('changeRoute', {detail: {route: 'login'} }))
    }

    setupListeners() {
        
        this.anchor.addEventListener('submit', this.addTodo)
      
        window.addEventListener('click', this.changeStatus)

        document.querySelector('.logout').addEventListener('click', this.logout)
    }
}
