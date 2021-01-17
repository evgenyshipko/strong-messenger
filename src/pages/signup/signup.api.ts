import HTTPExecutor from 'src/utils/httpExecutor/httpExecutor'
import Url, { ApiPath } from 'src/constants/Url'
import { handleErrorResponse } from 'src/utils/utils'

class SignupApi {
    data: Record<string, unknown>

    constructor(data: Record<string, unknown>) {
        this.data = data
    }

    signup() {
        return new HTTPExecutor()
            .post(
                Url.buildFullApiUrl(ApiPath.AUTH_SIGNUP),
                {
                    data: JSON.stringify(this.data),
                    credentials: true,
                    headers: { 'Content-Type': 'application/json' }
                })
            .catch(handleErrorResponse)
    }
}

export default SignupApi
