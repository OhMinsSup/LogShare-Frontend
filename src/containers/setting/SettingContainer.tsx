import * as React from 'react';
import SettingTemplate from 'src/components/setting/SettingTemplate';
import SettingHeader from 'src/components/setting/SettingHeader';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import SettingGeneral from 'src/components/setting/SettingGeneral';
import SettingSocial from 'src/components/setting/SettingSocial';
import SettingNotifications from 'src/components/setting/SettingNotifications';
import SettingsEtc from 'src/components/setting/SettingEtc';
import QuestionModal from 'src/components/common/QuestionModal';
import { settingCreators } from 'src/store/modules/setting';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;
type State = {
  open: boolean;
};

class SettingContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  public onOpen = () => {
    this.setState({
      open: true,
    });
  };

  public onCancel = () => {
    this.setState({
      open: false,
    });
  };

  public onSave = (github: string, facebook: string, twitter: string) => {
    const { SettingActions } = this.props;

    SettingActions.updateProfileLinks({
      github,
      facebook,
      twitter,
    });
  };

  public onChecked = (checked: boolean) => {
    const { SettingActions } = this.props;

    SettingActions.updateEmailPermissions({ email_promotion: checked });
  };

  public onUnRegister = () => {
    const { SettingActions } = this.props;
    SettingActions.unregister();
  };

  public initialize = () => {
    const { SettingActions } = this.props;
    SettingActions.getProfileInfo();
  };

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    const { username, email, profile, askSetting } = this.props;
    const { open } = this.state;
    return (
      <SettingTemplate>
        <SettingHeader username={username} />
        <SettingGeneral username={username} email={email} />
        <SettingSocial
          profile={profile}
          onSave={this.onSave}
          askSetting={askSetting}
        />
        <SettingNotifications
          email_promotion={profile.email_promotion}
          askSetting={askSetting}
          onChecked={this.onChecked}
        />
        <SettingsEtc onOpen={this.onOpen} />
        <QuestionModal
          title="회원 탈퇴"
          confirmText="탈퇴"
          description="회원을 탈퇴하시면 모든 정보가 삭제됩니다. 그래도 탈퇴 하시겠습니다?"
          open={open}
          onCancel={this.onCancel}
          onConfirm={this.onUnRegister}
        />
      </SettingTemplate>
    );
  }
}

const mapStateToProps = ({ user, setting }: StoreState) => ({
  username: user.user && user.user.username,
  email: user.user && user.user.email,
  profile: setting.profile,
  askSetting: setting.askSetting,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  SettingActions: bindActionCreators(settingCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SettingContainer);
