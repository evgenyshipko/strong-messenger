import Component from '../utils/Component.js'
import { Context } from '../types/Types'

interface ModalProps {
    content: Component<Context>[],
    backgroundClass: string,
    modalClass: string
}

class Modal extends Component<ModalProps> {
    constructor(props: ModalProps) {
        super(props)
    }

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
