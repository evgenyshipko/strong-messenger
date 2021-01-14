import Component from '../utils/component/Component'
import FormValidator from '../utils/validator/FormValidator'
import InputValidator from '../utils/validator/InputValidator'
import FormInput from './formInput/FormInput'
import Button from './button/Button'

/* global HTMLFormElement, HTMLInputElement, FormData, Event */

interface FormProps {
    class: string,
    formItemList: (Button | FormInput)[],
    id?: string
}

class Form extends Component<FormProps> {
    addValidator(onValidationSuccess?: (formData: FormData) => any) {
        const nodeList = this.getContent()
        if (nodeList) {
            const form = nodeList[0] as HTMLFormElement
            const inputList = form.getElementsByTagName('input')
            for (const input of inputList) {
                const inputValidator = new InputValidator(input)
                input.addEventListener('blur', () => {
                    inputValidator.validate()
                })
                input.addEventListener('focus', () => {
                    inputValidator.disableMessage()
                })
            }
            const handleFormValidation = (e: Event) => {
                e.preventDefault()
                if (new FormValidator(form).validate() && onValidationSuccess) {
                    onValidationSuccess(new FormData(form))
                }
            }
            form.addEventListener('submit', handleFormValidation)
        }
    }

    template() {
        return `<form class={{class}} id={{id}}> 
                {{formItemList}}
            </form>`
    }
}

export default Form
