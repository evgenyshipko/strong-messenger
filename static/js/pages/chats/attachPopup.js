import Block from '../../components/Block.js';
import Button from '../../components/Button.js';
export const attachPopup = new Block({
    class: 'attach-popup',
    content: [
        new Button({
            class: 'attach-popup-btn',
            text: 'Файл',
            iconClass: 'attach-popup-btn__icon file-icon'
        }),
        new Button({
            class: 'attach-popup-btn',
            text: 'Фото или видео',
            iconClass: 'attach-popup-btn__icon camera-icon'
        })
    ]
});
attachPopup.hide();
//# sourceMappingURL=attachPopup.js.map