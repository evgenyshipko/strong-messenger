import { assert } from 'chai'
import { describe, it } from 'mocha'
import TextNodeParser from '../../utils/templator/TextNodeParser'
import TextNode from '../../utils/templator/TextNode'

describe('TextNodeParser', function() {
    function getInstance(template: string) {
        return new TextNodeParser(template)
    }

    describe('Функции, которые смотрят есть ли в строке тег и возвращают boolean', function () {
        describe('_isOpeningTag', function() {
            const emptyTextNodeParser = getInstance('')
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
            const emptyTextNodeParser = getInstance('')
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
            const emptyTextNodeParser = getInstance('')
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
            const emptyTextNodeParser = getInstance('')
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
        const emptyTextNodeParser = getInstance('')
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
})
