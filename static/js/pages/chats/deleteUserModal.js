import Modal from '../../components/Modal.js';
import Header from '../../components/Header.js';
import Input from '../../components/Input.js';
import { InputName } from '../../utils/validator/InputValidator.js';
import Button from '../../components/Button.js';
import { chats } from './chats.js';
export const deleteUserModal = new Modal({
    modalClass: 'add-user-modal',
    backgroundClass: 'add-user-modal-shadow',
    content: [
        new Header({
            text: 'Удалить пользователя',
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
            text: 'Удалить',
            eventData: {
                name: 'click',
                callback: () => {
                    deleteUserModal.hide();
                    chats.show('flex');
                }
            }
        })
    ]
});
deleteUserModal.hide();
//# sourceMappingURL=deleteUserModal.js.map