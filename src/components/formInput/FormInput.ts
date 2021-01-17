import Input from 'src/components/Input'
import 'src/components/formInput/FormInput.less'

/* global HTMLFormElement, HTMLInputElement */

class FormInput extends Input {
    template() {
        return `<div class="form-input-wrapper">
                ${super.template()}
            </div>`
    }
}

export default FormInput
