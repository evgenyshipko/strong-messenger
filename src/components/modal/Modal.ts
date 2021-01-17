import Component from 'src/utils/component/Component'
import { Context } from 'src/types/Types'
import 'src/components/modal/Modal.less'

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
