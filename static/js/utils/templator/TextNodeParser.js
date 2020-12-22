import TextNode from './TextNode';
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
        const SELF_CLOSING_TAG_REGEXP = /<(\w+)\b[^>]*\/?>/g;
        const selfClosingTagObject = SELF_CLOSING_TAG_REGEXP.exec(template);
        if (selfClosingTagObject !== null) {
            const TAG_INDEX = 0;
            const TAG_NAME_INDEX = 1;
            const tag = selfClosingTagObject[TAG_INDEX];
            const tagName = selfClosingTagObject[TAG_NAME_INDEX];
            return {
                result: new TextNode(tag, tagName, undefined, undefined),
                endIndex: tag.length
            };
        }
        return { result: null, endIndex: null };
    }
    // генерируем TextNode по тэгу, который закрывается и открывается (например, <div></div>)
    _findTextNodeInUsualTag(template) {
        const USUAL_TAG_REGEXP = /<(\w+)\b[^>]*>/g;
        const openingTagObject = USUAL_TAG_REGEXP.exec(template);
        if (openingTagObject == null) {
            return { result: null, endIndex: null };
        }
        const TAG_INDEX = 0;
        const TAG_NAME_INDEX = 1;
        const startIndex = openingTagObject.index;
        const openingTag = openingTagObject[TAG_INDEX];
        const openingTagName = openingTagObject[TAG_NAME_INDEX];
        const TAG_REGEXP = new RegExp(`<[/]?(${openingTagName})+\\b[^>]*>`, 'g');
        let endIndex = null;
        let result = null;
        let counter = -1;
        let resultString = null;
        // поиск закрывающего тэга на том же уровне вложенности, что и открывающий
        while ((result = TAG_REGEXP.exec(template))) {
            const TAG_INDEX = 0;
            const tag = result[TAG_INDEX];
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
        if (typeof template !== 'string') {
            throw new Error('invalid data type');
        }
        const SELF_CLOSING_TAG_REGEXP = /<(\w+)\b[^>]*\/>/g;
        const result = SELF_CLOSING_TAG_REGEXP.exec(template.trim());
        return !!result && result.index === 0;
    }
    _isOpeningTag(tag) {
        if (typeof tag !== 'string') {
            throw new Error('invalid data type');
        }
        const OPENING_TAG_REGEXP = /<\w+\b[^/>]*>/g;
        return !!OPENING_TAG_REGEXP.exec(tag);
    }
    _isClosingTag(tag) {
        if (typeof tag !== 'string') {
            throw new Error('invalid data type');
        }
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