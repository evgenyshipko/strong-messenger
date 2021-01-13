import Router from './utils/router/Router'
import { chats } from './pages/chats/chats'
import { profile } from './pages/profile/profile'
import Path from './constants/Path'
import { signin } from './pages/signin/signin'
import { signup } from './pages/signup/signup'
import Store from './utils/Store'
import { MessengerStore } from './types/Types'
import { internalServerErrorPage } from './pages/error/500'
import { notFoundPage } from './pages/error/404'
import CommonApi from './api/common.api'

import './components/button/Button.less'
import './components/pages/profilePage/ProfilePage.less'
import './components/pages/chatsPage/ChatsPage.less'
import './components/modal/Modal.less'
import './components/chats/message/Message.less'
import './components/chats/chat/Chat.less'
import './components/chats/messageList/MessageList.less'
import './components/chats/chatList/ChatList.less'
import './components/chats/chatHeader/ChatHeader.less'
import './components/pages/chatsPage/ActionsPopup.less'
import './components/pages/chatsPage/AttachPopup.less'
import './components/pages/chatsPage/DeleteChatModal.less'
import './components/pages/chatsPage/AddUserModal.less'
import './components/formInput/FormInput.less'
import './components/pages/errorPage/ErrorPage.less'
import './components/pages/signinPage/SigninPage.less'
import './components/pages/signupPage/SignupPage.less'
import './utils/component/Component.less'

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
