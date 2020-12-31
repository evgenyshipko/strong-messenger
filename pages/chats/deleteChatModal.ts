import Modal from '../../components/modal/Modal'
import Header from '../../components/Header'
import Button from '../../components/button/Button'
import ChatsApi from "./chats.api";
import {actionsPopup} from "./actionsPopup";

export const deleteChatModal = new Modal({
    content: [
        new Header({
            text: 'Вы действительно хотите удалить чат?',
            class: 'add-user-modal-header'
        }),
        new Button({
            class: 'messenger-button delete-chat-modal-delete-btn',
            text: 'Удалить',
            eventData: {
                name: 'click',
                callback: () => {
                    new ChatsApi()
                        .delete()
                        .then(() => {
                            window.alert('Чат удален успешно!')
                            deleteChatModal.hide()
                            actionsPopup.hide()
                        })
                }
            }
        }),
        new Button({
            class: 'messenger-button_no-background delete-chat-modal-reject-btn',
            text: 'Отмена',
            eventData: {
                name: 'click',
                callback: () => {
                    deleteChatModal.hide()
                }
            }
        })
    ]
})
deleteChatModal.hide()

