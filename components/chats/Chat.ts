import Component from '../../utils/Component'
import Message from './Message'
import { EventData } from '../../types/Types'

interface ChatItemProps {
    checked?: boolean,
    chatName: string,
    messageList: Message[],
    unreadQuantity?: number,
    eventData?: EventData
}

class Chat extends Component<ChatItemProps> {
    private getMessage() {
        const lastMessage = this.props.messageList[this.props.messageList.length - 1]
        if (lastMessage) {
            const youIndicator = lastMessage.props.isIncoming ? 'Вы: ' : ''
            return `${youIndicator}${lastMessage.props.message}`
        }
        return ''
    }

    private getUnreadQuantity() {
        if (this.props.unreadQuantity) {
            return `<span class="chat-item-indicators__unread-quantity">${this.props.unreadQuantity}</span>`
        }
        return ''
    }

    private getTime() {
        const lastMessage = this.props.messageList[this.props.messageList.length - 1]
        if (lastMessage) {
            return lastMessage.props.time
        }
        return ''
    }

    template(): string {
        return `<li class="chats-list-item" @event={{eventData}}>
              <div class="chat-item">
                <div class="chat-item-avatar-wrapper">
                  <div class="chat-item-avatar"></div>
                </div>
                <div class="chat-item-info">
                  <span class="chat-item-info__chat-name">{{chatName}}</span><br />
                  <span class="chat-item-info__message">${this.getMessage()}</span>
                </div>
                <div class="chat-item-indicators">
                  <span class="chat-item-indicators__time">${this.getTime()}</span>
                  ${this.getUnreadQuantity()}
                </div>
              </div>
            </li>`
    }
}

export default Chat
