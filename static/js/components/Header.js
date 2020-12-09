import Component from '../utils/Component.js';
class Header extends Component {
    template() {
        const level = this.props.level || '1';
        return `<h${level} class={{class}}>{{text}}</h${level}>`;
    }
}
export default Header;
//# sourceMappingURL=Header.js.map