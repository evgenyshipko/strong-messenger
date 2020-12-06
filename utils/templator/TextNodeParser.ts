import TextNode from './TextNode.js'
import { Nullable } from '../../types/Types'

interface TextNodeData {
    result: Nullable<TextNode>,
    endIndex: Nullable<Number>
}

class TextNodeParser {
    _template: string

    constructor(template: string) {
        this._template = template
    }

    findAllTextNodes(): Array<TextNode> {
        let template = this._template
        const commonArr = []
        let endIndex: Nullable<Number> = 0
        let previousResult: Nullable<TextNode> = new TextNode('', '', undefined, undefined)
        while (previousResult !== null) {
            if (typeof endIndex === 'number') {
                template = template.substring(endIndex).trim()
            }
            const executionResult = this._findTextNode(template)
            endIndex = executionResult.endIndex
            previousResult = executionResult.result
            if (executionResult.result !== null) {
                commonArr.push(executionResult.result)
            }
            // console.log('template', template)
            // console.log('endIndex', endIndex)
        }
        if (commonArr.length === 0) {
            throw new Error('text todes not found, check your template')
        }
        return commonArr
    }

    _findTextNode(template: string): TextNodeData {
        if (this._isStartsWithSelfClosingTag(template)) {
            return this._findTextNodeInSelfClosingTag(template)
        } else {
            return this._findTextNodeInUsualTag(template)
        }
    }

    // _findTextNodeInPercent(template: string): TextNodeData {
    //     const tagObject = (/%({{\w+}})%/g).exec(template)
    //     if (tagObject !== null) {
    //         const tagRow = tagObject[0]
    //         const textContent = tagObject[1]
    //
    //         console.log('==== _findTextNodeInPercent ===')
    //         console.log('tagRow', tagRow, 'textContent', textContent)
    //
    //         return {
    //             result: new TextNode(
    //                 undefined,
    //                 undefined,
    //                 undefined,
    //                 textContent
    //             ),
    //             endIndex: tagRow.length
    //         }
    //     }
    //     return { result: null, endIndex: null }
    // }

    _findTextNodeInSelfClosingTag(template: string): TextNodeData {
        const openingTagObject = (/<(\w+)\b[^>]*\/?>/g).exec(template)
        // console.log('=== _findTextNodeInSelfClosingTag ===')
        if (openingTagObject !== null) {
            const openingTag = openingTagObject[0]
            const openingTagName = openingTagObject[1]
            return {
                result: new TextNode(
                    openingTag,
                    openingTagName,
                    undefined,
                    undefined
                ),
                endIndex: openingTag.length
            }
        }
        return { result: null, endIndex: null }
    }

    _findTextNodeInUsualTag(template: string): TextNodeData {
        const openingTagObject = (/<(\w+)\b[^>]*>/g).exec(template)
        if (openingTagObject == null) {
            return { result: null, endIndex: null }
        }
        const startIndex = openingTagObject.index
        const openingTag = openingTagObject[0]
        const openingTagName = openingTagObject[1]

        const GENERATED_TAG_REGEXP = new RegExp(`<[/]?(${openingTagName})+\\b[^>]*>`, 'g')

        let endIndex = null
        let result = null
        let counter = -1
        let resultString = null
        while ((result = GENERATED_TAG_REGEXP.exec(template))) {
            const tag = result[0]
            if (this._isOpeningTag(tag)) {
                counter++
            } else if (this._isClosingTag(tag) && counter > 0) {
                counter--
            } else if (this._isClosingTag(tag) && counter === 0) {
                endIndex = result.index + tag.length
                resultString = template.substring(startIndex, endIndex).trim()
                const entrails = resultString.substring(openingTag.length, resultString.length - tag.length)
                result = this._generateTextNode(openingTag, openingTagName, entrails)
                break
            }
        }
        return { result: result, endIndex: endIndex }
    }

    // _isStartsWithPercent(template: string) {
    //     const result = (/%({{\w+}})%/g).exec(template)
    //     if (result && result.index === 0) {
    //         console.log('_isStartsWithPercent', template)
    //     }
    //     return result && result.index === 0
    // }

    _isStartsWithSelfClosingTag(template: string) {
        const result = (/<(\w+)\b[^>]*\/>/g).exec(template.trim())
        if (result && result.index === 0) {
            console.log('_isStartsWithSelfClosingTag', template)
        }
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
        // return this._isOpeningTag(template) || !!this._isStartsWithPercent(template)
        return this._isOpeningTag(template) || this._isStartsWithSelfClosingTag(template)
    }

    _generateTextNode(openingTag: string, tagName: string, entrails: string): TextNode {
        if (this._isParsable(entrails)) {
            return new TextNode(
                openingTag,
                tagName,
                new TextNodeParser(entrails).findAllTextNodes(),
                undefined
            )
        } else {
            return new TextNode(
                openingTag,
                tagName,
                undefined,
                entrails
            )
        }
    }
}

export default TextNodeParser
