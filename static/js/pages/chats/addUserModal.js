import Modal from '../../components/modal/Modal.js';
import Header from '../../components/Header.js';
import { InputName } from '../../utils/validator/InputValidator.js';
import Button from '../../components/Button.js';
import DropdownInput from '../../components/dropdown/DropdownInput.js';
import Store from '../../utils/Store.js';
import ChatsApi from './chats.api.js';
/* global HTMLInputElement, Event */
// опции апдейтятся с задержкой, чтобы при каждом нажатии не отправлялся запрос на сервер
let delayTimer;
const updateDropdownOptions = (e) => {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(function () {
        const login = e.target.value;
        new ChatsApi().updateSearchUserDropdownInput(login, dropdownInput);
    }, 1000);
};
const addUserToChat = (_e) => {
    var _a;
    const userProp = (_a = dropdownInput.props.options.find((option) => {
        return option.props.value.login === dropdownInput.props.value;
    })) === null || _a === void 0 ? void 0 : _a.props.value;
    const chatId = new Store().content.currentChatId;
    if (userProp && chatId) {
        new ChatsApi().addUser(userProp.id, chatId)
            .then(() => {
            window.alert('Пользователь добавлен успешно!');
            addUserModal.hide();
        });
    }
};
const dropdownInput = new DropdownInput({
    id: 'add-user-modal-dropdown',
    class: 'add-user-modal-input',
    type: 'text',
    name: InputName.LOGIN,
    options: [],
    autocomplete: 'off',
    eventData: {
        name: 'keyup',
        callback: updateDropdownOptions
    }
});
export const addUserModal = new Modal({
    content: [
        new Header({
            text: 'Добавить пользователя',
            class: 'add-user-modal-header'
        }),
        dropdownInput,
        new Button({
            class: 'messenger-button add-user-modal-change-btn',
            text: 'Добавить',
            eventData: {
                name: 'click',
                callback: addUserToChat
            }
        })
    ]
});
addUserModal.hide();
//# sourceMappingURL=addUserModal.js.map