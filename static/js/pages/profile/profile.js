import Button from '../../components/Button.js';
import Form from '../../components/Form.js';
import { InputName } from '../../utils/validator/InputValidator.js';
import ProfilePage from './ProfilePage.js';
import render from '../../utils/renderDom.js';
import FormInputLabeled from '../../components/FormInputLabeled.js';
import Modal from '../../components/Modal.js';
import Header from '../../components/Header.js';
import Avatar from '../../components/Avatar.js';
import Path from '../../constants/Path.js';
import Router from '../../utils/router/Router.js';
import HTTPExecutor from '../../utils/httpExecutor/httpExecutor.js';
import Url, { ApiPath } from '../../constants/Url.js';
import Store from '../../utils/Store.js';
import Input from "../../components/Input.js";
/* global FormData */
const formId = 'profile-form';
const inputClass = 'profile-form-item__input';
const inputWrapperClass = 'profile-form-item';
const buttonListMain = [
    new Button({
        class: 'messenger-button',
        text: 'Изменить данные',
        type: 'submit',
        formId: formId
    }),
    new Button({
        class: 'messenger-button',
        text: 'Изменить пароль',
        eventData: {
            name: 'click',
            callback: () => {
                // вешаем на кнопку отображение формы изменения пароля
                profile.setProps({
                    form: formChangePassword,
                    buttonList: buttonListChangePassword
                });
            }
        }
    }),
    new Button({
        class: 'profile-exit-btn messenger-button_no-background',
        text: 'Выйти',
        eventData: {
            name: 'click',
            callback: () => {
                new HTTPExecutor()
                    .post(Url.generate(ApiPath.AUTH_LOGOUT), { credentials: true })
                    .then((_res) => {
                    store.setState({ isLogged: false });
                });
            }
        }
    })
];
const formMain = new Form({
    id: formId,
    class: 'profile-form',
    formItemList: [
        new FormInputLabeled({
            type: 'text',
            inputName: InputName.EMAIL,
            class: inputClass,
            label: 'Почта',
            wrapperClass: inputWrapperClass
        }),
        new FormInputLabeled({
            type: 'text',
            inputName: InputName.LOGIN,
            class: inputClass,
            label: 'Логин',
            wrapperClass: inputWrapperClass
        }),
        new FormInputLabeled({
            type: 'text',
            inputName: InputName.FIRST_NAME,
            class: inputClass,
            label: 'Имя',
            wrapperClass: inputWrapperClass,
            value: 'test'
        }),
        new FormInputLabeled({
            type: 'text',
            inputName: InputName.SECOND_NAME,
            class: inputClass,
            label: 'Фамилия',
            wrapperClass: inputWrapperClass,
            value: 'yryr'
        }),
        new FormInputLabeled({
            type: 'text',
            inputName: InputName.DISPLAY_NAME,
            class: inputClass,
            label: 'Имя для отображения',
            wrapperClass: inputWrapperClass
        }),
        new FormInputLabeled({
            type: 'text',
            inputName: InputName.PHONE,
            class: inputClass,
            label: 'Телефон',
            wrapperClass: inputWrapperClass
        })
    ]
});
const buttonListChangePassword = [
    new Button({
        class: 'messenger-button',
        text: 'Сохранить',
        type: 'submit',
        formId: formId
    }),
    new Button({
        class: 'profile-exit-btn messenger-button_no-background',
        text: 'Отмена',
        eventData: {
            name: 'click',
            callback: () => {
                profile.setProps({
                    form: formMain,
                    buttonList: buttonListMain
                });
            }
        }
    })
];
const formChangePassword = new Form({
    id: formId,
    class: 'profile-form',
    formItemList: [
        new FormInputLabeled({
            label: 'Старый пароль',
            type: 'password',
            inputName: InputName.OLD_PASSWORD,
            class: inputClass,
            wrapperClass: inputWrapperClass
        }),
        new FormInputLabeled({
            label: 'Новый пароль',
            type: 'password',
            inputName: InputName.NEW_PASSWORD,
            class: inputClass,
            wrapperClass: inputWrapperClass
        }),
        new FormInputLabeled({
            label: 'Повторите новый пароль',
            type: 'password',
            inputName: InputName.NEW_PASSWORD_REPEAT,
            class: inputClass,
            wrapperClass: inputWrapperClass
        })
    ]
});
const modalWindow = new Modal({
    backgroundClass: 'upload-avatar-modal-shadow',
    modalClass: 'upload-avatar-modal',
    content: [
        new Header({
            text: 'Загрузите файл',
            class: 'upload-avatar-modal-header'
        }),
        new Input({
            inputName: 'uploadAvatar',
            placeholder: 'Выбрать файл на компьютере',
            class: 'upload-avatar-modal-browse-btn messenger-button_no-background',
            type: 'file',
            eventData: {
                name: 'change',
                callback: () => {
                    console.log('INPUT FILE CALLBACK', this);
                }
            }
        }),
        new Button({
            text: 'Изменить',
            class: 'messenger-button upload-avatar-modal-change-btn',
            eventData: {
                name: 'click',
                callback: () => {
                    profile.show('flex');
                    modalWindow.hide();
                }
            }
        })
    ]
});
export const profile = new ProfilePage({
    avatar: new Avatar({
        eventData: {
            name: 'click',
            callback: () => {
                profile.hide();
                modalWindow.show('flex');
            }
        },
        imageLink: 'https://ya-praktikum.tech/api/v2/uploads/1be8ee35-4bdd-48b7-ab9d-c5fb586198d1/arrow1.png'
    }),
    backButton: new Button({
        class: 'profile-back-btn',
        iconClass: 'profile-back-btn__icon',
        eventData: {
            name: 'click',
            callback: () => {
                new Router('.app').go(Path.CHATS);
            }
        }
    }),
    userName: '',
    form: formMain,
    buttonList: buttonListMain
});
// скрыли и вставили в dom модальное окно
modalWindow.hide();
render(modalWindow);
const sendFormData = (url) => {
    return (formData) => {
        new HTTPExecutor()
            .put(url, {
            data: JSON.stringify(Object.fromEntries(formData)),
            credentials: true,
            headers: { 'Content-Type': 'application/json' }
        })
            .then((_res) => {
            window.alert('Данные изменены успешно!');
        })
            .catch((error) => {
            const errorData = JSON.parse(error);
            window.alert(errorData.responseText);
        });
    };
};
// вешаем валидацию на формы
formChangePassword.addValidator(sendFormData(Url.generate(ApiPath.USER_PASSWORD)));
formMain.addValidator(sendFormData(Url.generate(ApiPath.USER_PROFILE)));
const updateFormValues = (_state) => {
    const elemList = formMain.getContent();
    if (elemList && elemList.length > 0) {
        const form = elemList[0];
        const inputList = form.getElementsByTagName('input');
        for (const input of inputList) {
            const inputName = input.getAttribute('name');
            const value = store.content.userProps[inputName];
            if (inputName && value) {
                input.setAttribute('value', value);
            }
        }
    }
};
// подписались на изменения стейта глобального стора
const store = new Store();
store.subscribe('userProps', updateFormValues);
store.subscribe('userProps', (state) => {
    profile.setProps({ userName: state.userProps.first_name });
});
store.subscribe('userProps', (state) => {
    if (state.userProps.avatar) {
        profile.props.avatar.setProps({ imageLink: state.userProps.avatar });
    }
});
//# sourceMappingURL=profile.js.map