import HTTPExecutor from 'src/utils/httpExecutor/httpExecutor'
import Url, { ApiPath } from 'src/constants/Url'
import Store from 'src/utils/Store'
import { ChatData, ChatDataExtended, MessengerStore, UserProps } from 'src/types/Types'
import { handleErrorResponse } from 'src/utils/utils'
import Option from 'src/components/dropdown/Option'
import DropdownInput from 'src/components/dropdown/DropdownInput'
import MessageDriver from 'src/utils/MessageDriver'

class ChatsApi {
    store: Store<MessengerStore> = new Store<MessengerStore>()

    create(title: string) {
        return new HTTPExecutor()
            .post(
                Url.buildFullApiUrl(ApiPath.CHATS),
                {
                    data: JSON.stringify({ title: title }),
                    credentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            .then((res) => {
                const chatId = (JSON.parse(res.response) as {id: number}).id
                const chatData: ChatData = { id: chatId, avatar: '', title: title }
                return this.getExtendedChatParameters(chatData, this.store.content.userProps.id)
            })
            .then((chatDataExtended) => {
                if (chatDataExtended) {
                    const chatList = this.store.content.chatList
                    chatList.push(chatDataExtended)
                    this.store.setState({ chatList: chatList })
                }
            })
            .catch(handleErrorResponse)
    }

    delete() {
        const chatIdToDelete = this.store.content.currentChatId
        return new HTTPExecutor()
            .delete(
                Url.buildFullApiUrl(ApiPath.CHATS),
                {
                    data: JSON.stringify({ chatId: chatIdToDelete }),
                    credentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            .then((_res) => {
                const chatList = this.store.content.chatList.filter((chat) => {
                    return chat.id !== chatIdToDelete
                })
                this.store.setState({ chatList: chatList })
            })
            .catch(handleErrorResponse)
    }

    getChatsList() {
        return new HTTPExecutor()
            .get(Url.buildFullApiUrl(ApiPath.CHATS), { credentials: true })
            .then((res) => {
                return JSON.parse(res.response) as ChatData[]
            })
    }

    private initExtendedChatParameters(chatList: ChatData[], currentUserId: number) {
        return Promise.all(chatList.map((chatData) => (
            this.getExtendedChatParameters(chatData, currentUserId)
        ))).then((result) => {
            return result.filter(value => value !== undefined) as ChatDataExtended[]
        })
    }

    private async getExtendedChatParameters(chatData: ChatData, currentUserId: number) {
        const chatId = chatData.id
        try {
            return {
                ...chatData,
                messageDriver: await MessageDriver.build(currentUserId, chatId, chatData.title),
                userList: await this.getChatUsers(chatId),
                unreadCount: await this.getUnreadMessagesCount(chatId),
                messageList: []
            }
        } catch (e) {
            handleErrorResponse(e)
        }
    }

    updateChatList() {
        this.getChatsList()
            .then((chatList) => {
                return this.initExtendedChatParameters(chatList, this.store.content.userProps.id)
            })
            .then((transformedChatList) => {
                this.store.setState({ chatList: transformedChatList })
            })
            .catch(handleErrorResponse)
    }

    addUser(userId: number, chatId: number) {
        return new HTTPExecutor()
            .put(
                Url.buildFullApiUrl(ApiPath.CHATS_USERS), {
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
            .delete(Url.buildFullApiUrl(ApiPath.CHATS_USERS), {
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

    token(chatId: number) {
        return new HTTPExecutor()
            .post(`${Url.buildFullApiUrl(ApiPath.CHATS_TOKEN)}/${chatId}`, {
                credentials: true
            })
            .then((res) => {
                return (JSON.parse(res.response) as {'token': string}).token
            })
    }

    getChatUsers(chatId: number) {
        return new HTTPExecutor()
            .get(Url.getChatUsersUrl(chatId), { credentials: true })
            .then((res) => {
                return JSON.parse(res.response) as UserProps[]
            })
    }

    getUnreadMessagesCount(chatId: number) {
        const url = `${Url.buildFullApiUrl(ApiPath.CHATS_UNREAD_MESSAGES)}/${chatId}`
        return new HTTPExecutor()
            .get(url, { credentials: true })
            .then((res) => {
                return (JSON.parse(res.response) as {'unread_count': number}).unread_count
            })
    }

    updateChatUsers(chatId: number) {
        this.getChatUsers(chatId)
            .then((userList) => {
                const chatData = this.store.content.chatList.find((chatData) => {
                    return chatData.id === this.store.content.currentChatId
                })
                if (chatData && userList && userList.length > 0) {
                    chatData.userList = userList
                }
            })
            .catch(handleErrorResponse)
    }

    updateSearchUserDropdownInput(login: string, dropdownInput: DropdownInput<UserProps>) {
        new HTTPExecutor()
            .post(Url.buildFullApiUrl(ApiPath.USER_SEARCH),
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
