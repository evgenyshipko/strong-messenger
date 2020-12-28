import Component from '../../utils/Component'
import Button from '../Button'
import Form from '../Form'
import Avatar from '../Avatar'
import Modal from "../Modal";

interface ProfilePageProps {
    avatar: Avatar,
    backButton: Button,
    userName: string,
    form: Form,
    buttonList: Button[],
    uploadAvatarModal: Modal
}

class ProfilePage extends Component<ProfilePageProps> {
    template(): string {
        return `
        <div class="profile">
            <div class="profile-left-block">{{backButton}}</div>
            <div class="profile-center-block">
              <div class="profile-header">
                <div class="profile-avatar">
                   {{avatar}}
                </div>
                <span class="profile-user-name">{{userName}}</span>
              </div>
              <div class="profile-form-block">
                <div class="profile-form-wrapper">
                  {{form}}
                </div>
              </div>
              <div class="profile-button-block">
                {{buttonList}}
              </div>
            </div>
            <div class="profile-right-empty-block"></div>
          </div>
          <div>{{uploadAvatarModal}}</div>
        `
    }
}

export default ProfilePage
