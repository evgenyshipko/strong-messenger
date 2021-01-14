import Button from '../../components/button/Button'
import Input from '../../components/Input'
import Chat from '../../components/chats/chat/Chat'
import ChatHeader from '../../components/chats/chatHeader/ChatHeader'
import MessageList from '../../components/chats/messageList/MessageList'
import ChatsPage from '../../components/pages/chatsPage/ChatsPage'
import ChatList from '../../components/chats/chatList/ChatList'
import Block from '../../components/Block'
import Router from '../../utils/router/Router'
import Path from '../../constants/Path'
import Store from '../../utils/Store'
import { MessengerStore } from '../../types/Types'
import { attachPopup } from './attachPopup'
import { actionsPopup } from './actionsPopup'
import { addChatModal } from './addChatModal'
import { deleteChatModal } from './deleteChatModal'
import { addUserModal } from './addUserModal'
import { deleteUserModal } from './deleteUserModal'
import Message from '../../components/chats/message/Message'
import EventController from '../../utils/EventController'
import EventName from '../../constants/EventName'

/* global HTMLInputElement, KeyboardEvent, HTMLElement */

// создаем внутренние компоненты для компоненты-страницы CreatePage
const functionsBlockComponents = [
    new Block({
        class: 'chats-buttons-block',
        content: [
            new Button({
                class: 'messenger-button_no-background chats-add-chat-btn',
                text: 'Добавить чат',
                eventData: {
                    name: 'click',
                    callback: () => {
                        addChatModal.show()
                    }
                }
            }),
            new Button({
                text: 'Профиль',
                class: 'chats-profile-btn',
                eventData: {
                    name: 'click',
                    callback: () => {
                        new Router('.app').go(Path.PROFILE)
                    }
                }
            })
        ]
    }),
    new Input({
        inputName: 'search',
        placeholder: 'Поиск',
        type: 'text',
        class: 'chats-search-input'
    })
]

const chatHeader = new ChatHeader({
    chatName: 'chat',
    actionsBtn: new Button({
        class: 'chats-head-btn',
        iconClass: 'chats-head-btn__icon',
        eventData: {
            name: 'click',
            callback: () => {
                actionsPopup.toggle()
            }
        }
    })
})
// при первом показе страницы чатов хидер - скрыт
chatHeader.hide()

export const messageListComponent = new MessageList({
    messageItemList: [],
    eventData: {
        name: 'scroll',
        callback: (e) => {
            const element = e.target as HTMLElement
            const currentChatId = store.content.currentChatId
            if (element.scrollTop === 0) {
                // при упоре вверх - догружаем сообщения
                const chatData = store.content.chatList.find((chatData) => {
                    return chatData.id === currentChatId
                })
                if (chatData) {
                    const lastMessage = chatData.messageList[chatData.messageList.length - 1]
                    chatData.messageDriver.getMessages(lastMessage.id)
                }
            } else if (element.scrollTop === element.scrollHeight - element.clientHeight && currentChatId) {
                // при упоре вниз - обнуляем счетчик непрочитанных
                clearUnreadCount(currentChatId)
            }
            // когда крутим колесом - запоминаем scrollTop
            messageListComponent.setScrollTop(element.scrollTop)
        }
    }
})

const chatsFooterInputClass = 'chats-footer-input'

const sendMessage = () => {
    const inputEntrails = footerComponents.find((component) => {
        return component.props.class === chatsFooterInputClass
    })?.getContent()
    if (inputEntrails) {
        const input = inputEntrails[0] as HTMLInputElement
        const store = new Store<MessengerStore>()
        const messageDriver = store.content.chatList.find((chatData) => {
            return chatData.id === store.content.currentChatId
        })?.messageDriver
        if (messageDriver && input.value) {
            messageDriver.send(input.value)
            input.value = ''
        }
    }
}

const footerComponents = [
    new Button({
        class: 'chats-footer-attach-btn',
        eventData: {
            name: 'click',
            callback: () => {
                attachPopup.toggle()
            }
        }
    }),
    new Input({
        type: 'text',
        inputName: 'send-message',
        class: chatsFooterInputClass,
        placeholder: 'Сообщение',
        eventData: {
            name: 'keyup',
            callback: (e:KeyboardEvent) => {
                if (e.code === 'Enter') {
                    sendMessage()
                }
            }
        }
    }),
    new Button({
        class: 'chats-footer-send-btn',
        eventData: {
            name: 'click',
            callback: () => {
                sendMessage()
            }
        }
    })
]
// при первом показе страницы чатов футер - скрыт
footerComponents.forEach((component) => {
    component.hide()
})

