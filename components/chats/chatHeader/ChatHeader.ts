import Component from '../../../utils/component/Component'
import Button from '../../button/Button'

interface ChatHeaderProps {
    chatName: string,
    actionsBtn: Button
}

class ChatHeader extends Component<ChatHeaderProps> {
    template(): string {
        return `<div class="chat-header">
          <div class="chat-header-avatar"></div>
          <div class="chat-header-text">{{chatName}}}</div>
          <div class="chat-header-button-block">{{actionsBtn}}</div>
        </div>`
    }
}
export default ChatHeader
