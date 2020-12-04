import EventManager from '.utils/EventManager'
/* global HTMLElement*/

interface Meta{
    tagName: string,
    props: any
}

type Nullable<T> = T | null

enum Event {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_RENDER = 'flow:render',
    FLOW_CDU = 'flow:component-did-update'
}

class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_RENDER: 'flow:render',
        FLOW_CDU: 'flow:component-did-update'
    };

    props: unknown
    eventManager: EventManager
    _element: Nullable<HTMLElement> = null
    _meta: Nullable<Meta> = null

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName: string = 'div', props: unknown = {}) {
        const eventManager = new EventManager()
        this._meta = {
            tagName,
            props
        }
        this.props = this._makePropsProxy(props)
        this.eventManager = () => eventManager
        this._registerEvents(eventManager)
        eventManager.emit(Event.INIT)
    }

    _registerEvents(eventManager: EventManager) {
        console.log('_registerEvents')
        eventManager.on(Event.INIT, this.init.bind(this))
        eventManager.on(Event.FLOW_CDM, this._componentDidMount.bind(this))
        eventManager.on(Event.FLOW_RENDER, this._render.bind(this))
        eventManager.on(Event.FLOW_CDU, this._componentDidUpdate.bind(this))
    }

    _createResources() {
        console.log('_createResources')
        if (this._meta != null) {
            const tagName = this._meta.tagName
            this._element = this._createDocumentElement(tagName)
        }
    }

    init() {
        console.log('init')
        this._createResources()
        this.eventManager().emit(Event.FLOW_CDM)
    }

    _componentDidMount() {
        console.log('_componentDidMount')
        this.componentDidMount(undefined)
        this.eventManager().emit(Event.FLOW_RENDER)
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount(_oldProps: any) {}

    _componentDidUpdate(oldProps: any, newProps: any) {
        console.log('_componentDidUpdate')
        const response = this.componentDidUpdate(oldProps, newProps)
        if (response) {
            this.props = Object.assign(oldProps, newProps)
            console.log('assigning props', this.props)
            this.eventManager().emit(Event.FLOW_RENDER)
        }
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: any, newProps: any) {
        return oldProps !== newProps
    }

    setProps = (nextProps: any) => {
        console.log('setProps')
        if (!nextProps) {
            return
        }
        this.eventManager().emit(Event.FLOW_CDU, this.props, nextProps)
    };

    get element() {
        return this._element
    }

    _render() {
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду
        console.log('_render')
        const completedTemplate = this.render()
        const node = new DOMParser().parseFromString(completedTemplate, "text/html").body.childNodes[0]
        if (this._element != null) {
            this._element.appendChild(node)
        }
    }

    // Может переопределять пользователь, необязательно трогать
    render(): string {
        return ''
    }

    getContent(): Nullable<HTMLElement> {
        console.log('getContent')
        return this.element
    }

    _makePropsProxy(props: any) {
        console.log('_makePropsProxy')
        const self = this
        return new Proxy(props, {
            set(target: any, prorerty: PropertyKey, value: any): boolean {
                self.eventManager().emit(Event.FLOW_RENDER)
                target[prorerty] = value
                return true
            },
            deleteProperty(): boolean {
                throw new Error('Нет доступа')
            }
        })
    }

    _createDocumentElement(tagName: string):HTMLElement {
        console.log('_createDocumentElement')
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName)
    }

    show(): void {
        const content = this.getContent()
        if (content != null) {
            content.style.display = 'block'
        }
    }

    hide(): void {
        const content = this.getContent()
        if (content != null) {
            content.style.display = 'none'
        }
    }
}

export default Block
