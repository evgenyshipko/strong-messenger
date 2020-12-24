import HTTPExecutor from '../../utils/httpExecutor/httpExecutor.js';
import Url, { ApiPath } from '../../constants/Url.js';
import Router from '../../utils/router/Router.js';
import Path from '../../constants/Path.js';
import { handleErrorResponse } from '../../utils/utils.js';
class SignupApi {
    constructor(data) {
        this.data = data;
    }
    request() {
        new HTTPExecutor()
            .post(Url.generate(ApiPath.AUTH_SIGNUP), {
            data: JSON.stringify(this.data),
            credentials: true,
            headers: { 'Content-Type': 'application/json' }
        })
            .then((_res) => {
            new Router('.app').go(Path.CHATS);
        })
            .catch((error) => {
            const errorData = JSON.parse(error);
            handleErrorResponse(errorData);
        });
    }
}
export default SignupApi;
//# sourceMappingURL=signup.api.js.map