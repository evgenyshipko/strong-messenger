import Component from '../utils/Component.js';
import FormValidator from '../utils/validator/FormValidator.js';
import InputValidator from '../utils/validator/InputValidator.js';
class Form extends Component {
    addValidator() {
        const nodeList = this.getContent();
        if (nodeList) {
            const form = nodeList[0];
            const handleFormValidation = (e) => {
                e.preventDefault();
                new FormValidator(form).validate();
            };
            form.addEventListener('submit', handleFormValidation);
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