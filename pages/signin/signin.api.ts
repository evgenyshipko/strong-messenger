import HTTPExecutor from '../../utils/httpExecutor/httpExecutor'
import Url, {ApiPath} from '../../constants/Url'
import {handleErrorResponse} from '../../utils/utils'
import Router from '../../utils/router/Router'
import Path from '../../constants/Path'
import CommonApi from '../../api/common.api'

/* global FormData */

class SigninApi {
    data: FormData

    constructor(formData: FormData) {
        this.data = formData
    }

    request() {
        new HTTPExecutor()
            .post(
                Url.generate(ApiPath.AUTH_SIGNIN),
                {
                    data: JSON.stringify(Object.fromEntries(this.data)),
                    credentials: true,
                    headers: { 'Content-Type': 'application/json' }
                })
            .then((_res) => {
                new CommonApi().updateInitialData()
                    .then(() => {
                        new Router('.app').go(Path.CHATS)
                    })
            })
            .catch(handleErrorResponse)
    }
}

export default SigninApi
