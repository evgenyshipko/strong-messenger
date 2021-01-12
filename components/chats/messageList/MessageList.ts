import Component from '../../../utils/component/Component'
import Message from '../message/Message'
import { EventData } from '../../../types/Types'

interface MessageListProps {
    messageItemList: Message[],
    eventData?: EventData
}

class MessageList extends Component<MessageListProps> {
    scrollTop?: number

    componentDidUpdate(_oldProps: MessageListProps, _newProps: MessageListProps) {
        return true
    }

    moveViewToBottom = () => {
        const messageListWrapper = this.getContent()?.[0]
        if (messageListWrapper) {
            messageListWrapper.scrollTop = messageListWrapper.scrollHeight - messageListWrapper.clientHeight
        }
    }

    getScrollHeight = () => {
        return this.getContent()?.[0].scrollHeight
    }

    getScrollTop = () => {
        return this.scrollTop ? this.scrollTop : this.getContent()?.[0].scrollTop
    }

    setScrollTop(scrollTop: number) {
        this.scrollTop = scrollTop
        const messageListWrapper = this.getContent()?.[0]
        if (messageListWrapper) {
            messageListWrapper.scrollTop = scrollTop
        }
    }

    template(): string {
        return `<div class="message-list-wrapper" @event={{eventData}}>
                <ul class="message-list">{{messageItemList}}</ul>
            </div>`
    }
}

export default MessageList
