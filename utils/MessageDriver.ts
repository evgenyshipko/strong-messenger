/* global WebSocket */
import ChatsApi from '../pages/chats/chats.api'

class MessageDriver {
    socket: WebSocket

    static async build(chatId: number, userId: number) {
        const token = await new ChatsApi().getToken(chatId)
        const url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
        const messageDriver = new MessageDriver()
        messageDriver.socket = new WebSocket(url)
        messageDriver._initListeners()
        return messageDriver
    }

    _initListeners() {
        this.socket.addEventListener('open', () => {
            console.log('Соединение установлено')
        })
        this.socket.addEventListener('close', event => {
            event.wasClean ? console.log('Соединение закрыто чисто') : console.log('Обрыв соединения')
            console.log(`Код: ${event.code} | Причина: ${event.reason}`)
        })
        this.socket.addEventListener('message', event => {
            console.log('Получены данные', event.data)
        })
        this.socket.addEventListener('error', event => {
            console.log('Ошибка', event)
        })
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
}
export default MessageDriver
