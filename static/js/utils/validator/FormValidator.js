import InputValidator from './InputValidator.js';
/* global HTMLFormElement */
class FormValidator {
    constructor(form) {
        this.form = form;
    }
    validate() {
        const itemList = this.form.getElementsByTagName('input');
        let result = true;
        for (const input of itemList) {
            const validationResult = new InputValidator(input).validate();
            result = result && validationResult;
        }
        return result;
    }
}
export default FormValidator;
//# sourceMappingURL=FormValidator.js.map