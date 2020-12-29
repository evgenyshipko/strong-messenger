import HTTPExecutor from '../../utils/httpExecutor/httpExecutor.js';
import Url, { ApiPath } from '../../constants/Url.js';
import { handleErrorResponse } from '../../utils/utils.js';
import Router from '../../utils/router/Router.js';
import Path from '../../constants/Path.js';
import AuthApi from '../../api/auth.api.js';
/* global FormData */
class SigninApi {
    constructor(formData) {
        this.data = formData;
    }
    request() {
        new HTTPExecutor()
            .post(Url.generate(ApiPath.AUTH_SIGNIN), {
            data: JSON.stringify(Object.fromEntries(this.data)),
            credentials: true,
            headers: { 'Content-Type': 'application/json' }
        })
            .then((_res) => {
            new AuthApi().updateUserData().then(() => {
                new Router('.app').go(Path.CHATS);
            });
        })
            .catch(handleErrorResponse);
    }
}
export default SigninApi;
//# sourceMappingURL=signin.api.js.map