import Component from '../utils/Component.js';
class Button extends Component {
    template() {
        const entrails = (() => {
            const { text, iconClass } = this.props;
            return `${iconClass ? '<i class={{iconClass}}></i>' : ''}${text ? '<span>{{text}}</span>' : ''}`;
        })();
        return `<button class={{class}} type={{type}} form={{formId}} @event={{eventData}}>${entrails}</button>`;
    }
}
export default Button;
//# sourceMappingURL=Button.js.map