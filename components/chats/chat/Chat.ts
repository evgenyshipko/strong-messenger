import Component from '../../../utils/Component'
import Message from '../message/Message'
import { EventData } from '../../../types/Types'

interface ChatItemProps {
    id: number,
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
            return `<span class="chat-indicators__unread-quantity">${this.props.unreadQuantity}</span>`
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
        return `<li class="chat-list-item" @event={{eventData}}>
              <div class="chat">
                <div class="chat-avatar-wrapper">
                  <div class="chat-avatar"></div>
                </div>
                <div class="chat-info">
                  <span class="chat-info__chat-name">{{chatName}}</span><br />
                  <span class="chat-info__message">${this.getMessage()}</span>
                </div>
                <div class="chat-indicators">
                  <span class="chat-indicators__time">${this.getTime()}</span>
                  ${this.getUnreadQuantity()}
                </div>
              </div>
            </li>`
    }
}

export default Chat
