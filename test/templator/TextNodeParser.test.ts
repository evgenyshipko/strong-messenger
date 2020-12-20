import { assert } from 'chai'
import { describe, it } from 'mocha'
import TextNodeParser from '../../utils/templator/TextNodeParser'
import TextNode from "../../utils/templator/TextNode";

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
            it('Null', function() {
                assert.throw(() => { emptyTextNodeParser._isOpeningTag(null) }, Error)
            })
            it('Число', function() {
                assert.throw(() => { emptyTextNodeParser._isOpeningTag(1) }, Error)
            })
            it('Объект', function() {
                assert.throw(() => { emptyTextNodeParser._isOpeningTag({ a: 1 }) }, Error)
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
            it('Null', function() {
                assert.throw(() => { emptyTextNodeParser._isClosingTag(null) }, Error)
            })
            it('Число', function() {
                assert.throw(() => { emptyTextNodeParser._isClosingTag(1) }, Error)
            })
            it('Объект', function() {
                assert.throw(() => { emptyTextNodeParser._isClosingTag({ a: 1 }) }, Error)
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
            it('Null', function() {
                assert.throw(() => { emptyTextNodeParser._isStartsWithSelfClosingTag(null) }, Error)
            })
            it('Число', function() {
                assert.throw(() => { emptyTextNodeParser._isStartsWithSelfClosingTag(1) }, Error)
            })
            it('Объект', function() {
                assert.throw(() => { emptyTextNodeParser._isStartsWithSelfClosingTag({ a: 1 }) }, Error)
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
            it('Null', function() {
                assert.throw(() => { emptyTextNodeParser._isParsable(null) }, Error)
            })
            it('Число', function() {
                assert.throw(() => { emptyTextNodeParser._isParsable(1) }, Error)
            })
            it('Объект', function() {
                assert.throw(() => { emptyTextNodeParser._isParsable({ a: 1 }) }, Error)
            })
        })
    })

    describe('_generateTextNode', function () {
        const emptyTextNodeParser = getInstance('')
        it('возвращает TextNode без children', function() {
            const result = emptyTextNodeParser._generateTextNode('<div content >', 'div', 'some_text')
            assert.equal(result instanceof TextNode, true)
            assert.equal(result.textContent, 'some_text')
            assert.equal(result.tagName, 'div')
            assert.equal(result.openingTag, '<div content >')
            assert.equal(result.children, undefined)
        })
    })
})
