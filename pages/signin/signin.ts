import SigninPage from './SigninPage'
import Button from '../../components/Button'
import { InputName } from '../../utils/validator/InputValidator'
import FormInput from '../../components/FormInput'
import Form from '../../components/Form'
import Router from '../../utils/router/Router'
import Path from '../../constants/Path'
import HTTPExecutor, { ErrorResponse } from '../../utils/httpExecutor/httpExecutor'
import Url, { ApiPath } from '../../constants/Url'

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

form.addValidator((formData) => {
    new HTTPExecutor()
        .post(
            Url.generate(ApiPath.AUTH_SIGNIN),
            {
                data: JSON.stringify(Object.fromEntries(formData)),
                credentials: true,
                headers: { 'Content-Type': 'application/json' }
            })
        .then((_res) => {
            new Router('.app').go(Path.CHATS)
        })
        .catch((error) => {
            const errorData = JSON.parse(error) as ErrorResponse
            window.alert(errorData.responseText)
        })
})

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
