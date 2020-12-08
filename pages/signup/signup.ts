import render from '../../utils/renderDom.js'
import Button from '../../components/Button.js'
import { InputName } from '../../utils/validator/InputValidator.js'
import FormInput from '../../components/FormInput.js'
import Form from '../../components/Form.js'
import SignupPage from './SignupPage.js'

/* global HTMLFormElement, HTMLInputElement */

const postInput = new FormInput({
    type: 'text',
    inputName: InputName.EMAIL,
    class: 'signup-form__email-input form-input',
    placeholder: 'Почта'
})

const loginInput = new FormInput({
    type: 'text',
    inputName: InputName.LOGIN,
    class: 'signup-form__login-input form-input',
    placeholder: 'Логин'
})

const firstNameInput = new FormInput({
    type: 'text',
    inputName: InputName.FIRST_NAME,
    class: 'signup-form__firstname-input form-input',
    placeholder: 'Имя'
})

const lastNameInput = new FormInput({
    type: 'text',
    inputName: InputName.LAST_NAME,
    class: 'signup-form__lastname-input form-input',
    placeholder: 'Фамилия'
})

const phoneInput = new FormInput({
    type: 'text',
    inputName: InputName.PHONE,
    class: 'signup-form__phone-input form-input',
    placeholder: 'Телефон'
})

const passwordInput = new FormInput({
    type: 'password',
    inputName: InputName.PASSWORD,
    class: 'signup-form__password-input form-input',
    placeholder: 'Пароль'
})

const secondPasswordInput = new FormInput({
    type: 'password',
    inputName: InputName.SECOND_PASSWORD,
    class: 'signup-form__password-input form-input',
    placeholder: 'Повторите пароль'
})

const registrationBtn = new Button({
    class: 'signup-form__submit-btn messenger-button',
    text: 'Зарегистрироваться'
})

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
})

form.addValidator()

render(new SignupPage({
    form: form,
    entranceBtn: new Button({
        text: 'Войти',
        class: 'signup-registration-btn messenger-button_no-background',
        eventData: {
            name: 'click',
            callback: () => {
                location.assign('../signin/signin.html')
            }
        }
    })
}))
