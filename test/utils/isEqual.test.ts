import { describe, it } from 'mocha'
import { assert } from 'chai'
import { isEqual } from '../../utils/utils'

describe('isEqual', function () {
    describe('Объекты', function () {
        it('Простой объект', function () {
            const a = { a: 75, b: '12' }
            const b = { a: 75, b: '12' }
            assert.equal(isEqual(a, b), true)
        })
        it('Простой объект чувствителен к типам аргументов', function () {
            const a = { a: 75, b: '12' }
            const b = { a: 75, b: 12 }
            assert.equal(isEqual(a, b), false)
        })
        it('Может сравнивать функции', function () {
            const a = { a: 75, b: () => { return 5 } }
            const b = { a: 75, b: () => { return 5 } }
            assert.equal(isEqual(a, b), true)
        })
        it('Не различает одинаковые по смыслу функции, важно именование переменных и стиль написания', function () {
            const a = { a: 75, b: (a: string) => { return a } }
            const b = { a: 75, b: (b: string) => { return b } }
            assert.equal(isEqual(a, b), false)
        })
        it('Может сравнивать NaN', function () {
            const a = { a: NaN }
            const b = { a: NaN }
            const c = { a: 2 }
            assert.equal(isEqual(a, b), true)
            assert.equal(isEqual(a, c), false)
        })
        it('Не путает массивы и объекты', function () {
            const a = { foo: [1, 2] }
            const b = { foo: { 0: 1, 1: 2 } }
            assert.equal(isEqual(a, b), false)
        })
    })

    describe('Объекты с вложенностью', function () {
        it('Вложенный объект', function () {
            const a = { a: 75, b: { c: 15 } }
            const b = { a: 75, b: { c: 15 } }
            const c = { a: 75, b: { c: 15 }, e: 78678 }
            assert.equal(isEqual(a, b), true)
            assert.equal(isEqual(a, c), false)
        })
        it('Вложенный массив чисел', function () {
            const a = { a: 75, b: [1, 2, 3] }
            const b = { a: 75, b: [1, 2, 3] }
            const c = { a: 75, b: [1, 2, 4] }
            assert.equal(isEqual(a, b), true)
            assert.equal(isEqual(a, c), false)
        })
        it('Вложенный массив с аргументом-объектом ', function () {
            const a = { a: 75, b: [1, 2, { c: 56 }] }
            const b = { a: 75, b: [1, 2, { c: 56 }] }
            const c = { a: 75, b: [1, 2, { e: 56 }] }
            assert.equal(isEqual(a, b), true)
            assert.equal(isEqual(a, c), false)
        })
    })
})
