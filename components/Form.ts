import Component from '../utils/Component.js'
import FormValidator from '../utils/validator/FormValidator.js'
import InputValidator from '../utils/validator/InputValidator.js'
import FormInput from './FormInput.js'
import Button from './Button.js'

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
