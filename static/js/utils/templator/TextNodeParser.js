import TextNode from './TextNode.js';
class TextNodeParser {
    constructor(template) {
        this._template = template;
    }
    findAllTextNodes() {
        let template = this._template;
        const commonArr = [];
        let endIndex = 0;
        let previousResult = new TextNode('', '', undefined, undefined);
        while (previousResult !== null) {
            if (typeof endIndex === 'number') {
                template = template.substring(endIndex).trim();
            }
            const executionResult = this._findTextNode(template);
            endIndex = executionResult.endIndex;
            previousResult = executionResult.result;
            if (executionResult.result !== null) {
                commonArr.push(executionResult.result);
            }
        }
        if (commonArr.length === 0) {
            throw new Error('text todes not found, check your template');
        }
        return commonArr;
    }
    _findTextNode(template) {
        if (this._isStartsWithSelfClosingTag(template)) {
            return this._findTextNodeInSelfClosingTag(template);
        }
        else {
            return this._findTextNodeInUsualTag(template);
        }
    }
    // генерируем TextNode по самозакрывающемуся тэгу (например, <input />)
    _findTextNodeInSelfClosingTag(template) {
        const openingTagObject = (/<(\w+)\b[^>]*\/?>/g).exec(template);
        // console.log('=== _findTextNodeInSelfClosingTag ===')
        if (openingTagObject !== null) {
            const openingTag = openingTagObject[0];
            const openingTagName = openingTagObject[1];
            return {
                result: new TextNode(openingTag, openingTagName, undefined, undefined),
                endIndex: openingTag.length
            };
        }
        return { result: null, endIndex: null };
    }
    // генерируем TextNode по тэгу, который закрывается и открывается (например, <div></div>)
    _findTextNodeInUsualTag(template) {
        const openingTagObject = (/<(\w+)\b[^>]*>/g).exec(template);
        if (openingTagObject == null) {
            return { result: null, endIndex: null };
        }
        const startIndex = openingTagObject.index;
        const openingTag = openingTagObject[0];
        const openingTagName = openingTagObject[1];
        const TAG_REGEXP = new RegExp(`<[/]?(${openingTagName})+\\b[^>]*>`, 'g');
        let endIndex = null;
        let result = null;
        let counter = -1;
        let resultString = null;
        // поиск закрывающего тэга на том же уровне вложенности, что и открывающий
        while ((result = TAG_REGEXP.exec(template))) {
            const tag = result[0];
            if (this._isOpeningTag(tag)) {
                counter++;
            }
            else if (this._isClosingTag(tag) && counter > 0) {
                counter--;
            }
            else if (this._isClosingTag(tag) && counter === 0) {
                endIndex = result.index + tag.length;
                resultString = template.substring(startIndex, endIndex).trim();
                // entrails - это все, что находится между открывающим и закрывающим тэгом
                const entrails = resultString.substring(openingTag.length, resultString.length - tag.length);
                result = this._generateTextNode(openingTag, openingTagName, entrails);
                break;
            }
        }
        // возвращаем TextNode и индекс элемента шаблонной строки, на котором закончился поиск
        return { result: result, endIndex: endIndex };
    }
    _isStartsWithSelfClosingTag(template) {
        const result = (/<(\w+)\b[^>]*\/>/g).exec(template.trim());
        return !!result && result.index === 0;
    }
    _isOpeningTag(tag) {
        const OPENING_TAG_REGEXP = /<\w+\b[^/>]*>/g;
        return !!OPENING_TAG_REGEXP.exec(tag);
    }
    _isClosingTag(tag) {
        const CLOSING_TAG_REGEXP = /<\/\w+\b[^>]*>/g;
        return !!CLOSING_TAG_REGEXP.exec(tag);
    }
    _isParsable(template) {
        return this._isOpeningTag(template) || this._isStartsWithSelfClosingTag(template);
    }
    _generateTextNode(openingTag, tagName, entrails) {
        if (this._isParsable(entrails)) {
            return new TextNode(openingTag, tagName, new TextNodeParser(entrails).findAllTextNodes(), undefined);
        }
        else {
            return new TextNode(openingTag, tagName, undefined, entrails);
        }
    }
}
export default TextNodeParser;
//# sourceMappingURL=TextNodeParser.js.map