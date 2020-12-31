import HTTPExecutor from '../../utils/httpExecutor/httpExecutor'
import Url, {ApiPath} from '../../constants/Url'
import {handleErrorResponse} from '../../utils/utils'
import {MessengerStore, UserProps} from '../../types/Types'
import Store from '../../utils/Store'
import {uploadAvatarModal} from './uploadAvatarModal'

/* global FormData */

class ProfileApi {
    logout() {
        new HTTPExecutor()
            .post(Url.generate(ApiPath.AUTH_LOGOUT), {
                credentials: true,
                headers: {
                    'Set-Cookie': 'expires=0'
                }
            })
            .then((_res) => {
                new Store<MessengerStore>().setState({ isLogged: false })
            })
            .catch(handleErrorResponse)
    }

    changeUserAvatar(formData: FormData) {
        new HTTPExecutor()
            .put(
                Url.generate(ApiPath.USER_AVATAR),
                {
                    data: formData,
                    credentials: true
                })
            .then((res) => {
                new Store().setState({ userProps: JSON.parse(res.response) as UserProps })
                window.alert('Аватар изменен успешно!')
                uploadAvatarModal.hide()
            })
            .catch(handleErrorResponse)
    }

    changeProfileData(formData: FormData) {
        this.sendFormData(Url.generate(ApiPath.USER_PROFILE), formData)
    }

    changeProfilePassword(formData: FormData) {
        this.sendFormData(Url.generate(ApiPath.USER_PASSWORD), formData)
    }

    sendFormData = (url: string, formData: FormData) => {
        new HTTPExecutor()
            .put(
                url,
                {
                    data: JSON.stringify(Object.fromEntries(formData)),
                    credentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Set-Cookie': 'expires=0'
                    }
                })
            .then((_res) => {
                window.alert('Данные изменены успешно!')
            })
            .catch(handleErrorResponse)
    }
}

export default ProfileApi
