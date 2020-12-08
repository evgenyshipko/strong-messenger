import Component from '../utils/Component.js';
class Button extends Component {
    constructor(props) {
        super(props);
    }
    template() {
        const entrails = (() => {
            if (this.props.text && this.props.iconClass) {
                return `<i class={{iconClass}}></i>
                        <span>{{text}}</span>`;
            }
            else if (this.props.iconClass) {
                return '<i class={{iconClass}}></i>';
            }
            else if (this.props.text) {
                return '{{text}}';
            }
            else {
                return '';
            }
        })();
        return `<button class={{class}} type={{type}} form={{formId}} @event={{eventData}}>${entrails}</button>`;
    }
}
export default Button;
//# sourceMappingURL=Button.js.map