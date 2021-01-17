import InputValidator from 'src/utils/validator/InputValidator'

/* global HTMLFormElement */

class FormValidator {
    form: HTMLFormElement

    constructor(form: HTMLFormElement) {
        this.form = form
    }

    validate(): boolean {
        const itemList = this.form.getElementsByTagName('input')
        let result = true
        for (const input of itemList) {
            const validationResult = new InputValidator(input).validate()
            result = result && validationResult
        }
        return result
    }
}

export default FormValidator
