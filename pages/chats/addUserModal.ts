import Modal from '../../components/Modal'
import Header from '../../components/Header'
import { InputName } from '../../utils/validator/InputValidator'
import Button from '../../components/Button'
import DropdownInput from '../../components/dropdown/DropdownInput'
import { MessengerStore, UserProps } from '../../types/Types'
import Option from '../../components/dropdown/Option'
import Store from '../../utils/Store'
import ChatsApi from './chats.api'

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
    if (userProp) {
        const chatId = new Store<MessengerStore>().content.currentChatId
        new ChatsApi().addUser(userProp.id, chatId!)
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
    modalClass: 'add-user-modal',
    backgroundClass: 'add-user-modal-shadow',
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
        })
    ]
})
addUserModal.hide()
