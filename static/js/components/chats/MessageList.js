import Component from '../../utils/Component.js';
class MessageList extends Component {
    constructor(props) {
        super(props);
    }
    template() {
        return `<ul class="chats-message-list">{{messageItemList}}</ul>`;
    }
}
export default MessageList;
//# sourceMappingURL=MessageList.js.map