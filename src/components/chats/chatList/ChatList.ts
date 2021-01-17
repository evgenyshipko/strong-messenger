import Component from 'src/utils/component/Component'
import Chat from 'src/components/chats/chat/Chat'
import 'src/components/chats/chatList/ChatList.less'

interface ChatListProps {
    chatItemList: Chat[]
}

class ChatList extends Component<ChatListProps> {
    template(): string {
        return '<ul class="chat-list">{{chatItemList}}</ul>'
    }
}

export default ChatList
