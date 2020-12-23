import Modal from '../../components/Modal.js';
import Header from '../../components/Header.js';
import Input from '../../components/Input.js';
import { InputName } from '../../utils/validator/InputValidator.js';
import Button from '../../components/Button.js';
import { chats } from "./chats.js";
export const addUserModal = new Modal({
    modalClass: 'add-user-modal',
    backgroundClass: 'add-user-modal-shadow',
    content: [
        new Header({
            text: 'Добавить пользователя',
            class: 'add-user-modal-header'
        }),
        new Input({
            placeholder: 'Логин',
            class: 'add-user-modal-input',
            type: 'text',
            inputName: InputName.LOGIN
        }),
        new Button({
            class: 'messenger-button add-user-modal-change-btn',
            text: 'Добавить',
            eventData: {
                name: 'click',
                callback: () => {
                    addUserModal.hide();
                    chats.show('flex');
                }
            }
        })
    ]
});
addUserModal.hide();
//# sourceMappingURL=addUserModal.js.map