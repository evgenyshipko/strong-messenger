import { StatusCode } from '../constants/StatusCode.js';
import Router from './router/Router.js';
import Path from '../constants/Path.js';
import Store from './Store.js';
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
};
//# sourceMappingURL=utils.js.map