// сама страница чатов
export const chats = new ChatsPage({
    functionsBlockComponents: functionsBlockComponents,
    footerComponents: footerComponents,
    chatList: new ChatList({
        chatItemList: []
    }),
    messageBlockComponents: [attachPopup, actionsPopup, messageListComponent],
    chatHeader: chatHeader,
    addChatModal: addChatModal,
    deleteChatModal: deleteChatModal,
    addUserModal: addUserModal,
    deleteUserModal: deleteUserModal
})

// объявим глобальный стор, чтобы не объявлять в каждой функции (он - синглтон все равно)
const store = new Store<MessengerStore>()
const eventController = new EventController()

const updateChatItemList = (_state?: MessengerStore) => {
    const chatItemList = store.content.chatList.map((chatData) => {
        return new Chat({
            id: chatData.id,
            unreadCount: chatData.unreadCount,
            chatName: chatData.title,
            lastMessage: chatData.messageList?.[0],
            eventData: {
                name: 'click',
                callback: () => {
                    store.setState({ currentChatId: chatData.id })
                    // апдейтим список сообщений на экране
                    eventController.emit(EventName.refreshMessages, chatData.id)
                    // перемещаем ползунок вниз
                    messageListComponent.moveViewToBottom()
                    chatHeader.setProps({ chatName: chatData.title })
                    chatHeader.show()
                    footerComponents.forEach((component) => {
                        component.show()
                    })
                }
            }
        })
    })
    chats.props.chatList.setProps({ chatItemList: chatItemList })
}

const getChatById = (chatId: number) => {
    return chats.props.chatList.props.chatItemList.find((chat) => {
        return chat.props.id === chatId
    })
}

const updateMessageList = (chatId: number) => {
    const chatData = store.content.chatList.find((chatData) => {
        return chatData.id === chatId
    })
    if (chatData && chatData.messageList) {
        const oldScrollHeight = messageListComponent.getScrollHeight()
        const oldMessageItemListLength = messageListComponent.props.messageItemList.length
        messageListComponent.setProps({
            messageItemList: chatData.messageList.map((messageData) => {
                return new Message({
                    id: messageData.id,
                    userId: messageData.userId,
                    chatId: chatId,
                    content: messageData.content,
                    time: messageData.time
                })
            }).reverse()
        })
        const newMessageItemListLength = messageListComponent.props.messageItemList.length
        const newScrollHeight = messageListComponent.getScrollHeight()
        // вычисляем положение скролла
        if (oldScrollHeight && newScrollHeight) {
            messageListComponent.updateScrollPosition(oldScrollHeight, newScrollHeight, newMessageItemListLength - oldMessageItemListLength)
        }
    }
}

const clearUnreadCount = (chatId: number) => {
    const chatData = store.content.chatList.find((chatData) => {
        return chatData.id === chatId
    })
    if (chatData) {
        chatData.unreadCount = 0
        const chat = getChatById(chatId)
        chat?.setProps({ unreadCount: 0 })
    }
}

const refreshLastMessage = (chatId: number) => {
    const chatData = store.content.chatList.find((chatData) => {
        return chatData.id === chatId
    })
    if (chatData) {
        const chat = getChatById(chatId)
        chat?.setProps({ lastMessage: chatData.messageList?.[0] })
    }
}

const appendUnreadCount = (chatId: number) => {
    const chatData = store.content.chatList.find((chatData) => {
        return chatData.id === chatId
    })
    if (chatData) {
        chatData.unreadCount++
        const chat = getChatById(chatId)
        chat?.setProps({ unreadCount: chatData.unreadCount })
    }
}

// подписываем обновление списка чатов на изменение глобального стора
store.subscribe('chatList', updateChatItemList)

// делаем поведение чата динамическим в зависимости от получаемых данных
eventController.subscribe(EventName.refreshMessages, updateMessageList)
eventController.subscribe(EventName.messagesLoaded, refreshLastMessage)
eventController.subscribe(EventName.newMessageAdded, (chatId: number, userId: number) => {
    refreshLastMessage(chatId)
    if (store.content.currentChatId !== chatId) {
        appendUnreadCount(chatId)
    } else {
        // если сообщение отправил я - перематываю вид вниз, если отправили мне - увеличиваю счетчик непрочитанных
        if (userId === store.content.userProps.id) {
            messageListComponent.moveViewToBottom()
        } else {
            appendUnreadCount(chatId)
        }
    }
})
