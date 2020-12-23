import Form from '../../components/Form.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
/* global HTMLFormElement, HTMLInputElement */
class SigninForm extends Form {
    constructor(props) {
        super(props);
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