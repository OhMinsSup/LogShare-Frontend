import * as React from 'react';
import UserProfileSettingCard from 'src/components/user/UserProfileSettingCard';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { baseCreators } from 'src/store/modules/base';
import { userCreators } from 'src/store/modules/user';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class UserProfileEditContainter extends React.Component<Props> {
  public onSubmit = () => {
    const {
      editProfile: { username, thumbnail, shortBio, cover },
      UserActions,
    } = this.props;

    UserActions.editProfile({ username, thumbnail, shortBio, cover });
  };

  public onUploadClickThumbnail = () => {
    const upload = document.createElement('input');
    upload.type = 'file';
    upload.onchange = e => {
      if (!upload.files) return;
      const file = upload.files[0];
      if (!file) return;

      const { UserActions } = this.props;
      UserActions.createUploadUrlCommonUserThumbnail({ file });
    };
    upload.click();
  };

  public onUploadClickCover = () => {
    const upload = document.createElement('input');
    upload.type = 'file';
    upload.onchange = e => {
      if (!upload.files) return;
      const file = upload.files[0];
      if (!file) return;

      const { UserActions } = this.props;
      UserActions.createUploadUrlCoverBackGround({ file });
    };
    upload.click();
  };

  public onToggleProfile = () => {
    const { BaseActions, profileModal } = this.props;

    if (profileModal) {
      BaseActions.setProfileUpdateModal(false);
    } else {
      BaseActions.setProfileUpdateModal(true);
    }
  };

  public onChange = (e: any) => {
    const {
      target: { value, name },
    } = e;
    const { UserActions } = this.props;

    UserActions.changeInput({ name, value });
  };

  public render() {
    const { profileModal, editProfile } = this.props;
    console.log(profileModal);
    if (!profileModal) return null;

    return (
      <UserProfileSettingCard
        onSubmit={this.onSubmit}
        onUploadClickThumbnail={this.onUploadClickThumbnail}
        onUploadClickCover={this.onUploadClickCover}
        onProfile={this.onToggleProfile}
        editProfile={editProfile}
        onChange={this.onChange}
      />
    );
  }
}

const mapStateToProps = ({ base, user }: StoreState) => ({
  profileModal: base.profile_modal.visible,
  editProfile: user.edit_profile,
  askProfile: user.askProfile,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  UserActions: bindActionCreators(userCreators, dispatch),
  BaseActions: bindActionCreators(baseCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileEditContainter);
