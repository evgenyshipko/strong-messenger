import Component from '../../utils/Component.js'
import Input from '../../components/Input.js'
import Button from '../../components/Button.js'
import ChatList from '../../components/chats/ChatList.js'
import ChatHeader from '../../components/chats/ChatHeader.js'
import MessageList from '../../components/chats/MessageList.js'
import Block from '../../components/Block.js'

interface ChatsPageProps {
    functionsBlockComponents: (Button | Input)[]
    footerComponents: (Button | Input)[]
    chatList: ChatList,
    chatHeader: ChatHeader | Block,
    messageBlockComponents: (MessageList | Block)[]
}

class ChatsPage extends Component<ChatsPageProps> {
    constructor(props: ChatsPageProps) {
        super(props)
    }

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
