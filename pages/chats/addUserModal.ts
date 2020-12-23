import Modal from '../../components/Modal'
import Header from '../../components/Header'
import Input from '../../components/Input'
import { InputName } from '../../utils/validator/InputValidator'
import Button from '../../components/Button'
import {chats} from "./chats";

export const addUserModal = new Modal({
    modalClass: 'add-user-modal',
    backgroundClass: 'add-user-modal-shadow',
    content: [
        new Header({
            text: 'Добавить пользователя',
            class: 'add-user-modal-header'
        }),
        new Input({
            placeholder: 'Логин',
            class: 'add-user-modal-input',
            type: 'text',
            inputName: InputName.LOGIN
        }),
        new Button({
            class: 'messenger-button add-user-modal-change-btn',
            text: 'Добавить',
            eventData: {
                name: 'click',
                callback: () => {
                    addUserModal.hide()
                    chats.show('flex')
                }
            }
        })
    ]
})
addUserModal.hide()
