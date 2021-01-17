import HTTPExecutor, { ErrorResponse } from 'src/utils/httpExecutor/httpExecutor'
import Url, { ApiPath } from 'src/constants/Url'

/* global FormData */

class SigninApi {
    data: FormData

    constructor(formData: FormData) {
        this.data = formData
    }

    signin() {
        return new HTTPExecutor()
            .post(
                Url.buildFullApiUrl(ApiPath.AUTH_SIGNIN),
                {
                    data: JSON.stringify(Object.fromEntries(this.data)),
                    credentials: true,
                    headers: { 'Content-Type': 'application/json' }
                })
            .catch((e: ErrorResponse) => {
                window.alert(e.responseText)
            })
    }
}

export default SigninApi
