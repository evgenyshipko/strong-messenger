import Component from '../../utils/Component.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
class ProfilePage extends Component {
    template() {
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
        `;
    }
}
export default ProfilePage;
//# sourceMappingURL=ProfilePage.js.map