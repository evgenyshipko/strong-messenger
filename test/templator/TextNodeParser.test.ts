import { assert } from 'chai'
import { describe, it } from 'mocha'
import TextNodeParser from '../../utils/templator/TextNodeParser'
import TextNode from '../../utils/templator/TextNode'

describe('TextNodeParser', function() {
    function getTextNodeParser(template: string) {
        return new TextNodeParser(template)
    }

    describe('Функции, которые смотрят есть ли в строке тег и возвращают boolean', function () {
        describe('_isOpeningTag', function() {
            const emptyTextNodeParser = getTextNodeParser('')
            it('Простой открывающий тег', function() {
                assert.equal(emptyTextNodeParser._isOpeningTag('<div>'), true)
            })
            it('Открывающий тег с содержимым', function() {
                assert.equal(emptyTextNodeParser._isOpeningTag('<div onclick="function()">'), true)
            })
            it('Самозакрывающийся тег', function() {
                assert.equal(emptyTextNodeParser._isOpeningTag('<div />'), false)
            })
            it('Закрывающий тег', function() {
                assert.equal(emptyTextNodeParser._isOpeningTag('</div>'), false)
            })
            it('Пустая строка', function() {
                assert.equal(emptyTextNodeParser._isOpeningTag(''), false)
            })
            it('Рандомная строка', function() {
                assert.equal(emptyTextNodeParser._isOpeningTag('аоп_675ваповс:%;5'), false)
            })
        })

        describe('_isClosingTag', function() {
            const emptyTextNodeParser = getTextNodeParser('')
            it('Простой открывающий тег', function() {
                assert.equal(emptyTextNodeParser._isClosingTag('<div>'), false)
            })
            it('Открывающий тег с содержимым', function() {
                assert.equal(emptyTextNodeParser._isClosingTag('<div onclick="function()">'), false)
            })
            it('Самозакрывающийся тег', function() {
                assert.equal(emptyTextNodeParser._isClosingTag('<div />'), false)
            })
            it('Закрывающий тег', function() {
                assert.equal(emptyTextNodeParser._isClosingTag('</div>'), true)
            })
            it('Пустая строка', function() {
                assert.equal(emptyTextNodeParser._isClosingTag(''), false)
            })
            it('Рандомная строка', function() {
                assert.equal(emptyTextNodeParser._isClosingTag('аоп_675ваповс:%;5'), false)
            })
        })

        describe('_isStartsWithSelfClosingTag', function() {
            const emptyTextNodeParser = getTextNodeParser('')
            it('Простой открывающий тег', function() {
                assert.equal(emptyTextNodeParser._isStartsWithSelfClosingTag('<div>'), false)
            })
            it('Открывающий тег с содержимым', function() {
                assert.equal(emptyTextNodeParser._isStartsWithSelfClosingTag('<div onclick="function()">'), false)
            })
            it('Самозакрывающийся тег в начале строки', function() {
                assert.equal(emptyTextNodeParser._isStartsWithSelfClosingTag('<div />'), true)
            })
            it('Самозакрывающийся тег не в начале строки', function() {
                assert.equal(emptyTextNodeParser._isStartsWithSelfClosingTag('<div></div><div />'), false)
            })
            it('Закрывающий тег', function() {
                assert.equal(emptyTextNodeParser._isStartsWithSelfClosingTag('</div>'), false)
            })
            it('Пустая строка', function() {
                assert.equal(emptyTextNodeParser._isStartsWithSelfClosingTag(''), false)
            })
            it('Рандомная строка', function() {
                assert.equal(emptyTextNodeParser._isStartsWithSelfClosingTag('аоп_675ваповс:%;5'), false)
            })
        })

        describe('_isParsable', function() {
            const emptyTextNodeParser = getTextNodeParser('')
            it('Простой открывающий тег', function() {
                assert.equal(emptyTextNodeParser._isParsable('<div>'), true)
            })
            it('Открывающий тег с содержимым', function() {
                assert.equal(emptyTextNodeParser._isParsable('<div onclick="function()">'), true)
            })
            it('Самозакрывающийся тег в начале строки', function() {
                assert.equal(emptyTextNodeParser._isParsable('<div />'), true)
            })
            it('Самозакрывающийся тег не в начале строки', function() {
                assert.equal(emptyTextNodeParser._isParsable('...><div />'), false)
            })
            it('Закрывающий тег', function() {
                assert.equal(emptyTextNodeParser._isParsable('</div>'), false)
            })
            it('Пустая строка', function() {
                assert.equal(emptyTextNodeParser._isParsable(''), false)
            })
            it('Рандомная строка', function() {
                assert.equal(emptyTextNodeParser._isParsable('аоп_675ваповс:%;5'), false)
            })
        })
    })

    describe('_generateTextNode', function () {
        const emptyTextNodeParser = getTextNodeParser('')
        it('entrails - простой текст, возвращает TextNode без children', function() {
            const result = emptyTextNodeParser._generateTextNode('<div content >', 'div', 'some_text')
            assert.equal(result instanceof TextNode, true)
            assert.equal(result.textContent, 'some_text')
            assert.equal(result.tagName, 'div')
            assert.equal(result.openingTag, '<div content >')
            assert.equal(result.children, undefined)
        })
        it('entrails содержит в себе тег, возвращает TextNode с children', function() {
            const result = emptyTextNodeParser._generateTextNode('<div content >', 'div', '<input />')
            assert.equal(result instanceof TextNode, true)
            assert.equal(result.textContent, undefined)
            assert.equal(result.tagName, 'div')
            assert.equal(result.openingTag, '<div content >')
            assert.equal(Array.isArray(result.children), true)
            assert.equal(result.children![0] instanceof TextNode, true)
        })
    })

    describe('_isAvailableTag', function () {
        const emptyTextNodeParser = getTextNodeParser('')
        it('script', function () {
            const tagName = 'script'
            assert.equal(emptyTextNodeParser._isAvailableTag(tagName), false)
        })
        it('style', function () {
            const tagName = 'style'
            assert.equal(emptyTextNodeParser._isAvailableTag(tagName), false)
        })
        it('div', function () {
            const tagName = 'div'
            assert.equal(emptyTextNodeParser._isAvailableTag(tagName), true)
        })
    })

    describe('_findTextNodeInSelfClosingTag', function () {
        const emptyTextNodeParser = getTextNodeParser('')
        it('Пустой шаблон', function () {
            const template = ''
            assert.equal(emptyTextNodeParser._findTextNodeInSelfClosingTag(template).result, null)
            assert.equal(emptyTextNodeParser._findTextNodeInSelfClosingTag(template).endIndex, null)
        })
        it('Рандомный текст', function () {
            const template = 'bhdfkfkh'
            assert.equal(emptyTextNodeParser._findTextNodeInSelfClosingTag(template).result, null)
            assert.equal(emptyTextNodeParser._findTextNodeInSelfClosingTag(template).endIndex, null)
        })
        it('Обычный тег', function () {
            const template = '<div>Hi</div>'
            assert.equal(emptyTextNodeParser._findTextNodeInSelfClosingTag(template).result, null)
            assert.equal(emptyTextNodeParser._findTextNodeInSelfClosingTag(template).endIndex, null)
        })
        it('Самозакрывающийся тег', function () {
            const template = '<input />'
            assert.equal(emptyTextNodeParser._findTextNodeInSelfClosingTag(template).result?.openingTag, template)
            assert.equal(emptyTextNodeParser._findTextNodeInSelfClosingTag(template).result?.tagName, 'input')
            assert.equal(emptyTextNodeParser._findTextNodeInSelfClosingTag(template).endIndex, template.length)
        })
    })

    describe('_findTextNodeInUsualTag', function () {
        const emptyTextNodeParser = getTextNodeParser('')
        it('Пустой шаблон', function () {
            const template = ''
            assert.equal(emptyTextNodeParser._findTextNodeInUsualTag(template).result, null)
            assert.equal(emptyTextNodeParser._findTextNodeInUsualTag(template).endIndex, null)
        })
        it('Рандомный текст', function () {
            const template = 'bhdfkfkh'
            assert.equal(emptyTextNodeParser._findTextNodeInUsualTag(template).result, null)
            assert.equal(emptyTextNodeParser._findTextNodeInUsualTag(template).endIndex, null)
        })
        it('Самозакрывающийся тег', function () {
            const template = '<input />'
            assert.equal(emptyTextNodeParser._findTextNodeInUsualTag(template).result, null)
            assert.equal(emptyTextNodeParser._findTextNodeInUsualTag(template).endIndex, null)
        })
        it('Обычный тег', function () {
            const template = '<div>Hi</div>'
            assert.equal(emptyTextNodeParser._findTextNodeInUsualTag(template).result?.textContent, 'Hi')
            assert.equal(emptyTextNodeParser._findTextNodeInUsualTag(template).result?.openingTag, '<div>')
            assert.equal(emptyTextNodeParser._findTextNodeInUsualTag(template).result?.tagName, 'div')
            assert.equal(emptyTextNodeParser._findTextNodeInUsualTag(template).endIndex, template.length)
        })
    })

    describe('findAllTextNodes', function () {
        it('Пустой шаблон не парсится', function () {
            const template = ''
            const textNodeParser = getTextNodeParser(template)
            assert.throws(textNodeParser.findAllTextNodes, Error)
        })
        it('Рандомный текст не парсится', function () {
            const template = 'kdfhsfkdhdfb'
            const textNodeParser = getTextNodeParser(template)
            assert.throws(textNodeParser.findAllTextNodes, Error)
        })
        it('Тег style не парсится', function () {
            const template = '<style>Привет</style>'
            const textNodeParser = getTextNodeParser(template)
            assert.throws(textNodeParser.findAllTextNodes, Error)
        })
        it('Тег script не парсится', function () {
            const template = '<script>Привет</script>'
            const textNodeParser = getTextNodeParser(template)
            assert.throws(textNodeParser.findAllTextNodes, Error)
        })
        it('Парсинг обычного шаблона', function () {
            const template = `<div>Привет</div>
                    <div>{{hi}}</div>
                    <div>Привет</div>`
            const textNodeParser = getTextNodeParser(template)
            assert.equal(textNodeParser.findAllTextNodes().length, 3)
        })
        it('Все, что не завернуто в теги - не парсится', function () {
            const template = `<div>Привет</div>
                    {{hi}}
                    sayHi
                    {{hello}}}
                    <div>Привет</div>`
            const textNodeParser = getTextNodeParser(template)
            assert.equal(textNodeParser.findAllTextNodes().length, 2)
        })
        it('Вложенные теги парсятся рекурсивно', function () {
            const template = `<div>
                            <div>Привет</div>
                        </div>`
            const textNodeParser = getTextNodeParser(template)
            const textNodeList = textNodeParser.findAllTextNodes()
            assert.equal(textNodeList.length, 1)
            assert.equal(textNodeList[0].children?.length, 1)
        })
    })
})
