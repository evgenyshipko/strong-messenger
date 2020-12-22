import TextNodeParser from './TextNodeParser';
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
}
export default Templator;
//# sourceMappingURL=Templator.js.map