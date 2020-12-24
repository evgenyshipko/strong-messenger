import HTTPExecutor from '../../utils/httpExecutor/httpExecutor.js';
import Url, { ApiPath } from '../../constants/Url.js';
import Store from '../../utils/Store.js';
import { chats } from './chats.js';
import { handleErrorResponse } from '../../utils/utils.js';
import { addChatModal } from './addChatModal.js';
import { addUserModal } from './addUserModal.js';
import Option from '../../components/dropdown/Option.js';
import { deleteUserModal } from './deleteUserModal.js';
class ChatsApi {
    create(title) {
        new HTTPExecutor()
            .post(Url.generate(ApiPath.CHATS), {
            data: JSON.stringify({ title: title }),
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
    updateChatsList() {
        new HTTPExecutor()
            .get(Url.generate(ApiPath.CHATS), { credentials: true })
            .then((res) => {
            const chatList = JSON.parse(res.response);
            new Store().setState({ chatList: chatList });
        })
            .catch((err) => {
            const errorData = JSON.parse(err);
            handleErrorResponse(errorData);
        });
    }
    addUser(userId, chatId) {
        new HTTPExecutor()
            .put(Url.generate(ApiPath.CHATS_USERS), {
            credentials: true,
            data: JSON.stringify({ users: [userId], chatId: chatId }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((_res) => {
            window.alert('Пользователь добавлен успешно!');
            addUserModal.hide();
            chats.show('flex');
            this.updateChatUsers(chatId);
        })
            .catch((err) => {
            const errorData = JSON.parse(err);
            handleErrorResponse(errorData);
        });
    }
    deleteUser(userId, chatId) {
        new HTTPExecutor()
            .delete(Url.generate(ApiPath.CHATS_USERS), {
            credentials: true,
            data: JSON.stringify({ users: [userId], chatId: chatId }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((_res) => {
            window.alert('Пользователь удален успешно!');
            deleteUserModal.hide();
            chats.show('flex');
            this.updateChatUsers(chatId);
        })
            .catch((err) => {
            const errorData = JSON.parse(err);
            handleErrorResponse(errorData);
        });
    }
    updateChatUsers(chatId) {
        new HTTPExecutor()
            .get(Url.getChatUsersUrl(chatId), { credentials: true })
            .then((res) => {
            const userPropsList = JSON.parse(res.response);
            if (userPropsList && userPropsList.length > 0) {
                new Store().setState({ currentChatUsers: userPropsList });
            }
        })
            .catch((err) => {
            const errorData = JSON.parse(err);
            handleErrorResponse(errorData);
        });
    }
    updateSearchUserDropdownInput(login, dropdownInput) {
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
    }
}
export default ChatsApi;
//# sourceMappingURL=chats.api.js.map