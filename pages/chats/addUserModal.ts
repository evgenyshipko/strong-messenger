import Modal from '../../components/Modal'
import Header from '../../components/Header'
import { InputName } from '../../utils/validator/InputValidator'
import Button from '../../components/Button'
import { chats } from './chats'
import DropdownInput from '../../components/dropdown/DropdownInput'
import HTTPExecutor, { ErrorResponse } from '../../utils/httpExecutor/httpExecutor'
import Url, { ApiPath } from '../../constants/Url'
import { MessengerStore, UserProps } from '../../types/Types'
import { handleErrorResponse } from '../../utils/utils'
import Option from '../../components/dropdown/Option'
import Store from '../../utils/Store'

/* global HTMLInputElement, Event */

const updateDropdownOptions = (e: Event) => {
    const login = (e.target as HTMLInputElement).value
    new HTTPExecutor()
        .post(Url.generate(ApiPath.USER_SEARCH),
            {
                credentials: true,
                data: JSON.stringify({ login: login }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        .then((res) => {
            const userPropsList = JSON.parse(res.response) as UserProps[]
            if (userPropsList && userPropsList.length > 0) {
                const optionList = userPropsList.map((userProp) => {
                    return new Option<UserProps>({
                        label: userProp.login,
                        value: userProp
                    })
                })
                dropdownInput.setProps({ options: optionList, value: login })
            }
        })
        .catch((err) => {
            const errorData = JSON.parse(err) as ErrorResponse
            handleErrorResponse(errorData)
        })
}

const addUserToChat = (_e: Event) => {
    const userProp = dropdownInput.props.options.find((option: Option<UserProps>) => {
        return option.props.value.login === dropdownInput.props.value
    })?.props.value
    if (userProp) {
        const login = userProp.login
        const userId = userProp.id
        const chatId = new Store<MessengerStore>().content.currentChatId
        new HTTPExecutor()
            .put(Url.generate(ApiPath.CHATS_USERS), {
                credentials: true,
                data: JSON.stringify({ users: [userId], chatId: chatId }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((_res) => {
                console.log('ADD USER RESPONSE', _res)
                window.alert(`Пользователь ${login} добавлен успешно!`)
                addUserModal.hide()
                chats.show('flex')
            })
            .catch((err) => {
                const errorData = JSON.parse(err) as ErrorResponse
                handleErrorResponse(errorData)
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
