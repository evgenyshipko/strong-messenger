import { assert } from 'chai'
import { describe, it, afterEach } from 'mocha'
import Block from '../../components/Block'
import Router from '../../utils/router/Router'

const defaultPath = '/'

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
    it('При переходе по неизвеcтному пути с неопределенным notFoundPage', function () {
        const pathName = '/path1frfrfr'
        const router = getRouter()
        router.go(pathName)
        assert.equal(router._notFoundPage, undefined)
        assert.equal(router._currentRoute?._pathname, defaultPath)
    })
    it('При переходе по неизвеcтному пути попадаем на notFoundPage, если он определен', function () {
        const pathName = '/path1frfrfr'
        const router = getRouter()
        const notFoundPage = getEmptyComponent()
        router.useNotFound(notFoundPage)
        router.go(pathName)
        assert.equal(router._notFoundPage, notFoundPage)
        assert.equal(router._currentRoute?._block, notFoundPage)
        assert.equal(window.location.pathname, pathName)
    })
    it('onpopstate event', function () {
        const router = getRouter()
        console.log('window.location.pathname',window.location.pathname)
        router.go('/path1')
        console.log('window.location.pathname',window.location.pathname)
        router.back() // вызывает onpopstate
        console.log('window.location.pathname',window.location.pathname)
        assert.equal(router._currentRoute?._pathname, defaultPath)
        assert.equal(window.location.pathname, defaultPath)
    })
})
