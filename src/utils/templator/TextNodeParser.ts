import TextNode from './TextNode'
import { Nullable } from '../../types/Types'

interface TextNodeData {
    result: Nullable<TextNode>,
    endIndex: Nullable<Number>
}

class TextNodeParser {
    _template: string
    static SELF_CLOSING_TAG_REGEXP = /<(\w+)\b[^>]*\/>/g

    constructor(template: string) {
        this._template = template
    }

    findAllTextNodes(): TextNode[] {
        let template = this._template
        const textNodeArr = []
        let endIndex: Nullable<Number> = 0
        let previousResult: Nullable<TextNode> = new TextNode('', '', undefined, undefined)
        while (previousResult !== null) {
            if (typeof endIndex === 'number') {
                template = template.substring(endIndex).trim()
            }
            const executionResult = this._findTextNode(template)
            endIndex = executionResult.endIndex
            previousResult = executionResult.result
            if (executionResult.result !== null && this._isAvailableTag(executionResult.result.tagName)) {
                textNodeArr.push(executionResult.result)
            }
        }
        if (textNodeArr.length === 0) {
            throw new Error('text nodes not found, check your template')
        }
        return textNodeArr
    }

    _isAvailableTag(tagName: string) {
        // запрещены script, style теги (санитайзинг XSS)
        const availableTagNames = ['div', 'button', 'input', 'span',
            'img', 'label', 'h1', 'h2', 'h3', 'h4',
            'h5', 'h6', 'i', 'form', 'datalist', 'option', 'li', 'ul', 'p', 'br']
        return availableTagNames.includes(tagName)
    }

    _findTextNode(template: string): TextNodeData {
        if (this._isStartsWithSelfClosingTag(template)) {
            return this._findTextNodeInSelfClosingTag(template)
        } else {
            return this._findTextNodeInUsualTag(template)
        }
    }

    // генерируем TextNode по самозакрывающемуся тэгу (например, <input />)
    _findTextNodeInSelfClosingTag(template: string): TextNodeData {
        const SELF_CLOSING_TAG_REGEXP = /<(\w+)\b[^>]*\/>/g
        const selfClosingTagObject = SELF_CLOSING_TAG_REGEXP.exec(template)
        if (selfClosingTagObject !== null) {
            const TAG_INDEX = 0
            const TAG_NAME_INDEX = 1
            const tag = selfClosingTagObject[TAG_INDEX]
            const tagName = selfClosingTagObject[TAG_NAME_INDEX]
            return {
                result: new TextNode(
                    tag,
                    tagName
                ),
                endIndex: tag.length
            }
        }
        return { result: null, endIndex: null }
    }

    // генерируем TextNode по тэгу, который закрывается и открывается (например, <div></div>)
    _findTextNodeInUsualTag(template: string): TextNodeData {
        const USUAL_TAG_REGEXP = /<(\w+)\b[^>]*>/g
        const openingTagObject = USUAL_TAG_REGEXP.exec(template)
        if (openingTagObject == null) {
            return { result: null, endIndex: null }
        }
        const TAG_INDEX = 0
        const TAG_NAME_INDEX = 1
        const startIndex = openingTagObject.index
        const openingTag = openingTagObject[TAG_INDEX]
        const openingTagName = openingTagObject[TAG_NAME_INDEX]

        const TAG_REGEXP = new RegExp(`<[/]?(${openingTagName})+\\b[^>]*>`, 'g')

        let endIndex = null
        let result = null
        let counter = -1
        let resultString = null

        // поиск закрывающего тэга на том же уровне вложенности, что и открывающий
        while ((result = TAG_REGEXP.exec(template))) {
            const TAG_INDEX = 0
            const tag = result[TAG_INDEX]
            if (this._isOpeningTag(tag)) {
                counter++
            } else if (this._isClosingTag(tag) && counter > 0) {
                counter--
            } else if (this._isClosingTag(tag) && counter === 0) {
                endIndex = result.index + tag.length
                resultString = template.substring(startIndex, endIndex).trim()
                // entrails - это все, что находится между открывающим и закрывающим тэгом
                const entrails = resultString.substring(openingTag.length, resultString.length - tag.length)
                result = this._generateTextNode(openingTag, openingTagName, entrails)
                break
            }
        }
        // возвращаем TextNode и индекс элемента шаблонной строки, на котором закончился поиск
        return { result: result, endIndex: endIndex }
    }

    _isStartsWithSelfClosingTag(template: string) {
        const SELF_CLOSING_TAG_REGEXP = /<(\w+)\b[^>]*\/>/g
        const result = SELF_CLOSING_TAG_REGEXP.exec(template.trim())
        return !!result && result.index === 0
    }

    _isOpeningTag(tag: string):boolean {
        const OPENING_TAG_REGEXP = /<\w+\b[^/>]*>/g
        return !!OPENING_TAG_REGEXP.exec(tag)
    }

    _isClosingTag(tag: string):boolean {
        const CLOSING_TAG_REGEXP = /<\/\w+\b[^>]*>/g
        return !!CLOSING_TAG_REGEXP.exec(tag)
    }

    _isParsable(template: string):boolean {
        return this._isOpeningTag(template) || this._isStartsWithSelfClosingTag(template)
    }

    _generateTextNode(openingTag: string, tagName: string, entrails: string): TextNode {
        if (this._isParsable(entrails)) {
            return new TextNode(
                openingTag,
                tagName,
                new TextNodeParser(entrails).findAllTextNodes()
            )
        }
        return new TextNode(
            openingTag,
            tagName,
            undefined,
            entrails
        )
    }
}

export default TextNodeParser
