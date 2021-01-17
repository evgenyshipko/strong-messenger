import Route from 'src/utils/router/Route'
import Component from 'src/utils/component/Component'
import { Nullable } from 'src/types/Types'

/* global History, Event, Window */

class Router {
    routes: Route[] = []
    _rootQuery!: string
    history!: History
    static __instance: Nullable<Router>
    _currentRoute: Nullable<Route> = null
    _notFoundPage?: Component<any>

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance
        }
        this.routes = []
        this.history = window.history
        this._currentRoute = null
        this._rootQuery = rootQuery
        Router.__instance = this
    }

    use(pathname: string, block: Component<any>) {
        const route = new Route(pathname, block, this._rootQuery)
        this.routes.push(route)
        return this
    }

    useNotFound(notFoundPage: Component<any>) {
        this._notFoundPage = notFoundPage
        return this
    }

    start() {
        window.onpopstate = (event: Event) => {
            this._onRoute((event.currentTarget as Window).location.pathname)
        }
        this._onRoute(window.location.pathname)
    }

    _onRoute(pathname: string) {
        let route = this._getRoute(pathname)
        if (!route) {
            if (!this._notFoundPage) {
                return
            }
            route = new Route(pathname, this._notFoundPage, this._rootQuery)
        }
        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave()
        }
        this._currentRoute = route
        route.render()
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname)
        this._onRoute(pathname)
    }

    back() {
        this.history.back()
    }

    forward() {
        this.history.forward()
    }

    _getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname))
    }

    destruct() {
        Router.__instance = null
    }
}

export default Router
