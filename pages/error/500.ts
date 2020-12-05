import { renderBody } from '../../components/utils/renderDom.js'
import { ErrorPage } from '../../components/ErrorPage.js'
import Button from '../../components/Button.js'

// renderBody(new Button({ text: 'hhh', className: 'my-btn' }))
renderBody(new ErrorPage({
    rootClass: 'error-page',
    headerClass: 'error-page-header',
    errorNumber: '500',
    pageText: 'Ошибка сервера',
    button: new Button(
        {
            text: 'Назад к сообщениям',
            class: 'error-page-btn messenger-button_no-background'
        }
    ).getContent()
}))
