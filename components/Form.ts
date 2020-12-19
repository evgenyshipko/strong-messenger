import Component from '../utils/Component'
import FormValidator from '../utils/validator/FormValidator'
import InputValidator from '../utils/validator/InputValidator'
import FormInput from './FormInput'
import Button from './Button'

/* global HTMLFormElement, HTMLInputElement */

interface FormProps {
    class: string,
    formItemList: (Button | FormInput)[],
    id?: string
}

class Form extends Component<FormProps> {
    addValidator() {
        const nodeList = this.getContent()
        if (nodeList) {
            const form = nodeList[0] as HTMLFormElement
            const handleFormValidation = (e: any) => {
                e.preventDefault()
                new FormValidator(form).validate()
            }
            form.addEventListener('submit', handleFormValidation)

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
        }
    }

    template() {
        return `<form class={{class}} id={{id}}> 
                {{formItemList}}
            </form>`
    }
}

export default Form
