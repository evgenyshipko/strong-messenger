export var ApiPath;
(function (ApiPath) {
    ApiPath["AUTH_SIGNUP"] = "/auth/signup";
    ApiPath["AUTH_SIGNIN"] = "/auth/signin";
    ApiPath["AUTH_USER"] = "/auth/user";
    ApiPath["AUTH_LOGOUT"] = "/auth/logout";
    ApiPath["USER_PROFILE"] = "/user/profile";
    ApiPath["USER_AVATAR"] = "/user/profile/avatar";
    ApiPath["USER_PASSWORD"] = "/user/password";
})(ApiPath || (ApiPath = {}));
class Url {
    getApiUrl() {
        return 'https://ya-praktikum.tech/api/v2';
    }
    static generate(path) {
        return new Url().getApiUrl() + path;
    }
}
export default Url;
//# sourceMappingURL=Url.js.map