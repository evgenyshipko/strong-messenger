import Component from '../../utils/Component.js';
class SigninPage extends Component {
    constructor(props) {
        super(props);
    }
    template() {
        return `
            <div class='signin-wrapper'>
              <div class='signin'>
                <p class='signin-header'>Вход</p>
                <div>{{form}}</div>
                <div>{{registrationBtn}}</div>
              </div>
            </div>`;
    }
}
export default SigninPage;
//# sourceMappingURL=SigninPage.js.map