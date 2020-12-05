import { EventManager } from './utils/EventManager.js'
import { Nullable, Context } from '../types/Types'
import Templator from '../utils/templator/Templator.js'

/* global HTMLElement*/

enum Event {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_RENDER = 'flow:render',
    FLOW_CDU = 'flow:component-did-update'
}

class Component {
    props: Context
    eventManager: () => EventManager
    _elements: Nullable<Array<HTMLElement>> = null
    _templator: Templator

    constructor(props: Context = {}) {
        const eventManager = new EventManager()
        this._templator = new Templator(this.template())
        this.props = this._makePropsProxy(props)
        this.eventManager = () => eventManager
        this._registerEvents(eventManager)
        eventManager.emit(Event.INIT)
    }

    _registerEvents(eventManager: EventManager) {
        // console.log('_registerEvents')
        eventManager.on(Event.INIT, this.init.bind(this))
        eventManager.on(Event.FLOW_CDM, this._componentDidMount.bind(this))
        eventManager.on(Event.FLOW_RENDER, this._render.bind(this))
        eventManager.on(Event.FLOW_CDU, this._componentDidUpdate.bind(this))
    }

    template(): string {
        return ''
    }

    _createResources() {
        // console.log('_createResources')
        this._elements = this._templator.compile(this.props)
        console.log('this.props', this.props)
        console.log('this._elements', this._elements)
    }

    init() {
        console.log(`===== init =====`)
        this._createResources()
        this.eventManager().emit(Event.FLOW_CDM)
    }

    _componentDidMount() {
        // console.log('_componentDidMount')
        this.componentDidMount(undefined)
        // this.eventManager().emit(Event.FLOW_RENDER)
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount(_oldProps: any) {}

    _componentDidUpdate(oldProps: any, newProps: any) {
        // console.log('_componentDidUpdate')
        const response = this.componentDidUpdate(oldProps, newProps)
        if (response) {
            this.props = Object.assign(oldProps, newProps)
            console.log('assigned props', this.props)
        }
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: any, newProps: any) {
        return oldProps !== newProps
    }

    setProps = (nextProps: any) => {
        // console.log('setProps')
        if (!nextProps) {
            return
        }
        this.eventManager().emit(Event.FLOW_CDU, this.props, nextProps)
    };

    _render() {
        // console.log('_render')
        const newElements = this._templator.compile(this.props)
        const oldElements = this._elements

        console.log('newElements',newElements)
        console.log('oldElements',oldElements)

        oldElements?.forEach((oldNode, index) => {
            const parent = oldNode.parentNode
            oldNode.remove()
            console.log('parent', parent)
            console.log('newElements[index]', newElements[index])
            if (parent != null) {
                oldNode.remove()
                parent.appendChild(newElements[index])
                console.log('parent appendChild', parent)
            }
        })
        this._elements = newElements
    }

    getContent(): Nullable<Array<HTMLElement>> {
        // console.log('getContent')
        return this._elements
    }

    _makePropsProxy(props: any) {
        // console.log('_makePropsProxy')
        const self = this
        return new Proxy(props, {
            set(target: any, prorerty: PropertyKey, value: any): boolean {
                target[prorerty] = value
                self.eventManager().emit(Event.FLOW_RENDER)
                return true
            },
            deleteProperty(): boolean {
                throw new Error('Нет доступа')
            }
        })
    }

    show(): void {
        const contentArr = this.getContent()
        contentArr?.forEach((content) => {
            content.style.display = 'block'
        })
    }

    hide(): void {
        const contentArr = this.getContent()
        contentArr?.forEach((content) => {
            content.style.display = 'none'
        })
    }
}

export default Component
