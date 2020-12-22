import Message from '../../components/chats/Message.js';
export const messageItemList1 = [
    new Message({
        message: 'Проверка связи!',
        time: '9:10'
    }),
    new Message({
        message: 'Привеит!',
        time: '9:20',
        isIncoming: true
    })
];
export const messageItemList2 = [
    new Message({
        message: 'Привет, Как дела?',
        time: '10:30',
        isIncoming: true
    }),
    new Message({
        message: 'Cверстал страницу чатов для проекта яндекс-практикума! ' +
            'Учитывая, что никогда до этого раньше не верстал - результат кажется хорошим!',
        time: '10:31'
    }),
    new Message({
        message: 'Поздравляю!',
        time: '10:33',
        isIncoming: true
    }),
    new Message({
        message: 'Спасибо!',
        time: '10:34'
    })
];
//# sourceMappingURL=MessageMock.js.map