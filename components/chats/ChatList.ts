import Component from '../../utils/Component.js'
import Chat from './Chat.js'

interface ChatListProps {
    chatItemList: Chat[]
}

class ChatList extends Component<ChatListProps> {
    template(): string {
        return `<ul class="chats-list">{{chatItemList}}</ul>`
    }
}

export default ChatList
