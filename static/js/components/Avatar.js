import Component from '../utils/Component.js';
class Avatar extends Component {
    template() {
        return `<div class="profile-avatar__content" @event={{eventData}}>
            <img class="profile-avatar__image" src={{imageLink}} />
            <span class="profile-avatar__text">Изменить аватар</span>
        </div>`;
    }
}
export default Avatar;
//# sourceMappingURL=Avatar.js.map