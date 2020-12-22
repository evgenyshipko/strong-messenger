import Component from '../utils/Component'
import { EventData } from '../types/Types'

interface AvatarProps {
    eventData: EventData
    imageLink: string
}

class Avatar extends Component<AvatarProps> {
    template(): string {
        return `<div class="profile-avatar__content" @event={{eventData}}>
            <img class="profile-avatar__image" src={{imageLink}} />
            <span class="profile-avatar__text">Изменить аватар</span>
        </div>`
    }
}

export default Avatar
