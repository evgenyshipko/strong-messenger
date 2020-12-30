import { EventManager } from './EventManager'
import { Nullable } from '../types/Types'
import Templator from './templator/Templator'
import { isEqual, isObject } from './utils'

/* global HTMLElement, EventListenerOrEventListenerObject */

enum Event {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_RENDER = 'flow:render',
    FLOW_CDU = 'flow:component-did-update'
}

/*
 В отличие от реализации блока в тренажере, решил не использовать _meta.
 Теперь getContent() возвращает не один элемент, а массив элементов.
*/

class Component<T> {
    props: T
    eventManager: EventManager
    _elements: HTMLElement[] = []
    _templator: Templator

    constructor(props: T) {
        this.props = this._makePropsProxy(props)
        this._templator = new Templator(this._template())
        this.eventManager = new EventManager()
        this._registerEvents(this.eventManager)
        this.eventManager.emit(Event.INIT)
    }

    _registerEvents(eventManager: EventManager) {
        eventManager.on(Event.INIT, this._init.bind(this))
        eventManager.on(Event.FLOW_CDM, this._componentDidMount.bind(this))
        eventManager.on(Event.FLOW_RENDER, this._render.bind(this))
        eventManager.on(Event.FLOW_CDU, this._componentDidUpdate.bind(this))
    }

    _createResources() {
        this._elements = this._templator.compile(this.props)
    }

    _init() {
        this._createResources()
        this.eventManager.emit(Event.FLOW_CDM)
    }

    _componentDidMount() {
        this.componentDidMount(this.props)
    }

    _isUpdateEnable(oldProps: T, newProps: T) {
        if (isObject(oldProps) && isObject(newProps)) {
            return !isEqual(oldProps, newProps)
        }
        return false
    }

    _componentDidUpdate(oldProps: T, newProps: T) {
        let isUpdateEnabled
        if (this.componentDidUpdate(oldProps, newProps) !== undefined) {
            isUpdateEnabled = this.componentDidUpdate(oldProps, newProps)
        } else {
            isUpdateEnabled = this._isUpdateEnable(oldProps, newProps)
        }
        if (isUpdateEnabled) {
            this.props = Object.assign(oldProps, newProps)
        }
    }

    _render() {
        const newElements = this._templator.compile(this.props)
        this._elements?.forEach((oldNode, index) => {
            if (oldNode) {
                const newNode = newElements[index]
                const parentNode = oldNode.parentNode
                const nextNode = oldNode.nextSibling
                if (parentNode) {
                    oldNode.remove()
                    // если есть следующая нода того же уровня, то инсертим не в конец родителя, а к этой ноде
                    if (nextNode) {
                        parentNode.insertBefore(newNode, nextNode)
                    } else {
                        parentNode.appendChild(newNode)
                    }
                }
            }
        })
        this._elements = newElements
    }

    _makePropsProxy(props: any) {
        const self = this
        return new Proxy(props, {
            set(target: any, prorerty: PropertyKey, value: any): boolean {
                target[prorerty] = value
                self.eventManager.emit(Event.FLOW_RENDER)
                return true
            },
            deleteProperty(): boolean {
                throw new Error('Нет доступа')
            }
        })
    }

    _template():string {
        return this.template()
    }

    componentDidMount(_oldProps: T) {}

    componentDidUpdate(_oldProps: T, _newProps: T) {}

    template(): string {
        return ''
    }

    setProps = (nextProps: Partial<T>) => {
        if (!nextProps) {
            return
        }
        this.eventManager.emit(Event.FLOW_CDU, this.props, { ...this.props, ...nextProps })
    };

    getContent(): Nullable<HTMLElement[]> {
        return this._elements
    }

    addEventListener(listenerName: string, callback: EventListenerOrEventListenerObject): void {
        const contentArr = this.getContent()
        contentArr?.forEach((node) => {
            node.addEventListener(listenerName, callback)
        })
    }

    show(display: 'flex' | 'block'): void {
        const contentArr = this.getContent()
        contentArr?.forEach((node) => {
            node.style.display = display
        })
    }

    hide(): void {
        const contentArr = this.getContent()
        contentArr?.forEach((node) => {
            node.style.display = 'none'
        })
    }
}

export default Component
