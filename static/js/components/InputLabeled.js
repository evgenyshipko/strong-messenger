import Component from '../utils/Component.js';
class InputLabeled extends Component {
    template() {
        return `<label for={{inputId}} class={{labelClass}}>{{labelText}}</label>
            <input class={{inputClass}} name={{inputName}} type={{type}} id={{inputId}} @event={{eventData}} />`;
    }
}
export default InputLabeled;
//# sourceMappingURL=InputLabeled.js.map