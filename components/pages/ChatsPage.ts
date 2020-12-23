import Component from '../../utils/Component'
import Input from '../Input'
import Button from '../Button'
import ChatList from '../chats/ChatList'
import ChatHeader from '../chats/ChatHeader'
import MessageList from '../chats/MessageList'
import Block from '../Block'

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
