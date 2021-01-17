import FormInput from 'src/components/formInput/FormInput'
import { InputProps } from 'src/components/Input'

interface FormInputLabeledProps extends InputProps{
    label: string,
    wrapperClass: string
}

class FormInputLabeled extends FormInput {
    // eslint-disable-next-line no-useless-constructor
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
