import Modal from '../../components/Modal'
import Header from '../../components/Header'
import HTTPExecutor, { ErrorResponse } from '../../utils/httpExecutor/httpExecutor'
import Url, { ApiPath } from '../../constants/Url'
import { UserProps } from '../../types/Types'
import Button from '../../components/Button'
import Store from '../../utils/Store'
import { handleErrorResponse } from '../../utils/utils'
import InputLabeled from '../../components/InputLabeled'

/* global FormData, HTMLInputElement, Event */

const inputClass = 'upload-avatar-modal-browse-input'

const uploadAvatar = (_e: Event) => {
    const input = document.getElementsByClassName(inputClass)[0] as HTMLInputElement
    if (input.files && input.files.length > 0) {
        const formData = new FormData()
        formData.append('avatar', input.files[0])
        formData.append('type', 'image/png')
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
            .catch((error) => {
                const errorData = JSON.parse(error) as ErrorResponse
                handleErrorResponse(errorData)
            })
    } else {
        window.alert('Выберите файл!')
    }
}

export const uploadAvatarModal = new Modal({
    backgroundClass: 'upload-avatar-modal-shadow',
    modalClass: 'upload-avatar-modal',
    content: [
        new Header({
            text: 'Загрузите файл',
            class: 'upload-avatar-modal-header'
        }),
        new InputLabeled({
            inputName: 'uploadAvatar',
            inputId: 'uploadAvatar',
            labelText: 'Выбрать файл на компьютере',
            inputClass: inputClass,
            labelClass: 'upload-avatar-modal-browse-label',
            type: 'file'
        }),
        new Button({
            text: 'Изменить',
            class: 'messenger-button upload-avatar-modal-change-btn',
            eventData: {
                name: 'click',
                callback: uploadAvatar
            }
        })
    ]
})
uploadAvatarModal.hide()

