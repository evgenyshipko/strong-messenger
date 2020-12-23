import Modal from '../../components/Modal.js';
import Header from '../../components/Header.js';
import Button from '../../components/Button.js';
import { chats } from './chats.js';
export const deleteChatModal = new Modal({
    modalClass: 'delete-chat-modal',
    backgroundClass: 'delete-chat-modal-shadow',
    content: [
        new Header({
            text: 'Вы действительно хотите удалить чат?',
            class: 'delete-chat-modal-header'
        }),
        new Button({
            class: 'messenger-button delete-chat-modal-delete-btn',
            text: 'Удалить'
        }),
        new Button({
            class: 'messenger-button_no-background delete-chat-modal-reject-btn',
            text: 'Отмена',
            eventData: {
                name: 'click',
                callback: () => {
                    deleteChatModal.hide();
                    chats.show('flex');
                }
            }
        })
    ]
});
deleteChatModal.hide();
//# sourceMappingURL=deleteChatModal.js.map