export var ApiPath;
(function (ApiPath) {
    ApiPath["SIGNUP"] = "/auth/signup";
    ApiPath["SIGNIN"] = "/auth/signin";
    ApiPath["USER"] = "/auth/user";
    ApiPath["LOGOUT"] = "/auth/logout";
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