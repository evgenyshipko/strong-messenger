import Component from 'src/utils/component/Component'
import Form from 'src/components/Form'
import Button from 'src/components/button/Button'
import 'src/components/pages/signupPage/SignupPage.less'

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
