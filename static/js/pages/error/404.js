import render from '../../utils/renderDom.js';
import { ErrorPage } from './ErrorPage.js';
import Button from '../../components/Button.js';
render(new ErrorPage({
    errorNumber: '404',
    pageText: 'Страница не найдена',
    button: new Button({
        text: 'Вернуться к чатам',
        class: 'error-page-btn messenger-button_no-background'
    })
}));
//# sourceMappingURL=404.js.map