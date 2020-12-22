import FormInput from './FormInput';
class FormInputLabeled extends FormInput {
    constructor(props) {
        super(props);
    }
    template() {
        return `
        <div class={{wrapperClass}}>
            <label>{{label}}}</label>
            ${super.template()}
        </div>
        `;
    }
}
export default FormInputLabeled;
//# sourceMappingURL=FormInputLabeled.js.map