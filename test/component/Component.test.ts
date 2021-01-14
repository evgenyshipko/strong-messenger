import { assert } from 'chai'
import { describe, it } from 'mocha'
import Component from '../../utils/component/Component'

/* global Event */

const sinon = require('sinon')

interface TestComponentProps {
    class: string,
    text: string
}

class TestComponent extends Component<TestComponentProps> {
    template(): string {
        return '<div class={{class}}>{{text}}</div>'
    }
}
const getInitialProps = () => {
    return { class: 'first', text: 'test' }
}

const getTestComponent = () => {
    return new TestComponent(getInitialProps())
}

describe('Component', function () {
    it('Компонент - абстрактный класс и мы не можем создать экземпляр из-за пустого шаблона', function () {
        assert.throws(() => { return new Component({}) }, Error, 'text nodes not found')
    })
    it('getContent (Компонент содержит контент, соответствующий шаблону)', function () {
        const testComponent = getTestComponent()
        const content = testComponent.getContent()
        assert.notEqual(content, null)
        assert.notEqual(content, undefined)
        assert.equal(content?.length, 1)
        const node = content?.[0]
        assert.notEqual(node, undefined)
        assert.notEqual(node, null)
        assert.equal(node?.tagName.toLocaleLowerCase(), 'div')
        assert.equal(node?.textContent, getInitialProps().text)
        assert.equal(node?.classList.length, 1)
        assert.equal(node?.classList[0], getInitialProps().class)
    })
    it('setProps (При изменении пропсов происходит перерисовка)', function () {
        const testComponent = getTestComponent()
        const changedProps = { text: 'newText' }
        testComponent.setProps(changedProps)
        const content = testComponent.getContent()
        const node = content?.[0]
        assert.equal(node?.textContent, changedProps.text)
    })
    /*
         TODO: написать тест передачу пустых пропсов setProps({}).
            Сходу не получилось обернуть _render() функцию с помощью sinon.spy(), надо рабираться почему
         */
    it('hide (скрывает контент компонента)', function () {
        const testComponent = getTestComponent()
        testComponent.hide()
        const content = testComponent.getContent()
        assert.notEqual(content, null)
        assert.notEqual(content, undefined)
        content?.forEach((element) => {
            assert.equal(element.classList.contains('hidden'), true)
        })
    })
    it('show (устанавливает property display)', function () {
        const testComponent = getTestComponent()
        testComponent.show()
        const content = testComponent.getContent()
        assert.notEqual(content, null)
        assert.notEqual(content, undefined)
        content?.forEach((element) => {
            assert.equal(element.classList.contains('hidden'), false)
        })
    })
    it('componentDidUpdate (можем переопределить в наследнике)', function () {
        const testComponent = getTestComponent()
        // отныне при попытке изменения пропсов перерисовки не будет
        const callback = sinon.spy()
        testComponent.componentDidUpdate = (_oldProps, _newProps) => {
            callback()
            return false
        }
        const changedProps = { text: 'newText' }
        testComponent.setProps(changedProps)
        const content = testComponent.getContent()
        const node = content?.[0]
        // колбэк вызывался
        assert.equal(callback.called, true)
        assert.equal(callback.callCount, 2)
        // пропсы не изменилось
        assert.notEqual(node?.textContent, changedProps.text)
        assert.equal(node?.textContent, getInitialProps().text)
    })
    it('componentDidMount (можем переопределить в наследнике)', function () {
        const callback = sinon.spy()
        TestComponent.prototype.componentDidMount = (_oldProps) => {
            callback()
        }
        getTestComponent()
        // проверяем что при инициализации компонента - коллбэк вызывался
        assert.equal(callback.called, true)
        assert.equal(callback.callCount, 1)
        // возвращаем в дефолтное состояние
        TestComponent.prototype.componentDidMount = (_oldProps) => {}
    })
    it('addEventListener (можем навешать листенер на каждый элемент контента)', function () {
        const eventName = 'click'
        const callback = sinon.spy()
        const testComponent = getTestComponent()
        testComponent.addEventListener(eventName, (_e) => { callback() })
        const content = testComponent.getContent()
        assert.notEqual(content, null)
        assert.notEqual(content, undefined)
        content?.forEach((element) => {
            element.dispatchEvent(new Event(eventName))
            assert.equal(callback.called, true)
            assert.equal(callback.callCount, 1)
        })
    })
})
