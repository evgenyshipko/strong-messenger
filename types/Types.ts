
/* global EventListenerOrEventListenerObject */

export type Nullable<T> = T | null

export type Context = Record<string, any>

export interface EventData {
    name: string,
    callback: EventListenerOrEventListenerObject
}
