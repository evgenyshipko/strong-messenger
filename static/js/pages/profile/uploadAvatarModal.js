import Modal from '../../components/Modal.js';
import Header from '../../components/Header.js';
import HTTPExecutor from '../../utils/httpExecutor/httpExecutor.js';
import Url, { ApiPath } from '../../constants/Url.js';
import Button from '../../components/Button.js';
import Store from '../../utils/Store.js';
import { handleErrorResponse } from '../../utils/utils.js';
import InputLabeled from '../../components/InputLabeled.js';
/* global FormData, HTMLInputElement, Event */
const inputClass = 'upload-avatar-modal-browse-input';
const uploadAvatar = (_e) => {
    const input = document.getElementsByClassName(inputClass)[0];
    if (input.files && input.files.length > 0) {
        const formData = new FormData();
        formData.append('avatar', input.files[0]);
        formData.append('type', 'image/png');
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
            .catch((error) => {
            const errorData = JSON.parse(error);
            handleErrorResponse(errorData);
        });
    }
    else {
        window.alert('Выберите файл!');
    }
};
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
});
uploadAvatarModal.hide();
//# sourceMappingURL=uploadAvatarModal.js.map