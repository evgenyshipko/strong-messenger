import SigninPage from './SigninPage'
import Button from '../../components/Button'
import { InputName } from '../../utils/validator/InputValidator'
import FormInput from '../../components/FormInput'
import Form from '../../components/Form'
import Router from '../../utils/router/Router'
import Path from '../../constants/Path'

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
        })]
})

form.addValidator()

export const signin = new SigninPage({
    form: form,
    registrationBtn: new Button({
        text: 'Регистрация',
        class: 'signin-registration-btn messenger-button_no-background',
        eventData: {
            name: 'click',
            callback: () => {
                new Router('.app').go(Path.SIGNUP)
            }
        }
    })
})
