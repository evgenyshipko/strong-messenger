import { StatusCode } from '../constants/StatusCode'
import Router from './router/Router'
import Path from '../constants/Path'
import { ErrorResponse } from './httpExecutor/httpExecutor'
import Store from './Store'

export const queryStringify = (data: Record<string, unknown>) => {
    let index = 0
    return Object.keys(data).reduce((acc, key) => {
        acc = acc + `${key}=${data[key]}`
        if (index !== Object.keys(data).length - 1) {
            acc = acc + '&'
        }
        index++
        return acc
    }, '?')
}

export const handleErrorResponse = (errorData: ErrorResponse) => {
    if (errorData.status === StatusCode.UNAUTHORIZED) {
        new Store().setState({ isLogged: false })
    } else if (errorData.status === StatusCode.INTERNAL_SERVER_ERROR) {
        new Router('.app').go(Path.INTERNAL_SERVER_ERROR)
    } else {
        window.alert(errorData.responseText)
    }
}
