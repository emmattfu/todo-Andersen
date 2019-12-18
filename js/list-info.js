import Store from "./store/index.js";

let template = document.createElement("template");

template.innerHTML = `
<style>
.todo-info {
    padding: 20px;
    background-color: #1976D2;
   
}
.todo-info-text {
    color: white;
    font-size: 18px;
    
}

.todo-info-text + .todo-info-text {
    margin-top: 10px;
}
</style>
<div class="todo-info">
    <div class="todo-info-text" data-text="tasks">Tasks: 0</div>
    <div class="todo-info-text" data-text="finished-tasks">Finished tasks: 0</div>
    <div class="todo-info-text" data-text="in-progres-tasks">In progress tasks: 0</div>
</div>
`;

export default class TodoInfo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  render() {
    const temp = template.content.cloneNode(true);
    let finished = Store.state.todos.filter(todo => todo.completed);
    temp.querySelector("[data-text=tasks]").textContent = `Tasks to do: ${Store.state.todos.length}`;
    temp.querySelector("[data-text=finished-tasks]").textContent = `Finished tasks: ${finished.length}`;
    temp.querySelector("[data-text=in-progres-tasks]").textContent = `In progress tasks: ${Store.state.todos.length - finished.length}`;
    this.shadowRoot.append(temp);
  }

  connectedCallback() {
    this.render();
  }
}
