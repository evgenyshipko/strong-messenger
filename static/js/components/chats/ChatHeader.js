import Component from '../../utils/Component.js';
class ChatHeader extends Component {
    constructor(props) {
        super(props);
    }
    template() {
        return `
          <div class="chats-head-avatar"></div>
          <div class="chats-head-text">{{chatName}}}</div>
          <div class="chats-head-btn-div">{{actionsBtn}}</div>
        `;
    }
}
export default ChatHeader;
//# sourceMappingURL=ChatHeader.js.map