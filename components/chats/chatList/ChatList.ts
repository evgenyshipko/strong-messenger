import Component from '../../../utils/component/Component'
import Chat from '../chat/Chat'
import './ChatList.less'

interface ChatListProps {
    chatItemList: Chat[]
}

class ChatList extends Component<ChatListProps> {
    template(): string {
        return '<ul class="chat-list">{{chatItemList}}</ul>'
    }
}

export default ChatList
