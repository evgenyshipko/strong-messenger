import Component from '../../utils/Component.js'
import Button from '../Button.js'

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
