import Component from '../utils/Component.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import FormValidator from '../utils/validator/FormValidator.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
/* global HTMLFormElement, HTMLInputElement */
class SigninForm extends Component {
    constructor(props) {
        super(props);
    }
    addValidator() {
        const nodeList = this.getContent();
        if (nodeList) {
            const form = nodeList[0];
            const handleFormValidation = (e) => {
                e.preventDefault();
                new FormValidator(form).validate();
            };
            form.addEventListener('submit', handleFormValidation);
        }
    }
    template() {
        return `<form class='signin-form'> 
                <div class="form-item-block-validated">
                    {{loginInput}}
                </div>
                <div class="form-item-block-validated">
                    {{passwordInput}}
                </div>
                <div class="form-item-block-validated">
                    {{submitButton}}
                </div>
            </form>`;
    }
}
export default SigninForm;
//# sourceMappingURL=SigninForm.js.map