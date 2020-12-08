import Component from '../../utils/Component.js';
class Message extends Component {
    constructor(props) {
        super(props);
    }
    template() {
        let divClass = 'chats-message-outcoming';
        if (this.props.isIncoming) {
            divClass = 'chats-message-incoming';
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
            </li>`;
    }
}
export default Message;
//# sourceMappingURL=Message.js.map