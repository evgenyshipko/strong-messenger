import Router from 'src/utils/router/Router'
import { chats } from 'src/pages/chats/chats'
import { profile } from 'src/pages/profile/profile'
import Path from 'src/constants/Path'
import { signin } from 'src/pages/signin/signin'
import { signup } from 'src/pages/signup/signup'
import Store from 'src/utils/Store'
import { MessengerStore } from 'src/types/Types'
import { internalServerErrorPage } from 'src/pages/error/500'
import { notFoundPage } from 'src/pages/error/404'
import CommonApi from 'src/api/common.api'

const root = document.createElement('div')
root.classList.add('app')
document.body.appendChild(root)

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
new CommonApi().updateInitialData()
