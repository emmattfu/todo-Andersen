import routerConfig from './routerConfig.js';
import Store from './store/index.js';

export default class Router {
    constructor(anchor) {
        this.anchor = anchor;
        
        window.addEventListener('popstate', e => {
          this.changeRoute(e.state.route)
        })

        Store.events.subscribe('move', this.changeRoute)

    }

    changeRoute(route) {
        const conf = routerConfig[route]
        
        if(!conf) return;
        if (this.component) {
            this.component.onDestroy()
        }
        window.history.pushState(conf.data, '', conf.url)
        this.component = new conf.component(this.anchor);
      
        if (conf.url === 'login') {
            this.component.render()
        } else {
          
            this.component.onInit();
        }
       

    }
}