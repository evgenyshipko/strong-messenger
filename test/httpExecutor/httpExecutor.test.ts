import { afterEach, beforeEach, describe, it } from 'mocha'
import HTTPExecutor, { ErrorResponse } from '../../src/utils/httpExecutor/httpExecutor'
import { assert } from 'chai'
import { isEqual } from '../../src/utils/utils'

const sinon = require('sinon')
const url = 'https://some.url.com/'
const data = { id: 12, comment: 'Hey there' }
const errorMessage = 'ERROR!'

describe('httpExecutor', function () {
    beforeEach('Запускаем сервер', function () {
        this.server = sinon.createFakeServer()
        this.server.autoRespond = true
    })

    afterEach('Глушим сервер', function () {
        this.server.restore()
    })

    it('GET RESPONSE 200', function () {
        this.server.respondWith('GET', '*',
            [200, { 'Content-Type': 'application/json' },
                JSON.stringify(data)])
        return new HTTPExecutor()
            .get(url)
            .then((res) => {
                assert.equal(res.status, 200)
                assert.equal(isEqual(JSON.parse(res.response), data), true)
            }).catch((_err) => {
                assert.fail(null, null, 'Должен был отработать блок then')
            })
    })

    it('GET RESPONSE 400 (Ответы со статусами статусами < 200 и >=300 обрабатывает Promise.reject и мы ловим их кэтчем)', function (done) {
        this.server.respondWith('GET', '*',
            [400, { 'Content-Type': 'application/json' },
                errorMessage])
        new HTTPExecutor()
            .get(url)
            .then((_res) => {
                done(new Error('Должен был отработать блок catch'))
            })
            .catch((error : ErrorResponse) => {
                try {
                    assert.notEqual(error, null)
                    assert.notEqual(error, undefined)
                    assert.equal(error.status, 400)
                    assert.equal(error.response, errorMessage)
                    done()
                } catch (e) {
                    done(new Error(e.message))
                }
            })
    })

    it('GET RESPONSE 500', function (done) {
        this.server.respondWith('GET', '*',
            [500, { 'Content-Type': 'application/json' },
                errorMessage])
        new HTTPExecutor()
            .get(url)
            .then((_res) => {
                done(new Error('Должен был отработать блок catch'))
            })
            .catch((error : ErrorResponse) => {
                try {
                    assert.notEqual(error, null)
                    assert.notEqual(error, undefined)
                    assert.equal(error.status, 500)
                    assert.equal(error.response, errorMessage)
                    done()
                } catch (e) {
                    done(new Error(e.message))
                }
            })
    })

    it('POST RESPONSE 200', function () {
        this.server.respondWith('POST', '*',
            [200, { 'Content-Type': 'application/json' },
                JSON.stringify(data)])
        return new HTTPExecutor()
            .post(url)
            .then((res) => {
                assert.equal(res.status, 200)
                assert.equal(isEqual(JSON.parse(res.response), data), true)
            }).catch((_err) => {
                assert.fail(null, null, 'Должен был отработать блок then')
            })
    })

    it('POST RESPONSE 500', function (done) {
        this.server.respondWith('POST', '*',
            [500, { 'Content-Type': 'application/json' },
                errorMessage])
        new HTTPExecutor()
            .post(url)
            .then((_res) => {
                done(new Error('Должен был отработать блок catch'))
            })
            .catch((error : ErrorResponse) => {
                try {
                    assert.notEqual(error, null)
                    assert.notEqual(error, undefined)
                    assert.equal(error.status, 500)
                    assert.equal(error.response, errorMessage)
                    done()
                } catch (e) {
                    done(new Error(e.message))
                }
            })
    })

    // ?ВОПРОС? тесты на PUT и DELETE в том же духе. Имеет ли смысл их тоже расписывать?

    it('Обратимся на несуществующую страницу', function () {
        return new HTTPExecutor()
            .get(url)
            .catch((res: ErrorResponse) => {
                assert.equal(res.status, 404)
                assert.equal(res.response, '')
                assert.equal(res.responseText, '')
            })
    })
})
