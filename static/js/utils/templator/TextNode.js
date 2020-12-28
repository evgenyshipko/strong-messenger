import Component from '../Component.js';
/* global HTMLElement, EventListenerOrEventListenerObject */
class TextNode {
    constructor(openingTag, tagName, children, textContent) {
        this.openingTag = openingTag;
        this.tagName = tagName;
        this.children = children;
        this.textContent = textContent;
    }
    toHTMLElement(context) {
        const element = document.createElement(this.tagName);
        this._setClassName(element, context);
        this._setAttributes(element, context);
        this._addEventListener(element, context);
        this._appendChildren(element, context);
        this._handleTextContentParsing(element, context);
        return element;
    }
    // шаблонизатор не умеет работать с innerHTML (XSS санитайзинг)
    _handleTextContentParsing(target, context) {
        if (this.textContent) {
            if (this._isParsable(this.textContent)) {
                const TEMPLATOR_ATTRIBUTE_REGEXP = /\{\{(.*?)}}/gi;
                const pathObj = TEMPLATOR_ATTRIBUTE_REGEXP.exec(this.textContent);
                if (pathObj) {
                    const PATH_INDEX = 1;
                    const path = pathObj[PATH_INDEX];
                    const data = this._getDataFromContext(context, path);
                    if (data === undefined) {
                        throw new Error(`${path} attribute is undefined in context`);
                    }
                    if (Array.isArray(data) && data[0] instanceof Component) {
                        data.forEach((component) => {
                            component.getContent().forEach(node => {
                                target.appendChild(node);
                            });
                        });
                    }
                    else if (data instanceof Component) {
                        data.getContent().forEach(node => {
                            target.appendChild(node);
                        });
                    }
                    else if (data instanceof HTMLElement) {
                        target.appendChild(data);
                    }
                    else if (Array.isArray(data) && data[0] instanceof HTMLElement) {
                        data.forEach(node => {
                            target.appendChild(node);
                        });
                    }
                    else if (typeof data === 'string') {
                        target.textContent = data;
                    }
                }
            }
            else {
                target.textContent = this.textContent;
            }
        }
    }
    _addEventListener(target, context) {
        const availableEvents = ['DOMContentLoaded', 'click', 'focus', 'submit', 'keyup',
            'mousemove', 'mouseup', 'mousedown', 'mouseout', 'mouseover', 'contextmenu', 'change'];
        const EVENT_REGEXP = /@event=\{\{(\w+)}}/gi;
        const eventObj = EVENT_REGEXP.exec(this.openingTag);
        if (eventObj) {
            const PATH_INDEX = 1;
            const path = eventObj[PATH_INDEX];
            const data = this._getDataFromContext(context, path);
            if (data && data.callback instanceof Function && availableEvents.includes(data.name)) {
                target.addEventListener(data.name, data.callback);
            }
        }
    }
    _appendChildren(target, context) {
        var _a;
        (_a = this.children) === null || _a === void 0 ? void 0 : _a.forEach((textNode) => {
            target.appendChild(textNode.toHTMLElement(context));
        });
    }
    _isParsable(str) {
        const TEMPLATOR_ATTRIBUTE_REGEXP = /\{\{(.*?)}}/gi;
        return !!TEMPLATOR_ATTRIBUTE_REGEXP.exec(str);
    }
    _setClassName(target, context) {
        let classNameArr = this._getClassNameFromContext(context);
        if (!classNameArr) {
            classNameArr = this._getClassNameFromOpeningTag();
        }
        if (classNameArr) {
            target.classList.add(...classNameArr);
        }
    }
    _getClassNameFromContext(context) {
        const CLASS_AS_TEMPLATOR_ATTRIBUTE_REGEXP = /class=\{\{(.*?)}}/gi;
        const classNameObj = CLASS_AS_TEMPLATOR_ATTRIBUTE_REGEXP.exec(this.openingTag);
        if (classNameObj) {
            const PATH_INDEX = 1;
            const path = classNameObj[PATH_INDEX];
            const classNameStr = this._getDataFromContext(context, path);
            if (classNameStr) {
                return classNameStr.split(' ');
            }
        }
        return null;
    }
    _getClassNameFromOpeningTag() {
        const CLASS_AS_STRING_REGEXP = /class=["'](.*?)["']/g;
        const simpleStringClassNameObj = CLASS_AS_STRING_REGEXP.exec(this.openingTag);
        if (simpleStringClassNameObj) {
            const CLASS_NAME_INDEX = 1;
            const classNameStr = simpleStringClassNameObj[CLASS_NAME_INDEX];
            if (classNameStr) {
                return classNameStr.split(' ');
            }
        }
        return null;
    }
    _setAttributes(target, context) {
        const ATTRIBUTES_REGEXP = /(\w+)=\{\{(.*?)}}/gi;
        let result = null;
        while ((result = ATTRIBUTES_REGEXP.exec(this.openingTag))) {
            const ATTR_INDEX = 1;
            const PATH_INDEX = 2;
            const attrName = result[ATTR_INDEX];
            const attrPath = result[PATH_INDEX];
            if (this._isAttributeAvailable(attrName)) {
                const attrValue = this._getDataFromContext(context, attrPath);
                if (attrValue) {
                    target.setAttribute(attrName, attrValue);
                }
            }
        }
    }
    _isAttributeAvailable(attr) {
        // запрещены onclick, onerror и прочие ивент-атрибуты (санитайзинг XSS)
        const availableAttributes = ['autocomplete', 'type', 'name', 'placeholder', 'id', 'form', 'value', 'src', 'for', 'list'];
        return availableAttributes.includes(attr);
    }
    _getDataFromContext(context, path) {
        const keys = path.split('.');
        const firstKey = keys[0];
        return keys.slice(1).reduce((acc, key) => (acc = acc[key]), context[firstKey]);
    }
}
export default TextNode;
//# sourceMappingURL=TextNode.js.map