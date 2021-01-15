import { assert } from 'chai'
import { describe, it, afterEach } from 'mocha'
import Block from '../../src/components/Block'
import Router from '../../src/utils/router/Router'

const defaultPath = '/'

const delayAction = (fn: Function, time = 1000) => {
    return new Promise<void>((resolve) => {
        fn()
        setTimeout(() => {
            resolve()
        }, time)
    })
}

const getRouter = () => {
    const router = new Router('.app')
        .use('/', getEmptyComponent())
        .use('/path1', getEmptyComponent())
        .use('/path2', getEmptyComponent())
    router.start()
    return router
}

const destructRouter = () => {
    new Router('').destruct()
    // возвращаем window.location к начальному состоянию
    window.history.pushState({}, '', defaultPath)
}

const getEmptyComponent = () => {
    return new Block({
        content: '',
        class: ''
    })
}

describe('Router', function () {
    afterEach('Чистим роутер т.к. он - синглтон', destructRouter)

    it('Роутер записывает пути', function () {
        const router = getRouter()
        assert.equal(router.routes.length, 3)
    })
    it('Роутер при старте переходит на window.location.pathname (указанный в setup.js)', function () {
        const router = getRouter()
        assert.equal(router._currentRoute?._pathname, defaultPath)
    })
    it('Тестирование перехода go по валидному пути', function () {
        const pathName = '/path1'
        const router = getRouter()
        router.go(pathName)
        assert.equal(router._currentRoute?._pathname, pathName)
        assert.equal(window.location.pathname, pathName)
    })
    it('Переход по незарегистрированному пути при неопределенном notFoundPage', function () {
        const pathName = '/path1frfrfr'
        const router = getRouter()
        router.go(pathName)
        assert.equal(router._notFoundPage, undefined)
        assert.equal(router._currentRoute?._pathname, defaultPath)
    })
    it('Переход по незарегистрированному пути при определенном notFoundPage', function () {
        const pathName = '/path1frfrfr'
        const router = getRouter()
        const notFoundPage = getEmptyComponent()
        router.useNotFound(notFoundPage)
        router.go(pathName)
        assert.equal(router._notFoundPage, notFoundPage)
        assert.equal(router._currentRoute?._block, notFoundPage)
        assert.equal(window.location.pathname, pathName)
    })
    it('Слушаем onpopstate event (например по переходу back()) ', function () {
        const router = getRouter()
        assert.equal(window.location.pathname, defaultPath)
        const path = '/path1'
        router.go(path)
        assert.equal(window.location.pathname, path)
        /* ?ВОПРОС?
         window.history.back нужно тестировать с задержкой, не очень понял почему
        источник: https://stackoverflow.com/questions/54522889/window-history-back-not-being-called-jest-enzyme
        */
        return delayAction(router.back.bind(router)).then(() => {
            assert.equal(router._currentRoute?._pathname, defaultPath)
            assert.equal(window.location.pathname, defaultPath)
        })
    })
})
