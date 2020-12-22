import Router from './utils/router/Router';
import { chats } from './pages/chats/chats';
import { profile } from './pages/profile/profile';
import Path from './constants/Path';
import { signin } from './pages/signin/signin';
import { signup } from './pages/signup/signup';
import HTTPExecutor from './utils/httpExecutor/httpExecutor';
import Url, { ApiPath } from './constants/Url';
import { StatusCode } from './constants/StatusCode';
import Store from "./store/Store";
const router = new Router('.app')
    .use(Path.CHATS, chats)
    .use(Path.PROFILE, profile)
    .use(Path.SIGNIN, signin)
    .use(Path.SIGNUP, signup);
new HTTPExecutor()
    .get(Url.generate(ApiPath.AUTH_USER), { credentials: true })
    .then((_res) => {
    Store.userProps = JSON.parse(_res.response);
    console.log('user data', Store.userProps);
    router.start();
})
    .catch((err) => {
    const errorData = JSON.parse(err);
    if (errorData.status === StatusCode.UNAUTHORIZED) {
        router.start(Path.SIGNIN);
    }
});
//# sourceMappingURL=app.js.map