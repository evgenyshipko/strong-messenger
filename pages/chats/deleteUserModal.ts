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

const updateChatUsersDropdownInput = (state: MessengerStore) => {
    const userPropsList = state.chatList.find((chatData) => {
        return chatData.id === state.currentChatId
    })?.userList
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
store.subscribe('currentChatId', updateChatUsersDropdownInput)

const deleteUserFromChat = (_e: Event) => {
    const userProp = dropdownInput.props.options.find((option: Option<UserProps>) => {
        return option.props.value.login === (dropdownInput.getContent()![0] as HTMLInputElement).value
    })?.props.value
    const chatId = store.content.currentChatId
    if (userProp && chatId) {
        new ChatsApi().deleteUser(userProp.id, chatId)
            .then(() => {
                window.alert('Пользователь удален успешно!')
                deleteUserModal.hide()
                actionsPopup.hide()
            })
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
        }),
        new Button({
            class: 'messenger-button_no-background',
            text: 'Отмена',
            eventData: {
                name: 'click',
                callback: () => {
                    deleteUserModal.hide()
                }
            }
        })
    ]
})
deleteUserModal.hide()
