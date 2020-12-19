import Component from '../../utils/Component'
import Button from '../Button'

interface ChatHeaderProps {
    chatName: string,
    actionsBtn: Button
}

class ChatHeader extends Component<ChatHeaderProps> {
    template(): string {
        return `
          <div class="chats-head-avatar"></div>
          <div class="chats-head-text">{{chatName}}}</div>
          <div class="chats-head-btn-div">{{actionsBtn}}</div>
        `
    }
}
export default ChatHeader
