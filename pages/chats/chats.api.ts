import HTTPExecutor from '../../utils/httpExecutor/httpExecutor'
import Url, { ApiPath } from '../../constants/Url'
import Store from '../../utils/Store'
import { ChatData, MessengerStore, UserProps } from '../../types/Types'
import { handleErrorResponse } from '../../utils/utils'
import Option from '../../components/dropdown/Option'
import DropdownInput from '../../components/dropdown/DropdownInput'

class ChatsApi {
    create(title: string) {
        return new HTTPExecutor()
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
            })
            .catch(handleErrorResponse)
    }

    delete() {
        const store = new Store<MessengerStore>()
        const chatIdToDelete = store.content.currentChatId
        return new HTTPExecutor()
            .delete(
                Url.generate(ApiPath.CHATS),
                {
                    data: JSON.stringify({ chatId: chatIdToDelete }),
                    credentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            .then((_res) => {
                const chatList = store.content.chatList.filter((chat) => {
                    return chat.id !== chatIdToDelete
                })
                store.setState({ chatList: chatList })
            })
            .catch(handleErrorResponse)
    }

    getChatsList() {
        return new HTTPExecutor()
            .get(Url.generate(ApiPath.CHATS), { credentials: true })
            .then((res) => {
                return JSON.parse(res.response) as ChatData[]
            })
            .catch(handleErrorResponse)
    }

    addUser(userId: number, chatId: number) {
        return new HTTPExecutor()
            .put(Url.generate(ApiPath.CHATS_USERS), {
                credentials: true,
                data: JSON.stringify({ users: [userId], chatId: chatId }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((_res) => {
                this.updateChatUsers(chatId)
            })
            .catch(handleErrorResponse)
    }

    deleteUser(userId: number, chatId: number) {
        return new HTTPExecutor()
            .delete(Url.generate(ApiPath.CHATS_USERS), {
                credentials: true,
                data: JSON.stringify({ users: [userId], chatId: chatId }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((_res) => {
                this.updateChatUsers(chatId)
            })
            .catch(handleErrorResponse)
    }

    getToken(chatId: number) {
        return new HTTPExecutor()
            .post(`${Url.generate(ApiPath.CHATS_TOKEN)}/${chatId}`, {
                credentials: true
            })
            .then((res) => {
                return (JSON.parse(res.response) as {'token': string}).token
            })
            .catch(handleErrorResponse)
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
            .catch(handleErrorResponse)
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
            .catch(handleErrorResponse)
    }
}
export default ChatsApi
