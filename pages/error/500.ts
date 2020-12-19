import render from '../../utils/renderDom'
import { ErrorPage } from './ErrorPage'
import Button from '../../components/Button'
import Path from '../../constants/Path'
import Router from '../../utils/router/Router'

render(new ErrorPage({
    errorNumber: '500',
    pageText: 'Ошибка сервера',
    button: new Button(
        {
            text: 'Вернуться к чатам',
            class: 'error-page-btn messenger-button_no-background',
            eventData: {
                name: 'click',
                callback: () => {
                    new Router('.app').go(Path.CHATS)
                }
            }
        }
    )
}))
