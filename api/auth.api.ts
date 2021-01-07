import HTTPExecutor from '../utils/httpExecutor/httpExecutor'
import Url, { ApiPath } from '../constants/Url'
import Store from '../utils/Store'
import { MessengerStore, UserProps } from '../types/Types'
import ChatsApi from '../pages/chats/chats.api'
import { handleErrorResponse } from '../utils/utils'
import MessageDriver from '../utils/MessageDriver'

class AuthApi {
    updateUserData() {
        return new HTTPExecutor()
            .get(Url.generate(ApiPath.AUTH_USER), { credentials: true })
            .then(async (res) => {
                const store = new Store<MessengerStore>()
                store.setState({ userProps: JSON.parse(res.response) as UserProps, isLogged: true })
                const chatList = await new ChatsApi().getChatsList()
                if (chatList) {
                    const transformedChatList = chatList.map(async (chatData) => {
                        return {
                            ...chatData,
                            messageDriver: await MessageDriver.build(chatData.id, store.content.userProps.id)
                        }
                    })
                    store.setState({ chatList: await Promise.all(transformedChatList) })
                }
            })
            .catch(handleErrorResponse)
    }
}
export default AuthApi
