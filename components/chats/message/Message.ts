import Component from '../../../utils/component/Component'

interface MessageItemProps {
    message: string,
    time: string,
    isIncoming?: boolean
}

class Message extends Component<MessageItemProps> {
    template(): string {
        const direction = this.props.isIncoming ? 'incoming' : 'outcoming'
        return `<li class="message-list-item">
              <div class="message-${direction}">
                <span class="message-text">
                  {{message}}
                </span>
                <div class="message-transaction-info">
                  <i class="message-icon"></i>
                  <span class="message-time">{{time}}</span>
                </div>
              </div>
            </li>`
    }
}

export default Message
