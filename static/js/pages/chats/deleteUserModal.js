import Modal from '../../components/Modal.js';
import Header from '../../components/Header.js';
import { InputName } from '../../utils/validator/InputValidator.js';
import Button from '../../components/Button.js';
import DropdownInput from '../../components/dropdown/DropdownInput.js';
import Option from '../../components/dropdown/Option.js';
import Store from '../../utils/Store.js';
import ChatsApi from './chats.api.js';
/* global HTMLInputElement, Event */
const updateChatUsersDropdownInput = (state) => {
    const userPropsList = state.currentChatUsers;
    if (userPropsList && userPropsList.length > 0) {
        const optionList = userPropsList.filter((userProps) => {
            // отфильтровываем себя из списка юзеров на удаление
            return userProps.login !== new Store().content.userProps.login;
        }).map((userProp) => {
            return new Option({
                label: userProp.login,
                value: userProp
            });
        });
        dropdownInput.setProps({ options: optionList });
    }
};
const updateChatUsers = (state) => {
    const chatId = state.currentChatId;
    if (chatId) {
        new ChatsApi().updateChatUsers(chatId);
    }
};
const store = new Store();
// список пользователей чата обновляем при каждом изменении currentChatId
store.subscribe('currentChatId', updateChatUsers);
store.subscribe('currentChatUsers', updateChatUsersDropdownInput);
const deleteUserFromChat = (_e) => {
    var _a;
    const userProp = (_a = dropdownInput.props.options.find((option) => {
        return option.props.value.login === dropdownInput.getContent()[0].value;
    })) === null || _a === void 0 ? void 0 : _a.props.value;
    if (userProp) {
        const chatId = store.content.currentChatId;
        if (chatId) {
            new ChatsApi().deleteUser(userProp.id, chatId)
                .then(() => {
                deleteUserModal.hide();
            });
        }
    }
    else {
        window.alert('Сначала выберите пользователя');
    }
};
const dropdownInput = new DropdownInput({
    id: 'delete-user-modal-dropdown',
    class: 'add-user-modal-input',
    type: 'text',
    name: InputName.LOGIN,
    options: [],
    autocomplete: 'off'
});
export const deleteUserModal = new Modal({
    modalClass: 'add-user-modal',
    backgroundClass: 'add-user-modal-shadow',
    content: [
        new Header({
            text: 'Удалить пользователя',
            class: 'add-user-modal-header'
        }),
        dropdownInput,
        new Button({
            class: 'messenger-button add-user-modal-change-btn',
            text: 'Удалить',
            eventData: {
                name: 'click',
                callback: deleteUserFromChat
            }
        })
    ]
});
deleteUserModal.hide();
//# sourceMappingURL=deleteUserModal.js.map