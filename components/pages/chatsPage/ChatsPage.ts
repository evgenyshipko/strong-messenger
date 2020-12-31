import Component from '../../../utils/Component'
import Input from '../../Input'
import Button from '../../button/Button'
import ChatList from '../../chats/chatList/ChatList'
import ChatHeader from '../../chats/chatHeader/ChatHeader'
import MessageList from '../../chats/messageList/MessageList'
import Block from '../../Block'
import Modal from '../../modal/Modal'

interface ChatsPageProps {
    functionsBlockComponents: (Button | Input)[]
    footerComponents: (Button | Input)[]
    chatList: ChatList,
    chatHeader: ChatHeader | Block,
    messageBlockComponents: (MessageList | Block)[],
    addUserModal: Modal,
    deleteChatModal: Modal,
    addChatModal: Modal,
    deleteUserModal: Modal
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
                <div class="chats-header-wrapper">{{chatHeader}}</div>
                <div class="chats-message-block">
                  {{messageBlockComponents}}
                </div>
                <div class="chats-footer">
                  {{footerComponents}}
                </div>
              </div>
            </div>
            <div>{{addUserModal}}</div>
            <div>{{addChatModal}}</div>
            <div>{{deleteUserModal}}</div>
            <div>{{deleteChatModal}}</div>`
    }
}

export default ChatsPage
