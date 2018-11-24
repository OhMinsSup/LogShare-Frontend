import * as React from 'react';
import Header from 'src/components/base/Header';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import UserMenuContainer from './UserMenuContainer';
import { baseCreators } from 'src/store/modules/base';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class HeaderContainer extends React.Component<Props> {
  public onMenu = () => {
    const { BaseActions, userMenu } = this.props;
    userMenu ? BaseActions.hideUserMenu() : BaseActions.showUserMenu();
  };

  public onSideBar = () => {
    const { BaseActions, sideBar } = this.props;

    if (sideBar) {
      BaseActions.setSideBar(false);
    } else {
      BaseActions.setSideBar(true);
    }
  };

  public render() {
    const { user } = this.props;
    const { onMenu, onSideBar } = this;
    return (
      <Header
        user={user}
        menu={<UserMenuContainer />}
        onMenu={onMenu}
        onSideBar={onSideBar}
      />
    );
  }
}

const mapStateToProps = ({ user, base }: StoreState) => ({
  userMenu: base.user_menu.visible,
  user: user.user && user.user,
  sideBar: base.side_bar.visible,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  BaseActions: bindActionCreators(baseCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
