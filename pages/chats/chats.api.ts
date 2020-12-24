import HTTPExecutor, { ErrorResponse } from '../../utils/httpExecutor/httpExecutor'
import Url, { ApiPath } from '../../constants/Url'
import Store from '../../utils/Store'
import { ChatData, MessengerStore, UserProps } from '../../types/Types'
import { chats } from './chats'
import { handleErrorResponse } from '../../utils/utils'
import { addChatModal } from './addChatModal'
import { addUserModal } from './addUserModal'
import Option from '../../components/dropdown/Option'
import DropdownInput from '../../components/dropdown/DropdownInput'
import { deleteUserModal } from './deleteUserModal'

class ChatsApi {
    create(title: string) {
        new HTTPExecutor()
            .post(
                Url.generate(ApiPath.CHATS),
                {
                    data: JSON.stringify({ title: title }),
                    credentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            .then((res) => {
                const response = JSON.parse(res.response)
                const store = new Store<MessengerStore>()
                const chatList = store.content.chatList
                chatList.push({ id: response.id, title: title, avatar: '' })
                store.setState({ chatList: chatList })
                addChatModal.hide()
                chats.show('flex')
            })
            .catch((error) => {
                const errorData = JSON.parse(error) as ErrorResponse
                handleErrorResponse(errorData)
            })
    }

    updateChatsList() {
        new HTTPExecutor()
            .get(Url.generate(ApiPath.CHATS), { credentials: true })
            .then((res) => {
                const chatList = JSON.parse(res.response) as ChatData[]
                new Store<MessengerStore>().setState({ chatList: chatList })
            })
            .catch((err) => {
                const errorData = JSON.parse(err) as ErrorResponse
                handleErrorResponse(errorData)
            })
    }

    addUser(userId: number, chatId: number) {
        new HTTPExecutor()
            .put(Url.generate(ApiPath.CHATS_USERS), {
                credentials: true,
                data: JSON.stringify({ users: [userId], chatId: chatId }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((_res) => {
                window.alert('Пользователь добавлен успешно!')
                addUserModal.hide()
                chats.show('flex')
                this.updateChatUsers(chatId)
            })
            .catch((err) => {
                const errorData = JSON.parse(err) as ErrorResponse
                handleErrorResponse(errorData)
            })
    }

    deleteUser(userId: number, chatId: number) {
        new HTTPExecutor()
            .delete(Url.generate(ApiPath.CHATS_USERS), {
                credentials: true,
                data: JSON.stringify({ users: [userId], chatId: chatId }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((_res) => {
                window.alert('Пользователь удален успешно!')
                deleteUserModal.hide()
                chats.show('flex')
                this.updateChatUsers(chatId)
            })
            .catch((err) => {
                const errorData = JSON.parse(err) as ErrorResponse
                handleErrorResponse(errorData)
            })
    }

    updateChatUsers(chatId: number) {
        new HTTPExecutor()
            .get(Url.getChatUsersUrl(chatId), { credentials: true })
            .then((res) => {
                const userPropsList = JSON.parse(res.response) as UserProps[]
                if (userPropsList && userPropsList.length > 0) {
                    new Store<MessengerStore>().setState({ currentChatUsers: userPropsList })
                }
            })
            .catch((err) => {
                const errorData = JSON.parse(err) as ErrorResponse
                handleErrorResponse(errorData)
            })
    }

    updateSearchUserDropdownInput(login: string, dropdownInput: DropdownInput<UserProps>) {
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
}
export default ChatsApi
