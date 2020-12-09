import Button from '../../components/Button.js';
import Input from '../../components/Input.js';
import Chat from '../../components/chats/Chat.js';
import ChatHeader from '../../components/chats/ChatHeader.js';
import MessageList from '../../components/chats/MessageList.js';
import ChatsPage from './ChatsPage.js';
import ChatList from '../../components/chats/ChatList.js';
import render from '../../utils/renderDom.js';
import { messageItemList1, messageItemList2 } from './MessageMock.js';
import Modal from '../../components/Modal.js';
import Header from '../../components/Header.js';
import { InputName } from '../../utils/validator/InputValidator.js';
import Block from '../../components/Block.js';
// создаем модальные окна и попапы
const addUserModal = new Modal({
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
                    chatsPage.show('flex');
                }
            }
        })
    ]
});
const deleteUserModal = new Modal({
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
                    chatsPage.show('flex');
                }
            }
        })
    ]
});
const attachPopup = new Block({
    class: 'attach-popup',
    content: [
        new Button({
            class: 'attach-popup-btn',
            text: 'Файл',
            iconClass: 'attach-popup-btn__icon icon-file'
        }),
        new Button({
            class: 'attach-popup-btn',
            text: 'Фото или видео',
            iconClass: 'attach-popup-btn__icon icon-photo'
        })
    ]
});
const actionsPopup = new Block({
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
                    chatsPage.hide();
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
                    chatsPage.hide();
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
                    chatsPage.hide();
                }
            }
        })
    ]
});
const deleteChatModal = new Modal({
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
                    chatsPage.show('flex');
                }
            }
        })
    ]
});
// создаем внутренние компоненты для компоненты-страницы CreatePage
const functionsBlockComponents = [
    new Button({
        text: 'Профиль',
        class: 'chats-profile-btn',
        eventData: {
            name: 'click',
            callback: () => {
                document.location.assign('../profile/profile.html');
            }
        }
    }),
    new Input({
        inputName: 'search',
        placeholder: 'Поиск',
        type: 'text',
        class: 'chats-search-input'
    })
];
const chatItemList = [
    new Chat({
        chatName: 'Вася',
        messageList: messageItemList1,
        eventData: {
            name: 'click',
            callback: () => {
                messageList.setProps({
                    messageItemList: messageItemList1
                });
                chatHeader.setProps({
                    chatName: 'Вася'
                });
                chatsPage.setProps({
                    chatHeader: chatHeader
                });
            }
        }
    }),
    new Chat({
        chatName: 'Анна',
        unreadQuantity: 1,
        messageList: messageItemList2,
        eventData: {
            name: 'click',
            callback: () => {
                messageList.setProps({
                    messageItemList: messageItemList2
                });
                chatHeader.setProps({
                    chatName: 'Анна'
                });
                chatsPage.setProps({
                    chatHeader: chatHeader
                });
            }
        }
    })
];
const chatHeader = new ChatHeader({
    chatName: 'chat',
    actionsBtn: new Button({
        class: 'chats-head-btn',
        iconClass: 'chats-head-btn__icon',
        eventData: {
            name: 'click',
            callback: () => {
                const content = actionsPopup.getContent();
                if (content && content[0]) {
                    if (content[0].style.display === 'none') {
                        actionsPopup.show('flex');
                    }
                    else {
                        actionsPopup.hide();
                    }
                }
            }
        }
    })
});
const messageList = new MessageList({
    messageItemList: []
});
const footerComponents = [
    new Button({
        class: 'chats-footer-attach-btn',
        eventData: {
            name: 'click',
            callback: () => {
                const content = attachPopup.getContent();
                if (content && content[0]) {
                    if (content[0].style.display === 'none') {
                        attachPopup.show('flex');
                    }
                    else {
                        attachPopup.hide();
                    }
                }
            }
        }
    }),
    new Input({
        type: 'text',
        inputName: 'send-message',
        class: 'chats-footer-input',
        placeholder: 'Сообщение'
    }),
    new Button({
        class: 'chats-footer-send-btn'
    })
];
const chatsPage = new ChatsPage({
    functionsBlockComponents: functionsBlockComponents,
    footerComponents: footerComponents,
    chatList: new ChatList({
        chatItemList: chatItemList
    }),
    messageBlockComponents: [attachPopup, actionsPopup, messageList],
    chatHeader: new Block({ class: '', content: '' })
});
attachPopup.hide();
actionsPopup.hide();
addUserModal.hide();
deleteChatModal.hide();
deleteUserModal.hide();
render(chatsPage);
render(addUserModal);
render(deleteChatModal);
render(deleteUserModal);
//# sourceMappingURL=chats.js.map