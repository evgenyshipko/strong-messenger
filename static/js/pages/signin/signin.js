import SigninPage from './SigninPage.js';
import render from '../../utils/renderDom.js';
import Button from '../../components/Button.js';
import { InputName } from '../../utils/validator/InputValidator.js';
import FormInput from '../../components/FormInput.js';
import Form from '../../components/Form.js';
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
form.addValidator();
render(new SigninPage({
    form: form,
    registrationBtn: new Button({
        text: 'Регистрация',
        class: 'signin-registration-btn messenger-button_no-background',
        eventData: {
            name: 'click',
            callback: () => {
                location.assign('../signup/signup.html');
            }
        }
    })
}));
//# sourceMappingURL=signin.js.map