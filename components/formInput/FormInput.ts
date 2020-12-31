import Input from '../Input'

/* global HTMLFormElement, HTMLInputElement */

class FormInput extends Input {
    template() {
        return `<div class="form-input-wrapper">
                ${super.template()}
            </div>`
    }
}

export default FormInput
