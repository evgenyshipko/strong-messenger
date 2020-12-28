import Block from '../../components/Block.js';
import Button from '../../components/Button.js';
import { addUserModal } from './addUserModal.js';
import { deleteUserModal } from './deleteUserModal.js';
import { deleteChatModal } from './deleteChatModal.js';
export const actionsPopup = new Block({
    class: 'actions-popup',
    content: [
        new Button({
            class: 'actions-popup-btn',
            text: 'Добавить пользователя',
            iconClass: 'actions-popup-btn__icon icon-plus',
            eventData: {
                name: 'click',
                callback: () => {
                    addUserModal.show('flex');
                }
            }
        }),
        new Button({
            class: 'actions-popup-btn',
            text: 'Удалить пользователя',
            iconClass: 'actions-popup-btn__icon icon-minus',
            eventData: {
                name: 'click',
                callback: () => {
                    deleteUserModal.show('flex');
                }
            }
        }),
        new Button({
            class: 'actions-popup-btn',
            text: 'Удалить чат',
            iconClass: 'actions-popup-btn__icon icon-trash',
            eventData: {
                name: 'click',
                callback: () => {
                    deleteChatModal.show('flex');
                }
            }
        })
    ]
});
actionsPopup.hide();
//# sourceMappingURL=actionsPopup.js.map