import Router from './utils/router/Router.js';
import { chats } from './pages/chats/chats.js';
import { profile } from './pages/profile/profile.js';
import Path from './constants/Path.js';
import { signin } from './pages/signin/signin.js';
import { signup } from './pages/signup/signup.js';
const router = new Router('.app');
router
    .use(Path.CHATS, chats)
    .use(Path.PROFILE, profile)
    .use(Path.SIGNIN, signin)
    .use(Path.SIGNUP, signup)
    .start();
//# sourceMappingURL=app.js.map