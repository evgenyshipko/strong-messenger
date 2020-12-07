import Component from '../../utils/Component.js'

interface MessageItemProps {
    message: string,
    time: string,
    isUser?: boolean
}

class MessageItem extends Component<MessageItemProps> {
    constructor(props: MessageItemProps) {
        super(props)
    }

    template(): string {
        let divClass = 'chats-message-incoming'
        if (this.props.isUser) {
            divClass = 'chats-message-outcoming'
        }

        return `<li class="chats-message-list__item">
              <div class=${divClass}>
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

export default MessageItem
