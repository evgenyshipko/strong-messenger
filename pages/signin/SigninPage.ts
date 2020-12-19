import Component from '../../utils/Component'
import Form from "../../components/Form";
import Button from "../../components/Button";

interface SigninPageProps {
    form: Form,
    registrationBtn: Button
}

class SigninPage extends Component<SigninPageProps> {
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
