
/* global EventListenerOrEventListenerObject */

export type Nullable<T> = T | null

export type Context = {[key: string]: any}

export interface EventData {
    name: string,
    callback: EventListenerOrEventListenerObject
}
