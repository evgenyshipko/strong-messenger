import Component from '../../utils/Component'
import { Context } from '../../types/Types'

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
