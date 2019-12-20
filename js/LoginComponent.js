import ParentComponent from './ParentComponent.js';
import Store from './store/index.js';
import DB from './DB-worker.js';
import Modal from './modal.js';

export default class LoginComponent extends ParentComponent {
    constructor(anchor) {
        super(Store, anchor)
        
    }
    
    onInit() {}

    deleteListeners() {
        this.anchor.querySelector('form').removeEventListener('submit', this.login)
    }

    render() {
     
        this.anchor.innerHTML = `
        <div class="login">
            <form class="login-form">
                <p class="login-title white-text">LOGIN</p>
                <div class="form-group">
                    <i class="far fa-user"></i>
                    <input class="form-control" type="email" placeholder="Email">
                </div>
                <div class="form-group">
                    <i class="fas fa-lock-open"></i>
                    <input class="form-control" type="password" placeholder="Password">
                </div>
                
                <input class="form-control form-submit" type="submit" value="Login">
            </form>
        </div>
    `

    this.setupListeners();

    }

    login() {
        event.preventDefault();
        if (!this.elements[0].value || !this.elements[1].value) {
            Modal.render('Some field is empty!')
        }
         
        const formData = {
            email: this.elements[0].value,
            password: this.elements[1].value
        }
        DB.login(formData)
                
            
    }

    setupListeners() {
        this.anchor.querySelector('form').addEventListener('submit', this.login)
    }
    
}