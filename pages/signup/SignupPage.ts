import Component from '../../utils/Component'
import Form from "../../components/Form";
import Button from "../../components/Button";

interface SignupPageProps {
    form: Form,
    entranceBtn: Button
}

class SignupPage extends Component<SignupPageProps> {
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
