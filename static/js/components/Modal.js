import Component from '../utils/Component.js';
class Modal extends Component {
    constructor(props) {
        super(props);
    }
    template() {
        return `
            <div class={{backgroundClass}}>
            <div class={{modalClass}}>
                {{content}}
            </div>
        </div>
        `;
    }
}
export default Modal;
//# sourceMappingURL=Modal.js.map