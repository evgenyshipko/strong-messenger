/* global XMLHttpRequest,ProgressEvent */
import { queryStringify } from '../utils.js';
var Method;
(function (Method) {
    Method["GET"] = "GET";
    Method["PUT"] = "PUT";
    Method["POST"] = "POST";
    Method["DELETE"] = "DELETE";
})(Method || (Method = {}));
class HTTPExecutor {
    constructor() {
        this.get = (url, options = {}) => {
            if (options.data) {
                url = url + queryStringify(options.data);
                console.log('url', url);
            }
            return this.request(url, Object.assign(Object.assign({}, options), { method: Method.GET }), options.timeout);
        };
        this.put = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: Method.PUT }), options.timeout);
        };
        this.post = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: Method.POST }), options.timeout);
        };
        this.delete = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: Method.DELETE }), options.timeout);
        };
        this.request = (url, options = { method: Method.GET }, timeout = 5000) => {
            const { method, data } = options;
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.timeout = timeout;
                if (options.headers) {
                    Object.keys(options.headers).forEach((header) => {
                        xhr.setRequestHeader(header, options.headers[header]);
                    });
                }
                if (options.credentials) {
                    xhr.withCredentials = true;
                }
                xhr.open(method, url);
                const rejectFunc = function (_ev) {
                    console.log('rejectFunc');
                    reject(JSON.stringify({
                        status: this.status,
                        message: this.statusText ? this.responseText : this.statusText
                    }));
                }.bind(xhr);
                xhr.onload = function () {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        return resolve(xhr);
                    }
                    else {
                        return rejectFunc();
                    }
                };
                xhr.onabort = rejectFunc;
                xhr.onerror = rejectFunc;
                xhr.ontimeout = rejectFunc;
                if (method === Method.GET || !data) {
                    xhr.send();
                }
                else {
                    xhr.send(JSON.stringify(data));
                }
            });
        };
    }
}
export default HTTPExecutor;
//# sourceMappingURL=httpExecutor.js.map