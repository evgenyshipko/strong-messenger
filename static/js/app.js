import Router from './utils/router/Router.js';
import { chats } from './pages/chats/chats.js';
import { profile } from './pages/profile/profile.js';
import Path from './constants/Path.js';
import { signin } from './pages/signin/signin.js';
import { signup } from './pages/signup/signup.js';
import HTTPExecutor from './utils/httpExecutor/httpExecutor.js';
import Url, { ApiPath } from './constants/Url.js';
import { StatusCode } from './constants/StatusCode.js';
const router = new Router('.app')
    .use(Path.CHATS, chats)
    .use(Path.PROFILE, profile)
    .use(Path.SIGNIN, signin)
    .use(Path.SIGNUP, signup);
new HTTPExecutor()
    .get(Url.generate(ApiPath.USER), { credentials: true })
    .then((res) => {
    console.log('response', res);
    router.start();
})
    .catch((err) => {
    const errorData = JSON.parse(err);
    console.log('errorData', errorData);
    if (errorData.status === StatusCode.UNAUTHORIZED) {
        router.start(Path.SIGNIN);
    }
});
//# sourceMappingURL=app.js.map