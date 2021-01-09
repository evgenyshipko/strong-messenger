import Component from '../../../utils/component/Component'
import Message from '../message/Message'

interface MessageListProps {
    messageItemList: Message[]
}

class MessageList extends Component<MessageListProps> {
    componentDidUpdate(_oldProps: MessageListProps, _newProps: MessageListProps) {
        return true
    }

    moveViewToBottom = () => {
        const messageListWrapper = this.getContent()?.[0]
        if (messageListWrapper) {
            messageListWrapper.scrollTop = messageListWrapper.scrollHeight
        }
    }

    template(): string {
        return `<div class="message-list-wrapper">
                <ul class="message-list">{{messageItemList}}</ul>
            </div>`
    }
}

export default MessageList
