import Input from './Input';
/* global HTMLFormElement, HTMLInputElement */
class FormInput extends Input {
    template() {
        return `<div class="form-item-block-validated">
                ${super.template()}
            </div>`;
    }
}
export default FormInput;
//# sourceMappingURL=FormInput.js.map