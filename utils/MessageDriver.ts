import ChatsApi from '../pages/chats/chats.api'
import {isArray, isObject} from './utils'
import {MessageData, MessageDataExcluded} from '../types/Types'
import Message from '../components/chats/message/Message'
import {messageListComponent } from '../pages/chats/chats'

/* global WebSocket */

class MessageDriver {
    socket: WebSocket
    chatId: number
    chatTitle: string
    userId: number
    token: string

    static async build(userId: number, chatId: number, chatTitle?: string) {
        const messageDriver = new MessageDriver()
        messageDriver.chatId = chatId
        messageDriver.userId = userId
        messageDriver.token = await new ChatsApi().token(chatId)
        if (chatTitle) {
            messageDriver.chatTitle = chatTitle
        }
        await messageDriver._connect()
        messageDriver._initListeners()
        messageDriver._initPingService()
        return messageDriver
    }

    send(message: string) {
        this.socket.send(JSON.stringify({
            content: message,
            type: 'message'
        }))
    }

    getMessages(count: number = 0) {
        this.socket.send(JSON.stringify({
            content: `${count}`,
            type: 'get old'
        }))
    }

    private async _connect() {
        const url = `wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}`
        this.socket = new WebSocket(url)
    }

    private _initListeners() {
        const prefix = `${this.chatTitle}(${this.chatId}): `
        this.socket.addEventListener('open', () => {
            console.log(prefix + 'Соединение установлено')
        })
        this.socket.addEventListener('close', event => {
            event.wasClean ? console.log(prefix + 'Соединение закрыто чисто') : console.log(prefix + 'Обрыв соединения')
            console.log(`Код: ${event.code} | Причина: ${event.reason}`)
            // if (event.code === 1006 && !event.wasClean) {
            //     console.log(prefix + 'Переподключение')
            //     this.connect()
            // }
        })
        this.socket.addEventListener('message', event => {
            const data = JSON.parse(event.data)
            if (data.type !== 'error') {
                console.log(prefix + 'Получены данные', data)
                if (isArray(data) && data.length > 0 && this._isMessageData(data[0])) {
                    this._updateMessageList(data as MessageData[])
                } else if (this._isMessageDataExcluded(data)) {
                    this._addMessage(data)
                }
            }
        })
        this.socket.addEventListener('error', event => {
            console.log(prefix + 'Ошибка', event)
        })
    }

    private _updateMessageList(data: MessageData[]) {
        console.log('_updateMessageList')
        messageListComponent.setProps({
            messageItemList: data.map((messageData) => {
                return new Message({
                    id: messageData.id,
                    userId: messageData.user_id,
                    chatId: messageData.chat_id,
                    content: messageData.content,
                    time: messageData.time
                })
            }).reverse()
        })
        messageListComponent.moveViewToBottom()
    }

    private _addMessage(data: MessageDataExcluded) {
        console.log('_addMessage')
        const messageItemList = messageListComponent.props.messageItemList
        messageItemList.push(new Message({
            id: data.id,
            userId: data.userId,
            chatId: this.chatId,
            content: data.content,
            time: data.time
        }))
        console.log('messageItemList', messageItemList)
        messageListComponent.setProps({ messageItemList: messageItemList })
        messageListComponent.moveViewToBottom()
    }

    private _isMessageData(obj: unknown): obj is MessageData {
        if (isObject(obj)) {
            return 'id' in obj && 'user_id' in obj && 'chat_id' in obj && 'time' in obj && 'content' in obj
        }
        return false
    }

    private _isMessageDataExcluded(obj: unknown): obj is MessageDataExcluded {
        if (isObject(obj)) {
            return 'id' in obj && 'userId' in obj && 'time' in obj && 'content' in obj
        }
        return false
    }

    private _initPingService() {
        setInterval(() => {
            this._ping()
        }, 10000)
    }

    private _ping() {
        console.log('ping')
        this.socket.send('ping')
    }
}
export default MessageDriver
