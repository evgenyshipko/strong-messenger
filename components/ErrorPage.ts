import Block from '../components/Block'
import Button from '../components/Button'
import Handlebars_ from 'handlebars'
import {ERROR_TEMPLATE} from '../../templates/error.tmpl.js'

declare const Handlebars: typeof Handlebars_
class ErrorPage extends Block {
    constructor() {
        super('div', {
            button: new Button(
                { text: 'Text 2' },
                'error-page-btn messenger-button_no-background'
            )
        })
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setProps({
        //         name: 'Login 3'
        //     })
        // }, 5000)
    }

    render() {
        const template = Handlebars.compile(ERROR_TEMPLATE)
        return template({
            rootClass: 'error-page',
            headerClass: 'error-page-header',
            errorNumber: '500',
            pageText: 'Ошибка сервера',
            button: this.props.button.render()
        })
    }
}
