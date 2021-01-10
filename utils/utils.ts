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

type PlainObject<T = unknown> = Record<string, T>

export function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value)
}

export function isObject(value: unknown): value is PlainObject {
    return typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]'
}

export function isEqual(lhs: PlainObject | unknown[], rhs: PlainObject | unknown[]): boolean {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false
    }
    for (const [key, value] of Object.entries(lhs)) {
        let rightValue
        if (isArray(rhs)) {
            rightValue = rhs[Number.parseInt(key)]
        } else {
            rightValue = (rhs as PlainObject)[key]
        }
        if (typeof value === 'function' && typeof rightValue === 'function') {
            if (value.toString() === rightValue.toString()) {
                continue
            }
            return false
        } else if ((isArray(value) && isArray(rightValue)) || (isObject(value) && isObject(rightValue))) {
            if (isEqual(value, rightValue)) {
                continue
            }
            return false
        } else if (Number.isNaN(value) && Number.isNaN(rightValue)) {
            continue
        }
        if (value !== rightValue) {
            return false
        }
    }
    return true
}

export function convertDateToTime(time: string) {
    const timestamp = Date.parse(time)
    const date = new Date(timestamp)
    let hours = date.getHours().toString()
    if (hours.length === 1) {
        hours = `0${hours}`
    }
    let minutes = date.getMinutes().toString()
    if (minutes.length === 1) {
        minutes = `0${minutes}`
    }
    return `${hours}:${minutes}`
}
