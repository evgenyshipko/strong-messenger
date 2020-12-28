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

const updateChatUsersDropdownInput = (state: MessengerStore) => {
    const userPropsList = state.currentChatUsers
    if (userPropsList && userPropsList.length > 0) {
        const optionList = userPropsList.filter((userProps) => {
            // отфильтровываем себя из списка юзеров на удаление
            return userProps.login !== new Store<MessengerStore>().content.userProps.login
        }).map((userProp) => {
            return new Option<UserProps>({
                label: userProp.login,
                value: userProp
            })
        })
        dropdownInput.setProps({ options: optionList })
    }
}

const updateChatUsers = (state: MessengerStore) => {
    const chatId = state.currentChatId
    if (chatId) {
        new ChatsApi().updateChatUsers(chatId)
    }
}
const store = new Store<MessengerStore>()
// список пользователей чата обновляем при каждом изменении currentChatId
store.subscribe('currentChatId', updateChatUsers)
store.subscribe('currentChatUsers', updateChatUsersDropdownInput)

const deleteUserFromChat = (_e: Event) => {
    const userProp = dropdownInput.props.options.find((option: Option<UserProps>) => {
        return option.props.value.login === (dropdownInput.getContent()![0] as HTMLInputElement).value
    })?.props.value
    if (userProp) {
        const chatId = store.content.currentChatId
        if (chatId) {
            new ChatsApi().deleteUser(userProp.id, chatId)
                .then(() => {
                    deleteUserModal.hide()
                })
        }
    } else {
        window.alert('Сначала выберите пользователя')
    }
}

const dropdownInput = new DropdownInput<UserProps>({
    id: 'delete-user-modal-dropdown',
    class: 'add-user-modal-input',
    type: 'text',
    name: InputName.LOGIN,
    options: [],
    autocomplete: 'off'
})

export const deleteUserModal = new Modal({
    modalClass: 'add-user-modal',
    backgroundClass: 'add-user-modal-shadow',
    content: [
        new Header({
            text: 'Удалить пользователя',
            class: 'add-user-modal-header'
        }),
        dropdownInput,
        new Button({
            class: 'messenger-button add-user-modal-change-btn',
            text: 'Удалить',
            eventData: {
                name: 'click',
                callback: deleteUserFromChat
            }
        })
    ]
})
deleteUserModal.hide()
