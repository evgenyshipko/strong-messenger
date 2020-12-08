import InputValidator from './InputValidator.js';
/* global HTMLFormElement */
class FormValidator {
    constructor(form) {
        this.form = form;
    }
    validate() {
        const itemList = this.form.getElementsByTagName('input');
        for (const input of itemList) {
            new InputValidator(input).validate();
        }
    }
}
export default FormValidator;
//# sourceMappingURL=FormValidator.js.map