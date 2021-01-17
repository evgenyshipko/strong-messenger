import SigninPage from 'src/components/pages/signinPage/SigninPage'
import Button from 'src/components/button/Button'
import { InputName } from 'src/utils/validator/InputValidator'
import FormInput from 'src/components/formInput/FormInput'
import Form from 'src/components/Form'
import Router from 'src/utils/router/Router'
import Path from 'src/constants/Path'
import SigninApi from 'src/pages/signin/signin.api'
import CommonApi from 'src/api/common.api'
import { ErrorResponse } from 'src/utils/httpExecutor/httpExecutor'

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
    new SigninApi(formData)
        .signin()
        .then((_res) => {
            return new CommonApi().updateInitialData()
        })
        .then(() => {
            new Router('.app').go(Path.CHATS)
        })
        .catch((e: ErrorResponse) => {
            window.alert(e.responseText)
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
