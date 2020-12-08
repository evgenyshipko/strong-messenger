import Component from '../../utils/Component.js';
class ChatList extends Component {
    constructor(props) {
        super(props);
    }
    template() {
        return `<ul class="chats-list">{{chatItemList}}</ul>`;
    }
}
export default ChatList;
//# sourceMappingURL=ChatList.js.map