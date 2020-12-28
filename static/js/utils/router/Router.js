import Route from './Route.js';
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
    useNotFound(notFoundPage) {
        this._notFoundPage = notFoundPage;
        return this;
    }
    start() {
        window.onpopstate = (event) => {
            console.log('ONPOPSTATE EVENT', this.history);
            this.go(event.currentTarget.location.pathname);
        };
        this.go(window.location.pathname);
    }
    _onRoute(pathname) {
        let route = this._getRoute(pathname);
        if (!route) {
            if (this._notFoundPage) {
                route = new Route(pathname, this._notFoundPage, this._rootQuery);
            }
            else {
                return;
            }
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
    _getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
    destruct() {
        Router.__instance = null;
    }
}
export default Router;
//# sourceMappingURL=Router.js.map