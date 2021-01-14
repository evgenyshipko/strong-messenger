/* global XMLHttpRequest,ProgressEvent,Document,Blob,FormData,ReadableStream */

import { queryStringify } from '../utils'

enum Method {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

interface Options {
    data?: string | Document | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream<Uint8Array> | null | undefined,
    timeout?: number,
    method?: Method,
    headers?: Record<string, string>,
    credentials?: boolean
}

type OptionsGet = Omit<Options, 'data'> & {
    data?: Record<string, any>
}

export interface ErrorResponse {
    status: number,
    response: any,
    responseText: string,
    statusText: string
}

class HTTPExecutor {
    get = (url: string, optionsGet: OptionsGet = {}) => {
        if (optionsGet.data) {
            url = url + queryStringify(optionsGet.data)
        }
        const options = { ...optionsGet } as Options
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

            xhr.open(method!, url)

            if (options.credentials) {
                xhr.withCredentials = true
            }

            if (options.headers) {
                Object.keys(options.headers).forEach((header) => {
                    xhr.setRequestHeader(header, options.headers![header])
                })
            }

            const rejectFunc = (_ev?: ProgressEvent) => {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject({
                    status: xhr.status,
                    response: xhr.response,
                    responseText: xhr.responseText,
                    statusText: xhr.statusText
                } as ErrorResponse)
            }

            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    return resolve(xhr)
                } else {
                    return rejectFunc()
                }
            }

            xhr.onabort = rejectFunc
            xhr.onerror = rejectFunc
            xhr.ontimeout = () => {
                return rejectFunc()
            }

            if (method === Method.GET || !data) {
                xhr.send()
            } else {
                xhr.send(data)
            }
        })
    };
}

export default HTTPExecutor
