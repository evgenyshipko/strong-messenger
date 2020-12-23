import Component from '../../utils/Component.js';
class Chat extends Component {
    getMessage() {
        const lastMessage = this.props.messageList[this.props.messageList.length - 1];
        if (lastMessage) {
            const youIndicator = lastMessage.props.isIncoming ? 'Вы: ' : '';
            return `${youIndicator}${lastMessage.props.message}`;
        }
        return '';
    }
    getUnreadQuantity() {
        if (this.props.unreadQuantity) {
            return `<span class="chat-item-indicators__unread-quantity">${this.props.unreadQuantity}</span>`;
        }
        return '';
    }
    getTime() {
        const lastMessage = this.props.messageList[this.props.messageList.length - 1];
        if (lastMessage) {
            return lastMessage.props.time;
        }
        return '';
    }
    template() {
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
            </li>`;
    }
}
export default Chat;
//# sourceMappingURL=Chat.js.map