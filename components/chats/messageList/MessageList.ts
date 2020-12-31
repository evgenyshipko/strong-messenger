import Component from '../../../utils/Component'
import Message from '../message/Message'

interface MessageListProps {
    messageItemList: Message[]
}

class MessageList extends Component<MessageListProps> {
    template(): string {
        return `<ul class="message-list">{{messageItemList}}</ul>`
    }
}

export default MessageList
