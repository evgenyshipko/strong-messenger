import Component from '../../../utils/component/Component'
import Message from '../message/Message'

interface MessageListProps {
    messageItemList: Message[]
}

class MessageList extends Component<MessageListProps> {
    componentDidUpdate(_oldProps: MessageListProps, _newProps: MessageListProps) {
        return true
    }

    template(): string {
        return `<ul class="message-list">{{messageItemList}}</ul>`
    }
}

export default MessageList
