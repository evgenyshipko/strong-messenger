import HTTPExecutor from '../utils/httpExecutor/httpExecutor.js';
import Url, { ApiPath } from '../constants/Url.js';
import Store from '../utils/Store.js';
import ChatsApi from '../pages/chats/chats.api.js';
import { handleErrorResponse } from '../utils/utils.js';
class AuthApi {
    updateUserData() {
        return new HTTPExecutor()
            .get(Url.generate(ApiPath.AUTH_USER), { credentials: true })
            .then((res) => {
            new Store().setState({ userProps: JSON.parse(res.response), isLogged: true });
            new ChatsApi().updateChatsList();
        })
            .catch((err) => {
            const errorData = JSON.parse(err);
            handleErrorResponse(errorData);
        });
    }
}
export default AuthApi;
//# sourceMappingURL=auth.api.js.map