import FormInput from './FormInput'
import { InputProps } from './Input'

interface FormInputLabeledProps extends InputProps{
    label: string,
    wrapperClass: string
}

class FormInputLabeled extends FormInput {
    constructor(props: FormInputLabeledProps) {
        super(props)
    }

    template(): string {
        return `
        <div class={{wrapperClass}}>
            <label>{{label}}}</label>
            ${super.template()}
        </div>
        `
    }
}

export default FormInputLabeled
