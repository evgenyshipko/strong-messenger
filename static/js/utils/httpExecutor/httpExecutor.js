/* global XMLHttpRequest,ProgressEvent,Document,Blob,FormData,ReadableStream */
import { queryStringify } from '../utils';
var Method;
(function (Method) {
    Method["GET"] = "GET";
    Method["PUT"] = "PUT";
    Method["POST"] = "POST";
    Method["DELETE"] = "DELETE";
})(Method || (Method = {}));
class HTTPExecutor {
    constructor() {
        this.get = (url, optionsGet = {}) => {
            if (optionsGet.data) {
                url = url + queryStringify(optionsGet.data);
            }
            const options = { ...optionsGet, data: undefined };
            return this.request(url, { ...options, method: Method.GET }, options.timeout);
        };
        this.put = (url, options = {}) => {
            return this.request(url, { ...options, method: Method.PUT }, options.timeout);
        };
        this.post = (url, options = {}) => {
            return this.request(url, { ...options, method: Method.POST }, options.timeout);
        };
        this.delete = (url, options = {}) => {
            return this.request(url, { ...options, method: Method.DELETE }, options.timeout);
        };
        this.request = (url, options = { method: Method.GET }, timeout = 5000) => {
            const { method, data } = options;
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open(method, url);
                xhr.timeout = timeout;
                if (options.credentials) {
                    xhr.withCredentials = true;
                }
                if (options.headers) {
                    Object.keys(options.headers).forEach((header) => {
                        xhr.setRequestHeader(header, options.headers[header]);
                    });
                }
                const rejectFunc = function (_ev) {
                    reject(JSON.stringify({
                        status: this.status,
                        response: this.response,
                        responseText: this.responseText,
                        statusText: this.statusText
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
                    xhr.send(data);
                }
            });
        };
    }
}
export default HTTPExecutor;
//# sourceMappingURL=httpExecutor.js.map