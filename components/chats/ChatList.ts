import Component from '../../utils/Component'
import Chat from './Chat'

interface ChatListProps {
    chatItemList: Chat[]
}

class ChatList extends Component<ChatListProps> {
    template(): string {
        return `<ul class="chats-list">{{chatItemList}}</ul>`
    }
}

export default ChatList
