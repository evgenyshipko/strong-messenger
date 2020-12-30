import Component from '../../utils/Component.js';
class Modal extends Component {
    template() {
        return `
            <div class="modal-shadow">
            <div class="modal">
                {{content}}
            </div>
        </div>
        `;
    }
}
export default Modal;
//# sourceMappingURL=Modal.js.map