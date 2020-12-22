import { EventManager } from './EventManager';
import Templator from './templator/Templator';
/* global HTMLElement, EventListenerOrEventListenerObject */
var Event;
(function (Event) {
    Event["INIT"] = "init";
    Event["FLOW_CDM"] = "flow:component-did-mount";
    Event["FLOW_RENDER"] = "flow:render";
    Event["FLOW_CDU"] = "flow:component-did-update";
})(Event || (Event = {}));
/*
 В отличие от реализации блока в тренажере, решил не использовать _meta.
 Теперь getContent() возвращает не один элемент, а массив элементов.
*/
class Component {
    constructor(props) {
        this._elements = [];
        this.setProps = (nextProps) => {
            // console.log('setProps')
            if (!nextProps) {
                return;
            }
            this.eventManager.emit(Event.FLOW_CDU, this.props, nextProps);
        };
        this.props = this._makePropsProxy(props);
        this._templator = new Templator(this.template());
        this.eventManager = new EventManager();
        this._registerEvents(this.eventManager);
        this.eventManager.emit(Event.INIT);
    }
    _registerEvents(eventManager) {
        // console.log('_registerEvents')
        eventManager.on(Event.INIT, this.init.bind(this));
        eventManager.on(Event.FLOW_CDM, this._componentDidMount.bind(this));
        eventManager.on(Event.FLOW_RENDER, this._render.bind(this));
        eventManager.on(Event.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
    template() {
        return '';
    }
    _createResources() {
        // console.log('_createResources')
        this._elements = this._templator.compile(this.props);
    }
    init() {
        this._createResources();
        this.eventManager.emit(Event.FLOW_CDM);
        // console.log('init', this.getContent())
    }
    _componentDidMount() {
        // console.log('_componentDidMount')
        this.componentDidMount(this.props);
    }
    componentDidMount(_oldProps) { }
    _componentDidUpdate(oldProps, newProps) {
        // console.log('_componentDidUpdate')
        const isEnabled = this.componentDidUpdate(oldProps, newProps);
        if (isEnabled) {
            this.props = Object.assign(oldProps, newProps);
        }
    }
    componentDidUpdate(oldProps, newProps) {
        // знаю, что это очень топорно, но до этого я просто в любом случае изменения пропсов делал рендер
        return JSON.stringify(oldProps) !== JSON.stringify(newProps);
    }
    _render() {
        var _a;
        // console.log('_render', this.props)
        const newElements = this._templator.compile(this.props);
        (_a = this._elements) === null || _a === void 0 ? void 0 : _a.forEach((oldNode, index) => {
            if (oldNode) {
                const parent = oldNode.parentNode;
                oldNode.remove();
                if (parent != null) {
                    oldNode.remove();
                    const newNode = newElements[index];
                    parent.appendChild(newNode);
                }
            }
        });
        this._elements = newElements;
    }
    getContent() {
        // console.log('getContent')
        return this._elements;
    }
    _makePropsProxy(props) {
        // console.log('_makePropsProxy')
        const self = this;
        return new Proxy(props, {
            set(target, prorerty, value) {
                target[prorerty] = value;
                self.eventManager.emit(Event.FLOW_RENDER);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }
    addEventListener(listenerName, callback) {
        const contentArr = this.getContent();
        contentArr === null || contentArr === void 0 ? void 0 : contentArr.forEach((node) => {
            node.addEventListener(listenerName, callback);
        });
    }
    show(display) {
        const contentArr = this.getContent();
        contentArr === null || contentArr === void 0 ? void 0 : contentArr.forEach((node) => {
            node.style.display = display;
        });
    }
    hide() {
        const contentArr = this.getContent();
        contentArr === null || contentArr === void 0 ? void 0 : contentArr.forEach((node) => {
            node.style.display = 'none';
        });
    }
}
export default Component;
//# sourceMappingURL=Component.js.map