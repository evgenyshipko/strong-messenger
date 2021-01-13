import Component from '../../../utils/component/Component'
import Message from '../message/Message'
import { EventData } from '../../../types/Types'

interface MessageListProps {
    messageItemList: Message[],
    eventData?: EventData
}

class MessageList extends Component<MessageListProps> {
    scrollTop?: number
    scrollHeight?:number

    componentDidUpdate(_oldProps: MessageListProps, _newProps: MessageListProps) {
        return true
    }

    moveViewToBottom = () => {
        const messageListWrapper = this.getContent()?.[0]
        if (messageListWrapper) {
            this.setScrollTop(messageListWrapper.scrollHeight - messageListWrapper.clientHeight)
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
        this.scrollHeight = this.getScrollHeight()
        const messageListWrapper = this.getContent()?.[0]
        if (messageListWrapper) {
            messageListWrapper.scrollTop = scrollTop
        }
    }

    updateScrollPosition(oldScrollHeight: number, newScrollHeight: number, messageListLengthDifference: number) {
        const oldScrollTop = this.getScrollTop()
        let scrollTop
        if (messageListLengthDifference === 1 && oldScrollTop) {
            // если добавилось только одно сообщение
            const newScrollHeight = this.getScrollHeight()
            if (newScrollHeight && this.scrollHeight) {
                scrollTop = oldScrollTop + newScrollHeight - this.scrollHeight
            } else {
                scrollTop = oldScrollTop
            }
        } else {
            // Вычисляем из предыдущего и текущего размеров области прокрутки
            scrollTop = newScrollHeight - oldScrollHeight
        }
        this.setScrollTop(scrollTop)
    }

    template(): string {
        return `<div class="message-list-wrapper" @event={{eventData}}>
                <ul class="message-list">{{messageItemList}}</ul>
            </div>`
    }
}

export default MessageList
