import Component from '../../utils/Component.js'
import Message from './Message.js'
import { EventData } from '../../types/Types'

interface ChatItemProps {
    checked?: boolean,
    chatName: string,
    messageList: Message[],
    unreadQuantity?: number,
    eventData?: EventData
}

class Chat extends Component<ChatItemProps> {
    constructor(props: ChatItemProps) {
        super(props)
    }

    template(): string {
        let youIndicator = ''
        const lastMessage = this.props.messageList[this.props.messageList.length - 1]
        if (!lastMessage.props.isIncoming) {
            youIndicator = 'Вы: '
        }
        let unreadQuantitySpan = ''
        if (this.props.unreadQuantity) {
            unreadQuantitySpan = `<span class="chat-item-indicators__unread-quantity">${this.props.unreadQuantity}</span>`
        }

        return `<li class="chats-list-item" @event={{eventData}}>
              <div class="chat-item">
                <div class="chat-item-avatar-wrapper">
                  <div class="chat-item-avatar"></div>
                </div>
                <div class="chat-item-info">
                  <span class="chat-item-info__chat-name">{{chatName}}</span><br />
                  <span class="chat-item-info__message">${youIndicator}${lastMessage.props.message}</span>
                </div>
                <div class="chat-item-indicators">
                  <span class="chat-item-indicators__time">${lastMessage.props.time}</span>
                  ${unreadQuantitySpan}
                </div>
              </div>
            </li>`
    }
}

export default Chat
