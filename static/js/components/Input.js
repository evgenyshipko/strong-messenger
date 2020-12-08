import Component from '../utils/Component.js';
class Input extends Component {
    constructor(props) {
        super(props);
    }
    template() {
        return '<input class={{class}} name={{inputName}} placeholder={{placeholder}} type={{type}}/>';
    }
}
export default Input;
//# sourceMappingURL=Input.js.map