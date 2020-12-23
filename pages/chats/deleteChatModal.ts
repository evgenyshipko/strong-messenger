import Modal from '../../components/Modal'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { chats } from './chats'

export const deleteChatModal = new Modal({
    modalClass: 'delete-chat-modal',
    backgroundClass: 'delete-chat-modal-shadow',
    content: [
        new Header({
            text: 'Вы действительно хотите удалить чат?',
            class: 'delete-chat-modal-header'
        }),
        new Button({
            class: 'messenger-button delete-chat-modal-delete-btn',
            text: 'Удалить'
        }),
        new Button({
            class: 'messenger-button_no-background delete-chat-modal-reject-btn',
            text: 'Отмена',
            eventData: {
                name: 'click',
                callback: () => {
                    deleteChatModal.hide()
                    chats.show('flex')
                }
            }
        })
    ]
})
deleteChatModal.hide()

