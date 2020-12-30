import Component from '../../../utils/Component.js';
class ChatsPage extends Component {
    template() {
        return `
            <div class="chats-wrapper">
              <div class="chats-left-block">
                <div class="chats-functions-block">
                  {{functionsBlockComponents}}}
                </div>
                <div class="chats-navigation">
                  {{chatList}}
                </div>
              </div>
              <div class="chats-right-block">
                <div class="chats-header-wrapper">{{chatHeader}}</div>
                <div class="chats-message-block">
                  {{messageBlockComponents}}
                </div>
                <div class="chats-footer">
                  {{footerComponents}}
                </div>
              </div>
            </div>
            <div>{{addUserModal}}</div>
            <div>{{addChatModal}}</div>
            <div>{{deleteUserModal}}</div>
            <div>{{deleteChatModal}}</div>`;
    }
}
export default ChatsPage;
//# sourceMappingURL=ChatsPage.js.map