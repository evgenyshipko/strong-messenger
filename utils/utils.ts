import { StatusCode } from '../constants/StatusCode'
import Router from './router/Router'
import Path from '../constants/Path'
import HTTPExecutor, { ErrorResponse } from './httpExecutor/httpExecutor'
import Store from './Store'
import Url, { ApiPath } from '../constants/Url'
import { ChatData, MessengerStore, UserProps } from '../types/Types'

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
    console.info('errorData', errorData)
}

export const updateUserData = () => {
    return new HTTPExecutor()
        .get(Url.generate(ApiPath.AUTH_USER), { credentials: true })
        .then((res) => {
            new Store<MessengerStore>().setState({ userProps: JSON.parse(res.response) as UserProps, isLogged: true })
            updateChatList()
        })
        .catch((err) => {
            const errorData = JSON.parse(err) as ErrorResponse
            handleErrorResponse(errorData)
        })
}

const updateChatList = () => {
    new HTTPExecutor()
        .get(Url.generate(ApiPath.CHATS), { credentials: true })
        .then((res) => {
            const chatList = JSON.parse(res.response) as ChatData[]
            console.log('Chats Updated Successfully', chatList)
            new Store<MessengerStore>().setState({ chatList: chatList })
        })
        .catch((err) => {
            console.log('err', err)
            const errorData = JSON.parse(err) as ErrorResponse
            handleErrorResponse(errorData)
        })
}
