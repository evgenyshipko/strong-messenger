/* global HTMLFormElement */

enum Name {
    PASSWORD = 'password',
    LOGIN = 'login',
    EMAIL = 'email',
    FIRST_NAME = 'first_name',
    SECOND_NAME = 'second_name',
    PHONE = 'phone',
    SECOND_PASSWORD = 'second-password',
    OLD_PASSWORD = 'oldPassword',
    NEW_PASSWORD = 'newPassword',
    NEW_PASSWORD_REPEAT = 'newPasswordRepeat'
}

class Validator {
    form: HTMLFormElement

    constructor(form: HTMLFormElement) {
        this.form = form
    }

    validate() {
        const formData = new FormData(this.form)
        for (const pair of formData.entries()) {
            const inputName = pair[0] as Name
            const value = pair[1] as string
            try {
                this._checkEmptiness(inputName, value)
                this._validate(inputName, value)
                this._disableMessage(inputName)
            } catch (e) {
                const message = e.message
                this._showMessage(inputName, message)
            }
            console.log(pair[0] + ': ' + pair[1])
        }
    }

    _showMessage(inputName: Name, message: string): void {
        const input = this.form.querySelector(`[name='${inputName}']`)
        if (input) {
            const spanExisting = input.parentElement?.getElementsByTagName('span')[0]
            if (spanExisting) {
                spanExisting.style.display = 'block'
                spanExisting.textContent = message
            } else {
                const span = document.createElement('span')
                span.textContent = message
                input.parentElement?.appendChild(span)
            }
        }
    }

    _disableMessage(inputName: Name): void {
        const input = this.form.querySelector(`[name='${inputName}']`)
        const spanExisting = input!.parentElement?.getElementsByTagName('span')[0]
        if (spanExisting) {
            spanExisting.style.display = 'none'
        }
    }

    _checkEmptiness(inputName:Name, value: string):void {
        if (value.length === 0) {
            throw new Error(`Необходимо ввести ${inputName}`)
        }
    }

    _validate(inputName: Name, value: string) {
        switch (inputName) {
        case Name.PASSWORD:
            return this._validatePassword(value)
        case Name.LOGIN:
            return this._validateLogin(value)
        }
    }

    _validatePassword(value: string): void {
        const passLength = 8
        if (value.length < passLength) {
            throw new Error(`Минимальная длина пароля ${passLength} символа`)
        }
    }

    _validateLogin(value: string):void {
        const logLength = 3
        if (value.length < logLength) {
            throw new Error(`Минимальная длина логина ${logLength} символа`)
        }
    }
}

export default Validator
