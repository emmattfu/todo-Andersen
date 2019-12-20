import Store from "./store/index.js";
import DB from "./DB-worker.js";

const template = document.createElement("template");
template.innerHTML = `
<style>
.todo-item {
    border: 1px solid #1976D2;
    padding: 10px 30px;
    border-radius: 30px;
    margin-top: 20px;
    margin-left: 10px;
    width: 500px;
    font-size: 18px;
    transition: background-color .2s linear;
    display:flex;
    justify-content: space-between;
    align-items: center;
    overflow-x:hidden;
    word-break: break-word;
    color: #1976D2;
}

.todo-item[completed="true"] {
  border: 1px solid #29F30E;
  transition: background-color .2s linear;
  color: #29F30E;
}

.todo-item-text {
  padding: 0 10px;
}

.todo-item[completed="true"]:hover {
  background: #29F30E;
  color: white;
}

.todo-item:hover {
    background: #1976D2;
    color: white;
}

input {
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  outline: none;
}

</style>
<div class="todo-item">
    <slot name="done"></slot>
    <p class="todo-item-text"></p>
    <slot name="delete"></slot>
</div>
`;

export default class ListItem extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  render() {
    this.shadowRoot.innerHTML = ''
    const temp = template.content.cloneNode(true);
    temp.querySelector(".todo-item-text").textContent = this.getAttribute("text");
    temp.querySelector('.todo-item').setAttribute('completed', this.getAttribute('completed'))
    this.root.append(temp);
  }

  editTodo() {
    this.shadowRoot.querySelector('.todo-item').addEventListener('click', e => {
      
      if (!this.shadowRoot.querySelector('input') && e.target.classList.contains('todo-item-text')) {
        let value = e.target.textContent.trim();
        let input = document.createElement('input');
        input.value = value;
        input.setAttribute('autofocus', true);
        let paragraph = this.shadowRoot.querySelector('p');
        this.shadowRoot.querySelector('.todo-item').replaceChild(input, paragraph)

        this.shadowRoot.querySelector('input').addEventListener('blur', e => {
         
          let data = {
            id: this.getAttribute('id'),
            text: e.target.value,
            completed: this.getAttribute('completed')
          }
          DB.updateTodo(data, 'editItem')
          this.setAttribute('text', value)
          this.render()
          this.editTodo()
        })
      }
    })
  }

  connectedCallback() {
    this.render();
    this.editTodo()
  }
}