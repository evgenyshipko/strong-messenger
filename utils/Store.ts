export type State = Record<any, any>
export type Subscriber = (state: State) => any

class Store {
    subscribers: Record<string, Subscriber[]>;
    state: State;
    static __instance: Store

    constructor(initialState = {}) {
        if (Store.__instance) {
            return Store.__instance
        }
        this.subscribers = {}
        this.state = initialState
        this.state = this._makeStateProxy(this.state)
        Store.__instance = this
    }

    _makeStateProxy(state: State) {
        const self = this
        return new Proxy((state), {
            set: function(state, propertyName, value) {
                // @ts-ignore
                state[propertyName] = value
                console.log(`stateChange: ${String(propertyName)}: ${value}`)
                self._dispatch(propertyName, state)
                return true
            }
        })
    }

    _dispatch(propertyName: any, state: State) {
        this.subscribers[propertyName].forEach(subscriper => {
            subscriper(state)
        })
    }

    subscribe(propertyName: string, func:Subscriber) {
        if (this.subscribers[propertyName]) {
            this.subscribers[propertyName].push(func)
        } else {
            this.subscribers[propertyName] = [func]
        }
    }
}

export default Store
