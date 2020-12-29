import HTTPExecutor from '../../utils/httpExecutor/httpExecutor.js';
import Url, { ApiPath } from '../../constants/Url.js';
import { handleErrorResponse } from '../../utils/utils.js';
import Store from '../../utils/Store.js';
import { uploadAvatarModal } from './uploadAvatarModal.js';
/* global FormData */
class ProfileApi {
    constructor() {
        this.sendFormData = (url, formData) => {
            new HTTPExecutor()
                .put(url, {
                data: JSON.stringify(Object.fromEntries(formData)),
                credentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Set-Cookie': 'expires=0'
                }
            })
                .then((_res) => {
                window.alert('Данные изменены успешно!');
            })
                .catch(handleErrorResponse);
        };
    }
    logout() {
        new HTTPExecutor()
            .post(Url.generate(ApiPath.AUTH_LOGOUT), {
            credentials: true,
            headers: {
                'Set-Cookie': 'expires=0'
            }
        })
            .then((_res) => {
            new Store().setState({ isLogged: false });
        })
            .catch(handleErrorResponse);
    }
    changeUserAvatar(formData) {
        new HTTPExecutor()
            .put(Url.generate(ApiPath.USER_AVATAR), {
            data: formData,
            credentials: true
        })
            .then((res) => {
            new Store().setState({ userProps: JSON.parse(res.response) });
            window.alert('Аватар изменен успешно!');
            uploadAvatarModal.hide();
        })
            .catch(handleErrorResponse);
    }
    changeProfileData(formData) {
        this.sendFormData(Url.generate(ApiPath.USER_PROFILE), formData);
    }
    changeProfilePassword(formData) {
        this.sendFormData(Url.generate(ApiPath.USER_PASSWORD), formData);
    }
}
export default ProfileApi;
//# sourceMappingURL=profile.api.js.map