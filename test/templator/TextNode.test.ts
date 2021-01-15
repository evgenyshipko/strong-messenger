import { assert } from 'chai'
import { describe, it } from 'mocha'
import TextNode from '../../src/utils/templator/TextNode'

const getEmptyTextNode = () => {
    return new TextNode('', '', undefined, undefined)
}

const getClassContext = () => {
    return { class: 'test' }
}

describe('TextNode', function () {
    const emptyTextNode = getEmptyTextNode()

    describe('_getDataFromContext', function() {
        const context = {
            key1: {
                key3: 'b'
            },
            key2: 'a'
        }
        it('доступ до первого уровня вложенности', function() {
            assert.equal(emptyTextNode._getDataFromContext(context, 'key2'), 'a')
        })
        it('доступ до второго уровня вложенности', function() {
            assert.equal(emptyTextNode._getDataFromContext(context, 'key1.key3'), 'b')
        })
        it('доступ по несуществующему ключу', function() {
            assert.equal(emptyTextNode._getDataFromContext(context, 'fdgkhsu45i\\j\\j'), undefined)
            assert.equal(emptyTextNode._getDataFromContext(context, 'key1.key4'), undefined)
        })
    })

    describe('_isAttributeAvailable', function () {
        it('onclick, onerror запрещены', function () {
            assert.equal(emptyTextNode._isAttributeAvailable('onclick'), false)
            assert.equal(emptyTextNode._isAttributeAvailable('onerror'), false)
        })
    })

    describe('_isParsable', function () {
        it('валидный аргумент', function () {
            const textContent = '{{privet}}'
            assert.equal(emptyTextNode._isParsable(textContent), true)
        })
        it('пустая строка', function () {
            const textContent = ''
            assert.equal(emptyTextNode._isParsable(textContent), false)
        })
        it('рандомный текст', function () {
            const textContent = '534gdys6$%#*&FJg'
            assert.equal(emptyTextNode._isParsable(textContent), false)
        })
    })

    describe('_getClassNameFromOpeningTag', function () {
        it('Открывающий тэг - pандомная строка', function () {
            const openingTag = 'jkfds56678ryhfsdu*%&^%&^'
            const textNode = new TextNode(openingTag, '', undefined, undefined)
            assert.equal(textNode._getClassNameFromOpeningTag(), null)
        })
        it('Открывающий тэг без классового аттрибута ', function () {
            const openingTag = '<div>'
            const textNode = new TextNode(openingTag, '', undefined, undefined)
            assert.equal(textNode._getClassNameFromOpeningTag(), null)
        })
        it('Классовый атрибут в двойных кавычках', function () {
            const openingTag = '<div class="test">'
            const textNode = new TextNode(openingTag, '', undefined, undefined)
            assert.equal(textNode._getClassNameFromOpeningTag()?.length, 1)
            assert.equal(textNode._getClassNameFromOpeningTag()?.[0], 'test')
        })
        it('Классовый атрибут в одинарных кавычках', function () {
            const openingTag = '<div class=\'test\'>'
            const textNode = new TextNode(openingTag, '', undefined, undefined)
            assert.equal(textNode._getClassNameFromOpeningTag()?.length, 1)
            assert.equal(textNode._getClassNameFromOpeningTag()?.[0], 'test')
        })
        it('Несколько классовых имен', function () {
            const openingTag = '<div class=\'test test test\'>'
            const textNode = new TextNode(openingTag, '', undefined, undefined)
            assert.equal(textNode._getClassNameFromOpeningTag()?.length, 3)
        })
    })

    describe('_getClassNameFromContext', function () {
        const context = getClassContext()
        it('Открывающий тэг - pандомная строка', function () {
            const openingTag = 'jkfds56678ryhfsdu*%&^%&^'
            const textNode = new TextNode(openingTag, '', undefined, undefined)
            assert.equal(textNode._getClassNameFromContext(context), null)
        })
        it('Открывающий тэг без классового аттрибута ', function () {
            const openingTag = '<div>'
            const textNode = new TextNode(openingTag, '', undefined, undefined)
            assert.equal(textNode._getClassNameFromContext(context), null)
        })
        it('Классовый атрибут есть в контексте', function () {
            const openingTag = '<div class={{class}}>'
            const textNode = new TextNode(openingTag, '', undefined, undefined)
            assert.equal(textNode._getClassNameFromContext(context)?.length, 1)
            assert.equal(textNode._getClassNameFromContext(context)?.[0], 'test')
        })
        it('Классового атрибута нет в контексте', function () {
            const openingTag = '<div class={{class}}>'
            const textNode = new TextNode(openingTag, '', undefined, undefined)
            assert.equal(textNode._getClassNameFromContext({}), null)
        })
    })

    describe('toHTMLElement', function () {
        it('Тестирую подключение глобальной переменной document в файле setup.js', function () {
            const textNode = new TextNode(
                '<div>',
                'div',
                undefined,
                'test')
            assert.equal(textNode.toHTMLElement({}).textContent, 'test')
        })
    })

    // TODO: дописать тесты
})
