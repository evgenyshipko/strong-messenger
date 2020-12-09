
/* global HTMLInputElement */

import { Nullable } from '../../types/Types'

export enum InputName {
    PASSWORD = 'password',
    LOGIN = 'login',
    EMAIL = 'email',
    FIRST_NAME = 'first_name',
    LAST_NAME = 'last_name',
    SECOND_NAME = 'second_name',
    PHONE = 'phone',
    SECOND_PASSWORD = 'second-password',
    OLD_PASSWORD = 'oldPassword',
    NEW_PASSWORD = 'newPassword',
    NEW_PASSWORD_REPEAT = 'newPasswordRepeat'
}

type InputDisplayName = Nullable<string> | undefined

class InputValidator {
    input: HTMLInputElement

    constructor(input: HTMLInputElement) {
        this.input = input
    }

    validate() {
        const inputDisplayName = this._getInputDisplayName()
        const inputName = this.input.getAttribute('name') as InputName
        const value = this.input.value
        try {
            this._checkEmptiness(inputDisplayName, value)
            this._validate(inputName, inputDisplayName, value)
            this.disableMessage()
        } catch (e) {
            this._showMessage(e.message)
        }
    }

    _getInputDisplayName(): InputDisplayName {
        const placeholder = this.input.getAttribute('placeholder') as string
        if (placeholder) {
            return placeholder
        }
        const parent = this.input.parentElement
        if (parent) {
            const wrapper = parent.parentElement
            if (wrapper) {
                const label = wrapper.getElementsByTagName('label')[0]
                if (label) {
                    return label.textContent
                }
            }
        }
    }

    _showMessage(message: string): void {
        const spanExisting = this.input.parentElement?.getElementsByTagName('span')[0]
        if (spanExisting) {
            spanExisting.style.display = 'block'
            spanExisting.textContent = message
        } else {
            const span = document.createElement('span')
            span.textContent = message
            span.classList.add('form-input-validation-message')
            this.input.parentElement?.appendChild(span)
        }
    }

    disableMessage(): void {
        const spanExisting = this.input.parentElement?.getElementsByTagName('span')[0]
        if (spanExisting) {
            spanExisting.style.display = 'none'
        }
    }

    _checkEmptiness(inputDisplayName: InputDisplayName, value: Nullable<string>):void {
        if (!value || value.length === 0) {
            throw new Error(`Необходимо ввести ${inputDisplayName}`)
        }
    }

    _validate(inputName: InputName, inputDisplayName: InputDisplayName, value: string): void {
        const obj: Record<InputName, Function> = {
            [InputName.PASSWORD]: this._validateLength(inputDisplayName, value, 8),
            [InputName.SECOND_PASSWORD]: this._validateLength(inputDisplayName, value, 8),
            [InputName.NEW_PASSWORD_REPEAT]: this._validateLength(inputDisplayName, value, 8),
            [InputName.NEW_PASSWORD]: this._validateLength(inputDisplayName, value, 8),
            [InputName.OLD_PASSWORD]: this._validateLength(inputDisplayName, value, 8),
            [InputName.LOGIN]: this._validateLength(inputDisplayName, value, 3),
            [InputName.FIRST_NAME]: this._validateLength(inputDisplayName, value, 2),
            [InputName.SECOND_NAME]: this._validateLength(inputDisplayName, value, 2),
            [InputName.LAST_NAME]: this._validateLength(inputDisplayName, value, 2),
            [InputName.EMAIL]: this._validateEmail(value),
            [InputName.PHONE]: this._validatePhone(value)
        }
        return obj[inputName]()
    }

    _validateLength(inputDisplayName: InputDisplayName, value: string, length: number): Function {
        return () => {
            if (value.length < length) {
                throw new Error(`Минимальная длина ввода поля "${inputDisplayName}": ${length}`)
            }
        }
    }

    _validateEmail(value: string): Function {
        // источник: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        const EMAIL_REGEXP = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const matchingResult = EMAIL_REGEXP.exec(value)
        return () => {
            if (!matchingResult || matchingResult[0].length !== value.length) {
                throw new Error('Невалидный адрес (шаблон: example@mail.com)')
            }
        }
    }

    _validatePhone(value: string): Function {
        return () => {
            const PHONE_REGEXP = /\+*(\d{1}-*\(*\)*){11,13}/
            const matchingResult = PHONE_REGEXP.exec(value)
            if (!matchingResult || matchingResult[0].length !== value.length) {
                throw new Error('Невалидный телефон (шаблон: +7-999-999-99-99)')
            }
        }
    }
}

export default InputValidator
