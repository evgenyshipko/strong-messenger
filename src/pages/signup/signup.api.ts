import HTTPExecutor from '../../utils/httpExecutor/httpExecutor'
import Url, { ApiPath } from '../../constants/Url'
import Router from '../../utils/router/Router'
import Path from '../../constants/Path'
import { handleErrorResponse } from '../../utils/utils'

class SignupApi {
    data: Record<string, unknown>

    constructor(data: Record<string, unknown>) {
        this.data = data
    }

    request() {
        new HTTPExecutor()
            .post(
                Url.generate(ApiPath.AUTH_SIGNUP),
                {
                    data: JSON.stringify(this.data),
                    credentials: true,
                    headers: { 'Content-Type': 'application/json' }
                })
            .then((_res) => {
                new Router('.app').go(Path.CHATS)
            })
            .catch(handleErrorResponse)
    }
}

export default SignupApi
