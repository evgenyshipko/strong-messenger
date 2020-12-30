import { ErrorPage } from '../../components/pages/errorPage/ErrorPage.js';
import Button from '../../components/Button.js';
import Path from '../../constants/Path.js';
import Router from '../../utils/router/Router.js';
export const notFoundPage = new ErrorPage({
    errorNumber: '404',
    pageText: 'Страница не найдена',
    button: new Button({
        text: 'Вернуться к чатам',
        class: 'error-page-btn messenger-button_no-background',
        eventData: {
            name: 'click',
            callback: () => {
                new Router('.app').go(Path.CHATS);
            }
        }
    })
});
//# sourceMappingURL=404.js.map