
export enum ApiPath{
    AUTH_SIGNUP= '/auth/signup',
    AUTH_SIGNIN='/auth/signin',
    AUTH_USER='/auth/user',
    AUTH_LOGOUT='/auth/logout',
    USER_PROFILE='/user/profile',
    USER_AVATAR='/user/profile/avatar',
    USER_PASSWORD='/user/password',
}

class Url {
    private getApiUrl() {
        return 'https://ya-praktikum.tech/api/v2'
    }

    static generate(path: ApiPath) {
        return new Url().getApiUrl() + path
    }
}

export default Url
