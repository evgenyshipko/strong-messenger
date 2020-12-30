import Button from '../../components/Button.js';
import { InputName } from '../../utils/validator/InputValidator.js';
import FormInput from '../../components/FormInput.js';
import Form from '../../components/Form.js';
import SignupPage from '../../components/pages/signupPage/SignupPage.js';
import Router from '../../utils/router/Router.js';
import Path from '../../constants/Path.js';
import SignupApi from "./signup.api.js";
/* global HTMLFormElement, HTMLInputElement */
const postInput = new FormInput({
    type: 'text',
    inputName: InputName.EMAIL,
    class: 'signup-form__email-input form-input',
    placeholder: 'Почта'
});
const loginInput = new FormInput({
    type: 'text',
    inputName: InputName.LOGIN,
    class: 'signup-form__login-input form-input',
    placeholder: 'Логин'
});
const firstNameInput = new FormInput({
    type: 'text',
    inputName: InputName.FIRST_NAME,
    class: 'signup-form__firstname-input form-input',
    placeholder: 'Имя'
});
const lastNameInput = new FormInput({
    type: 'text',
    inputName: InputName.SECOND_NAME,
    class: 'signup-form__lastname-input form-input',
    placeholder: 'Фамилия'
});
const phoneInput = new FormInput({
    type: 'text',
    inputName: InputName.PHONE,
    class: 'signup-form__phone-input form-input',
    placeholder: 'Телефон'
});
const passwordInput = new FormInput({
    type: 'password',
    inputName: InputName.PASSWORD,
    class: 'signup-form__password-input form-input',
    placeholder: 'Пароль'
});
const secondPasswordInput = new FormInput({
    type: 'password',
    inputName: InputName.SECOND_PASSWORD,
    class: 'signup-form__password-input form-input',
    placeholder: 'Повторите пароль'
});
const registrationBtn = new Button({
    class: 'signup-form__submit-btn messenger-button',
    text: 'Зарегистрироваться'
});
const form = new Form({
    class: 'signup-form',
    formItemList: [
        postInput,
        loginInput,
        firstNameInput,
        lastNameInput,
        phoneInput,
        passwordInput,
        secondPasswordInput,
        registrationBtn
    ]
});
form.addValidator((formData) => {
    const data = Object.fromEntries(formData);
    delete data[InputName.SECOND_PASSWORD];
    new SignupApi(data).request();
});
export const signup = new SignupPage({
    form: form,
    entranceBtn: new Button({
        text: 'Войти',
        class: 'signup-registration-btn messenger-button_no-background',
        eventData: {
            name: 'click',
            callback: () => {
                new Router('.app').go(Path.SIGNIN);
            }
        }
    })
});
//# sourceMappingURL=signup.js.map