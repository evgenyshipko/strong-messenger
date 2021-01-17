
export enum ApiPath{
    AUTH_SIGNUP= '/auth/signup',
    AUTH_SIGNIN='/auth/signin',
    AUTH_USER='/auth/user',
    AUTH_LOGOUT='/auth/logout',
    USER_PROFILE='/user/profile',
    USER_AVATAR='/user/profile/avatar',
    USER_PASSWORD='/user/password',
    USER_SEARCH='/user/search',
    CHATS='/chats',
    CHATS_USERS='/chats/users',
    CHATS_TOKEN='/chats/token',
    CHATS_UNREAD_MESSAGES='/chats/new'
}

class Url {
    static getHostUrl() {
        return 'https://ya-praktikum.tech'
    }

    static buildFullApiUrl(path: ApiPath) {
        return Url.getHostUrl() + '/api/v2' + path
    }

    static getChatUsersUrl(chatId: number) {
        return `${Url.getHostUrl()}/api/v2/chats/${chatId}/users`
    }

    static getSocketApiUrl(userId: number, chatId: number, token: string) {
        return `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    }
}

export default Url
