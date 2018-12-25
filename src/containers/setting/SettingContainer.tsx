import * as React from 'react';
import SettingTemplate from 'src/components/setting/SettingTemplate';
import SettingHeader from 'src/components/setting/SettingHeader';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch } from 'redux';
import SettingGeneral from 'src/components/setting/SettingGeneral';
import SettingSocial from 'src/components/setting/SettingSocial';
import SettingNotifications from 'src/components/setting/SettingNotifications';
import SettingsEtc from 'src/components/setting/SettingEtc';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class SettingContainer extends React.Component<Props> {
  public render() {
    const { username } = this.props;
    return (
      <SettingTemplate>
        <SettingHeader username={username} />
        <SettingGeneral />
        <SettingSocial />
        <SettingNotifications />
        <SettingsEtc />
      </SettingTemplate>
    );
  }
}

const mapStateToProps = ({ user }: StoreState) => ({
  username: user.user && user.user.username,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SettingContainer);
