import Component from '../utils/Component'
import { Context } from '../types/Types'

interface ModalProps {
    content: Component<Context>[],
    backgroundClass: string,
    modalClass: string
}

class Modal extends Component<ModalProps> {
    template(): string {
        return `
            <div class={{backgroundClass}}>
            <div class={{modalClass}}>
                {{content}}
            </div>
        </div>
        `
    }
}

export default Modal
