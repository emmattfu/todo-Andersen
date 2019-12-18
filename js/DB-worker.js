import Store from './store/index.js';

class DataBaseWorker {

    getTodos() {
        fetch('https://todo-app-back.herokuapp.com/todos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            })
            .then(resp => resp.json())
            .then(todoArr => Store.dispatch('getTodos', todoArr))
    }

    addTodo(data) {
        fetch('https://todo-app-back.herokuapp.com/todos', {
                method: 'POST',
                body:
                    JSON.stringify({text: data.text}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            })
            .then(resp => resp.json())
            .then(resp => Store.dispatch('addItem', resp))
            .catch(err => console.warn(err))
    }

    removeTodo(id) {
        fetch(`https://todo-app-back.herokuapp.com/todos/${id}`, {
                method: 'DELETE',
               
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            })
            .then(resp => resp.json())
            .then(resp => Store.dispatch('removeItem', resp._id))
            .catch(err => console.warn(err))
    }

    login(data) {
        
            fetch('https://todo-app-back.herokuapp.com/login', {
                method: 'POST',
                body:
                  JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(resp => resp.json())
              .then(resp => {
                  if (resp.token) {
                    Store.dispatch('login', resp);
                    localStorage.setItem('token', resp.token)
                    window.dispatchEvent(new CustomEvent('changeRoute', {detail: {route: 'todoList'}}));
                  }
              })
              .catch(err => console.warn(err))
          
            
        }

        updateTodo(data, reduser) {
            console.log(data)
            fetch(`https://todo-app-back.herokuapp.com/todos/${data.id}`, {
                    method: 'PUT',
                    body:
                        JSON.stringify({
                        text: data.text,
                        completed: data.completed
                        }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token')
                    }
                })
                .then(resp => resp.json())
                .then(resp => Store.dispatch(reduser, resp))
                .catch(err => console.warn(err))
        }

        checkAuth(token) {
            fetch('https://todo-app-back.herokuapp.com/me', {
                method: 'GET',
                headers: {
                  'Authorization': token
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                if (resp.token) {
                   console.log(resp)
                    Store.dispatch('login', resp);
                    localStorage.setItem('token', resp.token)
                  }
            })
            .then(resp => this.getTodos())
            .catch(err =>  window.dispatchEvent(new CustomEvent('changeRoute', {detail: {route: 'login'}})))
        }
      
    
}

export default new DataBaseWorker();

