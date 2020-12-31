import Router from './utils/router/Router'
import { chats } from './pages/chats/chats'
import { profile } from './pages/profile/profile'
import Path from './constants/Path'
import { signin } from './pages/signin/signin'
import { signup } from './pages/signup/signup'
import Store from './utils/Store'
import { MessengerStore } from './types/Types'
import { internalServerErrorPage } from './pages/error/500'
import AuthApi from './api/auth.api'
import { notFoundPage } from './pages/error/404'

const router = new Router('.app')
    .useNotFound(notFoundPage)
    .use(Path.CHATS, chats)
    .use(Path.PROFILE, profile)
    .use(Path.SIGNIN, signin)
    .use(Path.SIGNUP, signup)
    .use(Path.INTERNAL_SERVER_ERROR, internalServerErrorPage)

const store = new Store<MessengerStore>()
// подписываем показ страницы в зависимости от изменения isLogged
store.subscribe('isLogged', (state) => {
    if (state.isLogged === false) {
        router.go(Path.SIGNIN)
    } else {
        router.start()
    }
})
// при первой загрузке страницы проверяем - авторизованы ли мы в системе и если да - то обновляем данные пользователя
new AuthApi().updateUserData()
