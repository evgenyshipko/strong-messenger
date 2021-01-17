import TextNodeParser from 'src/utils/templator/TextNodeParser'
import { Context } from 'src/types/Types'

/* global HTMLElement */

class Templator {
    _template: string

    constructor(template: string) {
        this._template = template
    }

    compile(context: Context): HTMLElement[] {
        const textNodes = new TextNodeParser(this._template).findAllTextNodes()
        return textNodes.map(textNode => textNode.toHTMLElement(context))
    }
}

export default Templator
