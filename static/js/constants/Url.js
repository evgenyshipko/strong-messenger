export var ApiPath;
(function (ApiPath) {
    ApiPath["AUTH_SIGNUP"] = "/auth/signup";
    ApiPath["AUTH_SIGNIN"] = "/auth/signin";
    ApiPath["AUTH_USER"] = "/auth/user";
    ApiPath["AUTH_LOGOUT"] = "/auth/logout";
    ApiPath["USER_PROFILE"] = "/user/profile";
    ApiPath["USER_AVATAR"] = "/user/profile/avatar";
    ApiPath["USER_PASSWORD"] = "/user/password";
    ApiPath["CHATS"] = "/chats";
    ApiPath["CHATS_USERS"] = "/chats/users";
})(ApiPath || (ApiPath = {}));
class Url {
    static getHostUrl() {
        return 'https://ya-praktikum.tech';
    }
    static generate(path) {
        return Url.getHostUrl() + '/api/v2' + path;
    }
}
export default Url;
//# sourceMappingURL=Url.js.map