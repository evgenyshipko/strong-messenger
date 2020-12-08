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
                const pathObj = (/\{\{(.*?)}}/gi).exec(this.textContent)
                if (pathObj) {
                    const path = pathObj[1]
                    const data = this._getDataFromContext(context, path)
                    if (data === undefined) {
                        console.log(this, path, context)
                        throw new Error(`${path} attribute is undefined in context`)
                    }
                    // console.log('_handleTextContentParsing', path, data)
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
        const eventObj = (/@event=\{\{(\w+)}}/gi).exec(this.openingTag!)
        if (eventObj) {
            const path = eventObj[1]
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
        return !!(/\{\{(.*?)}}/gi).exec(str)
    }

    _setClassName(target: HTMLElement, context: Context): void {
        const classNameArr = this._getClassName(context)
        if (classNameArr) {
            target.classList.add(...classNameArr)
        }
    }

    _getClassName(context: Context): Nullable<string[]> {
        const classNameObj = (/class=\{\{(.*?)}}/gi).exec(this.openingTag!)
        if (classNameObj) {
            const path = classNameObj[1]
            const classNameStr: string = this._getDataFromContext(context, path)
            if (classNameStr) {
                return classNameStr.split(' ')
            }
        }
        const simpleStringClassNameObj = (/class=["'](.*?)["']/g).exec(this.openingTag!)
        if (simpleStringClassNameObj) {
            const classNameStr: string = simpleStringClassNameObj[1]
            if (classNameStr) {
                return classNameStr.split(' ')
            }
        }
        return null
    }

    _setAttributes(target: HTMLElement, context: Context): void {
        const availableAttributes = ['type', 'name', 'placeholder', 'id', 'form']
        const REGEXP = /(\w+)=\{\{(.*?)}}/gi
        let result = null
        while ((result = REGEXP.exec(this.openingTag!))) {
            const attrName = result[1]
            const attrPath = result[2]
            if (availableAttributes.includes(attrName)) {
                const attrValue: any = this._getDataFromContext(context, attrPath)
                if (attrValue) {
                    target.setAttribute(attrName, attrValue)
                }
            }
        }
    }

    _getDataFromContext(context: Context, path: string): any {
        const keys = path.split('.')
        let result = context
        for (const key of keys) {
            result = result[key]
        }
        return result
    }
}
export default TextNode
