import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from 'src/store/modules';
import UserMenu from 'src/components/base/UserMenu';
import { userCreators } from 'src/store/modules/user';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class UserMenuContainer extends React.Component<Props> {
  public onLogout = () => {
    const { UserActions } = this.props;
    console.log('gkgkgkgk');

    UserActions.logout();
  };

  public render() {
    const { userMenu, username } = this.props;
    const { onLogout } = this;
    if (!userMenu) return null;

    return <UserMenu onLogout={onLogout} username={username} />;
  }
}

const mapStateToProps = ({ base, user }: StoreState) => ({
  username: user.user && user.user.username,
  userMenu: base.user_menu.visible,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  UserActions: bindActionCreators(userCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(UserMenuContainer);
