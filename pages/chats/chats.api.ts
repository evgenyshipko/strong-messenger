import HTTPExecutor from '../../utils/httpExecutor/httpExecutor'
import Url, {ApiPath} from '../../constants/Url'
import Store from '../../utils/Store'
import {ChatData, ChatDataExtended, MessengerStore, UserProps} from '../../types/Types'
import {handleErrorResponse} from '../../utils/utils'
import Option from '../../components/dropdown/Option'
import DropdownInput from '../../components/dropdown/DropdownInput'
import MessageDriver from '../../utils/MessageDriver'

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
            .then(async (res) => {
                const response = JSON.parse(res.response) as ChatData
                const store = new Store<MessengerStore>()
                const chatList = store.content.chatList
                chatList.push(await this.getExtendedChatParameters(response, store.content.userProps.id))
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

    private initExtendedChatParameters(chatList: ChatData[], currentUserId: number) {
        return Promise.all(chatList.map(async (chatData) => {
            return await this.getExtendedChatParameters(chatData, currentUserId)
        }))
    }

    private async getExtendedChatParameters(chatData: ChatData, currentUserId: number): Promise<ChatDataExtended> {
        const chatId = chatData.id
        return {
            ...chatData,
            messageDriver: await MessageDriver.build(currentUserId, chatId, chatData.title),
            userList: await this.getChatUsers(chatId),
            unreadCount: await this.getUnreadMessagesCount(chatId),
            messageList: []
        }
    }

    async updateChatList() {
        const store = new Store<MessengerStore>()
        const chatList = await this.getChatsList()
        if (chatList) {
            const transformedChatList = await this.initExtendedChatParameters(chatList, store.content.userProps.id)
            store.setState({ chatList: transformedChatList })
        }
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

    token(chatId: number) {
        return new HTTPExecutor()
            .post(`${Url.generate(ApiPath.CHATS_TOKEN)}/${chatId}`, {
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
        const url = `${Url.generate(ApiPath.CHATS_UNREAD_MESSAGES)}/${chatId}`
        return new HTTPExecutor()
            .get(url, { credentials: true })
            .then((res) => {
                return (JSON.parse(res.response) as {'unread_count': number}).unread_count
            })
    }

    async updateChatUsers(chatId: number) {
        const userList = await this.getChatUsers(chatId)
        const store = new Store<MessengerStore>()
        const chatData = store.content.chatList.find((chatData) => {
            return chatData.id === store.content.currentChatId
        })
        if (chatData && userList && userList.length > 0) {
            chatData.userList = userList
        }
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
