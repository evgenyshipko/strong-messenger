import Component from './Component.js'
import { Context } from '../types/Types'

class SigninPage extends Component {
    constructor(props: Context) {
        super(props)
    }

    template() {
        return `
            <div class={{signinWrapperClass}}>
              <div class={{signinClass}}>
                <p class={{signinHeaderClass}}>Вход</p>
                <div>{{form}}</div>
                <div>{{registrationBtn}}</div>
              </div>
            </div>`
    }
}

export default SigninPage
