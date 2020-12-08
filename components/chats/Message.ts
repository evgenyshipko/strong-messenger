import Component from '../../utils/Component.js'

interface MessageItemProps {
    message: string,
    time: string,
    isIncoming?: boolean
}

class Message extends Component<MessageItemProps> {
    constructor(props: MessageItemProps) {
        super(props)
    }

    template(): string {
        let divClass = 'chats-message-outcoming'
        if (this.props.isIncoming) {
            divClass = 'chats-message-incoming'
        }

        return `<li class="chats-message-list__item">
              <div class="${divClass}">
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
