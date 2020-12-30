import Component from '../../../utils/Component.js';
class ChatHeader extends Component {
    template() {
        return `<div class="chat-header">
          <div class="chat-header-avatar"></div>
          <div class="chat-header-text">{{chatName}}}</div>
          <div class="chat-header-button-block">{{actionsBtn}}</div>
        </div>`;
    }
}
export default ChatHeader;
//# sourceMappingURL=ChatHeader.js.map