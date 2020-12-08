import InputValidator from './InputValidator.js'

/* global HTMLFormElement */

class FormValidator {
    form: HTMLFormElement

    constructor(form: HTMLFormElement) {
        this.form = form
    }

    validate() {
        const itemList = this.form.getElementsByTagName('input')
        for (const input of itemList) {
            new InputValidator(input).validate()
        }
    }
}

export default FormValidator
