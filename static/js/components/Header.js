import Component from '../utils/Component.js';
class Header extends Component {
    constructor(props) {
        super(props);
    }
    template() {
        let level = this.props.level;
        if (!level) {
            level = '1';
        }
        return `<h${level} class={{class}}>{{text}}</h${level}>`;
    }
}
export default Header;
//# sourceMappingURL=Header.js.map