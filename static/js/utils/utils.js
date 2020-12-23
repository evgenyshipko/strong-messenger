import { StatusCode } from '../constants/StatusCode.js';
import Router from './router/Router.js';
import Path from '../constants/Path.js';
import HTTPExecutor from './httpExecutor/httpExecutor.js';
import Store from './Store.js';
import Url, { ApiPath } from '../constants/Url.js';
export const queryStringify = (data) => {
    let index = 0;
    return Object.keys(data).reduce((acc, key) => {
        acc = acc + `${key}=${data[key]}`;
        if (index !== Object.keys(data).length - 1) {
            acc = acc + '&';
        }
        index++;
        return acc;
    }, '?');
};
export const handleErrorResponse = (errorData) => {
    if (errorData.status === StatusCode.UNAUTHORIZED) {
        new Store().setState({ isLogged: false });
    }
    else if (errorData.status === StatusCode.INTERNAL_SERVER_ERROR) {
        new Router('.app').go(Path.INTERNAL_SERVER_ERROR);
    }
    else {
        window.alert(errorData.responseText);
    }
    console.info('errorData', errorData);
};
export const updateUserData = () => {
    return new HTTPExecutor()
        .get(Url.generate(ApiPath.AUTH_USER), { credentials: true })
        .then((res) => {
        new Store().setState({ userProps: JSON.parse(res.response), isLogged: true });
        updateChatList();
    })
        .catch((err) => {
        const errorData = JSON.parse(err);
        handleErrorResponse(errorData);
    });
};
const updateChatList = () => {
    new HTTPExecutor()
        .get(Url.generate(ApiPath.CHATS), { credentials: true })
        .then((res) => {
        const chatList = JSON.parse(res.response);
        console.log('Chats Updated Successfully', chatList);
        new Store().setState({ chatList: chatList });
    })
        .catch((err) => {
        console.log('err', err);
        const errorData = JSON.parse(err);
        handleErrorResponse(errorData);
    });
};
//# sourceMappingURL=utils.js.map