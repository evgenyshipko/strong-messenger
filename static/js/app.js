import Router from './utils/router/Router.js';
import { chats } from './pages/chats/chats.js';
import { profile } from './pages/profile/profile.js';
import Path from './constants/Path.js';
import { signin } from './pages/signin/signin.js';
import { signup } from './pages/signup/signup.js';
import HTTPExecutor from './utils/httpExecutor/httpExecutor.js';
import Url, { ApiPath } from './constants/Url.js';
import { StatusCode } from './constants/StatusCode.js';
import Store from './utils/Store.js';
const router = new Router('.app')
    .use(Path.CHATS, chats)
    .use(Path.PROFILE, profile)
    .use(Path.SIGNIN, signin)
    .use(Path.SIGNUP, signup);
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
// выполняем при первой загргузке страницы
new HTTPExecutor()
    .get(Url.generate(ApiPath.AUTH_USER), { credentials: true })
    .then((_res) => {
    store.setState({ userProps: JSON.parse(_res.response), isLogged: true });
})
    .catch((err) => {
    const errorData = JSON.parse(err);
    if (errorData.status === StatusCode.UNAUTHORIZED) {
        store.setState({ isLogged: false });
    }
});
//# sourceMappingURL=app.js.map