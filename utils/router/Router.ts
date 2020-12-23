import Route from './Route'
import Component from '../Component'
import { Nullable } from '../../types/Types'
import { notFoundPage } from '../../pages/error/404'

/* global History, Event, Window */

class Router {
    routes: Route[]
    _rootQuery: string
    history: History
    static __instance: Router
    _currentRoute: Nullable<Route>

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

    use(pathname: string, block: Component<any>[]) {
        const route = new Route(pathname, block, this._rootQuery)

        this.routes.push(route)

        return this
    }

    start(path?: string) {
        window.onpopstate = (event: Event) => {
            this._onRoute((event.currentTarget as Window).location.pathname)
        }
        if (path) {
            this._onRoute(path)
        } else {
            this._onRoute(window.location.pathname)
        }
    }

    _onRoute(pathname: string) {
        let route = this.getRoute(pathname)
        if (!route) {
            route = new Route('', [notFoundPage], this._rootQuery)
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

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname))
    }
}

export default Router
