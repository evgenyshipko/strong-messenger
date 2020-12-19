import Component from '../../utils/Component'
import Input from '../../components/Input'
import Button from '../../components/Button'
import ChatList from '../../components/chats/ChatList'
import ChatHeader from '../../components/chats/ChatHeader'
import MessageList from '../../components/chats/MessageList'
import Block from '../../components/Block'

interface ChatsPageProps {
    functionsBlockComponents: (Button | Input)[]
    footerComponents: (Button | Input)[]
    chatList: ChatList,
    chatHeader: ChatHeader | Block,
    messageBlockComponents: (MessageList | Block)[]
}

class ChatsPage extends Component<ChatsPageProps> {
    template(): string {
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
                <div class="chats-head">
                  {{chatHeader}}
                </div>
                <div class="chats-message-block">
                  {{messageBlockComponents}}
                </div>
                <div class="chats-footer">
                  {{footerComponents}}
                </div>
              </div>
            </div>
        `
    }
}

export default ChatsPage
