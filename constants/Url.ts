
export enum ApiPath{
    SIGNUP= '/auth/signup',
    SIGNIN='/auth/signin',
    USER='/auth/user',
    LOGOUT='/auth/logout',
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
