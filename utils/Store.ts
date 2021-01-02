
/*
 Глобальный стор для управления состоянием приложения
 Позволяет подписывать функции на изменение определенных ключей стейта
 При самом изменении пропсов функции происходит вызов функций-подписчиков
 TODO: написать тесты на Store
*/

class Store<T extends Record<string, unknown>> {
    private subscribers: Record<string | number, ((state: T) => unknown)[]>
    private state: T
    private static __instance: Store<any>

    constructor(initialState: T = {} as T) {
        if (Store.__instance) {
            return Store.__instance as Store<T>
        }
        this.subscribers = {}
        this.state = this.makeStateProxy(initialState)
        Store.__instance = this
    }

    private makeStateProxy(state: any) {
        return new Proxy((state), {
            set: (state, propertyName, value) => {
                if (typeof propertyName !== 'symbol') {
                    state[propertyName] = value
                    this.dispatch(propertyName, state)
                }
                return true
            }
        })
    }

    private dispatch(propertyName: string | number, state: T) {
        if (this.subscribers[propertyName]) {
            this.subscribers[propertyName].forEach(subscriber => {
                subscriber(state)
            })
        }
    }

    get content() {
        return this.state
    }

    subscribe(propertyName: string, func: (state: T) => unknown) {
        if (this.subscribers[propertyName]) {
            this.subscribers[propertyName].push(func)
        } else {
            this.subscribers[propertyName] = [func]
        }
    }

    setState(value: Partial<T>) {
        Object.keys(value).forEach((key) => {
            (this.state as Record<string, unknown>)[key] = value[key]
        })
    }
}

export default Store
