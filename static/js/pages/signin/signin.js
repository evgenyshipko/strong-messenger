import SigninPage from './SigninPage.js';
import Button from '../../components/Button.js';
import { InputName } from '../../utils/validator/InputValidator.js';
import FormInput from '../../components/FormInput.js';
import Form from '../../components/Form.js';
import Router from '../../utils/router/Router.js';
import Path from '../../constants/Path.js';
import HTTPExecutor from '../../utils/httpExecutor/httpExecutor.js';
import Url, { ApiPath } from '../../constants/Url.js';
/* global HTMLFormElement, HTMLInputElement */
const form = new Form({
    class: 'signin-form',
    formItemList: [
        new FormInput({
            type: 'text',
            inputName: InputName.LOGIN,
            class: 'signin-form__login-input form-input',
            placeholder: 'Логин'
        }),
        new FormInput({
            type: 'password',
            inputName: InputName.PASSWORD,
            class: 'signin-form__password-input form-input',
            placeholder: 'Пароль'
        }),
        new Button({
            class: 'signin-form__submit-btn messenger-button',
            text: 'Войти'
        })
    ]
});
form.addValidator((formData) => {
    new HTTPExecutor()
        .post(Url.generate(ApiPath.AUTH_SIGNIN), {
        data: JSON.stringify(Object.fromEntries(formData)),
        credentials: true,
        headers: { 'Content-Type': 'application/json' }
    })
        .then((_res) => {
        new Router('.app').go(Path.CHATS);
    })
        .catch((error) => {
        const errorData = JSON.parse(error);
        window.alert(errorData.responseText);
    });
});
export const signin = new SigninPage({
    form: form,
    registrationBtn: new Button({
        text: 'Регистрация',
        class: 'signin-registration-btn messenger-button_no-background',
        eventData: {
            name: 'click',
            callback: () => {
                new Router('.app').go(Path.SIGNUP);
            }
        }
    })
});
//# sourceMappingURL=signin.js.map