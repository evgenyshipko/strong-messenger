import TextNodeParser from './TextNodeParser'
import { Context } from '../../types/Types'

/* global HTMLElement */

class Templator {
    _template: string

    constructor(template: string) {
        this._template = template
    }

    compile(context: Context): HTMLElement[] {
        const textNodes = new TextNodeParser(this._template).findAllTextNodes()
        return textNodes.map((textNode) => {
            return textNode.toHTMLElement(context)
        })
    }
}

export default Templator
