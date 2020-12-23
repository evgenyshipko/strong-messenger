import { render } from '../renderDom.js';
class Route {
    constructor(pathname, _block, _rootQuery) {
        this._pathname = pathname;
        this._rootQuery = _rootQuery;
        this._block = _block;
    }
    leave() {
        if (this._block) {
            this._block.forEach((block) => {
                var _a;
                (_a = block.getContent()) === null || _a === void 0 ? void 0 : _a.forEach((element) => {
                    element.remove();
                });
            });
        }
    }
    match(pathname) {
        return pathname === this._pathname;
    }
    render() {
        render(this._rootQuery, this._block);
    }
}
export default Route;
//# sourceMappingURL=Route.js.map