import Component from '../utils/component/Component'

interface BlockProps {
    class: string,
    content: Component<any>[] | string
}

class Block extends Component<BlockProps> {
    template(): string {
        return '<div class={{class}}>{{content}}</div>'
    }
}

export default Block
