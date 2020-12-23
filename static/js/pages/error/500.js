import { ErrorPage } from '../../components/pages/ErrorPage.js';
import Button from '../../components/Button.js';
import Path from '../../constants/Path.js';
import Router from '../../utils/router/Router.js';
export const internalServerErrorPage = new ErrorPage({
    errorNumber: '500',
    pageText: 'Ошибка сервера',
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
//# sourceMappingURL=500.js.map