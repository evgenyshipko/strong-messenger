import Component from '../../utils/Component.js'
import Form from "../../components/Form.js";
import Button from "../../components/Button.js";

interface SigninPageProps {
    form: Form,
    registrationBtn: Button
}

class SigninPage extends Component<SigninPageProps> {
    constructor(props: SigninPageProps) {
        super(props)
    }

    template() {
        return `
            <div class='signin-wrapper'>
              <div class='signin'>
                <p class='signin-header'>Вход</p>
                <div>{{form}}</div>
                <div>{{registrationBtn}}</div>
              </div>
            </div>`
    }
}

export default SigninPage
