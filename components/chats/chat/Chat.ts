import Component from '../../../utils/component/Component'
import { EventData, MessageDataExcluded, MessengerStore } from '../../../types/Types'
import Store from '../../../utils/Store'
import { convertDateToTime } from '../../../utils/utils'

interface ChatItemProps {
    id: number,
    checked?: boolean,
    chatName: string,
    lastMessage?: MessageDataExcluded,
    unreadCount: number,
    eventData?: EventData
}

class Chat extends Component<ChatItemProps> {
    private getMessage() {
        if (this.props.lastMessage) {
            const youIndicator = this.props.lastMessage.userId === new Store<MessengerStore>().content.userProps.id ? 'Вы: ' : ''
            return `${youIndicator}${this.props.lastMessage.content}`
        }
        return ''
    }

    private getUnreadCount() {
        if (this.props.unreadCount > 0) {
            return `<span class="chat-indicators__unread-quantity">${this.props.unreadCount}</span>`
        }
        return ''
    }

    private getTime() {
        if (this.props.lastMessage) {
            return convertDateToTime(this.props.lastMessage.time)
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
                  ${this.getUnreadCount()}
                </div>
              </div>
            </li>`
    }
}

export default Chat
