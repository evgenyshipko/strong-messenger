import Button from '../../components/Button.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import Form from '../../components/Form.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import { InputName } from '../../utils/validator/InputValidator.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import ProfilePage from './ProfilePage.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import render from '../../utils/renderDom.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import FormInputLabeled from '../../components/FormInputLabeled.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import Modal from '../../components/Modal.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import Header from '../../components/Header.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import Avatar from '../../components/Avatar.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
const formId = 'profile-form';
// подготавливаем компоненты
const backToChatsButton = new Button({
    class: 'profile-back-btn',
    iconClass: 'profile-back-btn__icon'
});
const changePassBtn = new Button({
    class: 'messenger-button',
    text: 'Изменить пароль'
});
const logOutButton = new Button({
    class: 'profile-exit-btn messenger-button_no-background',
    text: 'Выйти'
});
const buttonListMain = [
    new Button({
        class: 'messenger-button',
        text: 'Изменить данные',
        type: 'submit',
        formId: formId
    }),
    changePassBtn,
    logOutButton
];
const formMain = new Form({
    id: formId,
    class: 'profile-form',
    formItemList: [
        new FormInputLabeled({
            type: 'text',
            inputName: InputName.EMAIL,
            class: 'profile-form-item__input',
            label: 'Почта',
            wrapperClass: 'profile-form-item'
        }),
        new FormInputLabeled({
            type: 'text',
            inputName: InputName.LOGIN,
            class: 'profile-form-item__input',
            label: 'Логин',
            wrapperClass: 'profile-form-item'
        }),
        new FormInputLabeled({
            type: 'text',
            inputName: InputName.FIRST_NAME,
            class: 'profile-form-item__input',
            label: 'Имя',
            wrapperClass: 'profile-form-item'
        }),
        new FormInputLabeled({
            type: 'text',
            inputName: InputName.SECOND_NAME,
            class: 'profile-form-item__input',
            label: 'Фамилия',
            wrapperClass: 'profile-form-item'
        }),
        new FormInputLabeled({
            type: 'text',
            inputName: InputName.DISPLAY_NAME,
            class: 'profile-form-item__input',
            label: 'Имя для отображения',
            wrapperClass: 'profile-form-item'
        }),
        new FormInputLabeled({
            type: 'text',
            inputName: InputName.PHONE,
            class: 'profile-form-item__input',
            label: 'Телефон',
            wrapperClass: 'profile-form-item'
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
        text: 'Отмена'
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
            class: 'profile-form-item__input',
            wrapperClass: 'profile-form-item'
        }),
        new FormInputLabeled({
            label: 'Новый пароль',
            type: 'password',
            inputName: InputName.NEW_PASSWORD,
            class: 'profile-form-item__input',
            wrapperClass: 'profile-form-item'
        }),
        new FormInputLabeled({
            label: 'Повторите новый пароль',
            type: 'password',
            inputName: InputName.NEW_PASSWORD_REPEAT,
            class: 'profile-form-item__input',
            wrapperClass: 'profile-form-item'
        })
    ]
});
const changeButton = new Button({
    text: 'Изменить',
    class: 'messenger-button upload-avatar-modal-change-btn',
    eventData: {
        name: 'click',
        callback: () => {
            profilePage.show('flex');
            modalWindow.hide();
        }
    }
});
const modalWindow = new Modal({
    backgroundClass: 'upload-avatar-modal-shadow',
    modalClass: 'upload-avatar-modal',
    content: [
        new Header({
            text: 'Загрузите файл',
            class: 'upload-avatar-modal-header'
        }),
        new Button({
            text: 'Выбрать файл на компьютере',
            class: 'upload-avatar-modal-browse-btn messenger-button_no-background'
        }),
        changeButton
    ]
});
const avatar = new Avatar({});
const profilePage = new ProfilePage({
    avatar: avatar,
    backButton: backToChatsButton,
    userName: 'Evgeny',
    form: formMain,
    buttonList: buttonListMain
});
// скрыли модальное окно
modalWindow.hide();
// вешаем валидацию на формы
formMain.addValidator();
formChangePassword.addValidator();
// вешаем на кнопку отображение формы изменения пароля
changePassBtn.addEventListener('click', () => {
    profilePage.setProps({
        form: formChangePassword,
        buttonList: buttonListChangePassword
    });
});
// вешаем на кнопку возврат на основную страницу профиля
buttonListChangePassword[1].addEventListener('click', () => {
    profilePage.setProps({
        form: formMain,
        buttonList: buttonListMain
    });
});
// вешаем появление модального окна на аватар
avatar.addEventListener('click', () => {
    profilePage.hide();
    modalWindow.show('flex');
});
// вешаем скрытие модального окна и возврат к основной странице на кнопку модала
// changeButton.addEventListener('click', () => {
//     profilePage.show('flex')
//     modalWindow.hide()
// })
// рисуем страницу
render(profilePage);
render(modalWindow);
//# sourceMappingURL=main.js.map
