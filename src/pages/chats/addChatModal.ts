import Modal from '../../components/modal/Modal'
import Header from '../../components/Header'
import Input from '../../components/Input'
import Button from '../../components/button/Button'
import ChatsApi from './chats.api'

/* global FormData, HTMLInputElement, Event */

const inputClass = 'add-chat-modal-input'

const createChat = (_e: Event) => {
    const input = document.getElementsByClassName(inputClass)[0] as HTMLInputElement
    const title = input.value
    if (title && title !== '') {
        new ChatsApi()
            .create(title)
            .then(() => {
                addChatModal.hide()
            })
    } else {
        window.alert('Заполните имя чата!')
    }
}

export const addChatModal = new Modal({
    content: [
        new Header({
            text: 'Добавить чат',
            class: 'add-user-modal-header'
        }),
        new Input({
            placeholder: 'Название чата',
            class: inputClass,
            type: 'text',
            inputName: 'chat_name'
        }),
        new Button({
            class: 'messenger-button add-user-modal-change-btn',
            text: 'Добавить',
            eventData: {
                name: 'click',
                callback: createChat
            }
        }),
        new Button({
            class: 'messenger-button_no-background',
            text: 'Отмена',
            eventData: {
                name: 'click',
                callback: () => {
                    addChatModal.hide()
                }
            }
        })
    ]
})
addChatModal.hide()
