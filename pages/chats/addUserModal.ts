import Modal from '../../components/modal/Modal'
import Header from '../../components/Header'
import { InputName } from '../../utils/validator/InputValidator'
import Button from '../../components/button/Button'
import DropdownInput from '../../components/dropdown/DropdownInput'
import { MessengerStore, UserProps } from '../../types/Types'
import Option from '../../components/dropdown/Option'
import Store from '../../utils/Store'
import ChatsApi from './chats.api'
import { actionsPopup } from './actionsPopup'

/* global HTMLInputElement, Event */

// опции апдейтятся с задержкой, чтобы при каждом нажатии не отправлялся запрос на сервер
let delayTimer: any
const updateDropdownOptions = (e: Event) => {
    clearTimeout(delayTimer)
    delayTimer = setTimeout(function() {
        const login = (e.target as HTMLInputElement).value
        new ChatsApi().updateSearchUserDropdownInput(login, dropdownInput)
    }, 1000)
}

const addUserToChat = (_e: Event) => {
    const userProp = dropdownInput.props.options.find((option: Option<UserProps>) => {
        return option.props.value.login === dropdownInput.props.value
    })?.props.value
    const chatId = new Store<MessengerStore>().content.currentChatId
    if (userProp && chatId) {
        new ChatsApi().addUser(userProp.id, chatId)
            .then(() => {
                window.alert('Пользователь добавлен успешно!')
                addUserModal.hide()
                actionsPopup.hide()
            })
    }
}

const dropdownInput = new DropdownInput<UserProps>({
    id: 'add-user-modal-dropdown',
    class: 'add-user-modal-input',
    type: 'text',
    name: InputName.LOGIN,
    options: [],
    autocomplete: 'off',
    eventData: {
        name: 'keyup',
        callback: updateDropdownOptions
    }
})

export const addUserModal = new Modal({
    content: [
        new Header({
            text: 'Добавить пользователя',
            class: 'add-user-modal-header'
        }),
        dropdownInput,
        new Button({
            class: 'messenger-button add-user-modal-change-btn',
            text: 'Добавить',
            eventData: {
                name: 'click',
                callback: addUserToChat
            }
        }),
        new Button({
            class: 'messenger-button_no-background',
            text: 'Отмена',
            eventData: {
                name: 'click',
                callback: () => {
                    addUserModal.hide()
                }
            }
        })
    ]
})
addUserModal.hide()
