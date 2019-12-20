export default function createReducers() {
    return {
        getTodos: (payload, state) => ({
            ...state,
            todos: [...payload]
        }),
        addItem: (payload, state) => ({
            ...state,
            todos: [...state.todos, payload]
        }),
        removeItem: (payload, state) => ({
            ...state,
            todos: state.todos.filter(todo => todo._id !== payload)
        }),
        editItem: (payload, state) => ({
          ...state,
          todos: state.todos.map(todo => {
              if (todo._id === payload._id) return payload
              
              return todo;
          })  
        }),
        changeStatus: (payload, state) => ({
            ...state,
            todos: state.todos.map(todo => {
                if (todo._id === payload._id) {
                    return payload
                } 
            
                return todo;
            })
        }),
        login: (payload, state) => ({
            ...state,
            userInfo : {
                authorized: true,
                ...payload
            }
        }),
        logout: (payload, state) => ({
            ...state,
            userInfo : {}
        }),
        move: (payload, state) => {
            window.dispatchEvent(new CustomEvent('changeRoute', {detail: {route: payload}}));
            return state
        },
    
    }
}