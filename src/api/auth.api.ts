import HTTPExecutor from '../utils/httpExecutor/httpExecutor'
import Url, { ApiPath } from '../constants/Url'
import Store from '../utils/Store'
import { MessengerStore, UserProps } from '../types/Types'
import { handleErrorResponse } from '../utils/utils'

class AuthApi {
    updateUserData() {
        return new HTTPExecutor()
            .get(Url.generate(ApiPath.AUTH_USER), { credentials: true })
            .then((res) => {
                const store = new Store<MessengerStore>()
                store.setState({ userProps: JSON.parse(res.response) as UserProps, isLogged: true })
            })
            .catch(handleErrorResponse)
    }
}
export default AuthApi
