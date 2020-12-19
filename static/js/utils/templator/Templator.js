import TextNodeParser from './TextNodeParser.js';
/* global HTMLElement */
class Templator {
    constructor(template) {
        this._template = template;
    }
    compile(context) {
        const textNodes = new TextNodeParser(this._template).findAllTextNodes();
        return textNodes.map((textNode) => {
            return textNode.toHTMLElement(context);
        });
    }
    sum(lhs, rhs) {
        return lhs + rhs;
    }
}
export default Templator;
//# sourceMappingURL=Templator.js.map