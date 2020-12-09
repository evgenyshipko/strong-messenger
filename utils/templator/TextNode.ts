import { Nullable, Context, EventData } from '../../types/Types'
import Component from '../Component.js'
/* global HTMLElement, EventListenerOrEventListenerObject */

class TextNode {
    openingTag: string
    tagName: string
    children?: TextNode[]
    textContent?: string

    constructor(openingTag: string, tagName: string, children?: TextNode[], textContent?: string) {
        this.openingTag = openingTag
        this.tagName = tagName
        this.children = children
        this.textContent = textContent
    }

    toHTMLElement(context: Context):HTMLElement {
        const element = document.createElement(this.tagName)
        this._setClassName(element, context)
        this._setAttributes(element, context)
        this._addEventListener(element, context)
        this._appendChildren(element, context)
        this._handleTextContentParsing(element, context)
        return element
    }

    _handleTextContentParsing(target: HTMLElement, context: Context) {
        if (this.textContent) {
            if (this._isParsable(this.textContent)) {
                const TEMPLATOR_ATTRIBUTE_REGEXP = /\{\{(.*?)}}/gi
                const pathObj = TEMPLATOR_ATTRIBUTE_REGEXP.exec(this.textContent)
                if (pathObj) {
                    const PATH_INDEX = 1
                    const path = pathObj[PATH_INDEX]
                    const data = this._getDataFromContext(context, path)
                    if (data === undefined) {
                        console.log(this, path, context)
                        throw new Error(`${path} attribute is undefined in context`)
                    }
                    if (Array.isArray(data) && data[0] instanceof Component) {
                        data.forEach((component: Component<Context>) => {
                            component.getContent()!.forEach(node => {
                                target.appendChild(node)
                            })
                        })
                    } else if (data instanceof Component) {
                        data.getContent()!.forEach(node => {
                            target.appendChild(node)
                        })
                    } else if (data instanceof HTMLElement) {
                        target.appendChild(data)
                    } else if (Array.isArray(data) && data[0] instanceof HTMLElement) {
                        data.forEach(node => {
                            target.appendChild(node)
                        })
                    } else if (typeof data === 'string') {
                        target.textContent = data
                    }
                }
            } else {
                target.textContent = this.textContent
            }
        }
    }

    _addEventListener(target: HTMLElement, context: Context): void {
        const availableEvents = ['click', 'focus', 'submit',
            'mousemove', 'mouseup', 'mousedown', 'mouseout', 'mouseover', 'contextmenu']
        const EVENT_REGEXP = /@event=\{\{(\w+)}}/gi
        const eventObj = EVENT_REGEXP.exec(this.openingTag!)
        if (eventObj) {
            const PATH_INDEX = 1
            const path = eventObj[PATH_INDEX]
            const data: EventData = this._getDataFromContext(context, path)
            if (data && data.callback instanceof Function && availableEvents.includes(data.name)) {
                target.addEventListener(data.name, data.callback)
            }
        }
    }

    _appendChildren(target: HTMLElement, context: Context): void {
        if (this.children) {
            this.children.forEach((textNode) => {
                target.appendChild(textNode.toHTMLElement(context)!)
            })
        }
    }

    _isParsable(str: string):boolean {
        const TEMPLATOR_ATTRIBUTE_REGEXP = /\{\{(.*?)}}/gi
        return !!TEMPLATOR_ATTRIBUTE_REGEXP.exec(str)
    }

    _setClassName(target: HTMLElement, context: Context): void {
        const classNameArr = this._getClassName(context)
        if (classNameArr) {
            target.classList.add(...classNameArr)
        }
    }

    _getClassName(context: Context): Nullable<string[]> {
        const CLASS_AS_TEMPLATOR_ATTRIBUTE_REGEXP = /class=\{\{(.*?)}}/gi
        const classNameObj = CLASS_AS_TEMPLATOR_ATTRIBUTE_REGEXP.exec(this.openingTag!)
        if (classNameObj) {
            const PATH_INDEX = 1
            const path = classNameObj[PATH_INDEX]
            const classNameStr: string = this._getDataFromContext(context, path)
            if (classNameStr) {
                return classNameStr.split(' ')
            }
        }
        const CLASS_AS_STRING_REGEXP = /class=["'](.*?)["']/g
        const simpleStringClassNameObj = CLASS_AS_STRING_REGEXP.exec(this.openingTag!)
        if (simpleStringClassNameObj) {
            const CLASS_NAME_INDEX = 1
            const classNameStr = simpleStringClassNameObj[CLASS_NAME_INDEX]
            if (classNameStr) {
                return classNameStr.split(' ')
            }
        }
        return null
    }

    _setAttributes(target: HTMLElement, context: Context): void {
        const availableAttributes = ['type', 'name', 'placeholder', 'id', 'form']
        const ATTRIBUTES_REGEXP = /(\w+)=\{\{(.*?)}}/gi
        let result = null
        while ((result = ATTRIBUTES_REGEXP.exec(this.openingTag!))) {
            const ATTR_INDEX = 1
            const PATH_INDEX = 2
            const attrName = result[ATTR_INDEX]
            const attrPath = result[PATH_INDEX]
            if (availableAttributes.includes(attrName)) {
                const attrValue = this._getDataFromContext(context, attrPath)
                if (attrValue) {
                    target.setAttribute(attrName, attrValue)
                }
            }
        }
    }

    _getDataFromContext(context: Context, path: string) {
        const keys = path.split('.')
        const firstKey = keys[0]
        return keys.slice(1).reduce((acc, key) => (acc = acc[key]), context[firstKey])
    }
}
export default TextNode
