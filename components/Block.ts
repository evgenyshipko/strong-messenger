import Component from '../utils/Component.js'

interface BlockProps {
    class: string,
    content: Component<any>[] | string
}

class Block extends Component<BlockProps> {
    constructor(props: BlockProps) {
        super(props)
    }

    template(): string {
        return `<div class={{class}}>{{content}}</div>`
    }
}

export default Block
