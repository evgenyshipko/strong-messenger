import HTTPExecutor, { ErrorResponse } from '../utils/httpExecutor/httpExecutor'
import Url, { ApiPath } from '../constants/Url'
import Store from '../utils/Store'
import { MessengerStore, UserProps } from '../types/Types'
import ChatsApi from '../pages/chats/chats.api'
import { handleErrorResponse } from '../utils/utils'

class AuthApi {
    updateUserData() {
        return new HTTPExecutor()
            .get(Url.generate(ApiPath.AUTH_USER), { credentials: true })
            .then((res) => {
                new Store<MessengerStore>().setState({ userProps: JSON.parse(res.response) as UserProps, isLogged: true })
                new ChatsApi().updateChatsList()
            })
            .catch((err) => {
                const errorData = JSON.parse(err) as ErrorResponse
                handleErrorResponse(errorData)
            })
    }
}
export default AuthApi
