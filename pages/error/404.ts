import { ErrorPage } from '../../components/pages/ErrorPage'
import Button from '../../components/Button'
import Path from '../../constants/Path'
import Router from '../../utils/router/Router'

export const notFoundPage = new ErrorPage({
    errorNumber: '404',
    pageText: 'Страница не найдена',
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
})
