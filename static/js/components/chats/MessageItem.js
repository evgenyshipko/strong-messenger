import Component from '../../utils/Component.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
class MessageItem extends Component {
    constructor(props) {
        super(props);
    }
    template() {
        let divClass = 'chats-message-incoming';
        if (this.props.isUser) {
            divClass = 'chats-message-outcoming';
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
            </li>`;
    }
}
export default MessageItem;
//# sourceMappingURL=Message.js.map
