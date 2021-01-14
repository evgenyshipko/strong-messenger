
/* global EventListenerOrEventListenerObject */

import MessageDriver from '../utils/MessageDriver'

export type Nullable<T> = T | null

export type Context = Record<string, any>

export interface EventData {
    name: string,
    callback: EventListenerOrEventListenerObject
}

export interface UserProps{
    id: number,
    'first_name': string,
    'second_name': string,
    'display_name': string,
    login: string,
    email: string,
    phone: string,
    avatar: string
}

export interface ChatData {
    id: number,
    title: string,
    avatar: string
}

export type MessageData = {
    id: number,
    'user_id': number,
    'chat_id': number,
    time: string,
    content: string
}

export type MessageDataExcluded = Exclude<MessageData, 'chat_id' | 'user_id'> & {userId: number}

export interface ChatDataExtended extends ChatData{
    messageDriver: MessageDriver,
    userList: UserProps[],
    messageList: MessageDataExcluded[],
    unreadCount: number
}

export interface MessengerStore extends Record<string, unknown>{
    currentChatId?: number,
    userProps: UserProps,
    isLogged: boolean,
    chatList: ChatDataExtended[]
}
