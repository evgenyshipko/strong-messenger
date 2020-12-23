import Component from '../../utils/Component.js';
class DropdownInput extends Component {
    template() {
        return `<input autocomplete={{autocomplete}} class={{class}} type={{type}} name={{name}} list={{id}} value={{value}} @event={{eventData}}/>
                <datalist id={{id}}>{{options}}</datalist>`;
    }
}
export default DropdownInput;
//# sourceMappingURL=DropdownInput.js.map