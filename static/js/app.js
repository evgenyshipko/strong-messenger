import Router from './utils/router/Router.js';
import { chats } from './pages/chats/chats.js';
import { profile } from './pages/profile/profile.js';
import Path from './constants/Path.js';
import { signin } from './pages/signin/signin.js';
import { signup } from './pages/signup/signup.js';
import Store from './utils/Store.js';
import { internalServerErrorPage } from './pages/error/500.js';
import AuthApi from './api/auth.api.js';
import { notFoundPage } from './pages/error/404.js';
const router = new Router('.app')
    .useNotFound(notFoundPage)
    .use(Path.CHATS, chats)
    .use(Path.PROFILE, profile)
    .use(Path.SIGNIN, signin)
    .use(Path.SIGNUP, signup)
    .use(Path.INTERNAL_SERVER_ERROR, internalServerErrorPage);
const store = new Store();
// подписываем показ страницы в зависимости от изменения isLogged
store.subscribe('isLogged', (state) => {
    if (state.isLogged === false) {
        router.go(Path.SIGNIN);
    }
    else {
        router.start();
    }
});
// при первой загрузке страницы проверяем - авторизованы ли мы в системе и если да - то обновляем данные пользователя
new AuthApi().updateUserData();
//# sourceMappingURL=app.js.map