import Component from '../utils/Component';
import FormValidator from '../utils/validator/FormValidator';
import InputValidator from '../utils/validator/InputValidator';
class Form extends Component {
    addValidator(onValidationSuccess) {
        const nodeList = this.getContent();
        if (nodeList) {
            const form = nodeList[0];
            const inputList = form.getElementsByTagName('input');
            for (const input of inputList) {
                const inputValidator = new InputValidator(input);
                input.addEventListener('blur', () => {
                    inputValidator.validate();
                });
                input.addEventListener('focus', () => {
                    inputValidator.disableMessage();
                });
            }
            const handleFormValidation = (e) => {
                e.preventDefault();
                if (new FormValidator(form).validate() && onValidationSuccess) {
                    onValidationSuccess(new FormData(form));
                }
            };
            form.addEventListener('submit', handleFormValidation);
        }
    }
    template() {
        return `<form class={{class}} id={{id}}> 
                {{formItemList}}
            </form>`;
    }
}
export default Form;
//# sourceMappingURL=Form.js.map