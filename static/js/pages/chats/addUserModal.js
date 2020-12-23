import Modal from '../../components/Modal.js';
import Header from '../../components/Header.js';
import { InputName } from '../../utils/validator/InputValidator.js';
import Button from '../../components/Button.js';
import { chats } from './chats.js';
import DropdownInput from '../../components/dropdown/DropdownInput.js';
import HTTPExecutor from '../../utils/httpExecutor/httpExecutor.js';
import Url, { ApiPath } from '../../constants/Url.js';
import { handleErrorResponse } from '../../utils/utils.js';
import Option from '../../components/dropdown/Option.js';
import Store from '../../utils/Store.js';
/* global HTMLInputElement, Event */
const updateDropdownOptions = (e) => {
    const login = e.target.value;
    new HTTPExecutor()
        .post(Url.generate(ApiPath.USER_SEARCH), {
        credentials: true,
        data: JSON.stringify({ login: login }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
        const userPropsList = JSON.parse(res.response);
        if (userPropsList && userPropsList.length > 0) {
            const optionList = userPropsList.map((userProp) => {
                return new Option({
                    label: userProp.login,
                    value: userProp
                });
            });
            dropdownInput.setProps({ options: optionList, value: login });
        }
    })
        .catch((err) => {
        const errorData = JSON.parse(err);
        handleErrorResponse(errorData);
    });
};
const addUserToChat = (_e) => {
    var _a;
    const userProp = (_a = dropdownInput.props.options.find((option) => {
        return option.props.value.login === dropdownInput.props.value;
    })) === null || _a === void 0 ? void 0 : _a.props.value;
    if (userProp) {
        const login = userProp.login;
        const userId = userProp.id;
        const chatId = new Store().content.currentChatId;
        new HTTPExecutor()
            .put(Url.generate(ApiPath.CHATS_USERS), {
            credentials: true,
            data: JSON.stringify({ users: [userId], chatId: chatId }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((_res) => {
            console.log('ADD USER RESPONSE', _res);
            window.alert(`Пользователь ${login} добавлен успешно!`);
            addUserModal.hide();
            chats.show('flex');
        })
            .catch((err) => {
            const errorData = JSON.parse(err);
            handleErrorResponse(errorData);
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
    modalClass: 'add-user-modal',
    backgroundClass: 'add-user-modal-shadow',
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