import Component from '../../utils/Component.js'
import Form from "../../components/Form.js";
import Button from "../../components/Button.js";

interface SignupPageProps {
    form: Form,
    entranceBtn: Button
}

class SignupPage extends Component<SignupPageProps> {
    constructor(props: SignupPageProps) {
        super(props)
    }

    template() {
        return `
            <div class='signup-wrapper'>
              <div class='signup'>
                <p class='signup-header'>Регистрация</p>
                <div>{{form}}</div>
                <div>{{entranceBtn}}</div>
              </div>
            </div>`
    }
}

export default SignupPage
