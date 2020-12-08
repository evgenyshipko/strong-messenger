import Component from '../../utils/Component.js'
import Message from './Message.js'

interface MessageListProps {
    messageItemList: Message[]
}

class MessageList extends Component<MessageListProps> {
    constructor(props: MessageListProps) {
        super(props)
    }

    template(): string {
        return `<ul class="chats-message-list">{{messageItemList}}</ul>`
    }
}

export default MessageList
