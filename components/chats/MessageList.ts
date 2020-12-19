import Component from '../../utils/Component'
import Message from './Message'

interface MessageListProps {
    messageItemList: Message[]
}

class MessageList extends Component<MessageListProps> {
    template(): string {
        return `<ul class="chats-message-list">{{messageItemList}}</ul>`
    }
}

export default MessageList
