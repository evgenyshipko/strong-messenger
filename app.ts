import Router from './utils/router/Router'
import { chats } from './pages/chats/chats'
import { profile } from './pages/profile/profile'
import Path from './constants/Path'
import { signin } from './pages/signin/signin'
import { signup } from './pages/signup/signup'
import HTTPExecutor, { ErrorResponse } from './utils/httpExecutor/httpExecutor'
import Url, { ApiPath } from './constants/Url'
import { StatusCode } from './constants/StatusCode'
import Store from './utils/Store'
import { MessengerStore, UserProps } from './types/Types'

const router = new Router('.app')
    .use(Path.CHATS, chats)
    .use(Path.PROFILE, profile)
    .use(Path.SIGNIN, signin)
    .use(Path.SIGNUP, signup)

const store = new Store<MessengerStore>()
// подписываем показ страницы в зависимости от изменения isLogged
store.subscribe('isLogged', (state) => {
    if (!state.isLogged) {
        router.go(Path.SIGNIN)
    } else {
        router.start()
    }
})

// выполняем при первой загргузке страницы
new HTTPExecutor()
    .get(Url.generate(ApiPath.AUTH_USER), { credentials: true })
    .then((_res) => {
        store.setState({ userProps: JSON.parse(_res.response) as UserProps, isLogged: true })
    })
    .catch((err) => {
        const errorData = JSON.parse(err) as ErrorResponse
        if (errorData.status === StatusCode.UNAUTHORIZED) {
            store.setState({ isLogged: false })
        }
    })
