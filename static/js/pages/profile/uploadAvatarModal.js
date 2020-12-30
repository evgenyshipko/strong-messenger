import Modal from '../../components/modal/Modal.js';
import Header from '../../components/Header.js';
import Button from '../../components/Button.js';
import InputLabeled from '../../components/InputLabeled.js';
import ProfileApi from './profile.api.js';
/* global FormData, HTMLInputElement, Event */
const inputClass = 'upload-avatar-modal-browse-input';
const uploadAvatar = (_e) => {
    const input = document.getElementsByClassName(inputClass)[0];
    if (input.files && input.files.length > 0) {
        const formData = new FormData();
        formData.append('avatar', input.files[0]);
        formData.append('type', 'image/png');
        new ProfileApi().changeUserAvatar(formData);
    }
    else {
        window.alert('Выберите файл!');
    }
};
export const uploadAvatarModal = new Modal({
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