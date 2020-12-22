import Component from '../utils/Component';
class Modal extends Component {
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