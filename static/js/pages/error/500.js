import render from '../../utils/renderDom.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import { ErrorPage } from './ErrorPage.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import Button from '../../components/Button.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
render(new ErrorPage({
    errorNumber: '500',
    pageText: 'Ошибка сервера',
    button: new Button({
        text: 'Вернуться к чатам',
        class: 'error-page-btn messenger-button_no-background',
        eventData: {
            name: 'click',
            callback: () => {
                document.location.assign('../chats/chats.html');
            }
        }
    })
}));
//# sourceMappingURL=500.js.map