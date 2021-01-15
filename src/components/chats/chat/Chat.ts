import Component from '../../../utils/component/Component'
import { EventData, MessageDataExcluded, MessengerStore } from '../../../types/Types'
import Store from '../../../utils/Store'
import { convertDateToTime } from '../../../utils/utils'
import './Chat.less'

interface ChatItemProps {
    id: number,
    checked?: boolean,
    chatName: string,
    lastMessage?: MessageDataExcluded,
    unreadCount: number,
    eventData?: EventData
}

class Chat extends Component<ChatItemProps> {
    static store = new Store<MessengerStore>()

    private getMessage() {
        const lastMessage = this.props.lastMessage
        if (lastMessage) {
            const userName = lastMessage.userId === Chat.store.content.userProps.id ? 'Вы' : `${this.getUserNameById(lastMessage.userId)}`
            const maxLength = 35
            const messageText = lastMessage.content.length > maxLength ? lastMessage.content.substring(0, maxLength) + '...' : lastMessage.content
            return `${userName}: ${messageText}`
        }
        return ''
    }

    private getUserNameById(userId: number) {
        const chatData = Chat.store.content.chatList.find((chatData) => {
            return chatData.id === this.props.id
        })
        const userProps = chatData?.userList.find((userProps) => {
            return userProps.id === userId
        })
        if (userProps) {
            return userProps.display_name ? userProps.display_name : userProps.login
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
                  <span class="chat-info__chat-name">{{chatName}}</span>
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
