import Modal from '../../components/Modal.js';
import Header from '../../components/Header.js';
import Input from '../../components/Input.js';
import Button from '../../components/Button.js';
import { chats } from './chats.js';
import HTTPExecutor from '../../utils/httpExecutor/httpExecutor.js';
import Url, { ApiPath } from '../../constants/Url.js';
import Store from '../../utils/Store.js';
import { handleErrorResponse } from '../../utils/utils.js';
/* global FormData, HTMLInputElement, Event */
const inputClass = 'add-chat-modal-input';
const createChat = (_e) => {
    const input = document.getElementsByClassName(inputClass)[0];
    const title = input.value;
    if (title && title !== '') {
        new HTTPExecutor()
            .post(Url.generate(ApiPath.CHATS), {
            data: JSON.stringify({ title: input.value }),
            credentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
            const response = JSON.parse(res.response);
            const store = new Store();
            const chatList = store.content.chatList;
            chatList.push({ id: response.id, title: title, avatar: '' });
            store.setState({ chatList: chatList });
            addChatModal.hide();
            chats.show('flex');
        })
            .catch((error) => {
            const errorData = JSON.parse(error);
            handleErrorResponse(errorData);
        });
    }
    else {
        window.alert('Заполните имя чата!');
    }
};
export const addChatModal = new Modal({
    modalClass: 'add-user-modal',
    backgroundClass: 'add-user-modal-shadow',
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