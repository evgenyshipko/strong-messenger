import Component from '../../utils/Component'

interface MessageItemProps {
    message: string,
    time: string,
    isIncoming?: boolean
}

class Message extends Component<MessageItemProps> {
    template(): string {
        const direction = this.props.isIncoming ? 'incoming' : 'outcoming'
        return `<li class="chats-message-list__item">
              <div class="chats-message-${direction}">
                <span class="chats-message__text">
                  {{message}}
                </span>
                <div class="chat-message-transaction-info">
                  <i class="chats-message__icon"></i>
                  <span class="chats-message__time">{{time}}</span>
                </div>
              </div>
            </li>`
    }
}

export default Message
