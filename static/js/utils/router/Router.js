import Route from './Route.js';
import { notFoundPage } from '../../pages/error/404.js';
/* global History, Event, Window */
class Router {
    constructor(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }
    use(pathname, block) {
        const route = new Route(pathname, block, this._rootQuery);
        this.routes.push(route);
        return this;
    }
    start() {
        console.log('window.location.pathname', window.location.pathname);
        window.onpopstate = (event) => {
            console.log('onpopstate', window.location.pathname);
            this._onRoute(event.currentTarget.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }
    _onRoute(pathname) {
        console.log('_onRoute', pathname);
        let route = this.getRoute(pathname);
        console.log('route', route);
        if (!route) {
            route = new Route('', notFoundPage, this._rootQuery);
        }
        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render();
    }
    go(pathname) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }
    back() {
        this.history.back();
    }
    forward() {
        this.history.forward();
    }
    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}
export default Router;
//# sourceMappingURL=Router.js.map