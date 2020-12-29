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
export function isArray(value) {
    return Array.isArray(value);
}
export function isObject(value) {
    return typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]';
}
export function isEqual(lhs, rhs) {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }
    for (const [key, value] of Object.entries(lhs)) {
        let rightValue;
        if (isArray(rhs)) {
            rightValue = rhs[Number.parseInt(key)];
        }
        else {
            rightValue = rhs[key];
        }
        if (typeof value === 'function' && typeof rightValue === 'function') {
            if (value.toString() === rightValue.toString()) {
                continue;
            }
            return false;
        }
        else if ((isArray(value) && isArray(rightValue)) || (isObject(value) && isObject(rightValue))) {
            if (isEqual(value, rightValue)) {
                continue;
            }
            return false;
        }
        else if (Number.isNaN(value) && Number.isNaN(rightValue)) {
            continue;
        }
        if (value !== rightValue) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=utils.js.map