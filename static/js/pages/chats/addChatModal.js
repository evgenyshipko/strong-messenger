import Modal from '../../components/modal/Modal.js';
import Header from '../../components/Header.js';
import Input from '../../components/Input.js';
import Button from '../../components/Button.js';
import ChatsApi from './chats.api.js';
/* global FormData, HTMLInputElement, Event */
const inputClass = 'add-chat-modal-input';
const createChat = (_e) => {
    const input = document.getElementsByClassName(inputClass)[0];
    const title = input.value;
    if (title && title !== '') {
        new ChatsApi()
            .create(title)
            .then(() => {
            addChatModal.hide();
        });
    }
    else {
        window.alert('Заполните имя чата!');
    }
};
export const addChatModal = new Modal({
    content: [
        new Header({
            text: 'Добавить чат',
            class: 'add-user-modal-header'
        }),
        new Input({
            placeholder: 'Название чата',
            class: inputClass,
            type: 'text',
            inputName: 'chat_name'
        }),
        new Button({
            class: 'messenger-button add-user-modal-change-btn',
            text: 'Добавить',
            eventData: {
                name: 'click',
                callback: createChat
            }
        })
    ]
});
addChatModal.hide();
//# sourceMappingURL=addChatModal.js.map