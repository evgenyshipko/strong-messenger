import Component from '../../utils/component/Component'
import { Context } from '../../types/Types'
import './Modal.less'

interface ModalProps {
    content: Component<Context>[]
}

class Modal extends Component<ModalProps> {
    template(): string {
        return `
            <div class="modal-shadow">
            <div class="modal">
                {{content}}
            </div>
        </div>
        `
    }
}

export default Modal
