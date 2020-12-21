import Router from './utils/router/Router'
import { chats } from './pages/chats/chats'
import { profile } from './pages/profile/profile'
import Path from './constants/Path'
import { signin } from './pages/signin/signin'
import { signup } from './pages/signup/signup'
import HTTPExecutor, { ErrorResponse } from './utils/httpExecutor/httpExecutor'
import Url, { ApiPath } from './constants/Url'
import { StatusCode } from './constants/StatusCode'

const router = new Router('.app')
    .use(Path.CHATS, chats)
    .use(Path.PROFILE, profile)
    .use(Path.SIGNIN, signin)
    .use(Path.SIGNUP, signup)

new HTTPExecutor()
    .get(Url.generate(ApiPath.USER), { credentials: true })
    .then((res) => {
        console.log('response', res)
        router.start()
    })
    .catch((err) => {
        const errorData = JSON.parse(err) as ErrorResponse
        console.log('errorData', errorData)
        if (errorData.status === StatusCode.UNAUTHORIZED) {
            router.start(Path.SIGNIN)
        }
    })
