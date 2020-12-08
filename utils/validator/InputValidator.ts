
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

    _validate(inputName: InputName, inputDisplayName: InputDisplayName, value: string) {
        switch (inputName) {
        case InputName.PASSWORD:
        case InputName.SECOND_PASSWORD:
        case InputName.NEW_PASSWORD_REPEAT:
        case InputName.NEW_PASSWORD:
        case InputName.OLD_PASSWORD:
            return this._validateLength(inputDisplayName, value, 8)
        case InputName.LOGIN:
            return this._validateLength(inputDisplayName, value, 3)
        case InputName.EMAIL:
            return this._validateEmail(value)
        case InputName.PHONE:
            return this._validatePhone(value)
        case InputName.FIRST_NAME:
            return this._validateLength(inputDisplayName, value, 2)
        case InputName.SECOND_NAME:
            return this._validateLength(inputDisplayName, value, 2)
        case InputName.LAST_NAME:
            return this._validateLength(inputDisplayName, value, 2)
        }
    }

    _validateLength(inputDisplayName: InputDisplayName, value: string, length: number): void {
        if (value.length < length) {
            throw new Error(`Минимальная длина ввода поля "${inputDisplayName}": ${length}`)
        }
    }

    _validateEmail(value: string):void {
        const matchingResult = (/\w+@\w+.[a-z]{2,3}/).exec(value)
        if (!matchingResult || matchingResult[0].length !== value.length) {
            throw new Error('Невалидный адрес (шаблон: example@mail.com)')
        }
    }

    _validatePhone(value: string):void {
        const matchingResult = (/\+*(\d{1}-*\(*\)*){11,13}/).exec(value)
        if (!matchingResult || matchingResult[0].length !== value.length) {
            throw new Error('Невалидный телефон (шаблон: +7-999-999-99-99)')
        }
    }
}

export default InputValidator
