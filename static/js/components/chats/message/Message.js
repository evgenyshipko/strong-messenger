import Component from '../../../utils/Component.js';
class Message extends Component {
    template() {
        const direction = this.props.isIncoming ? 'incoming' : 'outcoming';
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
            </li>`;
    }
}
export default Message;
//# sourceMappingURL=Message.js.map