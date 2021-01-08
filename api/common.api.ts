import AuthApi from './auth.api'
import ChatsApi from '../pages/chats/chats.api'
import { handleErrorResponse } from '../utils/utils'

class CommonApi {
    updateInitialData() {
        return new AuthApi().updateUserData()
            .then(() => {
                return new ChatsApi().updateChatList()
            })
            .catch(handleErrorResponse)
    }
}
export default CommonApi
