import AuthApi from 'src/api/auth.api'
import ChatsApi from 'src/pages/chats/chats.api'
import { handleErrorResponse } from 'src/utils/utils'

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
