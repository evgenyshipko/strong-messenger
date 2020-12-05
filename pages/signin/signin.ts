import SigninPage from './SigninPage.js'
import { renderBody } from '../components/utils/renderDom.js'
import SigninForm from '../../components/SigninForm.js'
import Input from '../../components/Input.js'
import Button from '../../components/Button.js'

renderBody(new SigninPage({
    signinWrapperClass: 'signin-wrapper',
    signinClass: 'signin',
    signinHeaderClass: 'signin-header',
    form: new SigninForm({
        formClass: 'signin-form',
        loginInput: new Input({
            type: 'text',
            inputName: 'login',
            class: 'signin-form__login-input form-input',
            placeholder: 'Логин'
        }),
        passwordInput: new Input({
            type: 'password',
            inputName: 'password',
            class: 'signin-form__password-input form-input',
            placeholder: 'Пароль'
        }),
        submitButton: new Button({
            class: 'signin-form__submit-btn messenger-button',
            text: 'Войти'
        })
    }),
    registrationBtn: new Button({
        text: 'Регистрация',
        class: 'signin-registration-btn messenger-button_no-background'
    })
}))
