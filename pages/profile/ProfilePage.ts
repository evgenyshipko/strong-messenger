import Component from '../../utils/Component'
import Button from '../../components/Button'
import Form from '../../components/Form'
import Avatar from '../../components/Avatar'

interface ProfilePageProps {
    avatar: Avatar,
    backButton: Button,
    userName: string,
    form: Form,
    buttonList: Button[]
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
        `
    }
}

export default ProfilePage
