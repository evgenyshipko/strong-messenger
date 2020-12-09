import render from '../../utils/renderDom.js'
import { ErrorPage } from './ErrorPage.js'
import Button from '../../components/Button.js'

render(new ErrorPage({
    errorNumber: '404',
    pageText: 'Страница не найдена',
    button: new Button(
        {
            text: 'Вернуться к чатам',
            class: 'error-page-btn messenger-button_no-background',
            eventData: {
                name: 'click',
                callback: () => {
                    document.location.assign('../chats/chats.html')
                }
            }
        }
    )
}))
