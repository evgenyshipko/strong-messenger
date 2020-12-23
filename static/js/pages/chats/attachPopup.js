import Block from '../../components/Block.js';
import Button from '../../components/Button.js';
export const attachPopup = new Block({
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
attachPopup.hide();
//# sourceMappingURL=attachPopup.js.map