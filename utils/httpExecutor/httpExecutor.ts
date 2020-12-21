/* global XMLHttpRequest,ProgressEvent */

import { queryStringify } from '../utils'

enum Method {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

interface Options {
    data?: Record<string, unknown>,
    timeout?: number,
    method?: Method,
    headers?: Record<string, string>,
    credentials?: boolean
}

export interface ErrorResponse {
    status: number,
    message: string
}

class HTTPExecutor {
    get = (url: string, options: Options = {}) => {
        if (options.data) {
            url = url + queryStringify(options.data)
            console.log('url', url)
        }
        return this.request(url, { ...options, method: Method.GET }, options.timeout)
    };

    put = (url: string, options: Options = {}) => {
        return this.request(url, { ...options, method: Method.PUT }, options.timeout)
    };

    post = (url: string, options: Options = {}) => {
        return this.request(url, { ...options, method: Method.POST }, options.timeout)
    };

    delete = (url: string, options: Options = {}) => {
        return this.request(url, { ...options, method: Method.DELETE }, options.timeout)
    };

    request = (url: string, options: Options = { method: Method.GET }, timeout = 5000) => {
        const { method, data } = options

        return new Promise<XMLHttpRequest>((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.timeout = timeout

            if (options.headers) {
                Object.keys(options.headers).forEach((header) => {
                    xhr.setRequestHeader(header, options.headers![header])
                })
            }

            if (options.credentials) {
                xhr.withCredentials = true
            }

            xhr.open(method!, url)

            const rejectFunc = function(this: XMLHttpRequest, _ev?: ProgressEvent) {
                reject(JSON.stringify({
                    status: this.status,
                    message: this.statusText ? this.responseText : this.statusText
                }))
            }.bind(xhr)

            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    return resolve(xhr)
                } else {
                    return rejectFunc()
                }
            }

            xhr.onabort = rejectFunc
            xhr.onerror = rejectFunc
            xhr.ontimeout = rejectFunc

            if (method === Method.GET || !data) {
                xhr.send()
            } else {
                xhr.send(JSON.stringify(data))
            }
        })
    };
}

export default HTTPExecutor
