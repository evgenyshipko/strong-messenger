import Input, { InputProps } from './Input.js'

/* global HTMLFormElement, HTMLInputElement */

class FormInput extends Input {

    constructor(props: InputProps) {
        super(props)
    }

    template() {
        return `<div class="form-item-block-validated">
                ${super.template()}
            </div>`
    }
}

export default FormInput
