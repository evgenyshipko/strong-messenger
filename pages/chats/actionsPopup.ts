import Block from '../../components/Block'
import Button from '../../components/Button'
import { addUserModal } from './addUserModal'
import { deleteUserModal } from './deleteUserModal'
import { deleteChatModal } from './deleteChatModal'

export const actionsPopup = new Block({
    class: 'actions-popup',
    content: [
        new Button({
            class: 'actions-popup-btn',
            text: 'Добавить пользователя',
            iconClass: 'actions-popup-btn__icon icon-plus',
            eventData: {
                name: 'click',
                callback: () => {
                    addUserModal.show('flex')
                }
            }
        }),
        new Button({
            class: 'actions-popup-btn',
            text: 'Удалить пользователя',
            iconClass: 'actions-popup-btn__icon icon-minus',
            eventData: {
                name: 'click',
                callback: () => {
                    deleteUserModal.show('flex')
                }
            }
        }),
        new Button({
            class: 'actions-popup-btn',
            text: 'Удалить чат',
            iconClass: 'actions-popup-btn__icon icon-trash',
            eventData: {
                name: 'click',
                callback: () => {
                    deleteChatModal.show('flex')
                }
            }
        })
    ]
})
actionsPopup.hide()
