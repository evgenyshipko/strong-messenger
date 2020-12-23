import Router from './utils/router/Router.js';
import { chats } from './pages/chats/chats.js';
import { profile } from './pages/profile/profile.js';
import Path from './constants/Path.js';
import { signin } from './pages/signin/signin.js';
import { signup } from './pages/signup/signup.js';
import Store from './utils/Store.js';
import { internalServerErrorPage } from './pages/error/500.js';
import { uploadAvatarModal } from './pages/profile/uploadAvatarModal.js';
import { updateUserData } from './utils/utils.js';
import { deleteUserModal } from './pages/chats/deleteUserModal.js';
import { deleteChatModal } from './pages/chats/deleteChatModal.js';
import { addUserModal } from './pages/chats/addUserModal.js';
import { addChatModal } from './pages/chats/addChatModal.js';
const router = new Router('.app')
    .use(Path.CHATS, [chats, deleteUserModal, deleteChatModal, addUserModal, addChatModal])
    .use(Path.PROFILE, [profile, uploadAvatarModal])
    .use(Path.SIGNIN, [signin])
    .use(Path.SIGNUP, [signup])
    .use(Path.INTERNAL_SERVER_ERROR, [internalServerErrorPage]);
const store = new Store();
// подписываем показ страницы в зависимости от изменения isLogged
store.subscribe('isLogged', (state) => {
    if (!state.isLogged) {
        router.go(Path.SIGNIN);
    }
    else {
        router.start();
    }
});
// при первой загрузке страницы проверяем - авторизованы ли мы в системе и если да - то обновлякем данные
updateUserData();
//# sourceMappingURL=app.js.map